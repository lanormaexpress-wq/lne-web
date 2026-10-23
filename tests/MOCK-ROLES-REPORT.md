# Verificación exclusivamente simulada de perfiles

Resultado: PASS. No se configuraron claves privadas, no se cargó .env para estas pruebas, no se usó el MCP de Supabase, no se crearon/modificaron cuentas reales y no se ejecutó SQL remoto. Sin Git push ni despliegue.

## Identidades ficticias

- OWNER: owner.prueba@example.com.
- REDACTOR: redactor.prueba@example.com.
- REVISOR/PUBLISHER: revisor.prueba@example.com.

Los tres existen únicamente como objetos en memoria del proceso de pruebas. Las pruebas de regresión anteriores también usan direcciones reservadas example.invalid/example.test, nunca buzones reales ni cuentas Auth.

## Matriz de resultados

| Prueba | OWNER | REDACTOR | REVISOR/PUBLISHER |
|---|---|---|---|
| Menús visibles | Legislación, Conversor, Resúmenes, Usuarios | Solo Resúmenes | Solo Resúmenes |
| Rutas/API de Legislación y Conversor | Permitidas por middleware | 403 | 403 |
| Usuarios | Permitido | 403 | 403 |
| Crear, importar Word, editar y guardar | PASS regresión de flujo/permiso | PASS flujo real del editor | PASS flujo real del editor |
| Enviar a revisión | PASS regresión | PASS, sin publicación | Permiso habilitado |
| Corregir documento ajeno en revisión | Acceso total | No concedido | PASS |
| Crear cartilla con nombre e imagen | PASS regresión | PASS | Permiso habilitado |
| Publicación final | PASS regresión con snapshot ficticio | Botón oculto y endpoint 403 | PASS sobre documento del REDACTOR |
| Eliminar publicación | PASS, retorna borrador y conserva cartilla | 403 | Botón ausente y endpoint 403 |
| Gestionar permisos | PASS, actualización únicamente en el mapa mock | Sin acceso a Usuarios | Sin acceso a Usuarios |
| Permisos futuros | OWNER conserva bypass total | No se conceden | No se conceden |

## Pruebas ejecutadas

1. `node tests/admin-permissions-browser.cjs`: Chromium real, HTML/JS administrativo real, middleware requireAdmin extraído del código de producción, Auth/tabla de permisos simulados. Menús, presets, APIs, URL directa del conversor, último OWNER protegido y denegación de publicación/eliminación para REDACTOR.
2. `node tests/summary-role-workflow.cjs`: nuevo recorrido entre tres perfiles. Editor y parser DOCX originales, adaptadores y routers de producción; Auth, PostgREST y Storage en memoria mediante servidor local efímero. REDACTOR importa DOCX, escribe, guarda, crea cartilla con imagen y envía a revisión; todavía no hay snapshot público. Puede corregir su revisión pero no publicar. REVISOR importa su propio DOCX y guarda, abre el documento ajeno en revisión, lo corrige conservando autoría y lo publica. OWNER retira el snapshot y guarda permisos ficticios. Los cambios desaparecen al terminar el proceso.
3. `node tests/summary-workflow-browser.cjs`: recorrido OWNER de borrador, cierre/reapertura de Chromium, recuperación, corrección, revisión, publicación, visualización pública ficticia y retirada conservando contenido/cartilla. Proveedor simulado.
4. `node tests/admin-users-auth.cjs`: creación/reset/cambio propio/nombres/copiar/mostrar-ocultar con Auth simulado; ninguna cuenta real creada.
5. `node tests/admin-session-regression.cjs`: cookies, renovación, revocación, caducidad, recarga y logout con validación Auth simulada.
6. `git diff --check` y `node --check tests/summary-role-workflow.cjs`: sin errores.

El recorrido nuevo bloquea cualquier fetch de Node fuera de loopback y aborta todo tráfico externo del navegador. Resultado: cero intentos a Supabase real y cero usuarios reales creados. Las pruebas no usan la pestaña administrativa del usuario, su sesión real ni el Express en localhost:3000: crean sus propios servidores en puertos efímeros.

## Qué NO demuestra un mock

La verificación de visibilidad de filas ajenas (404 al abrir un borrador ajeno como REDACTOR), los snapshots y el almacenamiento se modelan en memoria; NO equivalen a ejecutar RLS, triggers, constraints o Storage en Supabase real. Las negativas 403 de publicación/eliminación/administración se verifican además contra los handlers/middleware de producción, no solo ocultando botones.

Quedan pendientes para una fase expresamente autorizada: crear/iniciar sesión con cuentas Auth reales, comprobar claves y API remotas, persistencia y revocación de permisos reales, RLS/Storage/triggers/atomicidad contra el proyecto conectado, y reset/cambio de contraseña real. No se requiere configurar claves para repetir estas pruebas simuladas.

## Alcance de archivos

En esta ejecución solo se añadió el test `summary-role-workflow.cjs` y este informe. Las pruebas existentes regeneraron sus capturas locales `admin-users-auth.png` y `summary-workflow-public.png`. No se modificó código de producción, editor, parser, workflow, publicaciones reales, RLS, tablas, configuración ni cuentas.
