// Navegador Chromium real, perfil aislado y autenticación simulada: no accede a cuentas.
const express = require('express'), fs = require('fs'), path = require('path');
const { chromium } = require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
let checks = 0;
const app = express();
app.get('/admin-summary-storage-scope.js',(_req,res)=>res.sendFile(path.resolve(__dirname,'../admin-summary-storage-scope.js')));
app.use('/admin/resumenes', require('../lib/summary-editor')((req,_res,next)=>{ checks++; req.adminUser={id:'performance-owner',app_metadata:{role:'owner'}}; next(); }));
const server = app.listen(0,'127.0.0.1',async()=>{
 let browser;
 try {
  browser=await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const context=await browser.newContext(),page=await context.newPage(),base=`http://127.0.0.1:${server.address().port}`;
  await context.request.post(base+'/admin/resumenes/session',{headers:{Authorization:'Bearer isolated-test'}});
  const results=[];
  for(let run=0;run<2;run++){
   checks=0;const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const start=Date.now();
   await page.goto(base+'/admin/resumenes/'+(process.argv[2]==='before'?'assets/':'assets/2026-10-19/')+'index.html',{waitUntil:'domcontentloaded'});
   await page.locator('#document-sheet').waitFor();
   const visible=Date.now()-start;
   await page.waitForFunction(()=>window.LNECanvas&&window.LNEToolbar&&window.LNEState);
   await page.locator('#document-sheet').click();
   const interactive=Date.now()-start;
   results.push(await page.evaluate(({visible,interactive,checks,errors})=>{
    const r=performance.getEntriesByType('resource'),counts={};r.forEach(x=>counts[x.name]=(counts[x.name]||0)+1);
    return {visibleMs:visible,interactiveMs:interactive,requests:r.length,transferredBytes:r.reduce((s,x)=>s+x.transferSize,0),duplicateUrls:Object.entries(counts).filter(([,n])=>n>1),serverAuthChecks:checks,errors};
   },{visible,interactive,checks,errors}));
  }
  const out={scope:'Chromium real, editor aislado; autenticación simulada sin latencia; no mide clic con cuenta real',results};
  fs.writeFileSync(path.join(__dirname,`summary-performance-${process.argv[2]}.json`),JSON.stringify(out,null,2));
  console.log(JSON.stringify(out));
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}
});
