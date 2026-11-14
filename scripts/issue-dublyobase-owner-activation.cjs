'use strict';

// Run from a private terminal with a Dublyobase operator connection.
// The application database account does not need access to the token table.
const { randomBytes, createHash } = require('node:crypto');
const { Client } = require('pg');

async function main() {
    if (!process.stdout.isTTY || !process.env.LNE_DUBLYOBASE_OPERATOR_URL) {
        throw new Error('Usa una terminal privada con LNE_DUBLYOBASE_OPERATOR_URL.');
    }
    const client = new Client({ connectionString: process.env.LNE_DUBLYOBASE_OPERATOR_URL, connectionTimeoutMillis: 5000 });
    const token = 'dbo_reset_' + randomBytes(32).toString('base64url');
    const hash = createHash('sha256').update(token).digest('hex');
    await client.connect();
    try {
        const result = await client.query(`
            WITH target AS MATERIALIZED (
                SELECT p.id AS project_id, u.id AS user_id
                FROM _dbo.projects p
                JOIN proj_la_norma_express.users u ON u.email_normalized = $1
                JOIN lne_operational_20261111.identity_directory d ON d.id = u.id
                WHERE p.slug = 'la_norma_express' AND p.schema_name = 'proj_la_norma_express'
                  AND d.metadata->'raw_app_meta_data'->>'role' = 'owner'
                  AND u.disabled_at IS NULL AND u.password_hash = 'password-reset-required'
                FOR UPDATE OF u
            ), retired AS (
                UPDATE _dbo.auth_tokens t SET used_at = now()
                FROM target x WHERE t.project_id = x.project_id AND t.user_id = x.user_id
                  AND t.type = 'password_reset' AND t.collection = 'users' AND t.used_at IS NULL
            )
            INSERT INTO _dbo.auth_tokens(project_id, collection, user_id, type, token_hash, expires_at, data)
            SELECT project_id, 'users', user_id, 'password_reset', $2, now() + interval '15 minutes', '{}'::jsonb
            FROM target
            RETURNING expires_at
        `, ['angelqh74@gmail.com', hash]);
        if (result.rowCount !== 1) throw new Error('No existe una cuenta propietaria pendiente de activación.');
        console.log('Código privado de un solo uso, válido por 15 minutos:');
        console.log(token);
    } finally {
        await client.end();
    }
}

main().catch(error => {
    console.error(error.code ? 'No se pudo emitir el código. Código técnico: ' + error.code : error.message);
    process.exitCode = 1;
});
