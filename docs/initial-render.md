# Renderizado inicial: investigación y corrección

Fecha: 30 de octubre de 2026. Base investigada: `babb08f`.

## Causa demostrada

El renderizado SEO de `bd0c6c8` entregaba una presentación distinta de la SPA.
La portada del servidor mostraba todas las normas publicadas (10 en la prueba
de producción), mientras la presentación habitual mostraba las tres tarjetas.
Las normas recibían un índice y tres extractos, y los cursos un listado de texto.

El router seguía ejecutando su carga inicial: esperaba el catálogo dinámico,
reemplazaba `#app-content` por un spinner, descargaba un fragmento y volvía a
cargar los datos. La espera global por el catálogo procede de `951877a`.
Se trata de sustitución manual del DOM con `innerHTML`, no de un fallo de
hidratación de React o Vue: el proyecto no usa esos frameworks.

La reproducción en Chrome contra producción confirmó la secuencia. Civil y
Penal perdían el contenido inicial, mostraban el spinner y solicitaban de nuevo
sus artículos. Los artículos individuales, marcados como documentos del
servidor, conservaban correctamente su contenido. El administrador y su editor
no intervienen en esta secuencia. Las lecturas de Supabase y las solicitudes
redundantes prolongaban la espera; no se encontró una modificación de datos
ni de permisos como causa del cambio visual.

El video tenía además el índice MP4 `moov` al final del archivo: obligaba a
pedir rangos adicionales para empezar la reproducción. Este archivo procede
del commit inicial `5fc8c53`, por lo que el problema del índice no fue
introducido por los cambios administrativos o por SEO.

## Corrección

Express entrega las plantillas y la presentación habitual desde la respuesta
inicial. Las normas utilizan el mismo constructor de artículos que el visor
existente, con sanitización en el servidor. El navegador enlaza búsquedas,
modales y navegación sobre los nodos existentes. El catálogo y los temas ya
obtenidos se transfieren como JSON público escapado: no se vuelven a pedir
para el arranque. La navegación SPA recibe contenido y metadatos en una sola
respuesta y conserva la página actual mientras llega la siguiente.

La portada y legislación ya no esperan la consulta de los resúmenes de cursos.
El HTML se comprime con gzip mediante `node:zlib`, sin dependencias nuevas.
Las portadas locales incluyen dimensiones intrínsecas; en escritorio el texto
determina la altura de la fila para evitar que una portada descargada cambie
el alto del párrafo. El hero y las tarjetas multimedia conservan sus espacios
reservados. Se actualizaron las versiones de recursos y la caché del service
worker, conservando su funcionamiento offline.

El índice del video se movió al principio sin recodificar. Se verificaron los
bytes de las pistas y fotogramas decodificados a 0,5, 1 y 3 segundos. No cambian
contenido, duración (8,103991 s), resolución (4000 × 2160) ni presentación.

## Validación y mediciones

`tests/initial-render.cjs` compara el código de la base histórica y la
corrección con los mismos datos simulados, sesiones nuevas, caché fría y
service workers bloqueados. Cubre portada, Civil, Penal, artículo 1 de Civil,
Contratos, Formación y el área de Derecho Civil y Privado, en 1440 × 900 y
390 × 844. Comprueba texto, colores, tipografías y dimensiones con tolerancia
inferior a 2 px, ausencia de errores JavaScript, modales, SPA e historial.
También comprueba el contenido sin JavaScript.

Los scripts históricos se extraen de Git antes de medir. Se descartaron las
primeras mediciones que incluían esa extracción durante las solicitudes.
El video se valida por separado; las fuentes e imágenes externas se bloquean
en la comparación controlada. Por ello estos valores no son métricas de campo
ni promesas de rendimiento en producción.

| Página | Solicitudes adicionales API/fragmento antes → después | CLS escritorio antes → después | CLS móvil antes → después |
| --- | ---: | ---: | ---: |
| Portada | 2 → 0 | 0,0162 → 0,0005 | 0,1219 → 0,0019 |
| Civil | 3 → 0 | 0,0711 → 0,0002 | 0,1174 → 0,0012 |
| Penal | 3 → 0 | 0,0829 → 0,0002 | 0,0508 → 0,0012 |
| Artículo individual | 1 → 0 | 0,0003 → 0,0003 | 0,0019 → 0,0019 |
| Contratos | 3 → 0 | 0,0141 → 0,0001 | 0,1053 → 0,0051 |

