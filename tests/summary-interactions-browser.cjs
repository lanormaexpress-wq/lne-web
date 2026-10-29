// Isolated Chromium + real editor. No Auth, Supabase or production writes.
const express=require('express'),path=require('path'),fs=require('fs'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=process.env.LNE_VISUAL_OUTPUT||fs.mkdtempSync(path.join(require('os').tmpdir(),'lne-interactions-'));
const app=express();app.use('/admin/resumenes',require('../lib/summary-editor')((req,_res,next)=>{req.adminUser={id:'mock-owner-interactions',app_metadata:{role:'owner'}};next();}));app.use(express.static(root));
const server=app.listen(0,'127.0.0.1',async()=>{let browser;try{
 const base=`http://127.0.0.1:${server.address().port}`;
 const session=await fetch(base+'/admin/resumenes/session',{method:'POST'}),cookie=session.headers.get('set-cookie').split(';')[0];
 const manifest=await(await fetch(base+'/admin/resumenes/resources',{headers:{cookie}})).json();
 assert.equal(manifest.resources.filter(r=>r.as==='style').length,3);
 assert.ok(manifest.resources.some(r=>r.url.includes('groups.js?v=20261029-flow-semantics-1')&&r.as==='script'));
 assert.ok(manifest.resources.some(r=>r.url.includes('editor.css?v=20261029-flow-semantics-1')&&r.as==='style'));
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/admin-summary-editor/versions/2026-10-19/index.html`);
 await page.waitForFunction(()=>window.LNEInteractions&&window.LNEState);await page.evaluate(()=>document.fonts.ready);
 const settle=()=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 const fixture=async(type='titulo',text='Título de una línea',layout={})=>{
  const id=await page.evaluate(({type,text,layout})=>{const b=LNEComponents.createBlock(type,...(type==='titulo'?[3,text]:type==='parrafo'?[text]:[]));b.propiedades={...b.propiedades,layout};LNEState.setDocumentData({metadata:{titulo:'Prueba temporal de interacción'},bloques:[b]});LNEState.selectBlock(b.id);document.getElementById('sheet-zoom-actual').click();return b.id;},{type,text,layout});await settle();return id;
 };
 const geometry=id=>page.locator('#block-'+id).evaluate(el=>{const r=LNEInteractions.visualRect(el),o=el.querySelector('.lne-selection-outline')?.getBoundingClientRect();return{r:{left:r.left,top:r.top,width:r.width,height:r.height},outline:o?{width:o.width,height:o.height}:null,wrapper:el.offsetHeight};});
 const report=[];
 let id=await fixture();let a=await geometry(id);assert.ok(a.r.height<a.wrapper);assert.ok(Math.abs(a.outline.height-a.r.height)<1);report.push('1: título compacto');
 id=await fixture('titulo','Título jurídico de dos líneas y contenido adicional',{mode:'flow',width:210});a=await geometry(id);assert.ok(a.r.height>35);report.push('2: título dos líneas');
 id=await fixture('parrafo','Párrafo de contenido jurídico. '.repeat(20));a=await geometry(id);assert.ok(a.r.height>100&&a.r.height<a.wrapper);report.push('3: párrafo');
 for(const [number,type] of [[4,'imagen'],[5,'normativa'],[6,'tabla'],[6,'cuadro'],[6,'columnas'],[6,'separador']]){
  id=await fixture(type);if(type==='imagen'){
   await page.evaluate(id=>{const b=LNEState.getBlockById(id);b.propiedades.src='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="100"><rect width="180" height="100" fill="#334155"/></svg>');b.propiedades.layout={mode:'flow',width:180,height:100};LNEState.notify('fixture');},id);await settle();await page.locator('#block-'+id+' img').evaluate(img=>img.decode());await page.evaluate(()=>LNEInteractions.queue());await settle();
  }a=await geometry(id);assert.ok(a.r.width>0&&a.r.height>0);assert.ok(Math.abs(a.outline.width-a.r.width)<1);if(type==='imagen')assert.ok(a.r.width<190);report.push(number+': '+type);
 }
 const math=await page.evaluate(()=>{
  const I=LNEInteractions,rect=(left,top,width=100,height=20)=>({left,top,right:left+width,bottom:top+height,width,height}),page=rect(0,0,860,1150),peer=rect(100,100);
  const left=I.matchingGuides(rect(102,300),[peer],page,3),center=I.matchingGuides(rect(125,300,50),[peer],page,3),right=I.matchingGuides(rect(150,300,50),[peer],page,3);
  const peers=[rect(100,100),rect(100,212)],vertical=I.equalGaps(rect(100,324),peers,I.gapReferences(peers),3);
  const horizontalPeers=[rect(100,100),rect(240,100)],horizontal=I.equalGaps(rect(380,100),horizontalPeers,I.gapReferences(horizontalPeers),3);
  return{left,center,right,vertical,horizontal,notNear:I.matchingGuides(rect(110,310),[peer],page,3)};
 });
 assert.ok(math.left.some(g=>g.axis==='x'));assert.ok(math.center.some(g=>g.axis==='x'));assert.ok(math.right.some(g=>g.axis==='x'));assert.equal(math.vertical[0].gap,92);assert.equal(math.horizontal[0].gap,40);assert.equal(math.notNear.length,0);report.push('7–11: izquierda/centro/derecha, 92 px vertical, 40 px horizontal');
 // Real mouse movement: guide near peer; keep moving, and release unsnapped.
 await page.evaluate(()=>{const blocks=['A','B','C'].map((text,i)=>{const b=LNEComponents.createBlock('parrafo',text);b.id=text;b.propiedades={layout:{mode:'absolute',x:100+i*150,y:400,width:100}};return b;});LNEState.setDocumentData({metadata:{titulo:'Drag'},bloques:blocks});LNEState.selectBlock('C');});await settle();
 let handle=await page.locator('#block-C .object-move-top').boundingBox();await page.mouse.move(handle.x+handle.width/2,handle.y+2);await page.mouse.down();await page.mouse.move(handle.x+handle.width/2-298,handle.y+2+80,{steps:8});await settle();
 const guideCount=await page.locator('.lne-smart-guide').count();assert.ok(guideCount>0,'Live drag alignment guide');
 await page.mouse.move(handle.x+handle.width/2-290,handle.y+2+80,{steps:2});await settle();assert.equal(await page.locator('.lne-smart-guide').count(),0);await page.mouse.up();
 const dropped=await page.evaluate(()=>LNEState.getBlockById('C').propiedades.layout);assert.equal(dropped.x,110);assert.equal(dropped.y,480);assert.equal(await page.locator('.lne-smart-guide').count(),0);report.push('12: drag real sin snap');
 for(const axis of ['y','x']){
  await page.evaluate(axis=>{
   const blocks=['a','b','c'].map((id,i)=>{const b=LNEComponents.createBlock('parrafo','Elemento');b.id=id;b.propiedades={layout:{mode:'absolute',width:130,x:axis==='x'?100+i*150:150,y:axis==='y'?250+i*150:400}};return b;});
   LNEState.setDocumentData({metadata:{titulo:'Guías de distancia'},bloques:blocks});
   const rect=id=>LNEInteractions.visualRect(document.getElementById('block-'+id)),a=rect('a'),b=rect('b'),low=axis==='x'?'left':'top',high=axis==='x'?'right':'bottom',position=axis==='x'?'x':'y',gap=axis==='x'?40:92;
   blocks[1].propiedades.layout[position]+=gap-(b[low]-a[high]);LNEState.notify('fixture');const updated=rect('b'),c=rect('c');blocks[2].propiedades.layout[position]+=updated[high]+gap+20-c[low];LNEState.notify('fixture');LNEState.selectBlock('c');
  },axis);await settle();
  const h=await page.locator('#block-c .object-move-top').boundingBox();await page.mouse.move(h.x+h.width/2,h.y+2);await page.mouse.down();await page.mouse.move(h.x+h.width/2-(axis==='x'?20:0),h.y+2-(axis==='y'?20:0),{steps:5});await settle();
  const labels=await page.locator('.lne-gap-guide').allTextContents();if(!labels.length)console.log('gap diagnostics',axis,await page.evaluate(()=>['a','b','c'].map(id=>({id,layout:LNEState.getBlockById(id).propiedades.layout,rect:LNEInteractions.visualRect(document.getElementById('block-'+id))}))));assert.ok(labels.includes(axis==='x'?'40 px':'92 px'),'Rendered distance label '+axis+' '+JSON.stringify(labels));
  await page.screenshot({path:path.join(out,'guides-'+axis+'.png')});await page.mouse.up();assert.equal(await page.locator('.lne-gap-guide').count(),0);
 }report.push('10–11: etiquetas reales de distancia durante drag');
 // Adding a block after a pointer selection must not inherit a stale group.
 id=await fixture('parrafo','Anterior');await page.locator('#block-'+id+' [contenteditable="true"]').click();
 const previousId=id;await page.locator('#insert-panel [data-insert-type="parrafo"]').click();await settle();
 const freshSelection=await page.evaluate(()=>({ids:LNEGroups.selectedIds(),id:LNEState.state.selectedBlockId}));assert.deepEqual(freshSelection.ids,[freshSelection.id]);assert.notEqual(freshSelection.id,previousId);assert.equal(await page.locator('.lne-group-outline').count(),0);report.push('bloque nuevo no hereda selección anterior');
 // Flow text: preserve 1/10 px, text caret, undo and persisted identity.
 id=await fixture('parrafo','Texto para mover sin editar');await page.locator('#block-'+id+' .object-move-top').click();
 const before=await geometry(id);await page.keyboard.press('ArrowRight');await settle();let layout=await page.evaluate(id=>LNEState.getBlockById(id).propiedades.layout,id);assert.equal(layout.offsetX,1);let after=await geometry(id);assert.ok(Math.abs(after.r.left-before.r.left-1)<.2);report.push('13: flecha 1 px');
 await page.keyboard.press('Shift+ArrowDown');await settle();layout=await page.evaluate(id=>LNEState.getBlockById(id).propiedades.layout,id);assert.equal(layout.offsetY,10);report.push('14: Shift 10 px');
 const savedLayout=JSON.stringify(layout);await page.locator('#block-'+id+' [contenteditable="true"]').click();await page.keyboard.press('ArrowLeft');await page.keyboard.press('Shift+ArrowRight');assert.equal(await page.evaluate(id=>JSON.stringify(LNEState.getBlockById(id).propiedades.layout),id),savedLayout);report.push('15: cursor no mueve bloque');
 id=await fixture('imagen','',{mode:'absolute',x:100,y:400,width:180,height:100,wrapMode:'front'});await page.locator('#block-'+id+' .object-move-top').count().then(async n=>{if(!n){await page.locator('#document-viewport').evaluate(el=>{el.tabIndex=-1;el.focus()});}else await page.locator('#block-'+id+' .object-move-top').click();});await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(id=>LNEState.getBlockById(id).propiedades.layout.x,id),101);report.push('16: flecha imagen');
 await page.evaluate(()=>{const a=LNEComponents.createBlock('titulo',3,'Grupo A'),b=LNEComponents.createBlock('parrafo','Grupo B');a.id='ga';b.id='gb';for(const x of [a,b])x.propiedades={groupId:'g'};LNEState.setDocumentData({metadata:{titulo:'Grupo temporal'},bloques:[a,b]});LNEState.selectBlock(a.id);});await settle();
 const groupBefore=await Promise.all(['ga','gb'].map(geometry));await page.locator('#block-ga .object-move-top').click();await page.keyboard.press('Shift+ArrowRight');await settle();const groupAfter=await Promise.all(['ga','gb'].map(geometry));
 for(let i=0;i<2;i++){assert.ok(Math.abs(groupAfter[i].r.left-groupBefore[i].r.left-10)<.4);assert.ok(Math.abs(groupAfter[i].r.top-groupBefore[i].r.top)<.4,'Group preserves internal Y');}
 await page.keyboard.press('Control+z');await settle();assert.equal(await page.evaluate(()=>LNEState.getBlockById('ga').propiedades.layout?.mode),undefined);
 await page.keyboard.press('Control+y');await settle();report.push('17: grupo, undo/redo');
 const groupMouseBefore=await Promise.all(['ga','gb'].map(geometry));handle=await page.locator('#block-ga .object-move-top').boundingBox();await page.mouse.move(handle.x+handle.width/2,handle.y+2);await page.mouse.down();await page.mouse.move(handle.x+handle.width/2+7,handle.y+2+5,{steps:3});await page.mouse.up();await settle();
 const groupMouseAfter=await Promise.all(['ga','gb'].map(geometry));for(let i=0;i<2;i++){assert.ok(Math.abs(groupMouseAfter[i].r.left-groupMouseBefore[i].r.left-7)<.4);assert.ok(Math.abs(groupMouseAfter[i].r.top-groupMouseBefore[i].r.top-5)<.4);}
 report.push('17: grupo con mouse conserva distancias');
 // A mixed flow group must not shrink its image or shift its members on promotion.
 await page.evaluate(()=>{const a=LNEComponents.createBlock('parrafo','Texto de grupo mixto'),b=LNEComponents.createBlock('imagen');a.id='mixed-text';b.id='mixed-image';a.propiedades={groupId:'mixed'};b.propiedades={...b.propiedades,groupId:'mixed',src:'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="100"/>'),layout:{mode:'flow',width:180,height:100}};LNEState.setDocumentData({metadata:{titulo:'Grupo mixto temporal'},bloques:[a,b]});LNEState.selectBlock(a.id);});await settle();await page.locator('#block-mixed-image img').evaluate(img=>img.decode());await settle();
 const mixedBefore=await Promise.all(['mixed-text','mixed-image'].map(geometry));await page.locator('#block-mixed-text .object-move-top').click();await page.keyboard.press('Shift+ArrowRight');await settle();const mixedAfter=await Promise.all(['mixed-text','mixed-image'].map(geometry));
 for(let i=0;i<2;i++){assert.ok(Math.abs(mixedAfter[i].r.left-mixedBefore[i].r.left-10)<.4);assert.ok(Math.abs(mixedAfter[i].r.top-mixedBefore[i].r.top)<.4);assert.ok(Math.abs(mixedAfter[i].r.width-mixedBefore[i].r.width)<.4);}
 report.push('grupo mixto texto/imagen mantiene dimensiones');
 const stored=await page.evaluate(()=>{LNEState.saveToStorage();return JSON.stringify(LNEState.state.bloques)});await page.reload();await page.waitForFunction(()=>window.LNEInteractions&&LNEState.state.bloques.length===2);assert.equal(await page.evaluate(()=>JSON.stringify(LNEState.state.bloques)),stored);report.push('18: F5');
 const exported=await page.evaluate(()=>LNERenderer.compileToHTML(LNEState.state));assert.ok(!/lne-selection-outline|lne-smart-guide|lne-gap-guide|lne-interaction-overlay/.test(exported),'No exported editor overlays');
 // Local representative copy of an existing public lesson; never writes it.
 const source=fs.readFileSync(path.join(root,'data/clases/criterios-vinculacion.html'),'utf8');
 const representative=await page.evaluate(async html=>{
  const source=new DOMParser().parseFromString(html,'text/html'),nodes=[...source.querySelectorAll('.tributario-articulo h2,.tributario-articulo p')].slice(0,16);
  const blocks=nodes.map(n=>n.tagName==='H2'?LNEComponents.createBlock('titulo',2,n.innerHTML):LNEComponents.createBlock('parrafo',n.innerHTML));
  LNEState.setDocumentData({metadata:{titulo:'Copia temporal representativa'},bloques:blocks});const original=JSON.stringify(LNEState.state.bloques);
  const iframe=document.createElement('iframe'),ready=new Promise(r=>iframe.onload=r);iframe.style.cssText='position:fixed;left:-10000px;width:1200px;height:1100px';iframe.srcdoc=LNERenderer.compileToDocument(LNEState.state);document.body.append(iframe);await ready;await iframe.contentDocument.fonts.ready;
  const editor=document.getElementById('document-sheet'),pub=iframe.contentDocument.querySelector('.lne-rendered-sheet'),get=s=>{const c=s.ownerDocument.defaultView.getComputedStyle(s);return{font:c.fontFamily,size:c.fontSize,weight:c.fontWeight,leading:c.lineHeight,padding:c.paddingLeft,width:s.offsetWidth}};
  const result={blocks:blocks.length,editor:get(editor),public:get(pub),unchanged:original===JSON.stringify(LNEState.state.bloques)};iframe.remove();return result;
 },source);assert.deepEqual(representative.editor,representative.public);assert.equal(representative.unchanged,true);assert.equal(representative.editor.padding,'48px');assert.equal(representative.editor.size,'16.8px');report.push('copia representativa/editor/web/publicación: defaults iguales, fuente intacta');
 await page.screenshot({path:path.join(out,'interactions.png')});assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:report,errors,remoteWrites:0}));
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
