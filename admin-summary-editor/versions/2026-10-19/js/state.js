/**
 * STATE.JS - Gestor de Estado Centralizado y Persistencia Local
 * Fuente de la verdad: .material.lne.json
 */

const STORAGE_KEY = 'LNE_EDITOR_AUTOSAVE_DRAFT';

class StateManager {
    constructor() {
        this.state = {
            lneVersion: "1.0",
            documentoId: `mat-${Date.now()}`,
            metadata: {
                curso: "Formación Jurídica",
                temaNumero: "1",
                titulo: "Título del Tema",
                autor: "La Norma Express",
                fechaCreacion: new Date().toISOString(),
                fechaModificacion: new Date().toISOString()
            },
            bloques: [],
            selectedBlockId: null,
            previewMode: false
        };

        this.history = {
            past: [],
            future: []
        };

        this.subscribers = [];
        this.saveTimeout = null;
        this.textEditBlockId = null;
        this.textEditTime = 0;
        this.documentEpoch = 0;
        this.selectedBlockIds = new Set();
        this.selectionMode = false;
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify(changeType = 'update') {
        this.subscribers.forEach(cb => cb(this.state, changeType));
        if (!['select-block','select-blocks'].includes(changeType)) this.scheduleAutosave();
    }

    // Guardado de Snapshot para Deshacer/Rehacer
    snapshot() {
        this.textEditBlockId = null;
        const snapshotData = {
            metadata: JSON.parse(JSON.stringify(this.state.metadata)),
            bloques: JSON.parse(JSON.stringify(this.state.bloques))
        };
        this.history.past.push(snapshotData);
        if (this.history.past.length > 50) {
            this.history.past.shift();
        }
        this.history.future = []; // Limpiar rehacer
    }

    undo() {
        if (!this.canUndo()) return;
        const currentData = {
            metadata: JSON.parse(JSON.stringify(this.state.metadata)),
            bloques: JSON.parse(JSON.stringify(this.state.bloques))
        };
        this.history.future.push(currentData);

        const previousData = this.history.past.pop();
        this.state.metadata = previousData.metadata;
        this.state.bloques = previousData.bloques;
        this.notify('undo');
    }

    redo() {
        if (!this.canRedo()) return;
        const currentData = {
            metadata: JSON.parse(JSON.stringify(this.state.metadata)),
            bloques: JSON.parse(JSON.stringify(this.state.bloques))
        };
        this.history.past.push(currentData);

        const nextData = this.history.future.pop();
        this.state.metadata = nextData.metadata;
        this.state.bloques = nextData.bloques;
        this.notify('redo');
    }

    canUndo() {
        return this.history.past.length > 0;
    }

    canRedo() {
        return this.history.future.length > 0;
    }

    // Reemplazo Total del Documento (usado en importación y nuevo)
    setDocumentData({ metadata, bloques }) {
        this.clearDocumentSession();
        this.state.documentoId = `mat-${Date.now()}`;
        metadata = metadata || {};
        {
            this.state.metadata = {
                layouts: metadata.layouts || {},
                textStyles: metadata.textStyles || {},
                richText: metadata.richText || {},
                groupIds: metadata.groupIds || {},
                curso: metadata.curso || "Formación Jurídica",
                temaNumero: metadata.temaNumero || "1",
                titulo: metadata.titulo || "Tema sin Título",
                autor: metadata.autor || "La Norma Express",
                fechaCreacion: new Date().toISOString(),
                fechaModificacion: new Date().toISOString()
            };
        }
        this.state.bloques = Array.isArray(bloques) ? bloques : [];
        this.state.selectedBlockId = null;
        this.saveToStorage();
        this.notify('set-document');
    }

    setDocumentTitle(title) {
        this.updateMetadata('titulo', title);
    }

    setBlocks(blocks, docTitle = '') {
        this.snapshot();
        if (docTitle) {
            this.state.metadata.titulo = docTitle;
        }
        this.state.bloques = Array.isArray(blocks) ? blocks : [];
        this.state.selectedBlockId = null;
        this.saveToStorage();
        this.notify('set-blocks');
    }

    updateMetadata(field, value, richHTML) {
        if (field in this.state.metadata) {
            this.state.metadata[field] = value;
            if(richHTML!==undefined)this.state.metadata.richText={...this.state.metadata.richText,[field]:richHTML};
            else if(this.state.metadata.richText)delete this.state.metadata.richText[field];
            this.scheduleAutosave();
        }
    }

    // Manipulación de Bloques con inserción en posición activa
    addBlock(blockData, targetIndex = -1) {
        this.snapshot();
        if (targetIndex >= 0 && targetIndex <= this.state.bloques.length) {
            this.state.bloques.splice(targetIndex, 0, blockData);
        } else if (this.state.selectedBlockId) {
            const selIdx = this.state.bloques.findIndex(b => b.id === this.state.selectedBlockId);
            if (selIdx !== -1) {
                this.state.bloques.splice(selIdx + 1, 0, blockData);
            } else {
                this.state.bloques.push(blockData);
            }
        } else {
            this.state.bloques.push(blockData);
        }
        this.state.selectedBlockId = blockData.id;
        this.notify('add-block');
    }

    removeBlock(blockId) {
        if (this.isBlockLocked(blockId)) return;
        this.selectedBlockIds.delete(blockId);
        this.snapshot();
        this.state.bloques = this.state.bloques.filter(b => b.id !== blockId);
        if (this.state.selectedBlockId === blockId) {
            this.state.selectedBlockId = null;
        }
        this.notify('remove-block');
    }

    transformBlock(blockId, replacementBlock) {
        const index = this.state.bloques.findIndex(b => b.id === blockId);
        if (index === -1 || !replacementBlock) return;
        this.snapshot();
        replacementBlock.id = blockId;
        this.state.bloques.splice(index, 1, replacementBlock);
        this.state.selectedBlockId = blockId;
        this.notify('transform-block');
    }

    moveBlock(blockId, direction) {
        if (this.isBlockLocked(blockId)) return;
        const index = this.state.bloques.findIndex(b => b.id === blockId);
        if (index === -1) return;
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= this.state.bloques.length) return;

        this.snapshot();
        const [movedBlock] = this.state.bloques.splice(index, 1);
        this.state.bloques.splice(newIndex, 0, movedBlock);
        this.state.selectedBlockId = movedBlock.id;
        this.notify('move-block');
    }

