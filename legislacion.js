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

    function renderIntroduction(container, norma) {
        if (!norma.introduction && !norma.image) {
            container.replaceChildren();
            return;
        }

        const introContainer = document.createElement('div');
        introContainer.className = 'intro-container';

        if (norma.introduction) {
            const introText = document.createElement('div');
            introText.className = 'intro-text';

            const title = document.createElement('h1');
            title.className = 'intro-titulo';
            title.textContent = norma.title;

            const paragraph = document.createElement('p');
            paragraph.className = 'intro-parrafo';
            paragraph.textContent = norma.introduction;

            introText.append(title, paragraph);
            introContainer.appendChild(introText);
        }

        if (norma.image) {
            const image = document.createElement('img');
            image.src = norma.image.src;
            image.alt = norma.image.alt || norma.title;
            image.className = norma.image.className || '';
            introContainer.appendChild(image);
        }

        container.replaceChildren(introContainer);
    }

    function renderArticles(container, norma, sections) {
        let htmlFinal = `
            <div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
                <div style="text-align: center; margin-bottom: 50px;">
                    <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #1b263b; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 15px; display: inline-block; width: 80%;">
                        ${norma.documentHeading || norma.title}
                    </h1>
                </div>
        `;

        sections.forEach(section => {
            if (section.nuevaHoja) {
                htmlFinal += `</div>`;
                htmlFinal += `<div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 50px;">`;
            }

            htmlFinal += `
                <h2 style="text-align: center; font-weight: bold; text-transform: uppercase; margin-top: 40px; margin-bottom: 15px; color: #1b263b;">${section.titulo || ''}</h2>
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

    function initializeSearch(container) {
        const input = document.getElementById('inputBuscadorFlotante');
        const counter = document.getElementById('contadorMatches');
        const previousButton = document.getElementById('btnNavegarArriba');
        const nextButton = document.getElementById('btnNavegarAbajo');

        if (!input || !counter || !previousButton || !nextButton || typeof window.Mark !== 'function') return;

        const markInstance = new window.Mark(container);
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
        const existingData = window.LNENormas.captureData(norma);
        if (existingData) return existingData;

        await loadScript(norma.contentScript, () => Boolean(window.LNENormas.captureData(norma)));
        return window.LNENormas.captureData(norma);
    }

    async function mount() {
        const norma = window.LNEActiveNorm;
        const introMount = document.getElementById('norma-introduccion');
        const articlesMount = document.getElementById('contenedor-leyes');

        if (!norma || !introMount || !articlesMount) return;

        renderIntroduction(introMount, norma);

        try {
            await Promise.all([
                loadNormData(norma),
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js', () => typeof window.Mark === 'function')
            ]);

            if (!articlesMount.isConnected || window.LNEActiveNorm !== norma) return;

            const sections = window.LNENormas.captureData(norma);
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
