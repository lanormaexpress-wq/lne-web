(function () {
    'use strict';
    let queue = Promise.resolve();
    let currentToken = null;
    let syncedAt = 0;
    window.LNEAdminSession = {
        client: null,
        sync(session) {
            const token = session?.access_token || null;
            const operation = queue.catch(() => {}).then(async () => {
                if (token && token === currentToken && Date.now() - syncedAt < 240000) return;
                if (!token) {
                    window.LNESummaryStorage.end();
                    document.dispatchEvent(new CustomEvent('lne-admin-session-ready', { detail: { authenticated: false } }));
                }
                const response = await fetch('/admin/resumenes/session', {
                    method: token ? 'POST' : 'DELETE', credentials: 'same-origin', cache: 'no-store',
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                if (!response.ok) throw new Error('No se pudo sincronizar la sesión administrativa.');
                if (token) {
                    const data = await response.json();
                    const transition = window.LNESummaryStorage.prepare(data.documentSession);
                    if (transition.changed) document.dispatchEvent(new CustomEvent('lne-admin-session-ready', { detail: { authenticated: false } }));
                    window.LNEAdminAccess = data.access || { owner: false, permissions: {} };
                }
                else window.LNEAdminAccess = { owner: false, permissions: {} };
                currentToken = token; syncedAt = Date.now();
                document.dispatchEvent(new CustomEvent('lne-admin-session-ready', { detail: { authenticated: Boolean(token) } }));
            });
            queue = operation;
            return operation;
        }
    };
    document.getElementById('logout-button').addEventListener('click', async event => {
        event.preventDefault(); event.stopImmediatePropagation();
        const button = event.currentTarget;
        button.disabled = true;
        try {
            await window.LNEAdminSession.sync(null);
            await button.onclick?.call(button, event);
            history.replaceState(null, '', '/admin');
        } catch (_) {
            document.getElementById('login-error').textContent = 'No se pudo completar el cierre de sesión. Inténtalo nuevamente.';
        } finally { button.disabled = false; }
    }, true);
})();
