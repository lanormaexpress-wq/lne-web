/** Estructura y control editorial locales. No genera ni valida contenido jurídico. */
window.LNEEditorial=(()=>{
    const KEY='LNE_EDITOR_DOCUMENTS_V1', S=()=>window.LNEState;
    const clone=x=>JSON.parse(JSON.stringify(x));
    const uid=()=>`mat-${crypto.randomUUID()}`;
    function plain(html){const el=document.createElement('div');el.innerHTML=String(html||'');return el.textContent.replace(/\s+/g,' ').trim()}
    function blockText(b,labels=false){
        const p=b.propiedades||{},parts=[b.texto||''];
        function add(x){if(Array.isArray(x))x.forEach(add);else if(typeof x==='string')parts.push(x)}
        ['texto','contenido','criterio','cita','textoA','textoB','col1','col2','items','columnas','headers','rows','pie','concordancias'].forEach(k=>add(p[k]));
        if(labels)['titulo','tituloA','tituloB','badge','autor','obra','tribunal','expediente'].forEach(k=>add(p[k]));
        return plain(parts.join(' '));
    }
    function statistics(state=S().state){const text=state.bloques.map(b=>blockText(b,true)).join(' '),words=(text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)||[]).length;return{words,blocks:state.bloques.length,label:words<150?'Muy breve':words>6000?'Revisar extensión':'Extensión adecuada'}}
    function refreshStats(){const el=document.getElementById('editor-statistics');if(!el)return;const v=statistics();el.textContent=`${v.words} palabras · ${v.blocks} bloques · ${v.label}`;const btn=document.getElementById('btn-editorial-split');if(btn)btn.textContent=S().selectedBlockIds.size?`Separar (${S().selectedBlockIds.size})`:'Separar contenido';const banner=document.getElementById('selection-banner');if(banner)banner.hidden=!S().selectionMode;const create=document.getElementById('selection-create-copy');if(create)create.disabled=!S().selectedBlockIds.size;}
    function review(state=S().state){
        const blocks=state.bloques,out=[],add=(ok,text)=>out.push({ok:!!ok,text});
        function section(pattern,types=[]){return blocks.some((b,i)=>{
            if(!types.includes(b.tipo)&&!pattern.test(plain(`${b.tipo==='titulo'?b.texto||'':''} ${b.propiedades?.titulo||''} ${b.propiedades?.editorialRole||''}`).toLocaleLowerCase('es')))return false;
            if(b.tipo!=='titulo')return !!blockText(b);
            for(let j=i+1;j<blocks.length&&blocks[j].tipo!=='titulo';j++)if(blockText(blocks[j]))return true;
            return false;
        })}
        const title=plain(state.metadata?.titulo);
        add((title&&!/^(t[ií]tulo del tema|tema sin t[ií]tulo|documento en blanco|resumen jur[ií]dico lne)$/i.test(title))||blocks.some(b=>b.tipo==='titulo'&&b.nivel===1&&plain(b.texto)),'Tiene título propio');
        add(section(/introducci[oó]n|presentaci[oó]n/),'Tiene introducción con contenido');
        add(section(/concepto|definici[oó]n/,['concepto']),'Contiene conceptos');
        add(section(/ejemplo|caso pr[aá]ctico/,['ejemplo','caso-practico']),'Tiene ejemplo o caso práctico');
        add(blocks.some(b=>(b.tipo==='imagen'&&b.propiedades?.src)||b.tipo==='tabla'),'Existe recurso visual (imagen o tabla)');
        add(section(/s[ií]ntesis|ideas? clave|conclusi[oó]n/,['sintesis','idea-clave']),'Existe síntesis / ideas clave');
        const long=blocks.filter(b=>b.tipo==='parrafo'&&blockText(b).split(/\s+/).length>180);if(long.length)add(false,`${long.length} párrafo(s) de más de 180 palabras; revisar división`);
        let run=0,lists=false;blocks.forEach(b=>{run=b.tipo==='lista'?run+1:0;if(run>=3)lists=true});if(lists)add(false,'Tres o más listas consecutivas sin bloque explicativo');
        const n=statistics(state).words;if(n<150)add(false,'Documento muy breve: menos de 150 palabras');if(n>6000)add(false,'Documento extenso: más de 6000 palabras; considerar separar temas');return out;
    }
    function createTemplate(){
        const C=window.LNEComponents,blocks=[C.createBlock('titulo',1,'')];
        [['INTRODUCCIÓN','introducción'],['CONCEPTO PRINCIPAL','concepto'],['DESARROLLO','desarrollo'],['EJEMPLO O CASO PRÁCTICO','ejemplo'],['RECURSO VISUAL','recurso visual'],['SÍNTESIS / IDEAS CLAVE','síntesis']].forEach(([heading,role])=>{
            blocks.push(C.createBlock('titulo',2,heading));const b=C.createBlock(role==='recurso visual'?'recurso-visual':'parrafo','');b.propiedades={...(b.propiedades||{}),editorialRole:role};blocks.push(b);
        });S().setDocumentData({metadata:{titulo:'Resumen jurídico LNE'},bloques:blocks});requestAnimationFrame(()=>document.querySelector('.block-type-titulo [contenteditable]')?.focus());
    }
    function current(){const s=S().state;return clone({lneVersion:s.lneVersion,documentoId:s.documentoId,metadata:s.metadata,bloques:s.bloques})}
    function readLibrary(){const raw=localStorage.getItem(KEY),docs=raw?JSON.parse(raw):[];if(!Array.isArray(docs))throw Error('Biblioteca local inválida: no se sobrescribió.');return docs}
    function upsert(docs,doc){const i=docs.findIndex(d=>d.documentoId===doc.documentoId);if(i<0)docs.push(doc);else docs[i]=doc}
    function activate(doc){S().setDocumentData(clone(doc));S().state.documentoId=doc.documentoId;S().state.metadata=clone(doc.metadata);S().state.lneVersion=doc.lneVersion||'1.0';S().saveToStorage();S().notify('local-document-open')}
    function createFromSelected(title){
        const original=current(),blocks=original.bloques.filter(b=>S().selectedBlockIds.has(b.id));if(!blocks.length)throw Error('Selecciona al menos un bloque.');
        const copy={...clone(original),documentoId:uid(),metadata:{...original.metadata,titulo:String(title||'Documento separado').trim()||'Documento separado',fechaCreacion:new Date().toISOString()},bloques:blocks.map(b=>({...clone(b),id:uid()}))};
        const docs=readLibrary();upsert(docs,original);upsert(docs,copy);
        // Persistir ambos antes de cambiar: si falla la cuota, el original no se altera.
        localStorage.setItem(KEY,JSON.stringify(docs));activate(copy);return copy;
    }
    function openDocument(id){const docs=readLibrary();if(!docs.some(d=>d.documentoId===id))throw Error('No se encontró el documento.');upsert(docs,current());localStorage.setItem(KEY,JSON.stringify(docs));activate(docs.find(d=>d.documentoId===id))}
    function dialog(title){const modal=document.getElementById('editorial-modal'),body=document.getElementById('editorial-modal-body');document.getElementById('editorial-modal-title').textContent=title;body.replaceChildren();modal.classList.add('open');return body}
    function message(body,text){const p=document.createElement('p');p.textContent=text;body.append(p)}
    function showReview(){const body=dialog('Revisar estructura');message(body,'Revisión orientativa. No valida información jurídica ni modifica el documento.');const ul=document.createElement('ul');ul.className='editorial-review-list';review().forEach(v=>{const li=document.createElement('li');const missing={'Tiene título propio':'Falta un título propio','Tiene introducción con contenido':'No se encontró introducción con contenido','Contiene conceptos':'No se encontraron conceptos con contenido','Tiene ejemplo o caso práctico':'No se encontró ejemplo o caso práctico','Existe recurso visual (imagen o tabla)':'No existe recurso visual','Existe síntesis / ideas clave':'No se encontró síntesis / ideas clave'};li.textContent=`${v.ok?'✓':'⚠'} ${!v.ok&&missing[v.text]?missing[v.text]:v.text}`;ul.append(li)});body.append(ul);message(body,'Umbrales orientativos: 150 / 6000 palabras; párrafos de más de 180 palabras. No se impone un número de páginas.')}
    function showSplit(){
        S().setSelectionMode(true);
        const body=dialog('Crear nuevo documento con bloques seleccionados');message(body,'Se crea una copia. El original queda íntegro en Documentos locales. Se conserva el orden de los bloques.');
        const title=document.createElement('input');title.id='editorial-copy-title';title.setAttribute('aria-label','Título del nuevo documento');title.value=`${S().state.metadata.titulo} — selección`;
        const list=document.createElement('div');list.className='editorial-block-list';const submit=document.createElement('button');submit.id='editorial-create-copy';submit.className='btn-top';submit.textContent='Crear y abrir copia';submit.disabled=!S().selectedBlockIds.size;
        S().state.bloques.forEach(b=>{const label=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.dataset.copyBlock=b.id;check.checked=S().selectedBlockIds.has(b.id);check.addEventListener('change',()=>{S().toggleBlockForCopy(b.id,check.checked);submit.disabled=!S().selectedBlockIds.size});label.append(check,document.createTextNode(`${b.tipo}: ${blockText(b,true).slice(0,110)||'Bloque vacío'}`));list.append(label)});
        document.getElementById('editorial-modal').dataset.kind='split';
        body.append(title,list,submit);submit.addEventListener('click',()=>{try{createFromSelected(title.value);S().setSelectionMode(false);document.getElementById('editorial-modal').classList.remove('open')}catch(e){message(body,`No se creó la copia: ${e.message}. Exporta ZIP si necesitas liberar almacenamiento.`)}});
    }
    function showDocuments(){const body=dialog('Documentos locales');message(body,'Solo en este navegador y origen. Exporta ZIP para guardar una copia fuera del navegador.');try{const docs=readLibrary();if(!docs.length)message(body,'Todavía no hay documentos separados.');docs.forEach(doc=>{const btn=document.createElement('button');btn.className='modal-option-btn';btn.dataset.localDocument=doc.documentoId;btn.textContent=`${doc.metadata.titulo} · ${doc.bloques.length} bloques${doc.documentoId===S().state.documentoId?' (actual)':''}`;btn.addEventListener('click',()=>{try{openDocument(doc.documentoId);document.getElementById('editorial-modal').classList.remove('open')}catch(e){message(body,e.message)}});body.append(btn)})}catch(e){message(body,e.message)}}
    function init(){
        document.getElementById('opt-nuevo-lne').addEventListener('click',()=>{createTemplate();document.getElementById('modal-nuevo').classList.remove('open')});
        document.getElementById('btn-review-structure').addEventListener('click',showReview);document.getElementById('btn-editorial-split').addEventListener('click',startSelection);document.getElementById('btn-local-documents').addEventListener('click',showDocuments);
        document.getElementById('selection-create-copy').addEventListener('click',showSplit);document.getElementById('selection-cancel').addEventListener('click',()=>S().setSelectionMode(false));
        const modal=document.getElementById('editorial-modal');document.getElementById('editorial-modal-close').addEventListener('click',()=>modal.classList.remove('open'));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});S().subscribe(refreshStats);refreshStats();
    }
    function startSelection(){S().setSelectionMode(true);window.LNEResponsive?.close();document.getElementById('document-menu-actions').hidden=true;}
    return{init,statistics,refreshStats,review,createTemplate,createFromSelected,readLibrary,openDocument,blockText,startSelection};
})();