    moveBlockToIndex(sourceBlockId, targetIndex) {
        if (this.isBlockLocked(sourceBlockId)) return;
        const sourceIndex = this.state.bloques.findIndex(b => b.id === sourceBlockId);
        if (sourceIndex === -1 || targetIndex < 0 || targetIndex > this.state.bloques.length) {
            return;
        }
        if (sourceIndex === targetIndex || (sourceIndex < targetIndex && sourceIndex === targetIndex - 1)) {
            return;
        }

        this.snapshot();
        const [movedBlock] = this.state.bloques.splice(sourceIndex, 1);
        let finalTarget = targetIndex;
        if (sourceIndex < targetIndex) {
            finalTarget = targetIndex - 1;
        }
        this.state.bloques.splice(finalTarget, 0, movedBlock);
        this.state.selectedBlockId = movedBlock.id;
        this.notify('reorder-block');
    }

    updateBlockAlignment(blockId, alignment, targetKey = null, options = {}) {
        const block = this.state.bloques.find(b => b.id === blockId);
        if (!block) return;
        this.snapshot();
        block.propiedades = block.propiedades || {};
        const shouldSetBlockAlignment = options.setBlockAlignment !== false;

        if (shouldSetBlockAlignment) {
            block.propiedades.alineacion = alignment;
        }
        if (targetKey) {
            block.propiedades.alineaciones = {
                ...(block.propiedades.alineaciones || {}),
                [targetKey]: alignment
            };
        }

        // La barra ya actualiza el DOM del editable activo. Posponer el render evita
        // destruir el Range/selección nativa mientras el usuario continúa editando.
        if (options.notify !== false) {
            this.notify('update-block-align');
        } else {
            this.scheduleAutosave();
        }
    }

