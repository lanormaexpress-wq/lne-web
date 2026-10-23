# Recuperación de carga del editor

El mensaje «No se pudieron preparar los recursos del editor» se lanzaba exclusivamente al recibir una respuesta HTTP no exitosa en GET /admin/resumenes/resources. loadEditor esperaba prepareAssets antes de asignar el src: fallar el manifiesto cancelaba el montaje del iframe. Esta causa se confirmó en el código. El status del request de la sesión real reportada no se pudo observar; no se infiere un 401/403/404 sin captura de Network.

Se elimina la precarga de la integración. Cuando el administrador autenticado muestra la sección, el iframe recibe su URL versionada de forma síncrona. No solicita manifiesto, no espera fetch ni otro getSession, y conserva su instancia al cambiar de sección. La sesión administrativa principal sigue sincronizándose antes de mostrar admin-view.

Los CSS, JS, iconos, fuentes e imágenes estáticos se sirven antes del guard de sesión. Solo se permite una lista de extensiones, desde la instantánea concreta mediante express.static, sin HTML ni listados de directorios. No contienen documentos locales, credenciales ni datos privados. Mantienen caché versionada immutable. El HTML de entrada /editor, index.html del iframe y los endpoints privados continúan protegidos. La sincronización/renovación y el logout de admin-session.js no se modifican.

Pruebas de regresión: recursos estáticos sin cookie responden 200, HTML sin cookie no se entrega, cookie revocada/expirada redirige la página y bloquea el HTML interior. El navegador aislado fuerza /resources a responder 503 y comprueba que nunca se solicita, que el editor aparece y que la recarga vuelve a cargarlo. No sustituye la prueba con el owner real. El controlador de la ventana real se detuvo al no poder verificar su URL; no se accedió a Network de esa sesión.

El servidor Node del puerto 3000 debe reiniciarse para cargar lib/summary-editor.js. Un servidor ya iniciado con node server.js no recarga módulos automáticamente. No se termina un proceso existente sin identificar su pertenencia. Los archivos internos del editor no cambian.
