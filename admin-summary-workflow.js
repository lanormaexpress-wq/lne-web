(function () {
    'use strict';
    const frame = document.getElementById('summary-editor-frame');
    let notice, publishButton;
    let current = null, destination = null, pendingId = null, boundId = null, timer, saving = null;
    let loading = false, dirty = false, canPublish = false, sequence = 0, bindingError = null;
    const clone = value => JSON.parse(JSON.stringify(value));
    const model = () => frame.contentWindow?.LNEState;
    const setNotice = (text, detail = text) => {
        if (notice) { notice.textContent = text; notice.title = detail; }
    };
    function rememberDocument(id) {
        window.LNESummaryStorage.documentLink(model()?.state.documentoId, { summaryId: id });
        if (location.pathname !== '/admin/resumenes/editor') return;
        const url = new URL(location.href); url.searchParams.set('resumen', id);
        history.replaceState(null, '', url);
    }
    async function api(path = '', options = {}) {
        const response = await fetch('/admin/resumenes/documents' + path, {
            ...options, headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin'
        });
        let data; try { data = await response.json(); } catch (_) { throw new Error('No se pudo leer la respuesta del servidor.'); }
        if (!response.ok) throw Object.assign(new Error(data.error || 'No se pudo guardar el resumen.'), { status: response.status });
        return data;
    }
    function updateActions() {
        if (publishButton) {
            publishButton.hidden = !current || !['EN_REVISION', 'PUBLICADO'].includes(current.status) || !canPublish;
            publishButton.textContent = current?.status === 'PUBLICADO' ? 'ACTUALIZAR PUBLICACIÓN' : 'PUBLICACIÓN FINAL';
            publishButton.style.display = publishButton.hidden ? 'none' : '';
        }
        document.dispatchEvent(new CustomEvent('lne-summary-workflow-change'));
    }
    function clearBinding() {
        clearTimeout(timer); current = null; destination = null; pendingId = null; dirty = false; bindingError = null;
        boundId = model()?.state.documentoId; sequence++; updateActions(); setNotice('');
    }
    function hasContent() { return Boolean(model()?.state.bloques?.length); }
    function capture() {
        if (!hasContent()) throw new Error('Añade contenido al resumen antes de guardarlo.');
        const state = clone(model().state), doc = frame.contentDocument;
        const title = String(state.metadata?.titulo || '').trim();
        if (!title) throw new Error('Escribe el título del resumen en el editor.');
        // Reuse the real read-only canvas renderer and its original CSS, never a second renderer.
        const html = frame.contentWindow.LNERenderer.compileToHTML(state);
        const styles = [...doc.styleSheets].flatMap(sheet => {
            try { return [...sheet.cssRules].map(rule => rule.cssText); } catch (_) { return []; }
        }).join('\n');
        const preview = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${styles}</style></head><body>${html}</body></html>`;
        return { title, content_lne: state, preview_html: preview, area_id: destination?.areaId || null,
            course_id: destination?.courseId || null, template_id: destination?.templateId || null };
    }
    async function save(action = 'save') {
        clearTimeout(timer);
        if (bindingError) throw bindingError;
        if (loading) throw new Error('Espera a que termine de abrirse el resumen central.');
        if (saving) { await saving; return save(action); }
        if (current?.status === 'PUBLICADO' && !canPublish) throw new Error('No tienes permiso para editar un publicado.');
        const epoch = sequence, payload = capture();
        const editorId = model().state.documentoId;
        dirty = false; setNotice('Guardando…');
        saving = (async () => {
            if (!current) {
                pendingId ||= crypto.randomUUID();
                // Persist before the first request: a reload/retry must reuse this identity.
                window.LNESummaryStorage.documentLink(editorId, { summaryId: pendingId, pending: true });
                const first = await api('', { method: 'POST', body: JSON.stringify({ ...payload, id: pendingId }) });
                if (epoch !== sequence) return;
                current = first.document; canPublish = first.canPublish; boundId = editorId;
                rememberDocument(current.id);
                // POST is idempotent; a retry may have found a previously saved version.
            }
            if (epoch !== sequence) return;
            const result = await api('/' + current.id, { method: 'PATCH', body: JSON.stringify({ ...payload, action, updated_at: current.updated_at }) });
            if (epoch !== sequence) return;
            current = result.document; canPublish = result.canPublish;
            updateActions(); setNotice('Guardado ✓', action === 'submit' ? 'Resumen enviado a revisión.' : current.status);
        })();
        let succeeded = false;
        try { await saving; succeeded = true; } catch (error) { dirty = true; setNotice('Error al guardar', error.message); throw error; }
        finally { saving = null; if (succeeded && dirty && current && sequence === epoch) schedule(); }
    }
    function schedule() {
        clearTimeout(timer);
        if (window.LNEAdminAccess && !window.LNEPermissionCatalog.allowed(window.LNEAdminAccess, 'summary_save')) return;
        if ((current?.status === 'PUBLICADO' && !canPublish) || !hasContent() || loading || bindingError) return;
        timer = setTimeout(() => { if (dirty) save().catch(error => setNotice('Error al guardar', error.message)); }, 5000);
    }
    function attach() {
        const manager = model(); if (!manager || manager.__centralWorkflowAttached) return;
        const doc = frame.contentDocument, next = doc.getElementById('lne-summary-continue');
        if (!next) return;
        const summaries = doc.createElement('button'); summaries.id = 'lne-summary-list';
        summaries.type = 'button'; summaries.className = 'btn-top'; summaries.textContent = 'RESÚMENES';
        summaries.addEventListener('click', openList); next.before(summaries);
        publishButton = doc.createElement('button'); publishButton.id = 'lne-summary-publish';
        publishButton.type = 'button'; publishButton.className = 'btn-top btn-top-primary';
        publishButton.textContent = 'PUBLICACIÓN FINAL'; publishButton.hidden = true;
        publishButton.addEventListener('click', confirmPublication); next.after(publishButton);
        notice = doc.createElement('small'); notice.id = 'lne-summary-save-status'; notice.setAttribute('role', 'status');
        notice.style.cssText = 'font:inherit;font-size:.7rem;max-width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
        doc.querySelector('.doc-meta-section').appendChild(notice);
        manager.__centralWorkflowAttached = true;
        clearBinding();
        const link = window.LNESummaryStorage.documentLink(manager.state.documentoId);
        const requested = new URLSearchParams(location.search).get('resumen') || link?.summaryId;
        if (requested) {
            // A selected document is loaded AFTER the editor is ready, never on a blank startup.
            loading = true;
            const restore = /^[a-f0-9-]{36}$/i.test(requested) ? openDocument(requested) : Promise.reject(new Error('Identidad central inválida. Abre el documento desde RESÚMENES.'));
            restore.catch(error => {
                if (error.status === 404 && link?.pending && link.summaryId === requested) {
                    pendingId = requested; dirty = hasContent();
                    setNotice('Guardado pendiente', 'Se reintentará con la misma identidad.');
                } else { bindingError = error; setNotice('No se pudo recuperar el resumen', error.message); }
            }).finally(() => { loading = false; if (dirty) schedule(); });
        }
        manager.subscribe((_state, type) => {
            if (loading) return;
            if (boundId !== manager.state.documentoId) {
                clearBinding();
                const url = new URL(location.href); url.searchParams.delete('resumen'); history.replaceState(null, '', url);
                dirty = hasContent(); schedule();
                return;
            }
            if (['select', 'select-block', 'select-blocks', 'preview', 'toggle-preview'].includes(type)) return;
            dirty = true; schedule();
        });
        // Inline typing deliberately does not notify state subscribers (avoids rebuilding the canvas).
        // Observe native events AFTER the editor's own handlers; do not wrap or change its methods.
        const inlineChanged = () => {
            if (loading || (current?.status === 'PUBLICADO' && !canPublish)) return;
            dirty = true; schedule();
        };
        doc.addEventListener('input', inlineChanged);
        doc.addEventListener('change', inlineChanged);
    }
    frame.addEventListener('load', attach); attach();
    const list = document.createElement('dialog'); list.className = 'summary-selection-dialog';
    list.innerHTML = `<header><h2>RESÚMENES</h2><button type="button" data-close aria-label="Cerrar">×</button></header>
      <nav><button data-filter="BORRADOR">BORRADORES</button> <button data-filter="EN_REVISION">EN REVISIÓN</button> <button data-filter="PUBLICADO">PUBLICADOS</button></nav>
      <p data-list-status role="status"></p><div data-documents></div><button data-more hidden>Ver más</button>`;
    document.body.appendChild(list);
    list.querySelector('[data-close]').onclick = () => list.close();
    const withdrawal = document.createElement('dialog'); withdrawal.className = 'summary-selection-dialog';
    withdrawal.innerHTML = '<h2>¿Eliminar esta publicación?</h2><p>Se retirará de la web y el documento volverá a BORRADOR. La cartilla y su imagen se conservarán.</p><p data-withdraw-status role="status"></p><button data-withdraw-cancel>Cancelar</button> <button data-withdraw-confirm>Eliminar</button>';
    document.body.appendChild(withdrawal);
    let withdrawalId = null;
    withdrawal.querySelector('[data-withdraw-cancel]').onclick = () => withdrawal.close();
    withdrawal.querySelector('[data-withdraw-confirm]').onclick = async event => {
        const id = withdrawalId; if (!id) return;
        event.target.disabled = true;
        try {
            await api('/' + id + '/publication', { method: 'DELETE' });
            if (current?.id === id) clearBinding();
            withdrawal.close(); await loadList('PUBLICADO');
            list.querySelector('[data-list-status]').textContent = 'Publicación retirada. El documento permanece como BORRADOR; cartilla e imagen conservadas.';
        } catch (error) { withdrawal.querySelector('[data-withdraw-status]').textContent = error.message; }
        finally { event.target.disabled = false; }
    };
    let listStatus = 'BORRADOR', nextOffset = null, listGeneration = 0;
    const permanent = document.createElement('dialog'); permanent.className = 'summary-selection-dialog';
    permanent.innerHTML = '<h2>¿Eliminar definitivamente este resumen?</h2><p data-delete-detail></p><p data-delete-result role="status"></p><button data-delete-cancel>Cancelar</button> <button data-delete-confirm>ELIMINAR DEFINITIVAMENTE</button>';
    document.body.appendChild(permanent);
    let deleting = null;
    permanent.querySelector('[data-delete-cancel]').onclick = () => permanent.close();
    const cleanup = document.createElement('button'); cleanup.type = 'button'; cleanup.hidden = true;
    cleanup.textContent = 'REINTENTAR LIMPIEZA DE IMÁGENES'; list.appendChild(cleanup);
    cleanup.onclick = async () => {
        cleanup.disabled = true;
        try {
            const result = await api('/cleanup', { method: 'POST', body: '{}' });
            cleanup.hidden = !result.cleanupPending;
            list.querySelector('[data-list-status]').textContent = result.warning || 'Limpieza completada correctamente.';
        } catch (error) { list.querySelector('[data-list-status]').textContent = error.message; }
        finally { cleanup.disabled = false; }
    };
    permanent.addEventListener('cancel', event => { if (permanent.querySelector('[data-delete-confirm]').disabled) event.preventDefault(); });
    permanent.querySelector('[data-delete-confirm]').onclick = async event => {
        const row = deleting; if (!row) return;
        event.target.disabled = true; permanent.querySelector('[data-delete-cancel]').disabled = true;
        clearTimeout(timer); frame.inert = true;
        try {
            if (saving) await saving;
            const result = await api('/' + row.id, { method: 'DELETE', body: JSON.stringify({ confirm: true, updated_at: row.updated_at }) });
            const activeLink = window.LNESummaryStorage.documentLink(model()?.state.documentoId);
            if (current?.id === row.id || activeLink?.summaryId === row.id || new URLSearchParams(location.search).get('resumen') === row.id) {
                // Reuse the existing reset API. A deleted active document must not
                // be resurrected by a pending autosave, undo or the next F5.
                loading = true; sequence++; clearBinding(); model()?.resetDocument();
                const url = new URL(location.href); url.searchParams.delete('resumen'); history.replaceState(null, '', url);
                loading = false; dirty = false;
            }
            deleting = null; permanent.close(); await loadList(listStatus);
            cleanup.hidden = !result.cleanupPending;
            list.querySelector('[data-list-status]').textContent = result.warning || 'Resumen eliminado definitivamente. Recursos compartidos conservados.';
        } catch (error) {
            permanent.querySelector('[data-delete-result]').textContent = error.message;
            if (dirty) schedule();
        } finally { loading = false; frame.inert = false; event.target.disabled = false; permanent.querySelector('[data-delete-cancel]').disabled = false; }
    };
    const nameOf = (collection, id) => window.LNEFormacion?.[collection]?.find(item => item.id === id)?.name || id || 'Sin seleccionar';
    async function loadList(status, offset = 0) {
        const generation = ++listGeneration;
        listStatus = status;
        const message = list.querySelector('[data-list-status]'), rows = list.querySelector('[data-documents]');
        message.textContent = 'Consultando resúmenes…';
        if (!offset) rows.replaceChildren();
        try {
            const data = await api(`?status=${status}&offset=${offset}`); canPublish = data.canPublish;
            if (generation !== listGeneration) return;
            nextOffset = data.nextOffset; list.querySelector('[data-more]').hidden = nextOffset === null;
            cleanup.hidden = true;
            if (data.canDeleteDocument) api('/cleanup').then(result => {
                if (generation === listGeneration) cleanup.hidden = !result.cleanupPending;
            }).catch(() => {});
            for (const item of data.documents) {
                const article = document.createElement('article'); article.className = 'summary-workflow-row';
                const heading = document.createElement('strong'); heading.textContent = item.title;
                const detail = document.createElement('p');
                detail.textContent = `${nameOf('areas', item.area_id)} · ${nameOf('courses', item.course_id)} · ${item.summary_templates?.name || 'Sin cartilla'} · Autor: ${item.author_label} · ${item.status} · ${new Date(item.updated_at).toLocaleString('es-PE')}`;
                if (item.status === 'PUBLICADO') detail.textContent += ` · Publicado por: ${item.published_by_label || (item.published_by === item.author_id ? item.author_label : item.published_by)} · Publicación: ${new Date(item.published_at).toLocaleString('es-PE')}`;
                const open = document.createElement('button'); open.type = 'button'; open.textContent = item.status === 'PUBLICADO' && !data.canPublish ? 'VER PUBLICADO' : 'ABRIR / EDITAR';
                open.onclick = () => openDocument(item.id).then(() => list.close()).catch(error => { message.textContent = error.message; });
                article.append(heading, detail, open);
                if (data.canDeleteDocument) {
                    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'ELIMINAR DEFINITIVAMENTE';
                    remove.onclick = () => {
                        deleting = item;
                        permanent.querySelector('[data-delete-detail]').textContent = `${item.title}. Esta acción eliminará el documento y, si corresponde, su publicación, cartilla e imagen exclusivas. Los recursos compartidos se conservarán.${item.status === 'PUBLICADO' ? ' Desaparecerá de la web pública.' : ''} No se puede deshacer.`;
                        permanent.querySelector('[data-delete-result]').textContent = ''; permanent.showModal();
                    };
                    article.append(remove);
                }
                if (item.status === 'PUBLICADO' && data.canDeletePublication) {
                    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'ELIMINAR PUBLICACIÓN';
                    remove.onclick = () => { withdrawalId = item.id; withdrawal.querySelector('[data-withdraw-status]').textContent = ''; withdrawal.showModal(); };
                    article.append(remove);
                }
                if (canPublish && item.status === 'EN_REVISION') {
                    const publish = document.createElement('button'); publish.textContent = 'PUBLICACIÓN FINAL'; publish.type = 'button';
                    publish.onclick = () => openDocument(item.id).then(() => { list.close(); confirmPublication(); }).catch(error => { message.textContent = error.message; });
                    article.appendChild(publish);
                }
                rows.appendChild(article);
            }
            message.textContent = data.documents.length ? '' : 'No hay resúmenes en este estado.';
        } catch (error) { if (generation === listGeneration) message.textContent = error.message; }
    }
    list.querySelectorAll('[data-filter]').forEach(button => { button.onclick = () => loadList(button.dataset.filter); });
    list.querySelector('[data-more]').onclick = () => loadList(listStatus, nextOffset);
    async function openList() {
        try {
            if (saving) await saving;
            if (dirty && hasContent() && (current?.status !== 'PUBLICADO' || canPublish)) await save();
            list.showModal(); loadList('BORRADOR');
        } catch (error) { setNotice('Error al guardar', error.message); }
    }
    async function openDocument(id) {
        if (saving) await saving;
        if (dirty && hasContent() && !confirm('Hay cambios sin guardar. ¿Deseas abrir otro resumen?')) return;
        clearTimeout(timer); loading = true; frame.inert = true; setNotice('Abriendo resumen…');
        try {
            const data = await api('/' + id), row = data.document;
            if (row.status !== 'PUBLICADO' && data.canEdit !== true) throw new Error('No tienes permiso para editar este resumen.');
            if (row.status === 'PUBLICADO' && data.canEdit !== true) {
                current = row; dirty = false; canPublish = data.canPublish; clearTimeout(timer);
                rememberDocument(row.id); updateActions(); setNotice('PUBLICADO · Solo lectura');
                return showPublished(row);
            }
            const manager = model(); if (!manager) throw new Error('Primero abre el editor de resúmenes.');
            manager.clearDocumentSession();
            manager.state = clone(row.content_lne);
            manager.state.selectedBlockId ??= null;
            manager.notify('load-central');
            boundId = manager.state.documentoId;
            frame.contentDocument.getElementById('doc-title-input').value = manager.state.metadata.titulo;
            current = row; pendingId = row.id; canPublish = data.canPublish; bindingError = null;
            rememberDocument(row.id);
            destination = row.template_id ? { areaId: row.area_id, courseId: row.course_id, templateId: row.template_id, templateName: row.summary_templates?.name } : null;
            dirty = false; sequence++; updateActions(); setNotice('Guardado ✓', 'Recuperado · ' + row.status);
        } finally { loading = false; frame.inert = false; }
    }
    const confirmation = document.createElement('dialog'); confirmation.className = 'summary-selection-dialog';
    confirmation.innerHTML = '<h2>PUBLICAR RESUMEN</h2><pre data-destination></pre><p data-result role="status"></p><button data-cancel>Cancelar</button> <button data-confirm>PUBLICAR</button>';
    document.body.appendChild(confirmation);
    confirmation.querySelector('[data-cancel]').onclick = () => confirmation.close();
    async function confirmPublication() {
        try {
            if (dirty) await save();
            if (!current || !['EN_REVISION', 'PUBLICADO'].includes(current.status) || !canPublish) throw new Error('Publicación final no disponible.');
            const updating = current.status === 'PUBLICADO';
            confirmation.querySelector('h2').textContent = updating ? 'ACTUALIZAR PUBLICACIÓN' : 'PUBLICAR RESUMEN';
            confirmation.querySelector('[data-confirm]').textContent = updating ? 'ACTUALIZAR PUBLICACIÓN' : 'PUBLICAR';
            confirmation.querySelector('[data-destination]').textContent = `Título: ${current.title}\nÁrea: ${nameOf('areas', current.area_id)}\nCurso: ${nameOf('courses', current.course_id)}\nCartilla: ${destination?.templateName || current.template_id}\nAutor: ${current.author_label}`;
            confirmation.querySelector('[data-result]').textContent = ''; confirmation.showModal();
        } catch (error) { setNotice(error.message); }
    }
    confirmation.querySelector('[data-confirm]').onclick = async event => {
        event.target.disabled = true;
        frame.inert = true;
        try {
            if (saving) await saving;
            await save();
            const updating = current.status === 'PUBLICADO';
            const result = await api('/' + current.id, { method: 'PATCH', body: JSON.stringify({ action: updating ? 'update-publication' : 'publish', updated_at: current.updated_at }) });
            current = result.document; clearTimeout(timer); dirty = false; updateActions();
            confirmation.close(); setNotice(updating ? 'Publicación actualizada ✓' : 'Publicado ✓', 'El contenido público se guardó correctamente.');
            showPublished(current);
        } catch (error) { confirmation.querySelector('[data-result]').textContent = error.message; }
        finally { event.target.disabled = false; frame.inert = false; }
    };
    function showPublished(row) {
        const dialog = document.createElement('dialog'); dialog.className = 'summary-selection-dialog';
        dialog.addEventListener('close', () => dialog.remove(), { once: true });
        const close = document.createElement('button'); close.textContent = 'Cerrar'; close.onclick = () => { dialog.close(); dialog.remove(); };
        const iframe = document.createElement('iframe'); iframe.title = row.title; iframe.setAttribute('sandbox', '');
        iframe.style.cssText = 'width:100%;height:70vh;border:0'; iframe.srcdoc = safePreview(row.preview_html);
        dialog.append(close, iframe); document.body.appendChild(dialog); dialog.showModal();
    }
    function safePreview(html) {
        return `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline' https:; font-src https: data:;">` + html;
    }
    document.addEventListener('lne-admin-session-ready', event => { if (!event.detail.authenticated) { clearBinding(); list.close(); confirmation.close(); withdrawal.close(); permanent.close(); withdrawalId = null; deleting = null; } });
    window.addEventListener('beforeunload', event => { if (saving || (dirty && hasContent() && (current?.status !== 'PUBLICADO' || canPublish))) { event.preventDefault(); event.returnValue = ''; } });
    window.LNESummaryWorkflow = Object.freeze({ save, hasContent, getDestination: () => destination,
        selectDestination(value) { destination = value; dirty = true; schedule(); }, getDocument: () => current });
})();
