/**
 * COMPONENTS.JS - Registro y Fábricas de Componentes Jurídicos LNE
 * Define el esquema semántico y la representación visual de cada bloque.
 */

window.LNEComponents = (function () {
    const iconCatalog={
        'Jurídicos':[['lne-scale','Balanza'],['lne-court','Tribunal'],['lne-document','Documento legal'],['lne-book','Libro'],['lne-section','Artículo / sección'],['lne-shield','Escudo'],['lne-justice','Justicia']],
        'Dirección / relación':[['lne-right','Flecha derecha'],['lne-left','Flecha izquierda'],['lne-up','Flecha arriba'],['lne-down','Flecha abajo'],['lne-long-right','Flecha larga derecha'],['lne-long-left','Flecha larga izquierda'],['lne-chevron','Chevron'],['lne-bold-right','Flecha gruesa derecha'],['lne-bold-down','Flecha gruesa abajo']],
        'Acción / orden':[['lne-check','Check'],['lne-cross','Cruz'],['lne-circle-check','Círculo con check'],['lne-number','Numeración']]
    };
    const iconPaths={
        'lne-scale':'M12 3v17m-6 1h12M4 7h16M6 7l-4 8h8L6 7m12 0l-4 8h8l-4-8',
        'lne-court':'M3 9h18L12 3 3 9m2 3v6m5-6v6m4-6v6m5-6v6M3 21h18',
        'lne-document':'M14 3H5v18h14V8l-5-5v5h5M8 12h8m-8 4h6',
        'lne-book':'M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3V4m9 2v16',
        'lne-section':'M16 5c-4-4-10 1-6 4l5 4c4 3-2 8-6 4m7-2c3-3 1-5-2-6L9 7c-3 2-3 5 0 7l5 3',
        'lne-shield':'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3',
        'lne-justice':'M5 3l7 7m-8 0l7-7m-2 4l4 4m-3 2l9 9M3 21h9',
        'lne-right':'M4 12h16m-6-6l6 6-6 6','lne-left':'M20 12H4m6-6l-6 6 6 6',
        'lne-up':'M12 20V4m-6 6l6-6 6 6','lne-down':'M12 4v16m-6-6l6 6 6-6',
        'lne-long-right':'M2 12h20m-5-5l5 5-5 5','lne-long-left':'M22 12H2m5-5l-5 5 5 5',
        'lne-chevron':'M9 5l7 7-7 7','lne-bold-right':'M3 9h10V4l8 8-8 8v-5H3V9',
        'lne-line':'M2 12h20',
        'lne-bold-down':'M9 3v10H4l8 8 8-8h-5V3H9',
        'lne-check':'M4 12l5 5L20 6','lne-cross':'M6 6l12 12M18 6 6 18',
        'lne-circle-check':'M20 12a8 8 0 1 1-4-7m-8 7l4 4 9-10',
        'lne-number':'M4 7l2-2v7m-3 0h6M12 6h9m-9 5h9M3 17c1-3 6-2 5 1l-5 4h6m3-5h9m-9 5h9'
    };
    function renderIcon(name) {
        const path=iconPaths[name];
        if(!path)return `<i class="fa-solid ${/^fa-[a-z0-9-]+$/.test(name)?name:'fa-scale-balanced'}" aria-hidden="true"></i>`;
        return `<svg class="lne-editorial-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;
    }
    function iconDataURL(name,color='#1b263b') {
        const safe=/^#[\da-f]{6}$/i.test(color)?color:'#1b263b';
        return 'data:image/svg+xml;base64,'+btoa(renderIcon(name).replace('currentColor',safe));
    }
    let idCounter = 1;
    function genId(prefix = 'blk') {
        return `${prefix}_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;
    }

    function normalizeAlignment(value) {
        return ['left', 'center', 'right', 'justify'].includes(value) ? value : '';
    }

    function getEditableAlignmentKey(openTag) {
        const field = openTag.match(/data-field="([^"]+)"/);
        if (field) return `field:${field[1]}`;

        const listIndex = openTag.match(/data-list-index="(\d+)"/);
        if (listIndex) return `list:${listIndex[1]}`;

        const headerIndex = openTag.match(/data-header-index="(\d+)"/);
        if (headerIndex) return `header:${headerIndex[1]}`;

        const rowIndex = openTag.match(/data-row-index="(\d+)"/);
        const colIndex = openTag.match(/data-col-index="(\d+)"/);
        if (rowIndex && colIndex) return `cell:${rowIndex[1]}:${colIndex[1]}`;
        if (colIndex) return `column:${colIndex[1]}`;
        return null;
    }

    function withTextAlign(openTag, alignment) {
        if (!alignment) return openTag;
        if (/style="[^"]*text-align\s*:/i.test(openTag)) {
            return openTag.replace(/text-align\s*:\s*[^;"}]+/i, `text-align: ${alignment}`);
        }
        if (/style="/i.test(openTag)) {
            return openTag.replace(/style="/i, `style="text-align: ${alignment}; `);
        }
        return openTag.replace(/>$/, ` style="text-align: ${alignment};">`);
    }

    // La alineación vive en el estado, no solo en estilos transitorios del DOM.
    // Los bloques complejos pueden tener alineaciones por campo sin alterar los demás.
    function applyStoredAlignments(block, html) {
        if (block.tipo === 'imagen') return html;
        const props = block.propiedades || {};
        const blockAlignment = normalizeAlignment(props.alineacion);
        let output = html;

        if (blockAlignment) {
            output = output.replace(/^(\s*<[a-zA-Z][^>]*>)/, match => withTextAlign(match, blockAlignment));
        }

        output = output.replace(/<[a-zA-Z][^>]*\b(?:data-field|data-list-index|data-header-index|data-row-index|data-col-index)="[^"]+"[^>]*>/g, openTag => {
            const key = getEditableAlignmentKey(openTag);
            const scopedAlignment = normalizeAlignment(props.alineaciones?.[key]);
            return withTextAlign(openTag, scopedAlignment || blockAlignment);
        });
        return output;
    }

    const registry = {
        // ======================================================================
        // ESTRUCTURALES BÁSICOS
        // ======================================================================
        'titulo': {
            label: 'Título',
            icon: 'fa-heading',
            create: (nivel = 1, texto = 'Título del Tema') => ({
                id: genId('title'),
                tipo: 'titulo',
                nivel: nivel,
                texto: texto
            }),
            render: (b, isPreview) => {
                const tag = `h${b.nivel || 1}`;
                const cls = `lne-block-titulo h${b.nivel || 1}`;
                return `<${tag} class="${cls}" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.texto || ''}</${tag}>`;
            }
        },

        'parrafo': {
            label: 'Párrafo',
            icon: 'fa-paragraph',
            create: (texto = '') => ({
                id: genId('p'),
                tipo: 'parrafo',
                texto: texto
            }),
            render: (b, isPreview) => {
                const tag = /<(?:ul|ol|div|p)\b/i.test(b.texto || '') ? 'div' : 'p';
                return `<${tag} class="lne-block-parrafo" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.texto || ''}</${tag}>`;
            }
        },

        'lista': {
            label: 'Lista',
            icon: 'fa-list-ul',
            create: (formato = 'vinetas', items = ['Elemento 1', 'Elemento 2']) => ({
                id: genId('list'),
                tipo: 'lista',
                propiedades: {
                    formato: formato, // 'vinetas' | 'numerada'
                    items: items
                }
            }),
            render: (b, isPreview,blocks) => {
                const formato = b.propiedades?.formato || 'vinetas';
                const items = b.propiedades?.items || ['Elemento'];
                const markers=window.LNELists.markers(b,blocks||window.LNEState?.state.bloques);

                const itemsHtml = items.map((item, idx) => {
                    const level = Math.max(0, Math.min(8, Number(b.propiedades?.itemLevels?.[idx]) || 0));
                    const markerText=markers[idx].replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
                    const marker=/<[^>]*class="[^"]*\bicon-bullet\b/.test(item)?'':`<span data-list-marker="${idx}" class="lne-list-marker">${markerText} </span>`;
                    return `<li style="margin-left:${level * 24}px;--list-marker-space:${Math.max(2,markers[idx].length*.65+1)}em" ${isPreview ? '' : `contenteditable="true" data-list-index="${idx}"`}>${marker}<span data-list-content>${item || (isPreview?'': '<span data-list-empty>\u200b</span>')}</span></li>`;
                }).join('');

                return `<${formato==='vinetas'?'ul':'ol'} class="lne-block-lista">${itemsHtml}</${formato==='vinetas'?'ul':'ol'}>`;
            }
        },

        'cuadro': {
            label: 'Cuadro',
            icon: 'fa-square',
            create: (config = {}) => ({
                id: genId('box'),
                tipo: 'cuadro',
                propiedades: {
                    conEncabezado: config.conEncabezado !== false,
                    titulo: config.titulo || 'Encabezado del Cuadro',
                    subtipo: config.subtipo || 'cols-1', // 'cols-1' | 'cols-2' | 'cols-3'
                    columnas: config.columnas || ['Contenido principal del cuadro...']
                }
            }),
            render: (b, isPreview) => {
                const props = b.propiedades || {};
                const conHeader = props.conEncabezado;
                const subtipo = props.subtipo || 'cols-1';
                const cols = props.columnas || ['Contenido...'];

                const headerHtml = conHeader ? `
                    <div class="lne-cuadro-header" ${isPreview ? '' : `contenteditable="true" data-field="titulo"`}>
                        ${props.titulo || 'Título del Cuadro'}
                    </div>
                ` : '';

                const colsHtml = cols.map((col, idx) => `
                    <div class="lne-cuadro-col" ${isPreview ? '' : `contenteditable="true" data-col-index="${idx}"`}>
                        ${col}
                    </div>
                `).join('');

                return `
                    <div class="lne-block-cuadro">
                        ${headerHtml}
                        <div class="lne-cuadro-grid ${subtipo}">
                            ${colsHtml}
                        </div>
                    </div>
                `;
            }
        },

        'columnas': {
            label: 'Columnas',
            icon: 'fa-table-columns',
            create: () => ({
                id: genId('cols'),
                tipo: 'columnas',
                propiedades: {
                    col1: 'Contenido de la columna izquierda...',
                    col2: 'Contenido de la columna derecha...'
                }
            }),
            render: (b, isPreview) => {
                const col1 = b.propiedades?.col1 || '';
                const col2 = b.propiedades?.col2 || '';
                return `
                    <div class="lne-block-columnas">
                        <div class="lne-columna" ${isPreview ? '' : `contenteditable="true" data-field="col1"`}>${col1}</div>
                        <div class="lne-columna" ${isPreview ? '' : `contenteditable="true" data-field="col2"`}>${col2}</div>
                    </div>
                `;
            }
        },

        'imagen': {
            label: 'Imagen',
            icon: 'fa-image',
            create: (url = '', pie = '') => ({
                id: genId('img'),
                tipo: 'imagen',
                propiedades: {
                    src: url,
                    pie: pie,
                    alineacion: 'align-center', // 'align-left' | 'align-center' | 'align-right'
                    ancho: '100%'               // '100%' | '75%' | '50%' | '35%'
                }
            }),
            render: (b, isPreview) => {
                const src = b.propiedades?.src || '';
                const pie = b.propiedades?.pie || '';
                const align = b.propiedades?.alineacion || 'align-center';
                const layout = b.propiedades?.layout;
                const wrapMode = layout?.wrapMode || (layout?.mode === 'absolute' ? 'front' : (align === 'align-left' || align === 'align-right' ? 'square' : 'inline'));
                const isAbsolute = ['front', 'behind'].includes(wrapMode);
                const opacity = Math.max(0, Math.min(1, Number(layout?.opacity ?? 1)));
                const wrapSide = layout?.wrapSide || (align === 'align-right' ? 'right' : 'left');
                const displayAlign = wrapMode === 'square' ? `align-${wrapSide}` : ((wrapMode === 'inline' || wrapMode === 'top-bottom') ? 'align-center' : align);
                const flowOffsetStyle = '';
                // Los documentos antiguos no tienen layout y siguen en flujo normal.
                const ancho = Number(layout?.width) > 0
                    ? `${Number(layout.width)}px`
                    : (b.propiedades?.ancho || '100%');

                const resizeHandlesHtml = isPreview || b.propiedades?.locked || layout?.locked ? '' : `
                    <div class="img-resize-handle handle-nw" data-handle="nw" title="Redimensionar esquina"></div>
                    <div class="img-resize-handle handle-ne" data-handle="ne" title="Redimensionar esquina"></div>
                    <div class="img-resize-handle handle-se" data-handle="se" title="Redimensionar esquina"></div>
                    <div class="img-resize-handle handle-sw" data-handle="sw" title="Redimensionar esquina"></div>
                    <div class="img-resize-handle handle-e" data-handle="e" title="Ajustar ancho"></div>
                    <div class="img-resize-handle handle-w" data-handle="w" title="Ajustar ancho"></div>
                `;

                const contextBarHtml = isPreview ? '' : `
                    <div class="image-context-bar">
                        <button class="img-tool-btn" data-img-action="toggle-adjust" title="Ajuste de imagen"><i class="fa-solid fa-text-width"></i> Ajuste</button>
                        <div class="image-adjust-popover" data-img-adjust-popover>
                            <div class="image-adjust-title">Ajuste de imagen</div>
                            <button class="img-adjust-option ${wrapMode === 'inline' ? 'active' : ''}" data-img-wrap="inline"><i class="fa-solid fa-bars"></i> En línea</button>
                            <button class="img-adjust-option ${wrapMode === 'square' ? 'active' : ''}" data-img-wrap="square"><i class="fa-solid fa-table-cells"></i> Ajustar texto</button>
                            <button class="img-adjust-option ${wrapMode === 'top-bottom' ? 'active' : ''}" data-img-wrap="top-bottom"><i class="fa-solid fa-arrows-up-down"></i> Arriba y abajo</button>
                            <button class="img-adjust-option ${wrapMode === 'front' ? 'active' : ''}" data-img-wrap="front"><i class="fa-solid fa-layer-group"></i> Delante del texto</button>
                            <button class="img-adjust-option ${wrapMode === 'behind' ? 'active' : ''}" data-img-wrap="behind"><i class="fa-solid fa-layer-group"></i> Detrás del texto</button>
                            <label class="image-opacity-control">Opacidad <output data-img-opacity-value>${Math.round(opacity * 100)}%</output><input type="range" min="0" max="100" value="${Math.round(opacity * 100)}" data-img-opacity></label>
                        </div>
                        <button class="img-tool-btn" data-img-action="replace" title="Reemplazar imagen"><i class="fa-solid fa-arrow-rotate-right"></i> Reemplazar</button>
                    </div>
                `;

                if (!src) {
                    return `
                        <div class="lne-block-imagen-wrapper ${displayAlign} image-wrap-${wrapMode} ${isAbsolute ? 'is-absolute-image' : ''}" style="${flowOffsetStyle}">
                            <div style="border: 2px dashed #cbd5e1; padding: 30px; text-align: center; color: #64748b; border-radius: 4px;">
                                <i class="fa-regular fa-image fa-2x" style="margin-bottom: 8px;"></i>
                                <p>Haz clic para seleccionar o pegar una imagen desde tu equipo.</p>
                            </div>
                        </div>
                    `;
                }

                return `
                    <div class="lne-block-imagen-wrapper ${displayAlign} image-wrap-${wrapMode} ${isAbsolute ? 'is-absolute-image' : ''}" style="${flowOffsetStyle}">
                        <div class="lne-block-imagen-container" style="width: ${ancho};">
                            ${contextBarHtml}
                            ${resizeHandlesHtml}
                            <img src="${src}" class="lne-block-imagen" alt="Imagen del Material" draggable="false" style="opacity: ${opacity};${Number(layout?.width)>0?'width:100%;':''}">
                            <figcaption class="lne-imagen-pie" ${isPreview ? '' : `contenteditable="true" data-field="pie"`} placeholder="Escribe un pie de imagen opcional...">${pie}</figcaption>
                        </div>
                    </div>
                `;
            }
        },

        'icono': {
            label: 'Icono jurídico',
            icon: 'fa-scale-balanced',
            create: (icon = 'fa-scale-balanced') => ({ id: genId('icon'), tipo: 'icono', propiedades: { icon, color: '#1b263b', size: 32, alineacion: 'center' } }),
            render: (b) => {
                const p = b.propiedades || {};
                return `<div class="lne-block-icono" style="text-align:${p.alineacion || 'center'};"><i class="fa-solid ${p.icon || 'fa-scale-balanced'}" style="font-size:${Number(p.size) || 32}px;color:${p.color || '#1b263b'};"></i></div>`;
            }
        },

        'separador': {
            label: 'Separador',
            icon: 'fa-minus',
            create: () => ({ id: genId('sep'), tipo: 'separador', propiedades: {spacingBefore:8,spacingAfter:8} }),
            render: b => {const p=b.propiedades||{},width=Math.max(10,Math.min(100,Number(p.separatorWidth)||100)),thickness=Math.max(1,Math.min(8,Number(p.thickness)||1)),line=['solid','dashed','dotted','double'].includes(p.lineStyle)?p.lineStyle:'solid',align=['left','right'].includes(p.alineacion)?p.alineacion:'center';return `<hr class="lne-block-separador" style="width:${width}%;border-top:${thickness}px ${line} var(--lne-border-dark);margin-left:${align==='right'?'auto':'0'};margin-right:${align==='left'?'auto':align==='center'?'auto':'0'};${align==='center'?'margin-left:auto;':''}">`}
        },

        'tabla': {
            label: 'Tabla',
            icon: 'fa-table',
            create: (config = {}) => {
                const headers = config.headers || ['Columna 1', 'Columna 2', 'Columna 3'];
                const rows = config.rows || [['', '', ''], ['', '', '']];
                return {
                    id: genId('tbl'),
                    tipo: 'tabla',
                    propiedades: {
                        headers: headers,
                        rows: rows,
                        cellSpans: config.cellSpans || []
                    }
                };
            },
            render: (b, isPreview) => {
                const headers = b.propiedades?.headers || ['Columna 1', 'Columna 2'];
                const rows = b.propiedades?.rows || [['', '']];
                const spans=(row,col)=>{
                    const cell=b.propiedades?.cellSpans?.[row]?.[col]||{};
                    return `colspan="${Math.max(1,Number(cell.colspan)||1)}" rowspan="${Math.max(1,Number(cell.rowspan)||1)}"`;
                };

                const tableControlsHtml = isPreview ? '' : `
                    <div class="table-context-bar">
                        <button class="table-tool-btn" data-table-action="add-row"><i class="fa-solid fa-plus"></i> Fila</button>
                        <button class="table-tool-btn" data-table-action="delete-row"><i class="fa-solid fa-minus"></i> Fila</button>
                        <span style="color:#cbd5e1;">|</span>
                        <button class="table-tool-btn" data-table-action="add-col"><i class="fa-solid fa-plus"></i> Columna</button>
                        <button class="table-tool-btn" data-table-action="delete-col"><i class="fa-solid fa-minus"></i> Columna</button>
                        <button class="table-tool-btn btn-delete-table" data-table-action="delete-table" title="Eliminar tabla completa"><i class="fa-solid fa-trash"></i> Eliminar Tabla</button>
                    </div>
                `;

                const thHtml = headers.map((h, colIdx) => `
                    <th ${spans(0,colIdx)} ${isPreview ? '' : `contenteditable="true" data-header-index="${colIdx}"`}>${h}</th>
                `).join('');

                const trHtml = rows.map((r, rowIdx) => `
                    <tr>
                        ${r.map((c, colIdx) => `
                            <td ${spans(rowIdx+1,colIdx)} ${isPreview ? '' : `contenteditable="true" data-row-index="${rowIdx}" data-col-index="${colIdx}"`}>${c}</td>
                        `).join('')}
                    </tr>
                `).join('');

                return `
                    <div class="lne-block-tabla-wrapper">
                        ${tableControlsHtml}
                        <table class="lne-block-tabla">
                            <thead><tr>${thHtml}</tr></thead>
                            <tbody>${trHtml}</tbody>
                        </table>
                    </div>
                `;
            }
        },

        // ======================================================================
        // LOS 10 COMPONENTES PREDiseñADOS DE "DISEÑO JURÍDICO" LNE
        // ======================================================================

        // 1. Idea Clave
        'idea-clave': {
            label: 'Idea Clave',
            icon: 'fa-lightbulb',
            create: () => ({
                id: genId('ideac'),
                tipo: 'idea-clave',
                propiedades: {
                    titulo: 'Idea Clave',
                    texto: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-idea-clave">
                    <div class="lne-comp-icon"><i class="fa-regular fa-lightbulb"></i></div>
                    <div style="flex: 1;">
                        <div class="lne-comp-header" ${isPreview ? '' : `contenteditable="true" data-field="titulo"`}>${b.propiedades?.titulo || 'Idea Clave'}</div>
                        <div class="lne-comp-body" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.propiedades?.texto || ''}</div>
                    </div>
                </div>
            `
        },

        // 2. Importante
        'importante': {
            label: 'Importante',
            icon: 'fa-star',
            create: () => ({
                id: genId('imp'),
                tipo: 'importante',
                propiedades: {
                    titulo: 'Importante',
                    texto: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-importante">
                    <div class="lne-comp-icon"><i class="fa-regular fa-star"></i></div>
                    <div style="flex: 1;">
                        <div class="lne-comp-header" ${isPreview ? '' : `contenteditable="true" data-field="titulo"`}>${b.propiedades?.titulo || 'Importante'}</div>
                        <div class="lne-comp-body" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.propiedades?.texto || ''}</div>
                    </div>
                </div>
            `
        },

        // 3. Advertencia
        'advertencia': {
            label: 'Advertencia',
            icon: 'fa-circle-exclamation',
            create: () => ({
                id: genId('adv'),
                tipo: 'advertencia',
                propiedades: {
                    titulo: 'Advertencia',
                    texto: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-advertencia">
                    <div class="lne-comp-icon"><i class="fa-solid fa-circle-exclamation"></i></div>
                    <div style="flex: 1;">
                        <div class="lne-comp-header" ${isPreview ? '' : `contenteditable="true" data-field="titulo"`}>${b.propiedades?.titulo || 'Advertencia'}</div>
                        <div class="lne-comp-body" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.propiedades?.texto || ''}</div>
                    </div>
                </div>
            `
        },

        // 4. Ten Cuidado
        'ten-cuidado': {
            label: 'Ten Cuidado',
            icon: 'fa-shield-halved',
            create: () => ({
                id: genId('cui'),
                tipo: 'ten-cuidado',
                propiedades: {
                    titulo: 'Ten Cuidado',
                    texto: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-ten-cuidado">
                    <div class="lne-comp-icon"><i class="fa-solid fa-shield-halved"></i></div>
                    <div style="flex: 1;">
                        <div class="lne-comp-header" ${isPreview ? '' : `contenteditable="true" data-field="titulo"`}>${b.propiedades?.titulo || 'Ten Cuidado'}</div>
                        <div class="lne-comp-body" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.propiedades?.texto || ''}</div>
                    </div>
                </div>
            `
        },

        // 5. Jurisprudencia
        'jurisprudencia': {
            label: 'Jurisprudencia',
            icon: 'fa-scale-balanced',
            create: () => ({
                id: genId('jur'),
                tipo: 'jurisprudencia',
                propiedades: {
                    tribunal: '',
                    expediente: '',
                    criterio: '',
                    contenido: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-jurisprudencia">
                    <div class="lne-comp-jurisprudencia-meta">
                        <span class="lne-badge-tribunal" ${isPreview ? '' : `contenteditable="true" data-field="tribunal"`}>${b.propiedades?.tribunal || 'Órgano Jurisdiccional'}</span>
                        <span class="lne-juris-expediente" ${isPreview ? '' : `contenteditable="true" data-field="expediente"`}>${b.propiedades?.expediente || 'N.° de Expediente / Casación'}</span>
                    </div>
                    <div class="lne-juris-criterio" ${isPreview ? '' : `contenteditable="true" data-field="criterio"`}>
                        ${b.propiedades?.criterio || 'Criterio vinculante o ratio decidendi...'}
                    </div>
                    <div class="lne-juris-contenido" ${isPreview ? '' : `contenteditable="true" data-field="contenido"`}>
                        ${b.propiedades?.contenido || 'Fundamentación y desarrollo jurídico...'}
                    </div>
                </div>
            `
        },

        // 6. Normativa
        'normativa': {
            label: 'Normativa',
            icon: 'fa-book-bookmark',
            create: () => ({
                id: genId('norm'),
                tipo: 'normativa',
                propiedades: {
                    badge: '',
                    titulo: 'Base legal / Artículo',
                    texto: '',
                    concordancias: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-normativa">
                    <span class="lne-comp-normativa-badge" ${isPreview ? '' : `contenteditable="true" data-field="badge"`}>${b.propiedades?.badge || 'Norma y Artículo'}</span>
                    <div class="lne-comp-normativa-titulo" ${isPreview ? '' : `contenteditable="true" data-field="titulo"`}>${b.propiedades?.titulo || 'Título de la Disposición'}</div>
                    <div class="lne-comp-normativa-texto" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.propiedades?.texto || 'Texto íntegro del precepto normativo...'}</div>
                    <div class="lne-comp-normativa-concordancias" ${isPreview ? '' : `contenteditable="true" data-field="concordancias"`}>
                        <strong>Concordancias:</strong> ${b.propiedades?.concordancias || 'Leyes o artículos concordados...'}
                    </div>
                </div>
            `
        },

        // 7. Ejemplo
        'ejemplo': {
            label: 'Ejemplo',
            icon: 'fa-briefcase',
            create: () => ({
                id: genId('ejm'),
                tipo: 'ejemplo',
                propiedades: {
                    titulo: 'Caso Práctico Ilustrativo',
                    texto: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-ejemplo">
                    <div class="lne-comp-icon"><i class="fa-solid fa-briefcase"></i></div>
                    <div style="flex: 1;">
                        <div class="lne-comp-header" ${isPreview ? '' : `contenteditable="true" data-field="titulo"`}>${b.propiedades?.titulo || 'Supuesto Práctico'}</div>
                        <div class="lne-comp-body" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.propiedades?.texto || ''}</div>
                    </div>
                </div>
            `
        },

        // 8. Doctrina
        'doctrina': {
            label: 'Doctrina',
            icon: 'fa-feather-pointed',
            create: () => ({
                id: genId('doc'),
                tipo: 'doctrina',
                propiedades: {
                    autor: '',
                    obra: '',
                    cita: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-doctrina">
                    <div class="lne-comp-doctrina-autor" ${isPreview ? '' : `contenteditable="true" data-field="autor"`}>${b.propiedades?.autor || 'Autor Doctrinal'}</div>
                    <div class="lne-comp-doctrina-obra" ${isPreview ? '' : `contenteditable="true" data-field="obra"`}>${b.propiedades?.obra || 'Obra, Editorial y Página'}</div>
                    <div class="lne-comp-doctrina-cita" ${isPreview ? '' : `contenteditable="true" data-field="cita"`}>${b.propiedades?.cita || 'Extracto doctrinal...'}</div>
                </div>
            `
        },

        // 9. Comparación
        'comparacion': {
            label: 'Comparación',
            icon: 'fa-code-compare',
            create: () => ({
                id: genId('comp'),
                tipo: 'comparacion',
                propiedades: {
                    tituloA: 'Régimen General',
                    textoA: '',
                    tituloB: 'Régimen Especial',
                    textoB: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-comparacion">
                    <div class="lne-comp-comparacion-col col-a">
                        <div class="lne-comp-comparacion-titulo" ${isPreview ? '' : `contenteditable="true" data-field="tituloA"`}>${b.propiedades?.tituloA || 'Postura A'}</div>
                        <div ${isPreview ? '' : `contenteditable="true" data-field="textoA"`}>${b.propiedades?.textoA || ''}</div>
                    </div>
                    <div class="lne-comp-comparacion-col col-b">
                        <div class="lne-comp-comparacion-titulo" ${isPreview ? '' : `contenteditable="true" data-field="tituloB"`}>${b.propiedades?.tituloB || 'Postura B'}</div>
                        <div ${isPreview ? '' : `contenteditable="true" data-field="textoB"`}>${b.propiedades?.textoB || ''}</div>
                    </div>
                </div>
            `
        },

        // 10. Recuerda
        'recuerda': {
            label: 'Recuerda',
            icon: 'fa-bookmark',
            create: () => ({
                id: genId('rec'),
                tipo: 'recuerda',
                propiedades: {
                    titulo: 'Recuerda',
                    texto: ''
                }
            }),
            render: (b, isPreview) => `
                <div class="lne-comp-recuerda">
                    <div class="lne-comp-icon"><i class="fa-regular fa-bookmark"></i></div>
                    <div style="flex: 1;">
                        <div class="lne-comp-header" ${isPreview ? '' : `contenteditable="true" data-field="titulo"`}>${b.propiedades?.titulo || 'Recuerda'}</div>
                        <div class="lne-comp-body" ${isPreview ? '' : `contenteditable="true" data-field="texto"`}>${b.propiedades?.texto || ''}</div>
                    </div>
                </div>
            `
        }
    };

    // Variantes editoriales: reutilizan la familia visual existente, no diez diseños nuevos.
    const editorialVariants = [
        ['concepto','Concepto','idea-clave','fa-book-open'],
        ['caso-practico','Caso práctico','ejemplo','fa-briefcase'],
        ['mnemotecnia','Mnemotecnia','recuerda','fa-brain'],
        ['sintesis','Síntesis','idea-clave','fa-list-check']
    ];
    editorialVariants.forEach(([type,label,base,icon])=>{
        registry[type]={...registry[base],label,icon,create:()=>({id:genId(type),tipo:type,propiedades:{titulo:label,texto:''}})};
    });
    registry.normativa.label='Base legal / Artículo';
    registry['recurso-visual']={label:'Recurso visual',icon:'fa-image',create:()=>({id:genId('visual'),tipo:'recurso-visual',propiedades:{}}),render:(b,preview)=>preview?'':`<div class="lne-resource-placeholder"><span>RECURSO VISUAL</span><small>Añade una imagen, esquema, tabla o gráfico propio.</small><button data-resource-add="imagen">Añadir imagen / esquema</button><button data-resource-add="tabla">Añadir tabla</button></div>`};
    const legalKeys=['idea-clave','importante','advertencia','ten-cuidado','jurisprudencia','normativa','ejemplo','doctrina','comparacion','recuerda',...editorialVariants.map(v=>v[0])];

    return {
        renderIcon,
        iconDataURL,
        getIconCatalog:()=>iconCatalog,
        getRegistry: () => registry,
        createBlock: (tipo, ...args) => {
            const def = registry[tipo];
            if (!def) throw new Error(`Componente no registrado: ${tipo}`);
            const block=def.create(...args);
            if (legalKeys.includes(tipo) && !args.length) {
                // Nunca precargar autoridades, artículos, citas o casos ficticios.
                Object.keys(block.propiedades||{}).forEach(key=>{
                    if (typeof block.propiedades[key]==='string') block.propiedades[key]='';
                });
                if ('titulo' in block.propiedades) block.propiedades.titulo=def.label;
            }
            return block;
        },
        renderBlock: (block, isPreview = false,blocks) => {
            const def = registry[block.tipo];
            if (!def) return `<div>[Componente desconocido: ${block.tipo}]</div>`;
            // En previsualización conservamos los data-* de texto para reaplicar
            // alineaciones específicas, pero nunca contenteditable ni barras de tabla.
            let html;
            if (isPreview && block.tipo !== 'imagen' && block.tipo !== 'recurso-visual') {
                html = def.render(block, false,blocks)
                    .replace(/\scontenteditable="(?:true|false)"/g, '')
                    .replace(/\s*<div class="table-context-bar">[\s\S]*?<\/div>\s*/g, '');
            } else {
                html = def.render(block, isPreview,blocks);
            }
            if (!isPreview) html=html.replace(/contenteditable="true"/g,'contenteditable="true" data-placeholder="Escribir…"');
            const props=block.propiedades||{};
            if(legalKeys.includes(block.tipo)) {
                if(/^(?:fa|lne)-[a-z0-9-]+$/.test(props.icon||'')){
                    const icon=renderIcon(props.icon);
                    if(/<i\b[^>]*>/.test(html))html=html.replace(/<i\b[^>]*>[\s\S]*?<\/i>/,icon);
                    else html=html.replace(/(<div\b[^>]*>)/,`$1<span class="lne-component-custom-icon">${icon}</span>`);
                }
                if(props.visualVariant==='compact')html=html.replace(/class="([^"]+)"/,(_,classes)=>`class="${classes} lne-variant-compact"`);
            }
            const style=props.estilo||{};
            const css=['fontFamily','fontSize','color'].filter(key=>style[key]).map(key=>`${key.replace(/[A-Z]/g,letter=>'-'+letter.toLowerCase())}:${String(style[key]).replace(/[<>";]/g,'')};`).join('');
            if(css)html=html.replace(/^(\s*<[a-zA-Z][^>]*)(>)/,(_,tag,end)=>tag.includes('style="')?tag.replace('style="',`style="${css}`)+end:tag+` style="${css}"`+end);
            if(block.tipo==='imagen'&&props.visualIcon)html=html.replace('class="lne-block-imagen"','class="lne-block-imagen lne-visual-icon"');
            return applyStoredAlignments(block, html);
        },
        getLegalComponents: () => {
            return legalKeys.map(k => ({ tipo: k, ...registry[k] }));
        }
    };
})();
