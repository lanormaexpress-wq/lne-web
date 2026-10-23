# Aislamiento del documento activo — 22/10/2026

## Alcance

Corrección local, sin cambios en tablas, RLS, usuarios, permisos ni publicación.
No se han usado cuentas reales de Sebastián o Stephanie. No se ha hecho commit,
push ni despliegue: esos pasos dependen de superar las cinco pruebas reales.

## Causa y solución

El editor original usa `LNE_EDITOR_AUTOSAVE_DRAFT` y
`LNE_EDITOR_DOCUMENTS_V1` sin propietario. Las cuentas del mismo origin
compartían estas claves. Además, `?resumen=` podía conservar una referencia
central del usuario anterior.

`admin-summary-storage-scope.js` adapta exclusivamente el almacenamiento del
iframe autenticado antes de cargar los scripts originales:

- Borrador activo: `lne-editor:<user_id>:<auth_session_fingerprint>:<epoch>:active-document`.
- Biblioteca guardada: `lne-editor:<user_id>:documents` (cada entrada conserva su documentoId).
- Referencia de sesión/pestaña: `lne-editor:session-context` en sessionStorage.

La identificación proviene del usuario validado por el servidor. La huella se
deriva de session_id, no cambia al renovar el JWT y no expone tokens. Los tokens
mock/legacy usan una huella del bearer como alternativa.

F5 en la misma sesión conserva el contexto. Logout o cambio de cuenta retira la
referencia activa y `?resumen=`, invalida el iframe anterior y genera un contexto
nuevo al entrar. No borra bibliotecas, snapshots anteriores ni documentos
centrales. Las claves antiguas sin propietario no se recuperan ni se eliminan.
No es una barrera contra alguien con acceso físico/DevTools al navegador: la
autorización de documentos centrales sigue correspondiendo al backend/RLS.

## Archivos de ejecución

- Nuevo: `admin-summary-storage-scope.js`.
- Modificados: `admin.html`, `admin-session.js`, `lib/summary-editor.js`.
- No modificados: código original del editor, canvas, parser DOCX, toolbar,
  admin-summary-workflow.js, permisos, publicación ni web pública.

## Validación automatizada (no son pruebas Auth reales)

- `summary-role-workflow.cjs`: PASS. Chromium real, APIs/Auth/PostgREST/Storage
  simulados en memoria. A–E en mismo origin, contexto y pestaña: F5 redactor;
  revisor limpio tras logout/login; apertura explícita EN_REVISION; F5 revisor;
  redactor limpio al volver. Conserva bibliotecas separadas y el mismo registro
  de autosave. Cero peticiones a Supabase real y cero cuentas reales creadas.
- `summary-storage-scope.cjs`: PASS. F5, nuevo login, cambio directo de cuenta,
  respuesta/guardado tardíos del iframe anterior, biblioteca por usuario y
  conservación de datos legacy.
- `admin-session-regression.cjs`: PASS, incluida renovación JWT con session_id
  estable y separación de nuevos logins.
- `summary-editor-integration.cjs`: PASS.
- `summary-recovery-browser.cjs`: PASS.
- `summary-workflow-browser.cjs`: PASS.
- `summary-tools-browser.cjs`: PASS.
- `admin-permissions-browser.cjs`: PASS.
- `summary-performance.cjs isolation`: PASS; una validación servidor por HTML,
  ninguna URL duplicada, sin errores. Medición simulada, no benchmark de Auth.
- `node --check` de los archivos de ejecución: PASS.
- `git diff --check`: PASS.
- `summary-selection-browser.cjs`: NO PASA. Busca CONTINUAR en el documento
  padre; actualmente el botón pertenece al iframe. No se alteró CONTINUAR ni
  se cambió ese flujo para satisfacer una prueba antigua.

Los mocks de recovery/tools/selection/performance identifican ahora user_id;
el test de performance también sirve el nuevo adaptador. El test de roles
añade A–E y el de sesión comprueba la huella estable.

## Producción: bloqueo pendiente

Las pruebas reales A–E requieren que el usuario inicie sesión manualmente como
Sebastián y Stephanie, sin compartir contraseñas. El servidor localhost:3000
fue reiniciado para cargar la corrección. La sesión visible observada era OWNER.

Comprobaciones preliminares: .env/.env.local/.env.production están ignorados y
no versionados. Un escaneo de 243 archivos de texto versionados/no ignorados no
detectó literales sb_secret, JWT service_role ni claves Gemini. Esto no sustituye
la revisión completa previa al deploy (incluidas contraseñas reales y datos de
prueba). Hay numerosos cambios anteriores sin commit; no se descartaron ni se
incluyeron automáticamente en un commit.

No se han creado/modificado usuarios, resúmenes, cartillas ni publicaciones
reales durante estas pruebas. No se ha auditado ni limpiado todavía el conjunto
de datos de prueba ya existente en Supabase.

Remoto existente: origin, repositorio lanormaexpress-wq/lne-web.
No se verificó un despliegue ni URL de producción. No se cambió proveedor.
SUPABASE_URL y SUPABASE_SECRET_KEY deben ser variables privadas del hosting;
no se debe subir .env.
