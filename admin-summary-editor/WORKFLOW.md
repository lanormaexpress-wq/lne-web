# Flujo editorial central de resúmenes

## Archivos del ajuste de cierre (esta fase)

Modificados: `admin.html`, `admin-summary-integration.css`, `admin-summary-tools.js`, `admin-summary-workflow.js`, `admin-summary-selection.js`, `admin-summary-templates.js`, `lib/summary-documents.js`, `lib/summary-editor.js`, `lib/summary-templates.js`, `tests/summary-workflow-browser.cjs`, `tests/summary-workflow-rls.sql`, `tests/summary-tools-browser.cjs`, `tests/summary-templates-browser.cjs` y este documento.

Nuevos: `lib/summary-permissions.js`, `migration/summary-workflow-cards.sql` y las dos capturas de la prueba real. Las pruebas regeneran sus reportes y capturas anteriores. No se volvió a modificar el renderizador público, `formacion-ui.js`, `formacion.js`, el servidor principal ni los JSON históricos en este ajuste.

## Uso

En `/admin/resumenes/editor`, preparar el documento con el editor original.
El primer cambio con contenido inicia el autoguardado central, sin elegir área, curso o cartilla. No hay botón principal de guardado ni franja adicional. Un UUID por documento permite reintentar el primer guardado sin duplicarlo.
Las siguientes ediciones actualizan ese registro. El autoguardado espera 5 segundos sin cambios; no consulta documentos ni catálogos al iniciar un editor vacío. El estado discreto muestra Guardando…, Guardado ✓ o Error al guardar (detalle en tooltip). Los errores conservan el contenido local y no se reintentan infinitamente.
La integración observa las notificaciones del modelo y eventos nativos `input`/`change`: la escritura inline del editor evita deliberadamente notificar/renderizar de nuevo el canvas. No se interceptan ni modifican métodos internos. Al recuperar un documento central se bloquea temporalmente la interacción con el iframe hasta completar la lectura para no sobrescribir una escritura adelantada.
La URL conserva `?resumen=UUID` para que una recarga reabra ese mismo documento después de que cargue el iframe, sin duplicarlo. Solo esa navegación explícita consulta el documento al abrir; un editor nuevo no hace esa consulta.

**RESÚMENES** está inmediatamente a la izquierda de CONTINUAR en la barra principal. Consulta bajo demanda y en páginas de 50 registros BORRADORES / EN REVISIÓN / PUBLICADOS. ABRIR recupera el JSON íntegro en el mismo `LNEState`, usando sus notificaciones y render original. Incluye propiedades desconocidas, imágenes, tablas, layouts y metadatos; no reconstruye el documento desde HTML. PUBLICADOS muestra además el usuario publicador y su fecha (correo cuando es el propio usuario o autor; identificador para otros publicadores).

**CONTINUAR** conserva Área → Curso → Cartilla administrable. No crea el borrador: el autoguardado funciona independientemente. ENVIAR A REVISIÓN solo se habilita con documento central y destino completo. Guarda y cambia a `EN_REVISION`, sin publicar. El autor sigue editando el mismo registro, que permanece en revisión. El destino se conserva al reabrir CONTINUAR.
**GUARDAR CARTILLA** almacena nombre, imagen optimizada y relación con curso; no cambia el estado del resumen ni publica. La opción aparece inmediatamente para seleccionarla. El término cambia solo visualmente: tablas, endpoints y bucket conservan sus nombres internos.

**PUBLICACIÓN FINAL**, independiente de CONTINUAR, aparece a su derecha únicamente para un documento en revisión y un usuario autorizado. La confirmación muestra título, área, curso, cartilla y autor. Al confirmar se guarda la última edición y el servidor vuelve a validar contenido y destino. La base genera el snapshot público y cambia el estado en la misma transacción; si algo falla, no hay publicación parcial. Una restricción única de cartilla evita duplicados incluso con dos publicaciones concurrentes. Los publicados se visualizan en modo de solo lectura; no existe edición del publicado en esta fase.

## Permisos

- `app_metadata.role = owner`: acceso completo al workflow.
- `app_metadata.role = editor`: crear y editar sus documentos, enviar a revisión.
- Editor con `app_metadata.can_publish_summary = true` (booleano): además revisar y publicar.
- Editor con `app_metadata.can_create_summary_card = true` (booleano): crear cartillas del curso. Editar/eliminar cartillas sigue reservado a owner. No se asignó este permiso a ninguna persona.
- No se crearon usuarios ni se asignaron permisos a personas. Nunca se usa `user_metadata` para autorizar.
- Servidor utiliza el JWT validado del usuario y la clave pública, no `service_role`. RLS y triggers verifican las transiciones incluso si se invoca directamente REST.
- `updated_at` se compara al actualizar para detectar guardados concurrentes. Un conflicto solicita reabrir, sin sobrescribir el trabajo ajeno.
- `summary_documents`: privado, contiene JSON editable y autor.
- `summary_publications`: snapshot público inmutable, sin JSON editable ni datos privados del autor. Imágenes privadas de plantilla solo son accesibles anónimamente cuando están referenciadas en una publicación final.
- Cambiar o eliminar la plantilla no puede eliminar imágenes que ya utiliza un snapshot publicado. Una plantilla referenciada por documentos tampoco se elimina por accidente.
- HTML publicado se muestra en iframe sandbox sin scripts, con CSP restrictiva. El HTML/CSS se deriva del renderizador y estilos originales.

## Compatibilidad pública

