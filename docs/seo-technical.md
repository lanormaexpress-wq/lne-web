# SEO público de La Norma Express

## Alcance y auditoría (2026-10-28)

Base: `25763a7`, rama local `fix/formacion-overlay-layout`, alineada con
`origin/main` al comenzar. Repositorio: `lanormaexpress-wq/lne-web`.
Producción usa `main` en Coolify, con Nixpacks y Node 22.

Problemas comprobados antes del cambio:

- El HTML de las rutas públicas contenía una shell con `#app-content` vacío.
- Todas las páginas compartían título y carecían de descripción, canonical,
  Open Graph y JSON-LD por ruta.
- El fallback de Express respondía 200 e index.html para URLs inexistentes,
  incluidas muchas terminadas en `.html` (soft 404).
- Los artículos dependían de JavaScript y `?art=`, sin documentos individuales
  ni un índice de enlaces HTML en la respuesta inicial.
- Los materiales se abrían en modales sin URLs individuales indexables.
- No existían robots.txt ni sitemap.xml.

La auditoría de solo lectura encontró 10 normas publicadas y 5,569 registros
jurídicos publicados; otra norma estaba en borrador. No había snapshots en
`summary_publications`. No se realizó ningún cambio de datos o de esquema.

## Implementación

`lib/public-seo.js` es un modelo de lectura independiente de los módulos
administrativos. Usa exclusivamente la URL y clave pública existentes,
RLS y filtros `estado=publicado` para normas y artículos. Los resúmenes se
leen únicamente de `summary_publications`, nunca de documentos de trabajo.
No usa claves de servicio, cookies, sesiones privadas ni escritura.

Todos los visitantes reciben el mismo HTML inicial, sin detección de bots:

- Portada, directorio de legislación, índices de normas y formación.
- Normas: introducción real, índice de enlaces a los artículos/disposiciones
  y tres textos iniciales. La SPA conserva la lectura completa habitual.
- Artículos: documento con el texto público completo, contexto de la norma,
  encabezado y enlaces anterior/siguiente. Se mantiene después de ejecutar JS.
- Cursos: materiales públicos locales y snapshots públicos, cuando existan.
- Temas y resúmenes: documentos de lectura con contenido real. Los cursos y
  modales originales conservan su interacción y aspecto.

Patrones de URL:

```
/legislacion
/legislacion/:slug
/legislacion/:slug/articulo/:numero_codificado
/formacion
/formacion/:area_o_curso
/formacion/:curso/tema/:id
/formacion/:curso/resumen/:uuid_publicado
```

Se conserva la numeración original. Las claves con `#` se codifican como
`%23`, para distinguir apariciones en secciones diferentes. Las declaraciones
y disposiciones no se renombran arbitrariamente como artículos.
Los textos exactamente duplicados dentro de una norma apuntan a un único
documento mediante 301; no se eliminan ni alteran registros.

Cada página incluye título, descripción, canonical absoluto sin parámetros,
Open Graph, Twitter y JSON-LD (Organization, WebSite, BreadcrumbList y
Legislation/Course/LearningResource/CollectionPage según corresponda).
No se inventan fechas de vigencia, autores, precios, ratings ni acreditaciones.
`lastmod` y `dateModified`, cuando existen, proceden de timestamps reales del
registro público; no se presentan como fechas de entrada en vigor de la ley.

`seo.js` sincroniza los metadatos durante la navegación SPA y convierte los
encabezados ya existentes de artículos en enlaces rastreables, con el mismo
aspecto. No se cambian hojas de estilos, editores ni cartillas. `router.js`
conserva su lógica y delega al servidor solo las nuevas URLs de documentos.

## Rastreo y estados HTTP

- `https://lanormaexpress.dpdns.org/robots.txt`: permite los recursos y APIs
  públicas necesarias para renderizar; excluye administración y rutas internas.
- `https://lanormaexpress.dpdns.org/sitemap.xml`: URLs absolutas, reales,
  públicas, con contenido suficiente; sin parámetros, borradores, vacíos,
  páginas en preparación ni duplicados de texto.
- El sitemap pagina Supabase en lotes de 1,000, con hasta cuatro lecturas
  concurrentes y conteo exacto para comprobar que no falten lotes. Si crece por encima de 10,000
  URLs, pasa a ser un índice de sitemaps de hasta 10,000 URLs por archivo.
- Catálogo en memoria durante 60 segundos, con una sola carga concurrente.
  La portada y los cursos usan un catálogo ligero independiente: no esperan
  el escaneo global de artículos del sitemap. Las lecturas de artículos se
  limitan a la norma solicitada.
  El sitemap HTTP también tiene max-age=60: un cambio puede tardar hasta dos
  minutos en desaparecer de una copia cacheada del sitemap.
- Las páginas individuales revalidan inmediatamente los estados públicos;
  el texto de un documento retirado no se sirve desde esa caché.
- Contenido inexistente/privado: 404. Fallo de lectura: 503 y Retry-After,
  sin convertir una caída de datos en una página vacía indexable.
- Los fragmentos `/pages`, datos, API y administración llevan `noindex`.
  Esto complementa las protecciones existentes; robots.txt no es autenticación.
- Se conservan las redirecciones históricas. `?art=` redirige al documento
  correspondiente. Los parámetros de modal siguen funcionando y su canonical
  apunta al curso.
- Se conserva sin cambios `googlea91f2d4ac41a836d.html` y su ruta preferente.
- Se actualiza la versión del service worker para el código SEO. Verificación,
  robots y sitemaps se consultan siempre en la red.

