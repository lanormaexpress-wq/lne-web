(function (root, factory) {
    const value = factory();
    if (typeof module === 'object' && module.exports) module.exports = value;
    else root.LNEPermissionCatalog = value;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    const groups = {
        Acceso: { legislation_access: 'Legislación', converter_access: 'Conversor jurídico', summary_access: 'Editor de resúmenes', users_manage: 'Usuarios (consulta)' },
        Resúmenes: { summary_create: 'Crear', summary_import: 'Importar Word', summary_edit: 'Editar', summary_save: 'Guardar borrador', summary_submit_review: 'Enviar a revisión', summary_review: 'Revisar documentos ajenos', summary_publish: 'Publicación final', summary_delete_publication: 'Eliminar publicación (reservado a OWNER)', summary_cards_manage: 'Administrar cartillas' },
        Administración: { users_create: 'Crear usuarios (OWNER)', users_edit: 'Editar usuarios (OWNER)', permissions_manage: 'Cambiar permisos (OWNER)' }
    };
    const keys = Object.values(groups).flatMap(group => Object.keys(group));
    const writer = ['summary_access', 'summary_create', 'summary_import', 'summary_edit', 'summary_save', 'summary_submit_review', 'summary_cards_manage'];
    const presets = { owner: keys, reviewer: [...writer, 'summary_review', 'summary_publish'], writer, custom: [] };
    const reserved = ['summary_delete_publication', 'users_create', 'users_edit', 'permissions_manage'];
    function normalize(value = {}) { return Object.fromEntries(keys.map(key => [key, value[key] === true])); }
    function preset(name) { return normalize(Object.fromEntries((presets[name] || []).map(key => [key, true]))); }
    function allowed(access, key) { return access?.owner === true || (!reserved.includes(key) && access?.permissions?.[key] === true); }
    return Object.freeze({ groups, keys, presets, reserved, normalize, preset, allowed });
});
