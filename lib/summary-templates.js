const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const { courses } = require('../formacion');
const bucket = 'summary-template-images';
const { canCreateCard } = require('./summary-permissions');

module.exports = function templateRouter(getConfig) {
    const router = express.Router();
    const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4194304, files: 1, fields: 3 } }).single('image');
    async function request(req, route, options = {}) {
        const cfg = getConfig();
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
    router.get('/', async (req,res) => {
        try {
            if (!courses.some(c=>c.id===req.query.course_id)) return res.status(400).json({error:'Selecciona un curso existente.'});
            const rows=await request(req,`${table}?course_id=eq.${encodeURIComponent(req.query.course_id)}&is_active=eq.true&order=sort_order.asc,created_at.asc`);
            res.json({templates:await Promise.all(rows.map(row=>sign(req,row)))});
        } catch(error){res.status(error.status||502).json({error:error.message});}
    });
    router.post('/', (req, res, next) => canCreateCard(req.adminUser) ? next() : res.status(403).json({ error:'No tienes permiso para crear cartillas.' }), parseUpload, async (req,res) => {
        let imagePath;
        try {
            const name=String(req.body.name||'').trim(),courseId=req.body.course_id;
            if(!name || name.length>200 || !courses.some(c=>c.id===courseId)) return res.status(400).json({error:'Nombre y curso válidos son obligatorios.'});
            const id=crypto.randomUUID();imagePath=await putImage(req,id);
            const rows=await request(req,table,{method:'POST',headers:json,body:JSON.stringify({id,course_id:courseId,name,image_path:imagePath,created_by:req.adminUser.id})});
            imagePath=null;
            res.status(201).json({template:await sign(req,rows[0])});
        }catch(error){if(imagePath)await removeIfUnused(req,imagePath).catch(()=>{});res.status(error.status||502).json({error:error.message});}
    });
    router.patch('/:id',owner,parseUpload,async(req,res)=>{
        let imagePath;
        try{
            if(!/^[a-f0-9-]{36}$/i.test(req.params.id))return res.status(400).json({error:'Cartilla inválida.'});
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
            if(!/^[a-f0-9-]{36}$/i.test(req.params.id))return res.status(400).json({error:'Cartilla inválida.'});
            const rows=await request(req,`${table}?id=eq.${req.params.id}&limit=1`);if(!rows[0])return res.status(404).json({error:'La cartilla ya no existe.'});
            await request(req,`${table}?id=eq.${req.params.id}`,{method:'DELETE',headers:json});
            let warning;try{await removeIfUnused(req,rows[0].image_path);}catch(_){warning='Registro eliminado; la limpieza de Storage quedó pendiente.';}
            res.json({ok:true,warning});
        }catch(error){res.status(error.status||502).json({error:error.message});}
    });
    return router;
};
