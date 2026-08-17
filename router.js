document.addEventListener('DOMContentLoaded', () => {
    let activeNavigation = 0;

    // Interceptar clicks en enlaces para la navegación SPA
    function bindLinks() {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            // Verificar si el enlace es una página HTML interna
            if (href && (href.endsWith('.html') || href === 'index.html' || href === '/' || href.startsWith('/'))) {
                // Omitir enlaces externos
                if (href.startsWith('http') && !href.startsWith(window.location.origin)) {
                    return;
                }
                
                // Evitar enlazar múltiples veces clonando el nodo
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                newLink.addEventListener('click', e => {
                    e.preventDefault();
                    let targetPath = href;
                    if (targetPath === 'index.html') targetPath = '/';
                    if (!targetPath.startsWith('/')) targetPath = '/' + targetPath;
                    
                    history.pushState(null, "", targetPath);
                    loadPage(targetPath);
                });
            }
        });
    }

    // Ejecutar scripts de forma secuencial respetando el orden y la carga de archivos externos
    function getDataScriptName(src) {
        if (!src) return null;

        const path = new URL(src, window.location.origin).pathname;
        if (path.endsWith('/civil.js')) return 'civil';
        if (path.endsWith('/penal.js')) return 'penal';
        if (path.endsWith('/constitucion.js')) return 'constitucion';
        return null;
    }

    function isDataScriptReady(dataScriptName) {
        if (dataScriptName === 'civil') return typeof CodigoCivil !== 'undefined';
        if (dataScriptName === 'penal') return typeof CodigoPenal !== 'undefined';
        if (dataScriptName === 'constitucion') return typeof Constitucion !== 'undefined';
        return false;
    }

    function showDataLoadError() {
        const container = document.getElementById('contenedor-leyes');
        if (!container) return;

        container.innerHTML = `
            <div style="background:#fff; padding:30px; margin-top:30px; text-align:center; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
                <p style="margin:0 0 15px; color:#1b263b;">No se pudieron cargar los artículos.</p>
                <button type="button" onclick="window.location.reload()" style="border:0; border-radius:4px; padding:10px 18px; background:#1b263b; color:#fff; cursor:pointer;">
                    Reintentar
                </button>
            </div>`;
    }

    function executeScriptsSequentially(scripts, index, callback, navigationId) {
        if (navigationId !== activeNavigation) return;

        if (index >= scripts.length) {
            if (callback) callback();
            return;
        }

        const oldScript = scripts[index];
        const src = oldScript.getAttribute('src');
        const dataScriptName = getDataScriptName(src);

        // Evitar recargar las bases de datos gigantes si ya están en memoria (evita SyntaxError de const redeclaration)
        if (dataScriptName && isDataScriptReady(dataScriptName)) {
            console.log(`${dataScriptName}.js ya está cargado en memoria. Omitiendo recarga.`);
            executeScriptsSequentially(scripts, index + 1, callback, navigationId);
            return;
        }

        if (src) {
            oldScript.remove();

            const loadExternalScript = attempt => {
                if (navigationId !== activeNavigation) return;

                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                if (attempt > 0) {
                    const retryUrl = new URL(src, window.location.href);
                    retryUrl.searchParams.set('retry', Date.now().toString());
                    newScript.src = retryUrl.href;
                }

                const handleFailure = () => {
                    newScript.remove();

                    if (dataScriptName && isDataScriptReady(dataScriptName)) {
                        executeScriptsSequentially(scripts, index + 1, callback, navigationId);
                        return;
                    }

                    if (dataScriptName && attempt === 0) {
                        loadExternalScript(1);
                        return;
                    }

                    console.error(`Error cargando el script externo: ${newScript.src}`);
                    if (dataScriptName) {
                        showDataLoadError();
                        return;
                    }

                    executeScriptsSequentially(scripts, index + 1, callback, navigationId);
                };

                newScript.onload = () => {
                    if (dataScriptName && !isDataScriptReady(dataScriptName)) {
                        handleFailure();
                        return;
                    }

                    newScript.remove();
                    executeScriptsSequentially(scripts, index + 1, callback, navigationId);
                };
                newScript.onerror = handleFailure;
                document.body.appendChild(newScript);
            };

            loadExternalScript(0);
        } else {
            const newScript = document.createElement('script');

            if (oldScript.innerHTML) {
                newScript.innerHTML = oldScript.innerHTML;
            }

            // Si es un script inline, se ejecuta de forma síncrona al insertarse
            document.body.appendChild(newScript);
            oldScript.remove();
            newScript.remove(); // Limpieza del DOM inmediata tras ejecución
            // Ejecutar el siguiente script inmediatamente
            executeScriptsSequentially(scripts, index + 1, callback, navigationId);
        }
    }

    // Cargar contenido de la página de forma dinámica
    function loadPage(pathName) {
        const navigationId = ++activeNavigation;

        // Restaurar el scroll del body por si había un modal de curso abierto antes de navegar
        document.body.style.overflow = '';

        // Separar la ruta limpia de los parámetros de consulta y hashes (?class=3, #etc)
        const parts = pathName.split('?');
        const cleanPath = parts[0].split('#')[0];

        let pageName = cleanPath === '/' ? 'home' : cleanPath.replace(/^\//, '').replace(/\.html$/, '');
        if (pageName === 'index') pageName = 'home';
        
        const pageUrl = `/pages/${pageName}.html`;
        const appContent = document.getElementById('app-content');
        
        // Mostrar spinner de carga
        appContent.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; min-height:60vh; color:#1b263b;">
                <i class="fa-solid fa-circle-notch fa-spin fa-3x"></i>
            </div>`;
        
        fetch(pageUrl)
            .then(response => {
                if (!response.ok) throw new Error('Página no encontrada');
                return response.text();
            })
            .then(html => {
                if (navigationId !== activeNavigation) return;

                appContent.innerHTML = html;
                
                // Extraer y ejecutar las etiquetas <script> del HTML cargado secuencialmente
                const scripts = Array.from(appContent.querySelectorAll('script'));
                
                executeScriptsSequentially(scripts, 0, () => {
                    // Re-enlazar clicks en el nuevo contenido inyectado
                    bindLinks();
                    // Desplazarse al inicio de la página con suavidad
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, navigationId);
            })
            .catch(err => {
                if (navigationId !== activeNavigation) return;

                console.error('Error cargando la página:', err);
                appContent.innerHTML = `
                    <div style="padding: 50px; text-align: center; font-family: 'Roboto', sans-serif;">
                        <h2 style="color: #1b263b;">¡Ups! Página no encontrada</h2>
                        <p style="color: #666; margin-top: 10px;">No se pudo cargar el contenido de la página solicitada.</p>
                        <a href="/" style="display:inline-block; margin-top:20px; background:#1b263b; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px; font-weight:bold;">Volver al Inicio</a>
                    </div>`;
                bindLinks();
            });
    }

    // Manejar botones de atrás/adelante del navegador
    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname);
    });

    // Inicializar SPA
    bindLinks();
    loadPage(window.location.pathname);
});
