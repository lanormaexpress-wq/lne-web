document.addEventListener('DOMContentLoaded', async () => {
    let activeNavigation = 0;
    let initialPage;
    try { initialPage = JSON.parse(document.getElementById('lne-bootstrap')?.textContent || 'null'); } catch (_) { /* Offline shell. */ }

    function hydratePage(route, bootstrap) {
        window.LNEActiveNorm = route.norma;
        window.LNEActiveCourse = route.course || null;
        window.LNEActiveFormationArea = route.area || null;
        if (bootstrap.pageName === 'codigo') window.LNELegislacion.mount({ hydrate: true });
        if (bootstrap.pageName === 'formacion') window.LNEFormacionUI.mountDirectory({ hydrate: true });
        if (bootstrap.pageName === 'curso') window.LNEFormacionUI.mountCourse({ topics: bootstrap.courseTopics });
        if (bootstrap.pageName === 'home') {
            const script = document.createElement('script');
            script.src = '/home-search.js?v=3';
            script.onload = () => script.remove();
            document.body.appendChild(script);
        }
        bindLinks();
    }

    function resolvePage(pathName) {
        const cleanPath = window.LNENormas.normalizePath(pathName);
        const norma = window.LNENormas.getByPath(cleanPath);

        if (norma) {
            return { pageName: 'codigo', norma, canonicalUrl: norma.url };
        }

        const course = window.LNEFormacion.getCourseByPath(cleanPath);
        if (course) {
            return { pageName: 'curso', norma: null, course, area: null, canonicalUrl: course.route };
        }

        const area = window.LNEFormacion.getAreaByPath(cleanPath);
        if (area) {
            return { pageName: 'formacion', norma: null, course: null, area, canonicalUrl: area.route };
        }

        if (cleanPath.toLowerCase() === '/formacion') {
            return { pageName: 'formacion', norma: null, course: null, area: null, canonicalUrl: '/formacion' };
        }

        let pageName = cleanPath === '/' ? 'home' : cleanPath.replace(/^\//, '').replace(/\.html$/, '');
        if (pageName === 'index') pageName = 'home';
        if (pageName === 'home') return { pageName, norma: null, course: null, area: null, canonicalUrl: '/' };
        return { pageName, norma: null, course: null, area: null, canonicalUrl: cleanPath };
    }

    function navigate(targetPath) {
        const targetUrl = new URL(targetPath, document.baseURI);
        const route = resolvePage(targetUrl.pathname);
        // Standalone legal/material URLs have real server content and status.
        if (/\/(?:articulo|tema|resumen)\//.test(targetUrl.pathname)
            || targetUrl.pathname === '/legislacion' || targetUrl.searchParams.has('art')
            || !['home', 'codigo', 'curso', 'formacion'].includes(route.pageName)) {
            window.location.assign(targetUrl.href);
            return;
        }
        const destination = `${route.canonicalUrl}${targetUrl.search}${targetUrl.hash}`;
        const sameCourse = route.course && window.location.pathname === route.course.route && window.LNEActiveCourseTopics && document.getElementById('formacion-course-content');
        history.pushState(null, '', destination);
        if (sameCourse) {
            window.LNEFormacionUI.mountCourse({ topics: window.LNEActiveCourseTopics });
            return;
        }
        loadPage(destination);
    }

    function getCourseUrl(courseId) {
        return window.LNEFormacion.getCourseById(courseId)?.route || `/formacion/${courseId}`;
    }

    function renderLegislationMenu() {
        const menu = document.getElementById('legislacion-menu');
        if (!menu) return;

        const featuredNormas = window.LNENormas.all
            .filter(norma => norma.featured)
            .sort((first, second) => (first.featuredOrder || 0) - (second.featuredOrder || 0));

        const featuredLinks = featuredNormas.map(norma => {
            const link = document.createElement('a');
            link.href = norma.url;
            link.textContent = norma.menuLabel || norma.title;
            return link;
        });

        const explorerButton = document.createElement('button');
        explorerButton.type = 'button';
        explorerButton.className = 'legislation-explorer-menu-link';
        explorerButton.dataset.openLegislationExplorer = 'true';
        explorerButton.innerHTML = '<i class="fa-solid fa-grid-2" aria-hidden="true"></i> Explorar legislación';

        menu.replaceChildren(...featuredLinks, explorerButton);
    }

    function bindLegislationMenuToggle() {
        const menu = document.getElementById('legislacion-menu');
        const dropdown = menu?.closest('.dropdown');
        const trigger = dropdown?.querySelector('.dropbtn');
        if (!dropdown || !trigger || trigger.dataset.lneLegislationBound) return;

        trigger.dataset.lneLegislationBound = 'true';
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');

        trigger.addEventListener('click', event => {
            event.stopPropagation();
            const isOpen = dropdown.classList.toggle('legislation-dropdown-open');
            trigger.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', event => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('legislation-dropdown-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                dropdown.classList.remove('legislation-dropdown-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function renderFormationMenu() {
        const menu = document.getElementById('formacion-menu');
        if (!menu) return;

        menu.replaceChildren(...window.LNEFormacion.areas.map(area => {
            const link = document.createElement('a');
            link.href = area.route;
            link.textContent = area.name;
            return link;
        }));
    }

    // Interceptar clicks en enlaces para la navegación SPA
    function bindLinks() {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            // Topic cards keep their native SEO URL; their own handler opens
            // the existing course modal after the initial markup is bound.
            if (link.matches('.formacion-topic-card[data-topic-id]')) return;
            const href = link.getAttribute('href');
            if (href && !link.dataset.lneRouterBound) {
                const targetUrl = new URL(href, document.baseURI);
                const isInternal = targetUrl.origin === window.location.origin;
                const isRoutable = href.endsWith('.html') || href === 'index.html' || href === '/' || href.startsWith('/');

                if (isInternal && isRoutable) {
                    link.dataset.lneRouterBound = 'true';
                    link.addEventListener('click', e => {
                        if (e.defaultPrevented) return;
                        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                        if (link.target && link.target !== '_self') return;

                        e.preventDefault();
                        navigate(href);
                    });
                }
            }
        });
    }

    // Ejecutar scripts de forma secuencial respetando el orden y la carga de archivos externos
    function executeScriptsSequentially(scripts, index, callback, navigationId) {
        if (navigationId !== activeNavigation) return;

        if (index >= scripts.length) {
            if (callback) callback();
            return;
        }

        const oldScript = scripts[index];
        const src = oldScript.getAttribute('src');

        if (src) {
            oldScript.remove();
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });

            newScript.onload = () => {
                newScript.remove();
                executeScriptsSequentially(scripts, index + 1, callback, navigationId);
            };
            newScript.onerror = () => {
                console.error(`Error cargando el script externo: ${newScript.src}`);
                newScript.remove();
                executeScriptsSequentially(scripts, index + 1, callback, navigationId);
            };
            document.body.appendChild(newScript);
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
        document.documentElement.dataset.lneDocument = 'false';

        // Restaurar el scroll del body por si había un modal de curso abierto antes de navegar
        if (window.LNEHomeSearchController) {
            window.LNEHomeSearchController.abort();
            window.LNEHomeSearchController = null;
        }
        if (window.LNEFormacionUI) window.LNEFormacionUI.unmount();
        document.body.style.overflow = '';

        // Separar la ruta limpia de los parámetros de consulta y hashes (?class=3, #etc)
        const parts = pathName.split('?');
        const cleanPath = parts[0].split('#')[0];

        const route = resolvePage(cleanPath);
        window.LNEActiveNorm = route.norma;
        window.LNEActiveCourse = route.course || null;
        window.LNEActiveFormationArea = route.area || null;

        const pageUrl = route.pageName === 'home'
            ? '/pages/home.html?v=3'
            : `/pages/${route.pageName}.html`;
        const appContent = document.getElementById('app-content');

        // Keep the current page while obtaining the next server presentation.
        // The offline shell still uses its existing cached fragments.
        const serverPage = Boolean(initialPage);
        if (!serverPage) window.LNESEO?.update(pathName);
        fetch(serverPage ? pathName : pageUrl)
            .then(response => {
                if (!response.ok && !serverPage) throw new Error('Página no encontrada');
                return response.text();
            })
            .then(html => {
                if (navigationId !== activeNavigation) return;

                if (serverPage) {
                    const parsed = new DOMParser().parseFromString(html, 'text/html');
                    const content = parsed.getElementById('app-content');
                    const metadata = JSON.parse(parsed.getElementById('lne-seo-data')?.textContent || 'null');
                    const bootstrap = JSON.parse(parsed.getElementById('lne-bootstrap')?.textContent || 'null');
                    if (!content || !metadata) throw new Error('Respuesta de página inválida');
                    window.LNESEO?.apply(metadata);
                    document.documentElement.dataset.lneDocument = String(Boolean(metadata.standalone));
                    appContent.innerHTML = content.innerHTML;
                    if (bootstrap) hydratePage(resolvePage(cleanPath), bootstrap);
                    bindLinks();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

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
        loadPage(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    });

    window.LNERouter = Object.freeze({ navigate, getCourseUrl });

    renderLegislationMenu();
    bindLegislationMenuToggle();
    renderFormationMenu();
    bindLinks();
    window.LNEDynamicLegislation?.ready.then(() => { renderLegislationMenu(); bindLinks(); });
    if (initialPage?.path === window.location.pathname) {
        window.LNESEO?.update(`${window.location.pathname}${window.location.search}`);
        hydratePage(resolvePage(window.location.pathname), initialPage);
    } else if (document.documentElement.dataset.lneDocument !== 'true') {
        await window.LNEDynamicLegislation?.ready;
        loadPage(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    }
});
