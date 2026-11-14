'use strict';

const express = require('express');
const { createDublyobaseAuth } = require('./dublyobase-auth');

module.exports = function accountRecovery({ enabled, privateActivation, admin, verifiedRecoveryEmail, auth = createDublyobaseAuth() }) {
    const router = express.Router();
    router.use((_req, res, next) => {
        res.set('Cache-Control', 'no-store');
        next();
    });
    const allowedEmail = typeof verifiedRecoveryEmail === 'string' ? verifiedRecoveryEmail.trim().toLowerCase() : '';
    const recoveryEnabled = Boolean(enabled && allowedEmail && !allowedEmail.endsWith('@lne.com'));
    const activationEnabled = Boolean(privateActivation && admin && allowedEmail && !allowedEmail.endsWith('@lne.com'));
    router.get('/status', (_req, res) => res.json({
        enabled: recoveryEnabled || activationEnabled, emailDelivery: recoveryEnabled, nativeLogin: Boolean(admin)
    }));

    async function editorSession(result) {
        const user = await admin.admin(result.token);
        const expiry = Math.floor(Date.parse(result.expiresAt) / 1000);
        if (!Number.isFinite(expiry) || expiry <= Date.now() / 1000) {
            throw new Error('El proveedor devolvió una sesión vencida.');
        }
        return { access_token: result.token, refresh_token: result.refreshToken,
            expires_at: expiry,
            user };
    }

    for (const operation of ['login', 'refresh', 'logout']) {
        router.post('/' + operation, async (req, res) => {
            if (!admin) return res.status(503).json({ error: 'El inicio de sesión en Dublyobase está desactivado.' });
            if (!req.is('application/json')) return res.status(415).json({ error: 'Solicitud inválida.' });
            const { email, password, refresh_token: refreshToken } = req.body || {};
            const valid = operation === 'login'
                ? typeof email === 'string' && email.length <= 254 && typeof password === 'string' && Buffer.byteLength(password) <= 72
                : typeof refreshToken === 'string' && refreshToken.length <= 256 && refreshToken.length > 0;
            if (!valid) return res.status(400).json({ error: 'Solicitud inválida.' });
            try {
                if (operation === 'logout') {
                    await admin.logout(refreshToken);
                    return res.sendStatus(204);
                }
                const result = operation === 'login' ? await admin.login(email.trim(), password) : await admin.refresh(refreshToken);
                try { return res.json({ session: await editorSession(result) }); }
                catch (error) {
                    await admin.logout(result.refreshToken).catch(() => {});
                    throw error;
                }
            } catch (error) {
                const status = [401, 403, 429].includes(error.status) ? error.status : 503;
                const message = status === 403 ? 'La cuenta no tiene acceso editorial.' :
                    status === 401 ? 'Credenciales o sesión no válidas.' :
                    status === 429 ? 'Demasiados intentos. Intenta más tarde.' : 'El acceso no está disponible.';
                return res.status(status).json({ error: message });
            }
        });
    }

    function recovery(confirm) {
        return async (req, res) => {
            if (!recoveryEnabled && !(confirm && activationEnabled)) {
                return res.status(503).json({ error: 'La recuperación de contraseña aún no está disponible.' });
            }
            if (!req.is('application/json')) return res.status(415).json({ error: 'Solicitud inválida.' });
            const { email, token, password } = req.body || {};
            if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
                (confirm && (typeof token !== 'string' || token.length < 16 || token.length > 256 ||
                    typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password) > 72))) {
                return res.status(400).json({ error: 'Revisa el correo, el código y la contraseña.' });
            }
            const address = email.toLowerCase();
            if (address !== allowedEmail) {
                return confirm
                    ? res.status(400).json({ error: 'El código no es válido o venció. Revisa los datos o solicita otro.' })
                    : res.sendStatus(202);
            }
            try {
                if (confirm) await auth.confirmReset(address, token, password);
                else await auth.requestReset(address);
                return res.sendStatus(confirm ? 204 : 202);
            } catch (error) {
                if (!confirm && error.status === 401) return res.sendStatus(202);
                if (error.status === 429) return res.status(429).json({ error: 'Demasiados intentos. Intenta más tarde.' });
                if (confirm && error.status === 401) return res.status(400).json({ error: 'El código no es válido o venció. Revisa los datos o solicita otro.' });
                return res.status(503).json({ error: 'No se pudo completar la recuperación. Intenta más tarde.' });
            }
        };
    }

    router.post('/request', recovery(false));
    router.post('/confirm', recovery(true));
    return router;
};
