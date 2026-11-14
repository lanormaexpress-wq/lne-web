'use strict';

(async function initAccountRecovery() {
    const byId = id => document.getElementById(id);
    const path = '/api/admin-account/';
    const panel = byId('account-recovery');
    let status;
    try {
        const response = await fetch(path + 'status', { cache: 'no-store' });
        if (!response.ok) return;
        status = await response.json();
        if (!status.enabled) return;
    } catch (_) { return; }

    const form = byId('account-recovery-form');
    const email = byId('recovery-email');
    const code = byId('recovery-code');
    const password = byId('recovery-password');
    const save = byId('recovery-save');
    const request = form.querySelector('button[type="submit"]');
    const confirmation = byId('recovery-confirm');
    const message = byId('recovery-message');
    let requestedEmail = '';

    async function send(operation, body, done) {
        if (request.disabled) return;
        request.disabled = save.disabled = true;
        message.textContent = 'Procesando…';
        try {
            const response = await fetch(path + operation, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body), signal: AbortSignal.timeout(15000)
            });
            if (!response.ok) {
                const result = await response.json().catch(() => ({}));
                throw new Error(result.error || 'No se pudo completar la solicitud.');
            }
            done();
        } catch (error) {
            message.textContent = error.name === 'TimeoutError' ? 'La solicitud tardó demasiado. Intenta de nuevo.' : error.message;
        } finally { request.disabled = save.disabled = false; }
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!status.emailDelivery) return;
        const address = email.value.trim();
        send('request', { email: address }, () => {
            requestedEmail = address;
            confirmation.hidden = false;
            message.textContent = 'Si el correo corresponde a una cuenta, recibirás el código de recuperación.';
            code.focus();
        });
    });
    save.addEventListener('click', () => {
        if (!code.value.trim() || password.value.length < 8) {
            message.textContent = 'Ingresa el código y una contraseña de al menos ocho caracteres.';
            return;
        }
        if (!form.reportValidity()) return;
        send('confirm', { email: status.emailDelivery ? requestedEmail : email.value.trim(), token: code.value.trim(), password: password.value }, () => {
            code.value = password.value = '';
            confirmation.hidden = true;
            message.textContent = 'La contraseña se guardó en Dublyobase.';
        });
    });
    if (!status.emailDelivery) {
        request.hidden = true;
        confirmation.hidden = false;
        message.textContent = 'Ingresa el código privado de activación y elige tu contraseña.';
    }
    panel.hidden = false;
}());
