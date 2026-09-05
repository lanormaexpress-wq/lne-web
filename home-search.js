(function () {
    const GROUPS = [
        { id: 'legislation', label: 'Legislación' },
        { id: 'formation', label: 'Formación jurídica' },
        { id: 'materials', label: 'Resúmenes' }
    ];
    const RESULTS_PER_GROUP = 3;
    const SEARCH_DEBOUNCE_MS = 280;
    const PLACEHOLDER_TERMS = [
        '¿Qué tema legal buscas hoy?',
        'Busca un artículo...',
        'Busca un curso...',
        'Busca un código o una ley...',
        'Busca un resumen...'
    ];
    const STATIC_PLACEHOLDER = 'Buscar en La Norma Express...';

    if (window.LNEHomeSearchController) window.LNEHomeSearchController.abort();
    const controller = new AbortController();
    window.LNEHomeSearchController = controller;
    const { signal } = controller;

    const input = document.getElementById('buscador-principal');
    const suggestionsBox = document.getElementById('buscador-sugerencias');
    const searchButton = document.getElementById('btn-buscar-principal');
    const legislationCards = document.getElementById('legislacion-home-cards');
    if (!input || !suggestionsBox || !searchButton) return;

    let indexPromise;
    let visibleResults = [];
    let activeResultIndex = -1;
    let debounceTimer;
    let placeholderTimer;
    let placeholderTermIndex = 0;
    let placeholderCharacterIndex = 0;
    let deletingPlaceholder = false;
    let searchRequestId = 0;

    function plainText(value) {
        return String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function normalize(value) {
        return plainText(value)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    function isNumericQuery(query) {
        return /^\d+$/.test(query);
    }

    function isEligibleQuery(query) {
        return isNumericQuery(query) || query.length >= 3;
    }

    function hasReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function stopPlaceholderAnimation() {
        window.clearTimeout(placeholderTimer);
        placeholderTimer = undefined;
    }

    function animatePlaceholder() {
        stopPlaceholderAnimation();
        if (signal.aborted || input === document.activeElement || input.value || hasReducedMotion()) {
            if (hasReducedMotion()) input.placeholder = STATIC_PLACEHOLDER;
            return;
        }

        const term = PLACEHOLDER_TERMS[placeholderTermIndex];
        if (!deletingPlaceholder) {
            placeholderCharacterIndex += 1;
            input.placeholder = term.slice(0, placeholderCharacterIndex);
            if (placeholderCharacterIndex === term.length) {
                deletingPlaceholder = true;
                placeholderTimer = window.setTimeout(animatePlaceholder, 1450);
            } else {
                placeholderTimer = window.setTimeout(animatePlaceholder, 76);
            }
            return;
        }

        placeholderCharacterIndex -= 1;
        input.placeholder = term.slice(0, placeholderCharacterIndex);
        if (placeholderCharacterIndex === 0) {
            deletingPlaceholder = false;
            placeholderTermIndex = (placeholderTermIndex + 1) % PLACEHOLDER_TERMS.length;
            placeholderTimer = window.setTimeout(animatePlaceholder, 360);
        } else {
            placeholderTimer = window.setTimeout(animatePlaceholder, 45);
        }
    }

    function restartPlaceholderAnimation() {
        stopPlaceholderAnimation();
        placeholderTermIndex = 0;
        placeholderCharacterIndex = 0;
        deletingPlaceholder = false;
        if (signal.aborted || input === document.activeElement || input.value) return;
        if (hasReducedMotion()) {
            input.placeholder = STATIC_PLACEHOLDER;
            return;
        }
        input.placeholder = '';
        placeholderTimer = window.setTimeout(animatePlaceholder, 420);
    }

    function renderHomeCards() {
        if (!legislationCards) return;
        window.LNENormas.all.forEach(norma => {
            if (!norma.homeCard) return;
            const card = document.createElement('a');
            card.href = norma.url;
            card.className = 'card';
            card.style.cssText = 'text-decoration: none; color: inherit; display: block;';
            card.innerHTML = `
                <img src="${norma.homeCard.image}" alt="${norma.homeCard.imageAlt}" class="icono-rama">
                <h3>${norma.homeCard.title}</h3>
                <p>${norma.homeCard.description}</p>`;
            legislationCards.appendChild(card);
        });
    }

    function loadIndex() {
        if (!indexPromise) {
            indexPromise = fetch('/data/search-index.json?v=1', { signal })
                .then(response => {
                    if (!response.ok) throw new Error('No se pudo cargar el índice de búsqueda.');
                    return response.json();
                })
                .catch(error => {
                    indexPromise = undefined;
                    if (error.name === 'AbortError') return null;
                    return null;
                });
        }
        return indexPromise;
    }

    function scoreText(value, query) {
        const normalizedValue = normalize(value);
        if (!normalizedValue) return Number.POSITIVE_INFINITY;
        if (normalizedValue === query) return 0;
        if (normalizedValue.startsWith(query)) return 20 + normalizedValue.length;
        if (normalizedValue.split(' ').some(word => word.startsWith(query))) return 50 + normalizedValue.length;
        if (normalizedValue.includes(query)) return 100 + normalizedValue.indexOf(query);
        return Number.POSITIVE_INFINITY;
    }

    function matchingTextIds(index, query) {
        const queryWords = query.split(' ').filter(word => word.length >= 3);
        if (!queryWords.length) return new Set();

        const wordMatches = queryWords.map(word => {
            const ids = new Set();
            Object.keys(index.terms).forEach(term => {
                if (term === word || term.startsWith(word) || term.includes(word)) {
                    index.terms[term].forEach(id => ids.add(id));
                }
            });
            return ids;
        });

        return wordMatches.reduce((shared, ids) => {
            return new Set([...shared].filter(id => ids.has(id)));
        });
    }

    function scoreEntry(entry, query, contentMatch) {
        if (isNumericQuery(query)) {
            if (entry.k === 'norma' && (entry.u || []).includes(query)) return 0;
            if (entry.k === 'article' && entry.n === query) return 10;
            if (entry.k === 'article' && String(entry.n || '').startsWith(`${query}-`)) return 30;
            if ((entry.u || []).some(number => number.startsWith(query))) return 45;
            return contentMatch ? 500 : Number.POSITIVE_INFINITY;
        }

        const titleScore = scoreText(entry.t, query);
        if (Number.isFinite(titleScore)) return titleScore;
        const parentScore = Math.min(scoreText(entry.d, query), scoreText(entry.p, query));
        if (Number.isFinite(parentScore)) return 200 + parentScore;
        return contentMatch ? 500 : Number.POSITIVE_INFINITY;
    }

    function formatResult(entry) {
        if (entry.k === 'article') {
            return `Art. ${entry.n} · ${entry.d}${entry.t ? ` · ${entry.t}` : ''}`;
        }
        return entry.p ? `${entry.t} · ${entry.p}` : entry.t;
    }

    async function findResults(rawQuery) {
        const query = normalize(rawQuery);
        if (!isEligibleQuery(query)) return [];

        const index = await loadIndex();
        if (!index || signal.aborted) return [];

        const contentMatches = isNumericQuery(query)
            ? new Set((index.terms[query] || []))
            : matchingTextIds(index, query);

        const groups = Object.fromEntries(GROUPS.map(group => [group.id, []]));
        index.entries.forEach((entry, entryIndex) => {
            const score = scoreEntry(entry, query, contentMatches.has(entryIndex));
            if (!Number.isFinite(score) || !groups[entry.g]) return;
            groups[entry.g].push({ entry, score });
        });

        return GROUPS.map(group => ({
            ...group,
            results: groups[group.id]
                .sort((first, second) => first.score - second.score || String(first.entry.t).localeCompare(String(second.entry.t), 'es', { sensitivity: 'base' }))
                .slice(0, RESULTS_PER_GROUP)
                .map(item => item.entry)
        })).filter(group => group.results.length);
    }

    function hideSuggestions() {
        visibleResults = [];
        activeResultIndex = -1;
        suggestionsBox.replaceChildren();
        suggestionsBox.style.display = 'none';
        input.setAttribute('aria-expanded', 'false');
        input.removeAttribute('aria-activedescendant');
    }

    function updateActiveResult(nextIndex) {
        const rows = Array.from(suggestionsBox.querySelectorAll('.sugerencia-item'));
        if (!rows.length) {
            activeResultIndex = -1;
            return;
        }

        activeResultIndex = (nextIndex + rows.length) % rows.length;
        rows.forEach((row, index) => {
            const isActive = index === activeResultIndex;
            row.classList.toggle('is-active', isActive);
            row.setAttribute('aria-selected', String(isActive));
        });
        input.setAttribute('aria-activedescendant', rows[activeResultIndex].id);
    }

    function openResult(item) {
        if (!item) return;
        input.value = '';
        hideSuggestions();
        window.LNERouter.navigate(item.r);
    }

    function renderSuggestions(groups) {
        visibleResults = groups.flatMap(group => group.results);
        activeResultIndex = -1;
        suggestionsBox.replaceChildren();
        if (!visibleResults.length) {
            hideSuggestions();
            return;
        }

        let resultIndex = 0;
        groups.forEach(group => {
            const block = document.createElement('section');
            block.className = 'sugerencia-grupo';
            const heading = document.createElement('p');
            heading.className = 'sugerencia-grupo-titulo';
            heading.textContent = group.label;
            block.appendChild(heading);

            group.results.forEach(item => {
                const rowIndex = resultIndex;
                const row = document.createElement('button');
                row.type = 'button';
                row.id = `buscador-opcion-${rowIndex}`;
                row.className = 'sugerencia-item';
                row.setAttribute('role', 'option');
                row.setAttribute('aria-selected', 'false');
                row.textContent = formatResult(item);
                row.title = row.textContent;
                row.addEventListener('mouseenter', () => updateActiveResult(rowIndex), { signal });
                row.addEventListener('click', () => openResult(item), { signal });
                block.appendChild(row);
                resultIndex += 1;
            });
            suggestionsBox.appendChild(block);
        });

        suggestionsBox.style.display = 'block';
        input.setAttribute('aria-expanded', 'true');
    }

    async function refreshSuggestions() {
        const requestId = ++searchRequestId;
        const groups = await findResults(input.value);
        if (signal.aborted || requestId !== searchRequestId) return;
        renderSuggestions(groups);
    }

    async function openFirstResult() {
        const groups = await findResults(input.value);
        const firstResult = groups.flatMap(group => group.results)[0];
        if (firstResult) openResult(firstResult);
    }

    renderHomeCards();
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', 'buscador-sugerencias');
    input.setAttribute('aria-expanded', 'false');
    suggestionsBox.setAttribute('role', 'listbox');
    restartPlaceholderAnimation();

    input.addEventListener('focus', () => {
        stopPlaceholderAnimation();
        input.placeholder = STATIC_PLACEHOLDER;
        if (isEligibleQuery(normalize(input.value))) refreshSuggestions();
    }, { signal });

    input.addEventListener('blur', restartPlaceholderAnimation, { signal });

    input.addEventListener('input', () => {
        stopPlaceholderAnimation();
        window.clearTimeout(debounceTimer);
        const query = normalize(input.value);
        if (!isEligibleQuery(query)) {
            hideSuggestions();
            return;
        }
        debounceTimer = window.setTimeout(refreshSuggestions, SEARCH_DEBOUNCE_MS);
    }, { signal });

    input.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!visibleResults.length && isEligibleQuery(normalize(input.value))) refreshSuggestions();
            if (visibleResults.length) updateActiveResult(activeResultIndex + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!visibleResults.length && isEligibleQuery(normalize(input.value))) refreshSuggestions();
            if (visibleResults.length) updateActiveResult(activeResultIndex < 0 ? visibleResults.length - 1 : activeResultIndex - 1);
        } else if (event.key === 'Enter' && activeResultIndex >= 0) {
            event.preventDefault();
            openResult(visibleResults[activeResultIndex]);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            hideSuggestions();
        }
    }, { signal });

    searchButton.addEventListener('click', openFirstResult, { signal });
    document.addEventListener('click', event => {
        const searchBox = document.querySelector('.search-box');
        if (searchBox && !searchBox.contains(event.target)) hideSuggestions();
    }, { signal });
})();
