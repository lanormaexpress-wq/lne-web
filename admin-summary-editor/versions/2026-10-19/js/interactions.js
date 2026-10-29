/* Editor-only geometry. No document migration, publication or data access. */
window.LNEInteractions = (() => {
    const padding = 2, screenTolerance = 3;
    const S = () => window.LNEState;
    const sheet = () => document.getElementById('document-sheet');
    const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
    let overlay, frame = 0, gesture = null, heldKey = null, manipulating = false, sizeObserver;
    let observed = new Set();
    function union(rects) {
        if (!rects.length) return null;
        const left=Math.min(...rects.map(r=>r.left)),top=Math.min(...rects.map(r=>r.top));
        const right=Math.max(...rects.map(r=>r.right)),bottom=Math.max(...rects.map(r=>r.bottom));
        return {left,top,right,bottom,width:right-left,height:bottom-top};
    }
    const chrome = '.block-controls,.block-copy-check,.object-resize-handle,.img-resize-handle,.object-move-zone,.image-context-bar,.table-context-bar,.lne-selection-outline,.lne-wrap-proxy';
    function visualRect(el) {
        const isText=el.classList.contains('lne-auto-height')||el.classList.contains('lne-meta-object');
        let rects=[];
        if (isText&&!el.querySelector('.lne-comp-header,.lne-comp-normativa,.lne-comp-body')) {
            const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
            while(node=walker.nextNode()) {
                if(!node.textContent.trim()||node.parentElement.closest(chrome))continue;
                const range=document.createRange();range.selectNodeContents(node);
                rects.push(...[...range.getClientRects()].filter(r=>r.width&&r.height));
            }
            el.querySelectorAll('.lne-inline-legal-icon,.lne-editorial-icon').forEach(n=>rects.push(n.getBoundingClientRect()));
        } else if(el.querySelector('.lne-block-imagen')) {
            const image=el.querySelector('.lne-block-imagen');rects.push(image.getBoundingClientRect());
            const caption=el.querySelector('.lne-imagen-pie');if(caption?.textContent.trim())rects.push(caption.getBoundingClientRect());
        } else {
            [...el.children].filter(n=>!n.matches(chrome)).forEach(n=>{
                const r=n.getBoundingClientRect();if(r.width&&r.height)rects.push(r);
            });
        }
        // Empty editable fields remain selectable; image captions count only
        // when visible, and manually sized visual components keep their box.
        let r=union(rects)||el.getBoundingClientRect();
        return {...r,left:r.left-padding,top:r.top-padding,right:r.right+padding,bottom:r.bottom+padding,width:r.width+padding*2,height:r.height+padding*2};
    }
    function model(id) {
        const b=S().getBlockById(id);if(b)return b;
        const el=[...sheet().querySelectorAll('[data-meta-field]')].find(n=>n.dataset.blockId===id);
        return el?{id,metaField:el.dataset.metaField,propiedades:{layout:S().state.metadata.layouts?.[el.dataset.metaField]||{}}}:null;
    }
    function ids() {
        const result=window.LNEGroups?.selectedIds()||[S().state.selectedBlockId];
        if(S().selectionMode)result.push(...S().selectedBlockIds);
        return [...new Set(result)].filter(id=>id&&model(id));
    }
    function element(id){return [...sheet().querySelectorAll('[data-block-id]')].find(el=>el.dataset.blockId===id);}
    function selectedRect(selected=ids()){return union(selected.map(element).filter(Boolean).map(visualRect));}
    function paintSelection() {
        const target=sheet();if(!target)return;
        const selectedNodes=[...target.querySelectorAll('[data-block-id]')].filter(el=>el.matches('.selected,.multi-selected,.copy-selected'));
        if(selectedNodes.length!==observed.size||selectedNodes.some(el=>!observed.has(el))){sizeObserver?.disconnect();observed=new Set(selectedNodes);selectedNodes.forEach(el=>sizeObserver?.observe(el));}
        target.querySelectorAll('.lne-selection-outline').forEach(n=>n.remove());
        target.querySelectorAll('[data-block-id]').forEach(el=>{
            if(!el.matches('.selected,.multi-selected,.copy-selected'))return;
            const r=visualRect(el),outer=el.getBoundingClientRect(),scale=target.getBoundingClientRect().width/target.clientWidth||1;
            const x=(r.left-outer.left)/scale,y=(r.top-outer.top)/scale,w=r.width/scale,h=r.height/scale;
            for(const [key,value] of Object.entries({x,y,w,h}))el.style.setProperty('--selection-'+key,value+'px');
            const outline=document.createElement('span');outline.className='lne-selection-outline';outline.contentEditable='false';outline.setAttribute('aria-hidden','true');el.append(outline);
        });
        overlay?.querySelectorAll('.lne-group-outline').forEach(n=>n.remove());
        if(ids().length>1){const r=selectedRect();if(r)lineBox('lne-group-outline',r);}
    }
    function queue(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;paintSelection();if(gesture)drawGuides();});}
    function lineBox(cls,r,label='') {
        const el=document.createElement('span');el.className=cls;
        Object.assign(el.style,{left:r.left+'px',top:r.top+'px',width:Math.max(0,r.width)+'px',height:Math.max(0,r.height)+'px'});
        if(label){const text=document.createElement('span');text.textContent=label;el.append(text);}overlay.append(el);
    }
    function matchingGuides(moving, peers, page, tolerance) {
        const found=[];
        for(const axis of ['x','y']) {
            const low=axis==='x'?'left':'top',high=axis==='x'?'right':'bottom';
            const points=r=>[r[low],(r[low]+r[high])/2,r[high]];
            let best=null;const mp=points(moving);
            for(const peer of peers)points(peer).forEach((value,index)=>{
                const delta=Math.abs(mp[index]-value);if(delta<=tolerance&&(!best||delta<best.delta))best={axis,value,delta};
            });
            const center=(page[low]+page[high])/2,delta=Math.abs(mp[1]-center);
            if(delta<=tolerance&&(!best||delta<best.delta))best={axis,value:center,delta};
            if(best)found.push(best);
        }
        return found;
    }
    function gapReferences(peers) {
        const out=[];
        for(const axis of ['x','y']) {
            const low=axis==='x'?'left':'top',high=axis==='x'?'right':'bottom',crossLow=axis==='x'?'top':'left',crossHigh=axis==='x'?'bottom':'right';
            const sorted=[...peers].sort((a,b)=>a[low]-b[low]);
            for(let i=0;i<sorted.length;i++) {
                const a=sorted[i];let neighbors=0;
                for(let j=i+1;j<sorted.length&&neighbors<4;j++) {
                    const b=sorted[j];if(b[low]<a[high]||Math.min(a[crossHigh],b[crossHigh])<=Math.max(a[crossLow],b[crossLow]))continue;
                    out.push({axis,a,b,gap:b[low]-a[high]});neighbors++;
                }
            }
        }return out.sort((a,b)=>a.gap-b.gap);
    }
    function equalGaps(moving, peers, references, tolerance) {
        const out=[];
        for(const axis of ['x','y']) {
            const low=axis==='x'?'left':'top',high=axis==='x'?'right':'bottom',crossLow=axis==='x'?'top':'left',crossHigh=axis==='x'?'bottom':'right';let best;
            const refs=references.filter(r=>r.axis===axis&&r.gap>0);
            for(const peer of peers) {
                if(Math.min(peer[crossHigh],moving[crossHigh])<=Math.max(peer[crossLow],moving[crossLow]))continue;
                const a=peer[high]<=moving[low]?peer:moving,b=a===peer?moving:peer,gap=b[low]-a[high];if(gap<0)continue;
                let lo=0,hi=refs.length;while(lo<hi){const mid=(lo+hi)>>1;if(refs[mid].gap<gap)lo=mid+1;else hi=mid;}
                for(const ref of [refs[lo-1],refs[lo]].filter(Boolean)){
                    const delta=Math.abs(gap-ref.gap);if(delta<=tolerance&&(!best||delta<best.delta))best={axis,a,b,ref,gap,delta};
                }
            }if(best)out.push(best);
        }return out;
    }
    function begin(event) {
        const el=event.target.closest('#document-sheet [data-block-id]');if(!el||event.button!==0||S().isBlockLocked(el.dataset.blockId))return;
        manipulating=!!event.target.closest('.object-move-zone,.block-drag-handle,.lne-block-imagen,.img-resize-handle');
        const moving=event.target.closest('.object-move-zone,.block-drag-handle,.lne-block-imagen');
        if(!event.target.closest('[contenteditable],input,textarea,select')||moving){
            const viewport=document.getElementById('document-viewport');viewport.tabIndex=-1;viewport.focus({preventScroll:true});
        }
        if(!moving||event.target.closest('.img-resize-handle'))return;
        const selected=new Set(ids());selected.add(el.dataset.blockId);
        const peers=[...sheet().querySelectorAll('[data-block-id]')].filter(n=>!selected.has(n.dataset.blockId)).map(visualRect);
        gesture={selected:[...selected],peers,references:gapReferences(peers),origin:{x:event.clientX,y:event.clientY},moved:false};
    }
    function drawGuides() {
        overlay.querySelectorAll('.lne-smart-guide,.lne-gap-guide').forEach(n=>n.remove());
        if(!gesture?.moved)return;const r=selectedRect(gesture.selected);if(!r)return;
        const page=sheet().getBoundingClientRect(),tolerance=screenTolerance;
        for(const g of matchingGuides(r,gesture.peers,page,tolerance))lineBox('lne-smart-guide',g.axis==='x'?{left:g.value,top:page.top,width:0,height:page.height}:{left:page.left,top:g.value,width:page.width,height:0});
        const scale=page.width/sheet().clientWidth||1;
        const segment=(axis,a,b,label)=>{const vertical=axis==='y',center=vertical?(Math.max(a.left,b.left)+Math.min(a.right,b.right))/2:(Math.max(a.top,b.top)+Math.min(a.bottom,b.bottom))/2;lineBox('lne-gap-guide '+(vertical?'vertical':'horizontal'),vertical?{left:center,top:a.bottom,width:0,height:b.top-a.bottom}:{left:a.right,top:center,width:b.left-a.right,height:0},label);};
        for(const g of equalGaps(r,gesture.peers,gesture.references,tolerance)){
            const label=Math.round(g.ref.gap/scale)+' px';segment(g.axis,g.ref.a,g.ref.b,label);segment(g.axis,g.a,g.b,label);
        }
    }
    function end(){gesture=null;manipulating=false;overlay?.querySelectorAll('.lne-smart-guide,.lne-gap-guide').forEach(n=>n.remove());queue();}
    function deselectOnBlank(event) {
        if(event.button!==0||manipulating||gesture)return;
        const target=event.target;
        // These surfaces own focus/text ranges and must keep the active object.
        if(target.closest('[data-block-id],[data-meta-field],[contenteditable],input,textarea,select,button,a,[role="button"],[role="menu"],[role="dialog"],.editor-top-nav,.editor-toolbar,.primary-toolbar,.secondary-toolbar,.editor-side-panel,.insert-panel,.context-inspector,.mobile-editor-bar,.modal-overlay,.web-preview-modal,.block-object-menu,.icon-picker-card,.document-menu-dropdown'))return;
        if(!ids().length&&!S().selectionMode)return;
        document.activeElement?.closest('#document-sheet [contenteditable]')?.blur();
        window.LNEToolbar?.clearSelection();
        S().clearSelection();end();
    }
    function nudge(event) {
        const directions={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
        if(!directions[event.key]||event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey||S().state.previewMode)return;
        if(event.target.closest('input,textarea,select,[role="textbox"]')||event.target.isContentEditable)return;
        const selected=ids(),blocks=selected.map(model);if(!blocks.length||blocks.some(b=>S().isBlockLocked(b.id)||(!b.metaField&&!S().canUseFreeMode(b))))return;
        const target=sheet(),page=target.getBoundingClientRect(),scale=page.width/target.clientWidth||1,r=selectedRect(selected),style=getComputedStyle(target);
        let [dx,dy]=directions[event.key].map(v=>v*(event.shiftKey?10:1));
        dx=clamp(dx,Math.min(0,(page.left+parseFloat(style.paddingLeft)*scale-r.left)/scale),Math.max(0,(page.right-parseFloat(style.paddingRight)*scale-r.right)/scale));
        dy=clamp(dy,Math.min(0,(page.top-r.top)/scale),Math.max(0,(page.bottom-r.bottom)/scale));
        // Do not pull already-outside legacy objects farther into/out of bounds.
        if(Math.sign(dx)!==Math.sign(directions[event.key][0]))dx=0;if(Math.sign(dy)!==Math.sign(directions[event.key][1]))dy=0;
        if(!dx&&!dy)return;event.preventDefault();
        if(!event.repeat||heldKey!==event.key){S().snapshot();heldKey=event.key;}
        blocks.forEach(b=>{
            const el=element(b.id),layout={...b.propiedades?.layout};
            if(blocks.length>1&&S().getBlockMode(b)!=='absolute') {
                const outer=el.getBoundingClientRect(),s=getComputedStyle(el),image=b.tipo==='imagen'&&el.querySelector('.lne-block-imagen'),box=image?image.getBoundingClientRect():outer;
                const content=[...el.children].find(n=>!n.matches(chrome)),inset=b.metaField||image?0:parseFloat(content&&getComputedStyle(content).marginTop)||0;
                Object.assign(layout,{mode:'absolute',x:(box.left-page.left)/scale+dx,y:(box.top-page.top)/scale+dy+inset,width:box.width/scale,offsetX:0,offsetY:0,flowOffsetY:0,flowReserve:layout.flowReserve||{height:outer.height/scale,width:outer.width/scale,margin:s.margin,float:s.float}});
            } else if(S().getBlockMode(b)==='absolute'){layout.x=(Number(layout.x)||0)+dx;layout.y=(Number(layout.y)||0)+dy;}
            else {layout.mode='flow';layout.offsetX=(Number(layout.offsetX)||0)+dx;layout.offsetY=(Number(layout.offsetY)||0)+dy;}
            if(b.metaField)S().state.metadata.layouts={...S().state.metadata.layouts,[b.metaField]:layout};
            else b.propiedades={...b.propiedades,layout};
        });S().notify('keyboard-move');queue();
    }
    function init() {
        overlay=document.createElement('div');overlay.id='lne-interaction-overlay';overlay.setAttribute('aria-hidden','true');document.body.append(overlay);
        document.addEventListener('pointerdown',begin,true);
        document.addEventListener('pointerdown',deselectOnBlank);
        document.addEventListener('pointermove',event=>{if(gesture)gesture.moved ||= Math.abs(event.clientX-gesture.origin.x)+Math.abs(event.clientY-gesture.origin.y)>2;if(manipulating)queue();},true);
        document.addEventListener('pointerup',end,true);document.addEventListener('pointercancel',end,true);
        document.addEventListener('keydown',nudge);document.addEventListener('keyup',()=>{heldKey=null;});
        document.addEventListener('keydown',e=>{if(e.key==='Escape')end();});window.addEventListener('blur',end);window.addEventListener('scroll',queue,true);window.addEventListener('resize',queue);
        sheet().addEventListener('input',queue);sheet().addEventListener('load',queue,true);S().subscribe((_,type)=>{if(['set-document','reset','load-storage'].includes(type))end();queue();});
        sizeObserver=new ResizeObserver(queue);new ResizeObserver(queue).observe(sheet());document.fonts?.ready.then(queue);document.fonts?.addEventListener('loadingdone',queue);queue();
    }
    document.addEventListener('DOMContentLoaded',init);
    return {visualRect,matchingGuides,gapReferences,equalGaps,padding,queue,begin};
})();
