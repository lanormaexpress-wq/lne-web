const express = require('express');
const crypto = require('node:crypto');
const { courses } = require('../formacion');
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const { canPublish, isOwner, allowed } = require('./summary-permissions');
const { cleanupSummaryImages } = require('./summary-cleanup');
const fail = (message, status = 400) => Object.assign(new Error(message), { status });
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
        const { timeoutMs = 30000, ...fetchOptions } = options;
        const response = await fetchImpl(cfg.url + route, { ...fetchOptions, headers: {
            apikey: cfg.key, ...(req ? { Authorization: req.get('authorization') } : {}),
            'Content-Type': 'application/json', Prefer: 'return=representation', ...(options.headers || {})
        }, signal: AbortSignal.timeout(timeoutMs) });
        const raw = await response.text();
        let data; try { data = raw ? JSON.parse(raw) : null; } catch (_) { throw fail('Respuesta inválida del almacenamiento.', 502); }
        if (!response.ok && data?.code === '40001') throw fail('Otro guardado modificó el resumen. Reábrelo antes de actualizar su publicación.', 409);
        if (!response.ok) throw fail(data?.code === '23503' ? 'La cartilla está vinculada a documentos.' :
            'No se pudo completar la operación. Comprueba permisos y configuración del flujo editorial.', response.status === 403 ? 403 : 502);
        return data;
    };
}
function privateRouter(getConfig) {
    const router = express.Router(), request = gateway(getConfig), table = '/rest/v1/summary_documents';
    router.use(express.json({ limit: '30mb' }));
    router.get('/', async (req, res) => {
        try {
            const status = req.query.status || 'BORRADOR';
            if (!['BORRADOR', 'EN_REVISION', 'PUBLICADO'].includes(status)) throw fail('Estado inválido.');
            const offset = Math.max(0, Math.floor(Number(req.query.offset) || 0));
            const rows = await request(req, `${table}?select=id,title,area_id,course_id,template_id,author_id,author_label,status,updated_at,published_by,published_at,summary_templates(name)&status=eq.${status}&order=updated_at.desc&limit=50&offset=${offset}`);
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
    router.get('/:id', async (req, res) => {
        try {
            if (!uuid.test(req.params.id)) throw fail('Documento inválido.');
            const rows = await request(req, `${table}?select=*,summary_templates(name)&id=eq.${req.params.id}&limit=1`);
            if (!rows[0]) throw fail('Documento no disponible.', 404);
            res.json({ document: rows[0], canPublish: canPublish(req.adminUser), canEdit: canEditDocument(req.adminUser, rows[0]) });
        } catch (e) { res.status(e.status || 502).json({ error: e.message }); }
    });
    function payload(body) {
        const state = body.content_lne, title = String(body.title || '').trim();
        if (!title || title.length > 300 || !state || !Array.isArray(state.bloques) || !state.bloques.length) throw fail('Añade título y contenido al resumen.');
        const data = { title, content_lne: state, preview_html: String(body.preview_html || ''), area_id: null, course_id: null, template_id: null };
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
            const existing = await request(req, `${table}?id=eq.${req.body.id}&limit=1`);
            if (existing[0]) return res.json({ document: existing[0], canPublish: canPublish(req.adminUser) });
            const content = payload(req.body), editorId = content.content_lne.documentoId;
            if (typeof editorId !== 'string' || !/^[a-zA-Z0-9_-]{1,200}$/.test(editorId)) throw fail('Falta la identidad estable del editor.');
            // RLS and an explicit author filter prevent recovery of another account's draft.
            const matches = await request(req, `${table}?author_id=eq.${req.adminUser.id}&content_lne->>documentoId=eq.${encodeURIComponent(editorId)}&limit=2`);
            if (matches.length > 1) throw fail('Existen duplicados de este documento. Abre el borrador canónico desde RESÚMENES.', 409);
            if (matches[0]) return res.json({ document: matches[0], canPublish: canPublish(req.adminUser) });
            const data = { ...content, id: stableDocumentId(req.adminUser.id, editorId), author_id: req.adminUser.id,
                author_label: req.adminUser.email || req.adminUser.id, status: 'BORRADOR' };
            // Existing PK + stable ID make concurrent first saves idempotent across server instances.
            let rows = await request(req, table + '?on_conflict=id', { method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=representation' }, body: JSON.stringify(data) });
            if (!rows.length) rows = await request(req, `${table}?id=eq.${data.id}&limit=1`);
            if (!rows[0]) throw fail('No se pudo recuperar la identidad del borrador.', 409);
            res.status(201).json({ document: rows[0], canPublish: canPublish(req.adminUser) });
        } catch (e) { res.status(e.status || 502).json({ error: e.message }); }
    });
    router.patch('/:id', async (req, res) => {
        try {
            if (!uuid.test(req.params.id) || !req.body.updated_at) throw fail('Falta la versión del documento.');
            const rows = await request(req, `${table}?id=eq.${req.params.id}&limit=1`), previous = rows[0];
            if (!previous) throw fail('Documento no disponible.', 404);
            const action = req.body.action || 'save';
            if (!['save', 'submit', 'publish', 'update-publication'].includes(action)) throw fail('Acción inválida.');
            if (action === 'update-publication') {
                if (!canPublish(req.adminUser)) throw fail('No tienes permiso para actualizar publicaciones.', 403);
                if (previous.status !== 'PUBLICADO') throw fail('El resumen debe estar PUBLICADO.', 409);
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
            let data;
            if (action === 'publish') {
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
            const changed = await request(req, `${table}?id=eq.${req.params.id}&updated_at=eq.${encodeURIComponent(req.body.updated_at)}`, { method: 'PATCH', body: JSON.stringify(data) });
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
    const {renderPublicSummary,isCanvasPublication,POLICY}=require('./summary-public-view');
    router.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
    router.get('/', async (req, res) => {
        try {
            const topics = await publicTopics(getConfig, req.query.course_id);
            res.json({ topics });
        } catch (e) { res.status(e.status || 502).json({ error: 'No se pudieron cargar los nuevos resúmenes.' }); }
    });
    router.get('/:id/view', async (req,res) => {
        try {
            if(!uuid.test(req.params.id))throw fail('Resumen inválido.');
            const rows=await request(null,`/rest/v1/summary_publications?select=id,preview_html&id=eq.${req.params.id}&limit=1`);
            if(!rows[0])throw fail('Resumen no disponible.',404);
            res.set({'Content-Security-Policy':POLICY,'X-LNE-Summary-Layout':isCanvasPublication(rows[0].preview_html)?'canvas':'flow'}).type('html').send(renderPublicSummary(rows[0].preview_html));
        } catch(error) {res.status(error.status||502).type('text').send('Resumen no disponible.');}
    });
    router.get('/:id', async (req, res) => {
        try {
            if (!uuid.test(req.params.id)) throw fail('Resumen inválido.');
            const rows = await request(null, `/rest/v1/summary_publications?select=id,preview_html&id=eq.${req.params.id}&limit=1`);
            if (!rows[0]) throw fail('Resumen no disponible.', 404);
            res.json(rows[0]);
        } catch (e) { res.status(e.status || 502).json({ error: e.message }); }
    });
    return router;
}
module.exports = { privateRouter, publicRouter, publicTopics, canPublish };
