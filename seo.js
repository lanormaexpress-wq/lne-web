(function () {
    'use strict';
    const ORIGIN = 'https://lanormaexpress.dpdns.org';
    let initial;
    try { initial = JSON.parse(document.getElementById('lne-seo-data')?.textContent || 'null'); } catch (_) { /* No bootstrap on offline shell. */ }
    let revision = 0, articleLinks = [];
    function setMeta(attribute, name, value) {
        let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
        if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, name); document.head.appendChild(node); }
        node.content = value;
    }
    function apply(meta) {
        document.title = meta.title;
        setMeta('name', 'description', meta.description);
        setMeta('name', 'robots', meta.index ? 'index,follow' : 'noindex,follow');
        let canonical = document.querySelector('link[rel="canonical"]');
        if (meta.status !== 200) canonical?.remove();
        else {
            if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
            canonical.href = ORIGIN + meta.url;
        }
        for (const [name, value] of Object.entries({ 'og:title': meta.title, 'og:description': meta.description, 'og:url': ORIGIN + meta.url })) setMeta('property', name, value);
        setMeta('name', 'twitter:title', meta.title); setMeta('name', 'twitter:description', meta.description);
        let structured = document.getElementById('lne-jsonld');
        if (!meta.structured) structured?.remove();
        else {
            if (!structured) { structured = document.createElement('script'); structured.id = 'lne-jsonld'; structured.type = 'application/ld+json'; document.head.appendChild(structured); }
            structured.textContent = JSON.stringify(meta.structured).replace(/</g, '\\u003c');
        }
        articleLinks = meta.articleLinks || [];
        enhanceArticles();
    }
    function enhanceArticles() {
        if (!articleLinks.length || document.documentElement.dataset.lneDocument === 'true') return;
        const byNumber = new Map();
        for (const item of articleLinks) { if (!byNumber.has(item.number)) byNumber.set(item.number, []); byNumber.get(item.number).push(item.url); }
        const seen = new Map();
        document.querySelectorAll('#contenedor-leyes .articulo-contenedor-bloque').forEach(block => {
            const number = String(block.dataset.num || '').toLowerCase(), count = seen.get(number) || 0;
            seen.set(number, count + 1);
            const href = byNumber.get(number)?.[count], heading = block.querySelector('.articulo-num');
            if (!href || !heading || heading.querySelector('[data-seo-article]')) return;
            const anchor = document.createElement('a');
            anchor.href = href; anchor.dataset.seoArticle = 'true';
            anchor.style.color = 'inherit'; anchor.style.textDecoration = 'none';
            while (heading.firstChild) anchor.appendChild(heading.firstChild);
            heading.setAttribute('role', 'heading'); heading.setAttribute('aria-level', '2'); heading.appendChild(anchor);
        });
    }
    async function update(path) {
        const current = ++revision;
        const target = new URL(path, location.origin);
        if (initial && initial.url === target.pathname && !target.searchParams.has('art')) { const meta = initial; initial = null; apply(meta); return; }
        initial = null;
        // Remove the previous page's identity while the next one is loading.
        apply({ title: 'La Norma Express', description: 'Legislación y formación jurídica del Perú.', index: false, status: 503, url: target.pathname });
        try {
            const response = await fetch(`/api/public/seo?path=${encodeURIComponent(target.pathname + target.search)}`, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
            const meta = await response.json();
            if (current !== revision) return;
            if (meta.redirect) { location.replace(meta.redirect); return; }
            apply(meta);
        } catch (_) { /* Retain noindex instead of another page's canonical. */ }
    }
    document.addEventListener('DOMContentLoaded', () => {
        const content = document.getElementById('app-content');
        if (content) new MutationObserver(enhanceArticles).observe(content, { childList: true, subtree: true });
        if (initial) apply(initial);
    });
    window.LNESEO = Object.freeze({ update });
})();
