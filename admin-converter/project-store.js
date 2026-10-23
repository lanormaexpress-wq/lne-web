(function () {
  'use strict';
  const DATABASE = 'lne-converter-projects';
  const STORE = 'projects';
  const MAX_PROJECTS = 5;

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE, 1);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE)) {
          const store = database.createObjectStore(STORE, { keyPath: 'id' });
          store.createIndex('updatedAt', 'updatedAt');
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('No se pudo abrir el almacenamiento local.'));
    });
  }

  async function transaction(mode, operation) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE, mode);
      const store = tx.objectStore(STORE);
      let result;
      try { result = operation(store); } catch (error) { database.close(); reject(error); return; }
      tx.oncomplete = () => { database.close(); resolve(result?.result); };
      tx.onerror = () => { database.close(); reject(tx.error || new Error('No se pudo completar la operación local.')); };
      tx.onabort = tx.onerror;
    });
  }

  async function list() {
    const rows = await transaction('readonly', store => store.getAll());
    return (rows || []).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  }
  function get(id) { return transaction('readonly', store => store.get(id)); }
  async function put(record) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      let operationError = null;
      const existingRequest = store.get(record.id);
      existingRequest.onsuccess = () => {
        if (existingRequest.result) {
          store.put(record);
          return;
        }
        const countRequest = store.count();
        countRequest.onsuccess = () => {
          if (countRequest.result >= MAX_PROJECTS) {
            operationError = new Error('Has alcanzado el límite de 5 proyectos temporales.\nElimina uno para crear un nuevo proyecto.');
            operationError.code = 'PROJECT_LIMIT_REACHED';
            tx.abort();
            return;
          }
          store.put(record);
        };
      };
      tx.oncomplete = () => { database.close(); resolve(record.id); };
      tx.onerror = () => { database.close(); reject(operationError || tx.error || new Error('No se pudo guardar el proyecto local.')); };
      tx.onabort = () => { database.close(); reject(operationError || tx.error || new Error('No se pudo guardar el proyecto local.')); };
    });
  }
  function remove(id) { return transaction('readwrite', store => store.delete(id)); }

  // Punto de integración reservado para la publicación definitiva futura.
  // El publicador podrá invocarlo solo después de confirmar que Supabase guardó
  // correctamente el contenido final; esta fase no lo llama.
  function removeAfterPublication(id) { return remove(id); }

  window.LNEProjectStore = Object.freeze({ MAX_PROJECTS, list, get, put, remove, removeAfterPublication });
})();
