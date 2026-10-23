(function () {
    'use strict';
    const TYPES = ['titulo', 'subtitulo', 'capitulo', 'subcapitulo', 'parrafo', 'inciso', 'subinciso', 'lista', 'separacion'];
    let root = null;
    let visualRoot = null;
    let onChange = () => {};
    let dragged = null;
    let visualMode = true;
    let visualInputHandler = null;

    function cleanInline(html) {
        const template = document.createElement('template');
        template.innerHTML = html || '';
        template.content.querySelectorAll('*').forEach(node => {
            if (!['B', 'STRONG', 'I', 'EM', 'S', 'STRIKE', 'DEL', 'BR'].includes(node.tagName)) node.replaceWith(...node.childNodes);
            else Array.from(node.attributes).forEach(attribute => node.removeAttribute(attribute.name));
        });
        return template.innerHTML;
    }

    function block(type = 'parrafo', html = '', marker = '') {
        return { id: crypto.randomUUID(), tipo: TYPES.includes(type) ? type : 'parrafo', html: cleanInline(html), marcador: marker || '' };
    }

    function inferBlocks(html) {
        const parsed = new DOMParser().parseFromString(`<main>${html || ''}</main>`, 'text/html');
        const main = parsed.querySelector('main');
        const blocks = [];
        Array.from(main.children).forEach(node => {
            if (node.tagName === 'HR') { blocks.push(block('separacion')); return; }
            const markerNode = node.querySelector('[data-lne-marker]');
            const marker = markerNode?.textContent?.trim() || '';
            if (markerNode) markerNode.remove();
            let type = 'parrafo';
            if (/^\d+[.)]$/.test(marker)) type = 'inciso';
            else if (/^[a-záéíóúñ]+[.)]$/i.test(marker)) type = 'subinciso';
            else if (node.dataset.lneStructure === 'capitulo') type = 'capitulo';
            else if (node.dataset.lneStructure === 'subcapitulo') type = 'subcapitulo';
            else if (/^(H1|H2|H3)$/.test(node.tagName)) type = node.tagName === 'H1' ? 'titulo' : 'subtitulo';
            else if (node.querySelector('li') || node.tagName === 'UL' || node.tagName === 'OL') type = 'lista';
            const contentNode = node.querySelector(':scope > div') || node;
            const content = type === 'lista'
                ? Array.from(node.querySelectorAll('li')).map(item => item.innerHTML).join('<br>')
                : contentNode.innerHTML;
            if (content.trim() || type === 'separacion') blocks.push(block(type, content, marker));
        });
        if (!blocks.length && (main.textContent || '').trim()) blocks.push(block('parrafo', main.innerHTML));
        return blocks.length ? blocks : [block()];
    }

    function load(article) {
        const stored = article?.contenido_lne?.bloques;
        const blocks = Array.isArray(stored) && stored.length
            ? stored.map(item => block(item.tipo, item.html || item.texto || '', item.marcador))
            : inferBlocks(article?.contenido || '');
        render(blocks);
        renderVisual();
    }

    function createElement(data) {
        const item = document.createElement('article');
        item.className = `legal-block legal-block-${data.tipo}`;
        item.dataset.id = data.id;
        item.dataset.type = data.tipo;
        item.draggable = true;
        item.innerHTML = `<button type="button" class="block-drag" title="Arrastrar"><i class="fa-solid fa-grip-vertical"></i></button>
            <select class="block-type" aria-label="Tipo de bloque">${TYPES.map(type => `<option value="${type}"${type === data.tipo ? ' selected' : ''}>${type.charAt(0).toUpperCase() + type.slice(1)}</option>`).join('')}</select>
            <input class="block-marker" aria-label="Marcador" value="${String(data.marcador || '').replace(/"/g, '&quot;')}" placeholder="1.">
            <div class="block-content" contenteditable="true" data-placeholder="Escribe el contenido…">${cleanInline(data.html)}</div>
            <div class="block-actions"><button type="button" data-block-action="duplicate" title="Duplicar"><i class="fa-regular fa-copy"></i></button><button type="button" data-block-action="delete" title="Eliminar"><i class="fa-regular fa-trash-can"></i></button></div>`;
        if (data.tipo === 'separacion') item.querySelector('.block-content').innerHTML = '<hr>';
        updateAppearance(item);
        return item;
    }

    function updateAppearance(item) {
        const type = item.dataset.type;
        item.className = `legal-block legal-block-${type}`;
        item.querySelector('.block-marker').hidden = !['inciso', 'subinciso'].includes(type);
        item.querySelector('.block-content').contentEditable = type === 'separacion' ? 'false' : 'true';
        if (type === 'separacion') item.querySelector('.block-content').innerHTML = '<hr>';
    }

    function render(blocks) { root.replaceChildren(...blocks.map(createElement)); }
    function renderVisual() {
        if (visualRoot) visualRoot.innerHTML = htmlFromBlocks(getBlocks());
    }
    function commitVisual() {
        if (!visualRoot || !visualMode) return;
        render(inferBlocks(visualRoot.innerHTML));
    }
    function setMode(mode) {
        const nextVisual = mode === 'visual';
        if (visualMode && !nextVisual) commitVisual();
        visualMode = nextVisual;
        if (visualMode) renderVisual();
    }
    function add(type, after) {
        const item = createElement(block(type, '', type === 'inciso' ? `${nextIndex('inciso')}.` : type === 'subinciso' ? `${String.fromCharCode(96 + nextIndex('subinciso'))})` : ''));
        after?.after(item) || root.append(item);
        item.querySelector('.block-content').focus();
        changed();
    }
    function nextIndex(type) { return root.querySelectorAll(`[data-type="${type}"]`).length + 1; }
    function changed() { onChange(getBlocks()); }

    function getBlocks() {
        return Array.from(root.querySelectorAll('.legal-block')).map(item => ({
            tipo: item.dataset.type,
            marcador: item.querySelector('.block-marker').value.trim() || null,
            html: item.dataset.type === 'separacion' ? '' : cleanInline(item.querySelector('.block-content').innerHTML)
        }));
    }

    function htmlFromBlocks(blocks) {
        return blocks.map(item => {
            const html = cleanInline(item.html);
            if (item.tipo === 'separacion') return '<hr style="border:0;border-top:1px solid #eee;margin:20px 0;">';
            if (item.tipo === 'titulo') return `<h2 style="text-align:center;font-weight:bold;text-transform:uppercase;margin:30px 0 15px;color:#1b263b;">${html}</h2>`;
            if (item.tipo === 'subtitulo') return `<h3 style="text-align:center;font-weight:bold;margin:20px 0 15px;color:#1b263b;">${html}</h3>`;
            if (item.tipo === 'capitulo') return `<h2 data-lne-structure="capitulo" style="text-align:center;font-weight:bold;text-transform:uppercase;margin:30px 0 15px;color:#1b263b;">${html}</h2>`;
            if (item.tipo === 'subcapitulo') return `<h3 data-lne-structure="subcapitulo" style="text-align:center;font-weight:bold;margin:20px 0 15px;color:#1b263b;">${html}</h3>`;
            if (item.tipo === 'lista') return `<ul style="margin:0 0 12px 25px;line-height:1.5;">${html.split(/<br\s*\/?>/i).filter(Boolean).map(line => `<li>${line}</li>`).join('')}</ul>`;
            if (item.tipo === 'inciso' || item.tipo === 'subinciso') {
                const level = item.tipo === 'subinciso' ? 1 : 0;
                const kind = item.tipo === 'subinciso' ? 'letter' : 'number';
                const margin = level ? 'margin-left:35px;' : '';
                return `<div data-lne-list="1" data-lne-level="${level}" data-lne-kind="${kind}" style="display:flex;margin-bottom:10px;${margin}line-height:1.5;text-align:justify;"><span data-lne-marker="1" style="min-width:35px;flex:0 0 35px;">${escapeHtml(item.marcador || '')}</span><div>${html}</div></div>`;
            }
            return `<div style="margin-bottom:10px;text-align:justify;line-height:1.5;">${html}</div>`;
        }).join('\n');
    }

    function escapeHtml(value) { return String(value).replace(/[&<>]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[char])); }
    function buildArticle(number, title, existingLne, existingStructure) {
        commitVisual();
        const blocks = getBlocks();
        const html = htmlFromBlocks(blocks);
        return {
            contenido: html,
            contenido_lne: { ...(existingLne && typeof existingLne === 'object' ? existingLne : {}), tipo: existingLne?.tipo || 'Artículo', numero: number, titulo: title || null, texto: html, bloques },
            estructura: { ...(existingStructure && typeof existingStructure === 'object' ? existingStructure : {}), editor_visual: { version: 1, bloques: blocks.length } }
        };
    }

    function mount(element, callback) {
        root = element; onChange = callback || (() => {});
        root.addEventListener('input', changed);
        root.addEventListener('change', event => {
            if (event.target.matches('.block-type')) { const item = event.target.closest('.legal-block'); item.dataset.type = event.target.value; updateAppearance(item); changed(); }
        });
        root.addEventListener('click', event => {
            const button = event.target.closest('[data-block-action]'); if (!button) return;
            const item = button.closest('.legal-block');
            if (button.dataset.blockAction === 'duplicate') item.after(createElement({ ...getBlocks()[Array.from(root.children).indexOf(item)], id: crypto.randomUUID() }));
            if (button.dataset.blockAction === 'delete' && root.children.length > 1) item.remove();
            changed();
        });
        root.addEventListener('keydown', event => {
            if (event.key !== 'Enter' || event.shiftKey || !event.target.matches('.block-content')) return;
            event.preventDefault(); add(event.target.closest('.legal-block').dataset.type === 'separacion' ? 'parrafo' : event.target.closest('.legal-block').dataset.type, event.target.closest('.legal-block'));
        });
        root.addEventListener('dragstart', event => { dragged = event.target.closest('.legal-block'); if (dragged) dragged.classList.add('dragging'); });
        root.addEventListener('dragend', () => { dragged?.classList.remove('dragging'); dragged = null; changed(); });
        root.addEventListener('dragover', event => { event.preventDefault(); const target = event.target.closest('.legal-block'); if (dragged && target && target !== dragged) { const rect = target.getBoundingClientRect(); target.parentNode.insertBefore(dragged, event.clientY < rect.top + rect.height / 2 ? target : target.nextSibling); } });
    }

    function bindVisual(element) {
        if (visualRoot && visualInputHandler) visualRoot.removeEventListener('input', visualInputHandler);
        visualRoot = element;
        visualInputHandler = () => onChange();
        visualRoot.addEventListener('input', visualInputHandler);
    }

    function addBlock(type) { add(type); }
    function format(command) { document.execCommand(command, false); changed(); }
    function removeBoxes() {
        if (!visualRoot) return;
        visualRoot.querySelectorAll('table,fieldset,.cuadro,[data-lne-box]').forEach(node => node.replaceWith(...node.childNodes));
        onChange();
    }
    window.LNEBlockEditor = Object.freeze({ mount, bindVisual, setMode, load, addBlock, format, removeBoxes, getBlocks, buildArticle, htmlFromBlocks });
})();
