const express=require('express'),path=require('path'),fs=require('fs'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),app=express();app.use(express.static(root));
const artifact=process.env.LNE_VISUAL_OUTPUT||fs.mkdtempSync(path.join(require('os').tmpdir(),'lne-layout-'));
const server=app.listen(0,'127.0.0.1',async()=>{let browser;try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1600,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/admin-summary-editor/versions/2026-10-19/index.html`);
 await page.waitForFunction(()=>window.LNECanvas&&window.LNEState);await page.evaluate(()=>document.fonts.ready);
 const realFile=path.join(artifact,'real-document-copy.json');
 const real=fs.existsSync(realFile)?JSON.parse(fs.readFileSync(realFile,'utf8')).content_lne:null;
 const result=await page.evaluate(async real=>{
  const S=LNEState,C=LNEComponents,make=(type,...args)=>C.createBlock(type,...args);
  const title=make('titulo',2,'ESTADO, GOBIERNO, INSTITUCIONES Y PODER'),p=make('parrafo','Contenido jurídico. '.repeat(12));
  S.setDocumentData(real||{metadata:{titulo:'Prueba visual temporal'},bloques:[title,p]});
  await Promise.all([...document.querySelectorAll('#document-sheet img')].map(img=>img.decode().catch(()=>{})));
  const before=JSON.stringify(S.state.bloques),sheet=document.getElementById('document-sheet');
  function geometry(target){const scale=target.getBoundingClientRect().width/860;const origin=target.getBoundingClientRect();return [...target.querySelectorAll('.lne-document-content > .lne-editor-block')].map(el=>{const r=el.getBoundingClientRect(),content=el.querySelector('[data-field],.lne-block-lista');const c=content?.getBoundingClientRect();return{type:el.className,x:(r.x-origin.x)/scale,y:(r.y-origin.y)/scale,width:r.width/scale,height:r.height/scale,contentY:c?(c.y-origin.y)/scale:0,contentHeight:c?c.height/scale:0};});}
  const editor=geometry(sheet);const out=LNECanvas.renderDocument(S.state);document.body.append(out);await Promise.all([...out.querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));const web=geometry(out);
  out.remove();return{editor,web,stateUnchanged:before===JSON.stringify(S.state.bloques)};
 },process.env.LNE_REAL_COPY==='1'?real:null);
 const deltas=result.editor.map((e,i)=>({i,type:e.type,height:e.height,content:e.contentHeight,dy:result.web[i].y-e.y,dh:result.web[i].height-e.height,dc:result.web[i].contentY-e.contentY}));
 console.log(JSON.stringify({stateUnchanged:result.stateUnchanged,blocks:deltas.length,maxY:Math.max(...deltas.map(d=>Math.abs(d.dy))),maxHeight:Math.max(...deltas.map(d=>Math.abs(d.dh))),failures:deltas.filter(d=>Math.abs(d.dy)>6||Math.abs(d.dh)>2)},null,2));
 if(process.env.LNE_LAYOUT_BASELINE!=='1'){
  assert.equal(result.stateUnchanged,true);for(let i=0;i<result.editor.length;i++)for(const key of ['x','y','width','height','contentY','contentHeight'])assert.ok(Math.abs(result.editor[i][key]-result.web[i][key])<(process.env.LNE_REAL_COPY==='1'?6:1),`${i} ${key}: ${result.editor[i][key]} vs ${result.web[i][key]}`);
 }
 if(process.env.LNE_REAL_COPY!=='1'&&process.env.LNE_LAYOUT_BASELINE!=='1'){
  // Geometry at 100% (the responsive UI can hide this control at this width).
  await page.evaluate(()=>document.getElementById('sheet-zoom-actual').click());
  const cases=await page.evaluate(async()=>{
   const S=LNEState,C=LNEComponents,make=(t,...args)=>C.createBlock(t,...args),report=[];
   const sleep=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
   const height=id=>document.getElementById('block-'+id).offsetHeight;
   const getBox=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{x:r.x,y:r.y,width:r.width,height:r.height,font:s.font,lineHeight:s.lineHeight,align:s.textAlign};};
   for(const name of ['A','B','C','D','E','F','G','H','legacy','nested','manual','free']){
    let first=make('titulo',3,name==='B'?'Título jurídico de dos líneas y contenido adicional':'Título de una línea'),next=make('parrafo','Párrafo siguiente independiente.'),blocks=[first,next];
    if(name==='B')first.propiedades={layout:{mode:'flow',width:250}};
    if(['C','D','E'].includes(name))blocks=[first=make('parrafo','Texto jurídico con información y derechos fundamentales. '.repeat(16)),next];
    if(name==='F') {const image=make('imagen','data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100"><rect width="160" height="100" fill="#334155"/></svg>'),'Imagen');image.propiedades.layout={mode:'flow',width:160,height:100};blocks.push(image);}
    if(name==='G')blocks=[first=make('lista','numerada',['Primer elemento','Segundo elemento con información. '.repeat(9)]),next];
    if(name==='H')blocks=[first=make('normativa','Artículo 1','Contenido normativo. '.repeat(12)),next];
    if(name==='nested')blocks=[first=make('parrafo','<span style="font-family:Georgia"><span><div><b>Una sola línea jurídica</b></div></span></span>'),next];
    if(name==='legacy'||name==='free')first.propiedades={layout:{mode:'absolute',x:85,y:900,width:400,height:600,heightMode:'minimum'}};
    if(name==='manual') {first=make('tabla');first.propiedades.layout={mode:'absolute',x:85,y:500,width:400,height:600,heightMode:'minimum'};blocks=[first,next];}
    S.setDocumentData({metadata:{titulo:'Caso '+name},bloques:blocks});await sleep();
    await Promise.all([...document.querySelectorAll('#document-sheet img')].map(i=>i.decode().catch(()=>{})));
    const old=height(first.id),saved=JSON.stringify(S.state.bloques);
    if(name==='D'){S.updateBlockStyle(first.id,{fontSize:'16px'});const h16=height(first.id);S.updateBlockStyle(first.id,{fontSize:'24px'});const h24=height(first.id);S.updateBlockStyle(first.id,{fontSize:'16px'});if(!(h24>h16&&height(first.id)===h16))throw Error('Fuente 16/24/16');}
    if(name==='E'){S.updateBlockLayout(first.id,{mode:'flow',width:260});const narrow=height(first.id);S.updateBlockLayout(first.id,{mode:'flow',width:600});if(!(narrow>height(first.id)))throw Error('Ancho/alto');}
    if(name==='legacy'&&!(old<150&&JSON.stringify(S.state.bloques)===saved))throw Error('Normalización heredada mutó datos o conservó altura');
    if(name==='manual'&&height(first.id)<600)throw Error('Tabla perdió altura manual');
    if(name==='nested'&&old>70)throw Error('Líneas fantasma en texto anidado');
    if(name==='free'&&(first.propiedades.layout.y!==900||document.getElementById('block-'+first.id).style.top!=='900px'))throw Error('Caja libre desplazada');
    const editor=document.getElementById('document-sheet');const exported=LNERenderer.compileToHTML(S.state);
    const host=document.createElement('div');host.innerHTML=exported;host.style.cssText='position:absolute;left:0;top:0;visibility:hidden';document.body.append(host);
    const ro=host.firstElementChild;
    const a=[...editor.querySelectorAll('.lne-document-content > .lne-editor-block')],b=[...ro.querySelectorAll('.lne-document-content > .lne-editor-block')];
    for(let i=0;i<a.length;i++) {const x=getBox(a[i]),y=getBox(b[i]);if(Math.abs(x.height-y.height)>1||Math.abs(x.width-y.width)>1)throw Error(name+' geometría divergente');}
    if(!['legacy','manual','free'].includes(name)){const aBox=a[0].getBoundingClientRect(),bBox=a[1].getBoundingClientRect();if(bBox.top<aBox.bottom-1)throw Error(name+' superposición');}
    host.remove();
    // Actual final payload: same serialized HTML + captured styles in an iframe.
    const iframe=document.createElement('iframe');iframe.style.cssText='position:absolute;left:0;top:0;width:1200px;height:1000px;visibility:hidden';
    const ready=new Promise(resolve=>iframe.onload=resolve);iframe.srcdoc=LNERenderer.compileToDocument(S.state);document.body.append(iframe);await ready;await iframe.contentDocument.fonts.ready;
    const published=[...iframe.contentDocument.querySelectorAll('.lne-document-content > .lne-editor-block')];
    for(let i=0;i<a.length;i++)if(Math.abs(a[i].offsetHeight-published[i].offsetHeight)>1)throw Error(name+' altura publicada diferente: '+a[i].offsetHeight+' / '+published[i].offsetHeight);iframe.remove();
    report.push({case:name,height:height(first.id),passed:true});
   }
   // Editing events (including Enter/paste-shaped HTML), not a state-only mock.
   const p=make('parrafo','Texto inicial');S.setDocumentData({metadata:{titulo:'F5 técnico'},bloques:[p,make('parrafo','Siguiente')]});
   const field=document.querySelector('#block-'+p.id+' [data-field]');const initial=height(p.id);field.innerHTML='Línea<br>'.repeat(8);field.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertFromPaste'}));await sleep();
   if(height(p.id)<=initial)throw Error('Input no creció');field.innerHTML='Una línea';field.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'deleteContentBackward'}));await sleep();if(height(p.id)!==initial)throw Error('Input no redujo');
   S.saveToStorage();return{report,id:S.state.documentoId,blocks:JSON.stringify(S.state.bloques)};
  });
  await page.reload();await page.waitForFunction(()=>window.LNEState&&document.querySelector('#document-sheet .lne-document-content'));
  const after=await page.evaluate(()=>({id:LNEState.state.documentoId,blocks:JSON.stringify(LNEState.state.bloques)}));assert.equal(after.id,cases.id);assert.equal(after.blocks,cases.blocks);console.log(JSON.stringify({cases:cases.report,F5:true}));
 }
 await page.screenshot({path:path.join(artifact,'layout-'+(process.env.LNE_LAYOUT_BASELINE==='1'?'before':'after')+'.png')});assert.deepEqual(errors,[]);
 if(process.env.LNE_REAL_COPY==='1'){
  await page.getByRole('button',{name:/Vista Web/}).click();await page.locator('#web-preview-modal.open').waitFor();
  assert.equal(await page.locator('#web-preview-content .lne-editor-block:not(.lne-meta-object)').count(),result.editor.length);
  await page.screenshot({path:path.join(artifact,'layout-real-web.png')});
 }
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
