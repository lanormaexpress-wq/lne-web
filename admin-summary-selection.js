(function () {
    'use strict';
    const modal = document.createElement('dialog');
    modal.className = 'summary-selection-dialog';
    modal.innerHTML = `<form method="dialog"><header><h2>Continuar hacia Formación Jurídica</h2><button value="close" aria-label="Cerrar">×</button></header>
      <label>1. Área<select data-area><option value="">Selecciona un área</option></select></label>
      <label>2. Curso<select data-course disabled><option value="">Selecciona un curso</option></select></label>
      <section><h3>3. Cartilla</h3><p>Los temas históricos del curso se muestran como referencia. Selecciona una cartilla administrable debajo.</p><div data-templates class="summary-template-grid"></div></section>
      <button type="button" data-add hidden>+ AÑADIR CARTILLA</button>
      <section data-managed></section>
      <output data-summary></output><p data-status role="status"></p>
      <footer><button value="cancel">Cancelar</button><button type="button" data-submit-review disabled>ENVIAR A REVISIÓN</button></footer><p>Enviar a revisión guarda el resumen. No lo publica en la web.</p></form>`;
    document.body.appendChild(modal);
    const area = modal.querySelector('[data-area]'), course = modal.querySelector('[data-course]'), cards = modal.querySelector('[data-templates]');
    const summary = modal.querySelector('[data-summary]'), status = modal.querySelector('[data-status]');
    const add = modal.querySelector('[data-add]');
    const submit = modal.querySelector('[data-submit-review]');
    let catalog, selected = null, manager, submitting = false;
    const option = (value, text) => new Option(text, value);
    function showSelection(template) {
        selected = { areaId: area.value, courseId: course.value, templateId: template.id, templateName: template.name, localProposal: Boolean(template.localProposal) };
        window.LNESummaryWorkflow?.selectDestination(selected);
        updateSubmit();
        summary.textContent = `Área: ${catalog.areas.find(x => x.id === area.value).name}\nCurso: ${catalog.courses.find(x => x.id === course.value).name}\nCartilla: ${template.name}${template.localProposal ? ' (propuesta local)' : ''}`;
    }
    async function openSelection() {
        modal.showModal(); status.textContent = 'Consultando Formación Jurídica…';
        area.disabled = true; course.disabled = true;
        try {
            const response = await fetch('/admin/resumenes/catalog');
            if (!response.ok) throw new Error('No se pudo consultar el catálogo. Vuelve a abrir el editor desde el administrador.');
            catalog = await response.json();
            if (!manager) {
                const { mountTemplateManager } = await import('/admin-summary-templates.js?v=2');
                manager = mountTemplateManager({modal,getCourse:()=>catalog.courses.find(c=>c.id===course.value),onSelect:showSelection});
            }
            manager.setPermission(catalog.canAddTemplate, catalog.canManageTemplates);
            manager.reset();
            area.replaceChildren(option('', 'Selecciona un área'), ...catalog.areas.map(x => option(x.id, x.name)));
            area.disabled = false;
            course.replaceChildren(option('', 'Selecciona un curso')); course.disabled = true;
            cards.replaceChildren(); summary.textContent = ''; selected = null; add.hidden = true; submit.disabled = true;
            status.textContent = '';
            const previous = window.LNESummaryWorkflow?.getDestination();
            if (previous) {
                area.value = previous.areaId; area.dispatchEvent(new Event('change'));
                course.value = previous.courseId; course.dispatchEvent(new Event('change'));
                selected = previous;
                summary.textContent = `Destino guardado: ${previous.templateName || previous.templateId}`;
                updateSubmit();
            }
        } catch (error) { status.textContent = error.message; }
    }
    area.addEventListener('change', () => {
        course.replaceChildren(option('', 'Selecciona un curso'), ...catalog.courses.filter(x => x.area === area.value).map(x => option(x.id, x.name)));
        course.disabled = !area.value; cards.replaceChildren(); summary.textContent = ''; selected = null; add.hidden = true; manager?.reset(); submit.disabled = true;
    });
    course.addEventListener('change', () => {
        cards.replaceChildren(); summary.textContent = ''; selected = null; submit.disabled = true;
        const item = catalog.courses.find(x => x.id === course.value);
        add.hidden = !item || !catalog.canAddTemplate;
        manager?.load();
        if (!item) return;
        if (!item.templates.length) status.textContent = 'Este curso aún no tiene tarjetas de temas o cartillas registradas.';
        else status.textContent = 'Los temas con contenido se muestran para referencia; no se sobrescriben.';
        [...item.templates].sort((a,b) => Number(a.hasContent) - Number(b.hasContent)).forEach(template => {
            const button = document.createElement('button');
            button.type = 'button'; button.disabled = true;
            const title = document.createElement('strong'), detail = document.createElement('span');
            title.textContent = template.name;
            detail.textContent = template.hasContent ? 'Contenido existente · capacidad sin definir' : 'Sin contenido · capacidad pendiente de definir';
            if (template.image) { const image = document.createElement('img'); image.src = new URL(template.image, location.origin + '/').href; image.alt = ''; image.loading = 'lazy'; button.appendChild(image); }
            button.append(title, detail); button.addEventListener('click', () => showSelection(template)); cards.appendChild(button);
        });
    });
    submit.addEventListener('click', async () => {
        if (submit.disabled) return;
        submitting = true; submit.disabled = true; status.textContent = 'Guardando y enviando a revisión…';
        try {
            window.LNESummaryWorkflow.selectDestination(selected);
            await window.LNESummaryWorkflow.save('submit');
            status.textContent = 'Resumen enviado a revisión.';
        } catch (error) { status.textContent = error.message; }
        finally { submitting = false; updateSubmit(); }
    });
    function updateSubmit() {
        const central = window.LNESummaryWorkflow?.getDocument();
        const permitted = !window.LNEAdminAccess || window.LNEPermissionCatalog.allowed(window.LNEAdminAccess, 'summary_submit_review');
        submit.disabled = !permitted || submitting || !selected || !central || central.status === 'PUBLICADO' || !window.LNESummaryWorkflow?.hasContent();
    }
    document.addEventListener('lne-summary-workflow-change', updateSubmit);
    window.LNESummarySelection = Object.freeze({ open: openSelection });
})();
