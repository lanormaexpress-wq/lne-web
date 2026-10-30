// Markup matching the existing public templates. No browser work is needed to
// turn a separate SEO layout into the public presentation.
(function () {
    'use strict';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    const icon = id => `<svg class="formacion-icon" viewBox="0 0 64 64" aria-hidden="true"><use href="/assets/iconos/formacion.svg#${escape(id)}"></use></svg>`;
    const dimensions = image => image.width && image.height ? ` width="${image.width}" height="${image.height}"` : '';
    function homeCards(norms) {
        return norms.filter(n => n.homeCard).map(n => `<a href="${escape(n.url)}" class="card" style="text-decoration: none; color: inherit; display: block;"><img src="${escape(n.homeCard.image)}" alt="${escape(n.homeCard.imageAlt)}" class="icono-rama"${dimensions(n.homeCard)}><h3>${escape(n.homeCard.title)}</h3><p>${escape(n.homeCard.description)}</p></a>`).join('');
    }
    function introduction(norma) {
        if (!norma.introduction && !norma.image) return '';
        const image = norma.image ? `<img src="${escape(norma.image.src)}" alt="${escape(norma.image.alt || norma.title)}" class="${escape(norma.image.className || '')}"${dimensions(norma.image)}>` : '';
        if (!norma.introduction) return `<div class="intro-container">${image}</div>`;
        const terms = (norma.introductionEmphasis || []).filter(Boolean);
        const matcher = terms.length ? new RegExp(terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g') : null;
        let paragraph = '', cursor = 0;
        if (matcher) for (const match of norma.introduction.matchAll(matcher)) {
            paragraph += escape(norma.introduction.slice(cursor, match.index)) + `<strong>${escape(match[0])}</strong>`;
            cursor = match.index + match[0].length;
        }
        paragraph += escape(norma.introduction.slice(cursor));
        return `<div class="intro-container"><div class="intro-text"><h1 class="intro-titulo">${escape(norma.displayTitle || norma.title)}</h1><div class="intro-content"><p class="intro-parrafo">${paragraph}</p>${image}</div></div></div>`;
    }
    function areaCards(areas) {
        return areas.map(area => `<a href="${escape(area.route)}" class="formacion-area-card"><span class="formacion-area-icon">${icon(area.icon)}</span><span class="formacion-area-name">${escape(area.name)}</span><span class="formacion-area-summary">${escape(area.description)}</span></a>`).join('');
    }
    function courseCards(courses) {
        return courses.map(course => `<a href="${escape(course.route)}" class="formacion-course-card" data-status="${escape(course.status)}"><span class="formacion-course-icon">${icon(course.icon)}</span><span class="formacion-course-name">${escape(course.name)}</span>${course.shortDescription ? `<span class="formacion-course-description">${escape(course.shortDescription)}</span>` : ''}${course.status === 'preparing' ? '<span class="formacion-status">En preparación</span>' : ''}</a>`).join('');
    }
    function topicCards(topics, course) {
        return topics.map((topic, index) => {
            const hasContent = topic.publicationId || topic.contenido || topic.htmlFile || topic.pdf || topic.imagenes?.length;
            const tag = topic.publicUrl ? 'a' : 'button';
            const attributes = topic.publicUrl ? `href="${escape(topic.publicUrl)}" role="button"` : 'type="button"';
            return `<${tag} ${attributes} class="formacion-topic-card" data-topic-id="${escape(topic.id)}" style="text-decoration: none; animation-delay: ${Math.min(index * 0.08, 0.48)}s;"><div class="formacion-topic-media"><div class="formacion-topic-placeholder">${icon(course.icon)}<span>${topic.imagen ? 'Imagen en preparación' : 'Contenido en preparación'}</span></div>${topic.imagen ? `<img class="formacion-topic-image" alt="${escape(topic.titulo)}" src="${escape(topic.imagen)}">` : ''}</div><span class="formacion-topic-title">${escape(topic.titulo)}</span>${hasContent ? '' : '<span class="formacion-topic-status">En preparación</span>'}</${tag}>`;
        }).join('');
    }
    const api = Object.freeze({ homeCards, introduction, areaCards, courseCards, topicCards });
    module.exports = api;
})();