`formacion-ui.js` conserva el cargador JSON histórico y suma los snapshots del curso al visitarlo. Reutiliza `createTopicCard`, con el mismo CSS, imagen, animación y clic. Si falla la API, siguen funcionando las tarjetas JSON. El contenido dinámico se obtiene solo al abrir su tarjeta. No se modificaron los JSON históricos, `formacion.js`, ni los estilos públicos.

## Archivos de esta fase

Nuevos:

- `lib/summary-documents.js` (rutas privadas y públicas).
- `lib/summary-permissions.js` (permisos compartidos del servidor).
- `admin-summary-workflow.js` (capa exterior de estado y acciones).
- `migration/summary-workflow.sql`.
- `migration/summary-workflow-policy-initplans.sql`.
- `migration/summary-workflow-permission-boolean.sql`.
- `migration/summary-workflow-cards.sql` (unicidad por cartilla y permiso de creación).
- `tests/summary-workflow-browser.cjs`.
- `tests/summary-workflow-rls.sql`.
- Este documento.

Modificados:

- `admin.html`: scripts de integración, sin barra adicional.
- `admin-summary-integration.css`: estilos del listado; se retiró la franja de guardado.
- `admin-summary-tools.js`: versión de carga diferida del selector.
- `admin-summary-selection.js`: destino persistente y envío a revisión.
- `lib/summary-editor.js`: montaje del router privado y permisos del catálogo tras la validación existente.
- `lib/summary-templates.js`: no limpiar imágenes referenciadas por publicaciones.
- `server.js`: montaje del router público.
- `formacion-ui.js`: mezcla de tarjetas antiguas y nuevas, lectura de snapshots.
- `tests/summary-tools-browser.cjs` y `tests/summary-templates-browser.cjs`: expectativas actualizadas al botón ENVIAR A REVISIÓN y protección de imágenes.

Las pruebas regeneran sus capturas y reportes en `tests/`; son artefactos de QA, no fuentes del editor.

## Base y migraciones

Aplicadas por MCP al proyecto conectado. No había una tabla apropiada para documentos. CLI no instalada; se conservan scripts SQL de las migraciones MCP en `migration/`, no se inventan archivos del historial CLI.

No se alteraron `articulos_legales`, `normas_legales` ni `permisos_editor`. Recuento jurídico antes/después: 5,569. No se cambiaron cuentas ni roles.

Los asesores de seguridad no detectaron funciones SECURITY DEFINER nuevas. Mantienen avisos anteriores sobre funciones jurídicas/`rls_auto_enable` y protección de contraseñas filtradas deshabilitada, fuera de esta fase: [funciones anónimas](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable), [funciones autenticadas](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable), [contraseñas](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

## Pruebas

- `node tests/summary-workflow-browser.cjs`: Chromium y routers reales, proveedor Supabase/Storage simulado. Autoguarda sin destino, cierra el navegador, reabre, recupera JSON, crea la cartilla El Estado, envía a revisión sin hacer público, corrige el mismo ID, autoguarda, recarga, publica, comprueba PUBLICADOS y abre la tarjeta pública junto a las JSON. También verifica la posición de las acciones y ausencia de franja adicional.
- `tests/summary-workflow-rls.sql`: ejecutado mediante MCP en Supabase real con ROLLBACK; comprueba aislamiento de autor, permiso de publicación, revisión editable, snapshot atómico, unicidad e inmutabilidad. No crea cuentas ni modifica metadatos reales.
- Regresiones de sesión, recarga, importación DOCX, plantillas y 26 comprobaciones originales del editor.
- Comparación SHA-256: los 19 archivos versionados siguen iguales al editor externo original.
- Cero consultas de documentos, catálogo o publicaciones durante el arranque. La medición de carga local es orientativa; no representa una sesión real de owner ni una garantía de producción.

## Prueba real con OWNER — 21/10/2026, America/Lima

Se utilizó la sesión real que el usuario habilitó en el navegador integrado, sin leer credenciales, hashes ni tokens. Se creó el resumen **El Estado — prueba del flujo editorial** y la cartilla **El Estado**, en Fundamentos y Teoría del Derecho → Ciencia Política.

- Autosave creó el borrador sin destino y conservó escritura real, no solo cambios programáticos del modelo.
- Se cerró/reabrió la pestaña y se abrió desde RESÚMENES. La prueba automatizada complementaria cierra y vuelve a abrir el proceso de Chromium.
- Se guardó una imagen real del proyecto, optimizada a WebP 880 × 880, aproximadamente 117.5 KB; reducción 98.7% frente al original.
- EN_REVISION verificado en Supabase, sin fila pública.
- Se corrigió el mismo documento escribiendo en el editor; tras autosave y recarga conservó la corrección y EN_REVISION.
- PUBLICACIÓN FINAL realizada desde la interfaz con owner; estado PUBLICADO, timestamps y publicador registrados.
- Se comprobó su presencia en RESÚMENES → PUBLICADOS, con autor, publicador y fecha.
- Se navegó por Formación Jurídica → Fundamentos → Ciencia Política. La cartilla aparece con imagen y abre el resumen corregido.
- Peticiones HTTP sin cookies ni Authorization devolvieron 200 tanto para la cartilla como para el contenido. Una sola publicación para esa cartilla.
- **Se conserva una publicación de prueba real.** No se eliminó ni se ocultó después de la prueba.

Evidencia: `tests/summary-owner-public-card.jpg` y `tests/summary-owner-public-content.jpg`. Las pruebas automatizadas continúan utilizando proveedor simulado y no modifican esa publicación.
