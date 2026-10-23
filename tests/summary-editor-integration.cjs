const assert = require('node:assert/strict');
const express = require('express');
const createRouter = require('../lib/summary-editor');
const app = express();
// Autenticación simulada exclusivamente en esta prueba; no toca Supabase.
app.use('/admin/resumenes', createRouter((req, res, next) => {
    if (req.get('authorization') !== 'Bearer test-owner') return res.status(401).json({ error: 'Sesión requerida.' });
    req.adminUser = { id: 'test-owner', app_metadata: { role: 'owner' } };
    next();
}));
const server = app.listen(0, '127.0.0.1', async () => {
    const base = `http://127.0.0.1:${server.address().port}/admin/resumenes`;
    try {
        const anonymous = await fetch(base + '/editor', { redirect: 'manual' });
        assert.equal(anonymous.status, 302);
        assert.equal(anonymous.headers.get('location'), '/admin?next=summary');
        assert.equal((await fetch(base + '/assets/js/state.js')).status, 200);
        assert.equal((await fetch(base + '/assets/index.html')).status, 401);
        const session = await fetch(base + '/session', { method: 'POST', headers: { Authorization: 'Bearer test-owner' } });
        assert.equal(session.status, 200);
        const cookie = session.headers.get('set-cookie').split(';')[0];
        assert.match(session.headers.get('set-cookie'), /HttpOnly/);
        const headers = { Cookie: cookie };
        const page = await fetch(base + '/editor', { headers });
        assert.equal(page.headers.get('cache-control'), 'no-store');
        const adminHtml = await page.text();
        assert.match(adminHtml, /href="\/admin\/resumenes\/editor"[^>]*>Editor de resúmenes/);
        assert.doesNotMatch(adminHtml, /ABRIR EDITOR|Volver al administrador/);
        assert.equal((await fetch(base + '/', { headers, redirect: 'manual' })).headers.get('location'), '/admin/resumenes/editor');
        const editor = await fetch(base + '/assets/index.html', { headers });
        assert.equal(editor.status, 200);
        const html = await editor.text();
        for (const match of html.matchAll(/(?:src|href)="((?:js|css|vendor)\/[^"?#]+)"/g)) {
            assert.equal((await fetch(base + '/assets/' + match[1], { headers })).status, 200, match[1]);
        }
        assert.equal((await fetch(base + '/session', { method: 'DELETE', headers })).status, 204);
        assert.equal((await fetch(base + '/editor', { headers, redirect: 'manual' })).status, 302);
        console.log('Integración: acceso privado, dependencias, retorno, no-cache y cierre de sesión correctos.');
    } catch (error) { console.error(error); process.exitCode = 1; }
    finally { server.close(); server.closeAllConnections(); }
});
