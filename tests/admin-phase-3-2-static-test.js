const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('admin.html');
const admin = read('admin.js');
const css = read('admin-v2.css');
const editor = read('admin-converter/app.js');
const toolbar = read('admin-converter/index.html');

assert.match(html, /id="toggle-norms-panel"/);
assert.match(html, /id="articles-list"/);
assert.match(html, /id="column-resizer"/);
assert.match(css, /body\.norms-collapsed \.admin-layout/);
assert.match(admin, /sessionStorage\.getItem\('lne-admin-norms-collapsed'\)/);
assert.match(admin, /toggle-norms-panel.*setNormsCollapsed/);

assert.match(editor, /adminDirtyArticleIds/);
assert.match(editor, /if \(!articleWasEdited && !structureWasEdited\) return null/);
assert.match(editor, /__changeKind: "new"/);
assert.doesNotMatch(editor, /bloque\(s\) publicados|bloques cargados/);
assert.doesNotMatch(admin, /bloques? actualizados?/i);

for (const label of ['Deshacer','Rehacer','Párrafo','Inciso','Subinciso','Sumilla','Nuevo art.','N. disp.','Derogado','Eliminar cuadro','Unir ant.','Unir sig.','Restaurar']) {
  assert.ok(toolbar.includes(label), `Falta la herramienta ${label}`);
}

console.log('FASE 3.2: validaciones estáticas correctas.');
