'use strict';

const origin = 'https://dublyobase.yaperocallate.dpdns.org';
const prefix = '/api/projects/la_norma_express/auth/';

function authError(status, message) {
    return Object.assign(new Error(message), { status });
}

function createDublyobaseAuth({ fetchImpl = fetch, findAccess } = {}) {
    async function request(operation, { body, token } = {}) {
        let response;
        try {
            response = await fetchImpl(new URL(prefix + operation, origin), {
                method: body === undefined ? 'GET' : 'POST',
                headers: {
                    Accept: 'application/json',
                    ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: body === undefined ? undefined : JSON.stringify(body),
                signal: AbortSignal.timeout(10000),
                redirect: 'error'
            });
        } catch (_) {
            throw authError(503, 'El servicio de acceso no está disponible.');
        }
        if (response.status === 429) throw authError(429, 'Demasiados intentos. Intenta más tarde.');
        if (response.status >= 500) throw authError(503, 'El servicio de acceso no está disponible.');
        if (!response.ok) throw authError(401, 'Credenciales o sesión no válidas.');
        if (response.status === 204) return null;
        try { return await response.json(); }
        catch (_) { throw authError(502, 'Respuesta de acceso no válida.'); }
    }

    function identity(user) {
        if (!user || typeof user.id !== 'string' || !user.id || typeof user.email !== 'string' || !user.email) {
            throw authError(502, 'Respuesta de acceso no válida.');
        }
        // Authorization is resolved separately from the migrated permission table.
        return { id: user.id, email: user.email };
    }

    function session(result) {
        if (result?.mfaRequired) throw authError(403, 'La cuenta requiere verificación adicional.');
        if (typeof result?.token !== 'string' || !result.token || typeof result.refreshToken !== 'string' || !result.refreshToken) {
            throw authError(502, 'Respuesta de acceso no válida.');
        }
        return { token: result.token, refreshToken: result.refreshToken, expiresAt: result.expiresAt, user: identity(result.user) };
    }

    return {
        async login(email, password) { return session(await request('login', { body: { email, password } })); },
        async refresh(refreshToken) { return session(await request('refresh', { body: { refreshToken } })); },
        async me(token) {
            if (typeof token !== 'string' || !token) throw authError(401, 'Sesión requerida.');
            return identity((await request('me', { token }))?.user);
        },
        async admin(token) {
            if (typeof findAccess !== 'function') throw authError(503, 'Permisos administrativos no configurados.');
            if (typeof token !== 'string' || !token) throw authError(401, 'Sesión requerida.');
            const user = identity((await request('me', { token }))?.user);
            const access = await findAccess(user.id);
            if (!access || !['owner', 'editor'].includes(access.role)) {
                throw authError(403, 'Acceso reservado al equipo editorial.');
            }
            return {
                ...user,
                app_metadata: { role: access.role },
                admin_permissions: access.permissions || {},
                admin_profile: access.role === 'owner' ? 'owner' : access.profile || 'custom'
            };
        },
        async logout(refreshToken) { await request('logout', { body: { refreshToken } }); },
        async requestReset(email) { await request('request-password-reset', { body: { email } }); },
        async confirmReset(email, token, password) {
            await request('confirm-password-reset', { body: { email, token, password } });
        }
    };
}

module.exports = { createDublyobaseAuth };
