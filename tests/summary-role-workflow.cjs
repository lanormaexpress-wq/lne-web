// MOCK ONLY: never load .env, server.js or a real Supabase client/credential.
const express=require('express'),assert=require('node:assert/strict'),path=require('path'),crypto=require('crypto');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const catalog=require('../admin-permission-catalog'),access=require('../lib/summary-permissions');
const root=path.resolve(__dirname,'..'),docs=new Map(),cards=new Map(),publications=new Map(),permissionWrites=[];
const people=Object.fromEntries(['owner','writer','reviewer'].map(profile=>[profile,{id:crypto.randomUUID(),email:profile==='writer'?'redactor.prueba@example.com':profile==='reviewer'?'revisor.prueba@example.com':'owner.prueba@example.com',name:profile,profile,role:profile==='owner'?'owner':'editor',permissions:catalog.preset(profile)}]));
const actor=req=>people[(req.get('authorization')||'').replace('Bearer ','')];
const user=p=>({id:p.id,email:p.email,app_metadata:{role:p.role},admin_permissions:p.permissions});
const allowed=(p,key)=>p&&access.allowed(user(p),key);
const app=express();let base,revision=0;const forbiddenNetwork=[];
const originalFetch=global.fetch;
global.fetch=(url,options)=>{
 const parsed=new URL(typeof url==='string'?url:url.url);
 if(!['127.0.0.1','localhost'].includes(parsed.hostname)){forbiddenNetwork.push(parsed.origin);throw new Error('Non-local provider blocked in mock test');}
 return originalFetch(url,options);
};
app.use('/mock',express.json({limit:'30mb'}));
const matches=(row,query)=>Object.entries(query).every(([key,value])=>key==='content_lne->>documentoId'?row.content_lne?.documentoId===value.slice(3):!['id','author_id','status','course_id','template_id','updated_at','image_path','is_active'].includes(key)||String(row[key])===value.slice(3));
const visible=(p,row)=>allowed(p,'summary_access')&&(row.author_id===p.id||p.role==='owner'||(['EN_REVISION','PUBLICADO'].includes(row.status)&&(allowed(p,'summary_review')||allowed(p,'summary_publish'))));
const version=row=>Object.assign(row,{updated_at:new Date(Date.UTC(2026,0,1,0,0,++revision)).toISOString()});
app.post('/mock/rest/v1/rpc/withdraw_summary_publication',(req,res)=>{
 const p=actor(req);if(p?.role!=='owner')return res.status(403).json({error:'Denied'});
 const row=docs.get(req.body.document_id);publications.delete(row.id);version(Object.assign(row,{status:'BORRADOR',published_at:null,published_by:null}));res.json(null);
});
app.post('/mock/rest/v1/rpc/ordered_summary_publications',(req,res)=>res.json([...publications.values()].filter(p=>p.course_id===req.body.course)));
app.post('/mock/rest/v1/rpc/summary_cleanup_tasks',(_req,res)=>res.json([]));
app.post('/mock/rest/v1/rpc/update_summary_publication',(req,res)=>{
 const p=actor(req),row=docs.get(req.body.document_id);
 if(!allowed(p,'summary_publish'))return res.status(403).json({error:'Denied'});
 if(!row||row.updated_at!==req.body.expected_updated_at)return res.status(409).json({code:'40001'});
 if(!publications.has(row.id))return res.status(409).json({error:'Missing original'});
 const card=cards.get(row.template_id);publications.set(row.id,{...row,template_name:card.name,image_path:card.image_path});res.json(row);
});
app.all('/mock/rest/v1/:table',(req,res)=>{
 const p=actor(req),table=req.params.table;
 if(table==='summary_templates'){
  const rows=[...cards.values()].filter(row=>matches(row,req.query));
  if(req.method==='GET')return res.json(rows);
  if(!allowed(p,'summary_cards_manage'))return res.status(403).json({error:'Denied'});
  if(req.method==='POST'){const row={...req.body,is_active:true};cards.set(row.id,row);return res.json([row]);}
  if(req.method==='PATCH'){rows.forEach(row=>Object.assign(row,req.body));return res.json(rows);}
  if(req.method==='DELETE'){rows.forEach(row=>cards.delete(row.id));return res.json([]);}
 }
 if(table==='summary_publications')return res.json([...publications.values()].filter(row=>matches(row,req.query)));
 if(table!=='summary_documents')return res.status(404).json({error:'Mock endpoint not implemented'});
 const rows=[...docs.values()].filter(row=>matches(row,req.query)&&visible(p,row));
 if(req.method==='GET')return res.json(rows.map(row=>({...row,summary_templates:{name:cards.get(row.template_id)?.name}})));
 if(req.method==='POST'){const row=version({...req.body});docs.set(row.id,row);return res.json([row]);}
 if(req.method==='PATCH'){
  rows.forEach(row=>{
   const oldStatus=row.status;version(Object.assign(row,req.body));
   if(row.status==='PUBLICADO'&&oldStatus!=='PUBLICADO'){row.published_at=row.updated_at;row.published_by=p.id;const card=cards.get(row.template_id);publications.set(row.id,{...row,template_name:card.name,image_path:card.image_path});}
  });return res.json(rows);
 }
 return res.status(405).end();
});
app.post('/mock/storage/v1/object/sign/:bucket/*',(_req,res)=>res.json({signedURL:'/object/summary-template-images/mock.webp'}));
app.post('/mock/storage/v1/object/:bucket/*',express.raw({type:'image/webp',limit:'4mb'}),(_req,res)=>res.json({Key:'mock.webp'}));
app.delete('/mock/storage/v1/object/:bucket',(_req,res)=>res.json([]));
app.get('/mock/storage/v1/object/summary-template-images/mock.webp',(_req,res)=>res.sendFile(path.join(root,'assets/imagenes/contratos1.png')));
const guard=(req,res,next)=>{const p=actor(req);if(!p)return res.status(401).json({error:'Mock login required'});req.adminUser=user(p);next();};
const cfg=()=>({url:base+'/mock',key:'mock-public-key'});
app.use('/admin/resumenes',require('../lib/summary-editor')(guard,cfg));
app.use('/api/admin',express.json(),require('../lib/admin-users')({requireAdmin:guard,serviceAvailable:()=>false,rest:async(route,options)=>{
 if(route==='rpc/admin_list_users')return {data:Object.values(people).map(p=>({...p,status:'Activo'}))};
 if(route.startsWith('admin_user_permissions')&&options.method==='POST'){const target=Object.values(people).find(p=>p.id===options.body.user_id);target.permissions=options.body.permissions;permissionWrites.push(target.id);return {data:null};}
 throw new Error('Unexpected mock admin operation');
}}));
app.get('/admin',(_req,res)=>res.sendFile(path.join(root,'admin.html')));app.use(express.static(root));
app.get('/api/config/supabase',(_req,res)=>res.json({url:'https://provider.invalid',publishableKey:'mock-public-key'}));
const server=app.listen(0,'127.0.0.1',async()=>{let browser, shared, isolationStage='main';try{
 base=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 async function open(profile, existing=null){
  const context=existing?.context||await browser.newContext({viewport:{width:1600,height:1000}}),page=existing?.page||await context.newPage();page.setDefaultTimeout(20000);
  await context.route('**/*',route=>{
   const url=new URL(route.request().url());
   if(url.origin===base)return route.continue();
   if(/supabase\.(?:co|com|net)$/.test(url.hostname))forbiddenNetwork.push(url.origin);
   return route.abort(); // No external browser traffic, including CDN; editor dependencies are local.
  });
  // Run the REAL admin.js session/redirect code; only the Auth provider is simulated.
  await page.route('**/npm/@supabase/supabase-js@2',route=>route.fulfill({contentType:'text/javascript',body:`window.supabase={createClient(){return {auth:{async getSession(){return {data:{session:{access_token:'${profile}',user:${JSON.stringify(user(people[profile]))}}}}},onAuthStateChange(){},async signOut(){}},from(){const chain=new Proxy({}, {get(_target,key){if(key==='then')return resolve=>resolve({data:[],count:0,error:null});return ()=>chain}});return chain}}}};`}));
  await page.goto(base+'/admin',{waitUntil:'domcontentloaded'});await page.locator('#admin-view').waitFor({state:'visible'});await page.locator('[data-admin-section="summaries"]').click();
  await page.frameLocator('#summary-editor-frame').locator('#lne-summary-continue').waitFor();return {page,context};
 }
 async function api(page,route,method='GET',body){return page.evaluate(async({route,method,body})=>{const response=await fetch('/admin/resumenes'+route,{method,headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});return {status:response.status,body:await response.json()};},{route,method,body});}
 const writer=await open('writer'),page=writer.page,frame=page.frameLocator('#summary-editor-frame');
 for(const [profile,p]of Object.entries(people)){
  for(const key of catalog.keys)assert.equal(access.allowed(user(p),key),profile==='owner'||p.permissions[key]===true&&!catalog.reserved.includes(key),profile+': '+key);
 }
 await frame.locator('#btn-nuevo').click();await frame.locator('#doc-title-input').fill('Documento del redactor ficticio');
 // Import a DOCX generated in memory through the unchanged ORIGINAL parser.
 async function importWord(target){return target.frames().find(f=>f.url().includes('/assets/2026-10-19/index.html')).evaluate(async()=>{
  const zip=new JSZip();
  zip.file('[Content_Types].xml','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
  zip.file('_rels/.rels','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="r1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
  zip.file('word/document.xml','<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Contenido Word del redactor ficticio</w:t></w:r></w:p></w:body></w:document>');
  const file=new File([await zip.generateAsync({type:'uint8array'})],'redactor-prueba.docx',{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
  const result=await LNEDocxParser.importIntoEditor(file);return result.blocks.length;
 });}
 const imported=await importWord(page);assert.ok(imported>0);
 await page.evaluate(()=>LNESummaryWorkflow.save());const id=await page.evaluate(()=>LNESummaryWorkflow.getDocument().id);
 assert.equal(docs.get(id).author_id,people.writer.id);assert.equal(docs.get(id).status,'BORRADOR');
 const firstEditable=frame.locator('#document-sheet [contenteditable="true"]').first();await firstEditable.fill('Corrección del redactor ficticio');await page.evaluate(()=>LNESummaryWorkflow.save());
 assert.ok(JSON.stringify(docs.get(id).content_lne).includes('Corrección del redactor ficticio'));
 if(process.env.LNE_DRAFT_WORKFLOW_ONLY==='1'){
  for(let i=0;i<2;i++){
   const before=docs.get(id).updated_at;await firstEditable.fill('Autosave ficticio '+i);
   await page.waitForFunction(before=>LNESummaryWorkflow.getDocument()?.updated_at!==before,before,{timeout:15000});
   assert.equal(docs.get(id).status,'BORRADOR');assert.equal(docs.size,1);
  }
  await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(id=>LNESummaryWorkflow.getDocument()?.id===id,id);
  assert.equal(docs.get(id).status,'BORRADOR');assert.equal(docs.size,1);assert.equal(publications.size,0);
  assert.equal(await frame.locator('#lne-summary-publish').isVisible(),false);
  for(const action of ['publish','update-publication'])assert.equal((await api(page,'/documents/'+id,'PATCH',{action,updated_at:docs.get(id).updated_at})).status,403);
  assert.equal(docs.get(id).status,'BORRADOR');assert.equal(publications.size,0);
 }
 await frame.locator('#lne-summary-continue').click();await page.locator('[data-area] option').nth(1).waitFor({state:'attached'});
 const area=require('../formacion').courses.find(c=>c.id==='contratos').area;
 await page.locator('[data-area]').selectOption(area);await page.locator('[data-course]').selectOption('contratos');
 await page.locator('[data-add]').click();await page.locator('[data-template-name]').fill('Cartilla ficticia del redactor');
 await page.locator('[data-template-image]').setInputFiles(path.join(root,'assets/imagenes/contratos1.png'));await page.waitForFunction(()=>document.querySelector('[data-image-info]').dataset.metrics);
 await page.locator('[data-template-save]').click();await page.getByText('Cartilla guardada correctamente.',{exact:true}).waitFor();
 await page.getByRole('button',{name:/Cartilla ficticia del redactor.*Disponible/s}).click();await page.locator('[data-submit-review]').click();
 await page.locator('[data-status]').filter({hasText:'Resumen enviado a revisión.'}).waitFor();assert.equal(docs.get(id).status,'EN_REVISION');assert.equal(publications.size,0);
 await page.getByRole('button',{name:'Cancelar',exact:true}).click();assert.equal(await frame.locator('#lne-summary-publish').isVisible(),false);
 assert.equal((await api(page,'/documents/'+id,'PATCH',{action:'publish',updated_at:docs.get(id).updated_at})).status,403);
 assert.equal((await api(page,'/documents/'+id+'/publication','DELETE')).status,403);
 // Writer can still correct his own document in review.
 await firstEditable.fill('Corrección propia en revisión');await page.evaluate(()=>LNESummaryWorkflow.save());assert.equal(docs.get(id).status,'EN_REVISION');
 const reviewer=await open('reviewer'),reviewPage=reviewer.page,reviewFrame=reviewPage.frameLocator('#summary-editor-frame');
 // Reviewer creates/imports/edits/saves a separate draft too, without publishing it.
 await reviewFrame.locator('#doc-title-input').fill('Borrador propio del revisor');assert.ok(await importWord(reviewPage)>0);
 await reviewFrame.locator('#document-sheet [contenteditable="true"]').first().fill('Corrección propia del revisor');
 await reviewPage.evaluate(()=>LNESummaryWorkflow.save());const reviewerDraft=await reviewPage.evaluate(()=>LNESummaryWorkflow.getDocument().id);assert.equal(docs.get(reviewerDraft).author_id,people.reviewer.id);
 assert.equal((await api(page,'/documents/'+reviewerDraft)).status,404,'Mock data isolation: writer cannot read a foreign draft');
 await reviewFrame.locator('#lne-summary-list').click();await reviewPage.locator('[data-filter="EN_REVISION"]').click();await reviewPage.getByRole('button',{name:'ABRIR / EDITAR',exact:true}).click();
 await reviewPage.waitForFunction(target=>LNESummaryWorkflow.getDocument()?.id===target,id);
 assert.notEqual(docs.get(id).author_id,people.reviewer.id);
 await reviewFrame.locator('#document-sheet [contenteditable="true"]').first().fill('Corrección del revisor sobre documento ajeno');await reviewPage.evaluate(()=>LNESummaryWorkflow.save());
 assert.equal(docs.get(id).author_id,people.writer.id);assert.ok(JSON.stringify(docs.get(id).content_lne).includes('Corrección del revisor sobre documento ajeno'));
 assert.equal(await reviewFrame.locator('#lne-summary-publish').isVisible(),true);await reviewFrame.locator('#lne-summary-publish').click();await reviewPage.locator('[data-confirm]').click();
 await reviewPage.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='PUBLICADO');assert.equal(publications.size,1);assert.equal(docs.get(id).published_by,people.reviewer.id);
 if(process.env.LNE_DRAFT_WORKFLOW_ONLY==='1'){
  assert.deepEqual(forbiddenNetwork,[]);
  console.log(JSON.stringify({scope:'LOCAL MOCK ONLY; real frontend + Express routers, fake Auth/PostgREST/Storage',create:'BORRADOR',repeatedAutosaveAndF5:'BORRADOR; same ID; no duplicate',writerPublicationUI:'hidden',writerPublish:403,writerUpdatePublication:403,explicitSubmit:'EN_REVISION',reviewerPublish:'PUBLICADO',realSupabaseRequests:0}));return;
 }
 await reviewPage.getByRole('dialog').getByRole('button',{name:'Cerrar',exact:true}).click();
 await reviewFrame.locator('#lne-summary-list').click();await reviewPage.locator('[data-filter="PUBLICADO"]').click();await reviewPage.getByRole('button',{name:'ABRIR / EDITAR',exact:true}).waitFor();
 assert.equal(await reviewPage.getByRole('button',{name:'ELIMINAR PUBLICACIÓN',exact:true}).count(),0);
 assert.equal((await api(reviewPage,'/documents/'+id+'/publication','DELETE')).status,403);
 const owner=await open('owner'),ownerPage=owner.page;await ownerPage.frameLocator('#summary-editor-frame').locator('#lne-summary-list').click();await ownerPage.locator('[data-filter="PUBLICADO"]').click();
 await ownerPage.getByRole('button',{name:'ELIMINAR PUBLICACIÓN',exact:true}).click();await ownerPage.getByRole('button',{name:'Eliminar',exact:true}).click();
 await ownerPage.getByText('Publicación retirada. El documento permanece como BORRADOR; cartilla e imagen conservadas.',{exact:true}).waitFor();
 assert.equal(publications.size,0);assert.equal(docs.get(id).status,'BORRADOR');assert.equal(cards.size,1);
 const change=await fetch(base+'/api/admin/users/'+people.writer.id,{method:'PATCH',headers:{Authorization:'Bearer owner','Content-Type':'application/json'},body:JSON.stringify({profile:'writer',permissions:catalog.preset('writer')})});
 assert.equal(change.status,200);assert.deepEqual(permissionWrites,[people.writer.id]);
 // A–E: SAME browser context and SAME tab, not separate profiles.
 isolationStage='A: initial autosave';shared=await open('writer');
 await shared.page.evaluate(()=>localStorage.setItem('LNE_EDITOR_AUTOSAVE_DRAFT',JSON.stringify({documentoId:'unattributed-legacy',metadata:{titulo:'NEVER INHERIT'},bloques:[{id:'legacy',tipo:'parrafo',texto:'Legacy shared state'}]})));
 const beforeIsolation=docs.size;assert.ok(await importWord(shared.page)>0);
 await shared.page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.status==='BORRADOR',{},{timeout:15000});
 await shared.page.frameLocator('#summary-editor-frame').locator('#document-sheet [contenteditable="true"][data-field="texto"]').first().fill('ISOLATION A: saved by writer');
 await shared.page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.content_lne.bloques.some(b=>b.texto==='ISOLATION A: saved by writer'),{},{timeout:15000});
 const activeId=await shared.page.evaluate(()=>LNESummaryWorkflow.getDocument().id);assert.equal(docs.size,beforeIsolation+1);
 const activeModelId=docs.get(activeId).content_lne.documentoId;
 await shared.page.evaluate(()=>{const win=document.getElementById('summary-editor-frame').contentWindow;win.localStorage.setItem('LNE_EDITOR_DOCUMENTS_V1',JSON.stringify([{documentoId:'local-writer-saved',metadata:{titulo:'Writer saved library'},bloques:[]}]))});
 isolationStage='A: F5';await shared.page.reload({waitUntil:'domcontentloaded'});await shared.page.waitForFunction(id=>LNESummaryWorkflow.getDocument()?.id===id,activeId);
 assert.equal(docs.size,beforeIsolation+1);assert.equal(await shared.page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.LNEState.state.documentoId),activeModelId);
 for(let attempt=1;attempt<=3;attempt++){
  await shared.page.reload({waitUntil:'domcontentloaded'});await shared.page.waitForFunction(id=>LNESummaryWorkflow.getDocument()?.id===id,activeId);
  const text='Identity after F5 '+attempt;
  await shared.page.frameLocator('#summary-editor-frame').locator('#document-sheet p[data-field="texto"][contenteditable="true"]').first().fill(text);
  await shared.page.waitForFunction(text=>LNESummaryWorkflow.getDocument()?.content_lne.bloques.some(b=>b.texto===text),text,{timeout:15000});
  assert.equal(docs.size,beforeIsolation+1);assert.equal(docs.get(activeId).content_lne.documentoId,activeModelId);
 }
 await shared.page.evaluate(()=>history.replaceState(null,'','/admin/resumenes/editor'));
 await shared.page.reload({waitUntil:'domcontentloaded'});await shared.page.waitForFunction(id=>LNESummaryWorkflow.getDocument()?.id===id,activeId);
 const badId=crypto.randomUUID();
 await shared.page.goto(base+'/admin/resumenes/editor?resumen='+badId,{waitUntil:'domcontentloaded'});
 await shared.page.frameLocator('#summary-editor-frame').locator('#lne-summary-save-status').filter({hasText:'No se pudo recuperar el resumen'}).waitFor();
 assert.equal(await shared.page.evaluate(async()=>{try{await LNESummaryWorkflow.save();return false;}catch{return true;}}),true,'Invalid restored identity must block saves, not silently INSERT');
 assert.equal(docs.size,beforeIsolation+1);
 await shared.page.goto(base+'/admin/resumenes/editor?resumen='+activeId,{waitUntil:'domcontentloaded'});await shared.page.waitForFunction(id=>LNESummaryWorkflow.getDocument()?.id===id,activeId);
 // Prepare a valid review destination using an already-existing mock card.
 await shared.page.evaluate(value=>LNESummaryWorkflow.selectDestination(value),{areaId:area,courseId:'contratos',templateId:[...cards.keys()][0]});await shared.page.evaluate(()=>LNESummaryWorkflow.save('submit'));
 await shared.page.locator('#logout-button').click();assert.equal(await shared.page.evaluate(()=>new URL(location.href).searchParams.has('resumen')),false);
 isolationStage='B: new reviewer';shared=await open('reviewer',shared);
 assert.equal(await shared.page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.LNEState.state.bloques.length),0,'B: reviewer must start clean');
 assert.equal(await shared.page.evaluate(()=>LNESummaryWorkflow.getDocument()),null);assert.equal(await shared.page.evaluate(()=>new URL(location.href).searchParams.has('resumen')),false);
 assert.equal(await shared.page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.localStorage.getItem('LNE_EDITOR_DOCUMENTS_V1')),null,'Library must be scoped by user');
 isolationStage='C: explicit open';await shared.page.frameLocator('#summary-editor-frame').locator('#lne-summary-list').click();await shared.page.locator('[data-filter="EN_REVISION"]').click();
 const target=shared.page.locator('.summary-workflow-row').filter({hasText:docs.get(activeId).title});await target.getByRole('button',{name:'ABRIR / EDITAR',exact:true}).click();
 await shared.page.waitForFunction(id=>LNESummaryWorkflow.getDocument()?.id===id,activeId);
 isolationStage='D: reviewer autosave';await shared.page.frameLocator('#summary-editor-frame').locator('#document-sheet [contenteditable="true"][data-field="texto"]').first().fill('ISOLATION D: reviewer correction');
 await shared.page.waitForFunction(()=>LNESummaryWorkflow.getDocument()?.content_lne.bloques.some(b=>b.texto==='ISOLATION D: reviewer correction'),{},{timeout:15000});
 await shared.page.reload({waitUntil:'domcontentloaded'});await shared.page.waitForFunction(id=>LNESummaryWorkflow.getDocument()?.id===id,activeId);
 assert.equal(await shared.page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.LNEState.state.documentoId),activeModelId);
 isolationStage='E: new writer login';await shared.page.locator('#logout-button').click();shared=await open('writer',shared);
 assert.equal(await shared.page.evaluate(()=>document.getElementById('summary-editor-frame').contentWindow.LNEState.state.bloques.length),0,'E: writer must start clean after new login');
 assert.equal(await shared.page.evaluate(()=>LNESummaryWorkflow.getDocument()),null);
 const localLibrary=await shared.page.evaluate(()=>JSON.parse(document.getElementById('summary-editor-frame').contentWindow.localStorage.getItem('LNE_EDITOR_DOCUMENTS_V1')));assert.equal(localLibrary[0].documentoId,'local-writer-saved');
 assert.equal(docs.size,beforeIsolation+1,'Autosave must update the same document, not create copies');assert.equal(docs.get(activeId).author_id,people.writer.id);assert.equal(docs.get(activeId).status,'EN_REVISION');
 const namespaced=await shared.page.evaluate(()=>Object.keys(localStorage).filter(key=>key.startsWith('lne-editor:')));assert.ok(namespaced.some(key=>key.includes(people.writer.id)));assert.ok(namespaced.some(key=>key.includes(people.reviewer.id)));
 console.log(JSON.stringify({isolation:'SIMULATED provider, real Chromium, same origin/context/tab',A_sameUserF5:true,B_newUserClean:true,C_explicitReviewOpen:true,D_reviewerF5:true,E_returningWriterClean:true,localLibrariesPartitioned:true,legacyUnattributedStateIgnored:true,centralDocumentsPreserved:true,sameAutosaveRecord:true}));
 assert.deepEqual(forbiddenNetwork,[]);
 console.log(JSON.stringify({scope:'MOCK ONLY; local production routers and original editor; PostgREST/Storage/Auth simulated in memory',owner:{allPermissionsIncludingFuture:access.allowed(user(people.owner),'future_permission'),managePermissions:true,withdrawPublication:true},writer:{email:people.writer.email,importDocx:true,create:true,edit:true,saveDraft:true,submitReview:true,correctOwnReview:true,createCardWithImage:true,publish403:true,withdraw403:true,foreignDraft404:'mock visibility'},reviewer:{email:people.reviewer.email,importDocx:true,createDraft:true,editOwnDraft:true,editForeignReview:true,publishForeignReview:true,withdraw403:true},realSupabaseRequests:0,realUsersCreated:0}));
}catch(error){console.error('Role workflow failed:',isolationStage,error.message);if(shared)console.error('Isolation diagnostics:',await shared.page.evaluate(()=>({notice:document.getElementById('summary-editor-frame').contentDocument?.getElementById('lne-summary-save-status')?.textContent,current:window.LNESummaryWorkflow?.getDocument()?.id,blocks:document.getElementById('summary-editor-frame').contentWindow?.LNEState?.state.bloques,scope:window.LNESummaryStorage?.current()})).catch(()=>({})));process.exitCode=1;}finally{await browser?.close();global.fetch=originalFetch;server.close();server.closeAllConnections();}});
