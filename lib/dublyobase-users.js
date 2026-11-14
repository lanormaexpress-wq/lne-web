'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const { randomBytes } = require('node:crypto');
const catalog = require('../admin-permission-catalog');
const { isOwner } = require('./summary-permissions');

const schema = 'lne_operational_20261111';
const users = 'proj_la_norma_express.users';
const uuid = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i;
const validPassword = value => typeof value === 'string' && value.length >= 8 && Buffer.byteLength(value) <= 72;
const fail = (status, message) => Object.assign(new Error(message), { status });

module.exports = function dublyobaseUsers({ requireAdmin, pool }) {
    const router = express.Router();
    router.use((req, res, next) => {
        if (!/^\/(?:users|access)(?:\/|$)/.test(req.path)) return next('router');
        res.set('Cache-Control', 'no-store');
        next();
    });
    router.use(requireAdmin);
    router.get('/access', (req, res) => res.json({
        owner: isOwner(req.adminUser), profile: req.adminUser.admin_profile, permissions: req.adminUser.admin_permissions
    }));
    router.use('/users', (req, res, next) => isOwner(req.adminUser)
        ? next() : res.status(403).json({ error: 'Solo OWNER puede gestionar usuarios.' }));

    function run(fn) {
        return async (req, res) => {
            try { await fn(req, res); }
            catch (error) {
                if (error.code === '23505') return res.status(409).json({ error: 'Ya existe una cuenta con ese correo.' });
                res.status(error.status || 503).json({ error: error.status ? error.message : 'No se pudo completar la operación de usuarios.' });
            }
        };
    }

    async function transaction(actor, fn) {
        const db = await pool.connect();
        try {
            await db.query('BEGIN');
            await db.query('SELECT pg_advisory_xact_lock(19560901)');
            const access = await db.query(`SELECT 1 FROM ${schema}.identity_directory d
                JOIN ${users} u ON u.id=d.id WHERE d.id=$1 AND u.disabled_at IS NULL
                AND d.metadata->'raw_app_meta_data'->>'role'='owner'
                AND coalesce((d.metadata->>'banned_until')::timestamptz <= now(), true)
                AND coalesce((d.metadata->>'is_anonymous')::boolean, false) = false`, [actor]);
            if (access.rowCount !== 1) throw fail(403, 'La cuenta ya no tiene permisos de propietario.');
            const result = await fn(db);
            await db.query('COMMIT');
            return result;
        } catch (error) {
            await db.query('ROLLBACK');
            throw error;
        } finally { db.release(); }
    }

    async function permissions(db, id, body, actor) {
        await db.query(`INSERT INTO ${schema}.admin_user_permissions(user_id, profile, permissions, updated_by)
            VALUES ($1,$2,$3::jsonb,$4)
            ON CONFLICT (user_id) DO UPDATE SET profile=excluded.profile,permissions=excluded.permissions,
            updated_by=excluded.updated_by,updated_at=now()`,
        [id, body.profile, JSON.stringify(catalog.normalize(body.permissions)), actor]);
    }

    router.get('/users', run(async (_req, res) => {
        const result = await pool.query(`SELECT u.id,u.email,
            coalesce(d.metadata->'raw_user_meta_data'->>'name',u.email) AS name,
            d.metadata->'raw_app_meta_data'->>'role' AS role, coalesce(p.profile,'custom') AS profile,
            coalesce(p.permissions,'{}'::jsonb) AS permissions,
            CASE WHEN u.disabled_at IS NULL THEN 'Activo' ELSE 'Bloqueado' END AS status
            FROM ${users} u JOIN ${schema}.identity_directory d ON d.id=u.id
            LEFT JOIN ${schema}.admin_user_permissions p ON p.user_id=u.id ORDER BY u.email`);
        res.json({ users: result.rows });
    }));

    router.post('/users', run(async (req, res) => {
        const { name, email, password, profile } = req.body || {};
        if (typeof name !== 'string' || !name.trim() || name.length > 200 ||
            typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
            !validPassword(password) || !Object.hasOwn(catalog.presets, profile)) throw fail(400, 'Revisa el nombre, correo, contraseña y perfil.');
        const address = email.trim().toLowerCase();
        const hash = await bcrypt.hash(password, 12);
        const role = profile === 'owner' ? 'owner' : 'editor';
        const id = await transaction(req.adminUser.id, async db => {
            const result = await db.query(`INSERT INTO ${users}(email,email_normalized,verified,password_hash,token_key)
                VALUES ($1,$1,true,$2,$3) RETURNING id`, [address, hash, randomBytes(32).toString('base64url')]);
            const id = result.rows[0].id;
            await db.query(`INSERT INTO ${schema}.identity_directory(id,metadata) VALUES ($1,$2::jsonb)`,
                [id, JSON.stringify({ id, email: address, raw_app_meta_data: { role }, raw_user_meta_data: { name: name.trim() } })]);
            await permissions(db, id, req.body, req.adminUser.id);
            return id;
        });
        res.status(201).json({ id, name: name.trim(), email: address, profile, message: 'USUARIO CREADO' });
    }));

    router.patch('/users/:id', run(async (req, res) => {
        const { name, profile } = req.body || {};
        if (!uuid.test(req.params.id) || !Object.hasOwn(catalog.presets, profile) ||
            (name !== undefined && (typeof name !== 'string' || !name.trim() || name.length > 200))) throw fail(400, 'Cuenta o perfil inválido.');
        const role = profile === 'owner' ? 'owner' : 'editor';
        if (req.params.id.toLowerCase() === req.adminUser.id && role !== 'owner') throw fail(409, 'No puedes quitarte el rol de propietario.');
        await transaction(req.adminUser.id, async db => {
            const result = await db.query(`UPDATE ${schema}.identity_directory d SET metadata = d.metadata ||
                jsonb_build_object('raw_app_meta_data',coalesce(d.metadata->'raw_app_meta_data','{}'::jsonb)||jsonb_build_object('role',$2::text),
                    'raw_user_meta_data',coalesce(d.metadata->'raw_user_meta_data','{}'::jsonb)||
                    CASE WHEN $3::text IS NULL THEN '{}'::jsonb ELSE jsonb_build_object('name',$3::text) END)
                WHERE d.id=$1 AND EXISTS (SELECT 1 FROM ${users} u WHERE u.id=d.id)`,
            [req.params.id, role, name?.trim() ?? null]);
            if (result.rowCount !== 1) throw fail(404, 'Cuenta no disponible.');
            await permissions(db, req.params.id, req.body, req.adminUser.id);
        });
        res.json({ ok: true });
    }));

    router.post('/users/:id/password', run(async (req, res) => {
        const { password, confirmPassword } = req.body || {};
        if (!uuid.test(req.params.id) || !validPassword(password) || password !== confirmPassword) {
            throw fail(400, 'Las contraseñas deben coincidir y cumplir el mínimo de ocho caracteres y el máximo de 72 bytes.');
        }
        const hash = await bcrypt.hash(password, 12);
        await transaction(req.adminUser.id, async db => {
            const changed = await db.query(`UPDATE ${users} u SET password_hash=$2, token_key=$3, updated=now()
                WHERE u.id=$1 AND EXISTS (SELECT 1 FROM ${schema}.identity_directory d WHERE d.id=u.id)`,
            [req.params.id, hash, randomBytes(32).toString('base64url')]);
            if (changed.rowCount !== 1) throw fail(404, 'Cuenta no disponible.');
            await db.query(`SELECT ${schema}.revoke_lne_credentials($1)`, [req.params.id]);
        });
        res.json({ ok: true, message: 'Contraseña actualizada correctamente.' });
    }));
    return router;
};
