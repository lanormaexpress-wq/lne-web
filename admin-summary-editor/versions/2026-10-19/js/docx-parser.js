/**
 * DOCX-PARSER.JS - Analizador Inteligente de Word (.docx) a Bloques LNE
 * Extrae la jerarquía documental, preserva imágenes originales, reconoce títulos/subtítulos,
 * agrupa listas consecutivas, reconstruye diagramas jurídicos (Pirámide de Kelsen) y
 * propone componentes de Diseño Jurídico ante patrones evidentes.
 */

window.LNEDocxParser = (function () {
    function recoverListMetadata(xml,numbering='',styles='') {
        const attr=(raw,tag)=>raw.match(new RegExp('<w:'+tag+'\\b[^>]*\\bw:val=["\x27]([^"\x27]*)'))?.[1]?.replace(/&(?:amp|lt|gt|quot|apos);/g,value=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'"}[value]));
        const levels=raw=>Object.fromEntries([...raw.matchAll(/<w:lvl\b[^>]*w:ilvl="(\d+)"[^>]*>[\s\S]*?<\/w:lvl>/g)].map(m=>[m[1],{format:attr(m[0],'numFmt')||'decimal',text:attr(m[0],'lvlText')||'%1.',start:Number(attr(m[0],'start'))||1}]));
        const abstracts=new Map([...numbering.matchAll(/<w:abstractNum\b[^>]*w:abstractNumId="(\d+)"[^>]*>[\s\S]*?<\/w:abstractNum>/g)].map(m=>[m[1],levels(m[0])]));
        const nums=new Map([...numbering.matchAll(/<w:num\b[^>]*w:numId="(\d+)"[^>]*>[\s\S]*?<\/w:num>/g)].map(m=>{
            const defs={...(abstracts.get(attr(m[0],'abstractNumId'))||{})};
            for(const override of m[0].matchAll(/<w:lvlOverride\b[^>]*w:ilvl="(\d+)"[^>]*>[\s\S]*?<\/w:lvlOverride>/g)){
                Object.assign(defs,levels(override[0]));const value=attr(override[0],'startOverride');if(value)defs[override[1]]={...(defs[override[1]]||{format:'decimal',text:'%1.'}),start:Number(value)||1};
            }return [m[1],defs];
        }));
        const paragraphStyles=new Map([...styles.matchAll(/<w:style\b[^>]*w:styleId="([^"]+)"[^>]*>[\s\S]*?<\/w:style>/g)].map(m=>[m[1],{num:attr(m[0],'numId'),level:attr(m[0],'ilvl'),parent:attr(m[0],'basedOn')}]));
        function inherited(id,seen=new Set()){if(!id||seen.has(id))return {};seen.add(id);const style=paragraphStyles.get(id);return style?{...inherited(style.parent,seen),...Object.fromEntries(Object.entries(style).filter(([k,v])=>k!=='parent'&&v!==undefined))}:{};}
        const records=[],prefix='LNE_LIST_'+crypto.randomUUID().replace(/-/g,'')+'_';
        xml=xml.replace(/<w:p(?=\s|>)[\s\S]*?<\/w:p>/g,raw=>{
            const props=raw.match(/<w:pPr\b[\s\S]*?<\/w:pPr>/)?.[0]||'',base=inherited(attr(props,'pStyle')),id=attr(props,'numId')??base.num,level=Math.max(0,Math.min(8,Number(attr(props,'ilvl')??base.level)||0));
            if(!id||id==='0'||!nums.has(id))return raw;
            const token=prefix+records.length+'_END';records.push({token,numId:id,level,definitions:nums.get(id)});
            const run=`<w:r><w:t>${token}</w:t></w:r>`;
            return props?raw.replace(props,props+run):raw.replace(/(<w:p(?:\s[^>]*)?>)/,'$1'+run);
        });
        return {xml,records};
    }

    function listStyleFromDocx(record) {
        const defs=record?.definitions||{},level=defs[record?.level||0]||defs[0],format=level?.format||'decimal',text=level?.text||'%1.';
        if(format==='bullet')return {formato:'vinetas',listStyle:({'○':'circle','o':'circle','▪':'square','–':'dash','-':'dash','→':'arrow','✓':'check'}[text]||'disc')};
        const names={decimal:'decimal',upperLetter:'upper-alpha',lowerLetter:'lower-alpha',upperRoman:'upper-roman',lowerRoman:'lower-roman'};
        if(/%\d[^%]*%\d/.test(text))return {formato:'multinivel',listStyle:'decimal-outline'};
        const sequence=[0,1,2].map(n=>defs[n]?.format).join(',');
        const scheme={'upperRoman,upperLetter,decimal':'roman-alpha-decimal','upperLetter,decimal,lowerLetter':'alpha-decimal-alpha'}[sequence]||(sequence==='decimal,lowerLetter,lowerRoman'&&/\)/.test(text)?'paren-outline':null);
        if(scheme&&Object.keys(defs).length>1)return {formato:'multinivel',listStyle:scheme};
        return {formato:'numerada',listStyle:format==='decimal'&&/\)/.test(text)?'decimal-paren':names[format]||'decimal'};
    }

    function parseListElement(element,records=[]) {
        const entries=[];
        function walk(list,depth){for(const li of [...list.children].filter(child=>child.tagName==='LI')){
            let html;if(li.cloneNode){const clone=li.cloneNode(true);clone.querySelectorAll('ol,ul').forEach(el=>el.remove());html=clone.innerHTML;}else html=li.innerHTML.replace(/<(?:ol|ul)\b[\s\S]*?<\/(?:ol|ul)>/gi,'');
            const record=records.find(r=>html.includes(r.token));if(record)html=html.split(record.token).join('');
            entries.push({html:html.trim(),level:record?.level??depth,record});for(const nested of [...li.children].filter(child=>['OL','UL'].includes(child.tagName)))walk(nested,depth+1);
        }}walk(element,0);
        const blocks=[];let current=null,lastKey=null;
        for(const entry of entries){const spec=entry.record?listStyleFromDocx(entry.record):{formato:element.tagName==='OL'?(entries.some(e=>e.level>0)?'multinivel':'numerada'):'vinetas',listStyle:element.tagName==='OL'?(entries.some(e=>e.level>0)?'decimal-outline':'decimal'):'disc'};
            const key=entry.record?entry.record.numId+':'+spec.formato+':'+spec.listStyle:spec.formato;
            if(key!==lastKey){current=window.LNEComponents.createBlock('lista',spec.formato,[]);Object.assign(current.propiedades,spec,{itemLevels:[],startValue:entry.record?.definitions?.[0]?.start||Number(element.getAttribute('start'))||1});if(entry.record)Object.assign(current.propiedades,{numId:entry.record.numId,docxLevels:entry.record.definitions});blocks.push(current);lastKey=key;}
            current.propiedades.items.push(entry.html);current.propiedades.itemLevels.push(entry.level);
        }return blocks;
    }
    function recoverSimpleShapes(xml) {
        const map={rightArrow:'lne-right',leftArrow:'lne-left',upArrow:'lne-up',downArrow:'lne-down',chevron:'lne-chevron',line:'lne-line'};
        const icons=[],warnings=[],prefix='LNE_SHAPE_'+crypto.randomUUID().replace(/-/g,'')+'_';
        const paragraphs=[...xml.matchAll(/<w:p(?=\s|>)[\s\S]*?<\/w:p>/g)];
        const replacements=new Map();
        const token=icon=>{const value=prefix+icons.length+'_END';icons.push({value,icon});return value;};
        for(let i=0;i<paragraphs.length;i++) {
            const p=paragraphs[i][0];
            const shapes=[...p.matchAll(/<mc:AlternateContent\b[\s\S]*?<\/mc:AlternateContent>|<w:drawing\b[\s\S]*?<\/w:drawing>/g)]
                .filter(match=>!/a:blip\b/.test(match[0])&&/a:prstGeom\b/.test(match[0]));
            if(/<w:drawing\b/.test(p)&&!/a:blip\b/.test(p)&&!shapes.length)warnings.push('Gráfico DOCX complejo sin imagen de respaldo: requiere revisión; no se inventó una reconstrucción.');
            if(!shapes.length)continue;
            const entries=shapes.map(match=>({raw:match[0],icon:map[match[0].match(/<a:prstGeom[^>]*prst="([^"]+)"/)?.[1]],x:Number(match[0].match(/<wp:positionH\b[\s\S]*?<wp:posOffset>(-?\d+)/)?.[1]),y:Number(match[0].match(/<wp:positionV\b[\s\S]*?<wp:posOffset>(-?\d+)/)?.[1])}));
            if(entries.some(e=>!e.icon)){warnings.push('Forma DOCX no reconocida: requiere revisión visual; no se reconstruyó automáticamente.');continue;}
            if(/<w:t(?:\s|>)/.test(p)) {
                let next=p;for(const entry of entries)next=next.replace(entry.raw,`<w:t>${token(entry.icon)}</w:t>`);
                replacements.set(paragraphs[i].index,next);continue;
            }
            const following=paragraphs[i+1]?.[0];
            const gaps=following?[...following.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g)].flatMap(m=>[...m[1].matchAll(/\s{2,}/g)]):[];
            const aligned=entries.every(e=>Number.isFinite(e.x)&&Number.isFinite(e.y))&&Math.max(...entries.map(e=>e.y))-Math.min(...entries.map(e=>e.y))<914400;
            if(following&&gaps.length===entries.length&&aligned&&!/<w:drawing|<w:pict/.test(following)) {
                entries.sort((a,b)=>a.x-b.x);let n=0;
                const next=following.replace(/(<w:t\b[^>]*>)([\s\S]*?)(<\/w:t>)/g,(_,open,text,close)=>open+text.replace(/\s{2,}/g,()=>` ${token(entries[n++].icon)} `)+close);
                replacements.set(paragraphs[i+1].index,next);
                let cleaned=p;for(const entry of entries)cleaned=cleaned.replace(entry.raw,'');
                replacements.set(paragraphs[i].index,cleaned);
            } else {
                // Keep an explicit editable representation, and flag uncertain
                // anchoring instead of silently dropping the relationship.
                let next=p;for(const entry of entries)next=next.replace(entry.raw,`<w:t>${token(entry.icon)}</w:t>`);
                replacements.set(paragraphs[i].index,next);
                warnings.push('Flechas recuperadas; su asociación con los textos requiere revisión visual.');
            }
        }
        for(const p of [...paragraphs].reverse())if(replacements.has(p.index))xml=xml.slice(0,p.index)+replacements.get(p.index)+xml.slice(p.index+p[0].length);
        return {xml,icons,warnings};
    }
    // El generador recibe únicamente texto extraído del Word. Nunca añade niveles ni etiquetas.
    function generateLegalPyramidSVG(levels) {
        const cleanLevels = (levels || []).map(value => String(value || '').trim()).filter(Boolean);
        if (cleanLevels.length < 3) return null;
        const height = Math.max(340, 105 + cleanLevels.length * 76);
        const colors = ['#b58a20', '#1b263b', '#344b68', '#64748b', '#e7edf4', '#d7dee8'];
        const escapeSvg = text => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
        const bands = cleanLevels.map((level, index) => {
            const y1 = 30 + index * 76;
            const y2 = y1 + 76;
            const topHalf = index * (180 / cleanLevels.length);
            const bottomHalf = (index + 1) * (180 / cleanLevels.length);
            const fill = colors[index % colors.length];
            const light = ['#e7edf4', '#d7dee8'].includes(fill);
            const textColor = light ? '#1b263b' : '#ffffff';
            const fontSize = level.length > 58 ? 11 : level.length > 38 ? 12 : 14;
            const lines = level.match(/.{1,38}(?:\s|$)|\S.{0,37}/g) || [level];
            return `<polygon points="${220 - topHalf},${y1} ${220 + topHalf},${y1} ${220 + bottomHalf},${y2} ${220 - bottomHalf},${y2}" fill="${fill}" stroke="#ffffff" stroke-width="1"/><path d="M${220 + (topHalf + bottomHalf) / 2},${y1 + 38} H430" stroke="#64748b" fill="none"/><text x="440" y="${y1 + 32}" font-family="Arial, sans-serif" font-size="${fontSize}" fill="#1b263b">${lines.slice(0,4).map((line,k)=>`<tspan x="440" dy="${k ? 16 : 0}">${escapeSvg(line.trim())}</tspan>`).join('')}</text>`;
        }).join('');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 ${height}" width="800" height="${height}"><rect width="800" height="${height}" fill="#fafbfe" rx="8"/>${bands}</svg>`;
        return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    }

    function detectPyramid(elements, index) {
        const heading = (elements[index].textContent || '').trim();
        if (!/^(?:pir[aá]mide(?:\s+normativa|\s+jur[ií]dica)?\s+(?:de\s+)?kelsen|jerarqu[ií]a\s+normativa\s+(?:de\s+)?kelsen)\s*[:.]?$/i.test(heading)) return null;
        const category = value => value.match(/^(constituci[oó]n(?:\s+pol[ií]tica)?|tratados?\s+internacionales?|leyes?(?:\s+org[aá]nicas?|\s+ordinarias?)?|decretos?(?:\s+legislativos?|\s+supremos?|\s+de\s+urgencia)?|reglamentos?|resoluciones?(?:\s+ministeriales?|\s+administrativas?)?)\s*[.:]?$/i)?.[1];
        const levels = [];
        let end = index + 1;
        while (end < elements.length && levels.length < 10) {
            const el = elements[end];
            if (el.querySelector('img,table') || !['P','UL','OL'].includes(el.tagName)) break;
            const values = ['UL','OL'].includes(el.tagName) ? [...el.children].map(li=>li.textContent.trim()) : [el.textContent.trim()];
            if (!values.length || values.some(value=>!category(value))) break;
            levels.push(...values);end++;
        }
        if (new Set(levels.map(value=>category(value).toLowerCase())).size < 3) return null;
        return { heading, levels, end };
    }

    async function importIntoEditor(file) {
        const epoch = ++window.LNEState.documentEpoch;
        const parsed = await parseDocxFile(file);
        // Una importación anterior o un "Nuevo" no puede resucitar contenido antiguo.
        if (epoch !== window.LNEState.documentEpoch) return null;
        window.LNEState.setDocumentData({ metadata:parsed.metadata, bloques:parsed.blocks });
        if(parsed.warnings?.length&&typeof window.alert==='function')window.alert('Revisa la importación:\n'+[...new Set(parsed.warnings)].slice(0,8).join('\n'));
        return parsed;
    }

    /**
     * Procesa un archivo .docx y devuelve { metadata, blocks }
     */
    async function parseDocxFile(file) {
        if (!file) throw new Error("No se ha seleccionado ningún archivo.");

        if (!window.mammoth || typeof window.mammoth.convertToHtml !== 'function') {
            throw new Error("El motor Mammoth.js no está cargado.");
        }

        let arrayBuffer = await file.arrayBuffer();
        let recovered={icons:[],warnings:[]};
        let listRecords=[];
        if(window.JSZip) {
            const zip=await window.JSZip.loadAsync(arrayBuffer),part=zip.file('word/document.xml');
            if(part) {
                const original=await part.async('string');recovered=recoverSimpleShapes(original);
                const numbering=await zip.file('word/numbering.xml')?.async('string')||'',styles=await zip.file('word/styles.xml')?.async('string')||'';
                const lists=recoverListMetadata(recovered.xml,numbering,styles);listRecords=lists.records;
                if(lists.xml!==original){zip.file('word/document.xml',lists.xml);arrayBuffer=await zip.generateAsync({type:'arraybuffer'});}
            }
        }

        // Extraer imágenes incrustadas como DataURLs Base64 originales
        const options = {
            convertImage: window.mammoth.images.imgElement(function (image) {
                return image.read("base64").then(function (imageBuffer) {
                    return {
                        src: "data:" + image.contentType + ";base64," + imageBuffer
                    };
                });
            })
        };

        const result = await window.mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, options);
        let htmlString = result.value;
        for(const {value,icon} of recovered.icons)htmlString=htmlString.split(value).join(`<span class="lne-inline-legal-icon" contenteditable="false" data-inline-icon-id="${crypto.randomUUID()}" data-icon="${icon}" style="font-size:20px;color:#1b263b;">${window.LNEComponents.renderIcon(icon)}</span>`);

        const parsed=interpretHtmlToLneDocument(htmlString, file.name,listRecords);
        parsed.warnings=[...recovered.warnings,...(result.messages||[]).map(message=>message.message)];
        return parsed;
    }

    /**
     * Interpreta la estructura documental y genera metadatos + bloques LNE
     */
    function interpretHtmlToLneDocument(htmlString, fileName,listRecords=[]) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const blocks = [];
        // Mammoth can leave unsupported numbering or table-cell lists outside a
        // top-level list. Internal metadata tokens must never enter user content.
        for(const el of [...doc.body.children])if(!['OL','UL'].includes(el.tagName)){
            let html=el.innerHTML;for(const record of listRecords)if(html.includes(record.token))html=html.split(record.token).join('');
            if(html!==el.innerHTML)el.innerHTML=html;
        }

        // 1. Detección Inteligente de Cabecera (Curso, Tema N.°, Título)
        const detectedMeta = extractMetadataFromFileNameAndHeadings(fileName, doc);

        // Filtrar elementos vacíos o con solo espacios en blanco
        const rawElements = Array.from(doc.body.children);
        const elements = rawElements.filter(el => {
            const hasImg = el.querySelector('img') || el.tagName.toLowerCase() === 'img';
            const hasTable = el.tagName.toLowerCase() === 'table';
            const hasText = (el.textContent || '').trim().length > 0;
            return hasImg || hasTable || hasText;
        });

        let skippedFirstHeadingAsDocTitle = false;
        const previousLists=new Map();
        let i = 0;

        while (i < elements.length) {
            const el = elements[i];
            const tag = el.tagName.toLowerCase();
            const textContent = (el.textContent || '').trim();
            const innerHTML = (el.innerHTML || '').trim();
            const lowerText = textContent.toLowerCase();
            if(tag==='ol'||tag==='ul'){
                for(const list of parseListElement(el,listRecords)){
                    const key=list.propiedades.numId;
                    if(key&&list.propiedades.formato!=='vinetas'&&previousLists.has(key))list.propiedades.continueFrom=previousLists.get(key);
                    if(key)previousLists.set(key,list.id);blocks.push(list);
                }i++;continue;
            }
            if(innerHTML.includes('lne-inline-legal-icon')){blocks.push(window.LNEComponents.createBlock('parrafo',innerHTML));i++;continue;}
            // Structural tables precede image/heading heuristics. A drawing inside
            // a cell must not turn the entire table into detached text and images.
            if(tag==='table') {
                const table=parseTableElement(el);
                if(table)blocks.push(table);
                i++;continue;
            }

            // ==================================================================
            // A. PRESERVACIÓN DE IMÁGENES INCRUSTADAS EN WORD
            // ==================================================================
            const imgs = el.querySelectorAll('img');
            if (imgs.length > 0 || tag === 'img') {
                const imgList = imgs.length > 0 ? Array.from(imgs) : [el];
                imgList.forEach(imgEl => {
                    if (imgEl.src) {
                        blocks.push(window.LNEComponents.createBlock('imagen', imgEl.src, ''));
                    }
                });

                // Si además contenía texto significativo fuera de la imagen
                const textWithoutImg = textContent;
                if (textWithoutImg.length > 10) {
                    blocks.push(window.LNEComponents.createBlock('parrafo', textWithoutImg));
                }
                i++;
                continue;
            }

            // ==================================================================
            // B. RECONSTRUCCIÓN DEL DIAGRAMA: PIRÁMIDE DE KELSEN
            // ==================================================================
            // Solo recrea un diagrama cuando hay al menos tres niveles consecutivos inequívocos.
            // Si no hay seguridad, el flujo normal conserva cada elemento original de Word.
            const pyramid = detectPyramid(elements, i);
            if (pyramid) {
                const svg = generateLegalPyramidSVG(pyramid.levels);
                if (svg) {
                    const blockImg = window.LNEComponents.createBlock('imagen', svg, '');
                    blockImg.propiedades.ancho = '100%';
                    blockImg.propiedades.alineacion = 'align-center';
                    blockImg.propiedades.generatedDiagram = 'kelsen';
                    blockImg.propiedades.detectedLevels = pyramid.levels;
                    blocks.push(window.LNEComponents.createBlock('titulo', 2, pyramid.heading));
                    blocks.push(blockImg);
                    i = pyramid.end;
                    continue;
                }
            }

            // ==================================================================
            // C. TÍTULOS Y SUBTÍTULOS ESTRUCTURALES
            // ==================================================================
            // Reconoce tags h1-h6 y párrafos en negrita/mayúsculas con significado de sección
            const isBoldOnly = /^<strong>[\s\S]+?<\/strong>[\s.:;]*$/i.test(innerHTML);
            const isUpperCaseShort = textContent.length >= 3 && textContent.length <= 80 && textContent === textContent.toUpperCase() && /[A-ZÁÉÍÓÚÑ]/.test(textContent);
            const isHeadingTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag);
            const isHeadingParagraph = tag === 'p' && (isBoldOnly || isUpperCaseShort);

            if (isHeadingTag || isHeadingParagraph) {
                let cleanHeading = textContent.replace(/[:.]+$/, '').trim();

                // Evitar duplicar el título principal del tema en la hoja si ya encabeza la cabecera
                if (!skippedFirstHeadingAsDocTitle && cleanHeading.toLowerCase() === detectedMeta.titulo.toLowerCase()) {
                    skippedFirstHeadingAsDocTitle = true;
                    i++;
                    continue;
                }

                let nivel = 2;
                if (tag === 'h1') nivel = 1;
                else if (tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') nivel = 3;

                blocks.push(window.LNEComponents.createBlock('titulo', nivel, cleanHeading));
                i++;
                continue;
            }

            // ==================================================================
            // D. DEFINICIONES JURÍDICAS SECUENCIALES (SUPUESTO DE HECHO, ETC.)
            // ==================================================================
            if (tag === 'ul' && textContent.length < 50 && elements[i + 1] && elements[i + 1].tagName.toLowerCase() === 'p' && !elements[i + 1].querySelector('img')) {
                const termTitle = textContent.replace(/[:.]+$/, '').trim();
                const descText = elements[i + 1].innerHTML.trim();
                blocks.push(window.LNEComponents.createBlock('titulo', 3, termTitle));
                blocks.push(window.LNEComponents.createBlock('parrafo', descText));
                i += 2;
                continue;
            }

            // ==================================================================
            // G. TABLAS
            // ==================================================================
            if (tag === 'table') {
                const tableBlock = parseTableElement(el);
                if (tableBlock) blocks.push(tableBlock);
                i++;
                continue;
            }

            // ==================================================================
            // H. CITAS Y BLOQUES DE RESALTE (BLOCKQUOTE)
            // ==================================================================
            if (tag === 'blockquote') {
                blocks.push(window.LNEComponents.createBlock('cuadro', {
                    subtipo: 'cols-1',
                    conEncabezado: false,
                    columnas: [innerHTML]
                }));
                i++;
                continue;
            }

            // ==================================================================
            // I. EJEMPLOS Y CASOS PRÁCTICOS
            // ==================================================================
            if (textContent.startsWith('“') || /^Ejemplo(?:\s+práctico)?\s*[:：]/i.test(textContent) || (blocks.length > 0 && String(blocks[blocks.length - 1].texto || '').includes('Ejemplo práctico'))) {
                const ejBlock = window.LNEComponents.createBlock('ejemplo');
                ejBlock.propiedades.titulo = "Caso Práctico Ilustrativo";
                ejBlock.propiedades.texto = innerHTML;
                blocks.push(ejBlock);
                i++;
                continue;
            }

            // ==================================================================
            // J. COMPONENTES JURÍDICOS ESPECIALIZADOS POR PATRONES
            // ==================================================================
            if (tag === 'p') {
                const proposedBlock = proposeLegalComponentFromParagraph(textContent, innerHTML);
                if (proposedBlock) {
                    blocks.push(proposedBlock);
                } else {
                    blocks.push(window.LNEComponents.createBlock('parrafo', innerHTML));
                }
                i++;
                continue;
            }

            // Fallback genérico
            blocks.push(window.LNEComponents.createBlock('parrafo', innerHTML));
            i++;
        }

        // Si el documento resultó vacío
        if (blocks.length === 0) {
            blocks.push(window.LNEComponents.createBlock('parrafo', 'Comienza a redactar el contenido de este tema...'));
        }

        return {
            metadata: detectedMeta,
            blocks: blocks
        };
    }

    /**
     * Detección de patrones como "3. Semana 3 - La Norma Jurídica"
     */
    function extractMetadataFromFileNameAndHeadings(fileName, doc) {
        let cleanName = (fileName || 'Documento').replace(/\.[^/.]+$/, "");
        
        let temaNumero = "1";
        let temaTitulo = cleanName;
        let curso = "Formación Jurídica";

        // Regex para detectar patrones: "3. Semana 3 - La Norma Jurídica", "Semana 4: Las Obligaciones", "Tema 02 - Los Contratos"
        const temaMatch = cleanName.match(/(?:^|\b)(?:Semana|Tema|Lecci[oó]n|Unidad)\s*(?:N\.?[°ºo]?)?\s*([0-9]+)\s*[\-–—:]*\s*(.*)$/i);
        const numLeadingMatch = cleanName.match(/^([0-9]+)[\.\-\s]+(?:Semana|Tema|Lecci[oó]n)?\s*([0-9]*)\s*[\-–—:]*\s*(.*)$/i);

        if (temaMatch) {
            temaNumero = temaMatch[1];
            if (temaMatch[2] && temaMatch[2].trim()) {
                temaTitulo = temaMatch[2].trim();
            }
        } else if (numLeadingMatch) {
            temaNumero = numLeadingMatch[2] || numLeadingMatch[1];
            if (numLeadingMatch[3] && numLeadingMatch[3].trim()) {
                temaTitulo = numLeadingMatch[3].trim();
            }
        }

        // Si hay un H1 o primer párrafo en negrita que actúe como título principal
        const firstH1 = doc.querySelector('h1');
        if (firstH1 && firstH1.textContent.trim().length > 3) {
            const h1Text = firstH1.textContent.trim();
            const h1TemaMatch = h1Text.match(/(?:Semana|Tema|Lecci[oó]n)\s*(?:N\.?[°ºo]?)?\s*([0-9]+)\s*[\-–—:]*\s*(.*)$/i);
            if (h1TemaMatch) {
                temaNumero = h1TemaMatch[1];
                if (h1TemaMatch[2] && h1TemaMatch[2].trim()) temaTitulo = h1TemaMatch[2].trim();
            } else {
                temaTitulo = h1Text;
            }
        } else {
            // Verificar si el primer párrafo es un título destacado
            const firstP = doc.querySelector('p');
            if (firstP) {
                const firstPText = firstP.textContent.replace(/[:.]+$/, '').trim();
                const firstPInner = firstP.innerHTML.trim();
                if (/^<strong>[\s\S]+?<\/strong>[\s.:;]*$/i.test(firstPInner) && firstPText.length <= 60) {
                    temaTitulo = firstPText;
                }
            }
        }

        return {
            curso: curso,
            temaNumero: temaNumero,
            titulo: temaTitulo.toUpperCase(),
            autor: "La Norma Express"
        };
    }

    /**
     * Reconoce inicios evidentes ("IMPORTANTE:", "ADVERTENCIA:", "Casación...", etc.)
     * para proponer el bloque visual sin inventar contenido.
     */
    function proposeLegalComponentFromParagraph(textContent, innerHTML) {
        // 1. IMPORTANTE
        const matchImp = textContent.match(/^(?:IMPORTANTE|Importante)\s*[:：\-–—]\s*(.*)$/i);
        if (matchImp) {
            const block = window.LNEComponents.createBlock('importante');
            block.propiedades.titulo = "Importante";
            block.propiedades.texto = matchImp[1] || innerHTML;
            return block;
        }

        // 2. ADVERTENCIA
        const matchAdv = textContent.match(/^(?:ADVERTENCIA|Advertencia|ATENCI[OÓ]N|Atenci[oó]n)\s*[:：\-–—]\s*(.*)$/i);
        if (matchAdv) {
            const block = window.LNEComponents.createBlock('advertencia');
            block.propiedades.titulo = "Advertencia";
            block.propiedades.texto = matchAdv[1] || innerHTML;
            return block;
        }

        // 3. TEN CUIDADO / PRECAUCIÓN
        const matchCui = textContent.match(/^(?:TEN CUIDADO|Ten cuidado|PRECAUCI[OÓ]N|Precauci[oó]n)\s*[:：\-–—]\s*(.*)$/i);
        if (matchCui) {
            const block = window.LNEComponents.createBlock('ten-cuidado');
            block.propiedades.titulo = "Ten Cuidado";
            block.propiedades.texto = matchCui[1] || innerHTML;
            return block;
        }

        // 4. EJEMPLO / CASO PRÁCTICO
        const matchEjm = textContent.match(/^(?:EJEMPLO|Ejemplo|CASO PR[AÁ]CTICO|Caso pr[aá]ctico)\s*[:：\-–—]\s*(.*)$/i);
        if (matchEjm) {
            const block = window.LNEComponents.createBlock('ejemplo');
            block.propiedades.titulo = "Ejemplo Ilustrativo";
            block.propiedades.texto = matchEjm[1] || innerHTML;
            return block;
        }

        // 5. RECUERDA
        const matchRec = textContent.match(/^(?:RECUERDA|Recuerda|TENER EN CUENTA|Tener en cuenta)\s*[:：\-–—]\s*(.*)$/i);
        if (matchRec) {
            const block = window.LNEComponents.createBlock('recuerda');
            block.propiedades.titulo = "Recuerda";
            block.propiedades.texto = matchRec[1] || innerHTML;
            return block;
        }

        // 6. JURISPRUDENCIA (Casación, Expediente, Sentencia)
        const matchJur = textContent.match(/^(?:Casaci[oó]n|CASACI[OÓ]N|Expediente|EXPEDIENTE|Sentencia|R\.?T\.?F\.?|Pleno Casatorio)\s+N\.?[°ºo]?\s*([0-9\-\/A-Za-z]+)\s*[:：\-–—\.]*\s*(.*)$/i);
        if (matchJur) {
            const block = window.LNEComponents.createBlock('jurisprudencia');
            block.propiedades.tribunal = "Criterio Jurisprudencial";
            block.propiedades.expediente = `Casación / Expediente N.° ${matchJur[1]}`;
            block.propiedades.criterio = matchJur[2] ? `«${matchJur[2]}»` : textContent;
            block.propiedades.contenido = innerHTML;
            return block;
        }

        // 7. NORMATIVA (Artículo X de ley/código)
        const matchNorm = textContent.match(/^(?:Art[ií]culo|Art\.?|ART[IÍ]CULO|ART\.?)\s+([0-9]+[A-Za-z0-9\-\.]*)\s*[:：\-–—\.]*\s*(.*)$/i);
        if (matchNorm) {
            const block = window.LNEComponents.createBlock('normativa');
            block.propiedades.badge = "Disposición Normativa";
            block.propiedades.titulo = `Artículo ${matchNorm[1]}`;
            block.propiedades.texto = matchNorm[2] || innerHTML;
            return block;
        }

        // 8. IDEA CLAVE
        const matchIdea = textContent.match(/^(?:IDEA CLAVE|Idea clave|PREMISA FUNDAMENTAL|Premisa fundamental)\s*[:：\-–—]\s*(.*)$/i);
        if (matchIdea) {
            const block = window.LNEComponents.createBlock('idea-clave');
            block.propiedades.titulo = "Idea Clave";
            block.propiedades.texto = matchIdea[1] || innerHTML;
            return block;
        }

        return null;
    }

    function parseTableElement(tableEl) {
        const rows=[];
        const visit=node=>Array.from(node.children||[]).forEach(child=>{
            if(child.tagName==='TR')rows.push(child);
            else if(['THEAD','TBODY','TFOOT'].includes(child.tagName))visit(child);
        });
        visit(tableEl);
        if (rows.length === 0) return null;

        const tableData = [];
        const cellSpans=[];
        rows.forEach(tr => {
            const cells = Array.from(tr.children).filter(cell=>['TH','TD'].includes(cell.tagName));
            if(cells.length) {
                tableData.push(cells.map(cell=>cell.innerHTML.trim()));
                cellSpans.push(cells.map(cell=>({colspan:Math.max(1,Number(cell.getAttribute('colspan'))||1),rowspan:Math.max(1,Number(cell.getAttribute('rowspan'))||1)})));
            }
        });

        if (tableData.length === 0) return null;

        const headers = tableData[0];
        const bodyRows = tableData.slice(1);

        return window.LNEComponents.createBlock('tabla', {
            headers: headers.length > 0 ? headers : ['Columna 1', 'Columna 2'],
            rows: bodyRows,
            cellSpans
        });
    }

    return {
        recoverListMetadata,
        recoverSimpleShapes,
        parseDocxFile,
        importIntoEditor,
        generateLegalPyramidSVG
    };
})();
