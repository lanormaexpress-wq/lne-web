const express = require('express');
const catalog = require('../admin-permission-catalog');
const { isOwner, allowed } = require('./summary-permissions');
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const emailValid = value => typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const nameValid = value => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= 200;
const passwordValid = value => typeof value === 'string' && value.length >= 8 && value.length <= 256;
module.exports = function ({ requireAdmin, rest, auth, serviceAvailable }) {
    const router = express.Router();
    router.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
    router.use((req, _res, next) => /^\/(?:users|access)(?:[/?]|$)/.test(req.url) ? next() : next('router'));
    router.use(requireAdmin);
    router.get('/access', (req, res) => res.json({ owner: isOwner(req.adminUser), profile: req.adminUser.admin_profile || (isOwner(req.adminUser) ? 'owner' : 'custom'), permissions: req.adminUser.admin_permissions || {} }));
    router.use('/users', (req, res, next) => allowed(req.adminUser, 'users_manage') ? next() : res.status(403).json({ error: 'No tienes acceso a Usuarios.' }));
    router.get('/users', async (req, res) => {
        try { res.json({ users: (await rest('rpc/admin_list_users', { authorization: req.get('authorization'), method: 'POST', body: {} })).data }); }
        catch (_) { res.status(502).json({ error: 'No se pudo consultar el directorio seguro.' }); }
    });
    router.use('/users', (req, res, next) => isOwner(req.adminUser) ? next() : res.status(403).json({ error: 'Solo OWNER puede modificar cuentas y permisos.' }));
    async function authRequest(path, options) {
        if (!serviceAvailable()) throw Object.assign(new Error('Configura SUPABASE_SECRET_KEY o SUPABASE_SERVICE_ROLE_KEY únicamente en el servidor para gestionar cuentas Auth.'), { status: 503 });
        const response = await auth(path, options), body = response.status === 204 ? {} : await response.json();
        if (!response.ok) {
            const messages = { email_exists: 'Ya existe una cuenta con ese correo.', user_already_exists: 'Ya existe una cuenta con ese correo.', weak_password: 'La contraseña no cumple la política de seguridad de Supabase.', same_password: 'Elige una contraseña diferente a la actual.' };
            throw Object.assign(new Error(messages[body?.code || body?.error_code] || 'Auth rechazó la operación. Comprueba la cuenta, la clave del servidor y la protección del último OWNER.'), { status: response.status });
        }
        return body;
    }
    async function savePermissions(req, id) {
        const profile = req.body.profile || 'custom';
        if (!Object.hasOwn(catalog.presets, profile)) throw Object.assign(new Error('Perfil inválido.'), { status: 400 });
        return rest('admin_user_permissions?on_conflict=user_id', { authorization: req.get('authorization'), method: 'POST', prefer: 'resolution=merge-duplicates', body: {
            user_id: id, profile, permissions: catalog.normalize(req.body.permissions), updated_at: new Date().toISOString(), updated_by: req.adminUser.id
        } });
    }
    router.post('/users', async (req, res) => {
        let created;
        try {
            const { name, email, password, profile } = req.body;
            if (!nameValid(name) || !emailValid(typeof email === 'string' ? email.trim() : '') || !passwordValid(password) || !Object.hasOwn(catalog.presets, profile)) return res.status(400).json({ error: 'Completa nombre (máximo 200 caracteres), correo válido, contraseña de 8 a 256 caracteres y perfil.' });
            if (!serviceAvailable()) return res.status(503).json({ error: 'Para crear cuentas reales debes configurar la clave privada de Supabase en el servidor.' });
            created = await authRequest('/users', { method: 'POST', body: JSON.stringify({ email: email.trim(), password, email_confirm: true, user_metadata: { name: name.trim() }, app_metadata: { role: profile === 'owner' ? 'owner' : 'editor' } }) });
            await savePermissions(req, created.id);
            res.status(201).json({ id: created.id, name: name.trim(), email: email.trim(), profile, message: 'USUARIO CREADO' });
        } catch (e) {
            // Never serialize provider failures: request objects may contain credentials.
            res.status(e.status || 502).json({ error: created ? 'Cuenta creada, pero faltó guardar permisos. Reabre esta cuenta en Usuarios; no vuelvas a crearla.' : e.status ? e.message : 'No se pudo completar la creación. Consulta Usuarios antes de reintentar para evitar duplicados.', id: created?.id });
        }
    });
    router.patch('/users/:id', async (req, res) => {
        try {
            if (!uuid.test(req.params.id) || !Object.hasOwn(catalog.presets, req.body.profile)) return res.status(400).json({ error: 'Cuenta o perfil inválido.' });
            if (req.body.name !== undefined && !nameValid(req.body.name)) return res.status(400).json({ error: 'Nombre válido de hasta 200 caracteres requerido.' });
            const roster = (await rest('rpc/admin_list_users', { authorization: req.get('authorization'), method: 'POST', body: {} })).data;
            const previous = roster.find(u => u.id === req.params.id);
            if (!previous) return res.status(404).json({ error: 'Cuenta no disponible.' });
            const role = req.body.profile === 'owner' ? 'owner' : 'editor';
            if (previous.role === 'owner' && role !== 'owner' && roster.filter(u => u.role === 'owner' && u.status !== 'Bloqueado').length <= 1) return res.status(409).json({ error: 'No puedes degradar al último OWNER.' });
            // Permission edits do not touch Auth metadata. Role changes use Auth Admin and merge the existing metadata.
            const nameChanged = typeof req.body.name === 'string' && req.body.name.trim() !== previous.name;
            if (previous.role !== role || nameChanged) {
                const target = await authRequest('/users/' + req.params.id);
                await authRequest('/users/' + req.params.id, { method: 'PUT', body: JSON.stringify({
                    ...(previous.role !== role ? { app_metadata: { ...target.app_metadata, role } } : {}),
                    ...(nameChanged ? { user_metadata: { ...target.user_metadata, name: req.body.name.trim() } } : {})
                }) });
            }
            await savePermissions(req, req.params.id);
            res.json({ ok: true });
        } catch (e) { res.status(e.status || 502).json({ error: e.status ? e.message : 'No se pudo guardar la cuenta.' }); }
    });
    router.post('/users/:id/password', async (req, res) => {
        if (!uuid.test(req.params.id)) return res.status(400).json({ error: 'Cuenta inválida.' });
        if (!passwordValid(req.body.password) || req.body.password !== req.body.confirmPassword) return res.status(400).json({ error: 'Las contraseñas deben coincidir y tener de 8 a 256 caracteres.' });
        try {
            // Password only: do not replace roles, metadata, permissions or document identities.
            await authRequest('/users/' + req.params.id, { method: 'PUT', body: JSON.stringify({ password: req.body.password }) });
            res.json({ ok: true, message: 'Contraseña actualizada correctamente.' });
        } catch (e) { res.status(e.status || 502).json({ error: e.status ? e.message : 'No se pudo restablecer la contraseña.' }); }
    });
    router.delete('/users/:id', async (req, res) => {
        try {
            if (!uuid.test(req.params.id)) return res.status(400).json({ error: 'Cuenta inválida.' });
            if (req.params.id === req.adminUser.id) return res.status(409).json({ error: 'No puedes eliminar tu propia cuenta.' });
            const authorization = req.get('authorization');
            const roster = (await rest('rpc/admin_list_users', { authorization, method: 'POST', body: {} })).data;
            const target = roster.find(user => user.id === req.params.id);
            if (!target) return res.status(404).json({ error: 'Cuenta no disponible.' });
            if (target.role === 'owner' && roster.filter(user => user.role === 'owner' && user.status !== 'Bloqueado').length <= 1) return res.status(409).json({ error: 'No puedes eliminar al último OWNER.' });
            const id = req.params.id;
            const [documents, cards] = await Promise.all([
                rest(`summary_documents?select=id&or=(author_id.eq.${id},published_by.eq.${id})&limit=1`, { authorization }),
                rest(`summary_templates?select=id&created_by=eq.${id}&limit=1`, { authorization })
            ]);
            if (documents.data?.length || cards.data?.length) return res.status(409).json({ error: 'No se puede eliminar: tiene documentos, publicaciones o cartillas asociados. Se conserva la cuenta y la trazabilidad; no se ha borrado contenido.' });
            await authRequest('/users/' + req.params.id, { method: 'DELETE' });
            res.status(204).end();
        } catch (e) { res.status(e.status || 502).json({ error: e.status ? e.message : 'No se pudo eliminar la cuenta. Los datos asociados se conservan.' }); }
    });
    return router;
};
