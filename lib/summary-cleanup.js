const bucket = 'summary-template-images';
const imagePath = /^[a-f0-9-]{36}\/[a-f0-9-]{36}\/[a-f0-9-]{36}\.webp$/i;

// The durable, owner-only outbox is created in the SAME transaction as deletion.
// Never delete storage.objects through SQL, or accept arbitrary client paths.
async function cleanupSummaryImages(request, req) {
    const rpc = '/rest/v1/rpc/summary_cleanup_tasks';
    const call = completed_id => request(req, rpc, { method: 'POST', timeoutMs: 8000, body: JSON.stringify({ completed_id }) });
    let tasks = await call(null);
    for (const task of tasks.slice(0, 25)) {
        try {
            if (!imagePath.test(task.image_path)) continue;
            if (!task.shared) {
                await request(req, `/storage/v1/object/${bucket}`, {
                    method: 'DELETE', timeoutMs: 8000, body: JSON.stringify({ prefixes: [task.image_path] })
                });
            }
            // The database checks actual Storage absence, not just an HTTP 200.
            await call(task.id);
        } catch (_) { break; /* Retain tasks; an outage must not hold the UI for 25 timeouts. */ }
    }
    tasks = await call(null);
    return { cleanupPending: tasks.length, warning: tasks.length
        ? 'Documento eliminado. La limpieza de imágenes sigue pendiente; puedes reintentarla sin volver a eliminar el documento.' : null };
}
module.exports = { cleanupSummaryImages };
