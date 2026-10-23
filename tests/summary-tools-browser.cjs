const express=require('express'),path=require('path'),fs=require('fs'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),app=express();
app.use('/admin/resumenes',require('../lib/summary-editor')((req,res,next)=>{req.adminUser={id:'mock-owner',app_metadata:{role:'owner'}};next();}));
app.get('/admin',(_req,res)=>res.sendFile(path.join(root,'admin.html')));app.use(express.static(root));
const server=app.listen(0,'127.0.0.1',async()=>{let browser;try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const metrics=[];
 for(const mode of ['baseline','tools']){
  const context=await browser.newContext({viewport:{width:1600,height:1000}}),page=await context.newPage(),requests=[],dialogs=[],warnings=[],errors=[];
  page.setDefaultTimeout(60000);page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message));
  page.on('dialog',async d=>{dialogs.push(d.message());await d.accept();});page.on('console',m=>{if(m.type()==='warning')warnings.push(m.text());});
  await page.route('**/admin.js?*',r=>r.fulfill({contentType:'text/javascript',body:`(async()=>{await LNEAdminSession.sync({access_token:'isolated-test'});document.getElementById('admin-loading').hidden=true;document.getElementById('admin-view').hidden=false;})();`}));
  if(mode==='baseline')await page.route('**/admin-summary-tools.js?*',r=>r.fulfill({contentType:'text/javascript',body:''}));
  const base=`http://127.0.0.1:${server.address().port}`;
  await page.goto(base+'/admin',{waitUntil:'domcontentloaded'});
  const start=Date.now();await page.locator('[data-admin-section="summaries"]').click();
  const frame=page.frameLocator('#summary-editor-frame');await frame.locator('#document-sheet').waitFor();await frame.locator('.editor-toolbar').waitFor();
  metrics.push({mode,clickToEditorMs:Date.now()-start});
  assert.equal(requests.filter(u=>u.includes('/catalog')||u.includes('/admin-summary-selection.js')).length,0);
  if(mode==='tools'){
   await frame.locator('#lne-summary-continue').waitFor();
   assert.equal(await frame.locator('#lne-summary-continue').evaluate(b=>b.previousElementSibling.id),'lne-summary-list');
   assert.equal(await frame.locator('#lne-summary-publish').isVisible(),false);
   const liveFrame=page.frames().find(f=>f.url().includes('/assets/2026-10-19/index.html'));
   const result=await liveFrame.evaluate(async()=>{
    const zip=new JSZip();
    zip.file('[Content_Types].xml','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
    zip.file('_rels/.rels','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="r1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
    zip.file('word/document.xml','<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:v="urn:schemas-microsoft-com:vml"><w:body><w:p><w:pPr><w:pStyle w:val="EstiloTecnicoDesconocido"/></w:pPr><w:r><w:t>Contenido jurídico importado</w:t></w:r></w:p><w:p><w:r><w:pict><v:shape><v:stroke/><v:path/></v:shape></w:pict></w:r></w:p></w:body></w:document>');
    zip.file('word/styles.xml','<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:styleId="EstiloTecnicoDesconocido"><w:name w:val="Estilo técnico desconocido"/></w:style></w:styles>');
    const file=new File([await zip.generateAsync({type:'uint8array'})],'observaciones.docx',{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    const parsed=await LNEDocxParser.importIntoEditor(file);return{blocks:parsed.blocks.length,warnings:parsed.warnings};
   });
   assert.ok(result.blocks>0);assert.ok(result.warnings.length>0);
   assert.equal(dialogs.length,0,'La importación correcta no debe mostrar alert');assert.ok(warnings.some(w=>w.includes('observaciones DOCX')));
   await liveFrame.evaluate(()=>alert('No se pudo procesar el archivo Word: detalle técnico de prueba'));
   assert.equal(dialogs.at(-1),'No se pudo importar este documento Word. Revisa que sea un archivo .docx válido.');
   await page.screenshot({path:path.join(__dirname,'summary-tools-toolbar.png')});
   await frame.locator('#lne-summary-continue').click();await page.locator('[data-area] option').nth(1).waitFor({state:'attached'});
   assert.equal(requests.filter(u=>u.includes('/admin/resumenes/catalog')).length,1);
   assert.equal(requests.filter(u=>u.includes('/admin-summary-selection.js')).length,1);
   assert.equal(await page.getByRole('button',{name:'ENVIAR A REVISIÓN',exact:true}).isDisabled(),true);
   await page.getByRole('button',{name:'Cancelar',exact:true}).click();
   await page.reload({waitUntil:'domcontentloaded'});await page.frameLocator('#summary-editor-frame').locator('#lne-summary-continue').waitFor();
   assert.equal(requests.filter(u=>u.includes('/admin/resumenes/catalog')).length,1,'F5 no debe consultar catálogo');
   assert.deepEqual(errors,[]);metrics.push({importBlocks:result.blocks,importWarnings:result.warnings.length,technicalAlerts:0,errors});
  }
  await context.close();
 }
 fs.writeFileSync(path.join(__dirname,'summary-tools-results.json'),JSON.stringify(metrics,null,2));console.log(JSON.stringify(metrics));
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
