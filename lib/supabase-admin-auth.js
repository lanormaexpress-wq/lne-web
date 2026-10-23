// Server-only. Never serialize this client, its headers, environment or provider responses.
module.exports = function adminAuth({ url, env = process.env, request = fetch }) {
    const secret = (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
    const modern = secret.startsWith('sb_secret_');
    let legacy = false;
    try { legacy = secret.split('.').length === 3 && JSON.parse(Buffer.from(secret.split('.')[1], 'base64url')).role === 'service_role'; } catch (_) { /* Not a legacy service credential. */ }
    const available = () => Boolean(secret && (modern || legacy));
    return {
        available,
        async request(pathname, options = {}) {
            if (!available()) throw Object.assign(new Error('Configura SUPABASE_SECRET_KEY o SUPABASE_SERVICE_ROLE_KEY únicamente en el servidor para gestionar cuentas Auth.'), { status: 503 });
            if (new URL(url).protocol !== 'https:') throw Object.assign(new Error('SUPABASE_URL debe usar HTTPS para enviar credenciales privadas.'), { status: 503 });
            if (!/^\/users(?:\/[a-f0-9-]{36})?(?:\?.*)?$/i.test(pathname)) throw new Error('Operación Auth inválida.');
            return request(`${url}/auth/v1/admin${pathname}`, {
                ...options, redirect: 'error', signal: AbortSignal.timeout(20000),
                headers: { apikey: secret, ...(legacy ? { Authorization: `Bearer ${secret}` } : {}), 'Content-Type': 'application/json' }
            });
        }
    };
};
