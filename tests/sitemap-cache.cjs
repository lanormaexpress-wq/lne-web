'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const express = require('express');
const http = require('node:http');
const { gunzipSync } = require('node:zlib');
const { createSitemapCache, prepareSnapshot } = require('../lib/sitemap-cache');
const logger = { info() {}, warn() {} };
const manifest = entries => ({ version: 1, generatedAt: new Date().toISOString(), entries });
const entries = [{ url: '/' }, { url: '/legislacion/codigo-civil/articulo/1%232', modified: '2026-01-01T00:00:00.000Z' }, { url: '/formacion/contratos/tema/a&b' }];
(async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'lne-sitemap-test-'));
    const seedFile = path.join(directory, 'seed.json'), cacheFile = path.join(directory, 'cache.json');
    await fs.writeFile(seedFile, JSON.stringify(manifest(entries)));
    let count = 0, release, mode = 'blocked';
    const generate = async () => { count++; if (mode === 'blocked') return new Promise(resolve => { release = resolve; }); if (mode === 'fail') throw new Error('Provider unavailable'); return entries.slice(0, 1); };
    const cache = createSitemapCache({ root: directory, seedFile, cacheFile, autoStart: false, generate, logger });
    const app = express(); app.get(['/sitemap.xml', '/sitemap-:revision-:part.xml'], cache.serve);
    const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    try {
        const raw = headers => new Promise((resolve, reject) => {
            http.get(base + '/sitemap.xml', { headers }, res => { const chunks = []; res.on('data', chunk => chunks.push(chunk)); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) })); }).on('error', reject);
        });
        const first = await raw({}); assert.equal(first.status, 200); assert.match(first.headers['content-type'], /^application\/xml/);
        assert(first.body.includes('&amp;')); assert.equal(count, 0, 'Cold GET must not query the provider');
        const refresh = cache.refresh(); assert.equal(refresh, cache.refresh(), 'Coalesce refreshes');
        const start = performance.now();
        const responses = await Promise.all(Array.from({ length: 20 }, () => raw({ 'User-Agent': 'Googlebot', 'Accept-Encoding': 'gzip' })));
        const ms = performance.now() - start;
        responses.forEach(response => { assert.equal(response.status, 200); assert.equal(response.headers['content-encoding'], 'gzip'); assert.deepEqual(gunzipSync(response.body), first.body); });
        assert.equal(count, 1); assert(ms < 3000, `Requests waited for blocked provider: ${ms}ms`);
        release(entries.slice(0, 2)); await refresh;
        mode = 'fail'; await assert.rejects(cache.refresh()); assert.equal((await raw({})).status, 200);
        const cached = await raw({});
        assert.equal((await raw({ 'If-None-Match': cached.headers.etag })).status, 304);
        const head = await fetch(base + '/sitemap.xml', { method: 'HEAD' }); assert.equal(head.status, 200); assert.equal(await head.text(), '');
        const restart = createSitemapCache({ root: directory, seedFile, cacheFile, autoStart: false, generate, logger });
        assert.equal(restart.status().urls, 2, 'Persist successful refresh across restarts'); restart.close();
        await fs.writeFile(cacheFile, '{corrupted');
        const fallback = createSitemapCache({ root: directory, seedFile, cacheFile, autoStart: false, generate, logger });
        assert.equal(fallback.status().urls, 3); fallback.close();
        const empty = createSitemapCache({ root: directory, seedFile: false, cacheFile: false, autoStart: false, generate, logger });
        const unavailable = express(); unavailable.get('/sitemap.xml', empty.serve);
        const s = unavailable.listen(0, '127.0.0.1'); await new Promise(resolve => s.once('listening', resolve));
        try { const r = await fetch(`http://127.0.0.1:${s.address().port}/sitemap.xml`); assert.equal(r.status, 503); assert.equal(r.headers.get('retry-after'), '60'); } finally { s.close(); empty.close(); }
        for (const url of ['/admin', '/api/private', '//other.test/', '/formacion/../admin', '/formacion/a?private=1', '/formacion/a#x', '/formacion/%00', '/formacion/%ZZ']) assert.throws(() => prepareSnapshot(manifest([{ url }])));
        assert.throws(() => prepareSnapshot(manifest([entries[0], entries[0]])));
        assert.throws(() => prepareSnapshot(manifest([{ url: '/', modified: 'not-a-date' }])));
        const large = prepareSnapshot(manifest(Array.from({ length: 10001 }, (_, i) => ({ url: `/legislacion/norma/articulo/${i}` }))));
        assert.equal(large.files.size, 3); assert(large.files.get('/sitemap.xml').plain.includes('<sitemapindex'));
        assert([...large.files.values()].every(f => f.plain.length < 50 * 1024 * 1024));
        console.log(`PASS sitemap: 20 concurrent Googlebot downloads in ${ms.toFixed(1)}ms during blocked refresh; offline cold start, persistence, failed refresh, corruption fallback, XML escaping, gzip, HEAD, 304, URL validation and splitting`);
    } finally { cache.close(); server.close(); /* Keep the isolated temp fixture; never remove user paths. */ }
})().catch(error => { console.error(error); process.exitCode = 1; });
