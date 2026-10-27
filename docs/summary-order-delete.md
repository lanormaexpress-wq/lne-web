# Orden de cartillas y eliminación definitiva

## Orden

En CONTINUAR → curso → Cartillas administrables, cada cartilla muestra su posición y controles ↑ / ↓. Requiere el permiso existente `summary_cards_manage` además de `summary_access`; no se cambian roles ni presets.

Se reutiliza `summary_templates.sort_order`. El RPC valida el listado esperado, rechaza concurrencia obsoleta y actualiza todas las posiciones en una transacción por curso. El trigger de inserción añade nuevas cartillas al final. Editar o actualizar una publicación no modifica el orden, IDs, imágenes ni URL.

La API pública obtiene publicaciones ordenadas por su cartilla. El componente público conserva las tarjetas históricas y su orden relativo, después de las publicaciones administrables. No se migran ni alteran esas referencias estáticas.

El catálogo anónimo devuelve exclusivamente campos ya públicos de `summary_publications`. Su RPC de lectura tiene `SECURITY DEFINER`, búsqueda vacía y una consulta fija, sin SQL dinámico: no devuelve borradores ni cartillas privadas. Esto genera un aviso intencional del asesor de Supabase; no se conceden permisos anónimos sobre el esquema privado.

## Eliminar definitivamente

En RESÚMENES → BORRADORES / EN REVISIÓN / PUBLICADOS, OWNER dispone de ELIMINAR DEFINITIVAMENTE. Se mantiene aparte la retirada de publicación existente, que conserva el borrador. El permiso reservado actual no se amplía a REDACTOR ni REVISOR.

Se confirma título y efecto irreversible; en publicados se advierte que desaparecerán de la web. La solicitud incluye versión y confirmación explícita. `delete_summary_document` verifica OWNER en base de datos, bloquea documento/cartilla y elimina publicación, documento y cartilla exclusivamente si no quedan referencias de otro documento/publicación. Un conflicto revierte la transacción completa. No se usan DELETE + INSERT, ni se alteran cursos, áreas, cuentas o datos jurídicos.

El editor activo se limpia mediante su API existente para evitar resurrección por autosave, deshacer o F5. Otro editor que conserve una referencia eliminada no puede guardarla mediante PATCH: recibe conflicto/no disponible.

## Storage y reintento

Postgres y Storage no comparten transacción. `private.summary_image_cleanup` es una cola mínima de limpieza, sin acceso directo para clientes, creada en la misma transacción que la eliminación. No guarda documentos ni imágenes; solo identifica rutas exclusivas pendientes.

El servidor usa la API de Storage con la sesión OWNER. RLS vuelve a comprobar referencias. El RPC solo confirma limpieza cuando el objeto realmente no existe, o conserva una imagen reutilizada. Si Storage falla, el documento queda eliminado, se comunica limpieza pendiente y aparece REINTENTAR LIMPIEZA DE IMÁGENES. La cola persiste tras F5, cierre de sesión o reinicio del servidor. Nunca se modifica `storage.objects` mediante SQL ni se aceptan rutas arbitrarias del navegador.

## Comprobaciones

- `node --test tests/summary-order-delete.cjs`: contratos, roles, orden, exclusividad, versión, confirmación y reintento; proveedor simulado.
- `tests/summary-order-delete-rls.sql`: Postgres/RLS reales con claims de prueba y ROLLBACK obligatorio, sin modificar cuentas Auth.
- `node tests/summary-templates-browser.cjs`: tres cartillas, orden 3/1/2, F5, IDs estables y limpieza; Chromium real, proveedor simulado.
- `node tests/summary-workflow-browser.cjs`: autosave, revisión, actualización publicada, retirada y eliminación activa con F5; Chromium real, proveedor simulado.
- `node tests/summary-role-workflow.cjs`: aislamiento, importación y flujo de roles, con Auth simulado.

Aplicación de base de datos: `migration/summary-order-delete.sql`. Fue validada con rollback antes de aplicarse. No cambia políticas RLS existentes ni tablas jurídicas. Conservar respaldo y no volver a ejecutar a ciegas sobre una instalación ya aplicada.
