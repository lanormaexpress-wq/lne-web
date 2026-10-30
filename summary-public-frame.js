// Public read-only sizing fallback. Never loaded by the administrative editor.
(()=>{
    const active=new Map();
    function bind(frame){
        if(active.has(frame))return;
        let stop=()=>{};
        function loaded(){
            stop();
            let doc;try{doc=frame.contentDocument;}catch{return;}
            const root=doc?.querySelector('.lne-public-summary-canvas');
            const sheet=root?.querySelector('.lne-rendered-sheet');
            if(!sheet||getComputedStyle(root).getPropertyValue('--lne-public-native-fit').trim()==='1')return;
            let queued=false,closed=false;
            function update(){
                queued=false;if(closed||!frame.isConnected)return;
                const scale=Math.min(1,doc.documentElement.clientWidth/1200);
                if(scale<=0)return;
                const height=sheet.offsetHeight*scale;
                const set=(name,value)=>{if(root.style.getPropertyValue(name)!==value)root.style.setProperty(name,value);};
                set('--lne-public-scale',String(scale));
                set('--lne-public-height',`${height}px`);
            }
            function schedule(){if(!queued&&!closed){queued=true;requestAnimationFrame(update);}}
            const observer=new ResizeObserver(schedule);
            observer.observe(frame);observer.observe(sheet);observer.observe(doc.documentElement);
            doc.fonts?.ready.then(schedule);
            stop=()=>{closed=true;observer.disconnect();};
            update();
        }
        frame.addEventListener('load',loaded);
        active.set(frame,()=>{stop();frame.removeEventListener('load',loaded);});
        loaded();
    }
    function scan(){
        document.querySelectorAll('iframe.lne-summary-public-frame').forEach(bind);
        for(const [frame,dispose] of active)if(!frame.isConnected){dispose();active.delete(frame);}
    }
    scan();new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
})();
