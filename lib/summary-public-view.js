'use strict';

// Presentation-only envelope. The saved publication is never rewritten.
const POLICY = "default-src 'none'; img-src https: data:; style-src 'self' 'unsafe-inline' https:; font-src https: data:;";
const isCanvasPublication=source=>/class=["'][^"']*\bblock-absolute-(?:text|image)\b/i.test(String(source||''));
function renderPublicSummary(source) {
    const stylesheet = '<meta http-equiv="Content-Security-Policy" content="' + POLICY + '"><link rel="stylesheet" href="/summary-public.css?v=20261030-sharp-2">';
    let html = String(source || '');
    if (/<head\b/i.test(html)) html = html.replace(/<\/head\s*>/i, stylesheet + '</head>');
    else html = '<!doctype html><html lang="es-PE"><head><meta name="viewport" content="width=device-width,initial-scale=1">' + stylesheet + '</head><body>' + html + '</body></html>';
    html = html.replace(/<body\b([^>]*)>/i, '<body$1><div class="lne-public-summary' + (isCanvasPublication(source)?' lne-public-summary-canvas':'') + '" lang="es-PE" spellcheck="false">')
        .replace(/<\/body\s*>/i, '</div></body>');
    // Keep the doctype first: putting the CSP before it triggers quirks mode
    // and changes table/text metrics relative to the standards-mode editor.
    return html;
}
module.exports = { renderPublicSummary, isCanvasPublication, POLICY };
