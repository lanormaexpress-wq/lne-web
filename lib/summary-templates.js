const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const { courses } = require('../formacion');
const bucket = 'summary-template-images';
const { canCreateCard } = require('./summary-permissions');
const schema = 'lne_operational_20261111';
const nativeTable = schema + '.summary_templates';
const images = schema + '.summary_template_images';
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

async function transaction(pool, task) {
    const db = await pool.connect();
    try {
        await db.query('BEGIN');
        const result = await task(db);
        await db.query('COMMIT');
        return result;
    } catch (error) {
        await db.query('ROLLBACK').catch(() => {});
        throw error;
    } finally {
        db.release();
    }
}

function withImage(row, available = true) {
    return { ...row, image_url: available ? '/admin/resumenes/templates/' + row.id + '/image?v=' + encodeURIComponent(row.image_path) : null };
}

async function storeImage(db, req, id) {
    const path = `${req.adminUser.id}/${id}/${crypto.randomUUID()}.webp`;
    await db.query(`INSERT INTO ${images}(path,content) VALUES ($1,$2)`, [path, req.file.buffer]);
    return path;
}

module.exports = function templateRouter(getConfig) {
    const router = express.Router();
    const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4194304, files: 1, fields: 3 } }).single('image');
    async function request(req, route, options = {}) {
        const cfg = getConfig();
        if (cfg.dublyoPool) throw Object.assign(new Error('Esta operación de cartillas todavía no está habilitada en Dublyobase.'), { status: 503 });
        const response = await fetch(cfg.url + route, { ...options, headers: {
            apikey: cfg.key, Authorization: req.get('authorization'), ...(options.headers || {})
        } });
        const text = await response.text();
        let body; try { body = text ? JSON.parse(text) : null; } catch (_) { body = null; }
        if (!response.ok) {
            const missing = body?.code === 'PGRST205' || body?.message === 'Bucket not found';
            throw Object.assign(new Error(missing ? 'Falta configurar las cartillas en Supabase. Aplica migration/summary-templates.sql.' : 'Supabase no pudo completar la operación de cartillas.'), { status: missing ? 503 : response.status });
        }
        return body;
    }
    const table = '/rest/v1/summary_templates';
    const json = { 'Content-Type': 'application/json', Prefer: 'return=representation' };
    function owner(req, res, next) {
        if (!canCreateCard(req.adminUser)) return res.status(403).json({ error: 'No tienes permiso para administrar cartillas.' });
        next();
    }
    function parseUpload(req, res, next) {
        upload(req, res, error => error ? res.status(400).json({ error: 'Imagen inválida o demasiado grande después de optimizarla (máximo técnico: 4 MB).' }) : next());
    }
    function validateImage(file) {
        const b = file?.buffer;
        if (!b || file.mimetype !== 'image/webp' || b.toString('ascii',0,4) !== 'RIFF' || b.toString('ascii',8,12) !== 'WEBP') throw Object.assign(new Error('Selecciona y optimiza una imagen JPG, PNG o WebP.'), { status: 400 });
        let width, height;
        const type=b.toString('ascii',12,16);
        if(type==='VP8X' && b.length>=30){width=1+b.readUIntLE(24,3);height=1+b.readUIntLE(27,3);}
        else if(type==='VP8 ' && b.length>=30){width=b.readUInt16LE(26)&16383;height=b.readUInt16LE(28)&16383;}
        else if(type==='VP8L' && b.length>=25){const n=b.readUInt32LE(21);width=1+(n&16383);height=1+((n>>>14)&16383);}
        if(!width || !height || width>1408 || height>880) throw Object.assign(new Error('La imagen debe optimizarse a un máximo de 1408 × 880 px, conservando su proporción.'),{status:400});
    }
    async function sign(req, row) {
        if (!/^[a-f0-9-]{36}\/[a-f0-9-]{36}\/[a-f0-9-]{36}\.webp$/i.test(row.image_path)) throw Object.assign(new Error('Ruta de imagen inválida.'), {status:400});
        const result = await request(req, `/storage/v1/object/sign/${bucket}/${row.image_path}`, { method:'POST',headers:json,body:JSON.stringify({expiresIn:3600}) });
        const value = result.signedURL || result.signedUrl;
        return { ...row, image_url: value?.startsWith('http') ? value : getConfig().url + '/storage/v1' + value };
    }
    async function removeIfUnused(req, imagePath) {
        if (!imagePath) return;
        if (!/^[a-f0-9-]{36}\/[a-f0-9-]{36}\/[a-f0-9-]{36}\.webp$/i.test(imagePath)) throw new Error('Ruta de imagen inválida.');
        const references = await request(req, `${table}?select=id&image_path=eq.${encodeURIComponent(imagePath)}&limit=1`);
        if (!references.length) {
            const published = await request(req, `/rest/v1/summary_publications?select=id&image_path=eq.${encodeURIComponent(imagePath)}&limit=1`);
            if (!published.length) await request(req, `/storage/v1/object/${bucket}`, { method:'DELETE', headers:json, body:JSON.stringify({prefixes:[imagePath]}) });
        }
    }
    async function putImage(req, id) {
        validateImage(req.file);
        const imagePath = `${req.adminUser.id}/${id}/${crypto.randomUUID()}.webp`;
        await request(req, `/storage/v1/object/${bucket}/${imagePath}`, { method:'POST', headers:{'Content-Type':'image/webp','x-upsert':'false'},body:req.file.buffer });
        return imagePath;
    }
    router.get('/:id/image', async (req, res) => {
        const pool = getConfig().dublyoPool;
        if (!pool || !uuid.test(req.params.id)) return res.sendStatus(404);
        try {
            const { rows } = await pool.query(`SELECT i.content FROM ${nativeTable} t JOIN ${images} i ON i.path=t.image_path WHERE t.id=$1 AND t.is_active`, [req.params.id]);
            if (!rows.length) return res.sendStatus(404);
            res.set('X-Content-Type-Options', 'nosniff').type('image/webp').send(rows[0].content);
        } catch (_) { res.sendStatus(502); }
    });
    router.get('/', async (req,res) => {
        try {
            if (!courses.some(c=>c.id===req.query.course_id)) return res.status(400).json({error:'Selecciona un curso existente.'});
            const pool = getConfig().dublyoPool;
            if (pool) {
                const { rows } = await pool.query(`SELECT t.*, EXISTS (SELECT FROM ${images} i WHERE i.path=t.image_path) AS has_image
                    FROM ${nativeTable} t WHERE course_id=$1 AND is_active ORDER BY sort_order,created_at,id`, [req.query.course_id]);
                return res.json({ templates: rows.map(({ has_image, ...row }) => withImage(row, has_image)) });
            }
            const rows=await request(req,`${table}?course_id=eq.${encodeURIComponent(req.query.course_id)}&is_active=eq.true&order=sort_order.asc,created_at.asc,id.asc`);
            res.json({templates:await Promise.all(rows.map(row=>sign(req,row)))});
        } catch(error){res.status(error.status||502).json({error:error.message});}
    });
    router.post('/order', owner, express.json({ limit: '100kb' }), async (req,res) => {
        try {
            const {course_id,expected_ids,ordered_ids}=req.body;
            const valid=ids=>Array.isArray(ids)&&ids.length<=2000&&ids.every(id=>typeof id==='string'&&/^[a-f0-9-]{36}$/i.test(id))&&new Set(ids).size===ids.length;
            if(!courses.some(c=>c.id===course_id)||!valid(expected_ids)||!valid(ordered_ids)||expected_ids.length!==ordered_ids.length||ordered_ids.some(id=>!expected_ids.includes(id)))return res.status(400).json({error:'Elige exactamente las cartillas del curso.'});
            const pool = getConfig().dublyoPool;
            if (pool) {
                await transaction(pool, async db => {
                    await db.query('SELECT pg_advisory_xact_lock(hashtext($1))', [course_id]);
                    const { rows } = await db.query(`SELECT id FROM ${nativeTable} WHERE course_id=$1 AND is_active ORDER BY sort_order,created_at,id FOR UPDATE`, [course_id]);
                    if (rows.length !== expected_ids.length || rows.some(({ id }, index) => id !== expected_ids[index])) {
                        throw Object.assign(new Error('El orden cambió.'), { status: 409 });
                    }
                    await db.query(`UPDATE ${nativeTable} t SET sort_order=o.position FROM unnest($1::uuid[]) WITH ORDINALITY AS o(id,position) WHERE t.id=o.id`, [ordered_ids]);
                });
            } else await request(req,'/rest/v1/rpc/reorder_summary_templates',{method:'POST',headers:json,body:JSON.stringify({course:course_id,expected_ids,ordered_ids})});
            res.json({ok:true});
        }catch(error){res.status(error.status||502).json({error:'No se pudo guardar el orden. Recarga las cartillas antes de reintentar.'});}
    });
    router.post('/', (req, res, next) => canCreateCard(req.adminUser) ? next() : res.status(403).json({ error:'No tienes permiso para crear cartillas.' }), parseUpload, async (req,res) => {
        let imagePath;
        try {
            const name=String(req.body.name||'').trim(),courseId=req.body.course_id;
            if(!name || name.length>200 || !courses.some(c=>c.id===courseId)) return res.status(400).json({error:'Nombre y curso válidos son obligatorios.'});
            const id=crypto.randomUUID();
            const pool = getConfig().dublyoPool;
            if (pool) {
                validateImage(req.file);
                const row = await transaction(pool, async db => {
                    await db.query('SELECT pg_advisory_xact_lock(hashtext($1))', [courseId]);
                    const path = await storeImage(db, req, id);
                    const { rows } = await db.query(`INSERT INTO ${nativeTable}(id,course_id,name,image_path,created_by)
                        VALUES ($1,$2,$3,$4,$5) RETURNING *`, [id,courseId,name,path,req.adminUser.id]);
                    return rows[0];
                });
                return res.status(201).json({ template: withImage(row) });
            }
            imagePath=await putImage(req,id);
            const rows=await request(req,table,{method:'POST',headers:json,body:JSON.stringify({id,course_id:courseId,name,image_path:imagePath,created_by:req.adminUser.id})});
            imagePath=null;
            res.status(201).json({template:await sign(req,rows[0])});
        }catch(error){if(imagePath)await removeIfUnused(req,imagePath).catch(()=>{});res.status(error.status||502).json({error:error.message});}
    });
    router.patch('/:id',owner,parseUpload,async(req,res)=>{
        let imagePath;
        try{
            if(!uuid.test(req.params.id))return res.status(400).json({error:'Cartilla inválida.'});
            const pool = getConfig().dublyoPool;
            if (pool) {
                const name = String(req.body.name || '').trim();
                if (!name || name.length > 200) return res.status(400).json({ error: 'Escribe un nombre válido.' });
                if (req.file) validateImage(req.file);
                const result = await transaction(pool, async db => {
                    const { rows: [previous] } = await db.query(`SELECT id FROM ${nativeTable} WHERE id=$1 FOR UPDATE`, [req.params.id]);
                    if (!previous) return null;
                    const path = req.file ? await storeImage(db, req, previous.id) : null;
                    const { rows: [row] } = await db.query(`UPDATE ${nativeTable} SET name=$2,image_path=coalesce($3,image_path) WHERE id=$1 RETURNING *`, [previous.id,name,path]);
                    const { rowCount } = await db.query(`SELECT 1 FROM ${images} WHERE path=$1`, [row.image_path]);
                    return withImage(row, rowCount > 0);
                });
                return result ? res.json({ template: result }) : res.status(404).json({ error: 'La cartilla ya no existe.' });
            }
            const rows=await request(req,`${table}?id=eq.${req.params.id}&limit=1`),row=rows[0];
            if(!row)return res.status(404).json({error:'La cartilla ya no existe.'});
            const name=String(req.body.name||'').trim();if(!name||name.length>200)return res.status(400).json({error:'Escribe un nombre válido.'});
            if(req.file)imagePath=await putImage(req,row.id);
            const oldPath=imagePath?row.image_path:null;
            const changed=await request(req,`${table}?id=eq.${row.id}`,{method:'PATCH',headers:json,body:JSON.stringify({name,...(imagePath?{image_path:imagePath}:{})})});
            imagePath=null;
            let warning;try{await removeIfUnused(req,oldPath);}catch(_){warning='La cartilla se guardó; la limpieza de la imagen anterior quedó pendiente.';}
            res.json({template:await sign(req,changed[0]),warning});
        }catch(error){if(imagePath)await removeIfUnused(req,imagePath).catch(()=>{});res.status(error.status||502).json({error:error.message});}
    });
    router.delete('/:id',owner,async(req,res)=>{
        try{
            if(!uuid.test(req.params.id))return res.status(400).json({error:'Cartilla inválida.'});
            const pool = getConfig().dublyoPool;
            if (pool) {
                const { rowCount } = await pool.query(`DELETE FROM ${nativeTable} t WHERE t.id=$1
                    AND NOT EXISTS (SELECT FROM ${schema}.summary_documents d WHERE d.template_id=t.id)
                    AND NOT EXISTS (SELECT FROM ${schema}.summary_publications p WHERE p.template_id=t.id)`, [req.params.id]);
                return rowCount ? res.json({ ok: true }) : res.status(409).json({ error: 'La cartilla ya no existe o está vinculada a un resumen.' });
            }
            const rows=await request(req,`${table}?id=eq.${req.params.id}&limit=1`);if(!rows[0])return res.status(404).json({error:'La cartilla ya no existe.'});
            await request(req,`${table}?id=eq.${req.params.id}`,{method:'DELETE',headers:json});
            let warning;try{await removeIfUnused(req,rows[0].image_path);}catch(_){warning='Registro eliminado; la limpieza de Storage quedó pendiente.';}
            res.json({ok:true,warning});
        }catch(error){res.status(error.status||502).json({error:error.message});}
    });
    return router;
};
