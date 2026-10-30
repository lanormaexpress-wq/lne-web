'use strict';

// Public read model only: uses the publishable key and the existing RLS policies.
// No service credential, writes, draft documents or administration dependencies.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
// Audited upstream sanitizer bundled as CJS for the existing Node 22.11 runtime.
const sanitize = require('./seo-sanitizer.cjs');
const express = require('express');
const ORIGIN = 'https://lanormaexpress.dpdns.org';
const BRAND = 'La Norma Express';
const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const safeHtml = value => sanitize(String(value || ''), {
    allowedTags: ['p', 'div', 'span', 'br', 'hr', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 'sup', 'sub', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a'],
    allowedAttributes: { a: ['href', 'title'], td: ['colspan', 'rowspan'], th: ['colspan', 'rowspan'] },
    allowedSchemes: ['https', 'http', 'mailto'], allowProtocolRelative: false,
    transformTags: { h1: 'h2' }
});
// Decode entities through the HTML parser, then escape at the output boundary.
function text(value) {
    let result = '';
    const input = String(value || '').replace(/<\/?(?:p|div|h[1-6]|li|tr|td|th|br)\b[^>]*>/gi, ' ');
    sanitize(input, { allowedTags: [], allowedAttributes: {}, textFilter: chunk => { result += chunk; return chunk; } });
    // textFilter receives escaped text. Decode its output before escaping at the
    // final HTML/JSON boundary; never insert this plain text as raw markup.
    const decoded = result.replace(/&#(x[0-9a-f]+|\d+);|&(amp|lt|gt|quot|apos|nbsp);/gi, (all, number, name) => {
        if (number) { const code = number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number); return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : ''; }
        return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' })[name.toLowerCase()];
    });
    return decoded.replace(/\s+/g, ' ').trim();
}
const excerpt = (value, length = 165) => { const clean = text(value); return clean.length > length ? `${clean.slice(0, length - 1).trimEnd()}…` : clean; };
const json = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
const iso = value => value && Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now() ? new Date(value).toISOString() : null;
const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
const articlePath = (norm, row) => `${norm.url}/articulo/${encodeURIComponent(row.numero_articulo)}`;
const ARTICLE_FIELDS = 'id,codigo,numero_articulo,titulo,contenido,tipo:contenido_lne->>tipo,declaracion:contenido_lne->esDeclaracion,estructura,orden,actualizado_en,estado';
// URL-encode the complete value; eq filters are parameterized by PostgREST.
// Wrapping an eq value in quotes would look for literal quotes in its text.
const qualified = value => encodeURIComponent(String(value));

function articleLabel(row) {
    const number = row.estructura?.numero_original || row.numero_articulo;
    const type = row.tipo ?? row.contenido_lne?.tipo ?? 'Artículo';
    if (row.declaracion || row.contenido_lne?.esDeclaracion || row.estructura?.numero_sintetico) return text(row.titulo || row.estructura?.seccion?.titulo || 'Disposición');
    const occurrence = row.estructura?.total_ocurrencias_numero > 1 ? ` (sección ${Number(row.estructura?.seccion_indice || 0) + 1})` : '';
    return `${type ? `${text(type)} ` : ''}${text(number)}${row.titulo ? ` — ${text(row.titulo)}` : ''}${occurrence}`;
}

