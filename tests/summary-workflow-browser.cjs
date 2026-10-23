// Real Chromium + production routers/editor/public renderer; provider simulated in memory.
const express=require('express'),assert=require('node:assert/strict'),path=require('path');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),app=express(),docs=new Map(),publications=new Map();
const uid='11111111-1111-4111-8111-111111111111',tid='22222222-2222-4222-8222-222222222222';
let base,revision=0;const calls=[];
const template={course_id:'contratos',name:'El Estado'},templates=new Map();
app.use('/mock',express.json({limit:'30mb'}));
app.post('/mock/rest/v1/rpc/withdraw_summary_publication',(req,res)=>{const row=docs.get(req.body.document_id);publications.delete(row.id);Object.assign(row,{status:'BORRADOR',published_at:null,published_by:null,submitted_at:null});res.json(null);});
const queryMatch=(row,q)=>Object.entries(q).every(([key,value])=>key==='content_lne->>documentoId'?row.content_lne?.documentoId===value.slice(3):!['id','author_id','status','course_id','updated_at','image_path','template_id','is_active'].includes(key)||String(row[key])===value.slice(3));
app.all('/mock/rest/v1/:table',(req,res)=>{
 const collection=req.params.table==='summary_documents'?docs:publications;
 if(req.params.table==='summary_templates'){
  if(req.method==='POST'){Object.assign(template,req.body,{is_active:true});templates.set(template.id,template);return res.json([template]);}
  return res.json([...templates.values()].filter(x=>queryMatch(x,req.query)));
 }
 const rows=[...collection.values()].filter(x=>queryMatch(x,req.query));
 if(req.method==='GET')return res.json(rows.map(row=>({...row,summary_templates:{name:template.name}})));
 if(req.method==='POST'){const row={...req.body,updated_at:`2026-10-21T00:00:${String(++revision).padStart(2,'0')}.000Z`};docs.set(row.id,row);return res.json([row]);}
 if(req.method==='PATCH'){
  for(const row of rows){Object.assign(row,req.body,{updated_at:`2026-10-21T00:00:${String(++revision).padStart(2,'0')}.000Z`});
   if(row.status==='EN_REVISION')row.submitted_at ||= row.updated_at;
   if(row.status==='PUBLICADO'){row.published_at=row.updated_at;row.published_by=uid;publications.set(row.id,{...row,template_name:template.name,image_path:template.image_path});}
  }return res.json(rows);
 }res.status(405).end();
});
app.post('/mock/storage/v1/object/sign/:bucket/*',(_req,res)=>res.json({signedURL:'/object/summary-template-images/test.webp'}));
app.post('/mock/storage/v1/object/:bucket/*',express.raw({type:'image/webp',limit:'4mb'}),(_req,res)=>res.json({Key:'test.webp'}));
app.get('/mock/storage/v1/object/summary-template-images/test.webp',(_req,res)=>res.sendFile(path.join(root,'assets/imagenes/contratos1.png')));
const cfg=()=>({url:base+'/mock',key:'test-only'});
app.use('/admin/resumenes',require('../lib/summary-editor')((req,res,next)=>{req.adminUser={id:uid,email:'owner@example.test',app_metadata:{role:'owner'}};next();},cfg));
app.use('/api/formation/summaries',require('../lib/summary-documents').publicRouter(cfg));
app.get('/admin',(_req,res)=>res.sendFile(path.join(root,'admin.html')));app.use(express.static(root));
const server=app.listen(0,'127.0.0.1',async()=>{let browser,page;try{
 base=`http://127.0.0.1:${server.address().port}`;
 const launch=async()=>{
  browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const context=await browser.newContext({viewport:{width:1600,height:1000}}),page=await context.newPage();page.setDefaultTimeout(30000);
  page.on('request',r=>{if(r.url().includes('/admin/resumenes/documents')||r.url().includes('/admin/resumenes/catalog')||r.url().includes('/api/formation/summaries'))calls.push(r.url());});
  page.on('dialog',d=>d.accept());
  await page.route('**/admin.js?*',r=>r.fulfill({contentType:'text/javascript',body:`(async()=>{await LNEAdminSession.sync({access_token:'test'});document.getElementById('admin-loading').hidden=true;document.getElementById('admin-view').hidden=false;})();`}));
  await page.goto(base+'/admin',{waitUntil:'domcontentloaded'});await page.locator('[data-admin-section="summaries"]').click();
  await page.frameLocator('#summary-editor-frame').locator('#lne-summary-continue').waitFor();return page;
 };
 page=await launch();assert.equal(calls.length,0,'No editorial requests during startup');
 const fixture={lneVersion:'1.0',documentoId:'workflow-test-doc',metadata:{titulo:'Resumen de prueba',curso:'Contratos',layouts:{test:{x:15,y:20}},textStyles:{test:{size:18}},customData:'must survive'},bloques:[
  {id:'p1',tipo:'parrafo',texto:'Frase inicial',propiedades:{layout:{mode:'flow'},alineacion:'justify'}},
  {id:'table1',tipo:'tabla',propiedades:{headers:['A','B'],rows:[['Uno','Dos']]}},
  {id:'image1',tipo:'imagen',propiedades:{src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',layout:{mode:'absolute',x:180,y:200,width:150,height:120},width:150}}
 ],selectedBlockId:null,previewMode:false};
 await page.evaluate(state=>{const s=document.getElementById('summary-editor-frame').contentWindow.LNEState;s.clearDocumentSession();s.state=state;s.notify('set-document');},fixture);
 fixture.bloques[0].texto='Frase inicial guardada mediante escritura real';
 await page.frameLocator('#summary-editor-frame').locator('#block-p1 [contenteditable="true"]').fill(fixture.bloques[0].texto);
 await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='BORRADOR',{},{timeout:20000});
 assert.equal(docs.values().next().value.template_id,null,'Initial autosave must not need a destination');
 assert.equal(await page.locator('#summary-workflow-bar').count(),0,'No additional bar');
 const visibleActions=await page.frameLocator('#summary-editor-frame').locator('.top-actions-section button').evaluateAll(buttons=>buttons.filter(b=>getComputedStyle(b).display!=='none').map(b=>b.id));
 assert.deepEqual(visibleActions.slice(0,3),['lne-summary-list','lne-summary-continue','btn-nuevo']);
 assert.equal(docs.size,1);const id=[...docs.keys()][0];assert.deepEqual(docs.get(id).content_lne.bloques,fixture.bloques);
 await page.route('**/admin/resumenes/documents/'+id,async route=>{if(route.request().method()==='GET')await new Promise(resolve=>setTimeout(resolve,2500));await route.continue();});
 await page.reload({waitUntil:'domcontentloaded'});
 await page.frameLocator('#summary-editor-frame').locator('#lne-summary-save-status').filter({hasText:'Abriendo resumen…'}).waitFor();
 assert.equal(await page.locator('#summary-editor-frame').evaluate(f=>f.inert),true,'Prevent edits while the requested central document is loading');
 await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='BORRADOR');assert.equal(docs.size,1,'Reload must not create a duplicate');
 assert.equal(await page.locator('#summary-editor-frame').evaluate(f=>f.inert),false);
 await browser.close();browser=null;
 page=await launch();await page.frameLocator('#summary-editor-frame').locator('#lne-summary-list').click();await page.getByRole('button',{name:'ABRIR / EDITAR',exact:true}).click();
 await page.locator('[data-documents]').waitFor({state:'hidden'});
 await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='BORRADOR');
 const recovered=await page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.LNEState.state);
 assert.deepEqual(recovered.bloques,fixture.bloques);assert.deepEqual(recovered.metadata.layouts,fixture.metadata.layouts);assert.equal(recovered.metadata.customData,'must survive');assert.equal(recovered.documentoId,fixture.documentoId);
 await page.frameLocator('#summary-editor-frame').locator('#lne-summary-continue').click();
 await page.locator('[data-area] option').nth(1).waitFor({state:'attached'});
 const area=require('../formacion').courses.find(c=>c.id==='contratos').area;
 await page.locator('[data-area]').selectOption(area);await page.locator('[data-course]').selectOption('contratos');
 await page.locator('[data-add]').click();await page.locator('[data-template-name]').fill('El Estado');
 await page.locator('[data-template-image]').setInputFiles(path.join(root,'assets/imagenes/contratos1.png'));
 await page.waitForFunction(()=>document.querySelector('[data-image-info]').dataset.metrics);
 await page.locator('[data-template-save]').click();await page.getByText('Cartilla guardada correctamente.',{exact:true}).waitFor();
 assert.equal(docs.get(id).status,'BORRADOR');assert.equal(publications.size,0,'Creating a card must not publish');
 await page.getByRole('button',{name:/El Estado.*Disponible/s}).click();
 await page.locator('[data-submit-review]').click();await page.locator('[data-status]').filter({hasText:'Resumen enviado a revisión.'}).waitFor();
 assert.equal(docs.get(id).status,'EN_REVISION');assert.equal(publications.size,0);assert.equal((await(await fetch(base+'/api/formation/summaries?course_id=contratos')).json()).topics.length,0);
 await page.locator('.summary-selection-dialog[open]').getByRole('button',{name:'Cancelar',exact:true}).click();
 await page.frameLocator('#summary-editor-frame').locator('#lne-summary-list').click();await page.locator('[data-filter="EN_REVISION"]').click();await page.getByRole('button',{name:'ABRIR / EDITAR',exact:true}).click();
 await page.locator('[data-documents]').waitFor({state:'hidden'});
 await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='EN_REVISION');
 await page.frameLocator('#summary-editor-frame').locator('#block-p1 [contenteditable="true"]').fill('Frase corregida durante revisión');
 const before=revision;await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.content_lne.bloques[0].texto==='Frase corregida durante revisión',{},{timeout:20000});
 assert.ok(revision>before);assert.equal(docs.size,1);assert.equal(docs.get(id).content_lne.bloques[0].texto,'Frase corregida durante revisión');
 await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='EN_REVISION');
 assert.equal(await page.evaluate(()=>LNESummaryWorkflow.getDocument().content_lne.bloques[0].texto),'Frase corregida durante revisión');
 await page.frameLocator('#summary-editor-frame').locator('#lne-summary-publish').click();
 assert.match(await page.locator('[data-destination]').textContent(),/Cartilla: El Estado/);assert.match(await page.locator('[data-destination]').textContent(),/Autor: owner@example.test/);
 await page.locator('[data-confirm]').click();
 await page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='PUBLICADO');assert.equal(docs.get(id).status,'PUBLICADO');assert.equal(publications.size,1);
 await page.getByRole('dialog').getByRole('button',{name:'Cerrar',exact:true}).click();
 await page.frameLocator('#summary-editor-frame').locator('#lne-summary-list').click();await page.locator('[data-filter="PUBLICADO"]').click();
 await page.getByRole('button',{name:'VER PUBLICADO',exact:true}).waitFor();assert.match(await page.locator('[data-documents]').textContent(),/Publicado por: owner@example.test/);
 const publicPage=await browser.newPage({viewport:{width:1600,height:1000}});await publicPage.goto(base+'/pages/curso.html');
 await publicPage.addStyleTag({path:path.join(root,'style.css')});await publicPage.addScriptTag({path:path.join(root,'formacion.js')});await publicPage.addScriptTag({path:path.join(root,'formacion-ui.js')});
 await publicPage.evaluate(()=>{const base=document.createElement('base');base.href=location.origin+'/';document.head.append(base);window.LNEActiveCourse=LNEFormacion.getCourseById('contratos');window.LNERouter={navigate(url){history.pushState(null,'',url);LNEFormacionUI.mountCourse();}};return LNEFormacionUI.mountCourse();});
 const old=require('../data/contratos.json');assert.equal(await publicPage.locator('.formacion-topic-card').count(),old.length+1);
 await publicPage.locator('.formacion-topic-card').filter({hasText:template.name}).click();await publicPage.locator('#formacion-topic-modal-body iframe').waitFor();
 await publicPage.frameLocator('#formacion-topic-modal-body iframe').getByText('Frase corregida durante revisión',{exact:true}).waitFor();
 const publishedFrame=publicPage.frames().find(f=>f.parentFrame());
 await publishedFrame.waitForLoadState('load');
 await publishedFrame.evaluate(()=>document.fonts.ready);
 console.log('Published render:',await publishedFrame.evaluate(()=>({ready:document.readyState,background:getComputedStyle(document.body).backgroundColor,blocks:document.querySelectorAll('.lne-editor-block').length,title:document.querySelector('h1')?.textContent})));
 await publicPage.screenshot({path:path.join(__dirname,'summary-workflow-public.png')});
 await page.getByRole('button',{name:'ELIMINAR PUBLICACIÓN',exact:true}).click();
 await page.getByRole('button',{name:'Eliminar',exact:true}).click();
 await page.getByText('Publicación retirada. El documento permanece como BORRADOR; cartilla e imagen conservadas.',{exact:true}).waitFor();
 assert.equal(publications.size,0);assert.equal(docs.get(id).status,'BORRADOR');assert.equal(templates.size,1);assert.equal(docs.get(id).content_lne.bloques[0].texto,'Frase corregida durante revisión');
 console.log(JSON.stringify({provider:'SIMULATED Supabase; real Chromium/Node/editor/public renderer',draft:true,browserClosedAndReopened:true,fullJsonRecovered:true,inlineTypingAutosaved:true,protectedAsyncReopen:true,reviewNotPublic:true,editReviewSameId:true,debouncedAutosave:true,finalPublication:true,oldAndNewCards:true,publishedContentOpens:true,ownerWithdrawalRetainsDraftAndCard:true,startupEditorialRequests:0}));
 }catch(e){console.error(e);if(page)console.error('Workflow diagnostics:',await page.frameLocator('#summary-editor-frame').locator('#lne-summary-save-status').textContent().catch(()=>''),JSON.stringify([...docs.values()].map(d=>({id:d.id,status:d.status,updated_at:d.updated_at,text:d.content_lne?.bloques[0]?.texto}))));process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