    updateBlockStyle(blockId, styleObj) {
        const block = this.state.bloques.find(b => b.id === blockId);
        if (!block) return;
        this.snapshot();
        block.propiedades = block.propiedades || {};
        block.propiedades.estilo = { ...(block.propiedades.estilo || {}), ...styleObj };
        this.notify('update-block-style');
    }

    updateBlockContent(blockId, field, value) {
        const block = this.state.bloques.find(b => b.id === blockId);
        if (!block) return;

        if (field in block) {
            block[field] = value;
        } else if (block.propiedades && field in block.propiedades) {
            block.propiedades[field] = value;
        }
        this.scheduleAutosave();
    }

    recordTextEdit(blockId) {
        const now = Date.now();
        if (this.textEditBlockId !== blockId || now - this.textEditTime > 900) this.snapshot();
        this.textEditBlockId = blockId;
        this.textEditTime = now;
    }

    updateBlockProperties(blockId, newProps) {
        const block = this.state.bloques.find(b => b.id === blockId);
        if (!block) return;
        this.snapshot();
        block.propiedades = { ...(block.propiedades || {}), ...newProps };
        this.notify('update-block-props');
    }

    updateBlockLayout(blockId, layoutPatch, changeType = 'block-layout-update') {
        const block = this.state.bloques.find(b => b.id === blockId);
        if (!block || block.tipo === 'imagen' || this.isBlockLocked(blockId)) return;
        this.snapshot();
        block.propiedades = block.propiedades || {};
        block.propiedades.layout = { ...(block.propiedades.layout || {}), ...layoutPatch };
        if (layoutPatch.mode === 'flow') {
            ['x','y','height','heightMode','zIndex','layer'].forEach(key=>delete block.propiedades.layout[key]);
        }
        this.state.selectedBlockId = blockId;
        this.notify(changeType);
    }

    // Se invoca al finalizar una interacción; no durante cada pixel de movimiento.
    commitImageLayout(blockId, layout) {
        const block = this.state.bloques.find(b => b.id === blockId);
        const currentWrapMode = block?.propiedades?.layout?.wrapMode;
        if (!['front', 'behind'].includes(currentWrapMode) || this.isBlockLocked(blockId)) return;
        const wrapMode = currentWrapMode;
        this.updateImageLayout(blockId, {
            ...layout,
            mode: 'absolute',
            wrapMode,
            zIndex: wrapMode === 'behind' ? 0 : Math.max(20, Number(layout.zIndex) || 20)
        }, 'image-layout-commit');
    }

    updateImageLayout(blockId, layoutPatch, changeType = 'image-layout-update') {
        const block = this.state.bloques.find(b => b.id === blockId);
        if (!block || block.tipo !== 'imagen') return;
        if (this.isBlockLocked(blockId) && Object.keys(layoutPatch).some(key => key !== 'opacity')) return;
        const current = block.propiedades?.layout || {};
        if (Object.entries(layoutPatch).every(([key, value]) => current[key] === value)) return;

        this.snapshot();
        block.propiedades = block.propiedades || {};
        block.propiedades.layout = {
            ...(block.propiedades.layout || {}),
            ...layoutPatch
        };
        if(layoutPatch.mode==='flow') ['x','y','zIndex','layer'].forEach(key=>delete block.propiedades.layout[key]);
        this.state.selectedBlockId = blockId;
        this.notify(changeType);
    }

    getBlockById(blockId) {
        return this.state.bloques.find(b => b.id === blockId) || null;
    }

    isBlockLocked(blockId) {
        const props = this.getBlockById(blockId)?.propiedades;
        return !!(props?.locked || props?.layout?.locked);
    }

    setBlockLocked(blockId, locked) {
        const block = this.getBlockById(blockId);
        if (!block) return;
        this.snapshot();
        block.propiedades = { ...(block.propiedades || {}), locked: !!locked };
        if (block.propiedades.layout) block.propiedades.layout.locked = !!locked;
        this.notify('block-lock');
    }

