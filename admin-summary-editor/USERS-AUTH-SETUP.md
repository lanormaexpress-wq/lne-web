# Usuarios y contraseñas: configuración previa al despliegue

## Por qué fallaba

El backend ya invocaba Auth Admin, pero solo leía SUPABASE_SERVICE_ROLE_KEY y no había ninguna configurada. Dotenv cargaba según el directorio de ejecución. Ahora el servidor resuelve exclusivamente el .env del proyecto usando __dirname; las variables del proceso/hosting tienen prioridad (no se sobrescriben).

## Configuración local

Se preparó un `.env` local ignorado por Git, sin ninguna clave real. Abrirlo PRIVADAMENTE en el equipo y completar una sola alternativa:

```dotenv
SUPABASE_URL=https://higdtttcndqzapkenets.supabase.co
SUPABASE_SECRET_KEY=
# Alternativa legacy, si no se usa una Secret API Key moderna:
SUPABASE_SERVICE_ROLE_KEY=
```

Obtener la clave del MISMO proyecto en Supabase → Settings → API Keys. Preferir Secret key (`sb_secret_...`). No confundir con publishable/anon, JWT signing secret ni personal access token. No pegar la clave en chats, capturas, documentación ni comandos que queden en historial. Reiniciar `node server.js` después de configurarla. No es necesario instalar otro sistema ni cambiar tablas.

Secret moderna: se envía solo mediante `apikey`, no como JWT Bearer. Legacy service_role: `apikey` y `Authorization: Bearer`. Ambos mecanismos se limitan al módulo privado `lib/supabase-admin-auth.js`; usa HTTPS, no sigue redirects y tiene timeout. Los errores no incluyen cuerpos del proveedor, requests, claves ni contraseñas. Una clave privada configurada por error como SUPABASE_PUBLISHABLE_KEY detiene el servidor antes de exponerla por HTTP.

`.env`, `.env.local`, `.env.production` y variantes quedan ignorados; `.env.example` es una plantilla sin secretos. El servidor carga `.env`, no `.env.local`. Las rutas HTTP a archivos .env y lib/ están bloqueadas. No usar `git add -f .env`.

## Producción

Configurar SUPABASE_URL y SUPABASE_SECRET_KEY (o la alternativa legacy) en el gestor de variables/secretos del hosting. No subir .env al repositorio. Usar HTTPS, no registrar cuerpos de peticiones Auth/contraseñas en proxy/APM/analytics, y aplicar redacción de headers privados si se habilitan logs de red. Las credenciales públicas del frontend permanecen separadas. No se realizó despliegue.

## Nombre y permisos

Fuente canónica del nombre: Auth `user_metadata.name`. El directorio conserva la lectura alternativa de full_name para cuentas antiguas. Crear/editar escribe name conservando otros metadatos. No se usa user_metadata para autorizar. Perfil y permisos siguen en admin_user_permissions enlazados por auth.user.id. Rol OWNER proviene de app_metadata protegido.

Corrección de nombre propio: el formulario verifica el usuario actual mediante `auth.getUser()`. Si coincide con la ficha editada, guarda únicamente `{data:{name}}` mediante `auth.updateUser`, con la sesión normal y sin Secret Key. No envía app_metadata, email ni otros metadatos. Una edición exclusiva del nombre NO llama al endpoint administrativo ni reescribe permisos; se compara contra los checks realmente renderizados (incluidos los obligatorios de OWNER). Nombre de otra cuenta/cambio de rol permanecen en Auth Admin. Los cambios de permisos conservan el endpoint protegido existente y no requieren una clave privada por sí solos.

Si el nombre propio se guardó pero otro cambio falla, se recarga la tarjeta y se indica explícitamente el éxito parcial dentro del formulario. Al abrir nuevamente el formulario se limpia el aviso anterior. Crear sin clave privada devuelve antes de cualquier escritura: “Para crear cuentas reales debes configurar la clave privada de Supabase en el servidor.” Los campos permanecen intactos para reintentar.

Validación real de esta corrección: en la sesión OWNER existente se guardó David desde EDITAR PERMISOS. El modal cerró con “Tu nombre se guardó correctamente.” Tras recarga completa y nueva consulta de Usuarios siguió apareciendo David, OWNER y Activo. Evidencia: tests/owner-name-persisted.jpg. No se crearon otras cuentas, no se configuraron secrets y no se cambiaron roles/permisos reales.

Regresión ampliada `tests/admin-users-auth.cjs`: nombre propio sin clave privada, cero llamadas Auth Admin y cero reescrituras de permisos para esa edición, conservación de email_verified/otros metadatos, éxito parcial ante cambio de rol rechazado, y creación bloqueada sin usuarios parciales ni pérdida de nombre/correo/contraseña/perfil. Provider simulado para estos escenarios destructivos; la única escritura real fue el nombre propio expresamente solicitado.

Crear cuenta confirma el correo según la política administrativa existente, sin enviar una invitación. El formato válido de un correo NO prueba que exista el buzón/dominio; recuperación por correo requiere cuentas reales y SMTP/configuración correctos.

