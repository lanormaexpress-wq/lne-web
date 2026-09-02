(function () {
    const dataPromises = new Map();
    let activeTopicCleanup = null;
    let mountController = null;

    function beginMount() {
        if (mountController) mountController.abort();
        mountController = new AbortController();
        return mountController.signal;
    }

    function unmount() {
        if (mountController) {
            mountController.abort();
            mountController = null;
        }
        if (activeTopicCleanup) {
            activeTopicCleanup();
            activeTopicCleanup = null;
        }
        document.body.style.overflow = '';
    }

    function createIcon(iconId, className = '') {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('formacion-icon');
        if (className) svg.classList.add(className);
        svg.setAttribute('viewBox', '0 0 64 64');
        svg.setAttribute('aria-hidden', 'true');

        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', `/assets/iconos/formacion.svg#${iconId}`);
        svg.appendChild(use);
        return svg;
    }

    function fetchWithRetry(url, responseType) {
        const load = attempt => {
            const requestUrl = new URL(url, window.location.origin);
            if (attempt > 0) requestUrl.searchParams.set('retry', Date.now().toString());

            return fetch(requestUrl.href).then(response => {
                if (!response.ok) throw new Error(`No se pudo cargar ${url}.`);
                return responseType === 'text' ? response.text() : response.json();
            }).catch(error => {
                if (attempt === 0) return load(1);
                throw error;
            });
        };

        return load(0);
    }

    function loadCourseTopics(course) {
        if (!course || !course.contentFile) return Promise.resolve([]);
        if (dataPromises.has(course.id)) return dataPromises.get(course.id);

        const promise = fetchWithRetry(course.contentFile, 'json')
            .then(data => Array.isArray(data) ? data : [])
            .catch(error => {
                dataPromises.delete(course.id);
                throw error;
            });

        dataPromises.set(course.id, promise);
        return promise;
    }

    function createCourseCard(course) {
        const card = document.createElement('a');
        card.href = course.route;
        card.className = 'formacion-course-card';
        card.dataset.status = course.status;

        const iconWrap = document.createElement('span');
        iconWrap.className = 'formacion-course-icon';
        iconWrap.appendChild(createIcon(course.icon));

        const name = document.createElement('span');
        name.className = 'formacion-course-name';
        name.textContent = course.name;

        card.append(iconWrap, name);

        if (course.shortDescription) {
            const description = document.createElement('span');
            description.className = 'formacion-course-description';
            description.textContent = course.shortDescription;
            card.appendChild(description);
        }

        if (course.status === 'preparing') {
            const status = document.createElement('span');
            status.className = 'formacion-status';
            status.textContent = 'En preparación';
            card.appendChild(status);
        }

        return card;
    }

    function renderAreaCourses(container, area) {
        const courses = window.LNEFormacion.getCoursesByArea(area.id);
        container.replaceChildren(...courses.map(createCourseCard));
    }

    function mountDirectory() {
        const signal = beginMount();
        const areaGrid = document.getElementById('formacion-area-grid');
        const modal = document.getElementById('formacion-area-modal');
        const modalTitle = document.getElementById('formacion-area-title');
        const modalDescription = document.getElementById('formacion-area-description');
        const modalCourses = document.getElementById('formacion-area-courses');
        const modalClose = document.getElementById('formacion-area-close');

        if (!areaGrid || !modal || !modalTitle || !modalDescription || !modalCourses || !modalClose) return;

        const cards = window.LNEFormacion.areas.map(area => {
            const card = document.createElement('a');
            card.href = area.route;
            card.className = 'formacion-area-card';

            const iconWrap = document.createElement('span');
            iconWrap.className = 'formacion-area-icon';
            iconWrap.appendChild(createIcon(area.icon));

            const title = document.createElement('span');
            title.className = 'formacion-area-name';
            title.textContent = area.name;

            const description = document.createElement('span');
            description.className = 'formacion-area-summary';
            description.textContent = area.description;

            card.append(iconWrap, title, description);
            return card;
        });
        areaGrid.replaceChildren(...cards);

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (window.LNEActiveFormationArea) {
                history.replaceState(null, '', '/formacion');
                window.LNEActiveFormationArea = null;
            }
        };

        modalClose.addEventListener('click', closeModal, { signal });
        modal.addEventListener('click', event => {
            if (event.target === modal) closeModal();
        }, { signal });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
        }, { signal });

        const area = window.LNEActiveFormationArea;
        if (area) {
            modalTitle.textContent = area.name;
            modalDescription.textContent = area.description;
            renderAreaCourses(modalCourses, area);
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function createTopicMedia(topic, course) {
        const media = document.createElement('div');
        media.className = 'formacion-topic-media';

        const placeholder = document.createElement('div');
        placeholder.className = 'formacion-topic-placeholder';
        placeholder.appendChild(createIcon(course.icon));

        const placeholderText = document.createElement('span');
        placeholderText.textContent = topic.imagen ? 'Imagen en preparación' : 'Contenido en preparación';
        placeholder.appendChild(placeholderText);
        media.appendChild(placeholder);

        if (topic.imagen) {
            const image = document.createElement('img');
            image.className = 'formacion-topic-image';
            image.alt = topic.titulo;
            image.addEventListener('load', () => {
                image.classList.add('loaded');
                placeholder.hidden = true;
            }, { once: true });
            image.addEventListener('error', () => {
                image.remove();
                placeholder.hidden = false;
            }, { once: true });
            image.src = topic.imagen;
            media.appendChild(image);
        }

        return media;
    }

    function hasTopicContent(topic) {
        return Boolean(topic.contenido || topic.htmlFile || topic.pdf || (Array.isArray(topic.imagenes) && topic.imagenes.length));
    }

    function createTopicCard(topic, course, index) {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'formacion-topic-card';
        card.style.animationDelay = `${Math.min(index * 0.08, 0.48)}s`;

        const title = document.createElement('span');
        title.className = 'formacion-topic-title';
        title.textContent = topic.titulo;

        card.append(createTopicMedia(topic, course), title);

        if (!hasTopicContent(topic)) {
            const status = document.createElement('span');
            status.className = 'formacion-topic-status';
            status.textContent = 'En preparación';
            card.appendChild(status);
        }

        card.addEventListener('click', () => {
            window.LNERouter.navigate(`${course.route}?class=${encodeURIComponent(topic.id)}`);
        });
        return card;
    }

    function setModalLoading(modalBody) {
        modalBody.innerHTML = `
            <div class="formacion-modal-loading">
                <i class="fa-solid fa-circle-notch fa-spin fa-2x"></i>
                <p>Cargando contenido interactivo...</p>
            </div>`;
    }

    function setSimpleContent(modalBody, topic) {
        modalBody.replaceChildren();

        const header = document.createElement('div');
        header.className = 'curso-modal-header';
        const title = document.createElement('h2');
        title.className = 'curso-modal-title';
        title.textContent = topic.titulo;
        header.appendChild(title);

        const text = document.createElement('p');
        text.className = 'curso-modal-text';
        text.textContent = topic.contenido || 'Contenido en preparación';
        modalBody.append(header, text);

        if (!topic.contenido) text.classList.add('formacion-empty-message');
    }

    function setInteractiveLoadError(modalBody, topic) {
        setSimpleContent(modalBody, topic);
        const warning = document.createElement('p');
        warning.className = 'formacion-interactive-error';
        warning.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> No se pudo cargar la clase detallada interactiva.';
        modalBody.appendChild(warning);
    }

    function renderSlides(modalBody, topic) {
        topic.imagenes.forEach(src => {
            const preloadImage = new Image();
            preloadImage.src = src;
        });

        modalBody.innerHTML = `
            <div class="carrusel-presentacion">
                <button class="btn-expand-pdf" type="button"><i class="fa-solid fa-expand"></i> Expandir</button>
                <button class="btn-carrusel-nav btn-prev" type="button"><i class="fa-solid fa-chevron-left"></i></button>
                <img class="diapositiva-actual" src="${topic.imagenes[0]}" alt="Diapositiva 1">
                <button class="btn-carrusel-nav btn-next" type="button"><i class="fa-solid fa-chevron-right"></i></button>
            </div>`;

        const container = modalBody.querySelector('.carrusel-presentacion');
        const image = modalBody.querySelector('.diapositiva-actual');
        const previous = modalBody.querySelector('.btn-prev');
        const next = modalBody.querySelector('.btn-next');
        const expand = modalBody.querySelector('.btn-expand-pdf');
        let index = 0;

        const update = () => {
            image.src = topic.imagenes[index];
            image.alt = `Diapositiva ${index + 1}`;
            previous.disabled = index === 0;
            next.disabled = index === topic.imagenes.length - 1;
        };
        const onPrevious = () => {
            if (index > 0) {
                index -= 1;
                update();
            }
        };
        const onNext = () => {
            if (index < topic.imagenes.length - 1) {
                index += 1;
                update();
            }
        };
        const onKeydown = event => {
            if (event.key === 'ArrowRight' || event.key === 'Right') onNext();
            if (event.key === 'ArrowLeft' || event.key === 'Left') onPrevious();
        };
        const onExpand = () => {
            if (!document.fullscreenElement) {
                const request = container.requestFullscreen || container.webkitRequestFullscreen || container.msRequestFullscreen;
                if (request) request.call(container);
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        };
        const onFullscreenChange = () => {
            expand.innerHTML = document.fullscreenElement === container
                ? '<i class="fa-solid fa-compress"></i> Contraer'
                : '<i class="fa-solid fa-expand"></i> Expandir';
        };

        previous.addEventListener('click', onPrevious);
        next.addEventListener('click', onNext);
        expand.addEventListener('click', onExpand);
        document.addEventListener('keydown', onKeydown);
        container.addEventListener('fullscreenchange', onFullscreenChange);
        container.addEventListener('webkitfullscreenchange', onFullscreenChange);
        container.addEventListener('msfullscreenchange', onFullscreenChange);
        update();

        activeTopicCleanup = () => {
            document.removeEventListener('keydown', onKeydown);
            container.removeEventListener('fullscreenchange', onFullscreenChange);
            container.removeEventListener('webkitfullscreenchange', onFullscreenChange);
            container.removeEventListener('msfullscreenchange', onFullscreenChange);
        };
    }

    function renderPdf(modalBody, topic) {
        modalBody.innerHTML = `
            <div class="pdf-container">
                <button class="btn-expand-pdf" type="button"><i class="fa-solid fa-expand"></i> Expandir</button>
                <iframe src="${topic.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=Fit" title="${topic.titulo}"></iframe>
            </div>`;

        const container = modalBody.querySelector('.pdf-container');
        const expand = modalBody.querySelector('.btn-expand-pdf');
        expand.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                const request = container.requestFullscreen || container.webkitRequestFullscreen || container.msRequestFullscreen;
                if (request) request.call(container);
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        });
    }

    async function openTopic(modal, modalBody, course, topic) {
        if (activeTopicCleanup) {
            activeTopicCleanup();
            activeTopicCleanup = null;
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (topic.htmlFile) {
            setModalLoading(modalBody);
            try {
                modalBody.innerHTML = await fetchWithRetry(topic.htmlFile, 'text');
            } catch (error) {
                console.error('Error cargando el contenido interactivo:', error);
                setInteractiveLoadError(modalBody, topic);
            }
            return;
        }

        if (Array.isArray(topic.imagenes) && topic.imagenes.length) {
            renderSlides(modalBody, topic);
            return;
        }

        if (topic.pdf) {
            renderPdf(modalBody, topic);
            return;
        }

        setSimpleContent(modalBody, topic);
    }

    function closeTopicModal(modal, course) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (activeTopicCleanup) {
            activeTopicCleanup();
            activeTopicCleanup = null;
        }

        const params = new URLSearchParams(window.location.search);
        if (params.has('class') || params.has('clase')) {
            history.replaceState(null, '', course.route);
        }
    }

    async function mountCourse() {
        const signal = beginMount();
        const course = window.LNEActiveCourse;
        const title = document.getElementById('formacion-course-title');
        const description = document.getElementById('formacion-course-description');
        const content = document.getElementById('formacion-course-content');
        const modal = document.getElementById('formacion-topic-modal');
        const modalBody = document.getElementById('formacion-topic-modal-body');
        const modalClose = document.getElementById('formacion-topic-modal-close');

        if (!course || !title || !description || !content || !modal || !modalBody || !modalClose) return;

        title.textContent = course.name;
        description.textContent = course.courseDescription || course.shortDescription || 'Selecciona un tema para revisar su contenido.';

        modalClose.addEventListener('click', () => closeTopicModal(modal, course), { signal });
        modal.addEventListener('click', event => {
            if (event.target === modal) closeTopicModal(modal, course);
        }, { signal });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && modal.classList.contains('active')) closeTopicModal(modal, course);
        }, { signal });

        content.innerHTML = '<div class="formacion-course-loading"><i class="fa-solid fa-circle-notch fa-spin fa-2x"></i></div>';

        try {
            const topics = await loadCourseTopics(course);
            if (!content.isConnected || window.LNEActiveCourse !== course) return;

            if (!topics.length) {
                content.innerHTML = `
                    <div class="formacion-course-empty">
                        ${createIcon(course.icon).outerHTML}
                        <p>Contenido en preparación</p>
                    </div>`;
                return;
            }

            const grid = document.createElement('div');
            grid.className = 'formacion-topic-grid';
            grid.replaceChildren(...topics.map((topic, index) => createTopicCard(topic, course, index)));
            content.replaceChildren(grid);

            const params = new URLSearchParams(window.location.search);
            const topicId = params.get('class') || params.get('clase');
            if (topicId !== null) {
                const topic = topics.find(item => String(item.id) === topicId);
                if (topic) await openTopic(modal, modalBody, course, topic);
            }
        } catch (error) {
            console.error(`Error cargando ${course.name}:`, error);
            if (content.isConnected && window.LNEActiveCourse === course) {
                content.innerHTML = '<div class="formacion-course-empty"><p>No se pudo cargar el contenido. Intenta nuevamente.</p></div>';
            }
        }
    }

    window.LNEFormacionUI = Object.freeze({ mountDirectory, mountCourse, loadCourseTopics, unmount });
})();
