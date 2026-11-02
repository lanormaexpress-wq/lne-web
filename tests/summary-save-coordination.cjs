// Focused workflow test: synthetic document and HTTP provider only. No Supabase.
const express=require('express'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const app=express(),root=path.resolve(__dirname,'..'),id='11111111-1111-4111-8111-111111111111',tid='22222222-2222-4222-8222-222222222222';
let row=null,revision=0,mode='ok',publications=0;const writes=[];
app.use(express.json());
app.get('/fixture-editor',(_req,res)=>res.send(`<div class="doc-meta-section"></div><button id="lne-summary-continue">Continuar</button><input id="doc-title-input"><script>
const callbacks=[];window.LNEState={state:{documentoId:'mat-fixture',metadata:{titulo:'Prueba local'},bloques:[{id:'p1',texto:'Original'}]},subscribe:f=>callbacks.push(f),notify:t=>callbacks.forEach(f=>f(LNEState.state,t)),clearDocumentSession:()=>{}};window.LNERenderer={compileToDocument:s=>'<article>'+s.bloques[0].texto+'</article>'};
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
 const action=req.body.action;writes.push(action);
 if(mode==='fail'){mode='ok';return res.status(500).json({error:'Fallo simulado'});}
 if(mode==='stall'){mode='ok';res.writeHead(200,{'Content-Type':'application/json'});res.write('{');return;}
 if(mode==='delay'){mode='ok';await new Promise(r=>setTimeout(r,100));}
 if(req.body.updated_at!==row.updated_at)return res.status(409).json({error:'Versión diferente'});
 if(action==='publish'){assert.equal(row.status,'EN_REVISION');publications++;row.status='PUBLICADO';}
 else {Object.assign(row,req.body);if(action==='submit')row.status='EN_REVISION';}
 row.updated_at=String(++revision);
 if(mode==='committed-stall'){mode='ok';res.writeHead(200,{'Content-Type':'application/json'});res.write('{');return;}
 res.json({document:row,canPublish:true});
});
app.use(express.static(root));
(async()=>{const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));let browser;
 try{
  browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});const page=await browser.newPage();let base=`http://127.0.0.1:${server.address().port}`;
  const ready=()=>page.waitForFunction(()=>window.LNESummaryWorkflow&&document.getElementById('summary-editor-frame').contentWindow.LNEState?.__centralWorkflowAttached);
  await page.goto(base+'/fixture');await ready();
  await page.evaluate(tid=>LNESummaryWorkflow.selectDestination({areaId:'civil',courseId:'contratos',templateId:tid,templateName:'Cartilla existente'}),tid);
  await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='BORRADOR');const originalId=row.id;
  await page.evaluate(()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;m.state.bloques[0].texto='Autosave';m.notify('edit');});
  await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.content_lne.bloques[0].texto==='Autosave');
  await page.reload();await ready();await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.id);assert.equal(row.id,originalId);assert.equal(row.status,'BORRADOR');assert.equal(await page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.LNEState.state.bloques[0].texto),'Autosave');
  await page.evaluate(()=>LNESummarySelection.open());await page.waitForFunction(()=>!document.querySelector('[data-submit-review]').disabled);
  mode='fail';await page.locator('[data-submit-review]').click();await page.waitForFunction(()=>document.querySelector('[data-status]').textContent==='Fallo simulado');assert.equal(await page.locator('[data-submit-review]').isEnabled(),true);
  const submissions=writes.filter(x=>x==='submit').length;
  await page.evaluate(()=>{const b=document.querySelector('[data-submit-review]');b.click();b.click();});await page.waitForFunction(()=>document.querySelector('[data-status]').textContent==='Resumen enviado a revisión.');assert.equal(writes.filter(x=>x==='submit').length,submissions+1);
  // A repeated successful submit is a no-op, not a second write.
  await page.evaluate(()=>LNESummaryWorkflow.save('submit'));assert.equal(writes.filter(x=>x==='submit').length,submissions+1);
  await page.evaluate(()=>document.querySelector('[data-submit-review]').closest('dialog').close());
  await page.evaluate(()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;m.state.bloques[0].texto='Timeout local';});mode='stall';
  const timeoutResult=await page.evaluate(async()=>{window.fastTimeout=true;try{await LNESummaryWorkflow.save();return 'unexpected';}catch(e){return e.message;}finally{window.fastTimeout=false;}});assert.match(timeoutResult,/45 segundos/);
  await page.evaluate(()=>LNESummaryWorkflow.save());assert.equal(row.content_lne.bloques[0].texto,'Timeout local');assert.equal(row.id,originalId);
  // Server committed but response body stalled: reconcile without a second PATCH.
  await page.evaluate(()=>{document.getElementById('summary-editor-frame').contentWindow.LNEState.state.bloques[0].texto='Respuesta perdida';});mode='committed-stall';
  await page.evaluate(async()=>{window.fastTimeout=true;try{await LNESummaryWorkflow.save();}catch{}finally{window.fastTimeout=false;}});const afterLost=writes.length;
  await page.evaluate(()=>LNESummaryWorkflow.save());assert.equal(writes.length,afterLost);
  // Auto-save + double submit share one save and one state transition.
  mode='delay';const start=writes.length;
  await page.evaluate(async()=>{const m=document.getElementById('summary-editor-frame').contentWindow.LNEState;m.state.bloques[0].texto='Último cambio';const a=LNESummaryWorkflow.save();await Promise.all([a,LNESummaryWorkflow.save('submit'),LNESummaryWorkflow.save('submit')]);});assert.equal(writes.slice(start).filter(x=>x==='save').length,1);
  await page.evaluate(()=>document.getElementById('summary-editor-frame').contentDocument.getElementById('lne-summary-publish').click());await page.locator('[data-confirm]').waitFor({state:'visible'});mode='delay';
  await page.evaluate(()=>{const b=document.querySelector('[data-confirm]');b.click();b.click();});await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='PUBLICADO');assert.equal(publications,1);assert.equal(writes.filter(x=>x==='publish').length,1);assert.equal(await page.locator('[data-confirm]').isEnabled(),true);
  assert.equal(writes.filter(x=>x==='create').length,1);assert.equal(row.id,originalId);
  console.log('PASS focused: BORRADOR/autosave/F5 same ID; double submit single request; HTTP failure unlock; timeout unlock; lost-response reconciliation; save/submit coordination; double publication single request; one document, one publication.');
 }finally{await browser?.close();server.close();server.closeAllConnections();}
})().catch(e=>{console.error(e);process.exitCode=1;});
