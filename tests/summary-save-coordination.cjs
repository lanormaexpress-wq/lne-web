// Focused workflow test: synthetic document and HTTP provider only. No Supabase.
const express=require('express'),path=require('node:path'),fs=require('node:fs'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const app=express(),root=path.resolve(__dirname,'..'),id='11111111-1111-4111-8111-111111111111',tid='22222222-2222-4222-8222-222222222222';
let row=null,revision=0,mode='ok',publications=0,publicationUpdates=0,active=0,maxActive=0;const writes=[],sizes=[];
const fixture=process.env.LNE_SUMMARY_FIXTURE?JSON.parse(fs.readFileSync(process.env.LNE_SUMMARY_FIXTURE)):{documentoId:'mat-fixture',metadata:{titulo:'Prueba local'},bloques:[{id:'p1',texto:'Original'},{id:'img1',tipo:'imagen',propiedades:{src:'data:image/png;base64,'+'a'.repeat(100000),layout:{x:0,y:0}}}]};
app.use(express.json({limit:'30mb'}));
app.get('/fixture-state',(_req,res)=>res.json(fixture));
app.get('/fixture-editor',(_req,res)=>res.send(`<div class="doc-meta-section"></div><button id="lne-summary-continue">Continuar</button><input id="doc-title-input"><script>
const callbacks=[];window.compiles=0;window.LNEState={state:${JSON.stringify(fixture).replace(/</g,'\\u003c')},subscribe:f=>callbacks.push(f),notify:t=>callbacks.forEach(f=>f(LNEState.state,t)),clearDocumentSession:()=>{}};window.LNERenderer={compileToDocument:s=>{compiles++;return '<article>'+s.bloques.map(b=>b.propiedades?.src?'<img src="'+b.propiedades.src+'">':b.texto||'').join('')+'</article>';}};
</script>`));
app.get('/fixture',(_req,res)=>res.send(`<iframe id="summary-editor-frame" src="/fixture-editor"></iframe><script>
const nativeTimer=window.setTimeout;window.setTimeout=(fn,ms,...args)=>nativeTimer(fn,ms===45000&&window.fastTimeout?60:ms===5000?40:ms,...args);
window.LNESummaryStorage={documentLink:(key,value)=>{if(value)localStorage.setItem('link',JSON.stringify(value));return JSON.parse(localStorage.getItem('link')||'null');}};
</script><script src="/admin-summary-workflow.js"></script><script src="/admin-summary-selection.js"></script>`));
app.get('/admin/resumenes/catalog',(_req,res)=>res.json({areas:[{id:'civil',name:'Civil'}],courses:[{id:'contratos',area:'civil',name:'Contratos',templates:[]}],canAddTemplate:false,canManageTemplates:false}));
app.get('/admin/resumenes/templates',(_req,res)=>res.json({templates:[{id:tid,name:'Cartilla existente'}]}));
app.get('/admin/resumenes/documents/:id',(_req,res)=>res.json({document:row,canPublish:true,canEdit:true}));
app.post('/admin/resumenes/documents',(req,res)=>{writes.push('create');row={...req.body,id,status:'BORRADOR',updated_at:String(++revision)};res.json({document:row,canPublish:true});});
app.patch('/admin/resumenes/documents/:id',async(req,res)=>{
 const action=req.body.action;writes.push(action);sizes.push({action,bytes:Buffer.byteLength(JSON.stringify(req.body)),preview:Object.hasOwn(req.body,'preview_html')});
 active++;maxActive=Math.max(maxActive,active);res.on('finish',()=>active--);res.on('close',()=>{if(!res.writableFinished)active--;});
 if(mode==='fail'){mode='ok';return res.status(500).json({error:'Fallo simulado'});}
 if(mode==='stall'){mode='ok';res.writeHead(200,{'Content-Type':'application/json'});res.write('{');return;}
 if(mode==='delay'){mode='ok';await new Promise(r=>setTimeout(r,100));}
 if(req.body.updated_at!==row.updated_at)return res.status(409).json({error:'Versión diferente'});
 if(action==='publish'){assert.equal(row.status,'EN_REVISION');publications++;row.status='PUBLICADO';}
 else if(action==='update-publication'){assert.equal(row.status,'PUBLICADO');publicationUpdates++;}
 else {const data=structuredClone(req.body);if(data.compact_save){for(const ref of data.reuse_images){const source=row.content_lne.bloques.find(b=>b.id===ref.id)?.propiedades?.src,block=data.content_lne.bloques.find(b=>b.id===ref.id);assert.equal(block.propiedades.src,ref.token);assert.ok(source);block.propiedades.src=source;if(data.preview_html)data.preview_html=data.preview_html.split(ref.token).join(source);}}Object.assign(row,data);if(action==='submit'){assert.ok(row.preview_html);row.status='EN_REVISION';}}
 row.updated_at=String(++revision);
 if(mode==='committed-stall'){mode='ok';res.writeHead(200,{'Content-Type':'application/json'});res.write('{');return;}
 const {content_lne,preview_html,...metadata}=row;res.json({document:req.body.compact_save||req.body.transition_only?metadata:row,canPublish:true});
});
app.use(express.static(root));
(async()=>{const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));let browser;
 try{
  browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});const page=await browser.newPage();let base=`http://127.0.0.1:${server.address().port}`;
  const ready=()=>page.waitForFunction(()=>window.LNESummaryWorkflow&&document.getElementById('summary-editor-frame').contentWindow.LNEState?.state&&document.getElementById('summary-editor-frame').contentWindow.LNEState?.__centralWorkflowAttached);
  await page.goto(base+'/fixture');await ready();
  await page.evaluate(tid=>LNESummaryWorkflow.selectDestination({areaId:'civil',courseId:'contratos',templateId:tid,templateName:'Cartilla existente'}),tid);
  await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='BORRADOR');const originalId=row.id;
  await page.evaluate(()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;m.state.bloques[0].texto='Autosave';m.notify('edit');});
  await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.content_lne.bloques[0].texto==='Autosave');
  assert.equal(sizes.at(-1).preview,false);assert.ok(sizes.at(-1).bytes<100000);assert.equal(await page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.compiles),0);
  // Image movement keeps the exact bytes; autosave sends a reference, never a re-upload.
  const image=row.content_lne.bloques.find(b=>b.propiedades?.src),imageSource=image.propiedades.src;
  await page.evaluate(()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState,b=m.state.bloques.find(b=>b.propiedades?.src);b.propiedades.layout={...b.propiedades.layout,x:23,y:47};m.notify('move');});
  await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.content_lne.bloques.find(b=>b.propiedades?.src).propiedades.layout.x===23);assert.equal(row.content_lne.bloques.find(b=>b.id===image.id).propiedades.src,imageSource);
  const rapidStart=writes.length;await page.evaluate(()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;for(let i=0;i<10;i++){m.state.bloques[0].texto='Rápido '+i;m.notify('edit');}});
  await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.content_lne.bloques[0].texto==='Rápido 9');assert.equal(writes.length,rapidStart+1);
  // Changes arriving during an active request coalesce to the newest state.
  mode='delay';await page.evaluate(()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;m.state.bloques[0].texto='En curso';m.notify('edit');});
  await page.waitForFunction(()=>document.getElementById('summary-editor-frame').contentDocument.getElementById('lne-summary-save-status').textContent==='Guardando…');
  await page.evaluate(()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;for(let i=0;i<10;i++){m.state.bloques[0].texto='Pendiente '+i;m.notify('edit');}});
  await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.content_lne.bloques[0].texto==='Pendiente 9');
  await page.reload();await ready();await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.id);assert.equal(row.id,originalId);assert.equal(row.status,'BORRADOR');assert.equal(await page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.LNEState.state.bloques[0].texto),'Pendiente 9');
  await page.evaluate(()=>LNESummarySelection.open());await page.waitForFunction(()=>!document.querySelector('[data-submit-review]').disabled);
  mode='fail';await page.locator('[data-submit-review]').click();await page.waitForFunction(()=>document.querySelector('[data-status]').textContent==='Fallo simulado');assert.equal(await page.locator('[data-submit-review]').isEnabled(),true);
  const submissions=writes.filter(x=>x==='submit').length;
  await page.evaluate(()=>{const b=document.querySelector('[data-submit-review]');b.click();b.click();});await page.waitForFunction(()=>document.querySelector('[data-status]').textContent==='Resumen enviado a revisión.');assert.equal(writes.filter(x=>x==='submit').length,submissions+1);
  // A repeated successful submit is a no-op, not a second write.
  await page.evaluate(()=>LNESummaryWorkflow.save('submit'));assert.equal(writes.filter(x=>x==='submit').length,submissions+1);
  const beforeReviewOpen=writes.length;await page.reload();await ready();await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='EN_REVISION');await page.waitForTimeout(150);assert.equal(writes.length,beforeReviewOpen);
  await page.evaluate(()=>document.querySelector('[data-submit-review]')?.closest('dialog').close());
  await page.evaluate(()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;m.state.bloques[0].texto='Timeout local';});mode='stall';
  const timeoutResult=await page.evaluate(async()=>{window.fastTimeout=true;try{await LNESummaryWorkflow.save();return 'unexpected';}catch(e){return e.message;}finally{window.fastTimeout=false;}});assert.match(timeoutResult,/45 segundos/);
  await page.evaluate(()=>LNESummaryWorkflow.save());assert.equal(row.content_lne.bloques[0].texto,'Timeout local');assert.equal(row.id,originalId);
  // Server committed but response body stalled: reconcile without a second PATCH.
  await page.evaluate(()=>{document.getElementById('summary-editor-frame').contentWindow.LNEState.state.bloques[0].texto='Respuesta perdida';});mode='committed-stall';
  await page.evaluate(async()=>{window.fastTimeout=true;try{await LNESummaryWorkflow.save();}catch{}finally{window.fastTimeout=false;}});const afterLost=writes.length;
  await page.evaluate(()=>LNESummaryWorkflow.save());assert.equal(writes.length,afterLost);
  // An uncertain response followed by more edits must retain and save the latest state.
  await page.evaluate(()=>{document.getElementById('summary-editor-frame').contentWindow.LNEState.state.bloques[0].texto='Guardado sin respuesta';});mode='committed-stall';
  await page.evaluate(async()=>{window.fastTimeout=true;try{await LNESummaryWorkflow.save();}catch{}finally{window.fastTimeout=false;}});
  await page.evaluate(()=>{document.getElementById('summary-editor-frame').contentWindow.LNEState.state.bloques[0].texto='Cambio posterior';return LNESummaryWorkflow.save();});assert.equal(row.content_lne.bloques[0].texto,'Cambio posterior');
  // Auto-save + double submit share one save and one state transition.
  mode='delay';const start=writes.length;
  await page.evaluate(async()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;m.state.bloques[0].texto='Último cambio';const a=LNESummaryWorkflow.save();await Promise.all([a,LNESummaryWorkflow.save('submit'),LNESummaryWorkflow.save('submit')]);});assert.ok(writes.slice(start).filter(x=>x==='save').length<=2);
  await page.evaluate(()=>document.getElementById('summary-editor-frame').contentDocument.getElementById('lne-summary-publish').click());await page.locator('[data-confirm]').waitFor({state:'visible'});mode='delay';
  await page.evaluate(()=>{const b=document.querySelector('[data-confirm]');b.click();b.click();});await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='PUBLICADO');assert.equal(publications,1);assert.equal(writes.filter(x=>x==='publish').length,1);assert.equal(await page.locator('[data-confirm]').isEnabled(),true);
  assert.equal(writes.filter(x=>x==='create').length,1);assert.equal(row.id,originalId);
  const beforePublishedOpen=writes.length;await page.reload();await ready();await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='PUBLICADO');await page.waitForTimeout(150);assert.equal(writes.length,beforePublishedOpen);
  await page.evaluate(()=>document.getElementById('summary-editor-frame').contentDocument.getElementById('lne-summary-publish').click());await page.locator('[data-confirm]').waitFor({state:'visible'});mode='delay';
  await page.evaluate(()=>{const b=document.querySelector('[data-confirm]');b.click();b.click();});await page.waitForFunction(()=>!document.querySelector('[data-confirm]').closest('dialog').open);
  assert.equal(publicationUpdates,1);assert.equal(publications,1);assert.equal(writes.filter(x=>x==='update-publication').length,1);
  assert.equal(maxActive,1);console.log(JSON.stringify({fixtureBlocks:fixture.bloques.length,autosaveBytes:sizes.filter(x=>!x.preview&&x.action==='save').map(x=>x.bytes),maxConcurrent:maxActive,requests:writes.length}));
  console.log('PASS focused: BORRADOR/autosave/F5 same ID; double submit single request; HTTP failure unlock; timeout unlock; lost-response reconciliation; save/submit coordination; double publication single request; one document, one publication.');
 }finally{await browser?.close();server.close();server.closeAllConnections();}
})().catch(e=>{console.error(e);process.exitCode=1;});
