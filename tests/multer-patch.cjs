'use strict';
// Real multipart requests and existing converter, isolated from Auth/Supabase.
const test = require('node:test'), assert = require('node:assert/strict');
const express = require('express'), multer = require('multer');
const fs = require('node:fs'), vm = require('node:vm');
const { createLegalConverterRouter } = require('../lib/legal-converter');
const { buildDocx } = require('../lib/legal-converter/docx_exporter');
const app = express();
app.use('/converter', createLegalConverterRouter((_req, _res, next) => next()));
// Execute the existing publication multipart configuration without mounting a real writer.
const serverSource = fs.readFileSync(require.resolve('../server'), 'utf8');
const config = serverSource.match(/const publicationImageUpload = multer\(([\s\S]*?)\);/);
assert.ok(config);
const context = { multer }; vm.runInNewContext('this.upload = multer(' + config[1] + ');', context);
app.post('/publication-image', context.upload.single('image'), (req, res) => res.json({ bytes: req.file?.size, type: req.file?.mimetype }));
app.use((error, _req, res, _next) => res.status(400).json({ error: error.code || error.message }));
let server, base;
test.before(async () => { server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve)); base = 'http://127.0.0.1:' + server.address().port; });
test.after(() => { server.close(); server.closeAllConnections(); });
async function upload(route, field, buffer, name, type) {
    const body = new FormData(); body.append(field, new Blob([buffer], { type }), name);
    const response = await fetch(base + route, { method: 'POST', body });
    return { status: response.status, body: await response.json() };
}
test('patched multer version is pinned', () => assert.equal(require('multer/package.json').version, '2.5.0'));
test('existing converter extracts Word and text via real multipart', async () => {
    const docx = buildDocx('PRUEBA MULTIPART', [{ titulo: '', capitulo: '', articulos: [{ numero: '1', titulo: 'Prueba', textoHtml: '<p>Documento técnico temporal.</p>' }] }]);
    const word = await upload('/converter/extract', 'file', docx, 'prueba.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    assert.equal(word.status, 200); assert.match(word.body.text, /Documento técnico temporal/);
    const text = await upload('/converter/extract', 'file', 'Artículo 1. Prueba', 'prueba.txt', 'text/plain');
    assert.equal(text.status, 200); assert.match(text.body.text, /Prueba/);
    assert.equal((await upload('/converter/extract', 'unexpected', 'x', 'bad.txt', 'text/plain')).status, 400);
});
test('existing publication multipart accepts image and rejects invalid fields', async () => {
    const image = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jA6sAAAAASUVORK5CYII=', 'base64');
    const ok = await upload('/publication-image', 'image', image, 'test.png', 'image/png');
    assert.equal(ok.status, 200); assert.equal(ok.body.bytes, image.length);
    assert.equal((await upload('/publication-image', 'unexpected', image, 'test.png', 'image/png')).status, 400);
});
