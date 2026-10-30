// Existing published HTML, local read-only rendering only. No Auth or DB calls.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),cp=require('node:child_process'),express=require('express');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),fixture=process.argv[2]||path.resolve(root,'../LNE-backups/pre-public-summary-spelling-20261030/public-fixture.json');
const source=JSON.parse(fs.readFileSync(fixture,'utf8')).preview_html,hash=s=>crypto.createHash('sha256').update(s).digest('hex'),originalHash=hash(source);
const beforeCSS=cp.execFileSync('git',['show','bc71c1f:summary-public.css'],{cwd:root,encoding:'utf8'}),afterCSS=fs.readFileSync(path.join(root,'summary-public.css'),'utf8');
(async()=>{
 const app=express();let base;const out=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'lne-sharpness-'));
 app.get('/styles/:variant.css',(req,res)=>res.type('css').send(req.params.variant==='before'?beforeCSS:req.params.variant==='fallback'?afterCSS.replace(/@supports[\s\S]*$/,''):afterCSS));
 app.get('/fixture/:variant',(req,res)=>res.send(`<!doctype html><html><head><link rel="stylesheet" href="/styles/${req.params.variant}.css"></head><body style="margin:0"><div class="lne-summary-viewport"><iframe class="lne-summary-public-frame lne-summary-canvas-frame" sandbox="${req.params.variant==='before'?'':'allow-same-origin'}" src="/inner/${req.params.variant}"></iframe></div>${req.params.variant==='before'?'':'<script src="/summary-public-frame.js"></script>'}</body></html>`));
 app.get('/inner/:variant',(req,res)=>res.type('html').send(require('../lib/summary-public-view').renderPublicSummary(source.replaceAll('https://lanormaexpress.dpdns.org',base)).replace(/\/summary-public.css\?[^"<]+/,`/styles/${req.params.variant}.css`)));
 // Same saved HTML and versioned CSS produced by the existing editor renderer;
 // no editor app, contenteditable fields, integration script or autosave loaded.
 app.get('/editor-render',(_req,res)=>res.type('html').send(source.replaceAll('https://lanormaexpress.dpdns.org',base)));
 app.use('/admin/resumenes/assets/2026-10-19',express.static(path.join(root,'admin-summary-editor/versions/2026-10-19')));app.use(express.static(root));
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));base=`http://127.0.0.1:${server.address().port}`;
 let browser;try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});const page=await browser.newPage({viewport:{width:1200,height:1000}}),errors=[],writes=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>!['GET','HEAD'].includes(r.request().method())?(writes.push(r.request().url()),r.abort()):r.continue());
 const ready=async(f)=>{const until=Date.now()+30000;while(!await f.evaluate(()=>{const r=document.querySelector('.lne-public-summary-canvas');return document.fonts.status==='loaded'&&[...document.images].every(i=>i.complete)&&(!location.pathname.endsWith('/fallback')||!!r?.style.getPropertyValue('--lne-public-height'));})){if(Date.now()>until)throw Error('Asset timeout');await new Promise(r=>setTimeout(r,100));}};
 const measure=f=>f.evaluate(()=>{const s=document.querySelector('.lne-rendered-sheet'),sr=s.getBoundingClientRect(),scale=sr.width/s.offsetWidth;return{viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,scale,blocks:[...s.querySelectorAll('main > [data-block-id]')].map(b=>{const r=b.getBoundingClientRect();return{id:b.dataset.blockId,top:(r.top-sr.top)/scale,left:(r.left-sr.left)/scale,width:r.width/scale,height:r.height/scale,text:b.textContent};}),explicit:[...s.querySelectorAll('[style*="font-family"],[style*="font-size"],strong,em')].map(e=>{const c=getComputedStyle(e);return{font:c.fontFamily,size:c.fontSize,weight:c.fontWeight,color:c.color,leading:c.lineHeight,style:c.fontStyle};}),images:[...s.querySelectorAll('img')].map(i=>({complete:i.complete&&i.naturalWidth>0,naturalWidth:i.naturalWidth,width:i.getBoundingClientRect().width,right:i.getBoundingClientRect().right})),editable:s.querySelectorAll('[contenteditable="true"]').length};});
 await page.goto(base+'/editor-render');await ready(page);const editor=await measure(page);await page.screenshot({path:path.join(out,'editor-render-readonly.png')});
 const results=[];for(const width of [1104,768,390,1360]){
   await page.setViewportSize({width,height:1000});let before;
   for(const variant of ['before','after','fallback']){
     await page.goto(base+'/fixture/'+variant);const f=page.frames().find(f=>f.url().includes('/inner/'));await ready(f);
     const m=await measure(f),outer=await page.locator('iframe').evaluate(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,ratio:e.getBoundingClientRect().width/e.offsetWidth,transform:getComputedStyle(e).transform,scroll:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
     if(variant==='before')before={m,outer};
     assert.equal(m.editable,0);assert.ok(outer.scroll<=outer.viewport+1);assert.ok(m.scroll<=m.viewport+1);assert.ok(m.images.every(i=>i.complete&&i.right<=m.viewport+1));
     assert.deepEqual(m.explicit,before.m.explicit);assert.deepEqual(m.explicit,editor.explicit);
     for(let i=0;i<m.blocks.length;i++){const a=m.blocks[i],b=before.m.blocks[i];assert.equal(a.id,b.id);assert.equal(a.text,b.text);for(const key of ['top','left','width','height'])assert.ok(Math.abs(a[key]-b[key])<0.2,`${width}/${variant}/${a.id}/${key}`);}
     assert.ok(Math.abs(outer.height-before.outer.height)<1);assert.ok(Math.abs(m.height*outer.ratio-before.m.height*before.outer.ratio)<2,'Scrollable extent changed');
     if(variant!=='before'){
       assert.equal(outer.transform,'none');
       assert.equal(await page.locator('iframe').evaluate(e=>e.sandbox.contains('allow-scripts')),false);
       if(width===1104){await page.screenshot({path:path.join(out,'after.png')});const initial=await measure(f);await page.reload();const refreshed=page.frames().find(f=>f.url().includes('/inner/'));await ready(refreshed);assert.deepEqual(await measure(refreshed),initial);}
     }
     if(width===1104&&variant==='before')await page.screenshot({path:path.join(out,'before.png')});
     results.push({width,variant,blocks:m.blocks.length,physicalHeight:Math.round(m.height*outer.ratio),horizontalOverflow:false,iframeTransform:outer.transform});
   }
   console.log('PASS: geometry, typography, images and scrolling at',width);
 }
 assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);assert.equal(hash(JSON.parse(fs.readFileSync(fixture,'utf8')).preview_html),originalHash);
 console.log(JSON.stringify({results,F5:true,editorFormattingIdentical:true,fixtureUnchanged:originalHash,errors,writes,artifacts:out},null,2));
 }finally{await browser?.close();server.close();server.closeAllConnections();}
})().catch(e=>{console.error(e);process.exitCode=1;});
