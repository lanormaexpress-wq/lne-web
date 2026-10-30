// Native spelling only: no text changes, persistence calls or external service.
(()=>{
    const selector='[contenteditable="true"],textarea,input:not([type]),input[type="text"],input[type="search"]';
    function mark(root){
        const fields=[...(root.matches?.(selector)?[root]:[]),...root.querySelectorAll(selector)];
        fields.forEach(el=>{el.lang='es-PE';el.spellcheck=true;el.setAttribute('autocorrect','off');});
    }
    function start(){
        document.documentElement.lang='es-PE';mark(document.body);
        new MutationObserver(records=>{
            for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1)mark(node);
        }).observe(document.body,{childList:true,subtree:true});
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
