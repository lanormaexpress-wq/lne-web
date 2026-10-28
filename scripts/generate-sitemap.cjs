'use strict';
// Explicit, read-only regeneration of the deployable cold-start snapshot.
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
require('dotenv').config({ path: path.join(root, '.env') });
const { createPublicSeo } = require('../lib/public-seo');
const { prepareSnapshot } = require('../lib/sitemap-cache');
const url = process.env.SUPABASE_URL || 'https://higdtttcndqzapkenets.supabase.co';
const key = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_cF5BrrxGmFf2_wnbxWaACg_TRM3nGPB';
let role;
try { role = JSON.parse(Buffer.from(key.split('.')[1], 'base64url')).role; } catch (_) {}
if (key.startsWith('sb_secret_') || role === 'service_role') throw new Error('Use only a public publishable key');
const seo = createPublicSeo({ root, getConfig: () => ({ url, key }), sitemapOptions: { seedFile: false, cacheFile: false, autoStart: false } });
(async () => {
    const snapshot = prepareSnapshot({ version: 1, generatedAt: new Date().toISOString(), entries: await seo.sitemapEntries() });
    const target = path.join(root, 'lib/sitemap-seed.json');
    await fs.writeFile(target + '.tmp', JSON.stringify(snapshot.manifest) + '\n', 'utf8');
    await fs.rename(target + '.tmp', target);
    console.log(`Validated ${snapshot.manifest.entries.length} public canonical URLs; wrote lib/sitemap-seed.json`);
})().catch(error => { console.error(error.message); process.exitCode = 1; });
