/**
 * CANVAS.JS - Motor del Lienzo de Hoja Vertical Continua
 * Renderiza los bloques en pantalla, maneja arrastrar y soltar (Drag and Drop),
 * edición inline, barras de herramientas contextuales de imágenes y tablas.
 */

window.LNECanvas = (function () {
    let sheetContainer = null;
    let draggedBlockId = null;

    function init() {
        sheetContainer = document.getElementById('document-sheet');
        sheetContainer.classList.add('lne-rendered-sheet');
        window.LNEState.subscribe((state, changeType) => {
            if (['set-document','reset','load-storage'].includes(changeType)) { draggedBlockId=null;clearDropIndicators();clearGuides(); }
            if (changeType === 'select-block' || changeType === 'select-blocks') updateSelection(state);
            else render(state);
        });

        // Eventos globales de Drag and Drop sobre el lienzo
        sheetContainer.addEventListener('dragover', handleDragOver);
        sheetContainer.addEventListener('dragleave', handleDragLeave);
        sheetContainer.addEventListener('drop', handleDrop);
        sheetContainer.addEventListener('pointerdown', handleBehindImageSelection);
        document.addEventListener('click', e => {
            if (!e.target.closest('.block-insert-gap')) closeInsertMenus();
        });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeInsertMenus(); });
    }

    function render(state) {
        if (!sheetContainer) return;
        document.body.classList.toggle('selection-mode',window.LNEState.selectionMode);

        const isPreview = state.previewMode;
        const editableAttr = isPreview ? '' : 'contenteditable="true"';
        const meta = state.metadata || {};
        const cursoVal = meta.curso || 'Formación Jurídica';
        const temaNumVal = meta.temaNumero || '1';
        const tituloVal = meta.titulo || 'Título del Tema';
        const autorVal = meta.autor || 'La Norma Express';

        // Sincronizar título en la barra superior si el usuario no está escribiendo en él
        const titleInput = document.getElementById('doc-title-input');
        if (titleInput && document.activeElement !== titleInput) {
            titleInput.value = tituloVal;
        }

        sheetContainer.innerHTML = '';

        // 1. Renderizado de Cabecera Editorial Institucional
        const headerEl = document.createElement('header');
        headerEl.className = 'lne-editorial-header';
        headerEl.innerHTML = `
            <div class="lne-meta-topline">
                <div class="lne-meta-curso-wrapper">
                    <span class="lne-meta-tag-label">CURSO:</span>
                    <span class="lne-meta-editable-field lne-meta-curso" ${editableAttr} data-meta-field="curso" title="Clic para editar el nombre del curso">${escapeHtml(cursoVal)}</span>
                </div>
                <div class="lne-meta-badge-tema">
                    <span class="lne-badge-tema-label">TEMA N.°</span>
                    <span class="lne-meta-editable-field lne-meta-num" ${editableAttr} data-meta-field="temaNumero" title="Clic para editar el número de tema">${escapeHtml(temaNumVal)}</span>
                </div>
            </div>
            <h1 class="lne-editorial-title lne-meta-editable-field" ${editableAttr} data-meta-field="titulo" title="Clic para editar el título principal">${escapeHtml(tituloVal)}</h1>
            <div class="lne-header-divider"></div>
        `;
        sheetContainer.appendChild(headerEl);

        // 2. Renderizado de Contenido / Bloques
        if (state.bloques.length === 0) {
            if (isPreview) {
                const emptyNotice = document.createElement('div');
                emptyNotice.style.cssText = 'text-align:center; padding: 40px; color: #94a3b8; font-style: italic;';
                emptyNotice.textContent = 'Este material aún no contiene bloques de texto.';
                sheetContainer.appendChild(emptyNotice);
            } else {
                const cleanStateEl = document.createElement('div');
                cleanStateEl.className = 'document-clean-state';
                cleanStateEl.innerHTML = `
                    <i class="fa-solid fa-feather-pointed" style="font-size: 2.8rem; color: #cbd5e1; margin-bottom: 16px;"></i>
                    <h3>Documento en Blanco</h3>
                    <p>Comienza desde cero o importa un Word para convertirlo en material LNE editable.</p>
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn-top btn-top-primary" data-empty-action="write"><i class="fa-solid fa-paragraph"></i> Comenzar a escribir</button>
                        <button class="btn-top" data-empty-action="title"><i class="fa-solid fa-heading"></i> Agregar título</button>
                        <button class="btn-top btn-top-word" onclick="document.getElementById('hidden-word-input') && document.getElementById('hidden-word-input').click()">
                            <i class="fa-solid fa-file-word"></i> Importar Word (.docx)
                        </button>
                        <button class="btn-top" data-empty-action="image"><i class="fa-solid fa-image"></i> Insertar imagen</button>
                    </div>
                `;
                cleanStateEl.querySelector('[data-empty-action="write"]')?.addEventListener('click', () => addEmptyBlockAndFocus('parrafo', ['']));
                cleanStateEl.querySelector('[data-empty-action="title"]')?.addEventListener('click', () => addEmptyBlockAndFocus('titulo', [1, '']));
                cleanStateEl.querySelector('[data-empty-action="image"]')?.addEventListener('click', () => document.getElementById('hidden-image-input')?.click());
                sheetContainer.appendChild(cleanStateEl);
            }
        } else {
            const mainContentEl = document.createElement('main');
            mainContentEl.className = 'lne-document-content';

            state.bloques.forEach((block, index) => {
                mainContentEl.appendChild(createInsertGap(index, state));
                const reserve=block.propiedades?.layout?.flowReserve;
                if(reserve){const holder=document.createElement('span');holder.className='group-flow-reserve';holder.style.cssText=`display:block;height:${reserve.height}px;margin:${reserve.margin};float:${reserve.float};width:${reserve.float==='none'?'auto':reserve.width+'px'};`;mainContentEl.appendChild(holder);}
                const blockEl = document.createElement('div');
                let blockClasses = `lne-editor-block ${state.selectedBlockId === block.id ? 'selected' : ''}`;
                blockClasses += ` block-type-${block.tipo}`;
                if (block.tipo==='icono') blockClasses+=' block-inline-icon';
                const locked = window.LNEState.isBlockLocked(block.id);
                if (locked) blockClasses += ' block-locked';
                
                // Soporte de flotación para imágenes con texto alrededor
                if (block.tipo === 'imagen') {
                    const align = block.propiedades?.alineacion;
                    const imageLayout = block.propiedades?.layout;
                    const wrapMode = imageLayout?.wrapMode || (imageLayout?.mode === 'absolute' ? 'front' : (align === 'align-left' || align === 'align-right' ? 'square' : 'inline'));
                    const isAbsoluteImage = window.LNEState.getBlockMode(block)==='absolute';
                    if (isAbsoluteImage) {
                        blockClasses += ` block-absolute-image ${wrapMode === 'behind' ? 'block-behind-image' : 'block-front-image'}`;
                        blockEl.style.left = `${Number(imageLayout.x) || 0}px`;
                        blockEl.style.top = `${Number(imageLayout.y) || 0}px`;
                        if (Number(imageLayout.width) > 0) blockEl.style.width = `${Number(imageLayout.width)}px`;
                        blockEl.style.zIndex = String(Number(imageLayout.zIndex) || (wrapMode === 'behind' ? 0 : 20));
                    } else if (wrapMode === 'square') {
                        const side = imageLayout?.wrapSide || (align === 'align-right' ? 'right' : 'left');
                        blockClasses += side === 'right' ? ' block-float-right' : ' block-float-left';
                        blockEl.style.width = `${getSquareImageWidth(block)}px`;
                        applySquareOffset(blockEl, imageLayout?.flowOffsetY);
                    } else if (wrapMode === 'top-bottom') {
                        blockClasses += ' block-image-top-bottom';
                    } else if (align === 'align-left') blockClasses += ' block-float-left';
                    else if (align === 'align-right') blockClasses += ' block-float-right';
                }
                const textLayout = block.tipo !== 'imagen' ? block.propiedades?.layout : null;
                if (textLayout?.mode === 'absolute') {
                    blockClasses += ` block-absolute-text ${textLayout.layer === 'behind' ? 'block-behind-text' : ''}`;
                    blockEl.style.left = `${Number(textLayout.x) || 0}px`;
                    blockEl.style.top = `${Number(textLayout.y) || 0}px`;
                    blockEl.style.width = `${Math.max(160, Number(textLayout.width) || 340)}px`;
                    blockEl.style.zIndex = String(textLayout.layer==='behind'?0:Number(textLayout.zIndex) || 15);
                    if(textLayout.heightMode==='minimum')blockEl.style.minHeight=`${Math.max(36,Number(textLayout.height)||36)}px`;
                }

                blockEl.className = blockClasses;
                if (block.propiedades?.spacingBefore !== undefined) blockEl.classList.add('flow-spacing-before');
                if (block.propiedades?.spacingAfter !== undefined) blockEl.classList.add('flow-spacing-after');
                blockEl.id = `block-${block.id}`;
                blockEl.dataset.blockId = block.id;
                if(block.propiedades?.groupId)blockEl.dataset.groupId=block.propiedades.groupId;
                if(block.tipo==='imagen'){blockEl.dataset.wrapMode=getImageWrapMode(block);blockEl.dataset.wrapSide=block.propiedades?.layout?.wrapSide||(block.propiedades?.alineacion==='align-right'?'right':'left');}
                if (block.tipo !== 'imagen' && textLayout?.mode !== 'absolute') {
                    const props = block.propiedades || {};
                    if (props.spacingBefore !== undefined) blockEl.style.marginTop = `${clamp(Number(props.spacingBefore) || 0, 0, 64)}px`;
                    if (props.spacingAfter !== undefined) blockEl.style.marginBottom = `${clamp(Number(props.spacingAfter) || 0, 0, 64)}px`;
                }

                const innerHtml = window.LNEComponents.renderBlock(block, isPreview,state.bloques);

                if (isPreview) {
                    blockEl.innerHTML = innerHtml;
                } else {
                    // Barra de controles de bloque flotante con Handle de arrastre
                    const absolute=window.LNEState.getBlockMode(block)==='absolute';
                    const controlsHtml = `<input class="block-copy-check" type="checkbox" aria-label="Seleccionar bloque para copiar" ${window.LNEState.selectedBlockIds.has(block.id)?'checked':''}>
                        <div class="block-controls ${absolute?'object-context-bar':''}">
                        ${!absolute&&!locked?'<span class="block-drag-handle" draggable="true" title="Reordenar en flujo"><i class="fa-solid fa-grip-vertical"></i></span>':''}
                        <span class="block-badge-type">${block.tipo}</span>
                        ${absolute?`<button class="block-btn-action object-lock" title="${locked?'Desbloquear':'Bloquear posición'}"><i class="fa-solid ${locked?'fa-lock':'fa-lock-open'}"></i></button>`:locked?'<span class="block-lock-badge" title="Posición bloqueada"><i class="fa-solid fa-lock"></i></span>':''}
                        <button class="block-btn-action" data-block-menu-toggle aria-label="Menú del objeto" aria-expanded="false">⋯</button>
                        <div class="block-object-menu" hidden>
                        ${window.LNEState.canUseFreeMode(block)?`<button data-object-action="mode" ${locked?'disabled':''}>${absolute?'Volver al flujo':'Convertir en caja libre'}</button>`:''}
                        <button data-object-action="duplicate">Duplicar</button><button data-object-action="lock">${locked?'Desbloquear posición':'Bloquear posición'}</button>
                        <button data-object-action="select">Separar contenido / seleccionar</button><button data-object-action="delete" ${locked?'disabled':''}>Eliminar</button></div></div>`;
                    blockEl.innerHTML = controlsHtml + innerHtml;
                    const copyCheck = blockEl.querySelector('.block-copy-check');
                    copyCheck.addEventListener('click', event=>event.stopPropagation());
                    copyCheck.addEventListener('change', ()=>window.LNEState.toggleBlockForCopy(block.id, copyCheck.checked));
                    bindObjectMenu(blockEl,block);
                    blockEl.querySelectorAll('[data-resource-add]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();window.LNEToolbar.insertAt(button.dataset.resourceAdd,index+1)}));
                    if (block.tipo === 'imagen' && getImageWrapMode(block) === 'square') blockEl.querySelector('.block-controls').style.top = `${clamp(Number(block.propiedades?.layout?.flowOffsetY) || 0,0,800) - 65}px`;
                    if (window.LNEState.canUseFreeMode(block) && !locked) {
                        if(block.tipo==='imagen')blockEl.querySelectorAll('.lne-block-imagen-container .img-resize-handle').forEach(el=>el.remove());
                        ['nw','n','ne','e','se','s','sw','w'].forEach(corner => {
                            const handle = document.createElement('div');
                            handle.className = `object-resize-handle ${block.tipo==='imagen'?'':'text-resize-handle'} img-resize-handle handle-${corner}`;
                            handle.dataset.handle = corner;
                            const autoHeight=block.tipo!=='imagen'&&textLayout?.heightMode!=='minimum';
                            handle.title = ['n','s'].includes(corner)&&autoHeight?'Altura automática; ajusta el ancho':'Redimensionar objeto';
                            if(['n','s'].includes(corner)&&autoHeight){handle.setAttribute('aria-disabled','true');handle.classList.add('auto-height-handle');}
                            else handle.addEventListener('pointerdown', event => {
                                if(block.tipo==='imagen') {
                                    const imageElement=document.getElementById('block-'+block.id);
                                    beginAbsoluteImageResize(event,imageElement,block,imageElement.querySelector('.lne-block-imagen-container'),corner);
                                } else beginAbsoluteTextResize(event, blockEl, block, corner);
                            });
                            blockEl.appendChild(handle);
                        });
                        if(block.tipo!=='imagen') ['top','right','bottom','left'].forEach(side=>{const zone=document.createElement('div');zone.className=`object-move-zone object-move-${side}`;zone.title='Arrastrar para mover';zone.addEventListener('pointerdown',event=>beginAbsoluteTextMove(event,blockEl,block));blockEl.appendChild(zone)});
                    }

                    // Eventos de selección
                    blockEl.addEventListener('click', (e) => {
                        if (e.altKey) return;
                        if (!blockEl.classList.contains('selected')) {
                            window.LNEState.selectBlock(block.id);
                        }
                    });

                    // Botones Subir / Bajar / Eliminar
                    const btnUp = blockEl.querySelector('.action-move-up');
                    if (btnUp) {
                        btnUp.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.LNEState.moveBlock(block.id, -1);
                        });
                    }

                    const btnDown = blockEl.querySelector('.action-move-down');
                    if (btnDown) {
                        btnDown.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.LNEState.moveBlock(block.id, 1);
                        });
                    }

                    const btnDel = blockEl.querySelector('.action-delete');
                    if (btnDel) {
                        btnDel.addEventListener('click', (e) => {
                            e.stopPropagation();
                            if (confirm(`¿Eliminar este bloque (${block.tipo})?`)) {
                                window.LNEState.removeBlock(block.id);
                            }
                        });
                    }

                    // Configurar Arrastre mediante el Drag Handle
                    const dragHandle = blockEl.querySelector('.block-drag-handle');
                    if (dragHandle) {
                        dragHandle.addEventListener('dragstart', (e) => {
                            draggedBlockId = block.id;
                            blockEl.classList.add('dragging');
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData('text/plain', block.id);
                        });

                        dragHandle.addEventListener('dragend', () => {
                            draggedBlockId = null;
                            blockEl.classList.remove('dragging');
                            clearDropIndicators();
                        });
                        if (textLayout?.mode === 'absolute') {
                            dragHandle.draggable = false;
                            dragHandle.addEventListener('pointerdown', event => beginAbsoluteTextMove(event, blockEl, block));
                        }
                    }

                    // Eventos Contextuales de Imagen
                    if (block.tipo === 'imagen') {
                        bindImageContextEvents(blockEl, block);
                    }

                    // Eventos Contextuales de Tabla
                    if (block.tipo === 'tabla') {
                        bindTableContextEvents(blockEl, block);
                    }

                    // Sincronizar Edición de Textos Inline
                    bindContentEditableSync(blockEl, block);
                }

                mainContentEl.appendChild(blockEl);
            });
            mainContentEl.appendChild(createInsertGap(state.bloques.length, state));

            sheetContainer.appendChild(mainContentEl);
        }

        // 3. Renderizado de Pie Editorial Institucional
        const footerEl = document.createElement('footer');
        footerEl.className = 'lne-editorial-footer';
        footerEl.innerHTML = `
            <div class="lne-footer-divider"></div>
            <div class="lne-footer-content">
                <div class="lne-footer-author">
                    <span class="lne-author-label">Autor:</span>
                    <span class="lne-meta-editable-field lne-meta-autor" ${editableAttr} data-meta-field="autor" title="Clic para editar el autor del material">${escapeHtml(autorVal)}</span>
                </div>
                <div class="lne-footer-brand">
                    <i class="fa-solid fa-scale-balanced"></i> La Norma Express • Material Jurídico
                </div>
            </div>
        `;
        sheetContainer.appendChild(footerEl);
        bindMetadataObjects(state,isPreview);
        window.LNEGroups?.wrap(sheetContainer);
        fitFreeObjects();
        const renderedSheet=sheetContainer;
        renderedSheet.querySelectorAll('.lne-editor-block').forEach(el=>{
            const block=state.bloques.find(b=>b.id===el.dataset.blockId)||{metaField:el.dataset.metaField,propiedades:{layout:state.metadata?.layouts?.[el.dataset.metaField]}};
            if(window.LNEState.getBlockMode(block)!=='absolute')applyRelativeLayout(el,block,block.propiedades?.layout||{});
        });
        renderedSheet.querySelectorAll('.icon-bullet').forEach(icon=>{
            const parent=icon.parentElement;
            parent.classList.add('lne-icon-list-item');
            parent.style.setProperty('--lne-marker-width',`${(parseFloat(icon.style.fontSize)||16)+10}px`);
        });
        renderedSheet.querySelectorAll('img').forEach(image=>image.addEventListener('load',()=>fitFreeObjects(renderedSheet),{once:true}));

        // 4. Sincronización de Campos de Metadatos
        if (!isPreview) {
            bindMetadataFieldsSync(sheetContainer);
        }
    }

    function createInsertGap(index, state) {
        const gap = document.createElement('div');
        gap.className = 'block-insert-gap';
        gap.dataset.insertIndex = index;
        if (state.selectedBlockId && (state.bloques[index]?.id === state.selectedBlockId || state.bloques[index - 1]?.id === state.selectedBlockId)) gap.classList.add('near-selected');
        const button = document.createElement('button');
        button.type = 'button';
        button.title = 'Insertar en esta posición';
        button.innerHTML = '<i class="fa-solid fa-plus"></i>';
        button.addEventListener('click', e => {
            e.stopPropagation();
            const wasOpen = gap.classList.contains('menu-open');
            closeInsertMenus();
            if (!wasOpen) gap.classList.add('menu-open');
        });
        gap.appendChild(button);
        const menu = document.createElement('div');
        menu.className = 'block-insert-menu';
        menu.innerHTML = '<strong>Agregar aquí</strong>';
        const items = [['parrafo', 'Párrafo'], ['titulo', 'Título'], ['subtitulo', 'Subtítulo'], ['lista', 'Lista'], ['imagen', 'Imagen'], ['tabla', 'Tabla'], ['cuadro', 'Cuadro'], ['separador', 'Separador']];
        items.forEach(([type, label]) => {
            const action = document.createElement('button');
            action.type = 'button';
            action.textContent = label;
            action.addEventListener('click', e => {
                e.stopPropagation();
                closeInsertMenus();
                window.LNEToolbar.insertAt(type, index);
            });
            menu.appendChild(action);
        });
        const legal = document.createElement('details');
        legal.innerHTML = '<summary>Componente jurídico</summary>';
        window.LNEComponents.getLegalComponents().forEach(component => {
            const action = document.createElement('button');
            action.type = 'button';
            action.textContent = component.label;
            action.addEventListener('click', e => {
                e.stopPropagation();
                closeInsertMenus();
                window.LNEToolbar.insertAt(component.tipo, index);
            });
            legal.appendChild(action);
        });
        menu.appendChild(legal);
        gap.appendChild(menu);
        return gap;
    }

    function closeInsertMenus() {
        sheetContainer?.querySelectorAll('.menu-open').forEach(el => el.classList.remove('menu-open'));
    }

    function bindObjectMenu(element,block) {
        const toggle=element.querySelector('[data-block-menu-toggle]'),menu=element.querySelector('.block-object-menu');
        toggle.addEventListener('click',event=>{event.stopPropagation();window.LNEState.selectBlock(block.id);const open=menu.hidden;sheetContainer.querySelectorAll('.block-object-menu').forEach(el=>el.hidden=true);menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));});
        element.querySelector('.object-lock')?.addEventListener('click',event=>{event.stopPropagation();window.LNEState.setBlockLocked(block.id,!window.LNEState.isBlockLocked(block.id))});
        menu.querySelectorAll('[data-object-action]').forEach(button=>button.addEventListener('click',event=>{
            event.stopPropagation();menu.hidden=true;
            switch(button.dataset.objectAction){
                case 'mode':if(block.tipo==='imagen')changeImageWrap(block.id,window.LNEState.getBlockMode(block)==='absolute'?'inline':'front');else changeTextMode(block.id,window.LNEState.getBlockMode(block)==='absolute'?'flow':'absolute');break;
                case 'duplicate':window.LNEState.duplicateBlock(block.id,getSheetBounds());break;
                case 'lock':window.LNEState.setBlockLocked(block.id,!window.LNEState.isBlockLocked(block.id));break;
                case 'select':window.LNEEditorial.startSelection();window.LNEState.toggleBlockForCopy(block.id,true);break;
                case 'delete':if(confirm('¿Eliminar este elemento?'))window.LNEState.removeBlock(block.id);break;
            }
        }));
    }

    function updateSelection(state) {
        document.body.classList.toggle('selection-mode',window.LNEState.selectionMode);
        sheetContainer.querySelectorAll('.lne-editor-block').forEach(el => el.classList.toggle('selected', el.dataset.blockId === state.selectedBlockId));
        sheetContainer.querySelectorAll('.lne-editor-block').forEach(el => {
            el.classList.toggle('copy-selected', window.LNEState.selectedBlockIds.has(el.dataset.blockId));
            const checkbox=el.querySelector('.block-copy-check');
            if (checkbox) checkbox.checked=window.LNEState.selectedBlockIds.has(el.dataset.blockId);
        });
        sheetContainer.querySelectorAll('.block-insert-gap').forEach(el => {
            const index = Number(el.dataset.insertIndex);
            el.classList.toggle('near-selected', state.bloques[index]?.id === state.selectedBlockId || state.bloques[index - 1]?.id === state.selectedBlockId);
        });
    }

    function addEmptyBlockAndFocus(type, args) {
        const block = window.LNEComponents.createBlock(type, ...args);
        window.LNEState.addBlock(block);
        setTimeout(() => {
            const editable = document.getElementById(`block-${block.id}`)?.querySelector('[contenteditable="true"]');
            if (editable) editable.focus();
        }, 50);
    }

    // First manipulation captures the current visual rectangle, without a state
    // mutation until pointerup: promotion and movement remain one undo operation.
    function promoteVisualObject(element, block) {
        if(element.style.position==='absolute'||window.LNEState.getBlockMode(block)==='absolute')return;
        const original=element.style.cssText;
        const bounds=getSheetBounds(),rect=element.getBoundingClientRect();
        element.style.position='absolute';
        element.style.left=`${(rect.left-bounds.rect.left)/bounds.scale}px`;
        element.style.top=`${(rect.top-bounds.rect.top)/bounds.scale}px`;
        element.style.width=`${rect.width/bounds.scale}px`;
        element.style.margin='0';
        element.classList.add('block-absolute-text');
        return ()=>{element.style.cssText=original;element.classList.remove('block-absolute-text');};
    }

    function commitObjectLayout(block, layout, reason) {
        if(block.metaField) {
            window.LNEState.snapshot();
            window.LNEState.state.metadata.layouts={...window.LNEState.state.metadata.layouts,[block.metaField]:layout};
            window.LNEState.notify(reason);
        } else window.LNEState.updateBlockLayout(block.id,layout,reason);
    }

    function applyRelativeLayout(el,block,layout) {
        const x=Number(layout.offsetX)||0,y=Number(layout.offsetY)||0;
        const lineWrap=['parrafo','lista'].includes(block.tipo)&&!x&&!y;
        el.classList?.toggle('block-line-wrap',lineWrap);
        if(block.tipo==='imagen') {
            if(block.propiedades?.spacingBefore!==undefined)el.style.marginTop=`${Math.max(0,Number(block.propiedades.spacingBefore)||0)}px`;
            if(block.propiedades?.spacingAfter!==undefined&&!el.dataset.flowBaseMargin)el.style.marginBottom=`${Math.max(0,Number(block.propiedades.spacingAfter)||0)}px`;
        }
        if(!el.dataset.flowBaseMargin)el.dataset.flowBaseMargin=String(parseFloat(getComputedStyle(el).marginBottom)||0);
        const square=block.tipo==='imagen'&&getImageWrapMode(block)==='square';
        if(square) {
            const side=layout.wrapSide||(block.propiedades?.alineacion==='align-right'?'right':'left');
            el.classList?.toggle('block-float-left',side==='left');
            el.classList?.toggle('block-float-right',side==='right');
            applySquareOffset(el,layout.flowOffsetY);
            if(el.dataset.flowBaseTop===undefined)el.dataset.flowBaseTop=String(parseFloat(getComputedStyle(el).marginTop)||0);
            // Floats must move in layout, not just paint: their exclusion rectangle
            // and the text must move together. Negative movement keeps its footprint.
            el.style.transform='none';
            el.style.marginTop=`${Number(el.dataset.flowBaseTop)+y}px`;
            el.style.marginBottom=`${Number(el.dataset.flowBaseMargin)+Math.max(0,-y)}px`;
            el.style.shapeMargin='16px';
            const bounds=getSheetBounds(),area=bounds.right-bounds.left,inset=clamp(side==='right'?-x:x,0,Math.max(0,area-Math.min(Number(layout.width)||el.offsetWidth,area*.48)));
            el.style.marginLeft=`${side==='left'?inset:16}px`;
            el.style.marginRight=`${side==='right'?inset:16}px`;
            el.style.shapeOutside=`inset(${parseFloat(el.style.paddingTop)||0}px 0 0 0) border-box`;
        } else {
            el.style.transform=`translate(${x}px,${y}px)`;
            el.style.marginBottom=`${Number(el.dataset.flowBaseMargin)+Math.max(0,y)}px`;
        }
        if(Number(layout.width)>0) {
            const bounds=getSheetBounds(),width=Math.min(Number(layout.width),(bounds.right-bounds.left)*(square?.48:1));
            if(block.tipo==='imagen'||block.metaField)el.style.width=`${width}px`;
            else {el.style.width='auto';el.style.maxWidth=`${width}px`;}
            if(block.tipo==='imagen') {
                const container=el.querySelector('.lne-block-imagen-container');
                if(container)container.style.width=`${width}px`;
            }
        }
        if(!square&&el.getBoundingClientRect) {
            el.style.transform=`translate(0px,${y}px)`;
            const bounds=getSheetBounds(),rect=el.getBoundingClientRect();
            const anchor=(rect.left-bounds.rect.left)/bounds.scale;
            const room=lineWrap?{left:bounds.left,right:bounds.right}:getFlowHorizontalRoom((rect.top-bounds.rect.top)/bounds.scale,el.offsetHeight,el);
            if(block.tipo!=='imagen'&&!block.metaField)el.style.maxWidth=`${Math.min(Number(layout.width)||bounds.right-bounds.left,room.right-room.left)}px`;
            const safeX=clamp(x,room.left-anchor,Math.max(room.left-anchor,room.right-anchor-el.offsetWidth));
            el.style.transform=`translate(${safeX}px,${y}px)`;
            return {offsetX:safeX};
        }
    }

    function getFlowHorizontalRoom(top,height,exclude) {
        const bounds=getSheetBounds();let left=bounds.left,right=bounds.right;
        (sheetContainer.querySelectorAll?.('.block-float-left,.block-float-right')||[]).forEach(el=>{
            if(el===exclude)return;
            const image=el.querySelector('.lne-block-imagen'),rect=(image||el).getBoundingClientRect();
            const y=(rect.top-bounds.rect.top)/bounds.scale,bottom=y+rect.height/bounds.scale;
            if(top>=bottom||top+height<=y)return;
            if(el.classList.contains('block-float-left'))left=Math.max(left,(rect.right-bounds.rect.left)/bounds.scale+16);
            else right=Math.min(right,(rect.left-bounds.rect.left)/bounds.scale-16);
        });
        return {left,right:Math.max(left,right)};
    }

    // Relative movement never removes the block's real height from the flow.
    // Positive vertical offset additionally reserves its displaced bottom edge.
    function beginRelativeManipulation(event,el,block,corner=null) {
        if(window.LNEState.isBlockLocked(block.id))return;
        event.preventDefault();event.stopPropagation();
        window.LNEState.selectBlock(block.id);
        const initial={...(block.propiedades?.layout||{})},bounds=getSheetBounds(),rect=el.getBoundingClientRect();
        const originalStyle=el.style.cssText;
        const image=el.querySelector('.lne-block-imagen'),imageRect=image?.getBoundingClientRect();
        const width=imageRect?imageRect.width/bounds.scale:el.offsetWidth;
        const ratio=imageRect?imageRect.width/Math.max(1,imageRect.height):null;
        const x0=Number(initial.offsetX)||0,y0=Number(initial.offsetY)||0;
        const anchorX=(rect.left-bounds.rect.left)/bounds.scale-x0,anchorY=(rect.top-bounds.rect.top)/bounds.scale-y0;
        const baseMargin=parseFloat(getComputedStyle(el).marginBottom)||0;
        el.dataset.flowBaseMargin=String(baseMargin-Math.max(0,getImageWrapMode(block)==='square'?-y0:y0));
        let changed=false,next={...initial,mode:'flow'},targetIndex=null;
        function move(e) {
            const dx=(e.clientX-event.clientX)/bounds.scale,dy=(e.clientY-event.clientY)/bounds.scale;
            if(Math.abs(dx)+Math.abs(dy)<2&&!changed)return;
            changed=true;
            if(corner) {
                const west=corner.includes('w');
                const delta=ratio&&['n','s'].includes(corner)?dy*ratio*(corner==='n'?-1:1):dx*(west?-1:1);
                const limit=Math.min(west?anchorX+x0+width-bounds.left:bounds.right-anchorX-x0,getImageWrapMode(block)==='square'?(bounds.right-bounds.left)*.48:Infinity);
                next.width=Math.round(clamp(width+delta,Math.min(image?16:100,limit),limit));
                const imageInset=imageRect?(imageRect.left-rect.left)/bounds.scale:0;
                next.offsetX=x0+imageInset+(west?width-next.width:0);
                if(ratio)next.height=Math.round(next.width/ratio);
            } else {
                next.offsetX=Math.round(clamp(x0+dx,bounds.left-anchorX,bounds.right-anchorX-el.offsetWidth));
                next.offsetY=Math.round(clamp(y0+dy,-anchorY,Math.max(-anchorY,bounds.bottom-anchorY-el.offsetHeight)));
                if(getImageWrapMode(block)==='square') {
                    const left=clamp((imageRect.left-bounds.rect.left)/bounds.scale+dx,bounds.left,bounds.right-width);
                    next.wrapSide=left+width/2<(bounds.left+bounds.right)/2?'left':'right';
                    next.offsetX=Math.round(next.wrapSide==='left'?left-bounds.left:left+width-bounds.right);
                    const desiredTop=imageRect.top+dy*bounds.scale;
                    const target=[...sheetContainer.querySelectorAll('.block-type-parrafo,.block-type-lista')].find(candidate=>{
                        const r=candidate.getBoundingClientRect();return desiredTop>=r.top-16*bounds.scale&&desiredTop<r.bottom;
                    });
                    if(target&&(targetIndex!==null||(el.compareDocumentPosition(target)&Node.DOCUMENT_POSITION_PRECEDING))) {
                        targetIndex=window.LNEState.state.bloques.findIndex(item=>item.id===target.dataset.blockId);
                        next.flowOffsetY=Math.max(0,(desiredTop-target.getBoundingClientRect().top)/bounds.scale);
                        next.offsetY=0;
                        target.before(el);
                    }
                }
            }
            const applied=applyRelativeLayout(el,block,next);
            if(applied)next.offsetX=applied.offsetX;
        }
        function end(e) {
            document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',end);document.removeEventListener('pointercancel',end);
            if(!changed||e.type==='pointercancel'){el.style.cssText=originalStyle;return;}
            if(block.tipo==='imagen'&&targetIndex!==null)window.LNEState.commitImageFlowMove(block.id,targetIndex,next);
            else if(block.tipo==='imagen')window.LNEState.updateImageLayout(block.id,next,'image-relative-layout');
            else commitObjectLayout(block,next,'block-relative-layout');
        }
        document.addEventListener('pointermove',move);document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end);
    }

    function bindMetadataObjects(state,preview) {
        const fields=[...sheetContainer.querySelectorAll('[data-meta-field]')];
        fields.forEach(el=>{
            const field=el.dataset.metaField,layout=state.metadata?.layouts?.[field]||{};
            if(state.metadata.richText?.[field])el.innerHTML=state.metadata.richText[field];
            Object.assign(el.style,state.metadata.textStyles?.[field]||{});
            const block={id:`meta-${field}`,metaField:field,propiedades:{layout}};
            el.classList.add('lne-editor-block','lne-meta-object');
            el.dataset.blockId=block.id;
            if(state.metadata.groupIds?.[field])el.dataset.groupId=state.metadata.groupIds[field];
            if(layout.mode==='absolute') {
                if(layout.flowReserve){const holder=document.createElement('span'),r=layout.flowReserve;holder.className='group-flow-reserve';holder.style.cssText=`display:block;height:${r.height}px;margin:${r.margin};`;el.before(holder);}
                el.classList.add('block-absolute-text');
                Object.assign(el.style,{position:'absolute',left:`${Number(layout.x)||0}px`,top:`${Number(layout.y)||0}px`,width:`${Number(layout.width)||160}px`,margin:'0',zIndex:String(layout.zIndex??15)});
            }
            if(preview)return;
            el.addEventListener('click',()=>window.LNEState.selectBlock(block.id));
            el.addEventListener('beforeinput',()=>window.LNEState.recordTextEdit(block.id));
            ['top','right','bottom','left'].forEach(side=>{
                const zone=document.createElement('span');zone.contentEditable='false';zone.className=`object-move-zone object-move-${side}`;
                zone.addEventListener('pointerdown',event=>beginAbsoluteTextMove(event,el,block));el.appendChild(zone);
            });
            ['nw','n','ne','e','se','s','sw','w'].forEach(corner=>{
                const handle=document.createElement('span');handle.contentEditable='false';handle.className=`object-resize-handle img-resize-handle handle-${corner}`;
                if(['n','s'].includes(corner)){handle.classList.add('auto-height-handle');handle.setAttribute('aria-disabled','true');}
                else handle.addEventListener('pointerdown',event=>beginAbsoluteTextResize(event,el,block,corner));
                el.appendChild(handle);
            });
        });
    }

    function beginAbsoluteTextMove(event, blockEl, block) {
        if (window.LNEState.isBlockLocked(block.id)) return;
        if(window.LNEState.getBlockMode(block)!=='absolute')return beginRelativeManipulation(event,blockEl,block);
        event.preventDefault();
        event.stopPropagation();
        const rollback=promoteVisualObject(blockEl, block);
        const layout = block.propiedades?.layout || {};
        const bounds = getSheetBounds();
        const sheet = bounds.rect;
        const startX = parseFloat(blockEl.style.left) || bounds.left;
        const startY = parseFloat(blockEl.style.top) || bounds.top;
        const width = blockEl.offsetWidth;
        const height = blockEl.offsetHeight;
        const offsetX = (event.clientX-sheet.left)/bounds.scale-startX;
        const offsetY = (event.clientY-sheet.top)/bounds.scale-startY;
        let changed=false;

        function move(moveEvent) {
            if(Math.abs(moveEvent.clientX-event.clientX)+Math.abs(moveEvent.clientY-event.clientY)<2)return;
            changed=true;
            const x = snapToGuides(clamp((moveEvent.clientX-sheet.left)/bounds.scale-offsetX, bounds.left, Math.max(bounds.left, bounds.right - width)), width);
            const y = snapYToObjects(clamp((moveEvent.clientY-sheet.top)/bounds.scale-offsetY,bounds.top,Math.max(bounds.top,bounds.bottom-height)),height);
            blockEl.style.left = `${Math.round(x)}px`;
            blockEl.style.top = `${Math.round(y)}px`;
        }
        function end() {
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerup', end);
            document.removeEventListener('pointercancel', end);
            clearGuides();
            if(!changed){rollback?.();return;}
            commitObjectLayout(block, {
                mode: 'absolute',
                x: Math.round(parseFloat(blockEl.style.left) ?? startX),
                y: Math.round(parseFloat(blockEl.style.top) ?? startY),
                width: blockEl.offsetWidth,
                zIndex: Number(layout.zIndex) || 15
            }, 'text-layout-move');
        }
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', end);
        document.addEventListener('pointercancel', end);
    }

    function beginAbsoluteTextResize(event, blockEl, block, corner = 'e') {
        if (window.LNEState.isBlockLocked(block.id)) return;
        if(window.LNEState.getBlockMode(block)!=='absolute')return beginRelativeManipulation(event,blockEl,block,corner);
        event.preventDefault();
        event.stopPropagation();
        const rollback=promoteVisualObject(blockEl, block);
        const layout = block.propiedades?.layout || {};
        const startX = event.clientX;
        const startWidth = blockEl.offsetWidth;
        const bounds = getSheetBounds();
        const startLeft = parseFloat(blockEl.style.left) || bounds.left;
        const west = corner.includes('w');
        const startY=event.clientY,startHeight=blockEl.offsetHeight,startTop=parseFloat(blockEl.style.top)||bounds.top;
        const minimum=layout.heightMode==='minimum';let changed=false;
        function move(moveEvent) {
            if(Math.abs(moveEvent.clientX-event.clientX)+Math.abs(moveEvent.clientY-event.clientY)<2)return;
            changed=true;
            const delta = (moveEvent.clientX - startX)/bounds.scale;
            const max = west ? startLeft + startWidth - bounds.left : bounds.right - startLeft;
            const width = ['n','s'].includes(corner)?startWidth:clamp(startWidth + (west ? -delta : delta), Math.min(160,max), max);
            blockEl.style.width = `${Math.round(width)}px`;
            if (west) blockEl.style.left = `${Math.round(startLeft + startWidth - width)}px`;
            if(minimum&&/[ns]/.test(corner)){const north=corner.includes('n'),height=clamp(startHeight+(north?-1:1)*(moveEvent.clientY-startY)/bounds.scale,36,north?startTop+startHeight-bounds.top:bounds.bottom-startTop);blockEl.style.minHeight=`${Math.round(height)}px`;if(north)blockEl.style.top=`${Math.round(startTop+startHeight-height)}px`;}
            blockEl.style.top = `${clamp(parseFloat(blockEl.style.top)||startTop,bounds.top,Math.max(bounds.top,bounds.bottom-blockEl.offsetHeight))}px`;
        }
        function end() {
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerup', end);
            document.removeEventListener('pointercancel', end);
            if(!changed){rollback?.();return;}
            if(changed)commitObjectLayout(block, { ...layout, mode: 'absolute', x: parseFloat(blockEl.style.left), y: parseFloat(blockEl.style.top), width: blockEl.offsetWidth,...(minimum?{height:parseFloat(blockEl.style.minHeight)||blockEl.offsetHeight}:{}) }, 'text-layout-resize');
        }
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', end);
        document.addEventListener('pointercancel', end);
    }

    function bindMetadataFieldsSync(container) {
        const metaEditables = container.querySelectorAll('[data-meta-field]');
        metaEditables.forEach(el => {
            el.addEventListener('input', () => {
                const field = el.dataset.metaField;
                const clone=el.cloneNode(true);clone.querySelectorAll('.object-move-zone,.object-resize-handle').forEach(n=>n.remove());window.LNEState.state.metadata.richText={...window.LNEState.state.metadata.richText,[field]:clone.innerHTML};
                const textVal = el.innerText.trim();
                window.LNEState.updateMetadata(field, textVal,clone.innerHTML);
                if (field === 'titulo') {
                    const titleInput = document.getElementById('doc-title-input');
                    if (titleInput && document.activeElement !== titleInput) {
                        titleInput.value = textVal;
                    }
                }
            });
        });
    }

    function escapeHtml(text) {
        if (!text) return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Gestión de Arrastrar y Soltar con Indicadores Visuales de Destino
     */
    function handleDragOver(e) {
        if (!draggedBlockId) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const targetBlock = e.target.closest('.lne-editor-block');
        if (!targetBlock || targetBlock.dataset.blockId === draggedBlockId) {
            clearDropIndicators();
            return;
        }

        const rect = targetBlock.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;

        clearDropIndicators();
        if (e.clientY < midY) {
            targetBlock.classList.add('drop-target-top');
        } else {
            targetBlock.classList.add('drop-target-bottom');
        }
    }

    function handleDragLeave(e) {
        if (!sheetContainer.contains(e.relatedTarget)) {
            clearDropIndicators();
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        const targetBlock = e.target.closest('.lne-editor-block');
        if (!draggedBlockId) {
            clearDropIndicators();
            return;
        }

        if (!targetBlock) {
            // Si se suelta en la hoja debajo de los bloques existentes
            const state = window.LNEState.state;
            clearDropIndicators();
            window.LNEState.moveBlockToIndex(draggedBlockId, state.bloques.length);
            return;
        }

        const targetBlockId = targetBlock.dataset.blockId;
        if (targetBlockId === draggedBlockId) {
            clearDropIndicators();
            return;
        }

        const state = window.LNEState.state;
        const targetIndex = state.bloques.findIndex(b => b.id === targetBlockId);
        const rect = targetBlock.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;

        let destinationIndex = targetIndex;
        if (e.clientY >= midY) {
            destinationIndex = targetIndex + 1;
        }

        clearDropIndicators();
        window.LNEState.moveBlockToIndex(draggedBlockId, destinationIndex);
    }

    function clearDropIndicators() {
        document.querySelectorAll('.drop-target-top, .drop-target-bottom').forEach(el => {
            el.classList.remove('drop-target-top', 'drop-target-bottom');
        });
    }

    /**
     * Barra Contextual de Imágenes y Tiradores de Redimensionamiento Interactivo
     */
    function bindImageContextEvents(blockEl, block) {
        // 1. Menú contextual de ajuste y opacidad.
        const contextBar = blockEl.querySelector('.image-context-bar');
        const btnToggleAdjust = blockEl.querySelector('[data-img-action="toggle-adjust"]');
        if (btnToggleAdjust && contextBar) {
            btnToggleAdjust.addEventListener('click', (e) => {
                e.stopPropagation();
                contextBar.classList.toggle('adjust-open');
            });
        }

        blockEl.querySelectorAll('[data-img-wrap]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                setImageWrapMode(blockEl, block, btn.dataset.imgWrap);
            });
        });

        const opacityInput = blockEl.querySelector('[data-img-opacity]');
        const opacityValue = blockEl.querySelector('[data-img-opacity-value]');
        if (opacityInput) {
            opacityInput.addEventListener('input', () => {
                const value = Math.max(0, Math.min(100, Number(opacityInput.value))) / 100;
                const selectedImage = blockEl.querySelector('.lne-block-imagen');
                if (selectedImage) selectedImage.style.opacity = String(value);
                if (opacityValue) opacityValue.textContent = `${Math.round(value * 100)}%`;
            });
            opacityInput.addEventListener('change', () => {
                const opacity = Math.max(0, Math.min(100, Number(opacityInput.value))) / 100;
                window.LNEState.updateImageLayout(block.id, { opacity }, 'image-opacity-update');
            });
        }

        // 2. Tiradores Visuales de Redimensionamiento (Handles)
        const container = blockEl.querySelector('.lne-block-imagen-container');
        if (container) {
            const handles = container.querySelectorAll('.img-resize-handle');
            handles.forEach(handle => {
                handle.addEventListener('pointerdown', (e) => {
                    if (window.LNEState.isBlockLocked(block.id)) return;
                    e.preventDefault();
                    e.stopPropagation();

                    if (block.propiedades?.layout?.mode === 'absolute') {
                        beginAbsoluteImageResize(e, blockEl, block, container, handle.dataset.handle);
                        return;
                    }

                    const startX = e.clientX;
                    const startWidth = container.offsetWidth;
                    const handleType = handle.dataset.handle;
                    const parentWidth = getImageWrapMode(block) === 'square' ? (getSheetBounds().right - getSheetBounds().left) * .48 : getSheetBounds().right - getSheetBounds().left;

                    function onPointerMove(moveEvent) {
                        moveEvent.preventDefault();
                        let deltaX = (moveEvent.clientX - startX)/getSheetBounds().scale;
                        if (handleType === 'nw' || handleType === 'sw' || handleType === 'w') {
                            deltaX = -deltaX;
                        }

                        let newWidth = Math.max(100, Math.min(parentWidth, startWidth + deltaX * (handleType.includes('e') || handleType.includes('w') ? 1 : 2)));
                        container.style.width = `${Math.round(newWidth)}px`;
                        if (getImageWrapMode(block) === 'square') blockEl.style.width = `${Math.round(newWidth)}px`;
                    }

                    function onPointerUp() {
                        document.removeEventListener('pointermove', onPointerMove);
                        document.removeEventListener('pointerup', onPointerUp);
                        document.removeEventListener('pointercancel', onPointerUp);

                        changeImageWidth(block.id, container.offsetWidth);
                    }

                    document.addEventListener('pointermove', onPointerMove);
                    document.addEventListener('pointerup', onPointerUp);
                    document.addEventListener('pointercancel', onPointerUp);
                });
            });

            const image = container.querySelector('.lne-block-imagen');
            if (image) {
                const ownerSheet=sheetContainer;
                image.addEventListener('load',()=>fitFreeObjects(ownerSheet), { once:true });
                image.addEventListener('pointerdown', (e) => {
                    if (window.LNEState.isBlockLocked(block.id)) { window.LNEState.selectBlock(block.id); return; }
                    e.preventDefault();
                    e.stopPropagation();
                    beginImageMove(e, blockEl, block, container, image);
                });
            }
        }

        // 3. Reemplazo de imagen desde el equipo
        const btnReplace = blockEl.querySelector('[data-img-action="replace"]');
        if (btnReplace) {
            btnReplace.addEventListener('click', (e) => {
                e.stopPropagation();
                replaceImage(block.id);
            });
        }
    }

    function setImageWrapMode(blockEl, block, wrapMode) {
        if (window.LNEState.isBlockLocked(block.id)) return;
        const container = blockEl.querySelector('.lne-block-imagen-container');
        const image = blockEl.querySelector('.lne-block-imagen');
        const existing = block.propiedades?.layout || {};
        const opacity = Math.max(0, Math.min(1, Number(existing.opacity ?? 1)));
        let patch = { ...existing, wrapMode, opacity };

        if (wrapMode === 'front' || wrapMode === 'behind') {
            const geometry = existing.mode === 'absolute' ? { x:existing.x, y:existing.y, width:existing.width, height:existing.height } : container && image ? getImageLayoutFromDom(blockEl, container, image) : {};
            patch = {
                ...patch,
                ...geometry,
                mode: 'absolute',
                zIndex: wrapMode === 'behind' ? 0 : Math.max(20, Number(existing.zIndex) || 20)
            };
        } else {
            const width = wrapMode === 'square' ? Math.min(Number(existing.width) || container?.offsetWidth || 300, (getSheetBounds().right - getSheetBounds().left) * .48) : Number(existing.width) || container?.offsetWidth || 300;
            patch = {
                ...patch,
                mode: 'flow',
                width,
                wrapSide: existing.wrapSide || (block.propiedades?.alineacion === 'align-right' ? 'right' : 'left'),
                x: 0,
                y: 0,
                zIndex: 1
            };
        }
        window.LNEState.updateImageLayout(block.id, patch, 'image-wrap-mode-update');
    }

    function selectImageVisual(blockEl) {
        window.LNEState.selectBlock(blockEl.dataset.blockId);
    }

    function getSheetBounds() {
        const style=getComputedStyle(sheetContainer);
        const left = parseFloat(style.paddingLeft)||85;
        const right = sheetContainer.clientWidth-(parseFloat(style.paddingRight)||85);
        const top = 0;
        const bottom = sheetContainer.clientHeight;
        const rect=sheetContainer.getBoundingClientRect();
        return {
            rect, scale:rect.width/sheetContainer.clientWidth||1,
            width: sheetContainer.clientWidth,
            height: sheetContainer.clientHeight,
            left, right, top, bottom
        };
    }

    // Las imágenes detrás del texto no capturan el puntero. Alt+clic sobre su área
    // las recupera de forma segura sin cambiar la capa ni el contenido del documento.
    function handleBehindImageSelection(e) {
        if (!e.altKey) return;
        const candidates = window.LNEState.state.bloques
            .filter(block => (block.tipo === 'imagen' && getImageWrapMode(block) === 'behind') || block.propiedades?.layout?.layer === 'behind')
            .map(block => ({ block, el: document.getElementById(`block-${block.id}`) }))
            .filter(item => item.el);

        const hit = candidates.reverse().find(item => {
            const rect = item.el.getBoundingClientRect();
            return e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        });
        if (hit) {
            e.preventDefault();
            window.LNEState.selectBlock(hit.block.id);
            if (!window.LNEState.isBlockLocked(hit.block.id)) {
                if (hit.block.tipo === 'imagen') {
                    const container = hit.el.querySelector('.lne-block-imagen-container');
                    const image = hit.el.querySelector('.lne-block-imagen');
                    if (container && image) beginImageMove(e, hit.el, hit.block, container, image);
                } else beginAbsoluteTextMove(e, hit.el, hit.block);
            }
        }
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function getImageWrapMode(block) {
        const p = block.propiedades || {};
        return p.layout?.wrapMode || (p.layout?.mode === 'absolute' ? 'front' : ['align-left', 'align-right'].includes(p.alineacion) ? 'square' : 'inline');
    }

    function getSquareImageWidth(block) {
        const bounds = getSheetBounds();
        const area = bounds.right - bounds.left;
        const value = block.propiedades?.ancho || '100%';
        const width = Number(block.propiedades?.layout?.width) || (String(value).endsWith('%') ? area * (parseFloat(value) || 100) / 100 : parseFloat(value)) || area * .45;
        return Math.round(clamp(width, Math.min(100, area * .48), area * .48));
    }

    function changeImageWrap(blockId, mode) {
        const block = window.LNEState.getBlockById(blockId);
        const element = document.getElementById(`block-${blockId}`);
        if (block && element && ['inline', 'square', 'top-bottom', 'front', 'behind'].includes(mode)) setImageWrapMode(element, block, mode);
    }

    function applySquareOffset(element, value) {
        const offset=clamp(Number(value)||0,0,800);
        element.style.paddingTop=`${offset}px`;
        element.style.shapeOutside=`inset(${offset}px 0 0 0)`;
    }

    function changeSquareOffset(id, value) {
        if (window.LNEState.isBlockLocked(id)) return;
        window.LNEState.updateImageLayout(id,{flowOffsetY:clamp(Number(value)||0,0,800)});
    }

    function changeImageWidth(blockId, width) {
        const block = window.LNEState.getBlockById(blockId);
        if (!block || window.LNEState.isBlockLocked(blockId)) return;
        const mode = getImageWrapMode(block);
        const bounds = getSheetBounds();
        const maximum = mode === 'square' ? (bounds.right - bounds.left) * .48 : bounds.right - bounds.left;
        width = Math.round(clamp(width || 100, block.propiedades?.visualIcon?16:100, maximum));
        const element = document.getElementById(`block-${blockId}`);
        const img = element?.querySelector('.lne-block-imagen');
        const ratio = img?.naturalWidth && img?.naturalHeight ? img.naturalHeight / img.naturalWidth : 1;
        const layout = { ...(block.propiedades.layout || {}), width, height: Math.round(width * ratio) };
        if (['front', 'behind'].includes(mode)) {
            layout.x = clamp(Number(layout.x) || bounds.left, bounds.left, bounds.right - width);
            layout.y = clamp(Number(layout.y) || bounds.top, bounds.top, Math.max(bounds.top, bounds.bottom - layout.height - 30));
        }
        window.LNEState.updateBlockProperties(blockId, { ancho: `${width}px`, layout });
    }

    function replaceImage(blockId) {
        const block = window.LNEState.getBlockById(blockId);
        if (!block || block.tipo !== 'imagen') return;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.hidden = true;
        document.body.appendChild(input);
        input.addEventListener('cancel', () => input.remove(), { once:true });
        input.addEventListener('change', () => {
            const file = input.files[0];
            if (!file || !file.type.startsWith('image/')) { input.remove(); return; }
            const reader = new FileReader();
            const epoch = window.LNEState.documentEpoch;
            reader.onload = () => { if (epoch === window.LNEState.documentEpoch) window.LNEState.updateBlockProperties(blockId, { src: reader.result }); };
            reader.readAsDataURL(file);
            input.remove();
        });
        input.click();
    }

    function changeTextMode(blockId, mode) {
        const block = window.LNEState.getBlockById(blockId);
        const element = document.getElementById(`block-${blockId}`);
        if (!block || !element || window.LNEState.isBlockLocked(blockId)) return;
        if (mode === 'flow') {
            window.LNEState.updateBlockLayout(blockId, { mode: 'flow' }, 'text-layout-mode');
            return;
        }
        const bounds = getSheetBounds();
        const rect = element.getBoundingClientRect();
        const width = Math.min(Math.max(160,rect.width/bounds.scale), bounds.right - bounds.left);
        window.LNEState.updateBlockLayout(blockId, {
            mode: 'absolute', layer: 'front', zIndex: 15, width,
            x: clamp((rect.left-bounds.rect.left)/bounds.scale, bounds.left, bounds.right - width),
            y: clamp((rect.top-bounds.rect.top)/bounds.scale, bounds.top, Math.max(bounds.top, bounds.bottom - rect.height/bounds.scale))
        }, 'text-layout-mode');
    }

    function changeTextGeometry(blockId, patch) {
        const block = window.LNEState.getBlockById(blockId);
        if (!block || window.LNEState.isBlockLocked(blockId)) return;
        const bounds = getSheetBounds();
        const layout = { ...(block.propiedades?.layout || {}), ...patch };
        layout.width = clamp(Number(layout.width) || 340, 160, bounds.right - bounds.left);
        layout.x = clamp(Number(layout.x) || 0, bounds.left, bounds.right - layout.width);
        const element = document.getElementById(`block-${blockId}`);
        if (element) element.style.width = `${layout.width}px`;
        layout.y = clamp(Number(layout.y) || 0, bounds.top, Math.max(bounds.top, bounds.bottom - (element?.offsetHeight || 100)));
        window.LNEState.updateBlockLayout(blockId, layout);
    }

    function fitFreeObjects(target=sheetContainer) {
        target.style.minHeight='1150px';
        let bottom=1150;
        target.querySelectorAll('.block-absolute-image, .block-absolute-text').forEach(el => {
            bottom=Math.max(bottom,(parseFloat(el.style.top)||0)+el.offsetHeight+70);
        });
        target.style.minHeight=`${Math.ceil(bottom)}px`;
    }

    function snapToGuides(x, width) {
        clearGuides();
        const bounds = getSheetBounds();
        const center = (bounds.left + bounds.right) / 2;
        const stops = [[bounds.left, bounds.left], [center - width / 2, center], [bounds.right - width, bounds.right]];
        sheetContainer.querySelectorAll('.block-absolute-image,.block-absolute-text').forEach(el=>{
            if(el.dataset.blockId===window.LNEState.state.selectedBlockId)return;
            const left=parseFloat(el.style.left)||bounds.left,right=left+el.offsetWidth,mid=(left+right)/2;
            stops.push([left,left],[right-width,right],[mid-width/2,mid]);
        });
        const stop = stops.find(([candidate]) => Math.abs(candidate - x) <= 6);
        if (stop) {
            const guide = document.createElement('div');
            guide.className = 'object-alignment-guide';
            guide.style.left = `${stop[1]}px`;
            guide.style.top = `${bounds.top}px`;
            guide.style.height = `${bounds.bottom - bounds.top}px`;
            sheetContainer.appendChild(guide);
            return stop[0];
        }
        return x;
    }

    function snapYToObjects(y,height) {
        const bounds=getSheetBounds(),stops=[];
        sheetContainer.querySelectorAll('.block-absolute-image,.block-absolute-text').forEach(el=>{
            if(el.dataset.blockId===window.LNEState.state.selectedBlockId)return;
            const top=parseFloat(el.style.top)||bounds.top,bottom=top+el.offsetHeight,mid=(top+bottom)/2;
            stops.push([top,top],[bottom-height,bottom],[mid-height/2,mid]);
        });
        const stop=stops.find(([value])=>Math.abs(value-y)<=6&&value>=bounds.top&&value<=bounds.bottom-height);
        if(!stop)return y;
        const guide=document.createElement('div');guide.className='object-alignment-guide horizontal';guide.style.left=`${bounds.left}px`;guide.style.top=`${stop[1]}px`;guide.style.width=`${bounds.right-bounds.left}px`;sheetContainer.append(guide);return stop[0];
    }

    function clearGuides() {
        sheetContainer.querySelectorAll('.object-alignment-guide').forEach(el => el.remove());
    }

    function applyAbsoluteGeometry(blockEl, geometry) {
        blockEl.classList.add('block-absolute-image');
        blockEl.style.left = `${Math.round(geometry.x)}px`;
        blockEl.style.top = `${Math.round(geometry.y)}px`;
        blockEl.style.width = `${Math.round(geometry.width)}px`;
        blockEl.style.zIndex = String(geometry.zIndex || 1);
    }

    function getImageLayoutFromDom(blockEl, container, image) {
        const bounds = getSheetBounds();
        const imageRect = image.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        return {
            x: Math.round((containerRect.left-bounds.rect.left)/bounds.scale),
            y: Math.round((containerRect.top-bounds.rect.top)/bounds.scale),
            width: Math.round(containerRect.width/bounds.scale),
            height: Math.round(imageRect.height/bounds.scale),
            zIndex: Number(blockEl.style.zIndex) || 1,
            locked: false
        };
    }

    function beginImageMove(e, blockEl, block, container, image) {
        if(!['front','behind'].includes(getImageWrapMode(block)))return beginRelativeManipulation(e,blockEl,block);
        const promote=!['front','behind'].includes(getImageWrapMode(block));
        selectImageVisual(blockEl);
        const initial = getImageLayoutFromDom(blockEl, container, image);
        const initialBounds = getSheetBounds();
        const pointerOffsetX = (e.clientX-initialBounds.rect.left)/initialBounds.scale-initial.x;
        const pointerOffsetY = (e.clientY-initialBounds.rect.top)/initialBounds.scale-initial.y;
        let didMove = false;

        function onPointerMove(moveEvent) {
            const movement = Math.abs(moveEvent.clientX - e.clientX) + Math.abs(moveEvent.clientY - e.clientY);
            if (movement > 2) didMove = true;
            if (!didMove) return;

            if(promote) {
                blockEl.classList.remove('block-float-left','block-float-right','block-image-top-bottom');
                blockEl.classList.add('block-absolute-image','block-front-image');
                Object.assign(blockEl.style,{position:'absolute',padding:'0',margin:'0',paddingTop:'0',shapeOutside:'none',zIndex:'20'});
                blockEl.querySelector('.lne-block-imagen-wrapper')?.classList.add('is-absolute-image');
            }

            const bounds = getSheetBounds();
            applyAbsoluteGeometry(blockEl, {
                ...initial,
                x: snapToGuides(clamp((moveEvent.clientX-bounds.rect.left)/bounds.scale-pointerOffsetX,bounds.left,Math.max(bounds.left,bounds.right-initial.width)),initial.width),
                y: snapYToObjects(clamp((moveEvent.clientY-bounds.rect.top)/bounds.scale-pointerOffsetY,bounds.top,Math.max(bounds.top,bounds.bottom-blockEl.offsetHeight)),blockEl.offsetHeight)
            });
        }

        function onPointerUp() {
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
            document.removeEventListener('pointercancel', onPointerUp);
            clearGuides();
            if (didMove) {
                const geometry=getImageLayoutFromDom(blockEl,container,image);
                if(promote)window.LNEState.updateImageLayout(block.id,{...geometry,mode:'absolute',wrapMode:'front',zIndex:20},'image-layout-commit');
                else window.LNEState.commitImageLayout(block.id, geometry);
            } else {
                window.LNEState.selectBlock(block.id);
            }
        }

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        document.addEventListener('pointercancel', onPointerUp);
    }

    function beginFlowImageMove(e, blockEl, block, container, image) {
        selectImageVisual(blockEl);
        const existing = block.propiedades?.layout || {};
        const wrapMode = getImageWrapMode(block);
        const originalSide = existing.wrapSide || (block.propiedades?.alineacion === 'align-right' ? 'right' : 'left');
        const bounds = getSheetBounds();
        let didMove = false;
        let nextSide = originalSide;
        let nextOffset = Number(existing.flowOffsetY) || 0;
        const grabY = e.clientY - container.getBoundingClientRect().top;
        let targetIndex = window.LNEState.state.bloques.findIndex(item => item.id === block.id);

        function onPointerMove(moveEvent) {
            const dx = moveEvent.clientX - e.clientX;
            const dy = moveEvent.clientY - e.clientY;
            if (Math.abs(dx) + Math.abs(dy) > 2) didMove = true;
            if (!didMove) return;
            if (wrapMode === 'square') {
                nextSide = moveEvent.clientX < bounds.rect.left + (bounds.left + bounds.right) / 2*bounds.scale ? 'left' : 'right';
                blockEl.classList.toggle('block-float-left', nextSide === 'left');
                blockEl.classList.toggle('block-float-right', nextSide === 'right');
            }
            const candidates = Array.from(sheetContainer.querySelectorAll('.lne-editor-block')).filter(el => el !== blockEl && !el.classList.contains('block-absolute-image') && !el.classList.contains('block-absolute-text'));
            const target = candidates.find(el => moveEvent.clientY < el.getBoundingClientRect().bottom);
            if (target) {
                const index = window.LNEState.state.bloques.findIndex(item => item.id === target.dataset.blockId);
                // Cuadrado se ancla antes del texto que debe rodearlo; inline respeta arriba/abajo.
                const before = wrapMode === 'square' || moveEvent.clientY < target.getBoundingClientRect().top + target.offsetHeight / 2;
                targetIndex = index + (before ? 0 : 1);
                const anchor = sheetContainer.querySelector(`.block-insert-gap[data-insert-index="${targetIndex}"]`);
                if (anchor) anchor.parentElement.insertBefore(blockEl, anchor.nextSibling);
                if (wrapMode === 'square') {
                    nextOffset=clamp((moveEvent.clientY-grabY-target.getBoundingClientRect().top)/bounds.scale,0,800);
                    applySquareOffset(blockEl,nextOffset);
                    blockEl.querySelector('.block-controls').style.top=`${nextOffset - 65}px`;
                }
            } else if (candidates.length) {
                targetIndex = window.LNEState.state.bloques.length;
                blockEl.parentElement.appendChild(blockEl);
            }
            blockEl.classList.add('flow-image-moving');
        }

        function onPointerUp() {
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
            document.removeEventListener('pointercancel', onPointerUp);
            if (didMove) {
                window.LNEState.commitImageFlowMove(block.id, targetIndex, {
                    ...existing,
                    mode: 'flow',
                    wrapMode,
                    wrapSide: nextSide,
                    flowOffsetY: nextOffset,
                    x: 0,
                    y: 0,
                    width: Math.round(container.offsetWidth),
                    height: Math.round(image.getBoundingClientRect().height/bounds.scale)
                });
            } else {
                window.LNEState.selectBlock(block.id);
            }
        }

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        document.addEventListener('pointercancel', onPointerUp);
    }

    function beginAbsoluteImageResize(e, blockEl, block, container, handleType) {
        if (window.LNEState.isBlockLocked(block.id)) return;
        if(window.LNEState.getBlockMode(block)!=='absolute')return beginRelativeManipulation(e,blockEl,block,handleType);
        e.preventDefault();
        e.stopPropagation();
        selectImageVisual(blockEl);
        const image = container.querySelector('.lne-block-imagen');
        if (!image) return;

        const initial = getImageLayoutFromDom(blockEl, container, image);
        const promote=window.LNEState.getBlockMode(block)!=='absolute';
        const aspectRatio = initial.width / Math.max(1, initial.height);
        const isWest = handleType.includes('w');
        const isNorth = handleType.includes('n');
        const isCorner = ['nw', 'ne', 'se', 'sw'].includes(handleType);
        let changed = false;

        function onPointerMove(moveEvent) {
            const dx = (moveEvent.clientX - e.clientX)/getSheetBounds().scale;
            const dy = (moveEvent.clientY - e.clientY)/getSheetBounds().scale;
            if (Math.abs(dx) + Math.abs(dy) > 2) changed = true;
            if(!changed)return;
            if(promote) {
                blockEl.classList.remove('block-float-left','block-float-right','block-image-top-bottom');
                blockEl.classList.add('block-absolute-image','block-front-image');
                Object.assign(blockEl.style,{position:'absolute',padding:'0',paddingTop:'0',margin:'0',shapeOutside:'none',zIndex:'20'});
                blockEl.querySelector('.lne-block-imagen-wrapper')?.classList.add('is-absolute-image');
            }
            let nextWidth;

            if (isCorner) {
                const scaleX = (initial.width + (isWest ? -dx : dx)) / initial.width;
                const scaleY = (initial.height + (isNorth ? -dy : dy)) / initial.height;
                nextWidth = initial.width * (Math.abs(scaleX - 1) > Math.abs(scaleY - 1) ? scaleX : scaleY);
            } else if(handleType==='n'||handleType==='s') {
                nextWidth=(initial.height+(handleType==='n'?-dy:dy))*aspectRatio;
            } else {
                nextWidth = initial.width + (isWest ? -dx : dx);
            }

            const bounds = getSheetBounds();
            const maxWidth = isWest ? initial.x + initial.width - bounds.left : bounds.right - initial.x;
            const maxHeight = (isNorth ? initial.y + initial.height - bounds.top : bounds.bottom - initial.y) - Math.max(0, blockEl.offsetHeight - image.offsetHeight);
            const minimum=block.propiedades?.visualIcon?16:100;
            nextWidth = clamp(nextWidth, Math.min(minimum, maxWidth), Math.min(maxWidth, Math.max(minimum, maxHeight * aspectRatio)));
            const nextHeight = nextWidth / aspectRatio;
            const captionHeight = Math.max(0, blockEl.offsetHeight - initial.height);
            const nextX = clamp(isWest ? initial.x + initial.width - nextWidth : initial.x, bounds.left, Math.max(bounds.left, bounds.right - nextWidth));
            const nextY = clamp(isNorth ? initial.y + initial.height - nextHeight : initial.y, bounds.top, Math.max(bounds.top, bounds.bottom - nextHeight - captionHeight));
            applyAbsoluteGeometry(blockEl, { ...initial, x: nextX, y: nextY, width: nextWidth });
        }

        function onPointerUp() {
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
            document.removeEventListener('pointercancel', onPointerUp);
            if(changed) {
                const geometry=getImageLayoutFromDom(blockEl,container,image);
                if(promote)window.LNEState.updateImageLayout(block.id,{...geometry,mode:'absolute',wrapMode:'front',zIndex:20},'image-layout-commit');
                else window.LNEState.commitImageLayout(block.id, geometry);
            }
        }

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        document.addEventListener('pointercancel', onPointerUp);
    }

    /**
     * Barra Contextual de Tabla: Añadir/Eliminar Filas y Columnas
     */
    function bindTableContextEvents(blockEl, block) {
        const btnAddRow = blockEl.querySelector('[data-table-action="add-row"]');
        const btnDelRow = blockEl.querySelector('[data-table-action="delete-row"]');
        const btnAddCol = blockEl.querySelector('[data-table-action="add-col"]');
        const btnDelCol = blockEl.querySelector('[data-table-action="delete-col"]');
        const btnDelTable = blockEl.querySelector('[data-table-action="delete-table"]');

        if (btnAddRow) {
            btnAddRow.addEventListener('click', (e) => {
                e.stopPropagation();
                window.LNEState.addTableRow(block.id);
            });
        }
        if (btnDelRow) {
            btnDelRow.addEventListener('click', (e) => {
                e.stopPropagation();
                window.LNEState.deleteTableRow(block.id);
            });
        }
        if (btnAddCol) {
            btnAddCol.addEventListener('click', (e) => {
                e.stopPropagation();
                window.LNEState.addTableColumn(block.id);
            });
        }
        if (btnDelCol) {
            btnDelCol.addEventListener('click', (e) => {
                e.stopPropagation();
                window.LNEState.deleteTableColumn(block.id);
            });
        }
        if (btnDelTable) {
            btnDelTable.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm("¿Estás seguro de que deseas eliminar toda la tabla?")) {
                    window.LNEState.removeBlock(block.id);
                }
            });
        }
    }

    /**
     * Sincronización Bidireccional de contenido editable con el Estado
     */
    function bindContentEditableSync(blockEl, block) {
        const cleanHTML = editable => {
            const clone = editable.cloneNode(true);
            clone.querySelectorAll('[data-list-marker]').forEach(marker=>marker.remove());
            clone.querySelectorAll('.lne-wrap-proxy').forEach(proxy=>proxy.remove());
            clone.querySelectorAll('[data-list-empty]').forEach(empty=>{empty.innerHTML=empty.innerHTML.replace(/\u200b/g,'');empty.replaceWith(...empty.childNodes);});
            clone.querySelectorAll('[data-list-content]').forEach(content=>content.replaceWith(...content.childNodes));
            clone.querySelectorAll('.inline-icon-selected').forEach(icon => icon.classList.remove('inline-icon-selected'));
            return clone.innerHTML;
        };
        const editables = blockEl.querySelectorAll('[contenteditable="true"]');
        editables.forEach(editable => {
            editable.addEventListener('beforeinput', () => window.LNEState.recordTextEdit(block.id));
            editable.addEventListener('input', () => {
                // 1. Campo estándar
                const field = editable.dataset.field;
                if (field) {
                    window.LNEState.updateBlockContent(block.id, field, cleanHTML(editable));
                    return;
                }

                // 2. Encabezados de tabla
                const headerIdx = editable.dataset.headerIndex;
                if (headerIdx !== undefined && block.propiedades?.headers) {
                    block.propiedades.headers[parseInt(headerIdx, 10)] = cleanHTML(editable);
                    window.LNEState.scheduleAutosave();
                    return;
                }

                // 3. Celdas de tabla
                const rowIdx = editable.dataset.rowIndex;
                const colIdx = editable.dataset.colIndex;
                if (rowIdx !== undefined && colIdx !== undefined && block.propiedades?.rows) {
                    const r = parseInt(rowIdx, 10);
                    const c = parseInt(colIdx, 10);
                    if (block.propiedades.rows[r]) {
                        block.propiedades.rows[r][c] = cleanHTML(editable);
                        window.LNEState.scheduleAutosave();
                    }
                    return;
                }

                // 4. Elementos de lista
                const listIdx = editable.dataset.listIndex;
                if (listIdx !== undefined && block.propiedades?.items) {
                    block.propiedades.items[parseInt(listIdx, 10)] = cleanHTML(editable);
                    const marker=editable.querySelector('[data-list-marker]'),expected=window.LNELists.markers(block,window.LNEState.state.bloques)[Number(listIdx)];
                    if(!editable.querySelector('.icon-bullet')&&(!marker||marker.textContent.trim()!==expected)) {
                        window.LNEState.changeTextBlockType(block.id,'parrafo');
                        addFocus(block.id);return;
                    }
                    window.LNEState.scheduleAutosave();
                    return;
                }

                // 5. Columnas de cuadros
                const boxColIdx = editable.dataset.colIndex;
                if (boxColIdx !== undefined && block.propiedades?.columnas) {
                    block.propiedades.columnas[parseInt(boxColIdx, 10)] = cleanHTML(editable);
                    window.LNEState.scheduleAutosave();
                    return;
                }
            });

            // Soporte para Enter y Backspace en listas
            if (editable.dataset.listIndex !== undefined) {
                function exitEmptyItem(currentIdx) {
                    const state=window.LNEState.state,position=state.bloques.indexOf(block),original=JSON.parse(JSON.stringify(block.propiedades)),restItems=original.items.slice(currentIdx+1),restLevels=(original.itemLevels||[]).slice(currentIdx+1);
                    block.propiedades.items.splice(currentIdx);block.propiedades.itemLevels=(original.itemLevels||[]).slice(0,currentIdx);
                    const paragraph=window.LNEComponents.createBlock('parrafo','');
                    paragraph.propiedades={estilo:original.estilo};
                    if(original.layout?.mode==='absolute'){
                        const bounds=getSheetBounds(),rect=editable.getBoundingClientRect();
                        paragraph.propiedades.layout={...original.layout,y:(rect.top-bounds.rect.top)/bounds.scale};
                    }
                    const replacements=block.propiedades.items.length?[block,paragraph]:[paragraph];
                    if(restItems.length){const rest=window.LNEComponents.createBlock('lista',original.formato,restItems);rest.propiedades={...original,items:restItems,itemLevels:restLevels,startValue:window.LNELists.start(block,state.bloques)+original.items.slice(0,currentIdx+1).filter((_,i)=>!original.itemLevels?.[i]).length,continueFrom:null};if(rest.propiedades.layout?.mode==='absolute')rest.propiedades.layout={...rest.propiedades.layout,y:paragraph.propiedades.layout.y+40};replacements.push(rest);}
                    state.bloques.splice(position,1,...replacements);state.selectedBlockId=paragraph.id;window.LNEState.notify('list-exit');addFocus(paragraph.id,undefined,true);
                }
                editable.addEventListener('keydown', (e) => {
                    const currentIdx = parseInt(editable.dataset.listIndex, 10);
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        const levels = [...(block.propiedades.itemLevels || block.propiedades.items.map(() => 0))];
                        levels[currentIdx] = clamp((Number(levels[currentIdx]) || 0) + (e.shiftKey ? -1 : 1), 0, 8);
                        window.LNEState.updateBlockProperties(block.id, { itemLevels: levels });
                        focusListItem(block.id, currentIdx);
                    } else if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        window.LNEState.snapshot();
                        const content=document.createElement('div');content.innerHTML=cleanHTML(editable);
                        if (!content.textContent.trim()) {
                            exitEmptyItem(currentIdx);
                        } else {
                            const selection = window.getSelection();
                            let tail = '';
                            if (selection?.rangeCount && editable.contains(selection.anchorNode)) {
                                const range = selection.getRangeAt(0);
                                range.deleteContents();
                                const restRange = range.cloneRange();
                                restRange.setEnd(editable, editable.childNodes.length);
                                const holder = document.createElement('div');
                                holder.appendChild(restRange.extractContents());
                                holder.querySelectorAll('[data-list-marker]').forEach(marker=>marker.remove());
                                tail = cleanHTML(holder);
                            }
                            const levels = [...(block.propiedades.itemLevels || block.propiedades.items.map(() => 0))];
                            block.propiedades.items[currentIdx] = cleanHTML(editable);
                            block.propiedades.items.splice(currentIdx + 1, 0, tail);
                            levels.splice(currentIdx + 1, 0, Number(levels[currentIdx]) || 0);
                            block.propiedades.itemLevels = levels;
                            window.LNEState.notify('list-item-add');
                            focusListItem(block.id, currentIdx + 1);
                        }
                    } else if (e.key === 'Backspace' && !cleanHTML(editable).replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').trim()) {
                        e.preventDefault();
                        window.LNEState.snapshot();
                        const levels=[...(block.propiedades.itemLevels||block.propiedades.items.map(()=>0))];
                        if(Number(levels[currentIdx])>0){levels[currentIdx]--;block.propiedades.itemLevels=levels;window.LNEState.notify('list-outdent');focusListItem(block.id,currentIdx);}
                        else exitEmptyItem(currentIdx);
                    }
                });
            }
        });
    }

    function addFocus(blockId, listIndex, immediate=false) {
        const focus=() => {
            const selector = listIndex === undefined ? '[contenteditable="true"]' : `[data-list-index="${listIndex}"]`;
            const editable = document.getElementById(`block-${blockId}`)?.querySelector(selector);
            if (!editable) return;
            editable.focus();
            const range = document.createRange();
            range.selectNodeContents(editable);
            const content=listIndex!==undefined?editable.querySelector('[data-list-content]'):null;
            const empty=content?.querySelector('[data-list-empty]')?.firstChild;
            if(empty){range.setStart(empty,empty.textContent.length);range.collapse(true);}
            else if(content){range.selectNodeContents(content);range.collapse(true);}
            else range.collapse(listIndex !== undefined);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };if(immediate)focus();else requestAnimationFrame(focus);
    }

    function focusListItem(blockId, index) { addFocus(blockId, index,true); }

    function renderDocument(state, {editable=false}={}) {
        const original=sheetContainer;
        const staging=document.createElement('div');
        staging.style.cssText='position:fixed;left:-10000px;top:0;visibility:hidden;width:860px;';
        const target=document.createElement('div');
        target.className='document-sheet lne-document-body lne-rendered-sheet';
        target.style.cssText='position:relative;box-sizing:border-box;width:860px;max-width:none;padding:70px 85px;';
        staging.appendChild(target);document.body.appendChild(staging);
        try {
            sheetContainer=target;
            render({...state,previewMode:false});
            if(!editable) {
                target.classList.add('lne-readonly-sheet');
                target.querySelectorAll('.block-controls,.block-copy-check,.object-resize-handle,.img-resize-handle,.object-move-zone,.table-context-bar,.image-context-bar,.block-insert-menu,.document-clean-state button').forEach(el=>el.remove());
                target.querySelectorAll('.block-insert-gap').forEach(el=>el.replaceChildren());
                target.querySelectorAll('[contenteditable]').forEach(el=>{
                    if(!el.textContent.trim()&&!el.querySelector('img,svg'))el.style.minHeight=getComputedStyle(el).height;
                    el.removeAttribute('contenteditable');
                });
                target.querySelectorAll('[data-list-empty]').forEach(el=>el.remove());
                target.querySelectorAll('.selected,.inline-icon-selected').forEach(el=>el.classList.remove('selected','inline-icon-selected'));
                target.querySelectorAll('.multi-selected').forEach(el=>el.classList.remove('multi-selected'));
                target.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
            }
            return target;
        } finally {sheetContainer=original;staging.remove();}
    }

    return {
        init,
        render,
        renderDocument,
        getImageWrapMode,
        changeImageWrap,
        changeSquareOffset,
        changeImageWidth,
        replaceImage,
        changeTextMode,
        changeTextGeometry
    };
})();
