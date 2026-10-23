# Integración: rendimiento y selección de Formación

## Medición

Resultados originales en `tests/summary-performance-before.json` y `tests/summary-performance-after.json`. Chromium real, perfil nuevo, dos navegaciones consecutivas por ejecución, mismo editor, autenticación simulada sin latencia. No son mediciones de una cuenta real ni incluyen el clic previo y las consultas de legislación del administrador. La red externa de fuentes y la carga del equipo introducen variación; no son percentiles ni una garantía de tiempos.

Antes: visible/interactivo 5543/5706 ms; segunda carga 1874/2029 ms. Después: 2982/3449 ms; segunda 396/568 ms. Recursos registrados: 19/19 antes y 21/24 después. Sin URLs duplicadas en cada navegación. Bytes transferidos registrados por Resource Timing: 1127958/1105016 antes; 1128284/300 después. Las fuentes externas sin Timing-Allow-Origin pueden registrar cero bytes. Las entradas adicionales incluyen fuentes completadas en segundo plano, no una segunda instancia del editor.

Se observaron 18 llamadas al middleware de Auth por carga antes, incluso con caché. Cada llamada original valida por HTTP contra Supabase. No se midió la latencia del proveedor con una cuenta real. Después se reutiliza durante cinco segundos la validación reciente de la misma sesión para la ráfaga de assets; no se comparte entre usuarios. La expiración se acota por el JWT cuando está presente y la revocación local continúa inmediata. Catálogo y rutas no estáticas siguen validándose normalmente.

Los assets versionados usan caché privada immutable; HTML, manifiesto y catálogo no-store. Cambiar la instantánea requiere una URL con versión nueva. Service worker ya excluye /admin/resumenes; no interviene en su caché. El iframe no se recrea al cambiar de sección. La precarga autenticada solo descarga recursos, no HTML/documentos ni ejecuta módulos. El CSS final es el original; Google Fonts y Font Awesome se entregan sin bloquear el render. El adaptador en servidor retira únicamente el @import de fuentes de la respuesta CSS y añade su misma URL como stylesheet asíncrona. Los archivos de la instantánea no cambian.

No se difieren inicializadores internos: modificar toolbar/canvas/state requeriría trabajo dentro del editor. DOCX se procesa bajo demanda por el manejador original.

## Catálogo real y significado de plantilla

`formacion.js` exporta áreas y cursos; `formacion-ui.js` consume ese registro y carga contentFile. Los cursos con datos usan `data/contratos.json`, `data/laboral.json`, `data/penal.json` y `data/tributario.json`. Cada fila es una tarjeta de tema con id/titulo/imagen y contenido, htmlFile, pdf o imagenes. El modal público usa ese contenido. No existe en estos archivos un registro de plantillas, slots, cupos, publicación editorial ni un estado completo/parcial.

El selector lee ese registro del servidor en /admin/resumenes/catalog; no mantiene otra lista. Expone los temas reales como destinos candidatos. Un tema sin contenido aparece primero y puede seleccionarse para la futura conexión. Uno con contenido permanece visible desactivado para evitar sobrescritura. Ambos muestran que la capacidad no está definida; no se asigna un supuesto número de espacios. Para activar estados de disponibilidad se necesita acordar qué es una plantilla, su relación con temas/resúmenes y si tiene uno o varios cupos, con sus ocupaciones persistidas.

Las imágenes actuales son portadas o páginas JPG/PNG bajo assets, y URL externas (por ejemplo Unsplash), no fondos con una capacidad. No hay Storage, cuota de resúmenes, límite de subida ni dimensiones obligatorias definidos para este módulo. El endpoint de imágenes de legislación no se reutiliza ni se modifica. Por eso Añadir plantilla, solo owner, prepara una propuesta local de tarjeta base y no ofrece un fondo inventado ni carga archivos públicos. Esa propuesta no se guarda al cerrar/recargar.

CONTINUAR pertenece al header administrativo fijo. Permite área, curso, tema real o propuesta local y resumen final. CONFIRMAR PUBLICACIÓN sigue desactivado: no hay POST de publicación. No crea filas, archivos públicos, roles o usuarios. No se extrae ni envía contenido del documento al catálogo.

Para conectar después hacen falta modelo persistente de resumen/destino/plantilla, capacidad si corresponde, permisos de redacción/revisión, guardado y revisión del contenido final, almacenamiento de imágenes y un endpoint de confirmación con actualización de la página pública. Nada de eso se implementa en esta fase.

## Observaciones DOCX

`admin-summary-frame.js` se inyecta en la respuesta HTML de la integración. Redirige únicamente alert con prefijo Revisa la importación hacia details en el administrador. Valida origen y ventana emisora. Mantiene texto como textContent. Los demás alert, incluidos fallos de importación, conservan su funcionamiento. No se modifica el parser ni se eliminan observaciones generadas por él.

## Verificaciones

`tests/summary-selection-browser.cjs` usa Chromium y cuenta owner simulada: una carga de iframe, catálogo público real, filtro de cursos, propuesta local, confirmación desactivada, importación de DOCX generado real con Mammoth/JSZip, Vista Web, notificación no bloqueante y ausencia de excepciones JavaScript. Capturas en tests/summary-selection-modal.png y tests/summary-selection-browser.png. La prueba HTTP verifica protección de recursos. La autenticación de una cuenta real queda fuera de estas pruebas; no se modifica ninguna cuenta.
