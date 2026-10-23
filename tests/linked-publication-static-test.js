const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const server = read('server.js');
const dynamic = read('dynamic-legislation.js');
const converter = read('admin-converter/linked-publication.js');
const converterApp = read('admin-converter/app.js');
const converterHtml = read('admin-converter/index.html');
const publicHtml = read('index.html');
const legislation = read('legislacion.js');
const router = read('router.js');

assert(server.includes("app.get('/api/admin/publication-targets', requireAdmin"), 'Falta el catálogo administrativo protegido.');
assert(server.includes("app.post('/api/admin/publish-linked-legislation', requireAdmin"), 'Falta la publicación vinculada protegida.');
assert(server.includes("destination !== 'existing'"), 'La ruta vinculada debe limitarse a legislaciones existentes.');
assert(server.includes("articulos_legales?on_conflict=codigo,numero_articulo"), 'La publicación no declara el upsert diferencial esperado.');
assert(server.includes("app.get('/api/public/legislation'"), 'Falta el catálogo público dinámico.');
assert(server.includes("app.get('/api/public/legislation/:slug/articles'"), 'Falta el contenido público dinámico.');

assert(dynamic.includes("existing?.status === 'ready' && existing.contentScript"), 'El catálogo dinámico podría sustituir normas públicas locales existentes.');
assert(dynamic.includes('window.LNENormas.all.push(descriptor)'), 'Las nuevas normas no se incorporan al catálogo compartido.');
assert(dynamic.includes('homeCard = {'), 'Las nuevas normas no reutilizan el modelo de tarjeta pública.');
assert(publicHtml.includes('dynamic-legislation.js'), 'La capa dinámica no está cargada en la página pública.');
assert(router.includes('LNEDynamicLegislation?.ready'), 'El router no espera el catálogo dinámico.');
assert(legislation.includes('LNEDynamicLegislation.load'), 'La plantilla pública no carga artículos dinámicos.');

assert(converter.includes('if (window.__LNE_LEGISLATION_MODE__) return;'), 'El botón adicional debe quedar fuera del editor administrativo de legislación.');
assert(converterApp.includes('function preparePublication()'), 'No se encontró el render final de publicación.');
assert(converterApp.includes('function ensureFinalizePublicationButton()'), 'El render visible no prepara FINALIZAR PUBLICACIÓN.');
assert(converterApp.includes('function renderPublicationPreview() {\n  ensureFinalizePublicationButton();'), 'La vista previa real no inserta FINALIZAR PUBLICACIÓN.');
assert(converterApp.includes('publicationDestinationPanel.after(finalizePublicationBtn)'), 'FINALIZAR PUBLICACIÓN no está debajo de las opciones del panel izquierdo.');
assert(!converterApp.includes('publicationPreview.after(finalizePublicationBtn)'), 'FINALIZAR PUBLICACIÓN no debe estar dentro de la vista previa.');
assert(!converterApp.includes('BOTÓN TEST'), 'El marcador temporal de diagnóstico no debe permanecer.');
assert(converterApp.includes('finalizeLinkedPublicationBtn'), 'El render final no inserta FINALIZAR PUBLICACIÓN.');
assert(converterApp.includes('[LNE] preparePublication(): botón FINALIZAR PUBLICACIÓN renderizado'), 'Falta el diagnóstico solicitado en preparePublication().');
assert(converterApp.includes('document.dispatchEvent(new CustomEvent("lne-finalize-publication"))'), 'El botón final no enlaza con la capa vinculada.');
assert(converter.includes("document.addEventListener('lne-finalize-publication', open)"), 'La capa vinculada no escucha la acción del render final.');
assert(!converter.includes("document.getElementById('applyPreviewBtn')"), 'PUBLICAR DOCUMENTO no debe ser interceptado por la publicación vinculada.');
assert(!converter.includes('linkedPublishBtn'), 'No debe crearse un segundo botón de publicación.');
assert(converter.includes("document.createElement('dialog')"), 'La publicación no usa un modal independiente.');
assert(converter.includes("'/api/admin/publication-targets'"), 'El modal no consulta destinos reales.');
assert(converter.includes("isNew: true"), 'El modal no permite reutilizar el flujo existente para crear una legislación nueva.');
assert(converter.includes("fieldLabel.textContent = 'Nombre de la nueva legislación'"), 'Falta el nombre visible de la nueva tarjeta.');
assert(converter.includes("newLegislationNameInput.placeholder = 'Escribe aquí el nombre de la norma...'"), 'Falta el campo solicitado para la nueva legislación.');
assert(converter.includes("if (!newLegislationName) throw new Error"), 'No se valida el nombre antes de publicar.');
assert(converter.indexOf('publicationNormName.value = newLegislationName') > converter.indexOf('async function publish()'), 'El nombre no debe aplicarse antes de pulsar PUBLICAR.');
assert(converter.includes('window.parent.postMessage(preparedPublication'), 'La nueva legislación no reutiliza el flujo definitivo existente.');
assert(converter.includes("contentType.includes('application/json')"), 'La conexión no valida respuestas HTML antes de interpretar JSON.');
assert(converter.includes('removeAfterPublication(currentProjectId)'), 'No está preparada la limpieza posterior al éxito.');
assert(converter.includes('Tu proyecto temporal permanece guardado.'), 'Un fallo no confirma la conservación del proyecto temporal.');
assert(converterHtml.includes('linked-publication.js'), 'El módulo independiente no está cargado.');

console.log('Publicación vinculada: validaciones estáticas correctas.');
