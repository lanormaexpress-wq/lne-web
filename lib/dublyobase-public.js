'use strict';

const legalTables = new Set(['normas_legales', 'articulos_legales']);
const tables = new Set([...legalTables, 'summary_publications', 'summary_templates']);
const columns = /^[a-z][a-z0-9_]*$/;

function createPublicReader({ url, project, token, fetchImpl = fetch }) {
    const origin = new URL(url);
    if (origin.protocol !== 'https:' || origin.username || origin.password || origin.pathname !== '/' ||
        origin.search || origin.hash || !/^[a-z][a-z0-9_]*$/.test(project) || !token) {
        throw new Error('Configuración de lectura Dublyobase inválida.');
    }
    async function page(table, options) {
        const { offset, limit, fields, sort, filter } = options;
        const params = new URLSearchParams({ fields, limit, offset, sort, filter: JSON.stringify(filter) });
        const endpoint = new URL(`/api/projects/${project}/collections/${table}/records`, origin);
        endpoint.search = params;
        const response = await fetchImpl(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
            redirect: 'error',
            signal: AbortSignal.timeout(12000)
        });
        if (!response.ok) throw Object.assign(new Error('Lectura de Dublyobase no disponible.'), { status: 502 });
        const result = await response.json();
        if (!Array.isArray(result.items) || !Number.isSafeInteger(result.totalItems)) {
            throw new Error('Respuesta de Dublyobase inválida.');
        }
        return result;
    }
    async function read(resource, { offset: initialOffset = 0, limit: defaultLimit = 1000 } = {}) {
        const [table, raw] = resource.split('?');
        if (!tables.has(table)) throw new Error('Tabla de lectura no permitida.');
        const params = new URLSearchParams(raw);
        const requested = (params.get('select') || '').split(',');
        if (!requested.every(value => columns.test(value))) throw new Error('Columnas inválidas.');
        const apiField = field => table === 'normas_legales' && field === 'codigo' ? 'id' : field;
        const fields = [...new Set(requested.map(apiField))].join(',');
        const order = (params.get('order') || '').split(',').filter(Boolean).map(item => {
            const [field, direction] = item.split('.');
            if (!columns.test(field) || !['asc', 'desc'].includes(direction)) throw new Error('Orden inválido.');
            return direction === 'desc' ? '-' + apiField(field) : apiField(field);
        });
        const key = 'id';
        if (!order.some(field => field === key || field === '-' + key)) order.push(key);
        const filter = Object.create(null);
        for (const [field, value] of params) {
            if (['select', 'order', 'limit', 'offset'].includes(field)) continue;
            if (!columns.test(field) || !value.startsWith('eq.')) throw new Error('Filtro inválido.');
            filter[apiField(field)] = { _eq: value.slice(3) };
        }
        if (legalTables.has(table)) filter.estado = { _eq: 'publicado' };
        const offset = Number(params.get('offset') ?? initialOffset);
        const limit = Number(params.get('limit') ?? defaultLimit);
        if (!Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(limit) || limit < 1 || limit > 1000) {
            throw new Error('Paginación inválida.');
        }
        const rows = [];
        let total;
        while (rows.length < limit) {
            const result = await page(table, { fields, sort: order.join(','), filter, offset: offset + rows.length, limit: Math.min(500, limit - rows.length) });
            total ??= result.totalItems;
            if (result.totalItems !== total) throw new Error('El catálogo cambió durante la lectura.');
            rows.push(...result.items.map(row => Object.fromEntries(requested.map(field => [field, row[apiField(field)]]))));
            if (!result.items.length || offset + rows.length >= total) break;
        }
        Object.defineProperty(rows, 'total', { value: total });
        return rows;
    }
    return { read };
}

module.exports = { createPublicReader };
