(function () {
    const scriptPromises = new Map();

    function loadScript(src, isReady) {
        if (isReady()) return Promise.resolve();
        if (scriptPromises.has(src)) return scriptPromises.get(src);

        const promise = new Promise((resolve, reject) => {
            const tryLoad = attempt => {
                const script = document.createElement('script');
                const scriptUrl = new URL(src, window.location.origin);

                if (attempt > 0) {
                    scriptUrl.searchParams.set('retry', Date.now().toString());
                }

                script.src = scriptUrl.href;
                script.onload = () => {
                    script.remove();
                    if (isReady()) {
                        resolve();
                    } else if (attempt === 0) {
                        tryLoad(1);
                    } else {
                        reject(new Error(`El script ${src} se cargó sin exponer los datos esperados.`));
                    }
                };
                script.onerror = () => {
                    script.remove();
                    if (attempt === 0) {
                        tryLoad(1);
                    } else {
                        reject(new Error(`No se pudo cargar ${src}.`));
                    }
                };
                document.body.appendChild(script);
            };

            tryLoad(0);
        }).catch(error => {
            scriptPromises.delete(src);
            throw error;
        });

        scriptPromises.set(src, promise);
        return promise;
    }

    function renderPreparingState(container, norma) {
        const state = document.createElement('section');
        const title = document.createElement('h1');
        const message = document.createElement('p');

        state.className = 'norma-preparacion';
        title.textContent = norma.title;
        message.textContent = 'Contenido en preparación';

        state.append(title, message);
        container.replaceChildren(state);
    }

    function getDocumentTitle(norma) {
        if (Object.prototype.hasOwnProperty.call(norma, 'documentTitle')) {
            return norma.documentTitle;
        }

        return norma.documentHeading === false
            ? ''
            : (norma.documentHeading || norma.title);
    }

    function getSectionTitle(norma, title) {
        if (!title || !norma.hideEmbeddedDocumentHeader) return title || '';

        const template = document.createElement('template');
        template.innerHTML = title;
        template.content.querySelectorAll('[data-lne-document-header]').forEach(header => header.remove());
        return template.innerHTML.trim();
    }

    function renderArticles(container, norma, sections) {
        if (window.LNEVisualRenderer) {
            window.LNEVisualRenderer.renderNorm(container, norma, sections);
            return;
        }
        const documentTitle = getDocumentTitle(norma);
        const headingMarkup = documentTitle
            ? `
                <div style="text-align: center; margin-bottom: 50px;">
                    <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #1b263b; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 15px; display: inline-block; width: 80%;">
                        ${documentTitle}
                    </h1>
                </div>`
            : '';
        let htmlFinal = `
            <div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
                ${headingMarkup}
        `;

        sections.forEach(section => {
            if (section.nuevaHoja) {
                htmlFinal += `</div>`;
                htmlFinal += `<div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 50px;">`;
            }

            htmlFinal += `
                <h2 style="text-align: center; font-weight: bold; text-transform: uppercase; margin-top: 40px; margin-bottom: 15px; color: #1b263b;">${getSectionTitle(norma, section.titulo)}</h2>
                <h3 style="text-align: center; font-weight: bold; margin-top: 0; margin-bottom: 40px; color: #1b263b;">${section.capitulo || ''}</h3>
            `;

            if (!Array.isArray(section.articulos)) return;

            section.articulos.forEach(article => {
                const articleTitle = article.titulo ? `.- ${article.titulo}` : '';
                let articleHeading = '';

                if (!article.esDeclaracion) {
                    let keyword = 'Artículo ';
                    if (Object.prototype.hasOwnProperty.call(article, 'tipo')) {
                        keyword = article.tipo !== '' ? `${article.tipo} ` : '';
                    }
                    articleHeading = `<span class="articulo-num" style="font-weight: bold; font-size: 1.1rem; display: block; margin-bottom: 10px; color: #1b263b;">${keyword}${article.numero}${articleTitle}</span>`;
                }

                const divider = article.esDeclaracion ? '' : '<hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;">';
                htmlFinal += `
                    <div class="articulo-contenedor-bloque" data-num="${String(article.numero).toLowerCase()}" style="margin-bottom: 30px; padding: 12px; border-radius: 6px; transition: background-color 0.8s ease;">
                        ${articleHeading}
                        <div class="articulo-texto">${article.texto}</div>
                        ${divider}
                    </div>
                `;
            });
        });

        htmlFinal += '</div>';
        container.innerHTML = htmlFinal;
    }

    function scrollToRequestedArticle(container) {
        const articleNumber = new URLSearchParams(window.location.search).get('art');
        if (!articleNumber) return;

        const normalizedNumber = articleNumber.toLowerCase();
        const target = Array.from(container.querySelectorAll('.articulo-contenedor-bloque'))
            .find(article => article.dataset.num === normalizedNumber);

        if (!target) return;

        target.classList.add('articulo-resaltado-temporal');
        setTimeout(() => {
            if (target.isConnected) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 400);
    }

    function createLocalMarker(container) {
        return {
            unmark() {
                container.querySelectorAll('mark').forEach(mark => {
                    mark.replaceWith(document.createTextNode(mark.textContent));
                });
                container.normalize();
            },
            mark(searchText, { done }) {
                const escapedSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const matcher = new RegExp(escapedSearchText, 'gi');
                const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
                    acceptNode(node) {
                        matcher.lastIndex = 0;
                        return node.parentElement?.closest('mark, script, style') || !matcher.test(node.nodeValue)
                            ? NodeFilter.FILTER_REJECT
                            : NodeFilter.FILTER_ACCEPT;
                    }
                });
                const textNodes = [];
                let node;

                while ((node = walker.nextNode())) textNodes.push(node);

                textNodes.forEach(textNode => {
                    const fragment = document.createDocumentFragment();
                    const text = textNode.nodeValue;
                    let cursor = 0;
                    let match;

                    matcher.lastIndex = 0;
                    while ((match = matcher.exec(text))) {
                        fragment.append(document.createTextNode(text.slice(cursor, match.index)));
                        const mark = document.createElement('mark');
                        mark.textContent = match[0];
                        fragment.append(mark);
                        cursor = match.index + match[0].length;
                    }
                    fragment.append(document.createTextNode(text.slice(cursor)));
                    textNode.replaceWith(fragment);
                });

                done();
            }
        };
    }

    function initializeSearch(container) {
        const input = document.getElementById('inputBuscadorFlotante');
        const counter = document.getElementById('contadorMatches');
        const previousButton = document.getElementById('btnNavegarArriba');
        const nextButton = document.getElementById('btnNavegarAbajo');

        if (!input || !counter || !previousButton || !nextButton) return;

        const markInstance = typeof window.Mark === 'function'
            ? new window.Mark(container)
            : createLocalMarker(container);
        let results = [];
        let currentIndex = -1;
        let searchTimeout = null;

        function resetMark() {
            markInstance.unmark();
            results = [];
            currentIndex = -1;
            counter.textContent = '';
        }

        function scrollAndHighlight() {
            const totalMatches = results.length;
            if (totalMatches === 0) return;

            results.forEach(element => element.classList.remove('resaltado-activo'));
            const currentMark = results[currentIndex];
            currentMark.classList.add('resaltado-activo');
            currentMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
            counter.textContent = `${currentIndex + 1} of ${totalMatches}`;
        }

        function navigateResults(direction) {
            const totalMatches = results.length;
            if (totalMatches === 0) return;

            if (direction === 'abajo') {
                currentIndex = currentIndex < totalMatches - 1 ? currentIndex + 1 : 0;
            } else {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : totalMatches - 1;
            }
            scrollAndHighlight();
        }

        function executeSearch() {
            resetMark();
            const searchText = input.value.trim();

            if (searchText !== '' && (searchText.length >= 3 || !Number.isNaN(Number(searchText)))) {
                markInstance.mark(searchText, {
                    done() {
                        results = Array.from(container.querySelectorAll('mark'));
                        if (results.length > 0) {
                            currentIndex = 0;
                            scrollAndHighlight();
                        } else {
                            counter.textContent = '0 of 0';
                        }
                    }
                });
            }
        }

        input.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(executeSearch, 300);
        });
        input.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                navigateResults('abajo');
            }
        });
        previousButton.addEventListener('click', () => navigateResults('arriba'));
        nextButton.addEventListener('click', () => navigateResults('abajo'));
    }

    function showLoadError(container) {
        container.innerHTML = `
            <div style="background:#fff; padding:30px; margin-top:30px; text-align:center; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
                <p style="margin:0 0 15px; color:#1b263b;">No se pudieron cargar los artículos.</p>
                <button type="button" onclick="window.location.reload()" style="border:0; border-radius:4px; padding:10px 18px; background:#1b263b; color:#fff; cursor:pointer;">
                    Reintentar
                </button>
            </div>`;
    }

    async function loadNormData(norma) {
        if (window.LNEDynamicLegislation && (norma?.dynamic || norma?.contentScript)) {
            try {
                return await window.LNEDynamicLegislation.load(norma);
            } catch (error) {
                if (!norma.contentScript) throw error;
                console.warn('API jurídica no disponible; se utiliza la fuente estática de respaldo.', error);
            }
        }
        if (!norma?.contentScript) return undefined;

        const existingData = window.LNENormas.captureData(norma);
        if (existingData) return existingData;

        await loadScript(norma.contentScript, () => Boolean(window.LNENormas.captureData(norma)));
        return window.LNENormas.captureData(norma);
    }

    async function mount({ hydrate = false } = {}) {
        const norma = window.LNEActiveNorm;
        const introMount = document.getElementById('norma-introduccion');
        const articlesMount = document.getElementById('contenedor-leyes');

        if (!norma || !introMount || !articlesMount) return;

        if (hydrate) {
            window.LNEIntroductionRenderer.hydrate(introMount);
            scrollToRequestedArticle(articlesMount);
            initializeSearch(articlesMount);
            return;
        }
        window.LNEIntroductionRenderer.render(introMount, norma);

        if (norma.status === 'preparing' || (!norma.dynamic && (!norma.contentScript || !Array.isArray(norma.dataVariables)))) {
            renderPreparingState(articlesMount, norma);
            return;
        }

        try {
            const loadedSections = await loadNormData(norma);

            if (!articlesMount.isConnected || window.LNEActiveNorm !== norma) return;

            const sections = loadedSections;
            if (!Array.isArray(sections)) throw new Error(`No se encontraron datos para ${norma.id}.`);

            renderArticles(articlesMount, norma, sections);
            scrollToRequestedArticle(articlesMount);
            initializeSearch(articlesMount);
        } catch (error) {
            console.error(`Error cargando ${norma.title}:`, error);
            if (articlesMount.isConnected && window.LNEActiveNorm === norma) {
                showLoadError(articlesMount);
            }
        }
    }

    window.LNELegislacion = Object.freeze({ mount, loadNormData });
})();
