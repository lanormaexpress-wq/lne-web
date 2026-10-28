const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const normas = require('./normas');
const formacion = require('./formacion');
const { createLegalConverterRouter } = require('./lib/legal-converter');
// Hosting env wins; local .env is resolved relative to this project, not shell cwd.
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
// Indexing directives supplement existing authentication; they never grant access.
app.use((req, res, next) => {
    if (/^\/(?:admin|api(?:\/|$)|tests(?:\/|$)|lib(?:\/|$)|scripts(?:\/|$)|migration(?:\/|$))/.test(req.path)) res.set('X-Robots-Tag', 'noindex, nofollow');
    next();
});
app.use('/admin-summary-editor', (_req, res) => res.status(403).send('Acceso privado.'));
const summaryAdminRouter = require('./lib/summary-editor')(requireAdmin, () => ({ url: SUPABASE_URL, key: SUPABASE_PUBLISHABLE_KEY }));
app.use('/admin/resumenes', summaryAdminRouter);
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://higdtttcndqzapkenets.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_cF5BrrxGmFf2_wnbxWaACg_TRM3nGPB';
// Fail closed if a private credential was accidentally placed in the public variable.
let publicKeyRole = '';
try { publicKeyRole = JSON.parse(Buffer.from(SUPABASE_PUBLISHABLE_KEY.split('.')[1], 'base64url')).role || ''; } catch (_) { /* Opaque publishable key. */ }
if (SUPABASE_PUBLISHABLE_KEY.startsWith('sb_secret_') || publicKeyRole === 'service_role') throw new Error('SUPABASE_PUBLISHABLE_KEY debe ser pública. Configura la clave privada solo en SUPABASE_SECRET_KEY o SUPABASE_SERVICE_ROLE_KEY.');
const adminAuth = require('./lib/supabase-admin-auth')({ url: SUPABASE_URL });
app.use('/api/formation/summaries', require('./lib/summary-documents').publicRouter(() => ({ url: SUPABASE_URL, key: SUPABASE_PUBLISHABLE_KEY })));

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// Body-parser errors may embed a fragment of a malformed JSON body. Never echo/log
// those fragments for account/password operations, even in development mode.
app.use((error, req, res, next) => {
    if (!req.path.startsWith('/api/admin/users')) return next(error);
    return res.status(error.status === 413 ? 413 : 400).json({ error: 'Solicitud de cuenta inválida o demasiado grande.' });
});

// Middleware de seguridad para evitar servir archivos sensibles
app.use((req, res, next) => {
    const blockedKeywords = ['.env', 'package.json', 'package-lock.json', '.git', 'node_modules', 'server.js', 'lib', 'migration', 'tests', 'scripts', 'admin-converter'];
    const requestPath = req.path.toLowerCase();
    
    const isBlocked = /^\/\.env(?:[./]|$)/.test(requestPath) || blockedKeywords.some(keyword => {
        return requestPath === `/${keyword}` || requestPath.startsWith(`/${keyword}/`);
    });

    if (isBlocked) {
        return res.status(403).send('Acceso denegado: Archivo protegido.');
    }
    next();
});

// Panel administrativo independiente de la SPA pública.
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Solo expone configuración pública. Nunca incluir claves service_role aquí.
app.get('/api/config/supabase', (req, res) => {
    res.json({
        url: SUPABASE_URL,
        publishableKey: SUPABASE_PUBLISHABLE_KEY
    });
});

async function requireOwner(req, res, next) {
    const authorization = req.get('authorization') || '';
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Sesión requerida.' });
    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: authorization }
        });
        if (!response.ok) return res.status(401).json({ error: 'Sesión inválida.' });
        const user = await response.json();
        if (user.app_metadata?.role !== 'owner') return res.status(403).json({ error: 'Acceso reservado al propietario.' });
        req.owner = user;
        next();
    } catch (error) {
        console.error('No se pudo validar al propietario:', error);
        res.status(502).json({ error: 'No se pudo validar la sesión.' });
    }
}

