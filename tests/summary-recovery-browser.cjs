const express=require('express'),path=require('path'),fs=require('fs'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),app=express();
app.use('/admin/resumenes',require('../lib/summary-editor')((req,res,next)=>{req.adminUser={id:'mock-owner',app_metadata:{role:'owner'}};next();}));
app.get('/admin',(_req,res)=>res.sendFile(path.join(root,'admin.html')));app.use(express.static(root));
const server=app.listen(0,'127.0.0.1',async()=>{let browser;try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:1600,height:1000}}),page=await context.newPage(),errors=[],requests=[],responses=[];
 page.setDefaultTimeout(60000);page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 page.on('response',r=>{if(r.url().includes('/admin/resumenes/assets/'))responses.push({url:r.url(),status:r.status(),type:r.headers()['content-type']});});
 await page.route('**/admin.js?*',r=>r.fulfill({contentType:'text/javascript',body:`(async()=>{await LNEAdminSession.sync({access_token:'isolated-test'});document.getElementById('admin-loading').hidden=true;document.getElementById('admin-view').hidden=false;document.body.dataset.role='owner';})();`}));
 const base=`http://127.0.0.1:${server.address().port}`;
 await page.goto(base+'/admin',{waitUntil:'domcontentloaded'});await page.locator('[data-admin-section="summaries"]').click();
 async function verify(){
  const frame=page.frameLocator('#summary-editor-frame');
  await frame.locator('#document-sheet').waitFor({state:'visible'});
  await frame.locator('.editor-toolbar').waitFor({state:'visible'});
  await frame.locator('#context-inspector').waitFor({state:'visible'});
  const rect=await page.locator('#summary-editor-frame').boundingBox();assert.ok(rect.height>500&&rect.width>1400);
  assert.equal(await page.locator('.summary-continue').count(),0);
  assert.ok((await page.locator('#summary-editor-frame').getAttribute('src')).includes('/assets/2026-10-19/index.html'));
 }
 await verify();
 const frame=page.frameLocator('#summary-editor-frame');
 const chooser=page.waitForEvent('filechooser');await frame.locator('#btn-importar-word').click();await chooser;
 await page.screenshot({path:path.join(__dirname,'summary-recovery-visible.png')});
 await page.reload({waitUntil:'domcontentloaded'});await verify();
 assert.deepEqual(errors,[]);
 assert.equal(requests.filter(u=>u.includes('/resources')||u.includes('/catalog')||u.includes('admin-summary-selection.js')).length,0);
 assert.ok(responses.length>10);assert.ok(responses.every(r=>r.status===200||r.status===304));
 const result={scope:'Chromium real, sesión aislada simulada; no usa owner real',iframe:await page.locator('#summary-editor-frame').getAttribute('src'),f5:true,visible:true,toolbar:true,canvas:true,inspector:true,wordChooser:true,errors,responses};
 fs.writeFileSync(path.join(__dirname,'summary-recovery-network.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify({...result,responses:responses.length}));
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
