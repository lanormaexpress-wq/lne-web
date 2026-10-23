/**
 * TOOLBAR.JS - Controlador de Barra Fija, Importación de Word y Herramientas Contextuales
 */

window.LNEToolbar = (function () {
    let secondaryToolbarEl = null;
    let btnDisenoJuridicoEl = null;

    let savedRange = null;
    let savedActiveBlockId = null;
    let savedSelectedText = "";
    let insertionIndex = -1;
    let pendingImageInsertionIndex = -1;
    let pendingConfigInsertionIndex = -1;
    let inspectorRenderer=null,selectedInlineIcon=null;
    const iconCategories=window.LNEComponents.getIconCatalog();

    function init() {
        secondaryToolbarEl = document.getElementById('secondary-toolbar');
        btnDisenoJuridicoEl = document.getElementById('btn-diseno-juridico');

        trackSelection();
        bindHistoryActions();
        bindFormattingActions();
        bindListGalleries();
        bindStructuralInsertions();
        bindDisenoJuridicoTray();
        bindInsertPanel();
        bindContextInspector();
        bindTopNavActions();
        bindWordImportActions();
        bindNewDocumentModal();
        bindTableConfigModal();
        bindCuadroConfigModal();
        document.addEventListener('click',event=>{
            const icon=event.target.closest('.lne-inline-legal-icon,.lne-inline-image');
            if(icon&&icon.closest('#document-sheet')){event.preventDefault();event.stopPropagation();selectInlineIcon(icon);}
            if(!event.target.closest('.block-controls'))document.querySelectorAll('.block-object-menu').forEach(el=>el.hidden=true);
        });
        window.LNEState.subscribe((state, type) => {
            if (!['set-document','reset','load-storage'].includes(type)) return;
            savedRange = null; savedActiveBlockId = null; savedSelectedText = '';
            selectedInlineIcon=null;
            insertionIndex = pendingImageInsertionIndex = pendingConfigInsertionIndex = -1;
            document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
            document.querySelectorAll('.modal-overlay.open,.web-preview-modal.open').forEach(el=>el.classList.remove('open'));
            document.getElementById('web-preview-content').innerHTML = '';
        });
    }

    /**
     * Rastreo persistente de la selección y del bloque activo en el documento
     */
    function trackSelection() {
        document.addEventListener('selectionchange', () => {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                const container = range.commonAncestorContainer;
                const sheet = document.getElementById('document-sheet');
                if (sheet && sheet.contains(container)) {
                    savedRange = range.cloneRange();
                    savedSelectedText = sel.toString();
                    const blockEl = container.nodeType === Node.ELEMENT_NODE
                        ? container.closest('.lne-editor-block')
                        : container.parentElement?.closest('.lne-editor-block');
                    if (blockEl && blockEl.dataset.blockId) {
                        savedActiveBlockId = blockEl.dataset.blockId;
                    }
                }
            }
        });

        // Actualizar bloque activo con click directo
        document.addEventListener('mousedown', (e) => {
            if (e.altKey) return;
            // Las imágenes libres gestionan su selección al finalizar Pointer Events.
            // Evita un render global entre pointerdown y pointerup durante el arrastre.
            if (e.target.closest('.lne-block-imagen')) return;
            const blockEl = e.target.closest('.lne-editor-block');
            if (blockEl && blockEl.dataset.blockId) {
                savedActiveBlockId = blockEl.dataset.blockId;
                window.LNEState.selectBlock(savedActiveBlockId);
            }
        });
    }

    function restoreSelection() {
        if (!savedRange || !document.getElementById('document-sheet')?.contains(savedRange.commonAncestorContainer)) return false;
        const sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(savedRange);
            return true;
        }
        return false;
    }

    function bindHistoryActions() {
        const btnUndo = document.getElementById('tool-undo');
        const btnRedo = document.getElementById('tool-redo');

        if (btnUndo) btnUndo.addEventListener('click', () => window.LNEState.undo());
        if (btnRedo) btnRedo.addEventListener('click', () => window.LNEState.redo());
    }

    /**
     * Motor de Edición Real de Texto sobre Selección (Selection API / Range)
     */
    function bindFormattingActions() {
        const btnBold = document.getElementById('tool-bold');
        const btnItalic = document.getElementById('tool-italic');
        const btnUnderline = document.getElementById('tool-underline');

        const btnAlignLeft = document.getElementById('tool-align-left');
        const btnAlignCenter = document.getElementById('tool-align-center');
        const btnAlignRight = document.getElementById('tool-align-right');
        const btnAlignJustify = document.getElementById('tool-align-justify');

        const selectFont = document.getElementById('tool-font-family');
        const selectSize = document.getElementById('tool-font-size');
        const inputCustomSize = document.getElementById('tool-custom-size');

        // Evitar que los botones de formato roben el foco del texto seleccionado
        const btnBullets = document.getElementById('tool-list-bullets');
        const btnNumbers = document.getElementById('tool-list-numbers');
        const btnMultilevel = document.getElementById('tool-list-multilevel');
        [btnBold, btnItalic, btnUnderline, btnAlignLeft, btnAlignCenter, btnAlignRight, btnAlignJustify, btnBullets, btnNumbers,btnMultilevel].forEach(btn => {
            if (btn) {
                btn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                });
            }
        });

        if (btnBold) btnBold.addEventListener('click', () => applyFormatCommand('bold'));
        if (btnItalic) btnItalic.addEventListener('click', () => applyFormatCommand('italic'));
        if (btnUnderline) btnUnderline.addEventListener('click', () => applyFormatCommand('underline'));
        if (btnBullets) btnBullets.addEventListener('click', () => applyListFormat('vinetas'));
        if (btnNumbers) btnNumbers.addEventListener('click', () => applyListFormat('numerada'));
        if (btnMultilevel) btnMultilevel.addEventListener('click', () => applyListFormat('multinivel'));

        if (btnAlignLeft) btnAlignLeft.addEventListener('click', () => applyAlignment('left'));
        if (btnAlignCenter) btnAlignCenter.addEventListener('click', () => applyAlignment('center'));
        if (btnAlignRight) btnAlignRight.addEventListener('click', () => applyAlignment('right'));
        if (btnAlignJustify) btnAlignJustify.addEventListener('click', () => applyAlignment('justify'));

        if (selectFont) {
            selectFont.addEventListener('mousedown', (e) => {
                // Guardar la selección antes de que el select se despliegue
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) savedRange = sel.getRangeAt(0).cloneRange();
            });
            selectFont.addEventListener('change', () => {
                const font = selectFont.value;
                if (!font) return;
                applyInlineStyle('fontFamily', font);
            });
        }

        if (selectSize) {
            selectSize.addEventListener('mousedown', (e) => {
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) savedRange = sel.getRangeAt(0).cloneRange();
            });
            selectSize.addEventListener('change', () => {
                const size = selectSize.value;
                if (!size) return;
                if (inputCustomSize) inputCustomSize.value = parseInt(size, 10);
                applyInlineStyle('fontSize', size);
            });
        }

        if (inputCustomSize) {
            inputCustomSize.addEventListener('change', () => {
                const px = parseFloat(inputCustomSize.value);
                if (px && px >= 6 && px <= 120) {
                    applyInlineStyle('fontSize', `${px}px`);
                }
            });
        }
    }

    function applyFormatCommand(cmd) {
        restoreSelection();
        document.execCommand(cmd, false, null);
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            savedRange = sel.getRangeAt(0).cloneRange();
            const node = sel.anchorNode;
            const el = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
            el?.closest('[contenteditable="true"]')?.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    function applyListFormat(formato) {
        const block = window.LNEState.getBlockById(window.LNEState.state.selectedBlockId || savedActiveBlockId);
        if (!block) return;
        if (block.tipo === 'lista') {
            window.LNEState.changeTextBlockType(block.id, block.propiedades?.formato === formato ? 'parrafo' : formato);
            focusInsertedBlock(block.id);
        } else if (['parrafo', 'titulo'].includes(block.tipo)) {
            window.LNEState.changeTextBlockType(block.id, formato);
            focusInsertedBlock(block.id);
        } else {
            applyFormatCommand(formato === 'numerada' ? 'insertOrderedList' : 'insertUnorderedList');
        }
    }

    function bindListGalleries() {
        const gallery=document.createElement('div');gallery.className='list-gallery';gallery.hidden=true;gallery.setAttribute('role','dialog');document.body.appendChild(gallery);
        let trigger=null,activeId=null;
        function close(){gallery.hidden=true;trigger?.setAttribute('aria-expanded','false');}
        document.querySelectorAll('[data-list-gallery]').forEach(button=>{
            button.addEventListener('mousedown',event=>event.preventDefault());
            button.addEventListener('click',()=>{
                if(trigger===button&&!gallery.hidden){close();return;}
                close();trigger=button;activeId=window.LNEState.state.selectedBlockId||savedActiveBlockId;
                const block=window.LNEState.getBlockById(activeId);if(!block||!['parrafo','titulo','lista'].includes(block.tipo))return;
                const type=button.dataset.listGallery,current=window.LNELists.settings(block);
                gallery.replaceChildren();gallery.setAttribute('aria-label',button.getAttribute('aria-label'));
                const heading=document.createElement('strong');heading.textContent=button.getAttribute('aria-label');gallery.appendChild(heading);
                const grid=document.createElement('div');grid.className='list-gallery-grid';gallery.appendChild(grid);
                window.LNELists.styles[type].forEach(([style,label])=>{
                    const option=document.createElement('button');option.type='button';option.dataset.listStyle=style;option.setAttribute('aria-label',label);option.setAttribute('aria-pressed',String(block.tipo==='lista'&&current.type===type&&current.style===style));
                    const example=window.LNEComponents.createBlock('lista',type,['abc','abc','abc']);Object.assign(example.propiedades,{listStyle:style,itemLevels:type==='multinivel'?[0,1,2]:[0,0,0]});
                    option.textContent=window.LNELists.markers(example).map((marker,i)=>`${type==='multinivel'?'  '.repeat(i):''}${marker} abc`).join('\n');
                    option.addEventListener('click',()=>{window.LNEState.setListStyle(activeId,type,style);close();focusInsertedBlock(activeId);});grid.appendChild(option);
                });
                const actions=document.createElement('div');actions.className='list-gallery-actions';gallery.appendChild(actions);
                function action(label,callback){const item=document.createElement('button');item.type='button';item.textContent=label;item.addEventListener('click',callback);actions.appendChild(item);return item;}
                action('Ninguna',()=>{if(window.LNEState.getBlockById(activeId)?.tipo==='lista')window.LNEState.changeTextBlockType(activeId,'parrafo');close();focusInsertedBlock(activeId);});
                if(block.tipo==='lista'&&current.type!=='vinetas') {
                    action('Continuar numeración',()=>{if(window.LNEState.setListStart(activeId,1,true)===false){heading.textContent='No existe una lista anterior';return;}close();focusInsertedBlock(activeId);});
                    action('Reiniciar en 1',()=>{window.LNEState.setListStart(activeId,1);close();focusInsertedBlock(activeId);});
                    action('Establecer valor inicial…',()=>{
                        if(actions.querySelector('form'))return;
                        const form=document.createElement('form');form.className='list-start-form';
                        const input=document.createElement('input');input.type='number';input.min='1';input.max='999999';input.required=true;input.value=window.LNELists.start(block,window.LNEState.state.bloques);input.setAttribute('aria-label','Valor inicial');
                        const submit=document.createElement('button');submit.type='submit';submit.textContent='Aplicar';form.append(input,submit);actions.appendChild(form);input.focus();input.select();
                        form.addEventListener('submit',event=>{event.preventDefault();window.LNEState.setListStart(activeId,input.value);close();focusInsertedBlock(activeId);});
                    });
                }
                gallery.hidden=false;button.setAttribute('aria-expanded','true');
                const r=button.getBoundingClientRect();gallery.style.left=`${Math.max(8,Math.min(r.left,innerWidth-gallery.offsetWidth-8))}px`;gallery.style.top=`${Math.max(8,Math.min(r.bottom+5,innerHeight-gallery.offsetHeight-8))}px`;
            });
        });
        document.addEventListener('mousedown',event=>{if(!gallery.contains(event.target)&&!event.target.closest('[data-list-gallery]'))close();});
        document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!gallery.hidden){close();trigger?.focus();}});
        document.addEventListener('contextmenu',event=>{
            const el=event.target.closest('#document-sheet .block-type-lista');if(!el)return;
            event.preventDefault();window.LNEState.selectBlock(el.dataset.blockId);
            const block=window.LNEState.getBlockById(el.dataset.blockId),type=window.LNELists.settings(block).type;
            close();document.querySelector(`[data-list-gallery="${type}"]`)?.click();
        });
        window.addEventListener('resize',close);document.addEventListener('scroll',close,true);
        window.LNEState.subscribe((_,type)=>{if(['reset','set-document','load-storage','undo','redo'].includes(type))close();});
    }

    /**
     * Aplica estilos inline (tamaño o fuente) exclusivamente a la selección activa,
     * permitiendo alternar de tamaño grande a pequeño y viceversa sin colisiones de spans anidados.
     */
    function applyInlineStyle(styleProp, styleValue) {
        if(styleProp==='fontSize'&&window.LNETypography)return window.LNETypography.apply(styleValue);
        restoreSelection();
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        const anchor = sel.anchorNode;
        const anchorEl = anchor?.nodeType === Node.ELEMENT_NODE ? anchor : anchor?.parentElement;
        const activeBlock = anchorEl?.closest('.lne-editor-block');
        if (activeBlock) window.LNEState.recordTextEdit(activeBlock.dataset.blockId);

        // Caso 1: Cursor sin selección de texto -> Aplicar al bloque o editable activo
        if (sel.isCollapsed) {
            const node = sel.anchorNode;
            const el = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
            const editable = el?.closest('[contenteditable="true"]');
            if (editable) {
                const span = document.createElement('span');
                span.style[styleProp] = styleValue;
                while (editable.firstChild) span.appendChild(editable.firstChild);
                editable.appendChild(span);
                const range = document.createRange();
                range.selectNodeContents(span);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
                savedRange = range.cloneRange();
                editable.dispatchEvent(new Event('input', { bubbles: true }));
            }
            return;
        }

        // Caso 2: Hay texto seleccionado real -> Aplicar al fragmento exacto
        const range = sel.getRangeAt(0);

        // Si la selección abarca un span completo existente con esa misma propiedad, actualizarlo directamente
        const common = range.commonAncestorContainer;
        let parentSpan = common.nodeType === Node.ELEMENT_NODE ? common : common.parentElement;
        if (parentSpan && parentSpan.tagName === 'SPAN' && parentSpan.style[styleProp] && range.toString() === parentSpan.textContent) {
            parentSpan.style[styleProp] = styleValue;
            parentSpan.closest('[contenteditable="true"]')?.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        }

        // Extraer contenido de la selección
        const fragment = range.extractContents();

        // Limpiar cualquier span hijo existente con la misma propiedad para evitar anidamientos conflictivos
        const existingSpans = fragment.querySelectorAll('span');
        existingSpans.forEach(s => {
            s.style[styleProp] = '';
            if (!s.getAttribute('style') || s.getAttribute('style').trim() === '') {
                const parent = s.parentNode;
                if (parent) {
                    while (s.firstChild) parent.insertBefore(s.firstChild, s);
                    parent.removeChild(s);
                }
            }
        });

        // Crear nuevo span envolvente limpio
        const span = document.createElement('span');
        span.style[styleProp] = styleValue;
        span.appendChild(fragment);

        range.insertNode(span);

        // Mantener seleccionada la parte modificada
        sel.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        sel.addRange(newRange);
        savedRange = newRange.cloneRange();

        // Disparar autosave
        const editable = span.closest('[contenteditable="true"]');
        if (editable) {
            editable.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    /**
     * Aplica alineación real al bloque o párrafo correspondiente
     */
    function applyAlignment(alignValue) {
        restoreSelection();
        const sel = window.getSelection();
        let editable = null;

        // Caso 1 y 2: cursor o Range dentro de un único contenteditable.
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            const node = range.commonAncestorContainer;
            const element = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
            editable = element?.closest('[contenteditable="true"]') || null;
        }

        // Caso 3: sin Range textual útil; usar solo el editable principal del bloque seleccionado.
        const blockEl = editable?.closest('.lne-editor-block') ||
            (savedActiveBlockId ? document.getElementById(`block-${savedActiveBlockId}`) : null);
        if (!editable && blockEl) {
            editable = blockEl.querySelector('[contenteditable="true"]');
        }
        if (!editable || !blockEl?.dataset.blockId) return;

        editable.style.textAlign = alignValue;
        const blockId = blockEl.dataset.blockId;
        const targetKey = getAlignmentTargetKey(editable);
        const block = window.LNEState.getBlockById(blockId);
        const editableCount = blockEl.querySelectorAll('[contenteditable="true"]').length;
        const isBlockLevelAlignment = editableCount === 1 || block?.tipo === 'lista';

        window.LNEState.updateBlockAlignment(blockId, alignValue, targetKey, {
            setBlockAlignment: isBlockLevelAlignment,
            notify: false
        });
    }

    function getAlignmentTargetKey(editable) {
        if (editable.dataset.field) return `field:${editable.dataset.field}`;
        if (editable.dataset.listIndex !== undefined) return `list:${editable.dataset.listIndex}`;
        if (editable.dataset.headerIndex !== undefined) return `header:${editable.dataset.headerIndex}`;
        if (editable.dataset.rowIndex !== undefined && editable.dataset.colIndex !== undefined) {
            return `cell:${editable.dataset.rowIndex}:${editable.dataset.colIndex}`;
        }
        if (editable.dataset.colIndex !== undefined) return `column:${editable.dataset.colIndex}`;
        return null;
    }

    function consumeInsertIndex() {
        if (insertionIndex >= 0) {
            const index = insertionIndex;
            insertionIndex = -1;
            return index;
        }
        if (savedActiveBlockId) {
            const idx = window.LNEState.state.bloques.findIndex(b => b.id === savedActiveBlockId);
            if (idx !== -1) return idx + 1;
        }
        return -1;
    }

    function focusInsertedBlock(blockId) {
        requestAnimationFrame(() => {
            const el = document.getElementById(`block-${blockId}`);
            const editable = el?.querySelector('[contenteditable="true"]');
            if (editable) {
                editable.focus();
                const range = document.createRange();
                range.selectNodeContents(editable);
                range.collapse(false);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
    }

    function setComponentText(block, text) {
        const value = text || '';
        const properties = block.propiedades || (block.propiedades = {});
        if ('texto' in properties) properties.texto = value;
        else if ('contenido' in properties) properties.contenido = value;
        else if ('criterio' in properties) properties.criterio = value;
    }

    // Transformar conserva el ID y el lugar del párrafo: no crea una tarjeta duplicada.
    function transformOrInsertLegal(tipo) {
        const active = window.LNEState.getBlockById(window.LNEState.state.selectedBlockId || savedActiveBlockId);
        const block = window.LNEComponents.createBlock(tipo);
        const selectedText = savedSelectedText.trim();
        const compatible = active && ['parrafo', 'titulo', 'lista'].includes(active.tipo);
        if (compatible && insertionIndex < 0) {
            const source = active.texto || active.propiedades?.items?.map(item => `<p>${item}</p>`).join('') || active.propiedades?.texto || active.propiedades?.contenido || '';
            setComponentText(block, source);
            window.LNEState.transformBlock(active.id, block);
            savedSelectedText = '';
            focusInsertedBlock(active.id);
            return;
        }
        setComponentText(block, selectedText);
        window.LNEState.addBlock(block, consumeInsertIndex());
        savedSelectedText = '';
        focusInsertedBlock(block.id);
    }

    function bindInsertPanel() {
        const panel = document.getElementById('insert-panel');
        const toggle = document.getElementById('btn-toggle-insert');
        const legalTarget = document.getElementById('legal-insert-actions');
        if (toggle && panel) toggle.addEventListener('click', () => innerWidth<=1120?window.LNEResponsive.close():panel.classList.toggle('collapsed'));
        const inlineIcon=document.getElementById('insert-inline-icon');
        inlineIcon.addEventListener('mousedown',event=>event.preventDefault());
        inlineIcon.addEventListener('click',()=>{
            if(!restoreSelection()){alert('Coloca primero el cursor dentro de un texto.');return;}
            const range=savedRange.cloneRange(),epoch=window.LNEState.documentEpoch;
            openIconPicker(values=>{
                if(epoch!==window.LNEState.documentEpoch||!document.getElementById('document-sheet').contains(range.commonAncestorContainer))return;
                const node=range.commonAncestorContainer.nodeType===Node.ELEMENT_NODE?range.commonAncestorContainer:range.commonAncestorContainer.parentElement;
                const editable=node.closest('[contenteditable="true"]'),block=editable?.closest('.lne-editor-block');if(!block)return;
                window.LNEState.snapshot();
                const icon=document.createElement('span');icon.className='lne-inline-legal-icon';icon.contentEditable='false';icon.dataset.inlineIconId=crypto.randomUUID();
                paintIcon(icon,values);
                if(values.usage!=='cursor'){range.selectNodeContents(editable);range.collapse(true)}else range.collapse(false);
                range.insertNode(icon);syncIconBullet(icon);range.setStartAfter(icon);range.collapse(true);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);savedRange=range.cloneRange();
                editable.dispatchEvent(new Event('input',{bubbles:true}));selectInlineIcon(icon);editable.focus();
            });
        });

        if (legalTarget) {
            window.LNEComponents.getLegalComponents().forEach(comp => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'insert-action legal-action';
                button.innerHTML = `<i class="fa-solid ${comp.icon}"></i><span>${comp.label}</span>`;
                button.addEventListener('mousedown', e => e.preventDefault());
                button.addEventListener('click', () => transformOrInsertLegal(comp.tipo));
                legalTarget.appendChild(button);
            });
        }

        document.querySelectorAll('[data-insert-type]').forEach(button => {
            button.addEventListener('click', () => insertAt(button.dataset.insertType, consumeInsertIndex()));
        });
    }

    function insertAt(type, index = -1) {
        const count = window.LNEState.state.bloques.length;
        index = index < 0 ? count : Math.max(0, Math.min(count, index));
        if (type === 'imagen') {
            pendingImageInsertionIndex = index;
            document.getElementById('hidden-image-input')?.click();
            return;
        }
        if (type === 'tabla' || type === 'cuadro') {
            pendingConfigInsertionIndex = index;
            document.getElementById(`modal-config-${type === 'tabla' ? 'tabla' : 'cuadro'}`)?.classList.add('open');
            return;
        }
        const args = type === 'titulo' ? [1, ''] : type === 'subtitulo' ? [2, ''] : type === 'parrafo' ? [''] : type === 'lista' ? ['vinetas', ['']] : [];
        const block = window.LNEComponents.createBlock(type === 'subtitulo' ? 'titulo' : type, ...args);
        if (window.LNEComponents.getLegalComponents().some(comp => comp.tipo === type)) setComponentText(block, '');
        window.LNEState.addBlock(block, index);
        focusInsertedBlock(block.id);
    }

    function bindContextInspector() {
        const container = document.getElementById('inspector-content');
        if (!container) return;
        const renderInspector = () => {
            const block = window.LNEState.getBlockById(window.LNEState.state.selectedBlockId);
            const metaId=window.LNEState.state.selectedBlockId;
            if(!block&&metaId?.startsWith('meta-')){container.innerHTML='<label>Tamaño (px)<input data-text-size type="number" min="6" max="120"></label>';container.querySelector('[data-text-size]').addEventListener('change',event=>window.LNETypography.apply(event.target.value));queueMicrotask(()=>window.LNETypography?.sync());return;}
            if (!block) {
                container.innerHTML = '<p class="inspector-empty">Selecciona un bloque para ver sus opciones.</p>';
                return;
            }
            const type = block.tipo;
            const inline=selectedInlineIcon?.blockId===block.id?document.getElementById('block-'+block.id)?.querySelector(`[data-inline-icon-id="${selectedInlineIcon.id}"]`):null;
            if(inline){if(inline.matches('.lne-inline-image'))renderInlineImageInspector(container,inline);else renderInlineIconInspector(container,inline);return;}
            selectedInlineIcon=null;
            const locked = window.LNEState.isBlockLocked(block.id);
            const bindLock = () => {
                const label = document.createElement('label');
                label.className = 'inspector-lock';
                label.innerHTML = `<input type="checkbox" data-block-lock ${locked ? 'checked' : ''}> Bloquear posición`;
                label.querySelector('input').addEventListener('change', e => window.LNEState.setBlockLocked(block.id, e.target.checked));
                container.appendChild(label);
            };
            if (type === 'imagen') {
                const layout = block.propiedades?.layout || {};
                const mode = window.LNECanvas.getImageWrapMode(block);
                const element = document.getElementById(`block-${block.id}`)?.querySelector('.lne-block-imagen');
                container.innerHTML = `<p class="inspector-kicker">IMAGEN</p><label>Ajuste<select data-inspector-wrap ${locked ? 'disabled' : ''}><option value="inline">En línea</option><option value="square">Cuadrado / Ajustar texto</option><option value="top-bottom">Arriba y abajo</option><option value="front">Delante del texto</option><option value="behind">Detrás del texto</option></select></label>${mode === 'square' ? '<label>Lado<select data-inspector-side><option value="left">Izquierda</option><option value="right">Derecha</option></select></label>' : ''}<label>Opacidad <output data-opacity-value>${Math.round((layout.opacity ?? 1) * 100)}%</output><input data-inspector-opacity type="range" min="0" max="100" value="${Math.round((layout.opacity ?? 1) * 100)}"></label><label>Ancho (px)<input data-image-width type="number" min="100" max="690" value="${Math.round(element?.getBoundingClientRect().width || Number(layout.width) || 300)}" ${locked ? 'disabled' : ''}></label><div class="inspector-actions"><button data-image-replace>Reemplazar</button><button data-image-delete ${locked ? 'disabled' : ''}>Eliminar</button></div>`;
                const wrap = container.querySelector('[data-inspector-wrap]');
                wrap.value = mode;
                wrap.addEventListener('change', () => window.LNECanvas.changeImageWrap(block.id, wrap.value));
                const side = container.querySelector('[data-inspector-side]');
                if (mode === 'square') {
                    const label=document.createElement('label');label.textContent='Desplazamiento vertical (px)';
                    const offset=document.createElement('input');offset.type='number';offset.min='0';offset.max='800';offset.step='4';offset.value=Number(layout.flowOffsetY)||0;offset.dataset.squareOffset='';offset.disabled=locked;
                    offset.addEventListener('change',()=>window.LNECanvas.changeSquareOffset(block.id,offset.value));
                    label.appendChild(offset);container.appendChild(label);
                }
                if (side) {
                    side.value = layout.wrapSide || (block.propiedades?.alineacion === 'align-right' ? 'right' : 'left');
                    side.disabled = locked;
                    side.addEventListener('change', () => window.LNEState.updateImageLayout(block.id, { wrapSide: side.value }));
                }
                const opacity = container.querySelector('[data-inspector-opacity]');
                opacity.addEventListener('input', () => {
                    const value = Number(opacity.value) / 100;
                    const image = document.getElementById(`block-${block.id}`)?.querySelector('.lne-block-imagen');
                    if (image) image.style.opacity = value;
                    container.querySelector('[data-opacity-value]').textContent = `${opacity.value}%`;
                });
                opacity.addEventListener('change', () => window.LNEState.updateImageLayout(block.id, { opacity: Number(opacity.value) / 100 }, 'image-opacity-update'));
                container.querySelector('[data-image-width]').addEventListener('change', e => window.LNECanvas.changeImageWidth(block.id, Number(e.target.value)));
                if(block.propiedades.visualIcon) {
                    container.querySelector('[data-image-width]').min='16';
                    const label=document.createElement('label');label.textContent='Color del icono';const picker=document.createElement('input');picker.type='color';picker.value=block.propiedades.visualIcon.color||'#1b263b';label.appendChild(picker);container.appendChild(label);
                    picker.addEventListener('change',()=>window.LNEState.updateBlockProperties(block.id,{visualIcon:{...block.propiedades.visualIcon,color:picker.value},src:window.LNEComponents.iconDataURL(block.propiedades.visualIcon.icon,picker.value)}));
                }
                if(!['front','behind'].includes(mode))for(const [key,text] of [['spacingBefore','Espacio antes'],['spacingAfter','Espacio después']]) {
                    const label=document.createElement('label');label.textContent=text;const input=document.createElement('input');input.type='number';input.min='0';input.max='64';input.value=Number(block.propiedades[key])||0;input.disabled=locked;label.appendChild(input);container.appendChild(label);input.addEventListener('change',()=>window.LNEState.updateBlockProperties(block.id,{[key]:Math.max(0,Math.min(64,Number(input.value)||0))}));
                }
                container.querySelector('[data-image-replace]').addEventListener('click', () => window.LNECanvas.replaceImage(block.id));
                const inlineCopy=document.createElement('button');inlineCopy.textContent='Copiar dentro del texto';inlineCopy.title='Sitúa primero el cursor en el texto y después selecciona esta imagen';
                const target=savedRange?.commonAncestorContainer,targetElement=target?.nodeType===Node.ELEMENT_NODE?target:target?.parentElement;
                const targetField=targetElement?.closest('[contenteditable="true"]');
                inlineCopy.disabled=!targetField||targetField.closest('.lne-editor-block')?.dataset.blockId===block.id;
                const targetRange=savedRange?.cloneRange();
                inlineCopy.addEventListener('click',()=>{
                    if(!targetRange||!targetField?.isConnected)return;
                    window.LNEState.snapshot();const img=document.createElement('img');img.src=block.propiedades.src;img.className='lne-inline-image';img.contentEditable='false';img.draggable=false;img.dataset.inlineIconId=crypto.randomUUID();img.style.width=`${Math.min(120,Number(layout.width)||80)}px`;img.style.verticalAlign='middle';img.style.margin='0 4px';
                    targetRange.collapse(false);targetRange.insertNode(img);targetField.dispatchEvent(new Event('input',{bubbles:true}));selectInlineIcon(img);
                });container.appendChild(inlineCopy);
                container.querySelector('[data-image-delete]').addEventListener('click', () => window.LNEState.removeBlock(block.id));
                bindLock();
                return;
            }
            if (type === 'icono') {
                const p = block.propiedades || {};
                container.innerHTML = `<p class="inspector-kicker">ICONO JURÍDICO</p><label>Icono <select data-icon-name><option value="fa-scale-balanced">Balanza</option><option value="fa-gavel">Martillo judicial</option><option value="fa-landmark">Edificio judicial</option><option value="fa-book">Libro</option><option value="fa-file-contract">Contrato</option><option value="fa-shield-halved">Escudo</option><option value="fa-user">Usuario</option><option value="fa-building-columns">Universidad</option><option value="fa-triangle-exclamation">Advertencia</option><option value="fa-lightbulb">Idea</option><option value="fa-calendar">Calendario</option><option value="fa-clock">Reloj</option><option value="fa-check">Check</option><option value="fa-arrow-right">Flecha</option></select></label><label>Tamaño <input data-icon-size type="number" min="12" max="160" value="${Number(p.size) || 32}"></label><label>Color <input data-icon-color type="color" value="${p.color || '#1b263b'}"></label><label>Alineación <select data-icon-align><option value="left">Izquierda</option><option value="center">Centro</option><option value="right">Derecha</option></select></label>`;
                const iconName = container.querySelector('[data-icon-name]');
                const iconAlign = container.querySelector('[data-icon-align]');
                if (iconName) iconName.value = p.icon || 'fa-scale-balanced';
                if (iconAlign) iconAlign.value = p.alineacion || 'center';
                const inlineLabel=document.createElement('label');inlineLabel.className='inspector-lock';
                const inline=document.createElement('input');inline.type='checkbox';inline.checked=p.display==='inline';inline.dataset.iconInline='';
                inline.addEventListener('change',()=>window.LNEState.updateBlockProperties(block.id,{display:inline.checked?'inline':'block',size:inline.checked?Math.min(Number(p.size)||16,24):Number(p.size)||32}));
                inlineLabel.append(inline,document.createTextNode('Icono pequeño junto al texto'));container.appendChild(inlineLabel);
                container.querySelectorAll('[data-icon-name], [data-icon-size], [data-icon-color], [data-icon-align]').forEach(input => input.addEventListener('change', () => window.LNEState.updateBlockProperties(block.id, {
                    icon: container.querySelector('[data-icon-name]').value,
                    size: Math.max(12, Math.min(160, Number(container.querySelector('[data-icon-size]').value) || 32)),
                    color: container.querySelector('[data-icon-color]').value,
                    alineacion: container.querySelector('[data-icon-align]').value
                })));
                bindLock();
                return;
            }
            const isTextBlock = window.LNEState.canUseFreeMode(block);
            const layout = block.propiedades?.layout || {};
            const absolute = layout.mode === 'absolute';
            container.innerHTML = `<p class="inspector-kicker">${type.replace(/-/g, ' ').toUpperCase()}</p><p>Posición: ${absolute ? 'Caja libre' : 'Flujo normal'}</p>${absolute ? `<label>X (px)<input data-text-geometry="x" type="number" value="${Number(layout.x) || 0}" ${locked ? 'disabled' : ''}></label><label>Y (px)<input data-text-geometry="y" type="number" value="${Number(layout.y) || 0}" ${locked ? 'disabled' : ''}></label><label>Ancho (px)<input data-text-geometry="width" type="number" min="160" value="${Number(layout.width) || 340}" ${locked ? 'disabled' : ''}></label><label>Capa<select data-text-layer ${locked ? 'disabled' : ''}><option value="front">Adelante</option><option value="behind">Atrás</option></select></label>` : `<label>Espacio antes<input data-spacing="before" type="number" min="0" max="64" step="4" value="${Number(block.propiedades?.spacingBefore) || 0}" ${locked ? 'disabled' : ''}></label><label>Espacio después<input data-spacing="after" type="number" min="0" max="64" step="4" value="${Number(block.propiedades?.spacingAfter) || 0}" ${locked ? 'disabled' : ''}></label>`}${isTextBlock ? `<div class="inspector-actions"><button data-free-text ${locked ? 'disabled' : ''}>${absolute ? 'Volver al flujo' : 'Convertir en caja libre'}</button></div>` : ''}`;
            if(['parrafo','lista','titulo'].includes(type)) {
                const label=document.createElement('label');label.textContent='Tipo de bloque';
                const select=document.createElement('select');select.dataset.textBlockType='';select.innerHTML='<option value="parrafo">Párrafo</option><option value="vinetas">Lista con viñetas</option><option value="numerada">Lista numerada</option><option value="multinivel">Lista multinivel</option>';
                select.value=type==='lista'?block.propiedades?.formato||'vinetas':'parrafo';
                select.addEventListener('change',()=>window.LNEState.changeTextBlockType(block.id,select.value));label.append(select);container.prepend(label);
                const formatting=document.createElement('div');formatting.className='inspector-text-format';formatting.innerHTML='<label>Fuente<select data-text-font><option value="Roboto, sans-serif">Roboto</option><option value="Merriweather, Georgia, serif">Merriweather</option><option value="Playfair Display, Georgia, serif">Playfair Display</option><option value="Inter, sans-serif">Inter</option></select></label><label>Tamaño (px)<input data-text-size type="number" min="6" max="120" value="16"></label><label>Alineación<select data-text-align><option value="left">Izquierda</option><option value="center">Centro</option><option value="right">Derecha</option><option value="justify">Justificado</option></select></label>';
                const font=formatting.querySelector('[data-text-font]'),size=formatting.querySelector('[data-text-size]'),align=formatting.querySelector('[data-text-align]');
                font.value=block.propiedades?.estilo?.fontFamily||'Roboto, sans-serif';size.value=parseFloat(block.propiedades?.estilo?.fontSize)||16;align.value=block.propiedades?.alineacion||'left';
                const apply=(key,value)=>{if(savedRange&&document.getElementById('block-'+block.id)?.contains(savedRange.commonAncestorContainer)&&!savedRange.collapsed)applyInlineStyle(key,value);else window.LNEState.updateBlockStyle(block.id,{[key]:value})};
                font.addEventListener('change',()=>apply('fontFamily',font.value));size.addEventListener('change',()=>window.LNETypography.apply(size.value));align.addEventListener('change',()=>window.LNEState.updateBlockAlignment(block.id,align.value));container.append(formatting);queueMicrotask(()=>window.LNETypography?.sync());
            }
            if(type==='separador') {
                const p=block.propiedades||{},fields=document.createElement('div');fields.innerHTML='<label>Ancho de línea (%)<input data-separator="separatorWidth" type="number" min="10" max="100"></label><label>Grosor (px)<input data-separator="thickness" type="number" min="1" max="8"></label><label>Estilo<select data-separator="lineStyle"><option value="solid">Continua</option><option value="dashed">Guiones</option><option value="dotted">Punteada</option><option value="double">Doble</option></select></label><label>Alineación<select data-separator="alineacion"><option value="left">Izquierda</option><option value="center">Centro</option><option value="right">Derecha</option></select></label>';
                fields.querySelectorAll('[data-separator]').forEach(input=>{const key=input.dataset.separator;input.value=p[key]??(key==='separatorWidth'?100:key==='thickness'?1:key==='lineStyle'?'solid':'center');input.disabled=locked;input.addEventListener('change',()=>window.LNEState.updateBlockProperties(block.id,{[key]:input.type==='number'?Math.max(Number(input.min),Math.min(Number(input.max),Number(input.value)||Number(input.min))):input.value}))});container.append(fields);
            }
            if(window.LNEComponents.getLegalComponents().some(item=>item.tipo===type)) {
                const tools=document.createElement('div');tools.innerHTML='<button data-component-icon>Cambiar icono</button><label>Variante visual<select data-component-variant><option value="standard">Estándar</option><option value="compact">Compacta</option></select></label>';
                tools.querySelector('[data-component-icon]').addEventListener('click',()=>openIconPicker(values=>window.LNEState.updateBlockProperties(block.id,{icon:values.icon}),{icon:block.propiedades?.icon}));
                const variant=tools.querySelector('[data-component-variant]');variant.value=block.propiedades?.visualVariant||'standard';variant.addEventListener('change',()=>window.LNEState.updateBlockProperties(block.id,{visualVariant:variant.value}));container.append(tools);
            }
            if(absolute&&type!=='separador') {
                const label=document.createElement('label');label.textContent='Altura';const select=document.createElement('select');select.dataset.heightPolicy='';select.disabled=locked;select.innerHTML='<option value="auto">Automática por contenido</option><option value="minimum">Altura mínima manual</option>';select.value=layout.heightMode||'auto';
                select.addEventListener('change',()=>window.LNEState.updateBlockLayout(block.id,{heightMode:select.value,height:document.getElementById('block-'+block.id)?.offsetHeight||100}));label.append(select);container.append(label);
            }
            container.querySelectorAll('[data-spacing]').forEach(input => input.addEventListener('input', () => {
                const element = document.getElementById(`block-${block.id}`);
                const value = Math.max(0, Math.min(64, Number(input.value) || 0));
                if (element) element.style[input.dataset.spacing === 'before' ? 'marginTop' : 'marginBottom'] = `${value}px`;
            }));
            container.querySelectorAll('[data-spacing]').forEach(input => input.addEventListener('change', () => {
                const field = input.dataset.spacing === 'before' ? 'spacingBefore' : 'spacingAfter';
                window.LNEState.updateBlockProperties(block.id, { [field]: Math.max(0, Math.min(64, Number(input.value) || 0)) });
            }));
            container.querySelector('[data-free-text]')?.addEventListener('click', () => {
                window.LNECanvas.changeTextMode(block.id, absolute ? 'flow' : 'absolute');
            });
            container.querySelectorAll('[data-text-geometry]').forEach(input => input.addEventListener('change', () => window.LNECanvas.changeTextGeometry(block.id, { [input.dataset.textGeometry]: Number(input.value) || 0 })));
            const layer = container.querySelector('[data-text-layer]');
            if (layer) {
                layer.value = layout.layer || 'front';
                layer.addEventListener('change', () => window.LNEState.updateBlockLayout(block.id, { layer: layer.value, zIndex: layer.value === 'behind' ? 0 : 15 }));
            }
            bindLock();
        };
        window.LNEState.subscribe(renderInspector);
        inspectorRenderer=renderInspector;
        renderInspector();
    }

    function paintIcon(element,values) {
        element.innerHTML=window.LNEComponents.renderIcon(values.icon);
        element.dataset.icon=values.icon;
        element.setAttribute('aria-label',values.label||'Icono jurídico');
        element.style.fontSize=`${Math.max(8,Math.min(64,Number(values.size)||16))}px`;
        element.style.color=/^#[\da-f]{6}$/i.test(values.color)?values.color:'#1b263b';
        element.style.verticalAlign=['baseline','middle','text-top','text-bottom'].includes(values.align)?values.align:'baseline';
        element.classList.toggle('icon-bullet',values.usage==='bullet');
        syncIconBullet(element);
    }
    function syncIconBullet(element) {
        const editable=element.closest('[contenteditable="true"]');
        if(!editable)return;
        editable.classList.toggle('lne-icon-list-item',!!editable.querySelector('.icon-bullet'));
        editable.style.setProperty('--lne-marker-width',`${(parseFloat(element.style.fontSize)||16)+10}px`);
    }
    function selectInlineIcon(element) {
        const block=element.closest('.lne-editor-block');if(!block)return;
        if(!element.dataset.inlineIconId){element.dataset.inlineIconId=crypto.randomUUID();element.closest('[contenteditable="true"]')?.dispatchEvent(new Event('input',{bubbles:true}));}
        selectedInlineIcon={blockId:block.dataset.blockId,id:element.dataset.inlineIconId};
        document.querySelectorAll('.inline-icon-selected').forEach(el=>el.classList.remove('inline-icon-selected'));element.classList.add('inline-icon-selected');
        window.LNEState.selectBlock(block.dataset.blockId);inspectorRenderer?.();
    }
    function renderInlineImageInspector(container,element) {
        container.innerHTML='<p class="inspector-kicker">IMAGEN EN TEXTO</p><label>Ancho (px)<input data-inline-width type="number" min="16" max="600"></label><label>Alineación<select data-inline-align><option value="baseline">Línea base</option><option value="middle">Centro</option><option value="text-top">Arriba</option><option value="text-bottom">Abajo</option></select></label><label>Margen (px)<input data-inline-margin type="number" min="0" max="24"></label><button data-inline-delete>Eliminar imagen inline</button>';
        const width=container.querySelector('[data-inline-width]'),align=container.querySelector('[data-inline-align]'),margin=container.querySelector('[data-inline-margin]');width.value=parseFloat(element.style.width)||80;align.value=element.style.verticalAlign||'middle';margin.value=parseFloat(element.style.marginLeft)||4;
        [width,align,margin].forEach(input=>input.addEventListener('change',()=>{window.LNEState.snapshot();element.style.width=`${Math.max(16,Math.min(600,Number(width.value)||80))}px`;element.style.verticalAlign=align.value;element.style.margin=`0 ${Math.max(0,Math.min(24,Number(margin.value)||0))}px`;element.closest('[contenteditable="true"]')?.dispatchEvent(new Event('input',{bubbles:true}));}));
        container.querySelector('[data-inline-delete]').addEventListener('click',()=>{window.LNEState.snapshot();const field=element.closest('[contenteditable="true"]');element.remove();selectedInlineIcon=null;field?.dispatchEvent(new Event('input',{bubbles:true}));inspectorRenderer?.();});
    }
    function renderInlineIconInspector(container,element) {
        container.innerHTML='<p class="inspector-kicker">ICONO INLINE</p><button data-inline-pick>Cambiar icono</button><label>Tamaño (px)<input data-inline-size type="number" min="8" max="64"></label><label>Color<input data-inline-color type="color"></label><label>Alineación<select data-inline-align><option value="baseline">Línea base</option><option value="middle">Centro</option><option value="text-top">Arriba</option><option value="text-bottom">Abajo</option></select></label><button data-inline-delete>Eliminar icono</button>';
        const marker=document.createElement('button');marker.textContent=element.classList.contains('icon-bullet')?'Quitar marcador':'Usar como viñeta';marker.dataset.inlineBullet='';
        marker.addEventListener('click',()=>{window.LNEState.snapshot();const editable=element.closest('[contenteditable="true"]');element.classList.toggle('icon-bullet');if(element.classList.contains('icon-bullet'))editable?.prepend(element);syncIconBullet(element);editable?.dispatchEvent(new Event('input',{bubbles:true}));inspectorRenderer?.()});container.appendChild(marker);
        const visual=document.createElement('button');visual.textContent='Convertir en elemento visual';visual.dataset.inlineVisual='';container.appendChild(visual);
        visual.addEventListener('click',()=>{
            const name=element.dataset.icon;if(!name?.startsWith('lne-'))return;
            const rect=element.getBoundingClientRect(),sheet=document.getElementById('document-sheet'),bounds=sheet.getBoundingClientRect(),scale=bounds.width/sheet.clientWidth;
            const block=window.LNEComponents.createBlock('imagen',window.LNEComponents.iconDataURL(name,color.value),'');
            block.propiedades.visualIcon={icon:name,color:color.value};
            block.propiedades.layout={mode:'absolute',wrapMode:'front',x:(rect.left-bounds.left)/scale,y:(rect.top-bounds.top)/scale,width:rect.width/scale,height:rect.height/scale,zIndex:20};
            window.LNEState.snapshot();const editable=element.closest('[contenteditable="true"]');element.remove();if(editable){editable.classList.remove('lne-icon-list-item');editable.dispatchEvent(new Event('input',{bubbles:true}));}
            const index=window.LNEState.state.bloques.findIndex(b=>b.id===selectedInlineIcon.blockId);window.LNEState.state.bloques.splice(index+1,0,block);selectedInlineIcon=null;window.LNEState.state.selectedBlockId=block.id;window.LNEState.notify('inline-icon-visual');
        });
        const size=container.querySelector('[data-inline-size]'),color=container.querySelector('[data-inline-color]'),align=container.querySelector('[data-inline-align]');
        size.value=parseFloat(element.style.fontSize)||16;color.value=element.style.color.startsWith('#')?element.style.color:rgbHex(element.style.color);align.value=element.style.verticalAlign||'baseline';
        const commit=()=>element.closest('[contenteditable="true"]')?.dispatchEvent(new Event('input',{bubbles:true}));
        [size,color,align].forEach(input=>input.addEventListener('change',()=>{window.LNEState.snapshot();element.style.fontSize=`${Math.max(8,Math.min(64,Number(size.value)||16))}px`;element.style.color=color.value;element.style.verticalAlign=align.value;syncIconBullet(element);commit()}));
        container.querySelector('[data-inline-pick]').addEventListener('click',()=>openIconPicker(values=>{if(!element.isConnected)return;window.LNEState.snapshot();paintIcon(element,values);if(values.usage==='bullet')element.closest('[contenteditable="true"]')?.prepend(element);syncIconBullet(element);commit();inspectorRenderer?.()},{icon:element.dataset.icon||'lne-scale',size:size.value,color:color.value,align:align.value,usage:element.classList.contains('icon-bullet')?'bullet':'cursor'}));
        container.querySelector('[data-inline-delete]').addEventListener('click',()=>{window.LNEState.snapshot();const editable=element.closest('[contenteditable="true"]');element.remove();if(editable&&!editable.querySelector('.icon-bullet')){editable.classList.remove('lne-icon-list-item');editable.style.removeProperty('--lne-marker-width');}selectedInlineIcon=null;editable?.dispatchEvent(new Event('input',{bubbles:true}));inspectorRenderer?.()});
    }
    function rgbHex(value){const rgb=String(value).match(/\d+/g);return rgb&&rgb.length>=3?'#'+rgb.slice(0,3).map(n=>Number(n).toString(16).padStart(2,'0')).join(''):'#1b263b';}
    function openIconPicker(apply,initial={}) {
        let modal=document.getElementById('icon-picker-modal');
        if(!modal){modal=document.createElement('div');modal.id='icon-picker-modal';modal.className='modal-overlay';document.body.appendChild(modal);}
        modal.innerHTML='<div class="modal-card icon-picker-card" role="dialog" aria-label="Colección editorial de iconos"><div class="modal-header"><h3>Iconos editoriales LNE</h3><button data-picker-close aria-label="Cerrar selector">×</button></div><div class="icon-picker-grid"></div><div class="icon-picker-settings"><label>Tamaño<input data-picker-size type="number" min="8" max="64" value="16"></label><label>Color<input data-picker-color type="color" value="#1b263b"></label><label>Posición<select data-picker-usage><option value="cursor">En el cursor</option><option value="start">Inicio del campo</option><option value="bullet">Como viñeta</option></select></label></div><div class="icon-picker-preview"><span data-picker-preview></span><span>Previsualización</span></div><button class="btn-top" data-picker-apply>Aplicar icono</button></div>';
        let chosen=initial.icon||'lne-scale',label='Balanza';const size=modal.querySelector('[data-picker-size]'),color=modal.querySelector('[data-picker-color]'),usage=modal.querySelector('[data-picker-usage]');size.value=initial.size||16;color.value=initial.color||'#1b263b';usage.value=initial.usage||'cursor';
        const values=()=>({icon:chosen,label,size:size.value,color:color.value,usage:usage.value,align:initial.align||'baseline'});
        const preview=()=>{paintIcon(modal.querySelector('[data-picker-preview]'),values());modal.querySelectorAll('[data-icon-choice]').forEach(button=>{button.classList.toggle('chosen',button.dataset.iconChoice===chosen);button.setAttribute('aria-pressed',String(button.dataset.iconChoice===chosen))})};
        const grid=modal.querySelector('.icon-picker-grid');Object.entries(iconCategories).forEach(([category,icons])=>{const section=document.createElement('section');const title=document.createElement('h4');title.textContent=category;section.append(title);icons.forEach(([icon,name])=>{const button=document.createElement('button');button.dataset.iconChoice=icon;button.title=name;button.setAttribute('aria-label',name);button.innerHTML=window.LNEComponents.renderIcon(icon)+`<span>${name}</span>`;button.addEventListener('click',()=>{chosen=icon;label=name;preview()});section.append(button)});grid.append(section)});
        [size,color,usage].forEach(input=>input.addEventListener('input',preview));
        modal.querySelector('[data-picker-close]').addEventListener('click',()=>modal.classList.remove('open'));modal.querySelector('[data-picker-apply]').addEventListener('click',()=>{modal.classList.remove('open');apply(values())});modal.onclick=event=>{if(event.target===modal)modal.classList.remove('open')};preview();modal.classList.add('open');
        modal.onkeydown=event=>{if(event.key==='Escape')modal.classList.remove('open')};
        modal.querySelector('[data-picker-close]').focus();
    }

    function bindStructuralInsertions() {
        const btnAddImage = document.getElementById('tool-insert-image');
        const btnAddBox = document.getElementById('tool-insert-box');
        const btnAddTable = document.getElementById('tool-insert-table');
        const btnAddCols = document.getElementById('tool-insert-columns');

        // Inserción de imagen directa desde disco
        if (btnAddImage) {
            btnAddImage.addEventListener('click', () => {
                const fileInput = document.getElementById('hidden-image-input');
                pendingImageInsertionIndex = consumeInsertIndex();
                if (fileInput) fileInput.click();
            });
        }

        const fileInput = document.getElementById('hidden-image-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const epoch = window.LNEState.documentEpoch;
                    const targetIndex = pendingImageInsertionIndex;
                    pendingImageInsertionIndex = -1;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        if (epoch !== window.LNEState.documentEpoch) return;
                        const block = window.LNEComponents.createBlock('imagen', ev.target.result, '');
                        window.LNEState.addBlock(block, targetIndex);
                        pendingImageInsertionIndex = -1;
                        fileInput.value = '';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Abrir modal de configuración de Cuadros
        if (btnAddBox) {
            btnAddBox.addEventListener('click', () => {
                const modal = document.getElementById('modal-config-cuadro');
                if (modal) modal.classList.add('open');
            });
        }

        // Abrir modal de configuración de Tablas
        if (btnAddTable) {
            btnAddTable.addEventListener('click', () => {
                const modal = document.getElementById('modal-config-tabla');
                if (modal) modal.classList.add('open');
            });
        }

        if (btnAddCols) {
            btnAddCols.addEventListener('click', () => {
                const block = window.LNEComponents.createBlock('columnas');
                window.LNEState.addBlock(block, consumeInsertIndex());
            });
        }
    }

    /**
     * Bandeja Desplegable de Diseño Jurídico con Inserción en el Punto del Cursor
     */
    function bindDisenoJuridicoTray() {
        if (!btnDisenoJuridicoEl || !secondaryToolbarEl) return;

        btnDisenoJuridicoEl.addEventListener('click', () => {
            const isOpen = secondaryToolbarEl.classList.toggle('open');
            btnDisenoJuridicoEl.classList.toggle('active', isOpen);
        });

        // Poblar las píldoras de los 10 componentes en la barra secundaria
        const legalComponents = window.LNEComponents.getLegalComponents();
        secondaryToolbarEl.innerHTML = '';

        legalComponents.forEach(comp => {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'legal-comp-pill';
            pill.innerHTML = `<i class="fa-solid ${comp.icon}" style="color: var(--lne-navy);"></i> ${comp.label}`;

            pill.addEventListener('mousedown', (e) => {
                e.preventDefault(); // Conservar selección de texto
            });

            pill.addEventListener('click', () => transformOrInsertLegal(comp.tipo));

            secondaryToolbarEl.appendChild(pill);
        });
    }

    function bindTopNavActions() {
        const btnPreview = document.getElementById('btn-vista-web');
        const btnExport = document.getElementById('btn-exportar');
        const btnNew = document.getElementById('btn-nuevo');
        const docTitleInput = document.getElementById('doc-title-input');

        if (docTitleInput) {
            docTitleInput.addEventListener('input', () => {
                const val = docTitleInput.value.trim() || 'Tema sin Título';
                window.LNEState.setDocumentTitle(val);
                const titleHeading = document.querySelector('.lne-editorial-title');
                if (titleHeading && document.activeElement !== titleHeading) {
                    titleHeading.textContent = val;
                }
            });
        }

        if (btnPreview) {
            btnPreview.addEventListener('click', () => {
                const modal = document.getElementById('web-preview-modal');
                const content = document.getElementById('web-preview-content');
                if (!modal || !content || !window.LNERenderer) return;
                content.innerHTML = window.LNERenderer.compileToHTML(window.LNEState.state);
                modal.classList.add('open');
            });
        }
        const modalPreview = document.getElementById('web-preview-modal');
        const btnClosePreview = document.getElementById('btn-close-web-preview');
        if (btnClosePreview && modalPreview) btnClosePreview.addEventListener('click', () => modalPreview.classList.remove('open'));
        if (modalPreview) modalPreview.addEventListener('click', (e) => { if (e.target === modalPreview) modalPreview.classList.remove('open'); });

        // Exportación Maestra Directa en un Solo Clic: LNE_Material_Tema_XX.zip
        if (btnExport) {
            btnExport.addEventListener('click', async () => {
                const originalHtml = btnExport.innerHTML;
                try {
                    btnExport.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Empaquetando...';
                    btnExport.disabled = true;

                    await window.LNEExport.exportPackageZIP();

                    btnExport.innerHTML = '<i class="fa-solid fa-check"></i> ¡Exportado!';
                    setTimeout(() => {
                        btnExport.innerHTML = originalHtml;
                        btnExport.disabled = false;
                    }, 2200);
                } catch (err) {
                    console.error("Error al exportar material:", err);
                    alert(`Error al generar el paquete ZIP: ${err.message}`);
                    btnExport.innerHTML = originalHtml;
                    btnExport.disabled = false;
                }
            });
        }

        if (btnNew) {
            btnNew.addEventListener('click', () => {
                const modal = document.getElementById('modal-nuevo');
                if (modal) modal.classList.add('open');
            });
        }

        // Acciones del Modal de Exportación Alternativa (si se abre manualmente)
        const btnCloseModalExport = document.getElementById('btn-modal-close-export');
        const modalExport = document.getElementById('modal-exportar');
        if (btnCloseModalExport && modalExport) {
            btnCloseModalExport.addEventListener('click', () => modalExport.classList.remove('open'));
            modalExport.addEventListener('click', (e) => {
                if (e.target === modalExport) modalExport.classList.remove('open');
            });
        }

        const btnExportJson = document.getElementById('opt-export-json');
        const btnExportHtml = document.getElementById('opt-export-html');
        const btnExportZip = document.getElementById('opt-export-zip');

        if (btnExportJson) {
            btnExportJson.addEventListener('click', () => {
                window.LNEExport.exportSourceJSON();
                if (modalExport) modalExport.classList.remove('open');
            });
        }

        if (btnExportHtml) {
            btnExportHtml.addEventListener('click', () => {
                window.LNEExport.exportCompiledHTML();
                if (modalExport) modalExport.classList.remove('open');
            });
        }

        if (btnExportZip) {
            btnExportZip.addEventListener('click', async () => {
                await window.LNEExport.exportPackageZIP();
                if (modalExport) modalExport.classList.remove('open');
            });
        }
    }

    /**
     * Módulo de Importación de Word (.docx)
     */
    function bindWordImportActions() {
        const btnImportWord = document.getElementById('btn-importar-word');
        const hiddenWordInput = document.getElementById('hidden-word-input');

        if (btnImportWord && hiddenWordInput) {
            btnImportWord.addEventListener('click', () => hiddenWordInput.click());
        }

        if (hiddenWordInput) {
            hiddenWordInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                try {
                    // Cerrar modales si hubiera abiertos
                    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));

                    await window.LNEDocxParser.importIntoEditor(file);
                    hiddenWordInput.value = '';
                } catch (err) {
                    console.error("Error al procesar el archivo Word:", err);
                    alert(`No se pudo procesar el archivo Word: ${err.message}`);
                }
            });
        }
    }

    /**
     * Modal Nuevo Documento (Blanco vs Word)
     */
    function bindNewDocumentModal() {
        const modal = document.getElementById('modal-nuevo');
        const btnClose = document.getElementById('btn-modal-close-nuevo');
        const optBlanco = document.getElementById('opt-nuevo-blanco');
        const optWord = document.getElementById('opt-nuevo-word');
        const hiddenWordInput = document.getElementById('hidden-word-input');

        if (btnClose && modal) {
            btnClose.addEventListener('click', () => modal.classList.remove('open'));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('open');
            });
        }

        if (optBlanco && modal) {
            optBlanco.addEventListener('click', () => {
                window.LNEState.resetDocument();
                modal.classList.remove('open');
            });
        }

        if (optWord && modal && hiddenWordInput) {
            optWord.addEventListener('click', () => {
                modal.classList.remove('open');
                hiddenWordInput.click();
            });
        }
    }

    /**
     * Modal Configuración de Tablas
     */
    function bindTableConfigModal() {
        const modal = document.getElementById('modal-config-tabla');
        const btnClose = document.getElementById('btn-modal-close-tabla');
        const btnConfirm = document.getElementById('btn-confirmar-tabla');

        const inputRows = document.getElementById('table-input-rows');
        const inputCols = document.getElementById('table-input-cols');

        if (btnClose && modal) {
            btnClose.addEventListener('click', () => modal.classList.remove('open'));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('open');
            });
        }

        if (btnConfirm && modal) {
            btnConfirm.addEventListener('click', () => {
                const rows = Math.max(1, Math.min(50, parseInt(inputRows?.value || 3, 10)));
                const cols = Math.max(1, Math.min(20, parseInt(inputCols?.value || 3, 10)));

                const headers = [];
                for (let c = 1; c <= cols; c++) headers.push(`Columna ${c}`);

                const bodyRows = [];
                for (let r = 0; r < rows; r++) {
                    bodyRows.push(new Array(cols).fill(''));
                }

                const tableBlock = window.LNEComponents.createBlock('tabla', { headers, rows: bodyRows });
                window.LNEState.addBlock(tableBlock, pendingConfigInsertionIndex >= 0 ? pendingConfigInsertionIndex : consumeInsertIndex());
                pendingConfigInsertionIndex = -1;
                modal.classList.remove('open');
            });
        }
    }

    /**
     * Modal Configuración de Cuadros
     */
    function bindCuadroConfigModal() {
        const modal = document.getElementById('modal-config-cuadro');
        const btnClose = document.getElementById('btn-modal-close-cuadro');

        if (btnClose && modal) {
            btnClose.addEventListener('click', () => modal.classList.remove('open'));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('open');
            });
        }

        document.querySelectorAll('[data-cuadro-preset]').forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.dataset.cuadroPreset;
                let config = {};

                if (preset === 'simple') {
                    config = { subtipo: 'cols-1', conEncabezado: false, columnas: ['Contenido del cuadro...'] };
                } else if (preset === 'header-simple') {
                    config = { subtipo: 'cols-1', conEncabezado: true, titulo: 'Encabezado del Cuadro', columnas: ['Contenido del cuadro...'] };
                } else if (preset === 'cols-2') {
                    config = { subtipo: 'cols-2', conEncabezado: true, titulo: 'Cuadro Comparativo', columnas: ['Columna 1...', 'Columna 2...'] };
                } else if (preset === 'cols-3') {
                    config = { subtipo: 'cols-3', conEncabezado: true, titulo: 'Análisis Tripartito', columnas: ['Fase 1...', 'Fase 2...', 'Fase 3...'] };
                }

                const block = window.LNEComponents.createBlock('cuadro', config);
                window.LNEState.addBlock(block, pendingConfigInsertionIndex >= 0 ? pendingConfigInsertionIndex : consumeInsertIndex());
                pendingConfigInsertionIndex = -1;
                if (modal) modal.classList.remove('open');
            });
        });
    }

    return {
        init,
        openIconPicker,
        getIconCategories:()=>iconCategories,
        insertAt,
        setInsertionIndex(index) {
            insertionIndex = Math.max(0, Number(index) || 0);
        }
    };
})();
