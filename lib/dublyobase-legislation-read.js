'use strict';

const express = require('express');
const { isOwner } = require('./summary-permissions');
const schema = 'lne_operational_20261111';
const columns = {
    normas_legales: ['codigo', 'nombre'],
    articulos_legales: ['id', 'codigo', 'numero_articulo', 'titulo', 'orden', 'estado', 'contenido'],
    permisos_editor: ['user_id']
};

module.exports = function legislationRead({ pool, requireAdmin }) {
    const router = express.Router();
    router.patch('/articles/:id', requireAdmin, async (req, res) => {
        res.set('Cache-Control', 'no-store');
        if (!isOwner(req.adminUser)) return res.status(403).json({ error: 'Solo el propietario puede modificar artículos en esta conexión.' });
        const id = Number(req.params.id);
        const { numero_articulo, titulo, contenido, resumen, contenido_lne, estructura, orden, estado } = req.body || {};
        const optionalText = value => value === null || typeof value === 'string';
        const object = value => value && typeof value === 'object' && !Array.isArray(value);
        if (!Number.isSafeInteger(id) || id < 1 || typeof numero_articulo !== 'string' ||
            !numero_articulo.trim() || numero_articulo.length > 300 || !optionalText(titulo) ||
            typeof contenido !== 'string' || !optionalText(resumen) || !object(contenido_lne) ||
            !object(estructura) || !Number.isInteger(orden) || orden < 1 || orden > 2147483647 ||
            !['publicado', 'borrador'].includes(estado)) {
            return res.status(400).json({ error: 'Revisa el número, el contenido y el orden del artículo.' });
        }
        try {
            const result = await pool.query(`UPDATE ${schema}.articulos_legales a
                SET numero_articulo=$2,titulo=$3,contenido=$4,resumen=$5,contenido_lne=$6::jsonb,
                    estructura=$7::jsonb,orden=$8,estado=$9,actualizado_en=now(),
                    publicado_en=CASE WHEN $9='publicado' THEN coalesce(a.publicado_en,now()) END,
                    publicado_por=CASE WHEN $9='publicado' THEN $10::uuid END
                WHERE a.id=$1 AND EXISTS (
                    SELECT 1 FROM ${schema}.identity_directory d JOIN proj_la_norma_express.users u ON u.id=d.id
                    WHERE d.id=$10 AND d.metadata->'raw_app_meta_data'->>'role'='owner' AND u.disabled_at IS NULL
                    AND coalesce((d.metadata->>'banned_until')::timestamptz <= now(), true)
                    AND coalesce((d.metadata->>'is_anonymous')::boolean, false)=false)
                RETURNING a.*`, [id, numero_articulo.trim(), titulo, contenido, resumen,
                JSON.stringify(contenido_lne), JSON.stringify(estructura), orden, estado, req.adminUser.id]);
            if (!result.rowCount) return res.status(404).json({ error: 'Artículo no disponible.' });
            res.json({ data: result.rows[0] });
        } catch (error) {
            if (error.code === '23505') return res.status(409).json({ code: '23505', error: 'Ya existe ese número en la norma.' });
            res.status(503).json({ error: 'No se pudo guardar el artículo.' });
        }
    });
    router.post('/query', requireAdmin, async (req, res) => {
        res.set('Cache-Control', 'no-store');
        const { table, fields, filters, orders, from, size, count, search } = req.body || {};
        if (!Object.hasOwn(columns, table)) return res.sendStatus(400);
        const valid = column => columns[table].includes(column);
        const projection = typeof fields === 'string' ? fields.split(',').map(c => c.trim()) : [];
        if (!(fields === '*' || (projection.length && projection.every(valid))) ||
            !Array.isArray(filters) || filters.length > 4 || !filters.every(f => Array.isArray(f) && valid(f[0]) && ['string', 'number'].includes(typeof f[1])) ||
            !Array.isArray(orders) || orders.length > 3 || !orders.every(o => Array.isArray(o) && valid(o[0]) && typeof o[1] === 'boolean') ||
            !Number.isSafeInteger(from) || from < 0 || from > 100000 || !Number.isInteger(size) || size < 1 || size > 1000 ||
            (search !== undefined && (table !== 'articulos_legales' || typeof search !== 'string' || search.length > 120))) {
            return res.sendStatus(400);
        }
        const args = [];
        const bind = value => '$' + args.push(value);
        const predicates = filters.map(([field, value]) => `"${field}"=${bind(value)}`);
        if (table === 'permisos_editor') predicates.push(`user_id=${bind(req.adminUser.id)}::uuid`);
        if (search) {
            const parameter = bind(search);
            predicates.push(`(strpos(lower(numero_articulo),lower(${parameter}))>0 OR strpos(lower(titulo),lower(${parameter}))>0 OR strpos(lower(contenido),lower(${parameter}))>0)`);
        }
        const suffix = `FROM ${schema}."${table}"${predicates.length ? ' WHERE ' + predicates.join(' AND ') : ''}`;
        const order = [...orders];
        const tie = table === 'articulos_legales' ? 'id' : table === 'normas_legales' ? 'codigo' : null;
        if (tie && !order.some(([column]) => column === tie)) order.push([tie, true]);
        try {
            const totals = count ? await pool.query('SELECT count(*)::int AS total ' + suffix, args) : null;
            const result = await pool.query(`SELECT ${fields === '*' ? '*' : projection.map(c => '"' + c + '"').join(',')} ${suffix}
                ${order.length ? 'ORDER BY ' + order.map(([c, asc]) => '"' + c + '" ' + (asc ? 'ASC' : 'DESC')).join(',') : ''}
                LIMIT ${bind(size)} OFFSET ${bind(from)}`, args);
            res.json({ data: result.rows, count: totals?.rows[0].total ?? null });
        } catch (_) {
            res.status(503).json({ error: 'No se pudo consultar la legislación.' });
        }
    });
    return router;
};
