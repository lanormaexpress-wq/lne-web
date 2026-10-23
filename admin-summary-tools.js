(function () {
    'use strict';
    const frame = document.getElementById('summary-editor-frame');
    let selectionLoading;
    function loadSelection() {
        if (window.LNESummarySelection) return Promise.resolve();
        if (!selectionLoading) selectionLoading = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/admin-summary-selection.js?v=security-1';
            script.onload = resolve;
            script.onerror = () => { script.remove(); selectionLoading = null; reject(new Error('No se pudo abrir la selección. Inténtalo nuevamente.')); };
            document.head.appendChild(script);
        });
        return selectionLoading;
    }
    function attach() {
        const doc = frame.contentDocument, win = frame.contentWindow;
        const next = doc?.getElementById('btn-nuevo');
        if (!next || doc.getElementById('lne-summary-continue')) return;
        const originalAlert = win.alert.bind(win);
        win.alert = message => {
            const text = String(message);
            if (text.startsWith('Revisa la importación:')) {
                win.console.warn('[LNE · observaciones DOCX]', text);
                return;
            }
            if (/^(?:No se pudo procesar el archivo Word:|Error al procesar Word:)/.test(text)) {
                win.console.warn('[LNE · fallo DOCX]', text);
                return originalAlert('No se pudo importar este documento Word. Revisa que sea un archivo .docx válido.');
            }
            return originalAlert(message);
        };
        const button = doc.createElement('button');
        button.id = 'lne-summary-continue'; button.type = 'button';
        button.className = 'btn-top btn-top-primary'; button.textContent = 'CONTINUAR';
        button.addEventListener('click', async () => {
            button.disabled = true;
            try { await loadSelection(); await window.LNESummarySelection.open(); }
            catch (error) { originalAlert(error.message); }
            finally { button.disabled = false; }
        });
        next.before(button);
        if (window.LNEAdminAccess) {
            const allowed = key => window.LNEPermissionCatalog.allowed(window.LNEAdminAccess, key);
            doc.getElementById('btn-nuevo').disabled = !allowed('summary_create');
            doc.getElementById('btn-importar-word').disabled = !allowed('summary_import');
            doc.getElementById('hidden-word-input').disabled = !allowed('summary_import');
            // Authorization wrapper only: do not alter canvas, parser, state methods or editor source.
            if (!allowed('summary_import')) doc.addEventListener('drop', event => { event.preventDefault(); event.stopImmediatePropagation(); }, true);
        }
    }
    frame.addEventListener('load', attach);
    attach();
})();
