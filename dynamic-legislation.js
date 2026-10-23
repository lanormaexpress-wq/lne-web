(function () {
    'use strict';
    const sectionCache = new Map();

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
        if (existing?.status === 'ready' && existing.contentScript) return;
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
            const key = Number.isInteger(section.grupo)
                ? `group:${section.grupo}`
                : JSON.stringify([section.titulo || '', section.capitulo || '', Boolean(section.nuevaHoja)]);
            let group = groupMap.get(key);
            if (!group) {
                group = {
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
                tipo: structured.tipo || 'Artículo',
                numero: String(row.numero_articulo || ''),
                titulo: row.titulo || structured.titulo || '',
                texto: row.contenido || structured.texto || '',
                orden: row.orden ?? index + 1
            });
        });
        return groups;
    }

    async function load(norma) {
        if (sectionCache.has(norma.id)) return sectionCache.get(norma.id);
        const response = await fetch(`/api/public/legislation/${encodeURIComponent(norma.slug)}/articles`);
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || 'No se pudo cargar la legislación publicada.');
        const sections = groupArticles(body.articulos || []);
        sectionCache.set(norma.id, sections);
        return sections;
    }

    const ready = fetch('/api/public/legislation')
        .then(async response => {
            const body = await response.json();
            if (!response.ok) throw new Error(body.error || 'No se pudo actualizar el catálogo jurídico.');
            (body.normas || []).forEach(applyPublicNorm);
        })
        .catch(error => console.warn('Catálogo dinámico no disponible; se conserva el catálogo local.', error));

    window.LNEDynamicLegislation = Object.freeze({ ready, load });
})();
