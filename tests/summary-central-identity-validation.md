# Identidad del borrador central después de F5

## Causa comprobada

`admin.js` redirigía las cuentas limitadas a resúmenes mediante
`history.replaceState(..., '/admin/resumenes/editor')`, eliminando `?resumen=`.
El editor recuperaba su JSON local y documentoId; el workflow administrativo
perdía current/pendingId, que solo estaban en memoria. Sin URL, attach no
consultaba el registro central; el autosave generaba otro UUID y hacía POST.
El test anterior sustituía admin.js por un stub, omitiendo esa redirección.

## Corrección acotada

- `admin.js`: conserva el identificador no sensible al dirigir al editor.
- `admin-summary-storage-scope.js`: relación persistente documentoId/ID central
  dentro del namespace user_id/sesión/epoch en sessionStorage. Un nuevo login
  no recupera la referencia activa anterior.
- `admin-summary-workflow.js`: guarda la relación antes del primer POST y
  después de crear/abrir el documento; restaura vía GET autenticado y comprueba
  canEdit. Un ID inválido/inaccesible bloquea nuevos guardados, sin INSERT
  silencioso. Un primer guardado pendiente reintenta la misma identidad.
- `lib/summary-documents.js`: comunica canEdit conforme a permisos existentes;
  recupera el registro visible del autor por documentoId. Duplicados antiguos
  generan conflicto explícito. Nuevas identidades deterministas por autor y
  documentoId, más la PK existente y ON CONFLICT DO NOTHING, evitan duplicados
  por primeras peticiones concurrentes. No se alteraron tablas, RLS ni presets.
- `admin.html`: actualiza versiones de los tres scripts modificados.

No se cambiaron canvas, DOCX, toolbar, imágenes, cartillas, publicación,
perfiles, usuarios, web pública, Git ni Coolify.

## Regresiones automatizadas

Con proveedores simulados (no confundir con las pruebas reales siguientes):

- summary-role-workflow.cjs: PASS. Ejecuta ahora el admin.js real y simula solo
  el proveedor Auth. F5 repetido, recuperación sin querystring, ID inaccesible
  que bloquea guardado, cuentas separadas y biblioteca local conservada.
- summary-workflow-browser.cjs: PASS. Workflow completo, mismo ID y editor
  original intacto.
- summary-storage-scope.cjs: PASS, incluidas referencias centrales por usuario.
- summary-central-identity.cjs: PASS. Cinco creaciones concurrentes y reintento
  con UUID cliente perdido producen una sola fila; validación de edición y
  conservación de identidad en revisión.
- node --check de los scripts de ejecución modificados: PASS.

No se modificó summary-selection-browser.cjs.

## Prueba REAL con REDACTOR

Documento del editor: mat-1792717676844.
ID canónico: 078e5c3c-7b0e-4782-922e-9b5acf84c075.

1. BORRADORES → ABRIR / EDITAR: recuperó el registro canónico.
2. Edición A: autosave actualizó ese mismo ID.
3. F5 1, F5 2 y F5 3, con edición después de cada recarga: título, texto,
   identificación y guardado permanecieron en el mismo registro. Consultas
   directas a Supabase confirmaron cada frase y updated_at posterior;
   created_at siguió siendo el original.
4. Se seleccionó la cartilla existente El Estado (Ciencia Política), sin
   modificarla, y se envió el documento a revisión por el flujo existente.
5. Consulta final: EN_REVISION, UNA fila para ese documentoId, cero publicaciones
   para este documento. No se ejecutó publicación final.
6. Logout real: iframe about:blank, referencia resumen eliminada, ruta /admin
   y formulario de login visible. No se borró el documento central.

## Limpieza de los dos registros de prueba

Se compararon autor, fechas, estado, destino, contenido completo, relaciones y
publicaciones. Ambos eran BORRADOR del mismo autor/documentoId y no tenían
destino ni publicaciones. La única diferencia de contenido era el tercer
bloque: la frase del segundo cambio tras F5; también cambiaba fechaModificacion.

Respaldo íntegro previo de ambas filas (fuera del proyecto/Git):
`C:/Users/Usuario/.codex/visualizations/2026/09/28/01a0e991-8761-77e2-adf1-994f7403c40f/pre-repair-summary-identity.json`.

Un intento de actualización administrativa directa fue rechazado por un guard
de permisos y no modificó datos. No se desactivaron guardas ni se aplicaron
identidades simuladas. La frase más reciente se conservó en el canónico
mediante la sesión REAL del REDACTOR y su autosave habitual.

Tras verificar que los demás bloques, metadatos y estado coincidían y que el
canónico contenía la frase del duplicado más las nuevas pruebas, se eliminó
solo a1bd81c2-4735-4eda-9767-74391280ad81 mediante DELETE administrativo acotado
por IDs, hash del duplicado, autor, estado, contenido y ausencia de publicaciones.
La eliminación fue confirmada por Supabase. El respaldo permite recuperarlo.
No se eliminaron imágenes, cartillas ni publicaciones compartidas.

## Pruebas D/E REALES con REVISOR completadas

El usuario inició sesión manualmente como REVISOR/PUBLISHER en el mismo
navegador integrado y pestaña. El editor comenzó en blanco (cero bloques), con
título predeterminado y sin querystring resumen: no heredó el documento activo
del REDACTOR.

RESÚMENES → EN REVISIÓN mostró el documento del autor REDACTOR. ABRIR / EDITAR
recuperó el ID 078e5c3c-7b0e-4782-922e-9b5acf84c075. Tras F5 se mantuvieron
ese ID, el estado EN_REVISION y todas las frases de prueba. Se añadió una frase
de corrección como REVISOR y se dejó actuar al autosave.

Consulta final directa a Supabase:

- Una fila para documentoId mat-1792717676844.
- ID original 078e5c3c-7b0e-4782-922e-9b5acf84c075.
- created_at original conservado; updated_at posterior a la edición del REVISOR.
- Frase del REVISOR guardada; autor original conservado.
- Estado EN_REVISION; cero publicaciones para este documento.
- Cero filas con el ID duplicado a1bd81c2-4735-4eda-9767-74391280ad81.

Evidencia visual fuera del proyecto:
`C:/Users/Usuario/.codex/visualizations/2026/09/28/01a0e991-8761-77e2-adf1-994f7403c40f/central-identity-reviewer-real.png`.

No hubo publicación final, commit, push, despliegue ni comandos Git durante
esta corrección. La sesión REVISOR queda abierta en el documento de prueba.
