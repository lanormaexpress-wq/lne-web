/** Read-only/export adapter. Layout belongs exclusively to Canvas.renderDocument. */
window.LNERenderer = (function () {
    function compileToHTML(state) {
        if (!state || !Array.isArray(state.bloques)) return '';
        if (!window.LNECanvas?.renderDocument) throw new Error('El motor compartido del documento no está disponible.');
        return window.LNECanvas.renderDocument(state, {editable:false}).outerHTML;
    }
    return {compileToHTML};
})();
