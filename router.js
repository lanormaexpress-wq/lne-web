document.addEventListener('DOMContentLoaded', () => {
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
    function executeScriptsSequentially(scripts, index, callback) {
        if (index >= scripts.length) {
            if (callback) callback();
            return;
        }

        const oldScript = scripts[index];
        const src = oldScript.getAttribute('src');

        // Evitar recargar las bases de datos gigantes si ya están en memoria (evita SyntaxError de const redeclaration)
        if (src) {
            if (src.endsWith('civil.js') && typeof CodigoCivil !== 'undefined') {
                console.log('civil.js ya está cargado en memoria. Omitiendo recarga.');
                executeScriptsSequentially(scripts, index + 1, callback);
                return;
            }
            if (src.endsWith('penal.js') && typeof CodigoPenal !== 'undefined') {
                console.log('penal.js ya está cargado en memoria. Omitiendo recarga.');
                executeScriptsSequentially(scripts, index + 1, callback);
                return;
            }
            if (src.endsWith('constitucion.js') && typeof Constitucion !== 'undefined') {
                console.log('constitucion.js ya está cargado en memoria. Omitiendo recarga.');
                executeScriptsSequentially(scripts, index + 1, callback);
                return;
            }
        }

        const newScript = document.createElement('script');

        // Copiar todos los atributos (src, type, etc.)
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        // Copiar contenido inline si lo hay
        if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
        }

        // Si es un script externo con src, debemos esperar a que se cargue e instancie antes de continuar
        if (newScript.src) {
            newScript.onload = () => {
                newScript.remove(); // Limpieza del DOM
                executeScriptsSequentially(scripts, index + 1, callback);
            };
            newScript.onerror = () => {
                console.error(`Error cargando el script externo: ${newScript.src}`);
                newScript.remove(); // Limpieza del DOM
                executeScriptsSequentially(scripts, index + 1, callback);
            };
            document.body.appendChild(newScript);
            oldScript.remove();
        } else {
            // Si es un script inline, se ejecuta de forma síncrona al insertarse
            document.body.appendChild(newScript);
            oldScript.remove();
            newScript.remove(); // Limpieza del DOM inmediata tras ejecución
            // Ejecutar el siguiente script inmediatamente
            executeScriptsSequentially(scripts, index + 1, callback);
        }
    }

    // Cargar contenido de la página de forma dinámica
    function loadPage(pathName) {
        // Restaurar el scroll del body por si había un modal de curso abierto antes de navegar
        document.body.style.overflow = '';

        let pageName = pathName === '/' ? 'home' : pathName.replace(/^\//, '').replace(/\.html$/, '');
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
                appContent.innerHTML = html;
                
                // Extraer y ejecutar las etiquetas <script> del HTML cargado secuencialmente
                const scripts = Array.from(appContent.querySelectorAll('script'));
                
                executeScriptsSequentially(scripts, 0, () => {
                    // Re-enlazar clicks en el nuevo contenido inyectado
                    bindLinks();
                    // Desplazarse al inicio de la página con suavidad
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            })
            .catch(err => {
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
