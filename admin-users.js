(function () {
    'use strict';
    const el = id => document.getElementById(id), catalog = window.LNEPermissionCatalog;
    let api, reload, notify, editingUser = null, editingSnapshot = null, initialized = false, initialPassword = '';
    let passwordDialog, createdDialog, passwordTarget = null;
    const profiles = { owner:'OWNER', reviewer:'REVISOR / PUBLISHER', writer:'REDACTOR', custom:'Personalizado' };
    function selectedPermissions() {
        const values = {};
        el('permissions-editor').querySelectorAll('[data-granular-permission]').forEach(input => { values[input.dataset.granularPermission] = input.checked; });
        return catalog.normalize(values);
    }
    function bindVisibility(root) {
        root.querySelectorAll('[data-password-toggle]').forEach(button => {
            if (button.dataset.bound) return;
            button.dataset.bound = '1';
            button.onclick = () => {
                const input = el(button.dataset.passwordToggle), visible = input.type === 'password';
                input.type = visible ? 'text' : 'password'; button.setAttribute('aria-pressed', String(visible));
                button.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
                button.firstElementChild.className = visible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
            };
        });
    }
    function hidePasswords(root) {
        root.querySelectorAll('input[data-secret],#managed-user-password').forEach(input => { input.value = ''; input.type = 'password'; });
        root.querySelectorAll('[data-password-toggle]').forEach(button => { button.setAttribute('aria-pressed','false'); button.setAttribute('aria-label','Mostrar contraseña'); button.firstElementChild.className='fa-regular fa-eye'; });
    }
    async function copy(value, status) {
        if (!value) { status.textContent = 'Primero escribe una contraseña.'; return; }
        try { await navigator.clipboard.writeText(value); status.textContent = 'Contraseña copiada. Compártela por un canal seguro.'; }
        catch (_) { status.textContent = 'El navegador no permitió copiar. Utiliza HTTPS o localhost y habilita el portapapeles.'; }
    }
    function openPassword(user = null) {
        passwordTarget = user;
        hidePasswords(passwordDialog); el('account-password-status').textContent = '';
        el('account-password-title').textContent = user ? 'RESTABLECER CONTRASEÑA' : 'MI CUENTA → CAMBIAR CONTRASEÑA';
        el('account-password-target').textContent = user ? user.name + ' · ' + user.email : 'Cambiarás únicamente la contraseña de tu sesión actual.';
        el('account-password-submit').textContent = user ? 'RESTABLECER' : 'CAMBIAR CONTRASEÑA';
        passwordDialog.showModal();
    }
    function init(options) {
        api = options.api; reload = load; notify = options.toast;
        if (initialized) return; initialized = true;
        bindVisibility(document);
        el('copy-initial-password').onclick = () => copy(el('managed-user-password').value, el('initial-password-status'));
        el('user-dialog').addEventListener('close', () => { hidePasswords(el('user-dialog')); el('initial-password-status').textContent = ''; });
        el('reset-managed-user-password').onclick = () => openPassword(editingUser);
        passwordDialog = document.createElement('dialog'); passwordDialog.id = 'account-password-dialog'; passwordDialog.className = 'form-dialog';
        passwordDialog.innerHTML = `<form id="account-password-form"><h2 id="account-password-title"></h2><p id="account-password-target"></p>
          <div class="form-field"><label for="account-password-new">Nueva contraseña</label><div class="user-password-controls"><input data-secret id="account-password-new" type="password" required minlength="8" maxlength="256" autocomplete="new-password"><button type="button" class="secondary-button" data-password-toggle="account-password-new" aria-label="Mostrar contraseña" aria-pressed="false"><i class="fa-regular fa-eye" aria-hidden="true"></i></button></div></div>
          <div class="form-field"><label for="account-password-confirm">Confirmar contraseña</label><div class="user-password-controls"><input data-secret id="account-password-confirm" type="password" required minlength="8" maxlength="256" autocomplete="new-password"><button type="button" class="secondary-button" data-password-toggle="account-password-confirm" aria-label="Mostrar contraseña" aria-pressed="false"><i class="fa-regular fa-eye" aria-hidden="true"></i></button></div></div>
          <p id="account-password-status" role="status"></p><div class="editor-actions"><button id="account-password-cancel" type="button" class="secondary-button">CANCELAR</button><button id="account-password-submit" class="primary-button" type="submit">RESTABLECER</button></div></form>`;
        document.body.append(passwordDialog); bindVisibility(passwordDialog);
        el('account-password-cancel').onclick = () => passwordDialog.close();
        passwordDialog.addEventListener('close', () => { hidePasswords(passwordDialog); passwordTarget = null; });
        el('account-password-form').onsubmit = async event => {
            event.preventDefault(); const button = el('account-password-submit');
            const password = el('account-password-new').value, confirmPassword = el('account-password-confirm').value;
            if (password !== confirmPassword) { el('account-password-status').textContent = 'Las contraseñas no coinciden.'; return; }
            button.disabled = true;
            try {
                if (passwordTarget) await api('/users/' + passwordTarget.id + '/password', { method:'POST', body:JSON.stringify({ password, confirmPassword }) });
                else {
                    const client = window.LNEAdminSession?.client;
                    if (!client) throw new Error('Sesión no disponible. Vuelve a iniciar sesión.');
                    const result = await client.auth.updateUser({ password });
                    if (result.error) throw new Error('Supabase no aceptó el cambio. Comprueba la política de contraseña y si requiere una sesión reciente o reautenticación.');
                }
                passwordDialog.close(); notify('Contraseña actualizada correctamente.');
            } catch (error) { el('account-password-status').textContent = error.message; }
            finally { button.disabled = false; }
        };
        el('my-account-button').onclick = () => openPassword();
        createdDialog = document.createElement('dialog'); createdDialog.id = 'user-created-dialog'; createdDialog.className = 'form-dialog';
        createdDialog.innerHTML = '<h2>USUARIO CREADO</h2><p data-created-name></p><p data-created-email></p><p data-created-profile></p><button data-copy-created class="secondary-button">COPIAR CONTRASEÑA INICIAL</button><p data-created-status role="status"></p><button data-close-created class="primary-button">Cerrar</button>';
        document.body.append(createdDialog);
        createdDialog.querySelector('[data-copy-created]').onclick = () => copy(initialPassword, createdDialog.querySelector('[data-created-status]'));
        createdDialog.querySelector('[data-close-created]').onclick = () => createdDialog.close();
        createdDialog.addEventListener('close', () => { initialPassword = ''; createdDialog.querySelector('[data-created-status]').textContent = ''; });
        document.addEventListener('lne-admin-session-ready', event => { if (!event.detail.authenticated) { initialPassword = ''; passwordDialog.close(); createdDialog.close(); el('user-dialog').close(); } });
    }
    function checks(values, owner) {
        const host = el('permissions-editor'); host.replaceChildren(); host.hidden = false;
        if (owner) { const note = document.createElement('p'); note.className = 'owner-protection-note'; note.textContent = 'Los permisos esenciales de OWNER están protegidos.'; host.append(note); }
        for (const [group, entries] of Object.entries(catalog.groups)) {
            const field = document.createElement('fieldset'), legend = document.createElement('legend'); legend.textContent = group; field.append(legend);
            for (const [key, title] of Object.entries(entries)) {
                const label = document.createElement('label'), input = document.createElement('input');
                input.type = 'checkbox'; input.dataset.granularPermission = key; input.checked = owner || values[key] === true;
                input.disabled = owner || catalog.reserved.includes(key);
                label.append(input, document.createTextNode(' ' + title)); field.append(label, document.createElement('br'));
            }
            host.append(field);
        }
    }
    function dialog(user = null) {
        editingUser = user;
        el('user-form').reset(); el('user-error').textContent = '';
        hidePasswords(el('user-dialog')); el('initial-password-status').textContent = '';
        el('managed-user-id').value = user?.id || ''; el('managed-user-name').value = user?.name || '';
        el('managed-user-email').value = user?.email || ''; el('managed-user-email').readOnly = Boolean(user);
        el('managed-user-role').value = user?.profile || 'writer';
        el('password-wrapper').hidden = Boolean(user); el('managed-user-password').required = !user;
        el('reset-managed-user-password').hidden = !user;
        el('user-dialog-title').textContent = user ? 'EDITAR PERMISOS' : 'CREAR USUARIO';
        checks(user?.permissions || catalog.preset('writer'), user?.role === 'owner');
        // Compare against what was actually rendered, including OWNER's protected checks.
        editingSnapshot = { profile: el('managed-user-role').value, permissions: JSON.stringify(selectedPermissions()) };
        el('managed-user-role').onchange = () => checks(catalog.preset(el('managed-user-role').value), el('managed-user-role').value === 'owner');
        el('user-dialog').showModal();
    }
    async function load() {
        el('users-list').textContent = 'Consultando usuarios…';
        try {
            const data = await api('/users'); el('users-config-warning').hidden = true; el('users-list').replaceChildren();
            el('new-user-button').hidden = !window.LNEAdminAccess?.owner;
            const ownerCount = data.users.filter(user => user.role === 'owner' && user.status !== 'Bloqueado').length;
            for (const user of data.users) {
                const card = document.createElement('article'); card.className = 'user-card';
                const details = document.createElement('div'), name = document.createElement('strong'), email = document.createElement('p'), info = document.createElement('small');
                name.textContent = user.name || 'Sin nombre'; email.textContent = user.email;
                info.textContent = `${profiles[user.profile] || user.profile} · ${user.status} · Último acceso: ${user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('es-PE') : 'Sin registro'}`;
                details.append(name, email, info); card.append(details);
                if (window.LNEAdminAccess?.owner) {
                    const actions = document.createElement('div'), edit = document.createElement('button'), remove = document.createElement('button'), reset = document.createElement('button'); actions.className = 'user-account-actions';
                    edit.className = 'secondary-button'; edit.textContent = 'EDITAR PERMISOS'; edit.onclick = () => dialog(user);
                    remove.className = 'danger-button'; remove.textContent = 'Eliminar usuario';
                    remove.onclick = async () => { if (!confirm('¿Eliminar este usuario?\n' + user.email + '\nNo se borrarán sus resúmenes. Si tiene documentos o cartillas asociados, se bloqueará la eliminación para conservar la trazabilidad.')) return; try { await api('/users/' + user.id, { method: 'DELETE' }); await load(); } catch (error) { notify(error.message, 'error'); } };
                    reset.className = 'secondary-button'; reset.textContent = 'RESTABLECER CONTRASEÑA'; reset.onclick = () => openPassword(user);
                    actions.append(edit, reset); if (!(user.role === 'owner' && ownerCount <= 1)) actions.append(remove); card.append(actions);
                }
                el('users-list').append(card);
            }
        } catch (error) { el('users-list').textContent = ''; el('users-config-warning').hidden = false; el('users-config-warning').textContent = error.message; }
    }
    async function save(event) {
        event.preventDefault();
        const button = event.submitter; if (button) button.disabled = true;
        let ownNameSaved = false;
        try {
            const id = el('managed-user-id').value, permissions = selectedPermissions();
            const name = el('managed-user-name').value.trim(), profile = el('managed-user-role').value;
            let self = false;
            if (id) {
                const client = window.LNEAdminSession?.client;
                if (!client) throw new Error('Sesión no disponible. Vuelve a iniciar sesión.');
                const current = await client.auth.getUser();
                if (current.error || !current.data?.user) throw new Error('No se pudo verificar tu sesión. Vuelve a iniciar sesión.');
                self = current.data.user.id === id;
                if (self) {
                    if (!name || name.length > 200) throw new Error('Escribe un nombre de hasta 200 caracteres.');
                    if (current.data.user.user_metadata?.name !== name) {
                        // Supabase merges data into the current user's metadata. Send ONLY name:
                        // no app_metadata, role, email or other editable account identity.
                        const updated = await client.auth.updateUser({ data: { name } });
                        if (updated.error) throw new Error('No se pudo guardar tu nombre con tu sesión actual. Inténtalo nuevamente.');
                    }
                    ownNameSaved = true;
                    if (editingUser) editingUser.name = name;
                }
            }
            const password = id ? undefined : el('managed-user-password').value;
            const permissionsChanged = !editingSnapshot || profile !== editingSnapshot.profile || JSON.stringify(permissions) !== editingSnapshot.permissions;
            // A name-only self edit must NOT invoke Auth Admin or rewrite permissions.
            const result = self && !permissionsChanged ? { ok: true } : await api('/users' + (id ? '/' + id : ''), { method: id ? 'PATCH' : 'POST', body: JSON.stringify({ ...(self ? {} : { name }), email: id ? undefined : el('managed-user-email').value.trim(), password, profile, permissions }) });
            el('managed-user-password').value = ''; el('user-dialog').close();
            if (!id) {
                initialPassword = password;
                createdDialog.querySelector('[data-created-name]').textContent = 'Nombre: ' + result.name;
                createdDialog.querySelector('[data-created-email]').textContent = 'Correo: ' + result.email;
                createdDialog.querySelector('[data-created-profile]').textContent = 'Perfil: ' + (profiles[result.profile] || result.profile);
                createdDialog.showModal();
            } else notify(self && !permissionsChanged ? 'Tu nombre se guardó correctamente.' : 'Usuario y permisos guardados.');
            await reload();
        } catch (error) {
            if (ownNameSaved) {
                await reload();
                el('user-error').textContent = 'Tu nombre se guardó correctamente. Los otros cambios no se guardaron: ' + error.message;
                notify('Tu nombre se guardó; revisa el aviso de los otros cambios.', 'error');
            } else el('user-error').textContent = error.message;
        }
        finally { if (button) button.disabled = false; }
    }
    window.LNEAdminUsers = { init, load, dialog, save };
})();
