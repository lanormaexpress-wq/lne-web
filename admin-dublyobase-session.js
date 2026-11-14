'use strict';

window.LNEDublyobaseSession = function createSessionClient() {
    const key = 'lne-dublyobase-session-v1';
    const listeners = new Set();
    let session = null;
    let timer, refreshing;

    async function request(operation, body) {
        const response = await fetch('/api/admin-account/' + operation, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body), signal: AbortSignal.timeout(20000)
        });
        const result = response.status === 204 ? {} : await response.json();
        if (!response.ok) throw Object.assign(new Error(result.error || 'No se pudo validar la sesión.'), { status: response.status });
        return result.session;
    }

    function setSession(value, event) {
        session = value;
        clearTimeout(timer);
        if (value) {
            sessionStorage.setItem(key, JSON.stringify(value));
            timer = setTimeout(() => { refresh().catch(() => {}); }, Math.max(5000, value.expires_at * 1000 - Date.now() - 45000));
        } else sessionStorage.removeItem(key);
        if (event) for (const listener of listeners) listener(event, value);
    }

    function refresh() {
        if (refreshing) return refreshing;
        const active = session;
        if (!active) return Promise.resolve(null);
        refreshing = request('refresh', { refresh_token: active.refresh_token }).then(value => {
            if (session === active) setSession(value, 'TOKEN_REFRESHED');
            return session;
        }).catch(error => {
            if (session === active) {
                if ([401, 403].includes(error.status)) setSession(null, 'SIGNED_OUT');
                else timer = setTimeout(() => { refresh().catch(() => {}); }, 15000);
            }
            throw error;
        }).finally(() => { refreshing = null; });
        return refreshing;
    }

    function from(table) {
        const query = { table, fields: '*', filters: [], orders: [], from: 0, size: 1000, count: false };
        let cardinality;
        let articleUpdate;
        const unavailable = () => Promise.resolve({ data: null, error: new Error('Esta escritura aún no está disponible en Dublyobase.') });
        const builder = {
            select(fields, options) { query.fields = fields; query.count = options?.count === 'exact'; return builder; },
            eq(field, value) { query.filters.push([field, value]); return builder; },
            order(field, options) { query.orders.push([field, options?.ascending !== false]); return builder; },
            range(first, last) { query.from = first; query.size = last - first + 1; return builder; },
            limit(size) { query.size = size; return builder; },
            or(pattern) {
                const matched = /^numero_articulo\.ilike\.%(.+)%,titulo\.ilike\.%\1%,contenido\.ilike\.%\1%$/.exec(pattern);
                if (!matched) throw new Error('Búsqueda no válida.');
                query.search = matched[1];
                return builder;
            },
            single() { cardinality = 'one'; return builder; },
            maybeSingle() { cardinality = 'optional'; return builder; },
            update(payload) { articleUpdate = payload; return builder; },
            insert: unavailable, upsert: unavailable, delete: unavailable,
            then(resolve, reject) {
                return execute().then(resolve, reject);
            }
        };
        async function execute() {
            try {
                const writing = articleUpdate !== undefined;
                const [field, id] = query.filters[0] || [];
                if (writing && (table !== 'articulos_legales' || query.filters.length !== 1 || field !== 'id' ||
                    !Number.isSafeInteger(id) || id < 1)) throw new Error('Solo se puede actualizar un artículo por su ID.');
                const path = writing ? 'articles/' + id : 'query';
                const response = await fetch('/api/admin/legislation-data/' + path, {
                    method: writing ? 'PATCH' : 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + session?.access_token },
                    body: JSON.stringify(writing ? articleUpdate : query),
                    signal: AbortSignal.timeout(15000)
                });
                const result = await response.json().catch(() => ({}));
                if (!response.ok) throw Object.assign(new Error(result.error || 'No se pudo completar la operación de legislación.'), { code: result.code });
                if (writing) return { data: result.data, count: null, error: null };
                if (cardinality && (result.data.length > 1 || (cardinality === 'one' && !result.data.length))) {
                    throw new Error('No se encontró un registro único.');
                }
                return { data: cardinality ? result.data[0] || null : result.data, count: result.count, error: null };
            } catch (error) { return { data: null, count: null, error }; }
        }
        return builder;
    }

    return { from, auth: {
        async getSession() {
            try {
                if (!session) {
                    const cached = JSON.parse(sessionStorage.getItem(key) || 'null');
                    if (cached?.refresh_token && Number.isFinite(cached.expires_at)) setSession(cached);
                }
                if (session && session.expires_at * 1000 <= Date.now() + 45000) await refresh();
                return { data: { session }, error: null };
            } catch (error) { return { data: { session: null }, error }; }
        },
        onAuthStateChange(listener) { listeners.add(listener); },
        async signInWithPassword(input) {
            try {
                await refreshing?.catch(() => {});
                const value = await request('login', input);
                setSession(value);
                return { data: { session: value }, error: null };
            } catch (error) { return { data: { session: null }, error }; }
        },
        async getUser() { return { data: { user: session?.user || null }, error: null }; },
        async signOut() {
            clearTimeout(timer);
            await refreshing?.catch(() => {});
            const token = session?.refresh_token;
            setSession(null, 'SIGNED_OUT');
            if (token) await request('logout', { refresh_token: token });
        }
    } };
};
