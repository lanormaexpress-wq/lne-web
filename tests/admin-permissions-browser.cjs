// Production authorization function + routers + real admin UI. Provider data is simulated.
const express = require('express'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path'), vm = require('vm');
const { chromium } = require('C:/Users/Usuario/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const catalog = require('../admin-permission-catalog'), root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'server.js'), 'utf8');
const users = Object.fromEntries(['owner', 'reviewer', 'writer'].map((profile, i) => [profile, { id: `${i + 1}1111111-1111-4111-8111-111111111111`, email: profile + '@example.invalid', name: profile, role: profile === 'owner' ? 'owner' : 'editor', profile, status: 'Activo', permissions: catalog.preset(profile) }]));
const authUser = key => ({ id: users[key].id, email: users[key].email, app_metadata: { role: users[key].role } });
const rest = async (route, options = {}) => {
    if (route === 'rpc/admin_list_users') return { data: Object.values(users) };
    if (options.method === 'POST') { const user = Object.values(users).find(u => u.id === options.body.user_id); Object.assign(user, options.body); return { data: null }; }
    const user = Object.values(users).find(u => route.includes(u.id)); return { data: user ? [{ profile: user.profile, permissions: user.permissions }] : [] };
};
const context = { require: id => require(path.join(root, id)), SUPABASE_URL: 'https://provider.invalid', SUPABASE_PUBLISHABLE_KEY: 'test', supabaseRest: rest, console,
    fetch: async (_url, options) => { const key = options.headers.Authorization.slice(7); return { ok: Boolean(users[key]), json: async () => authUser(key) }; } };
// Execute the exact production middleware, not a reimplementation with weaker checks.
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('async function requireAdmin('), source.indexOf('function requireServiceRole(')) + '\nthis.guard=requireAdmin;', context);
const guard = context.guard, app = express(); app.use(express.json());
const summary = require('../lib/summary-editor')(guard);
app.use('/admin/resumenes', summary);
app.use('/api/admin', require('../lib/admin-users')({ requireAdmin: guard, rest, serviceAvailable: () => false }));
for (const route of ['/api/admin/publication-targets', '/api/admin/converter']) app.get(route, guard, (_req, res) => res.json({ ok: true }));
app.get('/admin/converter-workspace', summary.authorizePage, require('../lib/summary-permissions').requirePermission('converter_access'), (_req, res) => res.send('Converter authorized'));
app.get('/api/config/supabase', (_req, res) => res.json({ url: 'https://provider.invalid', publishableKey: 'public-test' }));
app.get('/admin', (_req, res) => res.sendFile(path.join(root, 'admin.html'))); app.use(express.static(root));
const server = app.listen(0, '127.0.0.1', async () => {
    let browser;
    try {
        const base = `http://127.0.0.1:${server.address().port}`;
        browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
        const results = [];
        for (const profile of ['owner', 'reviewer', 'writer']) {
            const browserContext = await browser.newContext(), page = await browserContext.newPage(), errors = [];
            page.on('pageerror', e => errors.push(e.message));
            await page.route('**/npm/@supabase/supabase-js@2', route => route.fulfill({ contentType: 'text/javascript', body: `window.supabase={createClient(){return {auth:{async getSession(){return {data:{session:{access_token:'${profile}',user:${JSON.stringify(authUser(profile))}}}}},onAuthStateChange(){},async signOut(){}},from(){const chain=new Proxy({}, {get(_target,key){if(key==='then')return resolve=>resolve({data:[],count:0,error:null});return ()=>chain}});return chain}}}};` }));
            await page.goto(base + '/admin', { waitUntil: 'domcontentloaded' });
            await page.locator('#admin-view').waitFor({ state: 'visible' });
            await page.waitForFunction(() => window.LNEAdminAccess !== undefined);
            const tabs = await page.locator('.admin-tab').evaluateAll(items => items.filter(n => !n.hidden).map(n => n.dataset.adminSection));
            assert.deepEqual(tabs, profile === 'owner' ? ['legislation', 'converter', 'summaries', 'users'] : ['summaries']);
            if (profile !== 'owner') {
                await page.frameLocator('#summary-editor-frame').locator('#lne-summary-continue').waitFor();
                assert.equal(await page.frameLocator('#summary-editor-frame').locator('#btn-importar-word').isEnabled(), true);
                assert.equal(await page.frameLocator('#summary-editor-frame').locator('#btn-nuevo').isEnabled(), true);
            } else {
                await page.locator('[data-admin-section="users"]').click();
                await page.getByRole('button', { name: 'EDITAR PERMISOS', exact: true }).first().waitFor();
                await page.locator('#new-user-button').click();
                await page.locator('#managed-user-role').selectOption('reviewer');
                assert.equal(await page.locator('[data-granular-permission="summary_publish"]').isChecked(), true);
                await page.locator('#managed-user-role').selectOption('writer');
                assert.equal(await page.locator('[data-granular-permission="summary_publish"]').isChecked(), false);
                assert.equal(await page.locator('[data-granular-permission="summary_submit_review"]').isChecked(), true);
                await page.locator('#user-dialog [data-close-dialog]').first().click();
            }
            const headers = { Authorization: 'Bearer ' + profile };
            for (const route of ['/api/admin/publication-targets', '/api/admin/converter', '/api/admin/users']) assert.equal((await fetch(base + route, { headers })).status, profile === 'owner' ? 200 : 403, route + ': ' + profile);
            if (profile === 'owner') {
                const jsonHeaders={...headers,'Content-Type':'application/json'};
                assert.equal((await fetch(base+'/api/admin/users',{method:'POST',headers:jsonHeaders,body:JSON.stringify({name:'Rollback Test',email:'never-created@example.invalid',password:'temporary-test-only',profile:'writer',permissions:catalog.preset('writer')})})).status,503,'Missing server key must fail closed');
                assert.equal((await fetch(base+'/api/admin/users/'+users.owner.id,{method:'PATCH',headers:jsonHeaders,body:JSON.stringify({profile:'writer',permissions:catalog.preset('writer')})})).status,409,'Last owner cannot be demoted');
            }
            assert.equal((await browserContext.request.get(base + '/admin/converter-workspace')).status(), profile === 'owner' ? 200 : 403);
            if (profile !== 'owner') {
                const denied = await browserContext.request.post(base + '/admin/resumenes/session', { headers });
                assert.equal(denied.status(), 200);
                // A valid forbidden action must not destroy the authenticated cookie bridge.
                assert.equal((await browserContext.request.get(base + '/admin/resumenes/editor')).status(),200);
            }
            assert.deepEqual(errors, []);
            results.push({ profile, visibleTabs: tabs, routeAuthorization: true, errors });
            await browserContext.close();
        }
        const docsApp = express(); docsApp.use(express.json());
        docsApp.use((req,_res,next)=>{req.adminUser={...authUser('writer'),admin_permissions:catalog.preset('writer')};next();});
        const originalFetch=global.fetch;
        // Exercise production document endpoints, not only visibility/RLS.
        global.fetch=async()=>({ok:true,text:async()=>JSON.stringify([{id:users.writer.id,author_id:users.writer.id,status:'EN_REVISION',updated_at:'v1'}])});
        docsApp.use(require('../lib/summary-documents').privateRouter(()=>({url:'https://provider.invalid',key:'test'})));
        const docServer=docsApp.listen(0,'127.0.0.1');await new Promise(resolve=>docServer.once('listening',resolve));
        try {
            const docBase=`http://127.0.0.1:${docServer.address().port}/${users.writer.id}`;
            assert.equal((await originalFetch(docBase,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'publish',updated_at:'v1'})})).status,403);
            assert.equal((await originalFetch(docBase+'/publication',{method:'DELETE'})).status,403);
        } finally {global.fetch=originalFetch;docServer.close();docServer.closeAllConnections();}
        console.log(JSON.stringify({ scope: 'Simulated provider, production middleware and real Chromium/admin/iframe', results, writerPublishAndWithdrawal403:true, noRealUsersCreated: true }));
    } catch (error) { console.error(error); process.exitCode = 1; }
    finally { await browser?.close(); server.close(); server.closeAllConnections(); }
});
