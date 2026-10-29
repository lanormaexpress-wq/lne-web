// Local synthetic document only. Never load .env, server.js or editorial APIs.
const express=require('express'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const app=express();app.use(express.static(path.resolve(__dirname,'..')));
const server=app.listen(0,'127.0.0.1',async()=>{let browser;try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1800,height:1150}}),errors=[],writes=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>{if(!['GET','HEAD'].includes(r.request().method())){writes.push(r.request().url());return r.abort();}return r.continue();});
 await page.goto(`http://127.0.0.1:${server.address().port}/admin-summary-editor/versions/2026-10-19/index.html`);
 await page.waitForFunction(()=>window.LNEInteractions);await page.evaluate(()=>document.fonts.ready);
 const settle=()=>page.evaluate(async()=>{await Promise.all([...document.querySelectorAll('#document-sheet img')].map(i=>i.decode().catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
 await page.evaluate(()=>{
  const p=text=>LNEComponents.createBlock('parrafo',text),image=LNEComponents.createBlock('imagen','data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="600"><rect width="300" height="600" fill="#335577"/></svg>'));
  image.propiedades.alineacion='align-right';image.propiedades.layout={mode:'flow',wrapMode:'inline',wrapSide:'right',width:300,height:600};
  const blocks=[p('Párrafo A. '.repeat(12)),image,p('Párrafo B largo. '.repeat(28)),p('Párrafo C. '.repeat(220)),LNEComponents.createBlock('titulo',2,'Subtítulo')];
  blocks.forEach((b,i)=>b.id=['a','image','b','c','subtitle'][i]);LNEState.setDocumentData({metadata:{titulo:'Prueba local wrap'},bloques:blocks});document.getElementById('sheet-zoom-actual').click();
 });await settle();
 const geometry=()=>page.evaluate(()=>{
  const s=document.querySelector('#document-sheet').getBoundingClientRect(),scale=s.width/document.querySelector('#document-sheet').offsetWidth;
  const rect=r=>({x:(r.x-s.x)/scale,y:(r.y-s.y)/scale,right:(r.right-s.x)/scale,bottom:(r.bottom-s.y)/scale,width:r.width/scale,height:r.height/scale});
  const result={};for(const id of ['a','image','b','c','subtitle']){const el=document.querySelector('#block-'+id);result[id]={...rect(el.getBoundingClientRect()),float:getComputedStyle(el).float,clear:getComputedStyle(el).clear,mode:getComputedStyle(el).position};}
  result.image.visual=rect(document.querySelector('#block-image img').getBoundingClientRect());
  for(const id of ['b','c']){const el=document.querySelector('#block-'+id+' [data-field="texto"]'),walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);result[id].glyphs=[];while(walk.nextNode()){const node=walk.currentNode;for(let i=0;i<node.length;i++){if(!node.textContent[i].trim())continue;const range=document.createRange();range.setStart(node,i);range.setEnd(node,i+1);result[id].glyphs.push(rect(range.getBoundingClientRect()));}}}
  return result;
 });
 const checkWrap=async()=>{const g=await geometry(),im=g.image.visual;assert.ok(g.b.y<im.bottom-50,'B must start alongside image');assert.ok(g.c.y<im.bottom,'C must continue alongside image');let side=0,below=0;
  for(const id of ['b','c'])for(const r of g[id].glyphs){if(r.bottom>im.y&&r.y<im.bottom){assert.ok(r.right<=im.x-14,`Text overlaps image: ${JSON.stringify({r,im})}`);side++;}else if(r.y>=im.bottom&&r.right>im.x+30)below++;}
  assert.ok(side>100);assert.ok(below>0,'Text must regain full width below float');assert.ok(g.c.y>=g.b.bottom-1,'Consecutive paragraphs must not overlap');assert.ok(g.subtitle.y>=Math.max(g.c.bottom,g.image.bottom)-1);assert.equal(g.b.mode,'relative');return g;};
 let g=await geometry();console.log('inline',JSON.stringify({image:g.image,b:g.b.y}));assert.equal(g.image.float,'none','Explicit inline must override right alignment');assert.ok(g.b.y>=g.image.bottom-1,'Inline reserves image height');
 await page.evaluate(()=>LNECanvas.changeImageWrap('image','square'));await settle();g=await checkWrap();
 // Positive flow displacement must not disable native float exclusion.
 await page.evaluate(()=>LNEState.updateBlockLayout('b',{mode:'flow',offsetY:45},'synthetic-spacing'));await settle();const spaced=await geometry();
 console.log('wrap with displacement',JSON.stringify({b:spaced.b.y,image:spaced.image,clear:spaced.b.clear}));assert.ok(spaced.b.y<spaced.image.visual.bottom-50,'Flow offset must not clear float');
 async function move(dy){await page.evaluate(()=>LNEState.selectBlock('b'));await settle();const h=page.locator('#block-b > .object-move-top');await h.scrollIntoViewIfNeeded();const r=await h.boundingBox();await page.mouse.move(r.x+r.width*.25,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width*.25,r.y+r.height/2+dy,{steps:10});await page.mouse.up();await settle();}
 await move(-45);g=await checkWrap();assert.ok(g.b.y<spaced.b.y-40,'Upward drag reclaims lateral space');assert.equal(await page.evaluate(()=>LNEState.getBlockById('b').propiedades.layout.offsetY),0);
 async function resize(dx){await page.evaluate(()=>LNEState.selectBlock('image'));await settle();const h=page.locator('#block-image > .handle-w');await h.evaluate(el=>el.scrollIntoView({block:'center'}));const r=await h.boundingBox();await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width/2+dx,r.y+r.height/2,{steps:10});await page.mouse.up();await settle();}
 const original=g;await resize(45);g=await checkWrap();assert.ok(g.image.visual.height<original.image.visual.height-80);assert.ok(Math.abs(g.image.right-original.image.right)<1);assert.ok(g.subtitle.y<=original.subtitle.y+1);const smaller=g;
 await resize(-65);g=await checkWrap();assert.ok(g.image.visual.height>smaller.image.visual.height+100);assert.ok(Math.abs(g.image.right-smaller.image.right)<1);assert.ok(g.subtitle.y>=smaller.subtitle.y);assert.ok(g.b.height>=smaller.b.height);
 await move(30);g=await checkWrap();await move(-30);await checkWrap();
 await page.waitForTimeout(800);const source=await page.evaluate(()=>JSON.stringify(LNEState.state.bloques));await page.reload();await page.waitForFunction(()=>window.LNEState?.state.bloques.length===5);await settle();assert.equal(await page.evaluate(()=>JSON.stringify(LNEState.state.bloques)),source);await checkWrap();
 await page.locator('#btn-vista-web').click();await page.locator('#web-preview-modal.open').waitFor();const web=await page.locator('#web-preview-content .lne-rendered-sheet').evaluate(s=>{const im=s.querySelector('[data-block-id="image"]'),b=s.querySelector('[data-block-id="b"]');return{float:getComputedStyle(im).float,imageBottom:im.getBoundingClientRect().bottom,bTop:b.getBoundingClientRect().top,clear:getComputedStyle(b).clear};});assert.equal(web.float,'right');assert.ok(web.bTop<web.imageBottom-50);assert.equal(web.clear,'none');
 assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);console.log(JSON.stringify({passed:['explicit inline reserves height','native right wrap across B/C','upward drag reclaims space','shrink/grow exclusion + flow reflow','no glyph overlap','F5 exact source','shared Web render'],errors,writes}));
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
