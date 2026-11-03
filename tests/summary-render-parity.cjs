// Geometry only, synthetic state, local provider. No editorial APIs or Supabase.
const express=require('express'),path=require('node:path'),fs=require('node:fs'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {renderPublicSummary}=require('../lib/summary-public-view');
const root=path.resolve(__dirname,'..'),out=process.env.LNE_PARITY_OUTPUT||require('node:os').tmpdir(),app=express();let snapshot='';
app.get('/summary-public.css',(req,res)=>{let css=fs.readFileSync(path.join(root,'summary-public.css'),'utf8');if(req.query.fallback)css=css.replace(/@supports[\s\S]*$/,'');res.type('css').send(css);});
app.get('/publication',(req,res)=>res.type('html').send(renderPublicSummary(snapshot).replace('/summary-public.css?v=',req.query.fallback?'/summary-public.css?fallback=1&v=':'/summary-public.css?v=')));
app.use(express.static(root));
(async()=>{const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:1400,height:1100}});
 // The same local/system font resolution in all three views; do not wait on a CDN.
 await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:')||r.request().url().startsWith('data:')?r.continue():r.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/admin-summary-editor/versions/2026-10-19/index.html`);await page.waitForFunction(()=>window.LNEInteractions&&window.LNERenderer);await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>{
  const C=LNEComponents,p=t=>C.createBlock('parrafo',t.repeat(35)),im=(side,w,h)=>{const b=C.createBlock('imagen','data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#355777"/></svg>`));b.propiedades.alineacion='align-'+side;b.propiedades.layout={mode:'flow',wrapMode:'square',wrapSide:side,width:w,height:h};return b;};
  const blocks=[C.createBlock('titulo',2,'ASIRIOS: DOCUMENTACIÓN Y CONTRATOS'),im('left',240,280),p('Texto a la derecha de la imagen. '),C.createBlock('titulo',2,'BABILONIA'),im('right',190,200),p('Texto a la izquierda. '),C.createBlock('ejemplo'),C.createBlock('tabla'),C.createBlock('lista','vinetas',['Uno','Dos']),C.createBlock('columnas'),C.createBlock('comparacion'),p('Cierre. ')];
  blocks.forEach((b,i)=>{b.id='fixture-'+i;b.propiedades||={};});blocks[2].propiedades.spacingBefore=13;blocks[2].propiedades.spacingAfter=21;
  // Same layout shapes as the reported case, with synthetic content and images.
  blocks[1].propiedades.layout={mode:'absolute',x:91,y:2400,width:372,height:271,wrapMode:'front',zIndex:20};
  blocks[2].propiedades.layout={mode:'flow',width:578,offsetX:496.74241317620795,offsetY:0,flowOffsetY:0};
  blocks[2].propiedades.estilo={fontSize:'17px',fontFamily:'Merriweather, Georgia, serif'};
  blocks[5].propiedades.layout={mode:'flow',width:609,offsetX:0};
  blocks[6].propiedades.texto='<p><strong>Ejemplo jurídico</strong> con texto.</p>';blocks[7].propiedades={headers:['Concepto','Definición'],rows:[['A','Contenido'],['B','Más contenido']]};
  LNEState.setDocumentData({metadata:{titulo:'PARIDAD LOCAL',curso:'Curso local',temaNumero:'1'},bloques:blocks});document.getElementById('sheet-zoom-actual').click();
 });
 const settle=async target=>target.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});await settle(page);
 const measure=(target,selector)=>target.evaluate(sel=>{const s=document.querySelector(sel),r=s.getBoundingClientRect(),scale=r.width/s.offsetWidth;const rect=e=>{const b=e.getBoundingClientRect();return{x:(b.x-r.x)/scale,y:(b.y-r.y)/scale,w:b.width/scale,h:b.height/scale};};return{sheet:{width:s.offsetWidth,padding:getComputedStyle(s).padding},blocks:[...s.querySelectorAll('main > [data-block-id]')].map(b=>({id:b.dataset.blockId,...rect(b),font:getComputedStyle(b).font,fontInner:getComputedStyle(b.firstElementChild).font,image:b.querySelector('img')?rect(b.querySelector('img')):null})),header:rect(s.querySelector('header')),footer:rect(s.querySelector('footer'))};},selector);
 await page.waitForTimeout(900);const editor=await measure(page,'#document-sheet'),stateBefore=await page.evaluate(()=>JSON.stringify(LNEState.state));
 await page.locator('#btn-vista-web').click();await page.locator('#web-preview-modal.open').waitFor();await settle(page);const web=await measure(page,'#web-preview-content .lne-rendered-sheet');
 snapshot=await page.evaluate(()=>LNERenderer.compileToDocument(LNEState.state));assert.equal(await page.evaluate(()=>JSON.stringify(LNEState.state)),stateBefore);
 const pub=await context.newPage();await pub.setViewportSize({width:1800,height:1100});await pub.goto(`http://127.0.0.1:${server.address().port}/publication`);await settle(pub);const publicView=await measure(pub,'.lne-rendered-sheet');
 const differences=(a,b)=>a.blocks.map((v,i)=>({id:v.id,delta:Object.fromEntries(['x','y','w','h'].map(k=>[k,b.blocks[i][k]-v[k]])),image:v.image?Object.fromEntries(['x','y','w','h'].map(k=>[k,b.blocks[i].image[k]-v.image[k]])):null}));
 const responsive=[];
 for(const width of [768,390])for(const fallback of [false,true]){
  console.log('Checking viewport',width,'fallback CSS',fallback);await pub.setViewportSize({width,height:1000});await pub.goto(`http://127.0.0.1:${server.address().port}/publication${fallback?'?fallback=1':''}`,{waitUntil:'domcontentloaded',timeout:10000});const frame=pub;await settle(frame);
  // Same sizing contract used by the unchanged parent frame fallback; this
  // assertion isolates the serialized document's geometry from the host UI.
  if(fallback)await frame.evaluate(()=>{const root=document.querySelector('.lne-public-summary-canvas'),s=root.querySelector('.lne-rendered-sheet'),scale=Math.min(1,document.documentElement.clientWidth/s.offsetWidth);root.style.setProperty('--lne-public-scale',scale);root.style.setProperty('--lne-public-height',s.offsetHeight*scale+'px');});
  const view=await measure(frame,'.lne-rendered-sheet');responsive.push({width,fallback,differences:differences(editor,view)});
  assert.ok(await frame.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),'no horizontal overflow');
 }
 const result={editor,web,publicView,responsive,webDifferences:differences(editor,web),publicDifferences:differences(editor,publicView),errors};fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'geometry.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({web:result.webDifferences,public:result.publicDifferences,responsiveMax:responsive.map(v=>({width:v.width,fallback:v.fallback,max:Math.max(...v.differences.flatMap(b=>[...Object.values(b.delta),...Object.values(b.image||{})]).map(Math.abs))})),errors}));
 if(!process.env.LNE_PARITY_DIAGNOSTIC){for(const view of [web,publicView]){assert.deepEqual(view.blocks.map(b=>b.id),editor.blocks.map(b=>b.id));for(const b of differences(editor,view))for(const n of [...Object.values(b.delta),...Object.values(b.image||{})])assert.ok(Math.abs(n)<1.1,JSON.stringify(b));for(const part of ['header','footer'])for(const key of ['x','y','w','h'])assert.ok(Math.abs(view[part][key]-editor[part][key])<1.1,part+' '+key);}assert.deepEqual(errors,[]);}
 if(!process.env.LNE_PARITY_DIAGNOSTIC)for(const v of responsive)for(const b of v.differences)for(const n of [...Object.values(b.delta),...Object.values(b.image||{})])assert.ok(Math.abs(n)<1.1,JSON.stringify({width:v.width,fallback:v.fallback,b}));
}catch(error){console.error('Parity failure:',error.message);throw error;}finally{await browser?.close();server.close();server.closeAllConnections();}})().catch(e=>{console.error(e);process.exitCode=1});
