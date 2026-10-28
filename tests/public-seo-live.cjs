'use strict';
// Explicit opt-in, GET-only validation against the already public dataset.
// Does not authenticate users, invoke private RPCs or write provider data.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
if (process.env.LNE_SEO_LIVE !== '1') { console.log('Set LNE_SEO_LIVE=1 to run public read-only integration checks.'); process.exit(0); }
const port = 31883;
const child = process.env.LNE_SEO_BASE_URL ? null : spawn(process.execPath, ['server.js'], { cwd: root, env: { ...process.env, PORT: String(port) }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
let startup = '';
child?.stdout.on('data', data => startup += data);
child?.stderr.on('data', data => startup += data);
(async () => {
    try {
        if (child) await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => { clearInterval(poll); reject(new Error('Server startup timeout')); }, 60000);
            const poll = setInterval(() => { if (startup.includes('corriendo')) { clearInterval(poll); clearTimeout(timeout); resolve(); } else if (child.exitCode !== null) { clearInterval(poll); clearTimeout(timeout); reject(new Error('Server exited during startup')); } }, 100);
        });
        const base = process.env.LNE_SEO_BASE_URL || `http://127.0.0.1:${port}`;
        const get = async url => { const start = Date.now(); const r = await fetch(base + url, { redirect: 'manual', signal: AbortSignal.timeout(60000) }); const body = await r.text(); return { status: r.status, headers: r.headers, body, ms: Date.now() - start }; };
        const coldHome = await get('/'); assert.equal(coldHome.status, 200);
        const sitemap = await get('/sitemap.xml'); assert.equal(sitemap.status, 200);
        const locations = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
        assert(locations.length > 1000); assert.equal(locations.length, new Set(locations).size);
        const articleUrls = locations.filter(u => u.includes('/articulo/'));
        const normUrls = locations.filter(u => /\/legislacion\/[^/]+$/.test(u));
        const checks = [];
        for (const url of ['/', '/robots.txt', '/legislacion', '/formacion', '/formacion/contratos', '/formacion/contratos/tema/1', ...normUrls.map(u => new URL(u).pathname), ...[articleUrls[0], articleUrls[Math.floor(articleUrls.length / 2)], articleUrls.at(-1)].map(u => new URL(u).pathname)]) {
            const result = await get(url); assert.equal(result.status, 200, url);
            if (url !== '/robots.txt') {
                assert(result.body.includes('rel="canonical"'), url); assert(result.body.includes('name="description"'), url); assert(result.body.includes('application/ld+json'), url); assert(result.body.includes('<h1'), url);
                assert(!result.body.includes('noindex,follow'), url);
            }
            checks.push({ url, status: result.status, bytes: Buffer.byteLength(result.body), ms: result.ms });
        }
        for (const url of ['/seo-no-existe-2026', '/seo-no-existe-2026.html', '/legislacion/norma-no-existe', '/legislacion/codigo-de-ninos-y-adolescentes', '/legislacion/codigo-civil/articulo/seo-no-existe']) assert.equal((await get(url)).status, 404, url);
        assert.equal((await get('/index.html')).status, 301);
        const google = await get('/googlea91f2d4ac41a836d.html'); assert.equal(google.status, 200); assert.equal(google.body, 'google-site-verification: googlea91f2d4ac41a836d.html');
        const admin = await get('/admin'); assert.equal(admin.status, 200); assert(admin.headers.get('x-robots-tag').includes('noindex'));
        assert.equal((await get('/api/admin/users')).status, 401); assert.equal((await get('/.env')).status, 403); assert.equal((await get('/lib/public-seo.js')).status, 403);
        const fragment = await get('/pages/codigo.html'); assert.equal(fragment.status, 200); assert(fragment.headers.get('x-robots-tag').includes('noindex'));
        console.log(JSON.stringify({ result: 'PASS', coldHomeMs: coldHome.ms, sitemapMs: sitemap.ms, sitemapUrls: locations.length, articleUrls: articleUrls.length, normUrls: normUrls.length, checked: checks, safety: 'Public GET-only reads; no provider writes. 404/private/auth/Google verification checked.' }, null, 2));
    } catch (error) { console.error(error); process.exitCode = 1; }
    finally { child?.kill(); }
})();
