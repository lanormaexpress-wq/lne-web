const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(projectRoot, 'data', 'search-index.json');
const normas = require(path.join(projectRoot, 'normas.js'));
const formacion = require(path.join(projectRoot, 'formacion.js'));

function plainText(value) {
    return String(value || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalize(value) {
    return plainText(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function unique(values) {
    return [...new Set(values.filter(Boolean))];
}

function numberTokens(value) {
    return unique(String(value || '').match(/\d+/g) || []);
}

function loadNormSections(norma) {
    if (!norma.contentScript || !Array.isArray(norma.dataVariables) || !norma.dataVariables.length) return [];

    const filePath = path.join(projectRoot, norma.contentScript.split('?')[0].replace(/^\//, ''));
    const source = fs.readFileSync(filePath, 'utf8');
    const variableChecks = norma.dataVariables
        .map(name => `typeof ${name} !== 'undefined' ? ${name} : undefined`)
        .join(' || ');
    const sandbox = {};

    vm.runInNewContext(`${source}\nthis.__lneSearchSections = ${variableChecks};`, sandbox, { filename: filePath });
    return Array.isArray(sandbox.__lneSearchSections) ? sandbox.__lneSearchSections : [];
}

function makeSearchText(...values) {
    return normalize(values.filter(Boolean).join(' '));
}

function buildLegislationEntries() {
    const entries = [];

    normas.forEach(norma => {
        const aliases = norma.aliases || [];
        const normaTitle = plainText(norma.title);

        entries.push({
            group: 'legislation',
            kind: 'norma',
            title: normaTitle,
            route: norma.url,
            numbers: numberTokens([normaTitle, ...aliases].join(' ')),
            search: makeSearchText(normaTitle, norma.menuLabel, norma.slug, norma.id, ...aliases)
        });

        if (norma.status !== 'ready') return;

        loadNormSections(norma).forEach(section => {
            (section.articulos || []).forEach(article => {
                if (article.esDeclaracion || article.numero === undefined || article.numero === null) return;

                const number = String(article.numero);
                const articleTitle = plainText(article.titulo);
                const articleText = plainText(article.texto);

                entries.push({
                    group: 'legislation',
                    kind: 'article',
                    number,
                    norm: norma.menuLabel || normaTitle,
                    title: articleTitle,
                    text: articleText,
                    route: `${norma.url}?art=${encodeURIComponent(number)}`,
                    search: makeSearchText(number, articleTitle, articleText, normaTitle, norma.menuLabel)
                });
            });
        });
    });

    return entries;
}

function buildFormationEntries() {
    const entries = [];

    formacion.areas.forEach(area => {
        entries.push({
            group: 'formation',
            kind: 'area',
            title: area.name,
            route: area.route,
            search: makeSearchText(area.name, area.slug)
        });
    });

    formacion.courses.forEach(course => {
        const area = formacion.areas.find(item => item.id === course.area);
        entries.push({
            group: 'formation',
            kind: 'course',
            title: course.name,
            parent: area ? area.name : '',
            route: course.route,
            search: makeSearchText(course.name, course.slug, course.id, area && area.name, ...(course.legacyPaths || []))
        });
    });

    return entries;
}

function readTopicText(topic) {
    const content = [topic.contenido || ''];

    if (topic.htmlFile) {
        const filePath = path.join(projectRoot, topic.htmlFile);
        if (fs.existsSync(filePath)) content.push(fs.readFileSync(filePath, 'utf8'));
    }

    return plainText(content.join(' '));
}

function buildMaterialEntries() {
    const entries = [];

    formacion.courses.filter(course => course.status === 'ready' && course.contentFile).forEach(course => {
        const filePath = path.join(projectRoot, course.contentFile.replace(/^\//, ''));
        const topics = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        topics.forEach(topic => {
            const text = readTopicText(topic);
            const hasRealContent = Boolean(text || topic.htmlFile || topic.pdf || (topic.imagenes && topic.imagenes.length));
            if (!hasRealContent || /^(contenido\s+en\s+preparacion|en\s+preparacion)$/i.test(normalize(topic.titulo))) return;

            entries.push({
                group: 'materials',
                kind: 'material',
                title: plainText(topic.titulo),
                parent: course.name,
                route: `${course.route}?class=${encodeURIComponent(topic.id)}`,
                search: makeSearchText(topic.titulo, text, course.name)
            });
        });
    });

    return entries;
}

const entries = [
    ...buildLegislationEntries(),
    ...buildFormationEntries(),
    ...buildMaterialEntries()
];

const compactEntries = entries.map(entry => ({
    g: entry.group,
    k: entry.kind,
    n: entry.number,
    t: entry.title,
    p: entry.parent,
    d: entry.norm,
    r: entry.route,
    u: entry.numbers
}));

const terms = Object.create(null);
entries.forEach((entry, entryIndex) => {
    const uniqueTerms = new Set(entry.search.match(/[a-z0-9]{3,}/g) || []);
    uniqueTerms.forEach(term => {
        if (!terms[term]) terms[term] = [];
        terms[term].push(entryIndex);
    });
});

const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    entries: compactEntries,
    terms
};

fs.writeFileSync(outputPath, JSON.stringify(index));
console.log(`Índice generado: ${entries.length} entradas (${fs.statSync(outputPath).size} bytes).`);
