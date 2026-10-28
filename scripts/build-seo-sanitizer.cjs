'use strict';
// Reproducible compatibility artifact. Production needs no build tool or flags.
const path = require('node:path');
const fs = require('node:fs');
const root = path.resolve(__dirname, '..');
const version = require('../package.json').dependencies['sanitize-html'];
const build = require('esbuild').buildSync({
    entryPoints: [require.resolve('sanitize-html')],
    outfile: path.join(root, 'lib/seo-sanitizer.cjs'),
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: ['node22.11'],
    minify: true,
    metafile: true,
    legalComments: 'eof',
    banner: { js: `/* Generated from sanitize-html ${version}. Run npm run build:seo-sanitizer; do not edit. */` },
    footer: { js: `module.exports.lneVersion = ${JSON.stringify(version)};` }
});
// Preserve complete third-party licenses alongside the generated source.
const seen = new Set(), licenses = [];
for (const input of Object.keys(build.metafile.inputs)) {
    let directory = path.dirname(path.resolve(input));
    while (directory !== path.dirname(directory)) {
        const file = path.join(directory, 'package.json');
        if (fs.existsSync(file) && JSON.parse(fs.readFileSync(file, 'utf8')).name) break;
        directory = path.dirname(directory);
    }
    if (seen.has(directory) || !fs.existsSync(path.join(directory, 'package.json'))) continue;
    seen.add(directory);
    const pkg = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
    const license = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'license', 'license.md', 'COPYING'].find(file => fs.existsSync(path.join(directory, file)));
    licenses.push(`${pkg.name} ${pkg.version}\n${license ? fs.readFileSync(path.join(directory, license), 'utf8') : `License: ${pkg.license || 'See upstream package'}`}`);
}
fs.writeFileSync(path.join(root, 'lib/seo-sanitizer.LICENSE.txt'), licenses.sort().join('\n\n---\n\n').replace(/[ \t]+$/gm, '').trimEnd() + '\n');
