'use strict';
// Same public fixtures and network delays for the old and corrected renderer.
// No remote requests, credentials, provider changes or production writes.
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const Module = require('node:module'), { execFileSync } = require('node:child_process');
const express = require('express');
const { chromium } = require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const baseline = process.env.LNE_RENDER_BASELINE || 'babb08f';
const original = name => execFileSync('git', ['show', `${baseline}:${name}`], { cwd: root, encoding: 'utf8', windowsHide: true });
const originalSeo = new Module(path.join(root, 'lib/initial-render-baseline.cjs'), module);
originalSeo.filename = path.join(root, 'lib/initial-render-baseline.cjs');
originalSeo.paths = Module._nodeModulePaths(path.join(root, 'lib'));
originalSeo._compile(original('lib/public-seo.js'), originalSeo.filename);
const norms = ['civil', 'penal'].map(id => {
 const norm = require('../normas').find(n => n.id === id);
 return { codigo:id, slug:norm.slug, nombre:norm.menuLabel, introduccion:norm.introduction, estado:'publicado' };
});
const articles = norms.flatMap(norm => Array.from({length:8}, (_, index) => ({id:`${norm.codigo}-${index}`,codigo:norm.codigo,numero_articulo:String(index+1),titulo:`Regla ${index+1}`,contenido:`<p>Texto jurídico público del artículo ${index+1}. La ley se deroga sólo por otra ley.</p>`,contenido_lne:{tipo:'Artículo'},estructura:{seccion_indice:0,seccion:{titulo:'TÍTULO PRELIMINAR',capitulo:'',nuevaHoja:false}},orden:index+1,estado:'publicado'})));
async function provider(url, options = {}) {
 const u = new URL(url), q=u.searchParams;
 assert(!options.method || options.method==='GET' || (options.method==='POST' && u.pathname.endsWith('/rpc/ordered_summary_publications')));
 await new Promise(resolve=>setTimeout(resolve,20));
 if(u.pathname.endsWith('/rpc/ordered_summary_publications'))return Response.json([]);
 let rows = u.pathname.endsWith('/normas_legales') ? norms : u.pathname.endsWith('/articulos_legales') ? articles : [];
 for(const key of ['codigo','numero_articulo','estado'])if(q.has(key))rows=rows.filter(row=>String(row[key])===q.get(key).replace(/^eq\./,''));
 const total=rows.length; rows=rows.slice(Number(q.get('offset')||0),Number(q.get('offset')||0)+Number(q.get('limit')||1000));
 return Response.json(rows,{headers:{'content-range':`0-${rows.length-1}/${total}`}});
}
function fixture(before) {
 const app=express();
 if(process.env.LNE_RENDER_DEBUG==='1')app.use((req,res,next)=>{console.log(before?'OLD':'NEW',req.url);res.on('finish',()=>console.log('HTTP',res.statusCode,req.url));next();});
 app.get('/api/public/legislation',async(_req,res)=>{await new Promise(r=>setTimeout(r,180));res.json({normas:norms.map(n=>({...n,total_articulos:8}))});});
 app.get('/api/public/legislation/:slug/articles',async(req,res)=>{await new Promise(r=>setTimeout(r,150));res.json({articulos:articles.filter(a=>a.codigo===norms.find(n=>n.slug===req.params.slug)?.codigo)});});
 app.get('/api/formation/summaries',async(_req,res)=>{await new Promise(r=>setTimeout(r,100));res.json({topics:[]});});
 if(before) for(const name of ['router.js','seo.js','formacion-ui.js','dynamic-legislation.js','legislacion.js','home-search.js','legal-introduction-renderer.js','legal-visual-renderer.js']){
  const source=original(name);app.get('/'+name,(_req,res)=>res.type('js').send(source));
 }
 if(before){const source=original('legal-introduction.css');app.get('/legal-introduction.css',(_req,res)=>res.type('css').send(source));}
 const {createPublicSeo}=before?originalSeo.exports:require('../lib/public-seo');
 const seo=createPublicSeo({root,getConfig:()=>({url:'https://provider.invalid',key:'public-fixture'}),fetchImpl:provider,sitemapOptions:{autoStart:false,seedFile:false,cacheFile:false}});
 app.use(seo.router); app.use(express.static(root));
 return app.listen(0,'127.0.0.1');
}
const paths=['/','/legislacion/codigo-civil','/legislacion/codigo-penal','/legislacion/codigo-civil/articulo/1','/formacion/contratos','/formacion','/formacion/derecho-civil-y-privado'];
(async()=>{
 const servers=[fixture(true),fixture(false)],out=process.env.LNE_RENDER_OUTPUT||fs.mkdtempSync(path.join(os.tmpdir(),'lne-initial-render-'));
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const results=[];
 try{
  const selectedPaths=process.env.LNE_RENDER_PATHS?process.env.LNE_RENDER_PATHS.split(','):paths;
  for(const mobile of (process.env.LNE_RENDER_MOBILE_ONLY==='1'?[true]:[false,true]))for(const route of selectedPaths)for(const before of [true,false]){
   const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},isMobile:mobile,hasTouch:mobile,serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),requests=[],errors=[];
   page.setDefaultNavigationTimeout(60000);
   await page.route('https://**',r=>r.abort()); // Deterministic local fonts/images; no provider access.
   await page.route('**/assets/fondo.mp4',r=>r.abort()); // Video bytes/decoding are tested separately.
   page.on('request',r=>requests.push(new URL(r.url()).pathname+new URL(r.url()).search));page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>{
    window.initialRender={replacements:0,spinner:false,cls:0,lcp:0};
    new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)initialRender.cls+=e.value})).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(l=>l.getEntries().forEach(e=>initialRender.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
    new MutationObserver(records=>{for(const r of records){if(r.target.id==='app-content')initialRender.replacements+=Array.from(r.removedNodes).filter(n=>n.nodeType===1).length;}if(document.querySelector('#app-content .fa-circle-notch'))initialRender.spinner=true;}).observe(document,{childList:true,subtree:true});
    document.addEventListener('loadeddata',e=>{if(e.target.tagName==='VIDEO')initialRender.videoMs=performance.now()},true);
   });
   const base=`http://127.0.0.1:${servers[before?0:1].address().port}`;
   await page.goto(base+route,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.LNERouter);
   if(route==='/')await page.waitForFunction(()=>document.querySelectorAll('#legislacion-home-cards .card').length===3);
   if(/^\/legislacion\/[^/]+$/.test(route))await page.waitForSelector('.articulo-contenedor-bloque');
   if(route==='/formacion/contratos')await page.waitForSelector('.formacion-topic-card');
   await page.addStyleTag({content:'*,*::before,*::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }'});
   await page.waitForFunction(()=>Array.from(document.querySelectorAll('#app-content img')).every(image=>image.complete));
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForTimeout(500);
   const result=await page.evaluate(()=>{
    const n=performance.getEntriesByType('navigation')[0];
    const selectors=['.hero','.grid-categorias','.intro-titulo','.intro-parrafo','.intro-content img','.articulo-contenedor-bloque','.formacion-course-heading','.formacion-topic-card','.formacion-area-card'];
    return {...initialRender,ttfb:n.responseStart,fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,domReady:n.domContentLoadedEventEnd,videoState:document.querySelector('video')?.readyState,
     layout:selectors.flatMap(s=>Array.from(document.querySelectorAll(s)).slice(0,3).map(e=>{const r=e.getBoundingClientRect();const c=getComputedStyle(e);return {s,text:e.tagName==='IMG'?e.alt:e.innerText.replace(/\s+/g,' ').trim(),x:r.x,y:r.y,w:r.width,h:r.height,color:c.color,font:c.fontFamily,size:c.fontSize}}))};
   });
   const record={mobile,route,before,...result,requests:requests.filter(r=>r.startsWith('/api/')||r.startsWith('/pages/')),errors};results.push(record);
   assert.deepEqual(errors,[]);
   await page.screenshot({path:path.join(out,`${before?'before':'after'}-${mobile?'mobile':'desktop'}-${route.replace(/\W+/g,'_')}.png`)});
   if(!before){
    assert.equal(result.spinner,false,route);assert.equal(result.replacements,0,route);
    assert.deepEqual(record.requests,[],`No duplicate initial data or fragment requests: ${route}`);
    const old=results.at(-2);assert.equal(result.layout.length,old.layout.length);
    for(let i=0;i<result.layout.length;i++){
     assert.equal(result.layout[i].text,old.layout[i].text,`${route} content`);
     for(const prop of ['x','y','w','h'])assert(Math.abs(result.layout[i][prop]-old.layout[i][prop])<2,`${route} ${result.layout[i].s} ${prop}: ${result.layout[i][prop]} vs ${old.layout[i][prop]}`);
     for(const prop of ['color','font','size'])assert.equal(result.layout[i][prop],old.layout[i][prop]);
    }
    if(route==='/formacion/contratos'){
     const start=requests.length;await page.locator('.formacion-topic-card').first().click();await page.waitForSelector('#formacion-topic-modal.active');
     await page.locator('#formacion-topic-modal-close').click();assert.equal(requests.slice(start).filter(r=>r.includes('/api/')).length,0,'Opening a historical topic reuses initial topics');
    }
    await page.evaluate(()=>LNERouter.navigate('/legislacion/codigo-civil'));await page.waitForSelector('.articulo-contenedor-bloque');
    await page.evaluate(()=>LNERouter.navigate('/formacion/contratos'));await page.waitForSelector('.formacion-topic-card');
    await page.goBack();await page.waitForSelector('.articulo-contenedor-bloque');
   }
   await context.close();console.log('PASS',mobile?'mobile':'desktop',before?'before':'after',route);
  }
  // The corrected presentation is also present without executing JavaScript.
  const context=await browser.newContext({javaScriptEnabled:false,serviceWorkers:'block'});
  const page=await context.newPage();await page.route('https://**',r=>r.abort());
  await page.route('**/assets/fondo.mp4',r=>r.abort());
  for(const route of paths){await page.goto(`http://127.0.0.1:${servers[1].address().port}`+route,{waitUntil:'domcontentloaded'});assert((await page.locator('#app-content').innerText()).trim());if(route==='/')assert.equal(await page.locator('.card').count(),3);if(route.includes('codigo-civil')&&!route.includes('/articulo/'))assert.equal(await page.locator('.articulo-contenedor-bloque').count(),8);}
  await context.close();
  console.log('PASS no-JS content, desktop/mobile cold incognito, zero reconstruction/duplicate startup requests, layout parity, course modal, SPA and history');
 }catch(error){console.error('Comparison failed:',error);throw error;}finally{fs.writeFileSync(path.join(out,'metrics.json'),JSON.stringify(results,null,2));for(const s of servers){s.closeAllConnections();s.close();}await browser.close();console.log('Artifacts:',out);}
})().catch(e=>{console.error(e);process.exitCode=1});
