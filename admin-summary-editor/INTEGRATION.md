# Editor visual de resúmenes LNE

Instantánea: `versions/2026-10-19/`. Copia literal de `index.html`, `css/`, `js/`, `vendor/` y la prueba `tests/editorial.cjs` de la fuente estable. El editor original no se modifica. No se copia ni se ejecuta su servidor.

Entrada: `/admin` → Editor de resúmenes. Ruta protegida: `/admin/resumenes/editor`. Un clic mantiene la barra administrativa y carga directamente un único iframe, sin pantalla intermedia. Ejecutar solamente `npm start` en el proyecto principal.

El administrador intercambia su bearer existente por una cookie HttpOnly SameSite=Strict con identificador aleatorio, válida por una hora. El servidor mantiene ese identificador en memoria y vuelve a validar el bearer y el rol owner/editor con el middleware existente para cada acceso al editor y sus dependencias. Reiniciar el servidor requiere ABRIR EDITOR nuevamente. La carpeta física queda bloqueada al acceso estático público. Los documentos nunca se envían en esta operación.

La ruta del editor sirve la misma barra administrativa; el iframe carga directamente el HTML original con sus rutas relativas. ResizeObserver mide la altura del header para ocupar el viewport restante. La instancia se conserva al cambiar de sección. El CSS del administrador y del editor quedan en documentos separados. Ningún módulo state, canvas, parser, toolbar o renderer se adapta ni se reescribe.

Persistencia original: localStorage `LNE_EDITOR_AUTOSAVE_DRAFT` y `LNE_EDITOR_DOCUMENTS_V1`. Depende del navegador y origen; los datos de otros puertos/orígenes no se transfieren automáticamente. Utilizar exportación/importación original para trasladarlos. La biblioteca es local al navegador, no está separada por usuario. No implementa publicación, tablas, aprobación ni workflow.

Vista Web sigue siendo previsualización. Fuentes Google y Font Awesome siguen usando las mismas URL externas que la fuente estable. Los archivos DOCX se procesan con las copias locales de Mammoth y JSZip.

Validación: `node tests/summary-editor-integration.cjs` comprueba rutas privadas, recursos, cookie, cierre y retorno con autenticación simulada. `node admin-summary-editor/versions/2026-10-19/tests/editorial.cjs` ejecuta las 26 comprobaciones originales con DOM simulado. No sustituyen la revisión manual con sesión real: crear documento, importar DOCX, editar, listas, mover imagen, Vista Web, regresar, recargar y comprobar consola. No se probó publicación ni se hicieron escrituras en Supabase.
