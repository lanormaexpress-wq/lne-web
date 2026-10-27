const express=require('express'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const app=express(),rows=new Map(),objects=new Map(),root=path.resolve(__dirname,'..');let base;
const uid='11111111-1111-4111-8111-111111111111';
app.use(express.json());
app.all('/mock/rest/v1/summary_templates',(req,res)=>{
 const match=row=>Object.entries(req.query).every(([k,v])=>!['id','course_id','image_path','is_active'].includes(k)||String(row[k])===String(v).slice(3));
 if(req.method==='GET')return res.json([...rows.values()].filter(match).sort((a,b)=>a.sort_order-b.sort_order));
 if(req.method==='POST'){const row={...req.body,is_active:true,sort_order:rows.size+1,created_at:new Date().toISOString()};rows.set(row.id,row);return res.json([row]);}
 const found=[...rows.values()].filter(match);
 if(req.method==='PATCH'){found.forEach(row=>Object.assign(row,req.body));return res.json(found);}
 if(req.method==='DELETE'){found.forEach(row=>rows.delete(row.id));return res.json(found);}
 res.status(405).end();
});
app.post('/mock/storage/v1/object/sign/:bucket/*',(req,res)=>res.json({signedURL:'/object/'+req.params.bucket+'/'+req.params[0]}));
app.post('/mock/rest/v1/rpc/reorder_summary_templates',(req,res)=>{const actual=[...rows.values()].sort((a,b)=>a.sort_order-b.sort_order).map(r=>r.id);if(JSON.stringify(actual)!==JSON.stringify(req.body.expected_ids))return res.status(409).json({code:'40001'});req.body.ordered_ids.forEach((id,index)=>rows.get(id).sort_order=index+1);res.json(null);});
app.get('/mock/rest/v1/summary_publications',(_req,res)=>res.json([]));
app.post('/mock/storage/v1/object/:bucket/*',express.raw({type:'image/webp',limit:'4mb'}),(req,res)=>{objects.set(req.params[0],req.body);res.json({Key:req.params[0]});});
app.get('/mock/storage/v1/object/:bucket/*',(req,res)=>objects.has(req.params[0])?res.type('webp').send(objects.get(req.params[0])):res.status(404).end());
app.delete('/mock/storage/v1/object/:bucket',(req,res)=>{req.body.prefixes.forEach(p=>objects.delete(p));res.json([]);});
app.use('/admin/resumenes',require('../lib/summary-editor')((req,res,next)=>{req.adminUser={id:uid,app_metadata:{role:'owner'}};next();},()=>({url:base+'/mock',key:'test-only'})));
app.get('/admin',(_req,res)=>res.sendFile(path.join(root,'admin.html')));app.use(express.static(root));
const server=app.listen(0,'127.0.0.1',async()=>{let browser;try{
 base=`http://127.0.0.1:${server.address().port}`;browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:1600,height:1000}}),page=await context.newPage(),errors=[];
 page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/admin.js?*',r=>r.fulfill({contentType:'text/javascript',body:`(async()=>{await LNEAdminSession.sync({access_token:'test'});document.getElementById('admin-loading').hidden=true;document.getElementById('admin-view').hidden=false;})();`}));
 await page.goto(base+'/admin',{waitUntil:'domcontentloaded'});await page.locator('[data-admin-section="summaries"]').click();
 async function selectCourse(){await page.frameLocator('#summary-editor-frame').locator('#lne-summary-continue').click();await page.locator('[data-area] option').nth(1).waitFor({state:'attached'});await page.locator('[data-area]').selectOption('fundamentos');await page.locator('[data-course]').selectOption('ciencia-politica');}
 await selectCourse();await page.getByText('Todavía no hay cartillas creadas.',{exact:true}).waitFor();
 await page.locator('[data-add]').click();await page.locator('[data-template-name]').fill('Fundamentos de la Ciencia Política');
 await page.locator('[data-template-image]').setInputFiles(path.join(root,'assets/imagenes/contratos1.png'));
 await page.waitForFunction(()=>document.querySelector('[data-image-info]').dataset.metrics);
 const metrics=JSON.parse(await page.locator('[data-image-info]').getAttribute('data-metrics'));
 assert.ok(metrics.width<=1408&&metrics.height<=880);assert.equal(metrics.type,'image/webp');
 await page.screenshot({path:path.join(__dirname,'summary-template-preview.png')});
 await page.locator('[data-template-save]').click();await page.getByText('Cartilla guardada correctamente.',{exact:true}).waitFor();assert.equal(rows.size,1);assert.equal(objects.size,1);
 const firstPath=[...objects.keys()][0];
 await page.getByRole('button',{name:'Cancelar',exact:true}).click();await selectCourse();await page.getByText('Disponible',{exact:true}).waitFor();assert.equal(rows.size,1);
 await page.getByRole('button',{name:'Cancelar',exact:true}).click();await page.reload({waitUntil:'domcontentloaded'});await selectCourse();await page.getByText('Disponible',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Editar cartilla',exact:true}).click();await page.locator('[data-template-name]').fill('Fundamentos de la Ciencia Política · editada');await page.locator('[data-template-save]').click();await page.getByText('Cartilla guardada correctamente.',{exact:true}).waitFor();assert.match([...rows.values()][0].name,/editada/);
 await page.getByRole('button',{name:'Editar cartilla',exact:true}).click();await page.locator('[data-template-image]').setInputFiles(path.join(root,'assets/imagenes/contratos1.png'));await page.waitForFunction(()=>document.querySelector('[data-image-info]').textContent.includes('reducción'));await page.locator('[data-template-save]').click();await page.getByText('Cartilla guardada correctamente.',{exact:true}).waitFor();assert.equal(objects.size,1);assert.equal(objects.has(firstPath),false);
 await page.getByRole('button',{name:'Eliminar cartilla',exact:true}).click();await page.getByRole('button',{name:'Eliminar',exact:true}).click();await page.getByText('Cartilla eliminada correctamente.',{exact:true}).waitFor();assert.equal(rows.size,0);assert.equal(objects.size,0);assert.equal(await page.getByRole('button',{name:'ENVIAR A REVISIÓN',exact:true}).isDisabled(),true);assert.deepEqual(errors,[]);
 for(const name of ['Orden 1','Orden 2','Orden 3']){
  await page.locator('[data-add]').click();await page.locator('[data-template-name]').fill(name);
  await page.locator('[data-template-image]').setInputFiles(path.join(root,'assets/imagenes/contratos1.png'));
  await page.waitForFunction(()=>document.querySelector('[data-image-info]').textContent.includes('reducción'));
  await page.locator('[data-template-save]').click();await page.getByText('Cartilla guardada correctamente.',{exact:true}).waitFor();
 }
 const orderedIds=[...rows.keys()],expected=[orderedIds[2],orderedIds[0],orderedIds[1]];
 await page.getByRole('button',{name:'Mover arriba: Orden 3',exact:true}).click();await page.getByText('2. Orden 3',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Mover arriba: Orden 3',exact:true}).click();await page.getByText('1. Orden 3',{exact:true}).waitFor();
 assert.deepEqual(await page.locator('.summary-managed-card').evaluateAll(els=>els.map(el=>el.dataset.templateId)),expected);
 await page.getByRole('button',{name:'Cancelar',exact:true}).click();await page.reload({waitUntil:'domcontentloaded'});await selectCourse();
 await page.getByText('1. Orden 3',{exact:true}).waitFor();
 assert.deepEqual(await page.locator('.summary-managed-card').evaluateAll(els=>els.map(el=>el.dataset.templateId)),expected);
 assert.equal(rows.size,3);assert.equal(objects.size,3);
 for(let i=0;i<3;i++){
  await page.getByRole('button',{name:'Eliminar cartilla',exact:true}).first().click();
  const deleted=page.waitForResponse(r=>r.url().includes('/admin/resumenes/templates/')&&r.request().method()==='DELETE');
  await page.getByRole('button',{name:'Eliminar',exact:true}).click();await deleted;
  await page.waitForFunction(count=>document.querySelectorAll('.summary-managed-card').length===count,2-i);
 }
 assert.equal(rows.size,0);assert.equal(objects.size,0);
 // Medición del componente público real: mismo fragmento, renderer y CSS, sin modificar fuentes.
 const publicPage=await context.newPage();await publicPage.goto(base+'/pages/curso.html');await publicPage.addStyleTag({path:path.join(root,'style.css')});await publicPage.addScriptTag({path:path.join(root,'formacion.js')});await publicPage.addScriptTag({path:path.join(root,'formacion-ui.js')});
 await publicPage.evaluate(()=>{const base=document.createElement('base');base.href=location.origin+'/';document.head.append(base);window.LNEActiveCourse=window.LNEFormacion.getCourseById('contratos');});
 // El método real usa LNEActiveCourse, comprobado por la fuente; cargar datos desde el servidor de prueba.
 await publicPage.evaluate(()=>window.LNEFormacionUI.mountCourse());await publicPage.locator('.formacion-topic-media').first().waitFor();
 const sizes=[];for(const width of [1600,1200,992,769,768,520,390]){await publicPage.setViewportSize({width,height:1000});sizes.push(await publicPage.locator('.formacion-topic-media').first().evaluate(el=>{const b=el.getBoundingClientRect(),img=el.querySelector('img');return{viewport:innerWidth,width:b.width,height:b.height,ratio:getComputedStyle(el).aspectRatio,objectFit:img?getComputedStyle(img).objectFit:null};}));}
 const report={scope:'Chromium real + API Node real + Supabase/Storage simulados; RLS real probado por separado',metrics,sizes,create:true,reopen:true,reload:true,edit:true,replaceCleanup:true,deleteCleanup:true,errors};fs.writeFileSync(path.join(__dirname,'summary-templates-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
