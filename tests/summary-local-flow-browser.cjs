// Local fixtures only: real canvas/render functions, no backend or Supabase.
const express=require('express'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const app=express();app.use(express.static(path.resolve(__dirname,'..')));
const server=app.listen(0,'127.0.0.1',async()=>{let browser;try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1800,height:1100}}),errors=[],remoteWrites=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>{const r=route.request();if(!['GET','HEAD'].includes(r.method())){remoteWrites.push(r.url());return route.abort();}return route.continue();});
 await page.goto(`http://127.0.0.1:${server.address().port}/admin-summary-editor/versions/2026-10-19/index.html`);
 await page.waitForFunction(()=>window.LNEInteractions&&window.LNECanvas);await page.evaluate(()=>document.fonts.ready);
 const settle=()=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 const fixture=async(mode='absolute',image=false)=>{
  await page.evaluate(({mode,image})=>{
   const make=(id,x,y)=>{const b=LNEComponents.createBlock('parrafo',id+' Texto de prueba.');b.id=id;b.propiedades={layout:mode==='absolute'?{mode,x,y,width:280}:{mode,width:280}};return b;};
   const a=image?LNEComponents.createBlock('imagen','data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80"><rect width="240" height="80" fill="navy"/></svg>')):make('a',100,440);
   a.id='a';if(image)a.propiedades.layout={mode:'flow',width:240,height:80,wrapMode:'inline'};
   const blocks=[a,make('b',100,510),make('c',100,580),make('other',750,520)];
   LNEState.setDocumentData({metadata:{titulo:'Temporal local; no guardar en servidor'},bloques:blocks});document.getElementById('sheet-zoom-actual').click();
  },{mode,image});await settle();
 };
 const geometry=()=>page.evaluate(()=>Object.fromEntries(['a','b','c','other'].map(id=>{const el=document.getElementById('block-'+id),r=el.getBoundingClientRect();return[id,{x:r.x,y:r.y,bottom:r.bottom}];})));
 const drag=async(id,dx,dy)=>{
  await page.evaluate(id=>LNEState.selectBlock(id),id);await settle();
  const el=page.locator('#block-'+id),zone=el.locator('.object-move-top');
  const hasZone=await zone.count(),r=await (hasZone?zone:el.locator('img')).boundingBox(),grabY=hasZone?Math.min(2,r.height/2):r.height/2;
  await page.mouse.move(r.x+r.width/2,r.y+grabY);await page.mouse.down();
  await page.mouse.move(r.x+r.width/2+dx,r.y+grabY+dy,{steps:12});await page.mouse.up();await settle();
 };
 const passed=[];
 // Short, tall and shrinking sheets, shared output and untouched source.
 const fit=await page.evaluate(async()=>{
  const b=LNEComponents.createBlock('parrafo','Último contenido real');b.propiedades={layout:{mode:'absolute',x:100,y:900,width:280}};
  LNEState.setDocumentData({metadata:{titulo:'Altura temporal'},bloques:[b]});document.getElementById('sheet-zoom-actual').click();
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  const sheet=document.getElementById('document-sheet'),height=sheet.offsetHeight,el=document.getElementById('block-'+b.id),tail=height-(el.offsetTop+el.offsetHeight);
  const before=JSON.stringify(LNEState.state.bloques),web=LNECanvas.renderDocument(LNEState.state);document.body.append(web);
  const footer=sheet.querySelector('footer'),output={height,tail,footerTop:footer.offsetTop,lastBottom:el.offsetTop+el.offsetHeight,webHeight:web.offsetHeight,sourceUnchanged:before===JSON.stringify(LNEState.state.bloques)};web.remove();
  LNEState.setDocumentData({metadata:{titulo:'Corto'},bloques:[LNEComponents.createBlock('parrafo','Breve')]});return output;
 });await settle();assert.ok(fit.tail>=36&&fit.tail<160,JSON.stringify(fit));assert.ok(fit.footerTop>=fit.lastBottom);assert.ok(fit.height<1150);assert.ok(Math.abs(fit.height-fit.webHeight)<=1);assert.ok(fit.sourceUnchanged);
 assert.ok(await page.locator('#document-sheet').evaluate(el=>el.offsetHeight)<700);passed.push('1–2: no 1150px floor; tall/short editor and readonly output shrink, content unchanged');
 const padding=await page.evaluate(()=>{
  const b=LNEComponents.createBlock('importante');b.propiedades.texto='<p>- Guion con aire</p><ul><li>Viñeta</li></ul><p><i class="icon-bullet">§</i> Ícono con texto</p>';
  LNEState.setDocumentData({metadata:{titulo:'Padding'},bloques:[b]});
  const sheet=document.getElementById('document-sheet'),read=root=>{const p=root.querySelector('.lne-comp-body > p'),ul=root.querySelector('.lne-comp-body ul'),icon=root.querySelector('.icon-bullet');return{p:getComputedStyle(p).paddingLeft,list:getComputedStyle(ul).paddingLeft,icon:getComputedStyle(icon).left};};
  const editor=read(sheet),web=LNECanvas.renderDocument(LNEState.state);document.body.append(web);const output=read(web);web.remove();return{editor,output};
 });assert.equal(padding.editor.p,'6px');assert.equal(padding.editor.list,'32px');assert.equal(padding.editor.icon,'6px');assert.deepEqual(padding.editor,padding.output);passed.push('3–4: framed paragraphs, bullets and icon gutter match readonly output');
 await fixture();let before=await geometry();await drag('a',0,35);let after=await geometry();
 for(const id of ['a','b','c'])assert.ok(Math.abs(after[id].y-before[id].y-35)<1,id);assert.equal(after.other.y,before.other.y);assert.ok(after.a.bottom<after.b.y);passed.push('5: local absolute followers, other column untouched');
 before=after;await drag('a',0,-20);after=await geometry();for(const id of ['a','b','c'])assert.ok(Math.abs(after[id].y-before[id].y+20)<1,id);passed.push('6: inverse local reflow');
 const saved=await page.evaluate(()=>JSON.stringify(LNEState.state.bloques));await page.evaluate(()=>LNEState.undo());await settle();let undone=await geometry();assert.ok(Math.abs(undone.b.y-after.b.y-20)<1);await page.evaluate(()=>LNEState.redo());await settle();assert.equal(await page.evaluate(()=>JSON.stringify(LNEState.state.bloques)),saved);passed.push('one undo/redo includes all followers');
 await fixture();await page.evaluate(()=>LNEState.setBlockLocked('b',true));await settle();before=await geometry();await drag('a',0,100);after=await geometry();assert.equal(after.b.y,before.b.y);assert.ok(after.a.bottom<after.b.y);passed.push('locked neighbor stays fixed and limits local downward movement');
 await fixture('flow');before=await geometry();await drag('a',0,30);after=await geometry();assert.ok(after.b.y-before.b.y>25);before=after;await drag('a',0,-20);after=await geometry();assert.ok(after.b.y-before.b.y< -15);passed.push('text in native flow reclaims downward offset on upward drag');
 await fixture('flow',true);await page.locator('#block-a img').evaluate(img=>img.decode());before=await geometry();await drag('a',0,35);after=await geometry();assert.ok(after.b.y-before.b.y>30,JSON.stringify({before,after,layout:await page.evaluate(()=>LNEState.getBlockById('a').propiedades.layout)}));before=after;await drag('a',0,-20);after=await geometry();assert.ok(after.b.y-before.b.y< -15);passed.push('7: inline image and downstream text move down/up in native flow');
 await fixture();await page.evaluate(()=>LNEState.selectBlock('a'));await settle();
 const r=await page.locator('#block-a .object-move-top').boundingBox();await page.mouse.move(r.x+r.width/2,r.y+2);await page.mouse.down();
 const samples=[];for(const dx of [-48,-49,-50,-51,-52,-51,-50,-49]){await page.mouse.move(r.x+r.width/2+dx,r.y+2);samples.push(await page.locator('#block-a').evaluate(el=>parseFloat(el.style.left)));}
 await page.mouse.up();for(let i=1;i<samples.length;i++)assert.ok(Math.abs(samples[i]-samples[i-1])<1.5,JSON.stringify(samples));passed.push('8: fine left drag across acquisition/release has no jumps');
 // Top alignment acquisition/release is similarly continuous.
 await fixture();await page.evaluate(()=>LNEState.selectBlock('a'));await settle();
 const top=await page.locator('#block-a .object-move-top').boundingBox();await page.mouse.move(top.x+top.width/2,top.y+2);await page.mouse.down();const vertical=[];
 for(const dy of [68,69,70,71,72,71,70,69]){await page.mouse.move(top.x+top.width/2,top.y+2+dy);vertical.push(await page.locator('#block-a').evaluate(el=>parseFloat(el.style.top)));}
 await page.mouse.up();for(let i=1;i<vertical.length;i++)assert.ok(Math.abs(vertical[i]-vertical[i-1])<1.5,JSON.stringify(vertical));passed.push('fine top alignment is continuous too');
 await page.locator('#document-viewport').focus();before=await geometry();await page.keyboard.press('ArrowRight');await settle();after=await geometry();assert.ok(Math.abs(after.a.x-before.a.x-1)<.1);await page.keyboard.press('Shift+ArrowRight');await settle();let shifted=await geometry();assert.ok(Math.abs(shifted.a.x-after.a.x-10)<.1);passed.push('9: arrows 1px / Shift 10px remain free');
 const readonly=await page.evaluate(()=>{const before=JSON.stringify(LNEState.state.bloques),out=LNECanvas.renderDocument(LNEState.state);document.body.append(out);const result={count:out.querySelectorAll('.lne-document-content > [data-block-id]').length,sourceUnchanged:before===JSON.stringify(LNEState.state.bloques),tools:out.querySelectorAll('.object-move-zone,.lne-selection-outline').length};out.remove();return result;});assert.ok(readonly.sourceUnchanged);assert.equal(readonly.tools,0);passed.push('10: publication renderer simulated without writes; no editing overlays');
 assert.deepEqual(errors,[]);assert.deepEqual(remoteWrites,[]);console.log(JSON.stringify({passed,fit,padding,samples,errors,remoteWrites},null,2));
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
