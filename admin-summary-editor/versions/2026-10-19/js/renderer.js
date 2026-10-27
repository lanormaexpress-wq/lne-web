/** Read-only/export adapter. Layout belongs exclusively to Canvas.renderDocument. */
window.LNERenderer = (function () {
    function compileToHTML(state) {
        if (!state || !Array.isArray(state.bloques)) return '';
        if (!window.LNECanvas?.renderDocument) throw new Error('El motor compartido del documento no está disponible.');
        return window.LNECanvas.renderDocument(state, {editable:false}).outerHTML;
    }
    function compileToDocument(state) {
        const html = compileToHTML(state);
        // Preserve source styles and their order. CSSOM serialization can change
        // variable-containing border shorthands; cross-origin CSSOM reads also
        // omit the existing icon font. Versioned CSS assets are public/static.
        const styles = [...document.head.querySelectorAll('link[rel="stylesheet"],style')].map(node => {
            if (node.tagName === 'STYLE') return `<style>${node.textContent}</style>`;
            if (!['https:','http:'].includes(new URL(node.href).protocol)) return '';
            return `<link rel="stylesheet" href="${node.href.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}">`;
        }).join('\n');
        return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${styles}</head><body>${html}</body></html>`;
    }
    return {compileToHTML,compileToDocument};
})();
