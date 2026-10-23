# Corrección de la sesión administrativa al recargar

El SDK principal persiste la sesión Supabase en su almacenamiento del navegador y renueva tokens. Antes existía otro cliente SDK creado por la integración, y el POST /admin/resumenes/session guardaba una fotografía del access token. Ese POST solo ocurría al preparar recursos; no seguía TOKEN_REFRESHED ni SIGNED_OUT del cliente principal de manera coordinada.

La cookie lne_summary_session es HttpOnly, SameSite=Strict, Path=/admin/resumenes. No contiene el bearer: contiene un identificador aleatorio cuya entrada en memoria del servidor refiere al bearer validado. El menú utilizaba pushState, sin hacer GET del HTML protegido. En cambio F5 hacía GET /admin/resumenes/editor, recuperaba ese bearer y revalidaba /auth/v1/user. Un bearer rechazado terminaba enviando JSON 401 a una navegación HTML. Esta dependencia y la falta de sincronización están confirmadas en el código; no se inspeccionó ni reprodujo el token concreto de la sesión real que falló.

Ahora admin-session.js sincroniza el mismo cliente principal antes de mostrar el admin y al restaurar/renovar su sesión. La integración reutiliza ese cliente. La operación se serializa y renueva la cookie, retirando el identificador previo. No guarda contraseñas, service_role ni refresh tokens adicionales. Se mantiene la persistencia del SDK original y no se añaden credenciales paralelas.

HTML sin puente válido redirige a /admin?next=summary. Solo este destino permitido se reconoce: el SDK restaura/refresca la sesión persistida, sincroniza la cookie y replaceState vuelve al editor automáticamente; si no hay sesión, aparece login. Nunca se sirve públicamente el HTML del editor protegido ni sus assets. No se incluyen tokens en URL o HTML.

Cookie Secure cuando HTTPS directo o X-Forwarded-Proto=https del proxy de producción; HttpOnly/SameSite continúan. En localhost HTTP no usa Secure. El despliegue debe mantener el proxy HTTPS configurado para sobrescribir ese header.

El logout espera DELETE del puente antes de ejecutar el logout original Supabase. La integración vacía el iframe y sus enlaces prefetch al notificarse el cierre. Otros tabs reciben SIGNED_OUT mediante el SDK existente. Se revoca solo el puente de ese navegador; no se eliminan usuarios, datos ni otras sesiones de cuentas.

El caché de cinco segundos es por identificador de sesión, asociado al mismo bearer y user, únicamente para assets. Primero se comprueba caducidad del token y existencia de la entrada; un logout la elimina. La página revalida siempre. Una carga dentro de la ráfaga requiere una validación de página, no 18; el login/sync inicial valida una vez adicional. Si la ráfaga supera cinco segundos puede haber revalidaciones adicionales. HTML/API sin caché; assets versionados mantienen caché privada.

El mapa es memoria de proceso: reiniciar el servidor o cambiar de instancia pierde el puente, y se recupera a través de /admin y el SDK persistido. Para múltiples instancias debe compartirse ese almacenamiento o mantener afinidad; no se implementó una base de sesiones nueva en esta corrección.

Pruebas locales: tests/admin-session-regression.cjs verifica rotación, rechazo de cookie anterior, recargas, caducidad, revocación, redirect HTML y logout. Proveedor de auth simulado. La prueba con la ventana real de Chrome fue detenida por el controlador al no poder determinar su URL con confianza; no se dan por aprobados los casos con owner real. No se cambió ningún archivo de versions/2026-10-19 ni la fuente externa.
