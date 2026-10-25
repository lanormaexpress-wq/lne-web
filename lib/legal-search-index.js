'use strict';

// Reuse the compact public search contract, retaining unrelated formation entries.
module.exports = function legalSearchIndex(base, norms, articles) {
    const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const plain = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|amp|quot|lt|gt);/g, ' ').replace(/\s+/g, ' ').trim();
    const routes = new Set(norms.map(n => `/legislacion/${n.slug}`));
    const entries = [], remap = new Map(), terms = Object.create(null);
    base.entries.forEach((entry, oldIndex) => {
        if (entry.k === 'article' && routes.has(entry.r.split('?')[0])) return;
        remap.set(oldIndex, entries.length);
        entries.push(entry);
    });
    Object.entries(base.terms).forEach(([term, ids]) => {
        const kept = ids.filter(id => remap.has(id)).map(id => remap.get(id));
        if (kept.length) terms[term] = kept;
    });
    const byCode = new Map(norms.map(n => [n.codigo, n]));
    function add(entry, text) {
        const index = entries.push(entry) - 1;
        for (const term of new Set(normalize(text).match(/[a-z0-9]{3,}/g) || [])) {
            (terms[term] ||= []).push(index);
        }
    }
    norms.forEach(n => {
        const route = `/legislacion/${n.slug}`;
        if (!entries.some(e => e.k === 'norma' && e.r === route)) {
            add({ g: 'legislation', k: 'norma', t: n.nombre, r: route }, n.nombre);
        }
    });
    articles.forEach(a => {
        const norm = byCode.get(a.codigo);
        if (!norm || a.contenido_lne?.esDeclaracion) return;
        const number = a.estructura?.total_ocurrencias_numero > 1
            && a.numero_articulo === `${a.estructura.numero_original}#${a.estructura.ocurrencia_numero}`
            ? a.estructura.numero_original : a.numero_articulo;
        add({ g: 'legislation', k: 'article', n: number, t: plain(a.titulo), d: norm.nombre,
            r: `/legislacion/${norm.slug}?art=${encodeURIComponent(number)}` },
        `${number} ${plain(a.titulo)} ${plain(a.contenido)} ${norm.nombre}`);
    });
    return { version: base.version, generatedAt: new Date().toISOString(), entries, terms };
};
