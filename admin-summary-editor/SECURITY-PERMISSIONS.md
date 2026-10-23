# Permisos persistentes y limpieza previa al despliegue

## Modelo y límites

`public.admin_user_permissions` almacena perfil, mapa booleano, fecha y otorgante. El perfil es un preset, no una autorización por sí mismo. Los permisos efectivos se verifican contra la cuenta Auth existente y la tabla protegida. No hay nombres/correos especiales en producción. No se guardan contraseñas fuera de Supabase Auth.

OWNER se reconoce por `auth.users.raw_app_meta_data.role`, conserva acceso a cualquier permiso futuro y no depende del mapa de checks. `private.admin_allowed` utiliza identidad y metadatos vivos, no un rol arbitrario proporcionado en el cuerpo ni claims de usuario. La tabla no permite autoasignarse permisos. El directorio expone solo nombre, correo, perfil, estado, último acceso y permisos.

REDACTOR: summary_access, summary_create, summary_import, summary_edit, summary_save, summary_submit_review. Puede recuperar y corregir sus BORRADORES/EN_REVISION, no documentos ajenos.

REVISOR: permisos de REDACTOR + summary_review + summary_publish. Puede acceder a documentos ajenos EN_REVISION/PUBLICADO, no a borradores ajenos. Publicar exige EN_REVISION y destino válido.

La eliminación de publicaciones y las mutaciones de cuentas/permisos quedan reservadas a OWNER según la restricción expresa de esta fase. `users_manage` puede conceder consulta del directorio; NO permite modificar cuentas. Los checks correspondientes están identificados como reservados. `summary_cards_manage` permite gestionar cartillas con controles backend/RLS/Storage. Los permisos jurídicos preexistentes por norma permanecen en `permisos_editor`; el permiso de acceso de sección no los amplía.

El último OWNER no se puede eliminar, bloquear ni degradar: protección de backend y trigger transaccional en Auth con bloqueo asesor. Se probó eliminación/degradación en transacciones revertidas. Las ediciones de permisos sin cambio de perfil Auth no tocan app_metadata ni user_metadata; un cambio explícito de nombre conserva los demás campos de user_metadata. Cambiar rol utiliza Auth Admin conservando los demás app_metadata.

## Retirada de publicaciones

RESÚMENES → PUBLICADOS ofrece ELIMINAR PUBLICACIÓN únicamente a OWNER, con confirmación Cancelar/Eliminar. Un RPC transaccional bloquea el documento, elimina solo su snapshot público y lo devuelve a BORRADOR sin perder contenido. Conserva cartilla e imagen. El publicado no se vuelve editable de otra manera. No existe un endpoint de borrado arbitrario del documento.

La limpieza excepcional autorizada identificó y eliminó definitivamente estos dos documentos de prueba y sus snapshots (no se creó una copia de recuperación):

| Documento/publicación | Título | Curso | Cartilla |
|---|---|---|---|
| 8f2c047b-0b62-4e3e-baff-13d3de78fc55 | El Estado — prueba del flujo editorial | ciencia-politica | 55a70eb5-b62b-42d3-b3ac-2ef0cee9c6d2 |
| 1f615cc4-6c5b-4247-b3a6-6df691775e7f | EL ESTADO | derecho-constitucional | 08dd0dc2-cfd3-4148-9e6f-a9727c196a61 |

Rutas públicas: `/formacion/ciencia-politica?class=summary-8f2c047b-0b62-4e3e-baff-13d3de78fc55` y `/formacion/derecho-constitucional?class=summary-1f615cc4-6c5b-4247-b3a6-6df691775e7f`.

Las imágenes asociadas se conservaron porque las cartillas aún las referencian:

- `06e75511-e1ef-4f60-a534-8fbcf1503068/55a70eb5-b62b-42d3-b3ac-2ef0cee9c6d2/614c3b91-6143-498b-ac2f-08cff4c5b045.webp`
- `06e75511-e1ef-4f60-a534-8fbcf1503068/08dd0dc2-cfd3-4148-9e6f-a9727c196a61/3e722533-a213-4a2d-ad7e-9a8812ec225a.webp`

Tras eliminar: 0 documentos/snapshots de esos IDs, 2 cartillas conservadas. GET anónimo de ambos snapshots devuelve 404; ambos índices consultados responden 200 sin esas publicaciones. Una URL de imagen firmada emitida anteriormente puede seguir válida hasta su expiración (normalmente una hora); ya no se emiten nuevas firmas públicas por esas publicaciones.

## Archivos de esta fase

Nuevos: admin-permission-catalog.js, admin-users.js, lib/admin-users.js, migration/admin-granular-permissions.sql, migration/admin-storage-permissions.sql, migration/admin-permissions-hardening.sql, tests/admin-permissions-browser.cjs y este informe.

