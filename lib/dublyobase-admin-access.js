'use strict';

const { createDublyobaseAuth } = require('./dublyobase-auth');

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

function createAdminAccess({ pool, fetchImpl }) {
    if (!pool || typeof pool.query !== 'function') throw new TypeError('Se requiere una conexión privada de PostgreSQL.');

    return createDublyobaseAuth({
        fetchImpl,
        async findAccess(id) {
            if (!uuid.test(id)) return null;
            const { rows } = await pool.query({
                text: `SELECT d.metadata->'raw_app_meta_data'->>'role' AS role,
                              p.profile, p.permissions
                       FROM lne_operational_20261111.identity_directory AS d
                       LEFT JOIN lne_operational_20261111.admin_user_permissions AS p ON p.user_id = d.id
                       WHERE d.id = $1::uuid
                         AND (p.user_id IS NOT NULL OR d.metadata->'raw_app_meta_data'->>'role' = 'owner')
                         AND coalesce((d.metadata->>'banned_until')::timestamptz <= now(), true)
                         AND coalesce((d.metadata->>'is_anonymous')::boolean, false) = false`,
                values: [id],
                query_timeout: 5000
            });
            return rows[0] || null;
        }
    });
}

module.exports = { createAdminAccess };
