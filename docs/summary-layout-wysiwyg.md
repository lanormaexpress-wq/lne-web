# Composición compartida y altura de texto

El canvas sigue siendo el único motor (`LNECanvas.renderDocument`). Vista Web y
el fragmento exportado usan `LNERenderer.compileToHTML`; el snapshot editorial
usa `compileToDocument`, con las mismas hojas CSS originales en su orden.
No cambia el workflow, permisos, modelo de bloques ni tablas.

## Causas verificadas

- Formato inline anidado alrededor de elementos de bloque (`span > div`, incluso
  varios niveles) produce líneas anónimas en Chromium contenteditable que no
  existen en lectura. En una copia local de 52 bloques el desfase acumulado
  superaba 140 px. `display:contents` solo para esos envoltorios textuales conserva
  herencia tipográfica sin generar cajas extra. No elimina HTML ni líneas escritas.
- `layout.heightMode=minimum` podía mantener una caja textual de 600 px aunque
  su texto requiriera unos 33 px. Se ignora esa altura en la presentación textual,
  sin reescribir el estado al abrir.
- Copiar `CSSRule.cssText` no conserva fielmente ciertos shorthands con variables
  y omite CSS externo por CORS (incluida iconografía). La salida completa ahora
  referencia los mismos assets CSS públicos/versionados y estilos inline del head.
- Se eliminaron diferencias geométricas de la antigua clase web-preview-mode y
  se comparte la altura mínima de una línea incluso sin contenteditable.

## Altura intrínseca

Títulos (todos sus niveles), párrafos, listas y componentes jurídicos principalmente
textuales usan altura intrínseca del navegador (`height:auto`). Al cambiar texto,
fuente, ancho o líneas se recalcula el layout real, sin estimaciones por caracteres.
ResizeObserver observa las cajas y ajusta el límite de la hoja para objetos libres;
no escribe en el estado, historial, autosave ni base de datos.
Los márgenes semánticos y spacingBefore/After existentes se conservan, no se
convierten en una altura fija. No se añaden márgenes compensatorios globales.

Se excluyen imágenes, tablas, columnas, cuadros, comparación, iconos, recursos
visuales y contenido rico con imágenes/tablas incrustadas. Sus controles manuales
se mantienen. Las coordenadas libres y offsets deliberados no se reorganizan:
no se pueden corregir automáticamente superposiciones dibujadas por el autor sin
alterar su composición. Los documentos publicados previamente conservan su snapshot
hasta una actualización explícita; esta corrección no republica datos reales.

## Pruebas

`node tests/summary-layout-browser.cjs` ejecuta A–H, tipografía 16/24/16,
ancho, caja heredada, HTML anidado, tabla manual, posición libre, entrada/borrado,
payload público en iframe y F5. Usa Express local y Chrome, sin Supabase.
Los artefactos van a un directorio temporal o a `LNE_VISUAL_OUTPUT`.
Con `LNE_REAL_COPY=1` puede contrastarse una copia local
`real-document-copy.json` (propiedad content_lne) en ese directorio, sin escribirla
en la base de datos. No incluir trabajo real en Git.

Queda tolerancia de redondeo de fuente/bordes al usar zoom fraccional; en la copia
de 52 bloques se midieron aproximadamente 2 px acumulados, sin pérdida de líneas.
Las fuentes externas necesitan red igual que en el editor existente.
