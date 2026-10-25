// Isolated tests: no Auth, credentials or writes to Supabase.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const indexBuilder = require('../lib/legal-search-index');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
function runtime({ catalogFails = false } = {}) {
    const norm = { id: 'procesal-penal', slug: 'codigo-procesal-penal', status: 'ready',
        contentScript: '/codigo-procesal-penal.js?v=1', title: 'Título público', introduction: 'Introducción pública',
        image: { src: 'portada.png' } };
    const state = { rows: [], failure: false, calls: [], requests: 0, invalid: false };
    const original = [{ titulo: 'Respaldo', articulos: [{ numero: '68-A', texto: 'Original estático' }] }];
    const context = { window: { LNENormas: { all: [norm], captureData: () => original } },
        AbortController, setTimeout, clearTimeout, console: { warn() {}, error() {} },
        fetch: async (url, options) => {
            state.calls.push({ url, options });
            if (url === '/api/public/legislation') {
                if (catalogFails) throw Error('catalog offline');
                return { ok: true, json: async () => ({ normas: [{ codigo: 'codigo-procesal-penal', slug: norm.slug,
                    nombre: 'Nombre DB', introduccion: 'Placeholder DB', total_articulos: 605 }] }) };
            }
            state.requests++;
            if (state.failure) throw Error('articles offline');
            return { ok: true, json: async () => state.invalid ? '<html>' : ({ articulos: state.rows }) };
        } };
    vm.createContext(context);
    vm.runInContext(read('dynamic-legislation.js'), context);
    vm.runInContext(read('legislacion.js'), context);
    return { norm, state, original, api: context.window.LNEDynamicLegislation, loader: context.window.LNELegislacion };
}
const row = (number, text, section = 0) => ({ codigo: 'codigo-procesal-penal', numero_articulo: number,
    contenido: text, titulo: 'Título', orden: 1, contenido_lne: { tipo: '', esDeclaracion: true, texto: 'stale' },
    estructura: { seccion_indice: section, seccion: { titulo: 'Sección', capitulo: '', nuevaHoja: false } } });

test('API first; UPDATE of one ID becomes visible without a stale session cache', async () => {
    const r = runtime(); await r.api.ready;
    assert.equal(r.norm.title, 'Título público'); assert.equal(r.norm.introduction, 'Introducción pública');
    r.state.rows = [{ ...row('68-A', 'Original'), id: 7548 }, { ...row('69', 'No tocar'), id: 7549 }];
    assert.equal((await r.loader.loadNormData(r.norm))[0].articulos[0].texto, 'Original');
    r.state.rows[0].contenido = 'PRUEBA TEMPORAL';
    const changed = await r.loader.loadNormData(r.norm);
    assert.equal(changed[0].articulos[0].texto, 'PRUEBA TEMPORAL');
    assert.equal(changed[0].articulos[1].texto, 'No tocar');
    assert.equal(r.state.rows[0].id, 7548); assert.equal(r.state.rows.length, 2);
    assert.equal(r.state.requests, 2);
    assert.ok(r.state.calls.every(c => c.options.cache === 'no-store'));
    r.state.rows[0].contenido = 'Original';
    assert.equal((await r.loader.loadNormData(r.norm))[0].articulos[0].texto, 'Original');
});

test('static fallback on outage, empty/invalid API and recovery on next visit', async () => {
    const r = runtime({ catalogFails: true }); await r.api.ready;
    r.state.failure = true;
    assert.equal(await r.loader.loadNormData(r.norm), r.original);
    r.state.failure = false;
    assert.equal(await r.loader.loadNormData(r.norm), r.original);
    r.state.invalid = true;
    assert.equal(await r.loader.loadNormData(r.norm), r.original);
    r.state.invalid = false; r.state.rows = [row('68-A', 'API recuperada')];
    assert.equal((await r.loader.loadNormData(r.norm))[0].articulos[0].texto, 'API recuperada');
    const noBackup = { slug: 'nueva', dynamic: true };
    r.state.failure = true;
    await assert.rejects(r.loader.loadNormData(noBackup), /offline/);
});

test('keep section order, repeated headings, empty types and declaration metadata', async () => {
    const r = runtime(); await r.api.ready;
    r.state.rows = [row('1', 'A', 0), row('2', 'B', 1), row('3', 'C', 2)];
    const sections = await r.api.load(r.norm);
    assert.equal(sections.length, 3);
    assert.equal(sections[0].articulos[0].tipo, '');
    assert.equal(sections[0].articulos[0].esDeclaracion, true);
    assert.deepEqual(Array.from(sections, s => s.articulos[0].texto), ['A', 'B', 'C']);
});

test('all 605 canonical CPP articles retain their exact public content and numbering', async () => {
    const source = {};
    vm.runInNewContext(read('codigo-procesal-penal.js') + ';this.data=CodigoProcesalPenal;', source);
    const canonical = source.data.flatMap(s => s.articulos);
    const r = runtime(); await r.api.ready;
    // Build the API fixture from the tracked canonical source, not a local migration export.
    const totals = new Map(), occurrences = new Map();
    canonical.forEach(a => totals.set(String(a.numero), (totals.get(String(a.numero)) || 0) + 1));
    let order = 0;
    r.state.rows = source.data.flatMap((section, sectionIndex) => {
        const { articulos, ...sectionMetadata } = section;
        return articulos.map(article => {
            const number = String(article.numero), occurrence = (occurrences.get(number) || 0) + 1;
            occurrences.set(number, occurrence);
            return { codigo: 'codigo-procesal-penal',
                numero_articulo: totals.get(number) > 1 ? `${number}#${occurrence}` : number,
                titulo: article.titulo, contenido: article.texto, contenido_lne: { ...article }, orden: ++order,
                estructura: { seccion_indice: sectionIndex, seccion: sectionMetadata,
                    numero_original: number, ocurrencia_numero: occurrence, total_ocurrencias_numero: totals.get(number) } };
        });
    });
    const sections = await r.api.load(r.norm), articles = sections.flatMap(s => s.articulos);
    assert.equal(articles.length, 605); assert.equal(sections.length, source.data.length);
    articles.forEach((a, i) => {
        for (const key of ['numero', 'titulo', 'texto', 'tipo', 'esDeclaracion']) {
            assert.equal(a[key], canonical[i][key], `${i}: ${key}`);
        }
    });
});

test('live search removes stale terms while retaining formation and fallback-only norms', () => {
    const base = { version: 1, entries: [
        { g: 'legislation', k: 'article', r: '/legislacion/penal?art=1', t: 'Antiguo' },
        { g: 'formation', k: 'course', r: '/formacion/curso', t: 'Curso' },
        { g: 'legislation', k: 'article', r: '/legislacion/respaldo?art=2' }
    ], terms: { antiguo: [0], curso: [1], respaldo: [2] } };
    const result = indexBuilder(base, [{ codigo: 'penal', slug: 'penal', nombre: 'Penal' }], [
        { ...row('1', 'Nueva palabra sincronizada'), codigo: 'penal', contenido_lne: {} }
    ]);
    assert.equal(result.entries.filter(e => e.r === '/legislacion/penal?art=1').length, 1);
    assert.equal(result.terms.antiguo, undefined);
    assert.equal(result.entries[result.terms.curso[0]].k, 'course');
    assert.equal(result.entries[result.terms.sincronizada[0]].n, '1');
    assert.equal(result.entries[result.terms.respaldo[0]].r, '/legislacion/respaldo?art=2');
});