Modificados: server.js, admin.html, admin.js, admin-session.js, admin-summary-integration.js, admin-summary-tools.js, admin-summary-selection.js, admin-summary-workflow.js, lib/summary-editor.js, lib/summary-permissions.js, lib/summary-documents.js, lib/summary-templates.js, tests/summary-editor-integration.cjs, tests/summary-workflow-browser.cjs y tests/summary-workflow-rls.sql.

Las pruebas regeneran sus capturas/métricas locales: tests/summary-recovery-visible.png, summary-recovery-network.json, summary-workflow-public.png, summary-tools-toolbar.png y summary-tools-results.json. Cambios previos ajenos del repositorio se preservaron.

## Evidencia de pruebas

- `tests/summary-workflow-rls.sql`: ejecutado en el proyecto conectado, TODO dentro de BEGIN/ROLLBACK. Identidades de prueba sin password/identities/sesiones solo dentro de la transacción; no quedaron usuarios reales. Verifica OWNER total/futuro, último OWNER, permisos vivos, claims falsos, revocación sin renovar JWT, aislamiento de autor, revisión, publicación y retirada conservando borrador/cartilla; anon solo snapshot público.
- `tests/admin-permissions-browser.cjs`: Chromium real, admin real, middleware de autorización de server.js y routers reales con proveedor simulado. OWNER muestra cuatro secciones; REVISOR/REDACTOR solo Resúmenes. Importar/Nuevo/CONTINUAR disponibles; accesos directos a API jurídica/conversor/usuarios y HTML del conversor rechazados. REDACTOR recibe 403 al publicar/retirar. Presets de checks, sesión tras denegación, último OWNER 409 y falta de clave de servidor 503.
- `tests/admin-session-regression.cjs`: renovación, revocación, caducidad, logout, recarga/nueva pestaña y assets sin consultas Auth adicionales.
- `tests/summary-editor-integration.cjs`: acceso privado, dependencias, no-cache y logout.
- `tests/summary-recovery-browser.cjs`: canvas/toolbar/inspector, selector Word y F5, sin errores; cero consultas editoriales al iniciar.
- `tests/summary-workflow-browser.cjs`: escritura inline real, autosave, cierre y reapertura de Chromium, JSON completo, revisión sin publicar, corrección mismo ID, publicación, contenido público y retirada OWNER conservando borrador/cartilla/imagen.
- `tests/summary-tools-browser.cjs`: DOCX, herramientas y carga diferida, sin errores.
- Los 19 archivos del editor integrado son idénticos SHA256 al original externo. No se modificaron parser, iframe de integración ni renderizadores públicos. Se reutiliza el mismo puente de sesión opaco, ampliado de /admin/resumenes a /admin para autorizar también el HTML del conversor; no se cambió el login SDK. Las denegaciones 403 ya no revocan sesiones válidas.
- Artículos jurídicos: 5,569 antes/después, checksum completo idéntico `20d0a8db63ca5069d3a5bddeb76212f6`. OWNER real permanece único y con su rol intacto.

## Pendientes antes de producción

- No se encontró SUPABASE_SERVICE_ROLE_KEY en el entorno inspeccionado ni .env local. Configurar exclusivamente en servidor/gestor de secretos, nunca en navegador o Git. Alta/baja de cuentas, cambios de nombre y promociones/degradaciones Auth necesitan esa clave. El directorio y los permisos ya no dependen de ella. No se probó crear cuentas Auth reales.
- Las pruebas de los tres perfiles fueron simulación de proveedor + RLS real con rollback, no inicios de sesión de tres cuentas reales. Hacer una aceptación final con cuentas autorizadas después de configurar la clave.
- El puente existente usa memoria del proceso: al reiniciar requiere recargar/sincronizar desde la sesión SDK. Antes de varias réplicas, planificar almacenamiento compartido. Usar HTTPS y proxy de confianza correctamente configurado para cookies Secure. Recargar sesión/interfaz para reflejar inmediatamente nuevos menús; backend/RLS consultan los permisos actuales en cada operación.
- Supabase Advisors mantiene advertencias preexistentes: leaked password protection deshabilitada y funciones públicas SECURITY DEFINER rls_auto_enable/lne_can_edit/import/publish. Revisarlas antes del despliegue; las funciones privilegiadas nuevas están en private con EXECUTE restringido. Los nuevos avisos de índice/FOR ALL redundante detectados durante el trabajo se corrigieron.
- Referencias: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection y https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable

No se ejecutó Git push ni despliegue. Solo se reinició Express local después de verificar proceso y contenido servido.
