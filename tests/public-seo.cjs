'use strict';
const assert = require('node:assert/strict');
const express = require('express');
const path = require('node:path');
const { createPublicSeo, text, safeHtml, ORIGIN } = require('../lib/public-seo');
const root = path.resolve(__dirname, '..');
const norm = { codigo: 'codigo-civil', slug: 'codigo-civil', nombre: 'Código Civil', estado: 'publicado', introduccion: 'Texto público de la legislación civil peruana.' };
const base = { codigo: norm.codigo, estado: 'publicado', actualizado_en: '2026-09-28T12:00:00Z', contenido_lne: {}, estructura: {} };
const articles = Array.from({ length: 1003 }, (_, i) => ({ ...base, id: i + 1, orden: i + 1, numero_articulo: String(i + 1), titulo: `Regla ${i + 1}`, contenido: `<p>Texto jurídico publicado y suficiente del artículo ${i + 1}. La ley se deroga sólo por otra ley.</p>` }));
articles.push({ ...base, id: 2000, orden: 2000, numero_articulo: '1#2', titulo: 'Duplicado', contenido: articles[0].contenido });
articles.push({ ...base, id: 2001, orden: 2001, numero_articulo: '1.2', titulo: 'Apartado', contenido: '<p>Contenido público diferente del apartado con número decimal y signos.</p>' });
articles.push({ ...base, id: 2002, orden: 2002, numero_articulo: 'privado', estado: 'borrador', contenido: 'BORRADOR_SECRETO_NO_PUBLICAR' });
articles.push({ ...base, id: 2003, orden: 2003, numero_articulo: 'vacio', contenido: '<p></p>' });
articles.push({ ...base, id: 2004, orden: 2004, numero_articulo: 'xss', titulo: '</title><script>alert(1)</script>', contenido: '<script>SECRET_SCRIPT</script><p onclick="alert(1)">Contenido jurídico suficientemente extenso y público &amp; seguro.</p><a href="javascript:alert(1)">enlace</a>' });
const summaries = [{ id: '11111111-1111-4111-8111-111111111111', course_id: 'contratos', title: 'Resumen publicado', template_name: 'Cartilla pública', published_at: '2026-09-28T12:00:00Z', preview_html: '<html><head><style>.secret{display:none}</style><script>PRIVATE_JS</script></head><body><p>Este es el texto del resumen publicado que ya es público para todos los visitantes.</p></body></html>' }];
let fail = false;
const calls = [];
function unquote(value) { return value?.replace(/^eq\./, '').replace(/^"|"$/g, '').replace(/\\"/g, '"'); }
async function fakeFetch(url, options) {
    const request = new URL(url); calls.push(request.pathname + request.search);
    assert.equal(options.headers.apikey, 'public-test-key');
    assert.equal(options.headers.Authorization, 'Bearer public-test-key');
    assert(!options.method || options.method === 'GET', 'Read model must never write');
    if (fail) return { ok: false, status: 500 };
    const table = request.pathname.split('/').pop(), query = request.searchParams;
    let data = table === 'normas_legales' ? [norm, { ...norm, codigo: 'draft', slug: 'norma-privada', estado: 'borrador' }] : table === 'articulos_legales' ? articles : summaries;
    for (const name of ['codigo', 'numero_articulo', 'estado', 'id', 'course_id']) if (query.has(name)) data = data.filter(row => String(row[name]) === unquote(query.get(name)));
    const offset = Number(query.get('offset') || 0), limit = Number(query.get('limit') || 1000);
    return { ok: true, status: 200, headers: { get: name => name === 'content-range' && options.headers.Prefer ? `${offset}-${Math.min(offset + limit, data.length) - 1}/${data.length}` : null }, json: async () => structuredClone(data.slice(offset, offset + limit)) };
}
const app = express();
const seo = createPublicSeo({ root, getConfig: () => ({ url: 'https://public.example', key: 'public-test-key' }), fetchImpl: fakeFetch, cacheMs: 60000 });
app.get('/googlea91f2d4ac41a836d.html', (_req, res) => res.sendFile(path.join(root, 'googlea91f2d4ac41a836d.html')));
// Public SPA API fixtures; production uses the unchanged routes in server.js.
app.get('/api/public/legislation', (_req, res) => res.json({ normas: [{ codigo: norm.codigo, slug: norm.slug, nombre: norm.nombre, total_articulos: articles.filter(a => a.estado === 'publicado').length }] }));
app.get('/api/public/legislation/:slug/articles', (_req, res) => res.json({ norma: norm, articulos: articles.filter(a => a.estado === 'publicado') }));
app.get('/api/formation/summaries', (_req, res) => res.json({ topics: [] }));
app.use(seo.router); app.use(express.static(root)); app.use((_req, res) => res.status(404).send('Not found'));
const server = app.listen(0, '127.0.0.1', async () => {
    let browser;
    const baseUrl = `http://127.0.0.1:${server.address().port}`;
    const request = async url => { const response = await fetch(baseUrl + url, { redirect: 'manual' }); return { status: response.status, headers: response.headers, body: await response.text() }; };
    try {
        assert.equal(text('<p>Uno &amp; dos &oacute;</p><p>Tres</p><script>hidden</script>'), 'Uno & dos ó Tres');
        assert(!safeHtml('<svg onload="x()"></svg><script>x()</script><a href="javascript:x()">x</a>').includes('javascript:'));
        const home = await request('/'); assert.equal(home.status, 200); assert(home.body.includes('<h1>Bienvenido a La Norma Express</h1>')); assert(home.body.includes('href="/legislacion/codigo-civil"'));
        const site = await request('/sitemap.xml'); assert.equal(site.status, 200); assert(site.headers.get('content-type').includes('xml'));
        assert(site.body.includes(`${ORIGIN}/legislacion/codigo-civil/articulo/1003`));
        assert(!site.body.includes('/articulo/1%232')); assert(!site.body.includes('/articulo/vacio')); assert(!site.body.includes('/articulo/privado')); assert(!site.body.includes('norma-privada')); assert(!site.body.includes('/admin'));
        assert(site.body.includes('/formacion/contratos/tema/1')); assert(site.body.includes('/formacion/contratos/resumen/11111111-1111-4111-8111-111111111111'));
        assert(!site.body.includes('/formacion/introduccion-al-derecho')); assert(!site.body.includes('changefreq')); assert(!site.body.includes('priority'));
        assert(calls.some(url => url.includes('offset=1000')), 'Articles beyond the first 1000 must be included');
        const overview = await request('/legislacion/codigo-civil'); assert.equal(overview.status, 200); assert(overview.body.includes('La ley se deroga')); assert(overview.body.includes('/articulo/1003')); assert(!overview.body.includes('BORRADOR_SECRETO'));
        const article = await request('/legislacion/codigo-civil/articulo/1'); assert.equal(article.status, 200); assert(article.body.includes('data-lne-document="true"')); assert(article.body.includes('La ley se deroga')); assert(article.body.includes(`rel="canonical" href="${ORIGIN}/legislacion/codigo-civil/articulo/1"`)); assert(article.body.includes('"@type":"Legislation"'));
        const payload = JSON.parse(article.body.match(/id="lne-seo-data" type="application\/json">([\s\S]*?)<\/script>/)[1]); assert.equal(payload.index, true);
        const attack = await request('/legislacion/codigo-civil/articulo/xss'); assert.equal(attack.status, 200); assert(!attack.body.includes('SECRET_SCRIPT')); assert(!attack.body.includes('onclick=')); assert(!attack.body.includes('javascript:'));
        assert.equal((await request('/legislacion/codigo-civil/articulo/1.2')).status, 200);
        assert.equal((await request('/legislacion/codigo-civil/articulo/privado')).status, 404);
        assert.equal((await request('/legislacion/codigo-civil/articulo/vacio')).status, 404);
        const duplicate = await request('/legislacion/codigo-civil/articulo/1%232'); assert.equal(duplicate.status, 301); assert.equal(duplicate.headers.get('location'), '/legislacion/codigo-civil/articulo/1');
        const oldArticle = await request('/legislacion/codigo-civil?art=1'); assert.equal(oldArticle.status, 301); assert.equal(oldArticle.headers.get('location'), '/legislacion/codigo-civil/articulo/1');
        assert.equal((await request('/legislacion/codigo-civil/')).status, 301);
        const course = await request('/formacion/contratos'); assert.equal(course.status, 200); assert(course.body.includes('Teoría General del Contrato')); assert(course.body.includes('"@type":"Course"'));
        const lesson = await request('/formacion/contratos/tema/1'); assert.equal(lesson.status, 200); assert(lesson.body.includes('El contrato es un acuerdo de voluntades')); assert(lesson.body.includes('data-lne-document="true"'));
        const summary = await request('/formacion/contratos/resumen/11111111-1111-4111-8111-111111111111'); assert.equal(summary.status, 200); assert(summary.body.includes('Este es el texto del resumen')); assert(!summary.body.includes('PRIVATE_JS')); assert(!summary.body.includes('.secret'));
        const preparing = await request('/formacion/introduccion-al-derecho'); assert.equal(preparing.status, 200); assert(preparing.headers.get('x-robots-tag').includes('noindex'));
        for (const url of ['/no-existe', '/no-existe.html', '/legislacion/no-existe', '/legislacion/norma-privada', '/formacion/no-existe', '/sitemaps/99.xml']) assert.equal((await request(url)).status, 404, url);
        assert((await request('/pages/codigo.html')).headers.get('x-robots-tag').includes('noindex'));
        const robots = await request('/robots.txt'); assert(robots.body.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)); assert(robots.body.includes('Allow: /api/public/')); assert(robots.body.includes('Allow: /api/formation/summaries'));
        const google = await request('/googlea91f2d4ac41a836d.html'); assert.equal(google.status, 200); assert.equal(google.body, 'google-site-verification: googlea91f2d4ac41a836d.html');
        // Revocation must affect page bodies immediately, even with warm sitemap cache.
        articles[0].estado = 'borrador';
        assert.equal((await request('/legislacion/codigo-civil/articulo/1')).status, 404);
        assert(!(await request('/legislacion/codigo-civil')).body.includes('Regla 1</a>'));
        articles[0].estado = 'publicado';
        summaries.length = 0; assert.equal((await request('/formacion/contratos/resumen/11111111-1111-4111-8111-111111111111')).status, 404);
        norm.estado = 'borrador'; assert.equal((await request('/legislacion/codigo-civil')).status, 404); norm.estado = 'publicado';
        fail = true; assert.equal((await request('/legislacion/codigo-civil/articulo/1')).status, 503);
        const outage = createPublicSeo({ root, getConfig: () => ({ url: 'https://public.example', key: 'public-test-key' }), fetchImpl: fakeFetch });
        await assert.rejects(outage.sitemapEntries()); fail = false;
        if (process.env.LNE_SEO_BROWSER === '1') {
            const { chromium } = require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
            browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
            const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' });
            const errors = []; page.on('pageerror', e => errors.push(e.message));
            await page.goto(baseUrl + '/legislacion/codigo-civil/articulo/1');
            await page.waitForFunction(() => window.LNERouter);
            assert(await page.locator('#app-content').innerText().then(t => t.includes('La ley se deroga')));
            await page.evaluate(() => LNERouter.navigate('/formacion/contratos'));
            await page.waitForFunction(() => document.querySelector('#formacion-course-title')?.textContent === 'Contratos');
            await page.waitForFunction(() => document.title.includes('Contratos') && document.querySelector('link[rel="canonical"]')?.href.endsWith('/formacion/contratos'));
            await page.waitForSelector('.formacion-topic-card'); await page.locator('.formacion-topic-card').first().click();
            await page.waitForSelector('#formacion-topic-modal.active'); assert((await page.locator('#formacion-topic-modal-body').innerText()).includes('El contrato es un acuerdo'));
            await page.locator('#formacion-topic-modal-close').click();
            await page.evaluate(() => LNERouter.navigate('/legislacion/codigo-civil'));
            await page.waitForSelector('[data-seo-article]'); assert((await page.locator('[data-seo-article]').first().getAttribute('href')).includes('/articulo/'));
            await page.locator('[data-seo-article]').first().click(); await page.waitForURL('**/articulo/1');
            await page.waitForFunction(() => window.LNERouter); await page.reload(); assert((await page.locator('h1').innerText()).includes('Artículo 1'));
            assert.deepEqual(errors, []);
            console.log('PASS browser: SPA metadata, native article navigation, course modal, reload, no JS errors');
        }
        console.log('PASS SEO HTTP/content/security: pagination >1000, real HTML, metadata, schema, canonical/legacy redirects, duplicates, 404, noindex, drafts, revocation, sanitization, 503 and Google verification');
    } catch (error) { console.error(error); process.exitCode = 1; }
    finally { await browser?.close(); server.close(); }
});
