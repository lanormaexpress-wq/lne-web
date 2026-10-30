(function () {
    'use strict';
    const REQUEST_TIMEOUT_MS = 8000;

    async function readPublicJson(url) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        try {
            const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
            if (!response.ok) throw new Error(`Legislación no disponible (${response.status}).`);
            return await response.json();
        } finally {
            clearTimeout(timer);
        }
    }

    function cardImage(norma) {
        return norma.imagen_url || '/assets/imagenes/logo4.png';
    }

    function cardDescription(text) {
        const clean = String(text || '').replace(/\s+/g, ' ').trim();
        if (!clean) return 'Legislación publicada en La Norma Express.';
        return clean.length > 150 ? `${clean.slice(0, 147).trimEnd()}…` : clean;
    }

    function applyPublicNorm(row) {
        const existing = window.LNENormas.all.find(norma => norma.id === row.codigo || norma.slug === row.slug);
        // Existing presentation remains unchanged; only its article source changes.
        if (existing?.status === 'ready' && existing.contentScript) {
            existing.dynamic = true;
            existing.totalArticles = row.total_articulos;
            return;
        }
        const descriptor = existing || {
            id: row.codigo,
            slug: row.slug,
            url: `/legislacion/${row.slug}`,
            title: row.nombre,
            menuLabel: row.nombre,
            icon: row.icono || 'fa-book',
            featured: false,
            category: row.categoria || 'Otras normas',
            aliases: [row.nombre]
        };
        Object.assign(descriptor, {
            slug: row.slug,
            url: `/legislacion/${row.slug}`,
            title: row.nombre,
            menuLabel: row.nombre,
            introduction: row.introduccion || '',
            image: row.imagen_url ? { src: row.imagen_url, alt: `Portada de ${row.nombre}`, className: 'intro-portada' } : descriptor.image,
            status: 'ready',
            dynamic: true,
            totalArticles: row.total_articulos
        });
        if (!existing) {
            descriptor.homeCard = {
                title: row.nombre,
                description: cardDescription(row.introduccion),
                image: cardImage(row),
                imageAlt: `Icono de ${row.nombre}`
            };
            window.LNENormas.all.push(descriptor);
        }
    }

    function groupArticles(rows) {
        const groups = [];
        const groupMap = new Map();
        rows.forEach((row, index) => {
            const section = row.estructura?.seccion || {};
            const key = Number.isInteger(row.estructura?.seccion_indice)
                ? `source:${row.estructura.seccion_indice}`
                : Number.isInteger(section.grupo)
                ? `group:${section.grupo}`
                : JSON.stringify([section.titulo || '', section.capitulo || '', Boolean(section.nuevaHoja)]);
            let group = groupMap.get(key);
            if (!group) {
                group = {
                    ...section,
                    titulo: section.titulo || '',
                    capitulo: section.capitulo || '',
                    nuevaHoja: Boolean(section.nuevaHoja),
                    articulos: []
                };
                groupMap.set(key, group);
                groups.push(group);
            }
            const structured = row.contenido_lne || {};
            group.articulos.push({
                ...structured,
                tipo: structured.tipo ?? 'Artículo',
                numero: row.estructura?.total_ocurrencias_numero > 1
                    && row.numero_articulo === `${row.estructura.numero_original}#${row.estructura.ocurrencia_numero}`
                    ? row.estructura.numero_original : String(row.numero_articulo || ''),
                titulo: row.titulo ?? '',
                texto: row.contenido,
                orden: row.orden ?? index + 1
            });
        });
        return groups;
    }

    async function load(norma) {
        // Revalidate on every visit: an admin UPDATE must not be hidden by a Map.
        const body = await readPublicJson(`/api/public/legislation/${encodeURIComponent(norma.slug)}/articles`);
        if (!Array.isArray(body.articulos) || !body.articulos.length
            || body.articulos.some(row => typeof row.contenido !== 'string' || !row.numero_articulo)) {
            throw new Error('La API no devolvió artículos válidos.');
        }
        return groupArticles(body.articulos);
    }

    let bootstrap;
    try { bootstrap = JSON.parse(document.getElementById('lne-bootstrap')?.textContent || 'null'); } catch (_) { /* Offline shell. */ }
    const ready = (bootstrap?.normas ? Promise.resolve({ normas: bootstrap.normas }) : readPublicJson('/api/public/legislation'))
        .then(body => {
            if (!Array.isArray(body.normas)) throw new Error('Catálogo jurídico inválido.');
            (body.normas || []).forEach(applyPublicNorm);
        })
        .catch(error => console.warn('Catálogo dinámico no disponible; se conserva el catálogo local.', error));

    window.LNEDynamicLegislation = Object.freeze({ ready, load });
})();
