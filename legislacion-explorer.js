(function () {
    const CATEGORY_ORDER = [
        'Códigos',
        'Procesal',
        'Penal',
        'Civil y comercial',
        'Laboral',
        'Tributario y administrativo',
        'Niñez y familia',
        'Otras normas'
    ];

    const PLACEHOLDER_TERMS = [
        'Buscar ley...',
        'Buscar Decreto Legislativo...',
        'Buscar código...'
    ];

    const STATIC_PLACEHOLDER = 'Buscar norma...';
    let overlay;
    let input;
    let categorySelect;
    let results;
    let emptyState;
    let placeholderTimer;
    let placeholderTermIndex = 0;
    let placeholderCharacterIndex = 0;
    let isDeletingPlaceholder = false;
    let previousBodyOverflow = '';

    function normalize(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getAvailableNormas() {
        return window.LNENormas.all.filter(norma => !norma.featured);
    }

    function clearPlaceholderTimer() {
        window.clearTimeout(placeholderTimer);
        placeholderTimer = undefined;
    }

    function usesReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function runPlaceholderAnimation() {
        clearPlaceholderTimer();

        if (!input || input === document.activeElement || input.value || usesReducedMotion()) {
            if (input && usesReducedMotion()) input.placeholder = STATIC_PLACEHOLDER;
            return;
        }

        const term = PLACEHOLDER_TERMS[placeholderTermIndex];

        if (!isDeletingPlaceholder) {
            placeholderCharacterIndex += 1;
            input.placeholder = term.slice(0, placeholderCharacterIndex);

            if (placeholderCharacterIndex === term.length) {
                isDeletingPlaceholder = true;
                placeholderTimer = window.setTimeout(runPlaceholderAnimation, 1450);
                return;
            }

            placeholderTimer = window.setTimeout(runPlaceholderAnimation, 76);
            return;
        }

        placeholderCharacterIndex -= 1;
        input.placeholder = term.slice(0, placeholderCharacterIndex);

        if (placeholderCharacterIndex === 0) {
            isDeletingPlaceholder = false;
            placeholderTermIndex = (placeholderTermIndex + 1) % PLACEHOLDER_TERMS.length;
            placeholderTimer = window.setTimeout(runPlaceholderAnimation, 360);
            return;
        }

        placeholderTimer = window.setTimeout(runPlaceholderAnimation, 45);
    }

    function restartPlaceholderAnimation() {
        clearPlaceholderTimer();
        placeholderTermIndex = 0;
        placeholderCharacterIndex = 0;
        isDeletingPlaceholder = false;

        if (!input || input === document.activeElement || input.value) return;

        if (usesReducedMotion()) {
            input.placeholder = STATIC_PLACEHOLDER;
            return;
        }

        input.placeholder = '';
        placeholderTimer = window.setTimeout(runPlaceholderAnimation, 420);
    }

    function normaMatches(norma, query, category) {
        if (category && norma.category !== category) return false;
        if (!query) return true;

        const searchableText = [
            norma.title,
            norma.menuLabel,
            ...(norma.aliases || [])
        ].join(' ');

        return normalize(searchableText).includes(query);
    }

    function renderResults() {
        const normas = getAvailableNormas();
        const query = normalize(input.value);
        const selectedCategory = categorySelect.value;
        const matches = normas.filter(norma => normaMatches(norma, query, selectedCategory));

        results.replaceChildren();

        matches.forEach(norma => {
            const card = document.createElement('a');
            const icon = document.createElement('i');
            const label = document.createElement('span');

            card.className = 'legislation-norma-card';
            card.href = norma.url;
            card.setAttribute('aria-label', `Abrir ${norma.title}`);
            card.addEventListener('click', close);

            icon.className = `fa-solid ${norma.icon || 'fa-book'}`;
            icon.setAttribute('aria-hidden', 'true');
            label.textContent = norma.menuLabel || norma.title;

            card.append(icon, label);
            results.appendChild(card);
        });

        const hasAvailableNormas = normas.length > 0;
        emptyState.hidden = matches.length > 0;
        emptyState.textContent = hasAvailableNormas
            ? 'No se encontraron normas con esos criterios.'
            : 'Las demás normas disponibles aparecerán aquí automáticamente.';
    }

    function populateCategories() {
        const availableCategories = new Set(getAvailableNormas().map(norma => norma.category).filter(Boolean));
        const selectedCategory = categorySelect.value;

        categorySelect.replaceChildren();
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'Todas las categorías';
        categorySelect.appendChild(allOption);

        CATEGORY_ORDER.filter(category => availableCategories.has(category)).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        categorySelect.value = availableCategories.has(selectedCategory) ? selectedCategory : '';
    }

    function closeDropdown() {
        const menu = document.getElementById('legislacion-menu');
        menu?.closest('.dropdown')?.classList.remove('legislation-dropdown-open');
        menu?.closest('.dropdown')?.querySelector('.dropbtn')?.setAttribute('aria-expanded', 'false');
        if (menu) menu.style.display = 'none';
    }

    function restoreDropdown() {
        const menu = document.getElementById('legislacion-menu');
        if (menu) menu.style.removeProperty('display');
    }

    function open() {
        if (!overlay) return;

        closeDropdown();
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        overlay.hidden = false;
        populateCategories();
        renderResults();
        restartPlaceholderAnimation();
    }

    function close() {
        if (!overlay || overlay.hidden) return;

        clearPlaceholderTimer();
        overlay.hidden = true;
        document.body.style.overflow = previousBodyOverflow;
        restoreDropdown();
    }

    function buildExplorer() {
        overlay = document.createElement('section');
        overlay.id = 'legislation-explorer';
        overlay.className = 'legislation-explorer-overlay';
        overlay.hidden = true;
        overlay.setAttribute('aria-labelledby', 'legislation-explorer-title');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('role', 'dialog');

        const dialog = document.createElement('div');
        dialog.className = 'legislation-explorer-dialog';

        const header = document.createElement('div');
        header.className = 'legislation-explorer-header';
        const titleGroup = document.createElement('div');
        const title = document.createElement('h2');
        const subtitle = document.createElement('p');
        const closeButton = document.createElement('button');

        title.id = 'legislation-explorer-title';
        title.textContent = 'Explorar legislación';
        subtitle.textContent = 'Consulta y encuentra otras normas disponibles.';
        closeButton.type = 'button';
        closeButton.className = 'legislation-explorer-close';
        closeButton.setAttribute('aria-label', 'Cerrar explorador de legislación');
        closeButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
        closeButton.addEventListener('click', close);

        titleGroup.append(title, subtitle);
        header.append(titleGroup, closeButton);

        const controls = document.createElement('div');
        controls.className = 'legislation-explorer-controls';
        input = document.createElement('input');
        categorySelect = document.createElement('select');

        input.type = 'search';
        input.className = 'legislation-explorer-search';
        input.autocomplete = 'off';
        input.setAttribute('aria-label', 'Buscar norma disponible');
        categorySelect.className = 'legislation-explorer-category';
        categorySelect.setAttribute('aria-label', 'Filtrar por categoría');

        input.addEventListener('focus', () => {
            clearPlaceholderTimer();
            input.placeholder = STATIC_PLACEHOLDER;
        });
        input.addEventListener('input', () => {
            clearPlaceholderTimer();
            renderResults();
        });
        input.addEventListener('blur', restartPlaceholderAnimation);
        categorySelect.addEventListener('change', renderResults);

        controls.append(input, categorySelect);

        results = document.createElement('div');
        results.className = 'legislation-norma-grid';

        emptyState = document.createElement('p');
        emptyState.className = 'legislation-explorer-empty';
        emptyState.setAttribute('role', 'status');

        const resultsRegion = document.createElement('div');
        resultsRegion.className = 'legislation-explorer-results';
        resultsRegion.append(results, emptyState);

        dialog.append(header, controls, resultsRegion);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', event => {
            if (event.target === overlay) close();
        });

        document.addEventListener('click', event => {
            if (event.target.closest('[data-open-legislation-explorer]')) {
                event.preventDefault();
                open();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') close();
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        buildExplorer();
    });

    window.LNELegislationExplorer = Object.freeze({ open, close });
})();
