'use strict';
// Backend/RPC contract regression. All provider data lives in memory.
const test = require('node:test'), assert = require('node:assert/strict');
const express = require('express');
const { courses } = require('../formacion');
const catalog = require('../admin-permission-catalog');
const { privateRouter, publicRouter } = require('../lib/summary-documents');
const id = '11111111-1111-4111-8111-111111111111';
const tid = '22222222-2222-4222-8222-222222222222';
const course = courses.find(c => c.id === 'contratos');
const app = express(), docs = new Map(), pubs = new Map();
let base, server, revision, inserts, rpcCalls;
app.use(express.json());
const actor = req => (req.get('authorization') || '').replace('Bearer ', '');
app.all('/mock/rest/v1/summary_documents', (req, res) => {
    const rows = [...docs.values()].filter(row => Object.entries(req.query).every(([k,v]) =>
        !['id', 'updated_at', 'status'].includes(k) || String(row[k]) === v.slice(3)));
    if (req.method === 'GET') return res.json(rows);
    if (req.method === 'PATCH') {
        rows.forEach(row => Object.assign(row, req.body, { updated_at: String(++revision) }));
        return res.json(rows);
    }
    inserts++; res.status(405).end();
});
app.post('/mock/rest/v1/rpc/update_summary_publication', (req, res) => {
    rpcCalls++;
    if (!['owner', 'reviewer'].includes(actor(req))) return res.status(403).json({});
    const row = docs.get(req.body.document_id);
    if (row.updated_at !== req.body.expected_updated_at) return res.status(409).json({ code: '40001' });
    if (!pubs.has(row.id)) return res.status(409).json({});
    Object.assign(pubs.get(row.id), { title: row.title, preview_html: row.preview_html });
    res.json(row);
});
app.get('/mock/rest/v1/summary_publications', (req, res) => res.json([...pubs.values()].filter(p => !req.query.id || p.id === req.query.id.slice(3))));
app.use('/documents', (req, res, next) => {
    const profile = actor(req);
    if (!['owner', 'writer', 'reviewer'].includes(profile)) return res.status(401).json({ error: 'Mock session required' });
    req.adminUser = { id: profile === 'writer' ? 'author' : profile, app_metadata: { role: profile === 'owner' ? 'owner' : 'editor' }, admin_permissions: catalog.preset(profile) };
    next();
}, privateRouter(() => ({ url: base + '/mock', key: 'mock-only' })));
app.use('/public', publicRouter(() => ({ url: base + '/mock', key: 'mock-only' })));
test.before(async () => { server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve)); base = 'http://127.0.0.1:' + server.address().port; });
test.after(() => { server.close(); server.closeAllConnections(); });
test.beforeEach(() => {
    docs.clear(); pubs.clear(); revision = 1; inserts = 0; rpcCalls = 0;
    docs.set(id, { id, author_id: 'author', title: 'PRUEBA TEMPORAL', status: 'PUBLICADO',
        area_id: course.area, course_id: course.id, template_id: tid, updated_at: '1',
        content_lne: { documentoId: 'stable-editor-id', bloques: [{ texto: 'Original' }] }, preview_html: '<p>Original</p>' });
    pubs.set(id, { id, template_id: tid, template_name: 'Misma cartilla', image_path: 'same.webp', preview_html: '<p>Original</p>' });
});
async function request(profile, method = 'GET', body) {
    const response = await fetch(base + '/documents/' + id, { method, headers: { Authorization: 'Bearer ' + profile, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) });
    return { status: response.status, body: await response.json() };
}
function edited() { return { ...structuredClone(docs.get(id)), title: 'PRUEBA EDITADA', content_lne: { documentoId: 'stable-editor-id', bloques: [{ texto: 'Nuevo' }] }, preview_html: '<p>Nuevo</p>' }; }
for (const profile of ['owner', 'reviewer']) {
    test(profile + ': autosave is private; explicit update retains IDs, card, image and URL', async () => {
        const open = await request(profile); assert.equal(open.body.canEdit, true);
        const url = '/public/' + id;
        const saved = await request(profile, 'PATCH', { ...edited(), action: 'save' });
        assert.equal(saved.status, 200); assert.equal(saved.body.document.status, 'PUBLICADO');
        assert.equal((await fetch(base + url).then(r => r.json())).preview_html, '<p>Original</p>');
        assert.equal(pubs.get(id).image_path, 'same.webp');
        const applied = await request(profile, 'PATCH', { action: 'update-publication', updated_at: saved.body.document.updated_at });
        assert.equal(applied.status, 200); assert.equal(applied.body.document.id, id);
        assert.equal((await fetch(base + url).then(r => r.json())).preview_html, '<p>Nuevo</p>');
        assert.equal(docs.size, 1); assert.equal(pubs.size, 1); assert.equal(pubs.get(id).id, id);
        assert.equal(pubs.get(id).template_id, tid); assert.equal(pubs.get(id).template_name, 'Misma cartilla');
        assert.equal(pubs.get(id).image_path, 'same.webp'); assert.equal(inserts, 0);
    });
}
test('writer cannot edit own published document or invoke publication update', async () => {
    assert.equal((await request('writer')).body.canEdit, false);
    assert.equal((await request('writer', 'PATCH', { ...edited(), action: 'save' })).status, 403);
    assert.equal((await request('writer', 'PATCH', { action: 'update-publication', updated_at: '1' })).status, 403);
    assert.equal(rpcCalls, 0); assert.equal(docs.get(id).preview_html, '<p>Original</p>');
});
test('anonymous cannot update, but public snapshot remains readable', async () => {
    assert.equal((await request('anonymous', 'PATCH', { action: 'update-publication', updated_at: '1' })).status, 401);
    assert.equal((await fetch(base + '/public/' + id)).status, 200);
});
test('stale version and missing publication never create a second publication', async () => {
    assert.equal((await request('reviewer', 'PATCH', { action: 'update-publication', updated_at: 'old' })).status, 409);
    assert.equal(pubs.get(id).preview_html, '<p>Original</p>');
    pubs.clear(); assert.notEqual((await request('owner', 'PATCH', { action: 'update-publication', updated_at: '1' })).status, 200);
    assert.equal(pubs.size, 0); assert.equal(inserts, 0);
});
test('published destination and state cannot be changed by autosave', async () => {
    assert.equal((await request('owner', 'PATCH', { ...edited(), template_id: '33333333-3333-4333-8333-333333333333', action: 'save' })).status, 409);
    assert.equal((await request('reviewer', 'PATCH', { ...edited(), action: 'submit' })).status, 409);
    assert.equal((await request('reviewer', 'PATCH', { ...edited(), action: 'publish' })).status, 409);
    assert.equal(docs.get(id).template_id, tid); assert.equal(pubs.size, 1);
});