async function requireAdmin(req, res, next) {
    const authorization = req.get('authorization') || '';
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Sesión requerida.' });
    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: authorization }
        });
        if (!response.ok) return res.status(401).json({ error: 'Sesión inválida.' });
        const user = await response.json();
        if (!['owner', 'editor'].includes(user.app_metadata?.role)) {
            return res.status(403).json({ error: 'Acceso reservado al equipo editorial.' });
        }
        if (user.app_metadata?.role !== 'owner') {
            const permissions = await supabaseRest(`admin_user_permissions?select=profile,permissions&user_id=eq.${encodeURIComponent(user.id)}&limit=1`, { authorization });
            user.admin_permissions = permissions.data?.[0]?.permissions || {};
            user.admin_profile = permissions.data?.[0]?.profile || 'custom';
        }
        req.adminUser = user;
        if (req.originalUrl.startsWith('/api/admin/') && !/^\/api\/admin\/(?:users|access)(?:[/?]|$)/.test(req.originalUrl)) {
            const permission = req.originalUrl.startsWith('/api/admin/converter') ? 'converter_access' : 'legislation_access';
            if (!require('./lib/summary-permissions').allowed(user, permission)) return res.status(403).json({ error: 'No tienes acceso a esta sección administrativa.' });
        }
        next();
    } catch (error) {
        console.error('No se pudo validar al usuario del conversor:', error);
        res.status(502).json({ error: 'No se pudo validar la sesión.' });
    }
}

function requireServiceRole(res) {
    if (adminAuth.available()) return true;
    res.status(503).json({ error: 'Configura una clave privada de Supabase únicamente en el servidor.' });
    return false;
}

async function supabaseAdmin(pathname, options = {}) {
    return adminAuth.request(pathname, options);
}

async function supabaseRest(pathname, { authorization, method = 'GET', body, prefer, range } = {}) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${pathname}`, {
        method,
        headers: {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            Authorization: authorization || `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
            ...(prefer ? { Prefer: prefer } : {}),
            ...(range ? { Range: range } : {})
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) })
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) {
        const error = new Error(data?.message || data?.details || 'Supabase rechazó la operación.');
        error.status = response.status;
        throw error;
    }
    return { data, response };
}

async function supabaseRestAll(pathname, authorization) {
    const rows = [];
    for (let from = 0; ; from += 1000) {
        const { data } = await supabaseRest(pathname, { authorization, range: `${from}-${from + 999}` });
        rows.push(...(Array.isArray(data) ? data : []));
        if (!Array.isArray(data) || data.length < 1000) return rows;
    }
}

function publicationImageFromStructure(structure) {
    return structure?.publicacion?.imagen_url || null;
}

function publicNormDescriptor(row, articleMeta) {
    const staticNorm = normas.find(item => item.id === row.codigo || item.slug === row.slug || item.slug === row.codigo);
    return {
        codigo: row.codigo,
        slug: row.slug || staticNorm?.slug || row.codigo,
        nombre: row.nombre || staticNorm?.title || row.codigo,
        introduccion: row.introduccion || staticNorm?.introduction || '',
        imagen_url: articleMeta?.imageUrl || staticNorm?.image?.src || null,
        total_articulos: articleMeta?.count || 0,
        static_id: staticNorm?.id || null,
        icono: staticNorm?.icon || 'fa-book',
        categoria: staticNorm?.category || 'Otras normas'
    };
}

