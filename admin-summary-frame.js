(function () {
    'use strict';
    const originalAlert = window.alert.bind(window);
    window.alert = function (message) {
        const text = String(message);
        if (!text.startsWith('Revisa la importación:')) return originalAlert(message);
        // Solo observaciones posteriores a una importación correcta; los errores mantienen su aviso.
        window.parent.postMessage({ type: 'lne-summary-import-observations', details: text }, location.origin);
    };
})();
