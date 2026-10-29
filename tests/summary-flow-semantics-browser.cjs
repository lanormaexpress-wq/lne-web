// A–N: actual editor interactions against local fixtures, no editorial API.
const express=require('express'),path=require('path'),assert=require('node:assert/strict'),fs=require('fs');
const {chromium}=require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),app=express(),out=process.env.LNE_VISUAL_OUTPUT||fs.mkdtempSync(path.join(require('os').tmpdir(),'lne-flow-semantics-'));
app.use(express.static(root));
const server=app.listen(0,'127.0.0.1',async()=>{let browser;try{
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1800,height:1150}}),errors=[],writes=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>{if(!['GET','HEAD'].includes(r.request().method())){writes.push(r.request().url());return r.abort();}return r.continue();});
 await page.goto(`http://127.0.0.1:${server.address().port}/admin-summary-editor/versions/2026-10-19/index.html`);
 await page.waitForFunction(()=>window.LNEInteractions&&window.LNEGroups);await page.evaluate(()=>document.fonts.ready);
 const settle=()=>page.evaluate(async()=>{await Promise.all([...document.querySelectorAll('#document-sheet img')].map(i=>i.decode().catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
 await page.evaluate(()=>{
  const C=LNEComponents,blocks=[C.createBlock('titulo',1,'TÍTULO TEMPORAL'),C.createBlock('parrafo','PÁRRAFO A. '.repeat(10)),C.createBlock('lista','vinetas',['Uno','Dos']),C.createBlock('tabla'),C.createBlock('ejemplo'),C.createBlock('imagen','data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250"><rect width="250" height="250" fill="#335577"/></svg>')),C.createBlock('parrafo','PÁRRAFO B'),C.createBlock('titulo',2,'SUBTÍTULO'),C.createBlock('parrafo','PÁRRAFO C')];
  blocks.forEach((b,i)=>b.id=['title','a','list','table','example','image','b','subtitle','c'][i]);
  blocks[3].propiedades={headers:['Celda'],rows:[['<ul><li>Bullet en celda</li></ul>']]};
  blocks[4].propiedades.texto='<p>- Guion editable</p><ul><li>Bullet en cuadro</li></ul>';
  blocks[5].propiedades.layout={mode:'flow',width:250,height:250,wrapMode:'inline'};
  LNEState.setDocumentData({metadata:{titulo:'Ensayo temporal local'},bloques:blocks});document.getElementById('sheet-zoom-actual').click();
 });await page.locator('#block-image img').evaluate(img=>img.decode());await settle();
 const geometry=()=>page.evaluate(()=>{const sheet=document.getElementById('document-sheet').getBoundingClientRect();return Object.fromEntries([...document.querySelectorAll('#document-sheet .lne-document-content > [data-block-id]')].map(el=>{const r=el.getBoundingClientRect();return[el.dataset.blockId,{y:r.y-sheet.y,bottom:r.bottom-sheet.y,height:r.height}];}));});
 const checkChain=async()=>{const g=await geometry(),ids=Object.keys(g);for(let i=1;i<ids.length;i++)assert.ok(g[ids[i]].y>=g[ids[i-1]].bottom-1,`${ids[i-1]} / ${ids[i]} overlap`);return g;};
 const move=async(id,dy)=>{
  await page.evaluate(id=>LNEState.selectBlock(id),id);await settle();const el=page.locator('#block-'+id+' .object-move-top');await el.scrollIntoViewIfNeeded();const r=await el.boundingBox();
  await page.mouse.move(r.x+r.width*.25,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width*.25,r.y+r.height/2+dy,{steps:10});await page.mouse.up();await settle();
 };
 const resize=async(dx)=>{
  await page.evaluate(()=>LNEState.selectBlock('image'));await settle();const h=page.locator('#block-image > .handle-e');await h.evaluate(el=>el.scrollIntoView({block:'center',inline:'nearest'}));await settle();const r=await h.boundingBox();
  const hit=await page.evaluate(r=>document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.className,r);assert.match(hit,/handle-e/,'Resize pointer target: '+hit);
  await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width/2+dx,r.y+r.height/2,{steps:10});await page.mouse.up();await settle();
 };
 const passed=[];let initial=await checkChain();await move('a',80);let g=await checkChain();
 for(const id of ['a','list','table','example','image','b','subtitle','c'])assert.ok(Math.abs(g[id].y-initial[id].y-80)<1,id);assert.equal(g.title.y,initial.title.y);passed.push('A: flow drag reserves real spacing, no overlaps');
 await page.evaluate(()=>LNEState.undo());await settle();g=await geometry();assert.ok(Math.abs(g.c.y-initial.c.y)<1);await page.evaluate(()=>LNEState.redo());await settle();g=await geometry();assert.ok(Math.abs(g.c.y-initial.c.y-80)<1);passed.push('one undo/redo restores the entire flow');
 await move('a',-80);g=await checkChain();assert.ok(Math.abs(g.c.y-initial.c.y)<1);passed.push('B: upward drag reclaims all displacement');
 await page.evaluate(()=>{LNEState.updateBlockProperties('title',{spacingAfter:20});LNEState.updateBlockProperties('a',{spacingBefore:10});});await settle();const spaced=await geometry();await move('a',30);g=await checkChain();assert.ok(Math.abs(g.a.y-spaced.a.y-30)<1);assert.ok(Math.abs(g.c.y-spaced.c.y-30)<1);await move('a',-30);passed.push('explicit before/after margins do not swallow drag distance');
 const detail=()=>page.locator('#block-image').evaluate(el=>[el,...el.querySelectorAll('.lne-block-imagen-wrapper,.lne-block-imagen-container,img,figcaption')].map(n=>({cls:n.className,height:n.offsetHeight,width:n.offsetWidth,margin:getComputedStyle(n).margin,padding:getComputedStyle(n).padding,display:getComputedStyle(n).display})));
 const beforeGrow=await geometry(),detailsBefore=await detail();await resize(100);g=await checkChain();const delta=g.image.height-beforeGrow.image.height;assert.ok(Math.abs(delta-100)<2,JSON.stringify({delta,before:beforeGrow.image,after:g.image,detailsBefore,detailsAfter:await detail(),layout:await page.evaluate(()=>LNEState.getBlockById('image').propiedades.layout)}));assert.ok(Math.abs(g.b.y-beforeGrow.b.y-delta)<2);passed.push('C: +100px image height shifts following flow +100px');
 const beforeShrink=g;await resize(-130);g=await checkChain();const shrink=g.image.height-beforeShrink.image.height;assert.ok(Math.abs(shrink+130)<2,JSON.stringify({shrink,before:beforeShrink.image,after:g.image,detail:await detail(),layout:await page.evaluate(()=>LNEState.getBlockById('image').propiedades.layout)}));assert.ok(Math.abs(g.b.y-beforeShrink.b.y-shrink)<2);passed.push('D: -130px image height reclaims 130px');
 await page.evaluate(()=>LNECanvas.changeImageWrap('image','front'));await settle();const freeBefore=await geometry();await resize(60);g=await geometry();assert.ok(Math.abs(g.b.y-freeBefore.b.y)<1);passed.push('E: free image resize does not move normal flow');
 await page.evaluate(()=>LNECanvas.changeImageWrap('image','inline'));await settle();await checkChain();
 await page.evaluate(()=>{LNEState.updateBlockContent('b','texto','Texto alrededor de imagen. '.repeat(30));LNECanvas.changeImageWrap('image','square');});await settle();
 await resize(60);let wrapped=await geometry();assert.ok(wrapped.subtitle.y>=Math.max(wrapped.image.bottom,wrapped.b.bottom)-1);const lower=wrapped.subtitle.y;
 await resize(-40);wrapped=await geometry();assert.ok(wrapped.subtitle.y<=lower+1);assert.ok(wrapped.subtitle.y>=Math.max(wrapped.image.bottom,wrapped.b.bottom)-1);passed.push('wrap resize recalculates exclusion zone before following full-width content');
 await page.evaluate(()=>{LNECanvas.changeImageWrap('image','inline');LNEState.updateBlockContent('b','texto','PÁRRAFO B');});await settle();await checkChain();
 const markerPadding=await page.evaluate(()=>{
  const box=document.querySelector('#block-example .lne-comp-ejemplo'),list=box.querySelector('ul'),li=list.querySelector('li'),cell=document.querySelector('#block-table td'),cellList=cell.querySelector('ul');
  return{box:getComputedStyle(box).paddingLeft,list:getComputedStyle(list).paddingLeft,item:getComputedStyle(li).paddingLeft,cell:getComputedStyle(cell).paddingLeft,cellList:getComputedStyle(cellList).paddingLeft,cellFont:getComputedStyle(cellList).fontSize,before:getComputedStyle(li,'::before').content};
 });assert.ok(parseFloat(markerPadding.box)>=16);assert.ok(parseFloat(markerPadding.list)>=24);assert.ok(parseFloat(markerPadding.item)>=4);assert.ok(parseFloat(markerPadding.cell)>0);assert.ok(parseFloat(markerPadding.cellList)>=parseFloat(markerPadding.cellFont)*1.5-.1);passed.push('F/I: marker, text and border insets in box/table; no forced pseudo marker');
 // Actual marker deletion converts only the edited item, preserving neighbors.
 const item=page.locator('#block-list [data-list-index="0"]');await item.click();await page.keyboard.press('Home');await page.keyboard.press('Delete');await settle();
 const deletion=await page.evaluate(()=>LNEState.state.bloques.filter(b=>b.id==='list'||b.tipo==='lista').map(b=>({id:b.id,type:b.tipo,text:b.texto,items:b.propiedades?.items})));
 assert.equal(deletion.find(b=>b.id==='list').type,'parrafo');assert.match(deletion.find(b=>b.id==='list').text,/Uno/);assert.ok(deletion.some(b=>b.type==='lista'&&b.items.includes('Dos')));passed.push('G: deleting a marker turns only that line into a paragraph');
 await page.evaluate(()=>LNEState.selectBlock('list'));await page.locator('#tool-list-numbers').click();await settle();assert.equal(await page.evaluate(()=>LNEState.getBlockById('list').propiedades.formato),'numerada');
 await page.locator('#tool-list-bullets').click();await settle();assert.equal(await page.evaluate(()=>LNEState.getBlockById('list').propiedades.formato),'vinetas');passed.push('H: numbering ↔ bullets works');
 await page.locator('#block-list [data-list-marker]').selectText();await page.keyboard.type('✓ ');await settle();const custom=await page.evaluate(()=>LNEState.getBlockById('list'));assert.equal(custom.tipo,'parrafo');assert.match(custom.texto,/✓/);assert.match(custom.texto,/Uno/);passed.push('editing a generated marker keeps the typed custom symbol and line text');
 // Native lists inside component fields are editable, too.
 await page.locator('#block-example .lne-comp-body li').click();await page.keyboard.press('Home');await page.keyboard.press('Backspace');await settle();assert.equal(await page.locator('#block-example .lne-comp-body li').count(),0);assert.match(await page.locator('#block-example .lne-comp-body').innerText(),/Bullet en cuadro/);passed.push('G: native box bullet can be removed without deleting text');
 const end=await page.evaluate(()=>{const s=document.getElementById('document-sheet'),f=s.querySelector('footer'),c=s.querySelector('main');return{height:s.offsetHeight,footerTop:f.offsetTop,contentBottom:c.offsetTop+c.offsetHeight,tail:s.offsetHeight-(f.offsetTop+f.offsetHeight),gaps:s.querySelectorAll('.block-insert-gap').length,lastGap:!!c.lastElementChild?.nextElementSibling};});
 assert.ok(Math.abs(end.footerTop-end.contentBottom-48)<2,JSON.stringify(end));assert.ok(end.tail>=35&&end.tail<=37);passed.push('J: final content + 48px footer separation + 36px bottom padding');
 const gap=page.locator('#document-sheet .block-insert-gap:not([hidden])').first();assert.ok(await gap.count());const gapMetrics=await gap.evaluate(el=>({position:getComputedStyle(el).position,height:el.parentElement.offsetHeight}));assert.equal(gapMetrics.position,'absolute');
 await gap.hover();assert.ok(await gap.locator('> button').isVisible());const selected=await page.evaluate(()=>LNEState.state.selectedBlockId);await gap.locator('> button').click();assert.equal(await page.evaluate(()=>LNEState.state.selectedBlockId),selected);await page.keyboard.press('Escape');passed.push('L: real internal gap opens without selecting content');
 const sheet=page.locator('#document-sheet');await sheet.scrollIntoViewIfNeeded();const r=await sheet.boundingBox();await page.mouse.move(r.x+15,Math.min(r.y+r.height-10,1100));assert.equal(await page.locator('.block-insert-gap > button:visible').count(),0);passed.push('K: no trailing insert gap / phantom plus');
 // Long legacy source, free objects and stale reservations; opening is read-only.
 const stress=await page.evaluate(async()=>{
  const blocks=Array.from({length:60},(_,i)=>{const b=LNEComponents.createBlock('parrafo',`${i}: `+'Contenido largo. '.repeat(24));if(i===2)b.propiedades={layout:{mode:'flow',offsetY:-180,flowReserve:{height:1400}}};return b;});
  const free=LNEComponents.createBlock('parrafo','Objeto libre real al final');free.id='real-free';free.propiedades={layout:{mode:'absolute',x:100,y:10000,width:300,flowReserve:{height:1200}}};blocks.push(free);
  const ghost=LNEComponents.createBlock('parrafo','');ghost.propiedades={layout:{mode:'absolute',x:100,y:30000,width:300,height:1000}};blocks.push(ghost);
  const data={metadata:{titulo:'Copia sintética heredada'},bloques:blocks},before=JSON.stringify(data);LNEState.setDocumentData(data);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  const s=document.getElementById('document-sheet'),f=s.querySelector('footer'),last=document.getElementById('block-real-free');
  const sourceUnchanged=before===JSON.stringify(data),height=s.offsetHeight,freeBottom=last.offsetTop+last.offsetHeight,stable=f.offsetTop;
  await new Promise(r=>setTimeout(r,350));return{sourceUnchanged,height,freeBottom,footerTop:f.offsetTop,stable,ghostReservations:s.querySelectorAll('.group-flow-reserve').length};
 });assert.ok(stress.sourceUnchanged);assert.ok(stress.height>10000&&stress.height<12000,JSON.stringify(stress));assert.ok(stress.footerTop>stress.freeBottom);assert.equal(stress.footerTop,stress.stable);assert.equal(stress.ghostReservations,0);passed.push('long legacy fixture: no collapse, ghost Y ignored, visible free Y preserved, no observer loop or source rewrite');
 // Reopen a normal fixture for persisted local source + final readonly output.
 await page.evaluate(()=>LNEState.setDocumentData({metadata:{titulo:'F5 temporal'},bloques:[LNEComponents.createBlock('parrafo','Contenido local que debe persistir'),LNEComponents.createBlock('ejemplo')]}));await settle();await page.waitForTimeout(750);
 const beforeF5=await page.evaluate(()=>JSON.stringify(LNEState.state.bloques));await page.reload();await page.waitForFunction(()=>window.LNEState?.state.bloques.length===2);assert.equal(await page.evaluate(()=>JSON.stringify(LNEState.state.bloques)),beforeF5);passed.push('M: local autosave/F5 preserves exact content');
 const exported=await page.evaluate(()=>{const before=JSON.stringify(LNEState.state.bloques),html=LNERenderer.compileToHTML(LNEState.state);return{html,sourceUnchanged:before===JSON.stringify(LNEState.state.bloques)};});assert.ok(exported.sourceUnchanged);assert.ok(!/block-insert-gap|object-resize-handle|lne-selection-outline/.test(exported.html));
 await page.locator('#btn-vista-web').click();await page.locator('#web-preview-modal.open').waitFor();const ro=await page.locator('#web-preview-content .lne-rendered-sheet').evaluate(s=>({height:s.offsetHeight,tail:s.offsetHeight-(s.querySelector('footer').offsetTop+s.querySelector('footer').offsetHeight)}));assert.ok(ro.height<1150);assert.ok(ro.tail>=35&&ro.tail<=37);passed.push('N: Web/export use content-sized shared render without auxiliary gaps');
 await page.screenshot({path:path.join(out,'flow-semantics-web.png')});assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);console.log(JSON.stringify({passed,markerPadding,end,stress,ro,errors,writes,artifacts:out},null,2));
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();server.closeAllConnections();}});