REDACTOR: summary_access, summary_create, summary_import, summary_edit, summary_save, summary_submit_review, summary_cards_manage.

REVISOR/PUBLISHER: los de REDACTOR más summary_review y summary_publish.

Ninguno obtiene legislación, conversor, usuarios, eliminación de publicaciones ni administración de usuarios/permisos. Se actualizaron presets, no se reasignaron permisos de cuentas existentes silenciosamente. OWNER mantiene todos sus permisos esenciales y futuros, con checks bloqueados y nota explicativa. El backend y el trigger existente siguen impidiendo degradar/bloquear/eliminar al último OWNER. Las mutaciones de otras cuentas permanecen reservadas a OWNER; users_manage por sí solo permite consultar el directorio.

## Contraseñas

- Contraseña inicial: input password; ojo mostrar/ocultar y botón COPIAR. Tras crear, confirmación USUARIO CREADO con nombre/correo/perfil y copia opcional desde memoria. Al cerrar se elimina la referencia temporal; al cerrar el formulario se limpia el input. No se ofrece recuperar contraseñas existentes.
- RESTABLECER CONTRASEÑA: OWNER introduce nueva contraseña y confirmación. Endpoint POST /api/admin/users/:id/password llama Auth Admin con únicamente `{password}`. No modifica roles, metadata ni documentos.
- MI CUENTA → CAMBIAR CONTRASEÑA: usuario autenticado utiliza su SDK `auth.updateUser({password})`, sin clave privada. Si Supabase exige sesión reciente/reauthentication, no se omite esa protección: se informa que debe reautenticarse.
- No se guardan contraseñas en tablas propias, localStorage, sessionStorage, HTML estático, URLs ni logs. Supabase Auth gestiona su hash. Solo transitan en memoria, formulario y requests TLS. El portapapeles queda bajo control del usuario que solicitó copiar; evitar gestores de portapapeles compartidos.
- `must_change_password` queda como mejora futura; no se implementó un flag cosmético sin aplicación real.

## Eliminación de cuentas

No se muestra Eliminar sobre el último OWNER. El backend comprueba propietario, última cuenta OWNER y referencias de autor/publicador/cartillas antes de borrar. Si hay contenido asociado devuelve 409 y NO elimina la cuenta: preserva author_id, trazabilidad y contenido sin cambiar FKs ni tablas del editor. Las FKs existentes sirven además de defensa ante carreras. Si Auth rechaza por otras referencias (p. ej. Storage/legislación), la eliminación falla sin borrar contenido. No hay cascada nueva, soft-delete ni reasignación de documentos. Desactivar/anonymizar conservando una cuenta con contenido sería una fase futura explícita.

## Validación

`node tests/admin-users-auth.cjs`: proveedor simulado en memoria + backend y Chromium reales. Comprueba creación y vínculo permisos/Auth, correo inválido, nombre persistente tras recarga, mostrar/ocultar, copia antes/después de creación, limpieza, reset password-only, cambio propio por SDK, rechazo 403 no-OWNER, 409 cuenta asociada/último OWNER, headers modernos/legacy, errores sin secretos y ausencia de passwords en storage/HTML. No escribe credenciales reales en artefactos; captura de UI después de limpiar los campos.

`node tests/admin-permissions-browser.cjs`: tres perfiles, menús y accesos por URL, sin usuarios reales.

También pasó `tests/admin-session-regression.cjs`. Se reinició solo Express local y se comprobó: .env/.env.local/lib privado → 403, Usuarios/reset sin sesión → 401, configuración pública sin claves privadas → 200. La consulta final mantiene un único usuario Auth/OWNER y 5,569 artículos legales; no se crearon cuentas reales ni se hicieron escrituras SQL en esta fase.

La aceptación con DOS cuentas Auth reales (un REDACTOR y un REVISOR) requiere que el propietario configure la clave local y proporcione dos correos controlados. No se inventaron buzones, no se crearon las cinco cuentas definitivas y no se afirma haber probado un proveedor real mientras falten esos datos. La configuración local de clave privada no debe confundirse con una modificación de la configuración del proyecto Supabase.

## Archivos de esta fase

Modificados: server.js, .gitignore, .env.example, admin.html, admin-permission-catalog.js, lib/admin-users.js, admin-users.js.

Nuevos: lib/supabase-admin-auth.js, admin-users.css, tests/admin-users-auth.cjs, este informe y .env LOCAL IGNORADO sin clave real. Las pruebas crean tests/admin-users-auth.png con campos vacíos.

No se modificaron editor, workflow, canvas, DOCX, autosave, iframe, renderer, publicaciones, cartillas existentes, formación, legislación, tablas ni RLS. No se hizo Git push ni despliegue.

Referencias: [API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Auth Admin updateUserById](https://supabase.com/docs/reference/javascript/auth-admin-updateuserbyid), [cambio de contraseña autenticado](https://supabase.com/docs/reference/javascript/auth-updateuser).
