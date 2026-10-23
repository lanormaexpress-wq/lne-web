(function () {
    'use strict';
    const tab = document.querySelector('[data-admin-section="summaries"]');
    const panel = document.getElementById('summaries-section');
    const frame = document.getElementById('summary-editor-frame');
    const status = document.getElementById('summary-editor-status');
    const editorPath = '/admin/resumenes/editor';
    const header = document.querySelector('.admin-header');
    new ResizeObserver(() => {
        document.body.style.setProperty('--summary-header-height', `${header.getBoundingClientRect().height}px`);
    }).observe(header);
    function showEditor() {
        if (window.LNEAdminAccess && !window.LNEPermissionCatalog.allowed(window.LNEAdminAccess, 'summary_access')) return;
        document.body.classList.remove('converter-wide', 'publication-focus');
        document.body.classList.add('summary-editor-active');
        document.querySelectorAll('.admin-tab').forEach(item => item.classList.toggle('active', item === tab));
        document.querySelectorAll('.admin-section').forEach(item => { item.hidden = item !== panel; });
        document.getElementById('norms-panel').hidden = true;
    }
    tab.addEventListener('click', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (window.LNEAdminAccess && !window.LNEPermissionCatalog.allowed(window.LNEAdminAccess, 'summary_access')) return;
        if (location.pathname !== editorPath) history.pushState(null, '', editorPath);
        showEditor();
        openEditor();
    }, true);
    document.querySelectorAll('.admin-tab').forEach(item => {
        if (item !== tab) item.addEventListener('click', () => {
            panel.hidden = true;
            document.body.classList.remove('summary-editor-active');
            if (location.pathname === editorPath) history.pushState(null, '', '/admin');
        });
    });
    function openEditor() {
        if (window.LNEAdminAccess && !window.LNEPermissionCatalog.allowed(window.LNEAdminAccess, 'summary_access')) return;
        if (frame.getAttribute('src') !== 'about:blank') return;
        // La sesión compartida ya se sincronizó antes de mostrar admin-view.
        // El iframe no depende de manifiestos ni precargas.
        frame.src = '/admin/resumenes/assets/2026-10-19/index.html?integration=recovery-1';
        status.textContent = '';
        status.hidden = true;
    }
    const adminView = document.getElementById('admin-view');
    document.addEventListener('lne-admin-session-ready', event => {
        if (!event.detail.authenticated) {
            frame.src = 'about:blank';
            document.querySelectorAll('link[data-summary-resource]').forEach(link => link.remove());
            document.body.classList.remove('summary-editor-active');
        }
    });
    function syncRoute() {
        if (!adminView.hidden && location.pathname === editorPath) {
            showEditor();
            openEditor();
        }
        if (adminView.hidden) document.body.classList.remove('summary-editor-active');
    }
    new MutationObserver(syncRoute).observe(adminView, { attributes: true, attributeFilter: ['hidden'] });
    window.addEventListener('popstate', () => {
        if (location.pathname === editorPath) syncRoute();
        else if (document.body.classList.contains('summary-editor-active')) document.querySelector('[data-admin-section="legislation"]').click();
    });
    syncRoute();
})();