function createPublicSeo({ root, getConfig, fetchImpl = global.fetch, cacheMs = 60000, sitemapOptions = {} }) {
    const router = express.Router();
    const staticNorms = require(path.join(root, 'normas'));
    const { courses, areas } = require(path.join(root, 'formacion'));
    const shell = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const home = fs.readFileSync(path.join(root, 'pages/home.html'), 'utf8');
    const localTopics = new Map(courses.map(course => [course.id, course.contentFile
        ? JSON.parse(fs.readFileSync(path.join(root, course.contentFile.replace(/^\//, '')), 'utf8')) : []]));
    let cache, expires = 0, pending, basicCache, basicExpires = 0, basicPending;
    const normCache = new Map();

    async function read(resource, count = false) {
        const { url, key } = getConfig();
        const response = await fetchImpl(`${url}/rest/v1/${resource}`, {
            headers: { apikey: key, Authorization: `Bearer ${key}`, ...(count ? { Prefer: 'count=exact' } : {}) }, signal: AbortSignal.timeout(12000)
        });
        if (!response.ok) throw new Error(`Public SEO data unavailable (${response.status})`);
        const rows = await response.json();
        if (!Array.isArray(rows)) throw new Error('Invalid public SEO data');
        const total = response.headers?.get('content-range')?.split('/')[1];
        if (total && /^\d+$/.test(total)) Object.defineProperty(rows, 'total', { value: Number(total) });
        return rows;
    }
    async function all(resource) {
        const rows = await read(`${resource}&limit=1000&offset=0`, true);
        if (Number.isSafeInteger(rows.total)) {
            if (rows.total > 100000) throw new Error('Public SEO pagination limit exceeded');
            if (rows.length < Math.min(1000, rows.total)) throw new Error('Unexpected public API page limit');
            // Bound concurrency; avoid serial network round trips for 5,000+ rows.
            const offsets = Array.from({ length: Math.max(0, Math.ceil(rows.total / 1000) - 1) }, (_, i) => (i + 1) * 1000);
            for (let i = 0; i < offsets.length; i += 4) {
                const pages = await Promise.all(offsets.slice(i, i + 4).map(offset => read(`${resource}&limit=1000&offset=${offset}`)));
                pages.forEach(page => rows.push(...page));
            }
            if (rows.length !== rows.total) throw new Error('Public catalog changed during pagination; retry');
            return rows;
        }
        if (rows.length < 1000) return rows;
        for (let offset = 1000; ; offset += 1000) {
            const page = await read(`${resource}&limit=1000&offset=${offset}`);
            rows.push(...page);
            if (page.length < 1000) return rows;
            if (offset >= 99000) throw new Error('Public SEO pagination limit exceeded');
        }
    }
    function descriptor(row) {
        const existing = staticNorms.find(n => n.slug === row.slug || n.id === row.codigo);
        return { ...existing, ...row, title: existing?.displayTitle || existing?.menuLabel || row.nombre, introduction: row.introduccion || existing?.introduction || '', url: `/legislacion/${row.slug}` };
    }
    async function basicCatalog() {
        if (basicCache && Date.now() < basicExpires) return basicCache;
        if (!basicPending) basicPending = (async () => {
            const [normRows, summaries] = await Promise.all([
                all('normas_legales?select=codigo,nombre,slug,introduccion,actualizado_en,estado&estado=eq.publicado&order=codigo.asc'),
                all('summary_publications?select=id,course_id,title,template_name,preview_html,published_at&order=id.asc')
            ]);
            basicCache = {
                norms: normRows.filter(n => n.estado === 'publicado' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(n.slug)).map(descriptor),
                summaries: summaries.filter(s => courses.some(c => c.id === s.course_id) && text(s.preview_html).length >= 40)
            };
            basicExpires = Date.now() + cacheMs;
            return basicCache;
        })().finally(() => { basicPending = null; });
        return basicPending;
    }
    function eligible(rows) {
        return rows.filter(row => {
            if (row.estado !== 'publicado' || !row.numero_articulo) return false;
            row.plainText = text(row.contenido);
            return row.plainText.length >= 20;
        });
    }
    function duplicateRows(norm, rows) {
        const seen = new Map(), duplicates = new Map();
        rows.forEach(row => {
            const hash = crypto.createHash('sha256').update(row.plainText || text(row.contenido)).digest('hex');
            if (seen.has(hash)) duplicates.set(articlePath(norm, row), articlePath(norm, seen.get(hash)));
            else seen.set(hash, row);
        });
        return duplicates;
    }
    async function normArticles(norm, fresh) {
        const previous = normCache.get(norm.codigo);
        if (!fresh && previous && Date.now() < previous.expires) return previous.rows;
        const rows = eligible(await all(`articulos_legales?select=${ARTICLE_FIELDS}&codigo=eq.${qualified(norm.codigo)}&estado=eq.publicado&order=orden.asc,id.asc`));
        if (normCache.size >= 16 && !normCache.has(norm.codigo)) normCache.delete(normCache.keys().next().value);
        normCache.set(norm.codigo, { rows, expires: Date.now() + cacheMs });
        return rows;
    }
    async function catalog() {
        if (cache && Date.now() < expires) return cache;
        if (!pending) pending = (async () => {
            const [basic, articleRows] = await Promise.all([
                basicCatalog(),
                all(`articulos_legales?select=${ARTICLE_FIELDS}&estado=eq.publicado&order=codigo.asc,orden.asc,id.asc`)
            ]);
            const norms = basic.norms;
            const rowsByCode = new Map();
            norms.forEach(n => rowsByCode.set(n.codigo, []));
            eligible(articleRows).forEach(row => rowsByCode.get(row.codigo)?.push(row));
            const duplicates = new Map();
            norms.forEach(n => {
                for (const [from, to] of duplicateRows(n, rowsByCode.get(n.codigo) || [])) duplicates.set(from, to);
            });
            cache = { norms: norms.filter(n => rowsByCode.get(n.codigo).length), rowsByCode, duplicates, summaries: basic.summaries };
            expires = Date.now() + cacheMs;
            return cache;
        })().finally(() => { pending = null; });
        return pending;
    }
    function topics(course) { return localTopics.get(course.id) || []; }
    function topicContent(topic) {
        // Only local resources already exposed by the public course registry.
        let html = topic.contenido ? `<p>${escape(topic.contenido)}</p>` : '';
        if (topic.htmlFile && !/^https?:/i.test(topic.htmlFile)) {
            const file = path.resolve(root, topic.htmlFile.replace(/^\//, ''));
            if (file.startsWith(path.join(root, 'data') + path.sep) && fs.existsSync(file)) html += safeHtml(fs.readFileSync(file, 'utf8'));
        }
        return html;
    }
    function courseHasContent(course, data) {
        return topics(course).some(t => text(topicContent(t)).length >= 40) || data.summaries.some(s => s.course_id === course.id);
    }
    function page(url, title, description, html, options = {}) {
        return { url, title: title.includes(BRAND) ? title : `${title} | ${BRAND}`, description: excerpt(description), html, status: 200, index: true, type: 'WebPage', ...options };
    }
    function problem(status) {
        const unavailable = status === 503;
        return page('/', unavailable ? 'Contenido temporalmente no disponible' : 'Página no encontrada', unavailable ? 'Intenta nuevamente en unos minutos.' : 'La página solicitada no existe.', `<section class="container"><h1>${unavailable ? 'Contenido temporalmente no disponible' : 'Página no encontrada'}</h1><p>${link('/', 'Volver a La Norma Express')}</p></section>`, { status, index: false, standalone: true });
    }
    function list(items) { return `<ul>${items.map(([url, label]) => `<li>${link(url, label)}</li>`).join('')}</ul>`; }
    function breadcrumbs(items) { return `<nav aria-label="Ruta de navegación">${items.map(([url, label]) => link(url, label)).join(' / ')}</nav>`; }
    const collection = (url, title, description, body, opts = {}) => page(url, title, description, `<section class="container"><h1>${escape(title)}</h1><p>${escape(description)}</p>${body}</section>`, { type: 'CollectionPage', ...opts });

    async function resolve(rawPath) {
        const target = new URL(rawPath, ORIGIN);
        let pathname;
        try { pathname = decodeURI(target.pathname); } catch (_) { return problem(404); }
        const clean = pathname.replace(/\/+$/, '') || '/';
        // Unknown paths never query the database or turn into an app-shell 200.
        const known = clean === '/' || clean === '/legislacion' || clean === '/formacion'
            || /^\/legislacion\/[^/]+(?:\/articulo\/[^/]+)?$/.test(clean)
            || /^\/formacion\/[^/]+(?:\/(?:tema|resumen)\/[^/]+)?$/.test(clean);
        if (!known) return problem(404);
        // The brand homepage and courses never wait for the global article scan.
        // That heavier read is reserved for sitemap generation.
        const data = await basicCatalog();
        const readyCourses = courses.filter(c => courseHasContent(c, data));
        const readyAreas = areas.filter(a => readyCourses.some(c => c.area === a.id));
        let result;
        if (clean === '/') {
            const cards = data.norms.map(n => `<a class="card" href="${escape(n.url)}"><img class="icono-rama" src="${escape(n.homeCard?.image || n.image?.src || '/assets/imagenes/logo4.png')}" alt="${escape(n.homeCard?.imageAlt || n.title)}"><h3>${escape(n.homeCard?.title || n.title)}</h3><p>${escape(n.homeCard?.description || excerpt(n.introduction, 120))}</p></a>`).join('');
            const body = home.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace('<div id="legislacion-home-cards" class="grid-categorias"></div>', `<div id="legislacion-home-cards" class="grid-categorias">${cards}</div>`)
                + `<section class="container"><h2>Legislación y formación jurídica</h2>${list([['/legislacion', 'Explorar legislación peruana'], ['/formacion', 'Formación Jurídica'], ...readyCourses.map(c => [c.route, c.name])])}</section>`;
            result = page('/', 'La Norma Express: legislación y formación jurídica del Perú', 'Consulta la Constitución Política del Perú, códigos, leyes, artículos legales y materiales de formación jurídica en La Norma Express.', body, { type: 'WebSite' });
        } else if (clean === '/legislacion') {
            result = collection(clean, 'Legislación peruana', 'Constitución, códigos y leyes publicados en La Norma Express.', list(data.norms.map(n => [n.url, n.title])), { standalone: true });
        } else if (clean === '/formacion' || readyAreas.some(a => a.route === clean) || areas.some(a => a.route === clean)) {
            const area = areas.find(a => a.route === clean);
            const selected = readyCourses.filter(c => !area || c.area === area.id);
            result = collection(clean, area?.name || 'Formación Jurídica', area?.description || 'Cursos y materiales públicos para estudiar Derecho en La Norma Express.', list(selected.map(c => [c.route, c.name])), { index: selected.length > 0 });
        } else if (clean.startsWith('/legislacion/')) {
            const match = /^\/legislacion\/([^/]+)(?:\/articulo\/([^/]+))?$/.exec(clean);
            let norm = data.norms.find(n => n.slug.toLowerCase() === match[1].toLowerCase());
            const preparing = staticNorms.find(n => n.url.toLowerCase() === clean.toLowerCase() && n.status !== 'ready');
            if (!norm) return preparing ? collection(preparing.url, preparing.displayTitle || preparing.title, 'Contenido en preparación.', '', { index: false }) : problem(404);
            // Recheck publication on every document response. A cached sitemap is
            // bounded to 60s, but a withdrawn document must not serve cached text.
            const liveNorm = await read(`normas_legales?select=codigo,estado&codigo=eq.${qualified(norm.codigo)}&estado=eq.publicado&limit=1`);
            if (!liveNorm.length) return problem(404);
            let number = match[2];
            if (!number && target.searchParams.has('art')) number = encodeURIComponent(target.searchParams.get('art'));
            const rows = await normArticles(norm, !number);
            const duplicates = duplicateRows(norm, rows);
            if (number) {
                try { number = decodeURIComponent(number); } catch (_) { return problem(404); }
                const fresh = await read(`articulos_legales?select=numero_articulo,titulo,contenido,contenido_lne,estructura,actualizado_en,estado&codigo=eq.${qualified(norm.codigo)}&numero_articulo=eq.${qualified(number)}&estado=eq.publicado&limit=1`);
                const article = fresh[0];
                if (!article || text(article.contenido).length < 20) return problem(404);
                const url = articlePath(norm, article), duplicate = duplicates.get(url);
                if (duplicate) return { redirect: duplicate };
                if (!match[2]) return { redirect: url };
                const label = articleLabel(article);
                const index = rows.findIndex(r => r.numero_articulo === article.numero_articulo);
                const neighbours = [rows[index - 1], rows[index + 1]].filter(Boolean);
                result = page(url, `${label} — ${norm.title}`, `${label}. ${norm.title}. ${text(article.contenido)}`, `<section class="container container-ley">${breadcrumbs([['/', BRAND], ['/legislacion', 'Legislación'], [norm.url, norm.title]])}<article><h1>${escape(label)}</h1><p>${escape(norm.title)}</p><div class="articulo-texto">${safeHtml(article.contenido)}</div></article><nav aria-label="Artículos relacionados">${list(neighbours.map(r => [articlePath(norm, r), articleLabel(r)]))}${link(norm.url, `Ver ${norm.title}`)}</nav></section>`, { standalone: true, type: 'Legislation', parent: norm.url, modified: iso(article.actualizado_en) });
            } else {
                // Overview rows were just fetched with fresh publication filters.
                if (!rows.length) return problem(404);
                const links = rows.filter(r => !duplicates.has(articlePath(norm, r)));
                const body = `<div class="intro-container"><div class="intro-text"><h1 class="intro-titulo">${escape(norm.title)}</h1><div class="intro-content"><p class="intro-parrafo">${escape(text(norm.introduction))}</p></div></div></div>`
                    + `<section><h2>Índice de artículos y disposiciones</h2>${list(links.map(r => [articlePath(norm, r), articleLabel(r)]))}</section>`
                    + links.slice(0, 3).map(r => `<section><h2>${link(articlePath(norm, r), articleLabel(r))}</h2>${safeHtml(r.contenido)}</section>`).join('');
                result = page(norm.url, /perú/i.test(norm.title) ? norm.title : `${norm.title} del Perú`, `${norm.title}: consulta su texto, artículos y disposiciones publicados. ${text(norm.introduction)}`, `<div class="container container-ley">${body}</div>`, { type: 'Legislation', articleLinks: rows.map(r => ({ number: String(r.estructura?.numero_original || r.numero_articulo).toLowerCase(), url: duplicates.get(articlePath(norm, r)) || articlePath(norm, r) })) });
            }
        } else {
            const match = /^\/formacion\/([^/]+)(?:\/(tema|resumen)\/([^/]+))?$/.exec(clean);
            const course = courses.find(c => c.slug.toLowerCase() === match[1].toLowerCase());
            if (!course) return problem(404);
            const courseTopics = topics(course).filter(t => text(topicContent(t)).length >= 40);
            const summaries = data.summaries.filter(s => s.course_id === course.id);
            if (match[2]) {
                let content, title, modified, url;
                if (match[2] === 'tema') {
                    const topic = courseTopics.find(t => String(t.id) === match[3]);
                    if (!topic) return problem(404);
                    content = topicContent(topic); title = topic.titulo; url = `${course.route}/tema/${encodeURIComponent(topic.id)}`;
                } else {
                    if (!/^[0-9a-f-]{36}$/i.test(match[3])) return problem(404);
                    const fresh = await read(`summary_publications?select=id,course_id,title,template_name,preview_html,published_at&id=eq.${qualified(match[3])}&course_id=eq.${qualified(course.id)}&limit=1`);
                    const summary = fresh[0];
                    if (!summary || text(summary.preview_html).length < 40) return problem(404);
                    const canvas=require('./summary-public-view').isCanvasPublication(summary.preview_html);
                    content = `<div class="lne-summary-viewport"><iframe class="lne-summary-public-frame${canvas?' lne-summary-canvas-frame':''}" title="${escape(summary.title||summary.template_name)}" sandbox src="/api/formation/summaries/${summary.id}/view"></iframe></div><noscript>${safeHtml(summary.preview_html)}</noscript>`; title = summary.title || summary.template_name;
                    modified = iso(summary.published_at); url = `${course.route}/resumen/${summary.id}`;
                }
                result = page(url, `${text(title)} — ${course.name}`, `${text(title)}. ${text(content)}`, `<section class="container">${breadcrumbs([['/', BRAND], ['/formacion', 'Formación Jurídica'], [course.route, course.name]])}<article><h1>${escape(text(title))}</h1>${content}</article><p>${link(course.route, `Volver a ${course.name}`)}</p></section>`, { standalone: true, type: 'LearningResource', modified, parent: course.route });
            } else {
                const entries = [...courseTopics.map(t => [`${course.route}/tema/${encodeURIComponent(t.id)}`, t.titulo]), ...summaries.map(s => [`${course.route}/resumen/${s.id}`, s.title || s.template_name])];
                result = collection(course.route, course.name, `Materiales de ${course.name} en La Norma Express. ${course.shortDescription || ''}`, list(entries) + courseTopics.map(t => `<section><h2>${escape(t.titulo)}</h2>${topicContent(t)}</section>`).join(''), { type: 'Course', index: entries.length > 0 });
            }
        }
        if (pathname !== result.url && target.pathname !== result.url) return { redirect: result.url + target.search };
        return result;
    }

    function structured(page) {
        const url = ORIGIN + page.url;
        const graph = [
            { '@type': 'Organization', '@id': ORIGIN + '/#organization', name: BRAND, url: ORIGIN + '/', logo: ORIGIN + '/assets/imagenes/logo.png' },
            { '@type': 'WebSite', '@id': ORIGIN + '/#website', name: BRAND, url: ORIGIN + '/', inLanguage: 'es-PE', publisher: { '@id': ORIGIN + '/#organization' } },
            { '@type': page.type === 'WebSite' ? 'WebPage' : page.type, '@id': url + '#content', url, name: page.title, description: page.description, inLanguage: 'es-PE', isPartOf: { '@id': ORIGIN + '/#website' }, ...(page.type === 'Legislation' ? { jurisdiction: 'Perú' } : {}), ...(page.type === 'Course' ? { provider: { '@id': ORIGIN + '/#organization' } } : {}) }
        ];
        if (page.parent) graph[2].isPartOf = { '@id': ORIGIN + page.parent + '#content' };
        // Data timestamps are not legislative enactment/validity dates.
        if (page.modified) graph[2].dateModified = page.modified;
        if (page.url !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: BRAND, item: ORIGIN + '/' }, ...(page.parent ? [{ '@type': 'ListItem', position: 2, name: page.parent.startsWith('/legislacion') ? 'Norma' : 'Curso', item: ORIGIN + page.parent }] : []), { '@type': 'ListItem', position: page.parent ? 3 : 2, name: page.title, item: url }] });
        return { '@context': 'https://schema.org', '@graph': graph };
    }
    function metadata(page) {
        return { url: page.url, title: page.title, description: page.description, index: page.index, status: page.status, standalone: !!page.standalone, structured: page.index ? structured(page) : null, articleLinks: page.articleLinks || [] };
    }
    function render(page) {
        const meta = metadata(page), canonical = ORIGIN + page.url;
        const head = `<meta name="description" content="${escape(page.description)}">\n<meta name="robots" content="${page.index ? 'index,follow' : 'noindex,follow'}">\n${page.status === 200 ? `<link rel="canonical" href="${escape(canonical)}">` : ''}
<meta property="og:site_name" content="${BRAND}"><meta property="og:locale" content="es_PE"><meta property="og:type" content="website"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${escape(canonical)}"><meta property="og:image" content="${ORIGIN}/assets/imagenes/logo.png">
<meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escape(page.title)}"><meta name="twitter:description" content="${escape(page.description)}"><meta name="twitter:image" content="${ORIGIN}/assets/imagenes/logo.png">
<script id="lne-seo-data" type="application/json">${json(meta)}</script>${meta.structured ? `<script id="lne-jsonld" type="application/ld+json">${json(meta.structured)}</script>` : ''}`;
        return shell.replace('<html lang="es">', `<html lang="es" data-lne-document="${page.standalone ? 'true' : 'false'}">`)
            .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escape(page.title)}</title>`)
            .replace('</head>', head + '\n</head>')
            .replace(/(<main id="app-content"[^>]*>)[\s\S]*?<\/main>/, (_match, opening) => `${opening}${page.html}</main>`)
            .replace('<div id="legislacion-menu" class="dropdown-content"></div>', `<div id="legislacion-menu" class="dropdown-content">${link('/legislacion', 'Legislación peruana')}</div>`)
            .replace('<div id="formacion-menu" class="dropdown-content"></div>', `<div id="formacion-menu" class="dropdown-content">${link('/formacion', 'Formación Jurídica')}</div>`);
    }
    async function sitemapEntries() {
        const data = await catalog();
        const entries = [{ url: '/' }, { url: '/legislacion' }, { url: '/formacion' }];
        for (const norm of data.norms) {
            entries.push({ url: norm.url });
            for (const row of data.rowsByCode.get(norm.codigo)) if (!data.duplicates.has(articlePath(norm, row))) entries.push({ url: articlePath(norm, row), modified: iso(row.actualizado_en) });
        }
        for (const area of areas) if (courses.some(c => c.area === area.id && courseHasContent(c, data))) entries.push({ url: area.route });
        for (const course of courses.filter(c => courseHasContent(c, data))) {
            entries.push({ url: course.route });
            for (const topic of topics(course).filter(t => text(topicContent(t)).length >= 40)) entries.push({ url: `${course.route}/tema/${encodeURIComponent(topic.id)}` });
        }
        for (const summary of data.summaries) entries.push({ url: `${courses.find(c => c.id === summary.course_id).route}/resumen/${summary.id}`, modified: iso(summary.published_at) });
        return entries;
    }
    router.get('/robots.txt', (_req, res) => res.type('text/plain').send(`User-agent: *\nAllow: /\nAllow: /api/public/\nAllow: /api/formation/summaries\nDisallow: /admin\nDisallow: /api/\nDisallow: /tests/\nDisallow: /lib/\nDisallow: /migration/\nDisallow: /scripts/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`));
    const sitemapCache = require('./sitemap-cache').createSitemapCache({ root, generate: sitemapEntries, ...sitemapOptions });
    router.get(['/sitemap.xml', '/sitemap-:revision-:part.xml'], sitemapCache.serve);
    router.get('/sitemaps/:part.xml', sitemapCache.serve);
    router.get('/api/public/seo', async (req, res) => {
        try {
            if (typeof req.query.path !== 'string' || !req.query.path.startsWith('/') || req.query.path.startsWith('//') || req.query.path.length > 1500) return res.status(400).json({ error: 'Ruta inválida.' });
            const page = await resolve(req.query.path);
            return res.set('Cache-Control', 'no-store').json(page.redirect ? { redirect: page.redirect } : metadata(page));
        } catch (_) { return res.status(503).set('Cache-Control', 'no-store').json(metadata(problem(503))); }
    });
    router.get('*', async (req, res, next) => {
        if (req.path.startsWith('/api/') || req.path.startsWith('/admin') || req.path.startsWith('/tests/')) return next();
        if (req.path.startsWith('/pages/') || req.path.startsWith('/data/') || (/\.[a-z0-9]+$/i.test(req.path) && !/^\/legislacion\/[^/]+\/articulo\//.test(req.path))) { res.set('X-Robots-Tag', 'noindex'); return next(); }
        try {
            const page = await resolve(req.originalUrl);
            if (page.redirect) return res.redirect(301, page.redirect);
            res.set('Cache-Control', 'no-store');
            if (!page.index) res.set('X-Robots-Tag', 'noindex, follow');
            if (page.status === 503) res.set('Retry-After', '60');
            return res.status(page.status).type('html').send(render(page));
        } catch (_) { return res.status(503).set({ 'Retry-After': '60', 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' }).type('html').send(render(problem(503))); }
    });
    return { router, resolve, render, sitemapEntries, catalog, sitemapCache };
}
module.exports = { createPublicSeo, safeHtml, text, articleLabel, ORIGIN };
