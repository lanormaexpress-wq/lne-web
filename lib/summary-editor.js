const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const formation = require('../formacion');
const version = '2026-10-19';
const editorRoot = path.join(__dirname, '..', 'admin-summary-editor', 'versions', version);
function documentSession(req) {
    const userId = req.adminUser?.id;
    if (!userId) throw new Error('Usuario del editor no identificado.');
    const authorization = req.get('authorization') || '';
    let authSession;
    try { authSession = JSON.parse(Buffer.from(authorization.split('.')[1], 'base64url')).session_id; } catch (_) { /* Mock/legacy tokens use a fingerprint, never the token itself. */ }
    return { userId, sessionId: crypto.createHash('sha256').update(String(authSession || authorization)).digest('hex').slice(0, 32) };
}

module.exports = function summaryEditor(requireAdmin, getConfig) {
    const router = express.Router();
    const sessions = new Map();
    const cookieName = 'lne_summary_session';
    // Same opaque session bridge, broader admin path to authorize converter HTML too.
    const cookieOptions = { httpOnly: true, sameSite: 'strict', path: '/admin', maxAge: 3600000 };
    router.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
    router.post('/session', requireAdmin, (req, res) => {
        const now = Date.now();
        for (const [id, entry] of sessions) if (entry.expires <= now) sessions.delete(id);
        const id = crypto.randomBytes(32).toString('hex');
        let tokenExpires = now + 3600000;
        try {
            const exp = JSON.parse(Buffer.from(req.get('authorization').split('.')[1], 'base64url')).exp * 1000;
            if (Number.isFinite(exp)) tokenExpires = Math.min(tokenExpires, exp);
        } catch (_) { /* Token de prueba o proveedor sin exp. */ }
        const previousId = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
        sessions.delete(previousId);
        sessions.set(id, { authorization: req.get('authorization'), expires: tokenExpires, validated: now, user: req.adminUser });
        res.cookie(cookieName, id, { ...cookieOptions, secure: req.secure || req.get('x-forwarded-proto')?.split(',')[0].trim() === 'https' });
        res.clearCookie(cookieName, { path: '/admin/resumenes' });
        const { isOwner } = require('./summary-permissions');
        res.json({ url: '/admin/resumenes/editor', documentSession: documentSession(req), access: { owner: isOwner(req.adminUser), permissions: req.adminUser?.admin_permissions || {}, profile: req.adminUser?.admin_profile || (isOwner(req.adminUser) ? 'owner' : 'custom') } });
    });
    router.delete('/session', (req, res) => {
        const id = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
        sessions.delete(id);
        res.clearCookie(cookieName, { path: cookieOptions.path });
        res.clearCookie(cookieName, { path: '/admin/resumenes' });
        res.status(204).end();
    });
    // Código y estilos de la instantánea: no contienen documentos ni credenciales.
    // El HTML del editor y todos los endpoints privados se validan más abajo.
    router.use('/assets', (req, res, next) => {
        if (!/\.(?:css|js|svg|png|jpe?g|webp|gif|ico|woff2?|ttf)$/i.test(req.path)) return next();
        const versioned = req.path.startsWith(`/${version}/`);
        const serve = express.static(editorRoot, { index: false, fallthrough: false, setHeaders(response) {
            response.set('Cache-Control', 'no-cache');
        } });
        const originalUrl = req.url;
        if (versioned) req.url = req.url.slice(version.length + 1);
        serve(req, res, error => { req.url = originalUrl; if (error) return res.status(error.status || 500).end(); next(); });
    });
    function authorizePage(req, res, next) {
        req.adminPageNavigation = req.method === 'GET' && (req.path === '/editor' || req.path === '/');
        const id = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
        const session = sessions.get(id);
        if (!session || session.expires <= Date.now()) {
            sessions.delete(id);
            if (req.adminPageNavigation) return res.redirect('/admin?next=summary');
            return res.status(401).json({ error: 'Sesión requerida.' });
        }
        req.headers.authorization = session.authorization;
        const rejectJson = res.json.bind(res);
        res.json = body => {
            if (res.statusCode === 401) {
                sessions.delete(id);
                res.clearCookie(cookieName, { path: cookieOptions.path });
                if (req.adminPageNavigation) return res.redirect(302, '/admin?next=summary');
            }
            if (req.adminPageNavigation && res.statusCode >= 400 && res.statusCode !== 403) return res.redirect(302, '/admin?next=summary');
            return rejectJson(body);
        };
        return requireAdmin(req, res, () => { session.validated = Date.now(); session.user = req.adminUser; next(); });
    }
    router.authorizePage = authorizePage;
    router.use(authorizePage);
    router.use(require('./summary-permissions').requirePermission('summary_access'));
    if (getConfig) router.use('/templates', require('./summary-templates')(getConfig));
    if (getConfig) router.use('/documents', require('./summary-documents').privateRouter(getConfig));
    router.get('/catalog', (req, res) => {
        const courses = formation.courses.map(course => {
            const topics = course.contentFile ? JSON.parse(fs.readFileSync(path.join(__dirname, '..', course.contentFile), 'utf8')) : [];
            return { ...course, templates: topics.map(topic => ({
                id: String(topic.id), name: topic.titulo, image: topic.imagen || null,
                hasContent: Boolean(topic.contenido || topic.htmlFile || topic.pdf || topic.imagenes?.length),
                capacity: null, availableSlots: null, source: course.contentFile
            })) };
        });
        const permissions = require('./summary-permissions');
        res.json({ areas: formation.areas, courses, canAddTemplate: permissions.canCreateCard(req.adminUser), canManageTemplates: permissions.canCreateCard(req.adminUser), capacityDefined: false });
    });
    router.get('/resources', (_req, res) => {
        const html = fs.readFileSync(path.join(editorRoot, 'index.html'), 'utf8');
        res.json({ resources: [...html.matchAll(/(?:src|href)="((?:js|css|vendor)\/[^"?#]+)"/g)].map(match => ({
            url: `/admin/resumenes/assets/${version}/${match[1]}`, as: match[1].endsWith('.css') ? 'style' : 'script'
        })) });
    });
    function sendEditor(req, res) {
        const scope = JSON.stringify(documentSession(req)).replace(/</g, '\\u003c');
        const bootstrap = `<script src="/admin-summary-storage-scope.js?v=1"></script><script>LNESummaryStorage.install(${scope});</script>`;
        res.type('html').send(fs.readFileSync(path.join(editorRoot, 'index.html'), 'utf8').replace('<head>', '<head>' + bootstrap));
    }
    router.get(`/assets/${version}/index.html`, sendEditor);
    router.get(['/assets/index.html', '/assets/'], sendEditor);
    router.get('/', (_req, res) => res.redirect('/admin/resumenes/editor'));
    router.get('/editor', (_req, res) => res.sendFile(path.join(__dirname, '..', 'admin.html')));
    router.use(`/assets/${version}`, express.static(editorRoot, { index: false, setHeaders(res, file) {
        if (!file.endsWith('.html')) res.set('Cache-Control', 'private, max-age=31536000, immutable');
    } }));
    // Compatibilidad con enlaces antiguos; la carga nueva siempre tiene versión en URL.
    router.use('/assets', express.static(editorRoot, { index: 'index.html', cacheControl: false }));
    router.use((_req, res) => res.status(404).end());
    return router;
};
