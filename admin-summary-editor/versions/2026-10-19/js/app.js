/**
 * APP.JS - Orquestador Principal del Editor Visual LNE
 * Inicializa módulos, atajos de teclado, pegado de imágenes desde portapapeles
 * y arrastre de archivos directos al editor.
 */

window.LNEResponsive=(()=>{
    let scale=1,manual=false,previousFocus=null;
    function close(){document.body.classList.remove('drawer-add','drawer-inspector','drawer-format');const backdrop=document.getElementById('drawer-backdrop');if(backdrop)backdrop.hidden=true;document.querySelectorAll('[data-open-panel]').forEach(button=>button.setAttribute('aria-expanded','false'));if(previousFocus?.isConnected)previousFocus.focus();}
    function toggle(panel){const name='drawer-'+panel,active=document.body.classList.contains(name);close();if(active)return;previousFocus=document.activeElement;document.body.classList.add(name);document.getElementById('drawer-backdrop').hidden=false;document.querySelector(`[data-open-panel="${panel}"]`)?.setAttribute('aria-expanded','true');const root=document.getElementById(panel==='add'?'insert-panel':panel==='format'?'tool-font-family':'context-inspector');root?.querySelector('button,input,select')?.focus();}
    function zoom(value){scale=Math.max(.25,Math.min(1.5,value));document.getElementById('document-sheet').style.zoom=scale;document.getElementById('sheet-zoom-fit').textContent=`${Math.round(scale*100)}% · Ajustar`;}
    function fit(){manual=false;const viewport=document.getElementById('document-viewport');zoom(Math.min(1,Math.max(.25,(viewport.clientWidth-10)/860)));}
    function init(){
        document.querySelectorAll('[data-open-panel]').forEach(button=>button.addEventListener('click',()=>toggle(button.dataset.openPanel)));
        document.querySelectorAll('[data-close-panel]').forEach(button=>button.addEventListener('click',close));document.getElementById('drawer-backdrop').addEventListener('click',close);
        document.getElementById('mobile-top-menu').addEventListener('click',()=>{const open=document.body.classList.toggle('top-menu-open');document.getElementById('mobile-top-menu').setAttribute('aria-expanded',String(open))});
        document.getElementById('btn-document-menu').addEventListener('click',event=>{event.stopPropagation();const menu=document.getElementById('document-menu-actions');menu.hidden=!menu.hidden;event.currentTarget.setAttribute('aria-expanded',String(!menu.hidden))});
        document.addEventListener('click',event=>{if(!event.target.closest('.document-menu'))document.getElementById('document-menu-actions').hidden=true;if(!event.target.closest('.editor-top-nav'))document.body.classList.remove('top-menu-open');if(event.target.closest('.top-actions-section button')&&!event.target.closest('#btn-document-menu'))document.body.classList.remove('top-menu-open')});
        document.addEventListener('keydown',event=>{if(event.key==='Escape'){close();document.body.classList.remove('top-menu-open');document.getElementById('document-menu-actions').hidden=true;}});
        document.getElementById('sheet-zoom-fit').addEventListener('click',fit);document.getElementById('sheet-zoom-actual').addEventListener('click',()=>{manual=true;zoom(1)});
        document.getElementById('sheet-zoom-in').addEventListener('click',()=>{manual=true;zoom(scale+.15)});document.getElementById('sheet-zoom-out').addEventListener('click',()=>{manual=true;zoom(scale-.15)});
        window.addEventListener('resize',()=>{if(innerWidth>1120)close();if(!manual)fit()});fit();
    }
    return{init,toggle,close,fit,getScale:()=>scale};
})();
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Módulos del Editor
    window.LNEToolbar.init();
    window.LNECanvas.init();
    window.LNEEditorial.init();
    window.LNEResponsive.init();

    // 2. Registrar Atajos Globales de Teclado
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z' || e.key === 'Z') {
                e.preventDefault();
                window.LNEState.undo();
            } else if (e.key === 'y' || e.key === 'Y') {
                e.preventDefault();
                window.LNEState.redo();
            } else if (e.key === 's' || e.key === 'S') {
                e.preventDefault();
                window.LNEState.saveToStorage();
                showNotification("Documento guardado localmente");
            }
        }
    });

    // 3. Soporte para Pegar Imágenes Directamente desde el Portapapeles (Ctrl + V)
    document.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData)?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                e.preventDefault();
                const file = item.getAsFile();
                if (file) {
                    const epoch = window.LNEState.documentEpoch;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (epoch !== window.LNEState.documentEpoch) return;
                        const imageBlock = window.LNEComponents.createBlock('imagen', event.target.result, '');
                        window.LNEState.addBlock(imageBlock);
                        showNotification("Imagen pegada desde el portapapeles");
                    };
                    reader.readAsDataURL(file);
                }
                break;
            }
        }
    });

    // 4. Soporte para Arrastrar y Soltar Archivos (Word o Imágenes) desde Windows Explorer
    window.addEventListener('dragover', (e) => {
        // Prevenir apertura por defecto del archivo en el navegador
        if (e.dataTransfer.types && Array.from(e.dataTransfer.types).includes('Files')) {
            e.preventDefault();
        }
    });

    window.addEventListener('drop', async (e) => {
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const name = file.name.toLowerCase();

            // Si es un archivo Word
            if (name.endsWith('.docx')) {
                e.preventDefault();
                if (confirm(`¿Deseas importar el documento Word "${file.name}" y convertirlo en bloques LNE?`)) {
                    try {
                        const parsed = await window.LNEDocxParser.importIntoEditor(file);
                        if (parsed) showNotification(`Word importado: ${parsed.blocks.length} bloques creados`);
                    } catch (err) {
                        alert(`Error al procesar Word: ${err.message}`);
                    }
                }
            }
            // Si es una imagen
            else if (file.type.startsWith('image/')) {
                e.preventDefault();
                const epoch = window.LNEState.documentEpoch;
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (epoch !== window.LNEState.documentEpoch) return;
                    const imageBlock = window.LNEComponents.createBlock('imagen', event.target.result, '');
                    window.LNEState.addBlock(imageBlock);
                    showNotification("Imagen agregada al documento");
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // 5. Cargar Borrador Previo o Iniciar Completamente Limpio (Sin imágenes fantasma ni demos)
    const hasPreviousDraft = window.LNEState.loadFromStorage();
    if (!hasPreviousDraft) {
        // Un documento nuevo inicia verdaderamente limpio
        window.LNEState.resetDocument();
    }

    function showNotification(msg) {
        let toast = document.getElementById('lne-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'lne-toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 24px;
                right: 24px;
                background: #1b263b;
                color: #ffffff;
                padding: 10px 18px;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: 600;
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.25s ease;
                pointer-events: none;
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        setTimeout(() => {
            toast.style.opacity = '0';
        }, 2200);
    }
});
