const express = require('express');
const crypto = require('node:crypto');
const { courses } = require('../formacion');
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const { canPublish, isOwner, allowed } = require('./summary-permissions');
const { cleanupSummaryImages } = require('./summary-cleanup');
const fail = (message, status = 400) => Object.assign(new Error(message), { status });
const summaryMetadata = 'id,title,status,updated_at,area_id,course_id,template_id,author_id,author_label,submitted_at,published_at,published_by';
const canEditDocument = (user, row) => allowed(user, 'summary_edit') && allowed(user, 'summary_save') &&
    (row.status === 'PUBLICADO' ? canPublish(user) :
        (row.author_id === user.id || isOwner(user) || (row.status === 'EN_REVISION' && (allowed(user, 'summary_review') || canPublish(user)))));
function stableDocumentId(userId, editorId) {
    const hex = crypto.createHash('sha256').update(`lne-summary:${userId}:${editorId}`).digest('hex').slice(0, 32).split('');
    hex[12] = '5'; hex[16] = ((parseInt(hex[16], 16) & 3) | 8).toString(16);
    const value = hex.join(''); return `${value.slice(0,8)}-${value.slice(8,12)}-${value.slice(12,16)}-${value.slice(16,20)}-${value.slice(20)}`;
}

function gateway(getConfig, fetchImpl = global.fetch) {
    return async function request(req, route, options = {}) {
        const cfg = getConfig();
        if (cfg.dublyoPool) throw fail('Esta operación editorial todavía no está habilitada en Dublyobase.', 503);
        const { timeoutMs = 30000, ...fetchOptions } = options;
        const response = await fetchImpl(cfg.url + route, { ...fetchOptions, headers: {
            apikey: cfg.key, ...(req ? { Authorization: req.get('authorization') } : {}),
            'Content-Type': 'application/json', Prefer: 'return=representation', ...(options.headers || {})
        }, signal: AbortSignal.timeout(timeoutMs) });
        const raw = await response.text();
        let data; try { data = raw ? JSON.parse(raw) : null; } catch (_) { throw fail('Respuesta inválida del almacenamiento.', 502); }
        if (!response.ok && data?.code === '40001') throw fail('Otro guardado modificó el resumen. Reábrelo antes de actualizar su publicación.', 409);
        if (!response.ok && data?.code === '57014') throw fail('El servidor agotó el tiempo de guardado. Tus cambios siguen en el editor; puedes reintentar sobre el mismo documento.', 504);
        if (!response.ok) throw fail(data?.code === '23503' ? 'La cartilla está vinculada a documentos.' :
            'No se pudo completar la operación. Comprueba permisos y configuración del flujo editorial.', response.status === 403 ? 403 : 502);
        return data;
    };
}
function privateRouter(getConfig) {
    const router = express.Router(), request = gateway(getConfig), table = '/rest/v1/summary_documents';
    async function nativeDocuments(req, where, values, { offset = 0, limit = 1, full = true } = {}) {
        const pool = getConfig().dublyoPool;
        const user = req.adminUser;
        if (!allowed(user, 'summary_access')) throw fail('No tienes acceso a resúmenes.', 403);
        const reviewer = allowed(user, 'summary_review') || canPublish(user);
        const args = [...values, user.id, isOwner(user), reviewer, limit, offset];
        const index = values.length;
        const selection = full ? 'd.*' : summaryMetadata.split(',').map(name => 'd.' + name).join(',');
        const result = await pool.query(`
            SELECT ${selection}, CASE WHEN t.id IS NOT NULL THEN jsonb_build_object('name', t.name) END AS summary_templates
            FROM lne_operational_20261111.summary_documents d
            LEFT JOIN lne_operational_20261111.summary_templates t ON t.id=d.template_id
            WHERE (${where}) AND
                (d.author_id=$${index + 1}::uuid OR $${index + 2}::boolean OR
                    ($${index + 3}::boolean AND d.status IN ('EN_REVISION','PUBLICADO')))
            ORDER BY d.updated_at DESC,d.id DESC LIMIT $${index + 4} OFFSET $${index + 5}`, args);
        return result.rows;
    }
    router.use(express.json({ limit: '30mb' }));
    router.get('/', async (req, res) => {
        try {
            const status = req.query.status || 'BORRADOR';
            if (!['BORRADOR', 'EN_REVISION', 'PUBLICADO'].includes(status)) throw fail('Estado inválido.');
            const offset = Math.max(0, Math.floor(Number(req.query.offset) || 0));
            const rows = getConfig().dublyoPool
                ? await nativeDocuments(req, 'd.status=$1', [status], { offset, limit: 50, full: false })
                : await request(req, `${table}?select=id,title,area_id,course_id,template_id,author_id,author_label,status,updated_at,published_by,published_at,summary_templates(name)&status=eq.${status}&order=updated_at.desc&limit=50&offset=${offset}`);
            rows.forEach(row => { if (row.published_by === req.adminUser.id) row.published_by_label = req.adminUser.email || req.adminUser.id; });
            res.json({ documents: rows, canPublish: canPublish(req.adminUser), canDeletePublication: isOwner(req.adminUser), canDeleteDocument: isOwner(req.adminUser), nextOffset: rows.length === 50 ? offset + 50 : null });
        } catch (e) { res.status(e.status || 502).json({ error: e.message }); }
    });
    router.post('/cleanup', async (req, res) => {
        if (!isOwner(req.adminUser)) return res.status(403).json({ error: 'Solo OWNER puede limpiar recursos eliminados.' });
        try { res.json(await cleanupSummaryImages(request, req)); }
        catch (_) { res.status(502).json({ error: 'No se pudo comprobar la limpieza. Las tareas pendientes se conservan para reintentar.' }); }
    });
    router.get('/cleanup', async (req, res) => {
        if (!isOwner(req.adminUser)) return res.status(403).json({ error: 'Solo OWNER puede consultar la limpieza.' });
        try {
            const tasks = await request(req, '/rest/v1/rpc/summary_cleanup_tasks', { method: 'POST', body: '{}' });
            res.json({ cleanupPending: tasks.length });
        } catch (_) { res.status(502).json({ error: 'No se pudo consultar la limpieza pendiente.' }); }
    });
    // Recover the canonical identity after a first-save response was lost.
    // Explicit author filter prevents one account inheriting another's local document.
    router.get('/resolve/:editorId', async (req,res) => {
        try {
            if (!/^[a-zA-Z0-9_-]{1,200}$/.test(req.params.editorId)) throw fail('Identidad de editor inválida.');
            const rows = getConfig().dublyoPool
                ? await nativeDocuments(req, "d.author_id=$1 AND d.content_lne->>'documentoId'=$2", [req.adminUser.id, req.params.editorId], { limit: 2 })
                : await request(req,`${table}?author_id=eq.${req.adminUser.id}&content_lne->>documentoId=eq.${encodeURIComponent(req.params.editorId)}&limit=2`);
            if(rows.length!==1)throw fail('No se pudo confirmar un único borrador del autor.',409);
            res.json({document:rows[0],canPublish:canPublish(req.adminUser),canEdit:canEditDocument(req.adminUser,rows[0])});
        } catch(error) {res.status(error.status||502).json({error:error.message});}
    });
    router.get('/:id', async (req, res) => {
        try {
            if (!uuid.test(req.params.id)) throw fail('Documento inválido.');
            const rows = getConfig().dublyoPool
                ? await nativeDocuments(req, 'd.id=$1', [req.params.id])
                : await request(req, `${table}?select=*,summary_templates(name)&id=eq.${req.params.id}&limit=1`);
            if (!rows[0]) throw fail('Documento no disponible.', 404);
            res.json({ document: rows[0], canPublish: canPublish(req.adminUser), canEdit: canEditDocument(req.adminUser, rows[0]) });
        } catch (e) { res.status(e.status || 502).json({ error: e.message }); }
    });
    function payload(body, optionalPreview = false) {
        const state = body.content_lne, title = String(body.title || '').trim();
        if (!title || title.length > 300 || !state || !Array.isArray(state.bloques) || !state.bloques.length) throw fail('Añade título y contenido al resumen.');
        const data = { title, content_lne: state, preview_html: String(body.preview_html || ''), area_id: null, course_id: null, template_id: null };
        if (optionalPreview && !Object.hasOwn(body, 'preview_html')) delete data.preview_html;
        if (body.area_id || body.course_id || body.template_id) {
            if (!courses.some(c => c.id === body.course_id && c.area === body.area_id) || !uuid.test(body.template_id)) throw fail('Selecciona área, curso y cartilla válidos.');
            Object.assign(data, { area_id: body.area_id, course_id: body.course_id, template_id: body.template_id });
        }
        return data;
    }
    router.post('/', async (req, res) => {
        try {
            if (!allowed(req.adminUser, 'summary_create') || !allowed(req.adminUser, 'summary_save')) throw fail('No tienes permiso para crear y guardar resúmenes.', 403);
            // Client-generated identity makes retries of the FIRST save idempotent too.
            if (!uuid.test(req.body.id)) throw fail('Identidad de documento inválida.');
            const pool = getConfig().dublyoPool;
            const existing = pool
                ? await nativeDocuments(req, 'd.id=$1 AND d.author_id=$2', [req.body.id, req.adminUser.id])
                : await request(req, `${table}?id=eq.${req.body.id}&limit=1`);
            if (existing[0]) return res.json({ document: existing[0], canPublish: canPublish(req.adminUser) });
            const content = payload(req.body), editorId = content.content_lne.documentoId;
            if (typeof editorId !== 'string' || !/^[a-zA-Z0-9_-]{1,200}$/.test(editorId)) throw fail('Falta la identidad estable del editor.');
            // RLS and an explicit author filter prevent recovery of another account's draft.
            const matches = pool
                ? await nativeDocuments(req, "d.author_id=$1 AND d.content_lne->>'documentoId'=$2", [req.adminUser.id, editorId], { limit: 2 })
                : await request(req, `${table}?author_id=eq.${req.adminUser.id}&content_lne->>documentoId=eq.${encodeURIComponent(editorId)}&limit=2`);
            if (matches.length > 1) throw fail('Existen duplicados de este documento. Abre el borrador canónico desde RESÚMENES.', 409);
            if (matches[0]) return res.json({ document: matches[0], canPublish: canPublish(req.adminUser) });
            const data = { ...content, id: stableDocumentId(req.adminUser.id, editorId), author_id: req.adminUser.id,
                author_label: req.adminUser.email || req.adminUser.id, status: 'BORRADOR' };
            // Existing PK + stable ID make concurrent first saves idempotent across server instances.
            let rows;
            if (pool) {
                ({ rows } = await pool.query(`INSERT INTO lne_operational_20261111.summary_documents
                    (id,title,author_id,author_label,status,content_lne,preview_html,area_id,course_id,template_id)
                    SELECT $1,$2,$3,$4,'BORRADOR',$5::jsonb,$6,$7,$8,$9
                    WHERE $9::uuid IS NULL OR EXISTS (
                        SELECT 1 FROM lne_operational_20261111.summary_templates WHERE id=$9 AND course_id=$8 AND is_active)
                    ON CONFLICT (id) DO NOTHING RETURNING *`, [data.id, data.title, data.author_id, data.author_label,
                    JSON.stringify(data.content_lne), data.preview_html, data.area_id, data.course_id, data.template_id]));
                if (!rows.length) rows = await nativeDocuments(req, 'd.id=$1 AND d.author_id=$2', [data.id, req.adminUser.id]);
            } else {
                rows = await request(req, table + '?on_conflict=id', { method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=representation' }, body: JSON.stringify(data) });
                if (!rows.length) rows = await request(req, `${table}?id=eq.${data.id}&limit=1`);
            }
            if (!rows[0]) throw fail('No se pudo recuperar la identidad del borrador.', 409);
            res.status(201).json({ document: rows[0], canPublish: canPublish(req.adminUser) });
        } catch (e) { res.status(e.status || 502).json({ error: e.message }); }
    });
    router.patch('/:id', async (req, res) => {
        try {
            if (!uuid.test(req.params.id) || !req.body.updated_at) throw fail('Falta la versión del documento.');
            const compact = req.body.compact_save === true, transition = req.body.transition_only === true;
            const pool = getConfig().dublyoPool;
            const rows = pool ? await nativeDocuments(req, 'd.id=$1', [req.params.id]) :
                await request(req, `${table}?${compact || transition ? 'select=' + summaryMetadata + '&' : ''}id=eq.${req.params.id}&limit=1`);
            const previous = rows[0];
            if (!previous) throw fail('Documento no disponible.', 404);
            const action = req.body.action || 'save';
            if (!['save', 'submit', 'publish', 'update-publication'].includes(action)) throw fail('Acción inválida.');
            if (action === 'update-publication') {
                if (!canPublish(req.adminUser)) throw fail('No tienes permiso para actualizar publicaciones.', 403);
                if (previous.status !== 'PUBLICADO') throw fail('El resumen debe estar PUBLICADO.', 409);
                if (pool) {
                    const result = await pool.query(`UPDATE lne_operational_20261111.summary_publications p
                        SET title=d.title, preview_html=d.preview_html
                        FROM lne_operational_20261111.summary_documents d
                        WHERE p.id=d.id AND d.id=$1 AND d.status='PUBLICADO'
                          AND date_trunc('milliseconds',d.updated_at)=$2::timestamptz
                          AND btrim(d.preview_html)<>''
                        RETURNING d.*`, [previous.id, req.body.updated_at]);
                    if (!result.rowCount) throw fail('La publicación o el documento cambió. Reábrelo antes de continuar.', 409);
                    return res.json({ document: result.rows[0], canPublish: true });
                }
                const document = await request(req, '/rest/v1/rpc/update_summary_publication', {
                    method: 'POST', body: JSON.stringify({ document_id: previous.id, expected_updated_at: req.body.updated_at })
                });
                return res.json({ document, canPublish: true });
            }
            if (previous.status === 'PUBLICADO') {
                if (!canEditDocument(req.adminUser, previous)) throw fail('No tienes permiso para editar un publicado.', 403);
                if (action !== 'save') throw fail('Utiliza ACTUALIZAR PUBLICACIÓN para aplicar los cambios públicos.', 409);
            }
            if (previous.author_id !== req.adminUser.id && !isOwner(req.adminUser) && !(['EN_REVISION', 'PUBLICADO'].includes(previous.status) && (allowed(req.adminUser, 'summary_review') || canPublish(req.adminUser)))) throw fail('No tienes acceso a este documento.', 403);
            if (action !== 'publish' && (!allowed(req.adminUser, 'summary_edit') || !allowed(req.adminUser, 'summary_save'))) throw fail('No tienes permiso para editar y guardar.', 403);
            if (action === 'submit' && !allowed(req.adminUser, 'summary_submit_review')) throw fail('No tienes permiso para enviar a revisión.', 403);
            if (compact || action === 'save') {
                if (action !== 'save') throw fail('El guardado compacto no cambia el estado editorial.');
                const content = payload(req.body, true);
                if (previous.status === 'PUBLICADO' && ['area_id','course_id','template_id'].some(k => content[k] !== previous[k])) throw fail('La publicación conserva su destino.', 409);
                const refs = compact ? req.body.reuse_images : [];
                if (!Array.isArray(refs)) throw fail('Referencias de imagen inválidas.');
                // Old tabs can still submit full snapshots. Reuse the same RPC
                // and remove unchanged image copies before forwarding to Postgres.
                if (!compact) {
                    const oldBlocks = new Map((previous.content_lne?.bloques || []).map(b => [b.id,b]));
                    content.content_lne = JSON.parse(JSON.stringify(content.content_lne));
                    content.content_lne.bloques.forEach((b,i) => {
                        const src=b.propiedades?.src;
                        if(typeof src!=='string'||src.length<4096||src!==oldBlocks.get(b.id)?.propiedades?.src)return;
                        const token='__LNE_REUSE_IMAGE_'+i+'__';b.propiedades.src=token;refs.push({id:b.id,token});
                        if(content.preview_html)content.preview_html=content.preview_html.split(src).join(token);
                    });
                }
                if (pool) {
                    if (refs.length > content.content_lne.bloques.length) throw fail('Referencias de imagen inválidas.');
                    const old = new Map((previous.content_lne?.bloques || []).map(block => [block.id, block.propiedades?.src]));
                    const images = new Map();
                    for (const ref of refs) {
                        if (!ref || typeof ref.token !== 'string' || !/^__LNE_REUSE_IMAGE_\d+__$/.test(ref.token) ||
                            images.has(ref.token) || typeof old.get(ref.id) !== 'string') throw fail('Referencia de imagen inválida.');
                        const matches = content.content_lne.bloques.filter(b => b.id === ref.id && b.propiedades?.src === ref.token);
                        if (matches.length !== 1) throw fail('Referencia de imagen inválida.');
                        matches[0].propiedades.src = old.get(ref.id);
                        images.set(ref.token, old.get(ref.id));
                    }
                    if (content.preview_html !== undefined) {
                        content.preview_html = content.preview_html.replace(/__LNE_REUSE_IMAGE_\d+__/g, token => {
                            if (!images.has(token)) throw fail('Referencia de imagen inválida.');
                            return images.get(token);
                        });
                    }
                    const updated = await pool.query(`UPDATE lne_operational_20261111.summary_documents
                        SET title=$3, content_lne=$4::jsonb, preview_html=coalesce($5,preview_html),
                            area_id=$6, course_id=$7, template_id=$8,
                            updated_at=greatest(date_trunc('milliseconds',clock_timestamp()),
                                date_trunc('milliseconds',updated_at)+interval '1 millisecond')
                        WHERE id=$1 AND date_trunc('milliseconds',updated_at)=$2::timestamptz
                        AND status=$9 AND author_id=$10
                        AND ($8::uuid IS NULL OR EXISTS (
                            SELECT 1 FROM lne_operational_20261111.summary_templates WHERE id=$8 AND course_id=$7 AND is_active))
                        RETURNING ${compact ? summaryMetadata : '*'}`,
                    [previous.id, req.body.updated_at, content.title, JSON.stringify(content.content_lne),
                        content.preview_html ?? null, content.area_id, content.course_id, content.template_id,
                        previous.status, previous.author_id]);
                    if (!updated.rowCount) throw fail('El documento cambió o su cartilla ya no está disponible. Reábrelo antes de continuar.', 409);
                    return res.json({ document: updated.rows[0], canPublish: canPublish(req.adminUser) });
                }
                const document = await request(req, '/rest/v1/rpc/save_summary_document_compact', { method: 'POST', body: JSON.stringify({
                    document_id: previous.id, expected_updated_at: req.body.updated_at, payload: content, reuse_images: refs
                }) });
                return res.json({ document: compact ? document : { ...previous, ...payload(req.body), ...document }, canPublish: canPublish(req.adminUser) });
            }
            if (pool && action === 'submit') {
                if (previous.status !== 'BORRADOR') throw fail('Solo se pueden enviar borradores a revisión.', 409);
                const content = transition ? previous : payload(req.body);
                if (!content.template_id || !content.preview_html?.trim()) throw fail('Falta contenido o destino completo.');
                const changed = await pool.query(`UPDATE lne_operational_20261111.summary_documents d
                    SET status='EN_REVISION',submitted_at=now(),title=$3,content_lne=$4::jsonb,
                        preview_html=$5,area_id=$6,course_id=$7,template_id=$8,
                        updated_at=greatest(date_trunc('milliseconds',clock_timestamp()),
                            date_trunc('milliseconds',updated_at)+interval '1 millisecond')
                    WHERE d.id=$1 AND d.status='BORRADOR' AND date_trunc('milliseconds',d.updated_at)=$2::timestamptz
                      AND EXISTS (SELECT 1 FROM lne_operational_20261111.summary_templates t
                          WHERE t.id=$8 AND t.course_id=$7 AND t.is_active)
                    RETURNING ${transition ? summaryMetadata : '*'}`, [previous.id, req.body.updated_at, content.title,
                    JSON.stringify(content.content_lne),content.preview_html,content.area_id,content.course_id,content.template_id]);
                if (!changed.rowCount) throw fail('El borrador cambió o su cartilla ya no está disponible.', 409);
                return res.json({ document: changed.rows[0], canPublish: canPublish(req.adminUser) });
            }
            if (pool && action === 'publish') {
                if (!canPublish(req.adminUser)) throw fail('No tienes permiso de publicación final.', 403);
                if (previous.status !== 'EN_REVISION') throw fail('El resumen debe estar EN_REVISION.', 409);
                payload(previous);
                try {
                    const result = await pool.query(`WITH changed AS (
                        UPDATE lne_operational_20261111.summary_documents d
                        SET status='PUBLICADO',published_at=now(),published_by=$3,
                            updated_at=greatest(date_trunc('milliseconds',clock_timestamp()),
                                date_trunc('milliseconds',updated_at)+interval '1 millisecond')
                        FROM lne_operational_20261111.summary_templates t
                        WHERE d.id=$1 AND d.status='EN_REVISION' AND date_trunc('milliseconds',d.updated_at)=$2::timestamptz
                          AND d.template_id=t.id AND d.course_id=t.course_id AND t.is_active AND btrim(d.preview_html)<>''
                        RETURNING d.*,t.name AS card_name,t.image_path AS card_image
                    ), snapshot AS (
                        INSERT INTO lne_operational_20261111.summary_publications
                            (id,template_id,area_id,course_id,title,template_name,image_path,preview_html,published_at)
                        SELECT id,template_id,area_id,course_id,title,card_name,card_image,preview_html,published_at FROM changed
                        RETURNING id
                    )
                    SELECT changed.* FROM changed JOIN snapshot USING (id)`, [previous.id, req.body.updated_at, req.adminUser.id]);
                    if (!result.rowCount) throw fail('El documento cambió o su cartilla ya no está disponible.', 409);
                    const { card_name, card_image, ...document } = result.rows[0];
                    return res.json({ document, canPublish: true });
                } catch (error) {
                    if (error.code === '23505') throw fail('Esta cartilla ya tiene un resumen publicado.', 409);
                    throw error;
                }
            }
            let data;
            if (transition) {
                if (action !== 'submit' || previous.status !== 'BORRADOR') throw fail('Transición editorial no disponible.', 409);
                // The existing trigger validates the saved content, HTML and destination atomically.
                data = { status: 'EN_REVISION' };
            } else if (action === 'publish') {
                if (!canPublish(req.adminUser)) throw fail('No tienes permiso de publicación final.', 403);
                if (previous.status !== 'EN_REVISION') throw fail('El resumen debe estar EN_REVISION.', 409);
                payload(previous);
                if (!previous.template_id || !previous.preview_html?.trim()) throw fail('Falta contenido o destino completo.');
                const cards = await request(req, `/rest/v1/summary_templates?id=eq.${previous.template_id}&course_id=eq.${encodeURIComponent(previous.course_id)}&is_active=eq.true&limit=1`);
                if (!cards.length) throw fail('La cartilla seleccionada no está disponible.');
                const published = await request(req, `/rest/v1/summary_publications?select=id&template_id=eq.${previous.template_id}&limit=1`);
                if (published.length) throw fail('Esta cartilla ya tiene un resumen publicado. Elige otra cartilla.', 409);
                data = { status: 'PUBLICADO' };
            } else {
                data = payload(req.body);
                if (previous.status === 'PUBLICADO' && ['area_id', 'course_id', 'template_id'].some(key => data[key] !== previous[key])) {
                    throw fail('La publicación conserva su área, curso y cartilla existentes.', 409);
                }
                if (action === 'submit') {
                    if (!data.template_id || !data.preview_html.trim()) throw fail('Falta contenido o destino completo.');
                    data.status = 'EN_REVISION';
                }
            }
            const changed = await request(req, `${table}?${transition ? 'select=' + summaryMetadata + '&' : ''}id=eq.${req.params.id}&updated_at=eq.${encodeURIComponent(req.body.updated_at)}`, { method: 'PATCH', body: JSON.stringify(data) });
            if (!changed.length) throw fail('Otro guardado modificó el resumen. Reábrelo antes de continuar; tus cambios siguen en el editor.', 409);
            res.json({ document: changed[0], canPublish: canPublish(req.adminUser) });
        } catch (e) { res.status(e.status || 502).json({ error: e.message }); }
    });
    router.delete('/:id', async (req, res) => {
        if (!isOwner(req.adminUser)) return res.status(403).json({ error: 'Solo OWNER puede eliminar definitivamente resúmenes.' });
        if (!uuid.test(req.params.id) || !req.body.updated_at || req.body.confirm !== true) return res.status(400).json({ error: 'Confirma la eliminación y la versión del documento.' });
        try {
            const deleted = await request(req, '/rest/v1/rpc/delete_summary_document', {
                method: 'POST', body: JSON.stringify({ document_id: req.params.id, expected_updated_at: req.body.updated_at })
            });
            let cleanup;
            try { cleanup = await cleanupSummaryImages(request, req); }
            catch (_) { cleanup = { cleanupPending: true, warning: 'Documento eliminado. No se pudo comprobar Storage; la tarea de limpieza se conserva para reintentar.' }; }
            res.json({ ok: true, deleted, ...cleanup });
        } catch (error) { res.status(error.status || 502).json({ error: error.message }); }
    });
    router.delete('/:id/publication', async (req, res) => {
        if (!isOwner(req.adminUser)) return res.status(403).json({ error: 'Solo OWNER puede eliminar publicaciones.' });
        if (!uuid.test(req.params.id)) return res.status(400).json({ error: 'Documento inválido.' });
        try {
            await request(req, '/rest/v1/rpc/withdraw_summary_publication', { method: 'POST', body: JSON.stringify({ document_id: req.params.id }) });
            res.json({ ok: true, status: 'BORRADOR' });
        } catch (error) { res.status(error.status || 502).json({ error: error.message }); }
    });
    router.use((error, _req, res, _next) => res.status(error.status || 500).json({ error: 'El documento supera el límite de 30 MB o la solicitud no es válida. No se perdieron los cambios del editor.' }));
    return router;
}
async function publicTopics(getConfig, courseId, fetchImpl = global.fetch, { timeoutMs = 30000 } = {}) {
    if (!courses.some(c => c.id === courseId)) throw fail('Curso inválido.');
    const { dublyoPublic, dublyoPool } = getConfig();
    if (dublyoPublic && dublyoPool) {
        const { rows } = await dublyoPool.query(`SELECT p.id,p.template_name,
            EXISTS (SELECT FROM lne_operational_20261111.summary_template_images i WHERE i.path=t.image_path) AS has_image
            FROM lne_operational_20261111.summary_publications p
            JOIN lne_operational_20261111.summary_templates t ON t.id=p.template_id
            WHERE p.course_id=$1 AND t.course_id=$1 ORDER BY t.sort_order,t.created_at,t.id,p.id`, [courseId]);
        return rows.map(row => ({ id: `summary-${row.id}`, publicationId: row.id, titulo: row.template_name,
            imagen: row.has_image ? `/api/formation/summaries/${row.id}/image` : null }));
    }
    if (dublyoPublic) {
        const course = encodeURIComponent(courseId);
        const [publications, templates] = await Promise.all([
            dublyoPublic.read(`summary_publications?select=id,template_id,template_name&course_id=eq.${course}`),
            dublyoPublic.read(`summary_templates?select=id&course_id=eq.${course}&order=sort_order.asc,created_at.asc,id.asc`)
        ]);
        const byTemplate = new Map(publications.map(row => [row.template_id, row]));
        return templates.map(template => byTemplate.get(template.id)).filter(Boolean).map(row => ({
            id: `summary-${row.id}`, publicationId: row.id, titulo: row.template_name, imagen: null
        }));
    }
    const request = gateway(getConfig, fetchImpl);
    const rows = await request(null, '/rest/v1/rpc/ordered_summary_publications', { method: 'POST', body: JSON.stringify({ course: courseId }), timeoutMs });
    return Promise.all(rows.map(async row => {
        const signed = await request(null, `/storage/v1/object/sign/summary-template-images/${row.image_path}`, { method: 'POST', body: JSON.stringify({ expiresIn: 3600 }), timeoutMs });
        const value = signed.signedURL || signed.signedUrl;
        return { id: `summary-${row.id}`, publicationId: row.id, titulo: row.template_name, imagen: value?.startsWith('http') ? value : getConfig().url + '/storage/v1' + value };
    }));
}
function publicRouter(getConfig) {
    const router = express.Router(), request = gateway(getConfig);
    function publicPublication(id) {
        const resource = `summary_publications?select=id,preview_html&id=eq.${id}&limit=1`;
        const { dublyoPublic } = getConfig();
        return dublyoPublic ? dublyoPublic.read(resource) : request(null, '/rest/v1/' + resource);
    }
    const {renderPublicSummary,isCanvasPublication,POLICY}=require('./summary-public-view');
    router.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
    router.get('/:id/image', async (req, res) => {
        const { dublyoPool, dublyoPublic } = getConfig();
        if (!dublyoPool || !dublyoPublic || !uuid.test(req.params.id)) return res.sendStatus(404);
        try {
            const { rows } = await dublyoPool.query(`SELECT i.content FROM lne_operational_20261111.summary_publications p
                JOIN lne_operational_20261111.summary_templates t ON t.id=p.template_id
                JOIN lne_operational_20261111.summary_template_images i ON i.path=t.image_path WHERE p.id=$1`, [req.params.id]);
            if (!rows.length) return res.sendStatus(404);
            res.set('X-Content-Type-Options', 'nosniff').type('image/webp').send(rows[0].content);
        } catch (_) { res.sendStatus(502); }
    });
    router.get('/', async (req, res) => {
        try {
            const topics = await publicTopics(getConfig, req.query.course_id);
            res.json({ topics });
        } catch (e) { res.status(e.status || 502).json({ error: 'No se pudieron cargar los nuevos resúmenes.' }); }
    });
    router.get('/:id/view', async (req,res) => {
        try {
            if(!uuid.test(req.params.id))throw fail('Resumen inválido.');
            const rows=await publicPublication(req.params.id);
            if(!rows[0])throw fail('Resumen no disponible.',404);
            res.set({'Content-Security-Policy':POLICY,'X-LNE-Summary-Layout':isCanvasPublication(rows[0].preview_html)?'canvas':'flow'}).type('html').send(renderPublicSummary(rows[0].preview_html));
        } catch(error) {res.status(error.status||502).type('text').send('Resumen no disponible.');}
    });
    router.get('/:id', async (req, res) => {
        try {
            if (!uuid.test(req.params.id)) throw fail('Resumen inválido.');
            const rows = await publicPublication(req.params.id);
            if (!rows[0]) throw fail('Resumen no disponible.', 404);
            res.json(rows[0]);
        } catch (e) { res.status(e.status || 502).json({ error: e.message }); }
    });
    return router;
}
module.exports = { privateRouter, publicRouter, publicTopics, canPublish };