Las sustituciones de elementos raíz del contenido inicial pasan de 5 a 0 en
portada y de 3 a 0 en normas y cursos. El artículo individual ya tenía cero.
No se cuenta como duplicada una solicitud de rango MP4 legítima ni la descarga
de recursos estáticos. Los valores anteriores de solicitudes no incluyen el
JSON histórico del curso.

Se registran TTFB, FCP, LCP y DOMContentLoaded en los JSON de las pruebas.
Por ejemplo, en escritorio: portada FCP/LCP 2576 → 932 ms; Civil 1448 → 808 ms;
Penal 1236 → 1012 ms. No todas las muestras mejoran: portada móvil FCP
1252 → 3100 ms y Contratos escritorio LCP 2540 → 2648 ms. No se afirma una
mejora universal de FCP/LCP a partir de una sola ejecución en este equipo.
DOMContentLoaded no se presenta como tiempo puro de ejecución de JavaScript.
La mejora demostrada es eliminar la interfaz provisional, su destrucción y las
lecturas de arranque redundantes.

En la prueba local específica del video: tres solicitudes de rango → una;
`loadeddata` 6774 → 3197 ms. Es una muestra local, no una medición del video
ya desplegado. Las comprobaciones de identidad de pistas y fotogramas pasan.

La integración real de solo lectura verificó las diez normas, artículos de
distintas posiciones, Contratos y su tema, 404, redirecciones, autenticación,
archivos privados, robots y verificación de Google. El sitemap observado
contiene 5546 URLs, de ellas 5496 de artículos. No se escribieron datos.

Regresiones: SEO HTTP y navegador, Node 22.11.0, sitemap concurrente y offline,
fuentes jurídicas y los 605 artículos procesales canónicos, publicación y
actualización, orden y borrado con proveedor simulado, aislamiento de storage,
sesiones, usuarios y permisos de propietario/revisor/redactor. Una aserción
antigua de la prueba de sesiones no admitía `state.js?v=...`; se adaptó a los
recursos versionados sin cambiar el código administrativo.

Se observaron fallos de red en algunas primeras sesiones de Chrome y se
repitieron las pruebas afectadas. La reproducción real también encontró una
imagen histórica de Unsplash bloqueada por ORB, tanto antes como después.
No se sustituyó esa imagen por otra, para conservar el contenido solicitado.
El texto adjunto estaba disponible; la grabación mencionada no llegó adjunta.

## SEO y protección del proyecto

Se conservan metadatos, canonical, JSON-LD, robots, generación y URLs de sitemap,
redirecciones, estados HTTP, filtros de publicación y contenido de los artículos.
Los enlaces de artículos se incluyen en el HTML inicial. Las tarjetas de temas
publicados conservan enlaces nativos a sus páginas, y JavaScript mantiene la
apertura habitual del modal. Google recibe contenido jurídico real sin esperar
el arranque de la SPA. No se oculta el contenido completo hasta cargar JavaScript.

El checkout principal estaba 25 commits detrás y tenía archivos sin seguimiento.
Se reutilizó el checkout actualizado `LNE-Web-formacion-overlay-layout`, que
coincidía con `origin/main`, creando `fix/initial-render-hydration`. Las migraciones,
imágenes y resultados previos sin seguimiento se conservaron fuera del commit.

Archivos de la corrección:

- `lib/public-seo.js`, `lib/public-presentation.js`, `lib/summary-documents.js`.
- `router.js`, `seo.js`, `dynamic-legislation.js`, `legislacion.js`, `formacion-ui.js`.
- `legal-visual-renderer.js`, `legal-introduction-renderer.js`, `legal-introduction.css`.
- `home-search.js`, `pages/home.html`, `index.html`, `sw.js`, `assets/fondo.mp4`.
- `scripts/faststart-video.cjs`.
- `tests/initial-render.cjs`, `tests/video-faststart.cjs`, `tests/public-seo.cjs`,
  `tests/admin-session-regression.cjs` y este informe.

## Publicación

Pendiente de la comprobación final y de la publicación por GitHub/Coolify.
No confundir la validación local con una corrección ya desplegada.
