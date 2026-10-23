(function () {
    'use strict';
    const MARKER = 'lne-editor:session-context';
    const DRAFT = 'LNE_EDITOR_AUTOSAVE_DRAFT', LIBRARY = 'LNE_EDITOR_DOCUMENTS_V1';
    function read() { try { return JSON.parse(sessionStorage.getItem(MARKER)) || null; } catch (_) { return null; } }
    const same = (a, b) => Boolean(a && b && a.userId === b.userId && a.sessionId === b.sessionId);
    function forgetUrl() {
        const url = new URL(location.href);
        if (url.searchParams.has('resumen')) { url.searchParams.delete('resumen'); history.replaceState(null, '', url); }
    }
    function prepare(scope) {
        if (!scope?.userId || !scope?.sessionId) throw new Error('Falta identificar la sesión del editor.');
        const previous = read(), continuing = same(previous, scope);
        const context = continuing ? previous : { userId: scope.userId, sessionId: scope.sessionId, epoch: crypto.randomUUID() };
        if (!continuing) forgetUrl();
        sessionStorage.setItem(MARKER, JSON.stringify(context));
        return { context, changed: Boolean(previous && !continuing), fresh: !continuing };
    }
    function end() {
        // Clear the ACTIVE reference, not saved local libraries, snapshots or central documents.
        sessionStorage.removeItem(MARKER); forgetUrl();
    }
    const prefix = context => `lne-editor:${context.userId}:`;
    const draftKey = context => `${prefix(context)}${context.sessionId}:${context.epoch}:active-document`;
    function documentLink(editorId, value) {
        const context = read();
        if (!context || !editorId) return null;
        const key = `${draftKey(context)}:central:${encodeURIComponent(editorId)}`;
        if (value) sessionStorage.setItem(key, JSON.stringify({ editorId, summaryId: value.summaryId, pending: Boolean(value.pending) }));
        try { const link = JSON.parse(sessionStorage.getItem(key)); return link?.editorId === editorId ? link : null; } catch (_) { return null; }
    }
    function install(scope) {
        let context = read();
        // A stale iframe response must never overwrite another account's context.
        if (!same(context, scope)) {
            context = window.parent !== window && window.parent.LNESummaryStorage?.current()
                ? { ...scope, epoch: 'inactive-stale-response' } : prepare(scope).context;
        }
        const native = window.localStorage;
        const keyOf = key => key === DRAFT ? draftKey(context) : key === LIBRARY ? prefix(context) + 'documents' : key;
        const current = () => { const value = read(); return same(value, context) && value.epoch === context.epoch; };
        const facade = new Proxy(native, {
            get(target, property) {
                if (property === 'getItem') return key => current() ? target.getItem(keyOf(String(key))) : null;
                if (property === 'setItem') return (key, value) => { if (current()) target.setItem(keyOf(String(key)), String(value)); };
                if (property === 'removeItem') return key => { if (current()) target.removeItem(keyOf(String(key))); };
                if (property === 'clear') return () => { if (current()) { target.removeItem(keyOf(DRAFT)); target.removeItem(keyOf(LIBRARY)); } };
                const value = Reflect.get(target, property, target);
                return typeof value === 'function' ? value.bind(target) : value;
            }
        });
        // Adapter in the authenticated editor realm only; original editor files and APIs are unchanged.
        Object.defineProperty(window, 'localStorage', { configurable: true, value: facade });
    }
    window.LNESummaryStorage = Object.freeze({ prepare, end, install, current: read, draftKey, documentLink });
})();
