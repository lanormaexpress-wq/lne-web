(function () {
    'use strict';
    function getDocumentTitle(norma) {
        if (Object.prototype.hasOwnProperty.call(norma, 'documentTitle')) return norma.documentTitle;
        return norma.documentHeading === false ? '' : (norma.documentHeading || norma.title);
    }
    function getSectionTitle(norma, title) {
        if (!title || !norma.hideEmbeddedDocumentHeader) return title || '';
        const template = document.createElement('template');
        template.innerHTML = title;
        template.content.querySelectorAll('[data-lne-document-header]').forEach(header => header.remove());
        return template.innerHTML.trim();
    }
    function buildNormHtml(norma, sections) {
        const documentTitle = getDocumentTitle(norma);
        const headingMarkup = documentTitle ? `
                <div style="text-align: center; margin-bottom: 50px;">
                    <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #1b263b; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 15px; display: inline-block; width: 80%;">
                        ${documentTitle}
                    </h1>
                </div>` : '';
        let htmlFinal = `
            <div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
                ${headingMarkup}
        `;
        sections.forEach(section => {
            if (section.nuevaHoja) {
                htmlFinal += `</div>`;
                htmlFinal += `<div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 50px;">`;
            }
            htmlFinal += `
                <h2 style="text-align: center; font-weight: bold; text-transform: uppercase; margin-top: 40px; margin-bottom: 15px; color: #1b263b;">${getSectionTitle(norma, section.titulo)}</h2>
                <h3 style="text-align: center; font-weight: bold; margin-top: 0; margin-bottom: 40px; color: #1b263b;">${section.capitulo || ''}</h3>
            `;
            if (!Array.isArray(section.articulos)) return;
            section.articulos.forEach(article => {
                const articleTitle = article.titulo ? `.- ${article.titulo}` : '';
                let articleHeading = '';
                if (!article.esDeclaracion) {
                    let keyword = 'Artículo ';
                    if (Object.prototype.hasOwnProperty.call(article, 'tipo')) keyword = article.tipo !== '' ? `${article.tipo} ` : '';
                    articleHeading = `<span class="articulo-num" style="font-weight: bold; font-size: 1.1rem; display: block; margin-bottom: 10px; color: #1b263b;">${keyword}${article.numero}${articleTitle}</span>`;
                }
                const divider = article.esDeclaracion ? '' : '<hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;">';
                htmlFinal += `
                    <div class="articulo-contenedor-bloque" data-num="${String(article.numero).toLowerCase()}" style="margin-bottom: 30px; padding: 12px; border-radius: 6px; transition: background-color 0.8s ease;">
                        ${articleHeading}
                        <div class="articulo-texto">${article.texto}</div>
                        ${divider}
                    </div>
                `;
            });
        });
        htmlFinal += '</div>';
        return htmlFinal;
    }
    function renderNorm(container, norma, sections) {
        container.innerHTML = buildNormHtml(norma, sections);
        return container;
    }
    function renderEditableArticle(container, article) {
        renderNorm(container, { documentHeading: false }, [{ titulo: '', capitulo: '', articulos: [{ numero: article.numero || '', titulo: article.titulo || '', texto: article.texto || '' }] }]);
        const content = container.querySelector('.articulo-texto');
        content.id = 'visual-content-editor';
        content.contentEditable = 'true';
        content.dataset.placeholder = 'Escribe el contenido del artículo…';
        content.setAttribute('aria-label', 'Contenido del artículo');
        return { content, article: container.querySelector('.articulo-contenedor-bloque') };
    }
    window.LNEVisualRenderer = Object.freeze({ buildNormHtml, renderNorm, renderEditableArticle });
})();