Se incorpora `sanitize-html@2.18.1`, con versión fija y lockfile. El texto
publicado se limpia antes de insertarlo en los nuevos documentos: se eliminan
scripts, eventos, iframes, formularios y URLs JavaScript. Las vistas públicas
anteriores y su renderer compartido no se modifican.

## Archivos

Nuevos: `lib/public-seo.js`, `seo.js`, `tests/public-seo.cjs`,
`tests/public-seo-live.cjs`, `docs/seo-technical.md`.

Modificados: `server.js`, `index.html`, `router.js`, `sw.js`, `package.json`,
`package-lock.json`. No se cambian Supabase, Auth, administradores, editores,
cartillas, permisos, IA ni CSS. Los archivos ajenos sin seguimiento se
mantienen fuera del commit.

## Validación

```
node tests/public-seo.cjs
$env:LNE_SEO_BROWSER='1'; node tests/public-seo.cjs
$env:LNE_SEO_LIVE='1'; node tests/public-seo-live.cjs
# Opcional: probar un servidor ya iniciado o producción, sin iniciar otro:
$env:LNE_SEO_BASE_URL='https://lanormaexpress.dpdns.org'
node tests/public-seo-live.cjs
node tests/admin-session-regression.cjs
node tests/summary-publication-update.cjs
node tests/legal-source-sync.cjs
npm audit --omit=dev
git diff --check
```

Las pruebas HTTP cubren HTML sin JS, metadatos y JSON-LD, paginación >1,000,
borradores, revocación con caché caliente, duplicados, vacíos, XSS, enlaces,
301, 404, 503, noindex y el archivo de Google. Chrome verifica navegación SPA,
metadatos, recarga de artículos y funcionamiento de los modales de cursos.
Las regresiones existentes verifican sesión, permisos de publicación y
sincronización del contenido jurídico, con proveedores simulados.

La integración GET con Supabase real pasó para las diez normas, artículos
de diferentes posiciones del índice, cursos, temas, protección administrativa,
fragmentos, URLs inexistentes y el archivo de Google. Resultado en esa lectura:
**5,543 URLs de sitemap, incluidas 5,496 páginas jurídicas individuales**.
La diferencia con los 5,569 registros es contenido insuficiente o idéntico
excluido de indexación, sin borrar o editar registros. Los conteos cambian
automáticamente con las publicaciones futuras.

En una medición local con datos reales, la portada tardó 2.1 segundos al
llenar la caché y 6 ms con caché caliente. Es una medida de integración desde
el equipo de desarrollo, no una promesa de tiempos de producción o de Core
Web Vitals. El sitemap se construyó en 5.6 segundos en esa medición.

## Publicación y Search Console

Antes del push: fetch, verificar que el commit desciende de `origin/main`,
revisar exactamente los archivos preparados y ejecutar las pruebas. Push
normal `HEAD:main`, sin force. Coolify está configurado externamente y recibe
el webhook; no hay Dockerfile ni definición de despliegue dentro del repo.

En Coolify: aplicación **la norma express**, Git Source
`lanormaexpress-wq/lne-web`, rama `main`, Nixpacks, puerto 3000. En Deployments,
confirmar el SHA nuevo y Success/Finished, después el contenedor Running.
Solo si no se dispara el webhook, usar Actions → Deploy/Redeploy conservando
la configuración existente. No confundir commit/push con despliegue.

Después, ejecutar la integración con `LNE_SEO_BASE_URL` de producción y confirmar
el sitemap y el contenido exacto de Google por HTTP.

En Search Console, seleccionar la propiedad de `https://lanormaexpress.dpdns.org/`,
abrir **Indexación → Sitemaps**, introducir **sitemap.xml** (o la URL absoluta
`https://lanormaexpress.dpdns.org/sitemap.xml`) y pulsar **Enviar**.
Verificar después el estado de lectura. No hace falta volver a verificar la
propiedad ni borrar el archivo HTML de Google.

Prioridad de Inspección de URLs → Probar URL publicada → Solicitar indexación:

1. `https://lanormaexpress.dpdns.org/`
2. `https://lanormaexpress.dpdns.org/legislacion`
3. `https://lanormaexpress.dpdns.org/legislacion/codigo-civil`
4. `https://lanormaexpress.dpdns.org/legislacion/codigo-penal`
5. `https://lanormaexpress.dpdns.org/legislacion/constitucion`
6. `https://lanormaexpress.dpdns.org/legislacion/codigo-procesal-penal`
7. `https://lanormaexpress.dpdns.org/formacion`
8. `https://lanormaexpress.dpdns.org/formacion/contratos`
9. `https://lanormaexpress.dpdns.org/legislacion/codigo-civil/articulo/I`

El resto de artículos se descubre mediante el sitemap y los enlaces; no es
necesario solicitar miles de URLs manualmente. La elegibilidad técnica no
garantiza indexación ni posiciones. Revisar en Search Console la indexación,
canónicas elegidas y consultas de marca durante las semanas siguientes.
Los materiales solo gráficos necesitarán texto explicativo público suficiente
antes de incorporarse como documentos individuales. Los cursos en preparación
quedan fuera hasta que tengan contenido. Los futuros resúmenes publicados se
incorporan automáticamente; el flujo real de publicación no se ha alterado.

Referencias oficiales:

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://schema.org/Legislation
- https://schema.org/Course
- https://supabase.com/docs/guides/database/postgres/row-level-security