app.get('/api/admin/publication-targets', requireAdmin, async (req, res) => {
    try {
        const authorization = req.get('authorization');
        const [databaseNorms, articleRows] = await Promise.all([
            supabaseRestAll('normas_legales?select=codigo,nombre,slug,introduccion,estado', authorization),
            supabaseRestAll('articulos_legales?select=codigo,estado', authorization)
        ]);
        const counts = new Map();
        articleRows.forEach(row => counts.set(row.codigo, (counts.get(row.codigo) || 0) + 1));
        const databaseByCode = new Map(databaseNorms.map(row => [row.codigo, row]));
        const targets = [];

        normas.forEach(norma => {
            const databaseNorm = databaseByCode.get(norma.id) || databaseNorms.find(row => row.slug === norma.slug);
            const code = databaseNorm?.codigo || norma.id;
            const hasStaticContent = norma.status === 'ready' && Boolean(norma.contentScript);
            if (!hasStaticContent && !(counts.get(code) > 0)) {
                targets.push({ codigo: code, nombre: databaseNorm?.nombre || norma.title, slug: databaseNorm?.slug || norma.slug, source: 'public-catalog' });
            }
        });

        databaseNorms.forEach(norma => {
            const existsInPublicCatalog = normas.some(item => item.id === norma.codigo || item.slug === norma.slug);
            if (!existsInPublicCatalog && !(counts.get(norma.codigo) > 0)) {
                targets.push({ codigo: norma.codigo, nombre: norma.nombre, slug: norma.slug || norma.codigo, source: 'database' });
            }
        });

        targets.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
        res.json({ targets });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});

app.post('/api/admin/publish-linked-legislation', requireAdmin, async (req, res) => {
    const authorization = req.get('authorization');
    try {
        const articles = Array.isArray(req.body?.articles) ? req.body.articles : [];
        const destination = req.body?.destination;
        const requestedCode = String(req.body?.codigo || '').trim();
        if (destination !== 'existing' || !requestedCode) throw Object.assign(new Error('Selecciona una legislación pública existente.'), { status: 400 });
        if (!articles.length || articles.some(article => !String(article.numero_articulo || '').trim())) {
            throw Object.assign(new Error('El documento no contiene artículos válidos para publicar.'), { status: 400 });
        }
        const uniqueNumbers = new Set(articles.map(article => String(article.numero_articulo).trim()));
        if (uniqueNumbers.size !== articles.length) throw Object.assign(new Error('El documento contiene números de artículo duplicados.'), { status: 400 });

        const targetsResponse = await supabaseRestAll('normas_legales?select=codigo,nombre,slug,introduccion,estado', authorization);
        const existingDatabaseNorm = targetsResponse.find(row => row.codigo === requestedCode);
        const publicNorm = normas.find(item => item.id === requestedCode || item.slug === existingDatabaseNorm?.slug);
        if (!existingDatabaseNorm && !publicNorm) throw Object.assign(new Error('La legislación seleccionada ya no existe en el catálogo público.'), { status: 404 });

        const now = new Date().toISOString();
        const normRow = {
            codigo: requestedCode,
            nombre: existingDatabaseNorm?.nombre || publicNorm.title,
            slug: existingDatabaseNorm?.slug || publicNorm.slug,
            introduccion: existingDatabaseNorm?.introduccion || publicNorm.introduction || null,
            estado: 'publicado',
            publicado_por: req.adminUser.id,
            publicado_en: now,
            actualizado_en: now
        };
        if (!existingDatabaseNorm) normRow.creado_por = req.adminUser.id;
        await supabaseRest('normas_legales?on_conflict=codigo', {
            authorization,
            method: 'POST',
            prefer: 'resolution=merge-duplicates,return=minimal',
            body: [normRow]
        });

        const rows = articles.map((article, index) => ({
            codigo: requestedCode,
            numero_articulo: String(article.numero_articulo).trim(),
            titulo: article.titulo || null,
            contenido: article.contenido || '',
            contenido_lne: article.contenido_lne || {},
            estructura: article.estructura || {},
            orden: index + 1,
            estado: 'publicado',
            publicado_por: req.adminUser.id,
            publicado_en: now,
            actualizado_en: now
        }));
        for (let index = 0; index < rows.length; index += 100) {
            await supabaseRest('articulos_legales?on_conflict=codigo,numero_articulo', {
                authorization,
                method: 'POST',
                prefer: 'resolution=merge-duplicates,return=minimal',
                body: rows.slice(index, index + 100)
            });
        }
        res.json({ ok: true, codigo: requestedCode, nombre: normRow.nombre, articleCount: rows.length, slug: normRow.slug });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});

app.get('/api/public/legislation', async (_req, res) => {
    res.set('Cache-Control', 'no-store');
    try {
        const [databaseNorms, articleRows] = await Promise.all([
            supabaseRestAll('normas_legales?select=codigo,nombre,slug,introduccion,estado&estado=eq.publicado'),
            supabaseRestAll('articulos_legales?select=codigo,estructura,estado&estado=eq.publicado')
        ]);
        const articleMeta = new Map();
        articleRows.forEach(row => {
            const current = articleMeta.get(row.codigo) || { count: 0, imageUrl: null };
            current.count += 1;
            current.imageUrl ||= publicationImageFromStructure(row.estructura);
            articleMeta.set(row.codigo, current);
        });
        res.json({ normas: databaseNorms.filter(row => articleMeta.get(row.codigo)?.count).map(row => publicNormDescriptor(row, articleMeta.get(row.codigo))) });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});

app.get('/api/public/legislation/search-index', async (_req, res) => {
    res.set('Cache-Control', 'no-store');
    try {
        const [publishedNorms, articles] = await Promise.all([
            supabaseRestAll('normas_legales?select=codigo,nombre,slug&estado=eq.publicado'),
            supabaseRestAll('articulos_legales?select=codigo,numero_articulo,titulo,contenido,contenido_lne,estructura&estado=eq.publicado&order=orden.asc,id.asc')
        ]);
        const base = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/search-index.json'), 'utf8'));
        res.json(require('./lib/legal-search-index')(base, publishedNorms, articles));
    } catch (error) {
        res.status(502).json({ error: 'Índice jurídico no disponible temporalmente.' });
    }
});

app.get('/api/public/legislation/:slug/articles', async (req, res) => {
    res.set('Cache-Control', 'no-store');
    try {
        const slug = encodeURIComponent(req.params.slug);
        const { data: normRows } = await supabaseRest(`normas_legales?select=codigo,nombre,slug,introduccion,estado&slug=eq.${slug}&estado=eq.publicado&limit=1`);
        const norma = normRows?.[0];
        if (!norma) return res.status(404).json({ error: 'Legislación no publicada.' });
        const rows = await supabaseRestAll(`articulos_legales?select=numero_articulo,titulo,contenido,contenido_lne,estructura,orden&codigo=eq.${encodeURIComponent(norma.codigo)}&estado=eq.publicado&order=orden.asc`);
        res.json({ norma, articulos: rows });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});

app.use('/api/admin', require('./lib/admin-users')({ requireAdmin, rest: supabaseRest, auth: supabaseAdmin, serviceAvailable: adminAuth.available }));
// Legacy account endpoints are no longer registered: all account operations go through admin-users.

const publicationImageUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, callback) => callback(null, ['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype))
});
const publicationImagesDirectory = path.join(__dirname, 'assets', 'imagenes', 'publicadas');
app.post('/api/admin/publication-images', requireAdmin, (req, res) => {
    publicationImageUpload.single('image')(req, res, error => {
        if (error) {
            const message = error.code === 'LIMIT_FILE_SIZE'
                ? 'La imagen supera el límite de 5 MB.'
                : 'No se pudo procesar la imagen seleccionada.';
            return res.status(400).json({ error: message });
        }
        if (!req.file) return res.status(400).json({ error: 'Selecciona una imagen PNG, JPG o WebP válida.' });
        fs.mkdirSync(publicationImagesDirectory, { recursive: true });
        const extension = ({ 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp' })[req.file.mimetype];
        const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extension}`;
        fs.writeFileSync(path.join(publicationImagesDirectory, filename), req.file.buffer);
        return res.status(201).json({ path: `/assets/imagenes/publicadas/${filename}` });
    });
});
app.delete('/api/admin/publication-images/:filename', requireAdmin, (req, res) => {
    const filename = path.basename(req.params.filename || '');
    if (!/^[0-9]+-[a-f0-9]{16}\.(png|jpg|webp)$/.test(filename)) return res.status(400).json({ error: 'Referencia de imagen inválida.' });
    const target = path.join(publicationImagesDirectory, filename);
    if (fs.existsSync(target)) fs.unlinkSync(target);
    res.status(204).end();
});

// FASE 1: conversor jurídico aislado. Procesa y exporta, pero no escribe en Supabase.
app.use('/api/admin/converter', createLegalConverterRouter(requireAdmin));
app.get('/admin/converter-workspace', summaryAdminRouter.authorizePage, (req, res, next) => require('./lib/summary-permissions').requirePermission(req.query.mode === 'legislation' ? 'legislation_access' : 'converter_access')(req, res, next), (_req, res) => {
    res.sendFile(path.join(__dirname, 'admin-converter', 'index.html'));
});
app.use('/admin-converter-assets', (req, res, next) => /\.html$/i.test(req.path) ? summaryAdminRouter.authorizePage(req, res, () => require('./lib/summary-permissions').requirePermission('converter_access')(req, res, next)) : next(), express.static(path.join(__dirname, 'admin-converter')));
app.get('/tests/legislation-editor-harness', (_req, res) => {
    res.sendFile(path.join(__dirname, 'tests', 'legislation-editor-harness.html'));
});
app.get('/tests/converter-publication-harness', (_req, res) => {
    res.sendFile(path.join(__dirname, 'tests', 'converter-publication-harness.html'));
});

// Mantener compatibles los enlaces públicos anteriores mediante redirecciones permanentes.
const legacyRedirects = new Map([
    ['/index.html', '/'],
    ['/home.html', '/']
]);

normas.forEach(norma => {
    (norma.legacyPaths || []).forEach(legacyPath => {
        legacyRedirects.set(legacyPath.toLowerCase(), norma.url);
    });
});

formacion.courses.forEach(course => {
    course.legacyPaths.forEach(legacyPath => {
        legacyRedirects.set(legacyPath.toLowerCase(), course.route);
    });
});

app.get(Array.from(legacyRedirects.keys()), (req, res) => {
    const destination = legacyRedirects.get(req.path.toLowerCase());
    const queryIndex = req.originalUrl.indexOf('?');
    const queryString = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : '';
    res.redirect(301, `${destination}${queryString}`);
});

// Verificación pública de Google Search Console, antes del fallback de la SPA.
app.get('/googlea91f2d4ac41a836d.html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'googlea91f2d4ac41a836d.html'));
});

// Real public pages render meaningful HTML for every visitor before SPA startup.
// Unknown routes are 404; data outages are 503, never an empty indexable shell.
const publicSeo = require('./lib/public-seo').createPublicSeo({
    root: __dirname,
    getConfig: () => ({ url: SUPABASE_URL, key: SUPABASE_PUBLISHABLE_KEY })
});
app.use(publicSeo.router);

// Servir archivos estáticos del sitio
app.use(express.static(__dirname));

// Endpoint del Backend Proxy de IA
app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'La clave de API de Gemini no está configurada en el servidor.' });
    }

    const modelName = 'gemini-3.1-flash-lite';
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error desde la API de Gemini:', errorText);
            return res.status(response.status).send(errorText);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error en el Proxy de Gemini:', error);
        res.status(500).json({ error: 'Error interno del servidor al conectar con Gemini.' });
    }
});

app.use((_req, res) => res.status(404).set('X-Robots-Tag', 'noindex').send('Página no encontrada.'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de La Norma Express corriendo en http://localhost:${PORT}`);
});
