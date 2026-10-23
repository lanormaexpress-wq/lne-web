# Plantillas administrables de resúmenes

Tabla nueva: public.summary_templates. Bucket nuevo privado: summary-template-images. Migración aplicada al proyecto lanormaexpress: migration/summary-templates.sql. No hay cambios de publicación ni de los JSON de formación. Identificador del curso: formacion.js → courses[].id, validado en servidor; no se inventa una tabla de cursos.

Lectura: owner/editor. Crear, editar, eliminar: solo owner tanto en middleware como en RLS. Se usa el JWT validado de la sesión administrativa y la clave publicable; no se requiere service_role. Las URL de imagen se firman por una hora y se renuevan al consultar la lista. Rutas de archivos: user_id/template_id/uuid.webp. Imágenes binarias en Storage; solo image_path en SQL. No hay Base64 en la tabla ni almacenamiento permanente local.

El módulo admin-summary-templates.js se importa al abrir CONTINUAR. El listado se consulta al seleccionar curso. Los temas de JSON permanecen como referencia separada y desactivada. Crear una plantilla no los sustituye ni publica nada. CONFIRMAR PUBLICACIÓN sigue desactivado. Las plantillas guardadas se muestran Disponible porque todavía no se vinculan a resúmenes ni existen cupos.

## Imagen

Medición en Chromium usando pages/curso.html, formacion-ui.js y style.css reales: imagen 16:10, object-fit cover; anchos 345.3px (viewport1600), 413px (992), 700px (768), 322px (390). Máximo observado:700×437.5px. Límite de optimización:1408×880, redondeado ligeramente por encima de 2×. El archivo conserva su proporción, no se amplía si es pequeño; el preview usa el mismo encuadre cover 16:10 del sitio.

JPG/PNG/WebP se decodifican con orientación EXIF del navegador, canvas los reduce y convierte a WebP. Calidad inicial .86; si supera 400KiB, se prueba .80/.74/.68. 150–400KB es una referencia, no un rechazo automático. El límite técnico del endpoint/bucket es4MiB por imagen ya optimizada; no representa una supuesta cuota del plan. Se comprueban MIME, firma WebP y dimensiones en servidor. No se cambia el comportamiento de las imágenes del documento.

Prueba: assets/imagenes/contratos1.png existente, 2048×2048, 8,995,055bytes → 880×880 WebP,120,350bytes:98.66% menos. La fuente pública no se modificó.

## Guardado y limpieza

Se carga una ruta UUID nueva antes de crear/actualizar el registro. Si falla el guardado se intenta eliminar la subida sin referencias. Reemplazar imagen guarda primero la referencia nueva y después elimina la anterior solo si ninguna fila la usa. Eliminar requiere confirmación, elimina la fila y después su imagen sin referencias. La política Storage también impide borrar objetos todavía referenciados. No se sobrescriben rutas ni imágenes ajenas. Si falla una limpieza por red/permisos, se devuelve una advertencia explícita; no se presenta como limpieza completada. No hay transacción distribuida entre Storage y Postgres.

## Pruebas y límites

Migración y auditoría en Supabase real; owner CRUD y editor rechazado comprobados bajo RLS con claims de prueba y transacción revertida. No se cambiaron usuarios/roles ni quedaron filas de prueba. Existían y siguen existiendo5,569 artículos.

tests/summary-templates-browser.cjs usa Chromium, formulario real, endpoints Node reales y Supabase/Storage simulados. Verifica crear en Ciencia Política, reabrir, recargar, editar nombre, reemplazar y limpiar imagen vieja, eliminar y limpiar imagen, y confirmación pública desactivada. Resultado en tests/summary-templates-results.json; captura tests/summary-template-preview.png. No equivale a una subida real con el owner del navegador; esa prueba de Storage queda pendiente.

El servidor debe reiniciarse para activar el nuevo router; el editor original y sus19 archivos versionados no se modifican. No se cambiaron carga, iframe ni autenticación.
