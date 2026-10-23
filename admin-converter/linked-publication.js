(function () {
  'use strict';
  if (window.__LNE_LEGISLATION_MODE__) return;

  const dialog = document.createElement('dialog');
  dialog.id = 'linkedPublicationDialog';
  dialog.className = 'linked-publication-dialog';
  dialog.innerHTML = `
    <form method="dialog" class="linked-publication-shell">
      <header>
        <div><p class="eyebrow">PUBLICACIÓN VINCULADA</p><h2>Selecciona la legislación donde deseas publicar</h2></div>
        <button type="button" data-linked-close aria-label="Cerrar">×</button>
      </header>
      <p class="linked-publication-help">Selecciona una legislación pública sin contenido o crea una nueva con la información ya revisada.</p>
      <div class="linked-publication-state" role="status" aria-live="polite"></div>
      <div class="linked-publication-targets"></div>
      <footer>
        <span></span>
        <button type="button" data-linked-cancel>Cancelar</button>
        <button type="button" class="primary" data-linked-confirm disabled>Publicar</button>
      </footer>
    </form>`;
  document.body.appendChild(dialog);

  const targets = dialog.querySelector('.linked-publication-targets');
  const state = dialog.querySelector('.linked-publication-state');
  const confirm = dialog.querySelector('[data-linked-confirm]');
  let selectedTarget = null;
  let newLegislationNameField = null;
  let newLegislationNameInput = null;

  async function authenticatedFetch(path, options = {}) {
    if (!window.__LNE_ADMIN_TOKEN__) {
      window.parent?.postMessage({ type: 'lne-converter-request-auth' }, window.location.origin);
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('No se recibió la sesión administrativa.')), 10000);
        window.addEventListener('lne-admin-auth-ready', () => { clearTimeout(timeout); resolve(); }, { once: true });
      });
    }
    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${window.__LNE_ADMIN_TOKEN__}`);
    if (!(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
    return fetch(path, { ...options, headers });
  }

  async function responseJson(response, fallbackMessage) {
    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(fallbackMessage || 'La API de publicación no está disponible. Recarga el administrador después de reiniciar el servidor.');
    }
    try {
      return text ? JSON.parse(text) : {};
    } catch (_error) {
      throw new Error(fallbackMessage || 'La API de publicación devolvió una respuesta inválida.');
    }
  }

  function renderTargets(items) {
    targets.replaceChildren();
    selectedTarget = null;
    newLegislationNameField = null;
    newLegislationNameInput = null;
    confirm.disabled = true;
    state.textContent = items.length
      ? `${items.length} legislación${items.length === 1 ? '' : 'es'} existente${items.length === 1 ? '' : 's'} disponible${items.length === 1 ? '' : 's'}.`
      : 'No hay legislaciones existentes vacías. Puedes crear una nueva legislación.';
    const destinations = [...items, { codigo: '__new__', nombre: 'Crear nueva legislación', slug: '', isNew: true }];
    destinations.forEach(item => {
      const label = document.createElement('label');
      label.className = 'linked-publication-target';
      const input = document.createElement('input');
      const title = document.createElement('strong');
      const detail = document.createElement('small');
      input.type = 'radio';
      input.name = 'linkedPublicationTarget';
      input.value = item.codigo;
      title.textContent = item.nombre;
      detail.textContent = item.isNew ? 'Usar nombre, introducción, imagen y contenido revisados' : `/legislacion/${item.slug}`;
      input.addEventListener('change', () => {
        selectedTarget = item;
        if (newLegislationNameField) newLegislationNameField.hidden = !item.isNew;
        confirm.disabled = false;
      });
      label.append(input, title, detail);
      if (item.isNew) {
        newLegislationNameField = document.createElement('div');
        newLegislationNameField.hidden = true;
        const fieldLabel = document.createElement('span');
        newLegislationNameInput = document.createElement('input');
        fieldLabel.textContent = 'Nombre de la nueva legislación';
        newLegislationNameInput.type = 'text';
        newLegislationNameInput.placeholder = 'Escribe aquí el nombre de la norma...';
        newLegislationNameInput.autocomplete = 'off';
        newLegislationNameField.append(fieldLabel, newLegislationNameInput);
        label.appendChild(newLegislationNameField);
      }
      targets.appendChild(label);
    });
  }

  async function open() {
    collectPreviewEdits();
    if (!lastPreviewData.length) {
      setProjectStatus('No hay contenido jurídico para publicar.', 'warn');
      return;
    }
    state.textContent = 'Consultando legislaciones públicas…';
    state.classList.remove('error');
    targets.replaceChildren();
    confirm.disabled = true;
    dialog.showModal();
    try {
      const response = await authenticatedFetch('/api/admin/publication-targets');
      const body = await responseJson(response, 'No se pudo conectar con la API de selección de legislación. Recarga el administrador después de reiniciar el servidor.');
      if (!response.ok) throw new Error(body.error || 'No se pudo consultar el catálogo público.');
      renderTargets(body.targets || []);
    } catch (error) {
      state.textContent = error.message;
      state.classList.add('error');
    }
  }

  async function publish() {
    if (!selectedTarget) return;
    collectPreviewEdits();
    const articles = publicationArticles();
    if (!articles.length) return;
    confirm.disabled = true;
    const publicationTrigger = document.getElementById('finalizeLinkedPublicationBtn');
    if (publicationTrigger) publicationTrigger.disabled = true;
    state.classList.remove('error');
    if (selectedTarget.isNew) {
      try {
        const newLegislationName = newLegislationNameInput?.value.trim() || '';
        if (!newLegislationName) throw new Error('Escribe el nombre de la nueva legislación.');
        publicationNormName.value = newLegislationName;
        publicationNormCode.value = publicationSlug(newLegislationName);
        publicationImageTitle.textContent = newLegislationName;
        preparePublication();
        publicationRequestId = preparedPublication.requestId;
        dialog.close();
        publicationError.textContent = 'Publicando documento…';
        window.parent.postMessage(preparedPublication, window.location.origin);
      } catch (error) {
        state.textContent = error.message;
        state.classList.add('error');
        confirm.disabled = false;
        if (publicationTrigger) publicationTrigger.disabled = false;
      }
      return;
    }
    state.textContent = `Publicando ${articles.length} artículo${articles.length === 1 ? '' : 's'} en ${selectedTarget.nombre}…`;
    try {
      const response = await authenticatedFetch('/api/admin/publish-linked-legislation', {
        method: 'POST',
        body: JSON.stringify({ destination: 'existing', codigo: selectedTarget.codigo, articles })
      });
      const body = await responseJson(response, 'No se pudo conectar con la API de publicación. Tu proyecto temporal permanece guardado.');
      if (!response.ok) throw new Error(body.error || 'No se pudo completar la publicación.');
      if (currentProjectId) await window.LNEProjectStore.removeAfterPublication(currentProjectId);
      currentProjectId = null;
      updateProjectSummary(null);
      dialog.close();
      setProjectStatus(`✓ ${body.articleCount} artículos publicados correctamente en ${body.nombre}`, 'ok');
    } catch (error) {
      state.textContent = `${error.message} Tu proyecto temporal permanece guardado.`;
      state.classList.add('error');
      confirm.disabled = false;
    } finally {
      if (publicationTrigger) publicationTrigger.disabled = false;
    }
  }

  document.addEventListener('lne-finalize-publication', open);
  confirm.addEventListener('click', publish);
  dialog.querySelector('[data-linked-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-linked-cancel]').addEventListener('click', () => dialog.close());
})();