    commitImageFlowMove(blockId, targetIndex, layoutPatch) {
        const block = this.getBlockById(blockId);
        if (!block || this.isBlockLocked(blockId)) return;
        this.snapshot();
        const sourceIndex = this.state.bloques.indexOf(block);
        this.state.bloques.splice(sourceIndex, 1);
        const index = Math.max(0, Math.min(this.state.bloques.length, targetIndex - (sourceIndex < targetIndex ? 1 : 0)));
        this.state.bloques.splice(index, 0, block);
        block.propiedades.layout = { ...(block.propiedades.layout || {}), ...layoutPatch, mode: 'flow' };
        this.state.selectedBlockId = blockId;
        this.notify('image-flow-move');
    }

    // One transaction for flow spacing + order. Free objects are never converted.
    commitFlowMove(blockIds, beforeId, layouts, { snapshot = true, properties = {} } = {}) {
        const ids = new Set(blockIds);
        const moving = this.state.bloques.filter(b => ids.has(b.id));
        if (!moving.length || moving.some(b => this.getBlockMode(b) !== 'flow' || this.isBlockLocked(b.id))) return;
        const remaining = this.state.bloques.filter(b => !ids.has(b.id));
        const index = beforeId === null ? remaining.length : remaining.findIndex(b => b.id === beforeId);
        if (index < 0) return;
        const spacingBlocks = Object.keys(properties).map(id => this.getBlockById(id));
        if (spacingBlocks.some(b => !b || this.getBlockMode(b) !== 'flow' || this.isBlockLocked(b.id))) return;
        const ordered = [...remaining.slice(0,index), ...moving, ...remaining.slice(index)];
        const changed = ordered.some((b,i) => b !== this.state.bloques[i]) || moving.some(b =>
            Object.entries(layouts[b.id] || {}).some(([key,value]) => b.propiedades?.layout?.[key] !== value)) ||
            spacingBlocks.some(b => Object.entries(properties[b.id]).some(([key,value]) => b.propiedades?.[key] !== value));
        if (!changed) return;
        if (snapshot) this.snapshot();
        spacingBlocks.forEach(b => { b.propiedades = { ...b.propiedades, ...properties[b.id] }; });
        moving.forEach(b => { b.propiedades = { ...b.propiedades, layout: { ...b.propiedades?.layout, ...layouts[b.id], mode:'flow' } }; });
        this.state.bloques = ordered;
        this.notify('flow-move');
    }

    // Métodos para Manipulación de Tablas
    addTableRow(tableBlockId) {
        const block = this.state.bloques.find(b => b.id === tableBlockId);
        if (!block || block.tipo !== 'tabla') return;
        this.snapshot();
        const colCount = (block.propiedades.headers || []).length || 2;
        const newRow = new Array(colCount).fill('');
        block.propiedades.rows.push(newRow);
        this.notify('table-add-row');
    }

    deleteTableRow(tableBlockId, rowIndex = -1) {
        const block = this.state.bloques.find(b => b.id === tableBlockId);
        if (!block || block.tipo !== 'tabla' || !block.propiedades.rows.length) return;
        this.snapshot();
        if (rowIndex >= 0 && rowIndex < block.propiedades.rows.length) {
            block.propiedades.rows.splice(rowIndex, 1);
        } else {
            block.propiedades.rows.pop();
        }
        this.notify('table-delete-row');
    }

    addTableColumn(tableBlockId) {
        const block = this.state.bloques.find(b => b.id === tableBlockId);
        if (!block || block.tipo !== 'tabla') return;
        this.snapshot();
        const newColNum = (block.propiedades.headers.length || 0) + 1;
        block.propiedades.headers.push(`Columna ${newColNum}`);
        block.propiedades.rows.forEach(r => r.push(''));
        this.notify('table-add-col');
    }

    deleteTableColumn(tableBlockId, colIndex = -1) {
        const block = this.state.bloques.find(b => b.id === tableBlockId);
        if (!block || block.tipo !== 'tabla' || block.propiedades.headers.length <= 1) return;
        this.snapshot();
        const target = colIndex >= 0 ? colIndex : block.propiedades.headers.length - 1;
        block.propiedades.headers.splice(target, 1);
        block.propiedades.rows.forEach(r => r.splice(target, 1));
        this.notify('table-delete-col');
    }

    selectBlock(blockId) {
        if (this.state.selectedBlockId === blockId) return;
        this.state.selectedBlockId = blockId;
        this.notify('select-block');
    }

