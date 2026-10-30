# Visor público y ortografía — 2026-10-30

## Alcance

- Sin escrituras en Supabase ni cambios de estados, permisos, cartillas o imágenes.
- El visor envuelve `preview_html` en memoria; no lo reescribe en almacenamiento.
- Modal y enlace directo de resumen usan la misma presentación pública.
- No se modifica Canvas, selección, movimiento ni publicación editorial.

## Diagnóstico visual

La publicación de Ciencia Política contiene una hoja con `min-width:1200px`,
superior al ancho de su iframe. Incluye cajas libres con posiciones absolutas:
hacer fluida únicamente la hoja deja cajas e imágenes fuera de pantalla.
El visor conserva su espacio de coordenadas y escala el iframe completo mediante
transformación, sin cambiar las métricas internas de texto ni sus saltos de línea;
los documentos sin cajas libres son fluidos. No se usa recorte horizontal.
En pantallas pequeñas las composiciones libres se ven proporcionalmente menores.
El contenedor descarta únicamente la huella vacía de la caja de layout sin escalar:
el documento completo cabe en el iframe y mantiene su desplazamiento vertical.
La política CSP se inserta dentro de `head`, no antes del doctype, para evitar
el modo quirks y sus diferencias de métricas respecto al editor.

La separación inicial sumaba margen inferior de encabezado (32px), padding
inferior (12px) y la geometría del bloque. Solo esos valores predeterminados
del encabezado público se reducen; no se alteran offsets ni espacios interiores.
Las cajas libres reciben la misma compensación visual de 28px que el flujo al
reducirse el encabezado, para conservar sus alineaciones con el resto del cuerpo;
sus coordenadas almacenadas no cambian.

Tipografía predeterminada: Roboto 16.8px, peso 400, interlineado 1.8;
encabezados Playfair Display. Por elección del usuario, las fuentes inline
explícitas —incluida Merriweather— se conservan, al igual que formatos y colores.
También se conserva la fuente propia de los componentes jurídicos existentes:
forzar una sustitución cambia sus métricas y puede invadir cajas libres. La
normalización afecta valores heredados, no estilos propios de componentes.

## Ortografía

Los campos editables existentes y los añadidos posteriormente reciben `es-PE`
y `spellcheck=true`, sin eventos de edición ni modificación de texto.
El navegador gestiona el diccionario español compatible y sus sugerencias.
No hay una API web para instalar o verificar el diccionario es-PE del usuario:
el subrayado y el menú requieren revisión ortográfica/español habilitados en su navegador.
No se dibujan subrayados CSS ni se usa un servicio externo de corrección.

## Auditoría del asistente (sin invocar Gemini)

1. En el modal de un resumen, el contenido está en un iframe aislado. El asistente
   lee `.container`/`main` de la página contenedora: no recibe el texto del resumen.
   No puede garantizar respuestas basadas en ese resumen.
2. La legislación cargada mediante `LNEActiveNorm`/`LNENormas.captureData` sí se
   filtra por número y palabras clave antes de enviarse al proxy.
3. `/api/chat` solo reenvía el cuerpo a Gemini. No consulta `articulos_legales`
   ni dispone de recuperación global de artículos por sí mismo. Puede usar los
   artículos ya cargados en la página; no consultar libremente otra norma.
4. En páginas directas con texto visible existe el fallback de lectura DOM;
   no equivale a una integración completa de resúmenes ni búsqueda global.

Modificación futura mínima: proporcionar al asistente el texto de la publicación
activa, obtenido por la API pública y mantenido fuera del iframe, limpiar ese
contexto al cerrar/cambiar resumen y añadir recuperación de artículos publicados
en servidor si se desea consultar otras normas. No se implementa aquí.
La disponibilidad real de Gemini no se certifica mediante esta auditoría estática/mock.
