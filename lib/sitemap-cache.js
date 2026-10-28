'use strict';
// Only URL metadata is persisted. Page content, credentials and publication state
// remain in the existing public read model; serving XML never queries Supabase.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { gzipSync } = require('node:zlib');
const ORIGIN = 'https://lanormaexpress.dpdns.org';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
const prefix = '<?xml version="1.0" encoding="UTF-8"?>\n';
const namespace = 'http://www.sitemaps.org/schemas/sitemap/0.9';

function prepareSnapshot(input) {
    if (input?.version !== 1 || !Array.isArray(input.entries) || !input.entries.length || input.entries.length > 100000 ||
        !Number.isFinite(Date.parse(input.generatedAt)) || Date.parse(input.generatedAt) > Date.now() + 60000) throw new Error('Invalid sitemap snapshot');
    const seen = new Set();
    const entries = input.entries.map(entry => {
        const url = new URL(entry.url, ORIGIN);
        // Match only routes produced by the public catalog. Reject private paths,
        // queries, fragments, noncanonical encoding and XML control characters.
        if (typeof entry.url !== 'string' || url.origin !== ORIGIN || url.pathname !== entry.url || url.search || url.hash ||
            !/^(?:\/$|\/legislacion(?:\/|$)|\/formacion(?:\/|$))/.test(entry.url) ||
            /[\u0000-\u0020\u007f]/.test(entry.url) || Buffer.byteLength(url.href) > 2048 || seen.has(url.href)) throw new Error('Invalid or duplicate sitemap URL');
        if (/[\u0000-\u001f\u007f]/.test(decodeURIComponent(entry.url))) throw new Error('Invalid sitemap URL characters');
        seen.add(url.href);
        const modified = entry.modified || undefined;
        if (modified && (!Number.isFinite(Date.parse(modified)) || new Date(modified).toISOString() !== modified || Date.parse(modified) > Date.now())) throw new Error('Invalid sitemap lastmod');
        return { url: entry.url, ...(modified ? { modified } : {}) };
    });
    const files = new Map();
    function add(name, body) {
        const plain = Buffer.from(prefix + body, 'utf8');
        if (plain.length > 50 * 1024 * 1024) throw new Error('Sitemap size limit exceeded');
        const compressed = gzipSync(plain);
        const tag = buffer => '"' + crypto.createHash('sha256').update(buffer).digest('hex') + '"';
        files.set(name, { plain, compressed, etag: tag(plain), gzipEtag: tag(compressed) });
    }
    const size = 10000;
    const urlset = rows => `<urlset xmlns="${namespace}">${rows.map(e => `<url><loc>${escape(ORIGIN + e.url)}</loc>${e.modified ? `<lastmod>${escape(e.modified)}</lastmod>` : ''}</url>`).join('')}</urlset>`;
    if (entries.length <= size) add('/sitemap.xml', urlset(entries));
    else {
        // Root-level children have scope over every public route on the site.
        const revision = crypto.createHash('sha256').update(JSON.stringify(entries)).digest('hex').slice(0, 16);
        const children = [];
        for (let i = 0; i < entries.length; i += size) {
            const name = `/sitemap-${revision}-${i / size + 1}.xml`;
            add(name, urlset(entries.slice(i, i + size))); children.push(name);
        }
        add('/sitemap.xml', `<sitemapindex xmlns="${namespace}">${children.map(name => `<sitemap><loc>${ORIGIN}${name}</loc></sitemap>`).join('')}</sitemapindex>`);
    }
    return { manifest: { version: 1, generatedAt: input.generatedAt, entries }, files };
}

function createSitemapCache({ root, generate, seedFile = path.join(root, 'lib/sitemap-seed.json'),
    cacheFile = path.join(os.tmpdir(), `lne-sitemap-${crypto.createHash('sha256').update(root).digest('hex').slice(0, 16)}.json`),
    autoStart = true, intervalMs = 300000, startupMs = 10000, logger = console }) {
    let current, previous, pending, timer, stopped = false;
    for (const file of [seedFile, cacheFile]) {
        if (!file) continue;
        try {
            const candidate = prepareSnapshot(JSON.parse(fs.readFileSync(file, 'utf8')));
            if (!current || Date.parse(candidate.manifest.generatedAt) > Date.parse(current.manifest.generatedAt)) current = candidate;
        } catch (error) { if (error.code !== 'ENOENT') logger.warn('[sitemap] Ignoring invalid saved snapshot'); }
    }
    function schedule(delay) {
        if (!autoStart || stopped) return;
        clearTimeout(timer);
        timer = setTimeout(() => { refresh().catch(() => {}); }, delay);
        timer.unref();
    }
    function refresh() {
        if (pending) return pending;
        const started = Date.now();
        pending = (async () => {
            const candidate = prepareSnapshot({ version: 1, generatedAt: new Date().toISOString(), entries: await generate() });
            if (cacheFile) {
                const temporary = `${cacheFile}.${process.pid}.tmp`;
                try {
                    await fs.promises.writeFile(temporary, JSON.stringify(candidate.manifest), 'utf8');
                    await fs.promises.rename(temporary, cacheFile);
                } catch (_) {
                    logger.warn('[sitemap] Disk persistence unavailable; serving validated memory snapshot');
                    await fs.promises.unlink(temporary).catch(() => {});
                }
            }
            previous = current; current = candidate;
            logger.info(`[sitemap] Refreshed ${candidate.manifest.entries.length} URLs in ${Date.now() - started}ms`);
            return candidate.manifest;
        })().catch(error => {
            logger.warn(`[sitemap] Refresh failed after ${Date.now() - started}ms; retaining last valid snapshot`);
            throw error;
        }).finally(() => { pending = undefined; schedule(current ? intervalMs : 60000); });
        return pending;
    }
    function serve(req, res) {
        if (req.path.startsWith('/sitemaps/')) {
            const match = /^\/sitemaps\/([1-9]\d*)\.xml$/.exec(req.path);
            const part = match ? Number(match[1]) : 0;
            const children = current ? [...current.files.keys()].filter(name => name !== '/sitemap.xml') : [];
            const target = children.length ? children[part - 1] : part === 1 && current ? '/sitemap.xml' : null;
            return target ? res.redirect(301, target) : res.status(404).set('X-Robots-Tag', 'noindex').end();
        }
        const file = current?.files.get(req.path) || previous?.files.get(req.path);
        if (!file) {
            if (req.path !== '/sitemap.xml') return res.status(404).set('X-Robots-Tag', 'noindex').end();
            refresh().catch(() => {});
            return res.status(503).set({ 'Retry-After': '60', 'Cache-Control': 'no-store' }).type('text/plain').send('Sitemap temporalmente no disponible.');
        }
        res.vary('Accept-Encoding');
        const gzip = req.acceptsEncodings('gzip', 'identity') === 'gzip';
        res.set({ 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300',
            'ETag': gzip ? file.gzipEtag : file.etag });
        if (gzip) res.set('Content-Encoding', 'gzip');
        return res.send(gzip ? file.compressed : file.plain);
    }
    schedule(startupMs);
    return { serve, refresh, close: () => { stopped = true; clearTimeout(timer); },
        status: () => ({ generatedAt: current?.manifest.generatedAt, urls: current?.manifest.entries.length || 0, refreshing: !!pending }) };
}
module.exports = { createSitemapCache, prepareSnapshot };