    clearSelection() {
        this.state.selectedBlockId = null;
        this.selectedBlockIds.clear();
        this.selectionMode = false;
        this.notify('select-blocks');
    }

    togglePreviewMode() {
        this.state.previewMode = !this.state.previewMode;
        this.notify('toggle-preview');
        return this.state.previewMode;
    }

    // Persistencia Local (LocalStorage)
    scheduleAutosave() {
        window.LNEEditorial?.refreshStats();
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.saveToStorage();
        }, 600);
    }

    saveToStorage() {
        try {
            this.state.metadata.fechaModificacion = new Date().toISOString();
            const exportData = {
                lneVersion: this.state.lneVersion,
                documentoId: this.state.documentoId,
                metadata: this.state.metadata,
                bloques: this.state.bloques
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(exportData));
        } catch (err) {
            console.warn("No se pudo autoguardar en LocalStorage:", err);
        }
    }

    loadFromStorage() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return false;
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.bloques)) {
                this.clearDocumentSession();
                this.state.lneVersion = parsed.lneVersion || "1.0";
                this.state.documentoId = parsed.documentoId || `mat-${Date.now()}`;
                this.state.metadata = {
                    ...parsed.metadata,
                    curso: parsed.metadata?.curso || "Formación Jurídica",
                    temaNumero: parsed.metadata?.temaNumero || "1",
                    titulo: parsed.metadata?.titulo || "Tema sin Título",
                    autor: parsed.metadata?.autor || "La Norma Express",
                    fechaCreacion: parsed.metadata?.fechaCreacion || new Date().toISOString(),
                    fechaModificacion: new Date().toISOString()
                };
                this.state.bloques = parsed.bloques;
                this.notify('load-storage');
                return true;
            }
        } catch (err) {
            console.error("Error al cargar borrador previo:", err);
        }
        return false;
    }

    resetDocument(cleanMetadata = {}) {
        this.clearDocumentSession();
        this.state.documentoId = `mat-${Date.now()}`;
        this.state.metadata = {
            curso: cleanMetadata.curso || "Formación Jurídica",
            temaNumero: cleanMetadata.temaNumero || "1",
            titulo: cleanMetadata.titulo || "Título del Tema",
            autor: cleanMetadata.autor || "La Norma Express",
            fechaCreacion: new Date().toISOString(),
            fechaModificacion: new Date().toISOString()
        };
        this.state.bloques = [];
        this.state.selectedBlockId = null;
        this.saveToStorage();
        this.notify('reset');
    }

    clearDocumentSession() {
        clearTimeout(this.saveTimeout);
        this.documentEpoch++;
        this.textEditBlockId = null;
        this.textEditTime = 0;
        this.history = { past:[], future:[] };
        this.selectedBlockIds.clear();
        this.selectionMode = false;
        this.state.selectedBlockId = null;
        this.state.previewMode = false;
        this.state.lneVersion = '1.0';
    }

    toggleBlockForCopy(id, selected) {
        if (!this.getBlockById(id)) return;
        if (selected) this.selectedBlockIds.add(id);
        else this.selectedBlockIds.delete(id);
        this.notify('select-blocks');
    }

    getBlockMode(block) {
        if (!block) return 'flow';
        return block.propiedades?.layout?.mode === 'absolute' || (block.tipo==='imagen'&&['front','behind'].includes(block.propiedades?.layout?.wrapMode)) ? 'absolute' : 'flow';
    }

    canUseFreeMode(block) { return !!block && block.tipo!=='recurso-visual'; }

    setSelectionMode(active) {
        this.selectionMode=!!active;
        if (!active) this.selectedBlockIds.clear();
        this.notify('select-blocks');
    }

    duplicateBlock(id, bounds={left:85,top:70,right:775,bottom:1080}) {
        const source=this.getBlockById(id);if(!source)return null;
        const copy=JSON.parse(JSON.stringify(source));copy.id=`blk-${crypto.randomUUID()}`;
        if(this.getBlockMode(source)==='absolute') {
            const l=copy.propiedades.layout || (copy.propiedades.layout={});
            const width=Number(l.width)||340,height=Number(l.height)||100;
            const offset=(value,min,max)=>Math.max(min,Math.min(max,value+18)>value?Math.min(max,value+18):value-18);
            l.x=offset(Number(l.x)||bounds.left,bounds.left,Math.max(bounds.left,bounds.right-width));
            l.y=offset(Number(l.y)||bounds.top,bounds.top,Math.max(bounds.top,bounds.bottom-height));
        }
        this.addBlock(copy,this.state.bloques.indexOf(source)+1);return copy;
    }

    setListStyle(id,type,style) {
        if(!window.LNELists.styles[type]?.some(entry=>entry[0]===style))return;
        this.changeTextBlockType(id,type,{listStyle:style,docxLevels:null});
    }

    setListStart(id,value,continuePrevious=false) {
        const block=this.getBlockById(id);if(block?.tipo!=='lista'||block.propiedades.formato==='vinetas')return;
        const index=this.state.bloques.indexOf(block),previous=this.state.bloques.slice(0,index).reverse().find(b=>b.tipo==='lista'&&b.propiedades.formato!=='vinetas');
        if(continuePrevious&&!previous)return false;
        const startValue=Math.max(1,Math.min(999999,Math.floor(Number(value)||1)));
        this.updateBlockProperties(id,{startValue,continueFrom:continuePrevious?previous.id:null});
        return true;
    }

    changeTextBlockType(id, type, options={}) {
        const block=this.getBlockById(id);
        if(!block||!['parrafo','lista','titulo'].includes(block.tipo)||!['parrafo','vinetas','numerada','multinivel'].includes(type))return;
        const props=JSON.parse(JSON.stringify(block.propiedades||{}));
        if(type!=='parrafo'&&type!==props.formato){delete props.docxLevels;delete props.listStyle;}
        let items=block.tipo==='lista'?[...(props.items||[])]:[block.texto||''];
        if(block.tipo!=='lista'&&type!=='parrafo'){
            const holder=document.createElement('div');holder.innerHTML=block.texto||'';
            const nodes=holder.childNodes?[...holder.childNodes].filter(node=>node.nodeType===1||node.textContent.trim()):[];
            if(nodes.length&&nodes.every(node=>node.nodeType===1&&['P','DIV'].includes(node.tagName)))items=nodes.map(node=>{
                const style=(node.getAttribute('style')||'').replace(/text-indent\s*:[^;]+;?/gi,'');
                return style?`<span style="${style.replace(/"/g,'&quot;')}">${node.innerHTML}</span>`:node.innerHTML;
            });
        }
        if(type==='parrafo'&&block.tipo==='lista')items=items.map(item=>String(item)
            .replace(/<span\b[^>]*\bdata-list-marker=(?:"[^"]*"|'[^']*')[^>]*>[\s\S]*?<\/span>/gi,'')
            .replace(/<span\b(?=[^>]*class="[^"]*\bicon-bullet\b)[^>]*>[\s\S]*?<\/span>/g,'')
            .replace(/<\/?(?:ol|ul)\b[^>]*>/gi,'')
            .replace(/<li\b[^>]*>/gi,'<div>').replace(/<\/li\s*>/gi,'</div>')
            .replace(/\bclass="([^"]*)"/gi,(_,classes)=>{const clean=classes.split(/\s+/).filter(name=>!['lne-block-lista','lne-icon-list-item','icon-bullet'].includes(name)).join(' ');return clean?`class="${clean}"`:'';}));
        const next=type==='parrafo'?{id,tipo:'parrafo',texto:items.map(item=>`<div>${item||'<br>'}</div>`).join(''),propiedades:props}:{id,tipo:'lista',propiedades:{...props,items,formato:type,...options}};
        if(type==='parrafo'){
            ['items','formato','itemLevels','listType','listStyle','listLevel','listStart','startValue','continueFrom','numbering','numId','ilvl','docxLevels'].forEach(key=>delete next.propiedades[key]);
            if(next.propiedades.alineaciones)Object.keys(next.propiedades.alineaciones).filter(key=>key.startsWith('list:')).forEach(key=>delete next.propiedades.alineaciones[key]);
        }
        this.transformBlock(id,next);
    }
}

window.LNEState = new StateManager();
