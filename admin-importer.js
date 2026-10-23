(function () {
    'use strict';
    function normalizeLines(text) { return text.replace(/\r/g, '').split('\n').map(line => line.replace(/\s+/g, ' ').trim()).filter(Boolean); }
    function lineType(line) {
        if (/^art[íi]culo\s+[\w.-]+/i.test(line)) return 'article';
        if (/^(t[íi]tulo|libro|secci[oó]n)\s+[\w.-]+/i.test(line)) return 'title';
        if (/^(cap[íi]tulo|subcap[íi]tulo)\s+[\w.-]+/i.test(line)) return 'subtitle';
        if (/^\d+[.)]\s+/.test(line)) return 'inciso';
        if (/^[a-záéíóúñ][.)]\s+/i.test(line)) return 'subinciso';
        return 'paragraph';
    }
    function parseNumber(line, fallback) { return line.match(/^art[íi]culo\s+([^\s.:-]+)/i)?.[1] || String(fallback); }
    function parseArticleHeading(line) { return line.replace(/^art[íi]culo\s+[^\s.:-]+\s*[.:-]*\s*/i, '').trim(); }
    function parseText(text) {
        const lines = normalizeLines(text); const articles = []; let current = null; let pendingHierarchy = [];
        for (const line of lines) {
            const type = lineType(line);
            if (type === 'title' || type === 'subtitle') { pendingHierarchy.push({ tipo: type === 'title' ? 'titulo' : 'subtitulo', html: line, marcador: null }); if (pendingHierarchy.length > 8) pendingHierarchy.shift(); continue; }
            if (type === 'article') {
                current = { numero: parseNumber(line, articles.length + 1), titulo: parseArticleHeading(line) || null, bloques: pendingHierarchy.splice(0) };
                articles.push(current); continue;
            }
            if (!current) { current = { numero: String(articles.length + 1), titulo: null, bloques: pendingHierarchy.splice(0) }; articles.push(current); }
            const marker = type === 'inciso' || type === 'subinciso' ? line.match(/^\S+/)?.[0] : null;
            current.bloques.push({ tipo: type === 'paragraph' ? 'parrafo' : type, marcador: marker, html: marker ? line.slice(marker.length).trim() : line });
        }
        return articles.filter(article => article.bloques.length || article.titulo);
    }
    async function extractDocx(file) {
        if (!window.mammoth) throw new Error('No se pudo cargar el procesador de Word.');
        const result = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
        return result.value;
    }
    async function extractPdf(file) {
        const pdfjs = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs');
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
        const document = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
        const pages = [];
        for (let number = 1; number <= document.numPages; number += 1) {
            const page = await document.getPage(number); const content = await page.getTextContent();
            let lastY = null; let line = ''; const lines = [];
            for (const item of content.items) {
                const y = Math.round(item.transform[5]);
                if (lastY !== null && Math.abs(y - lastY) > 2) { if (line.trim()) lines.push(line.trim()); line = ''; }
                line += `${line ? ' ' : ''}${item.str}`; lastY = y;
            }
            if (line.trim()) lines.push(line.trim()); pages.push(lines.join('\n'));
        }
        return pages.join('\n');
    }
    async function process(file) {
        if (!file) throw new Error('Selecciona un archivo Word o PDF.');
        const lower = file.name.toLowerCase();
        const text = lower.endsWith('.docx') ? await extractDocx(file) : lower.endsWith('.pdf') ? await extractPdf(file) : null;
        if (text === null) throw new Error('Formato no admitido. Usa DOCX o PDF.');
        const articles = parseText(text);
        if (!articles.length) throw new Error('No se detectaron artículos en el documento.');
        return { fileName: file.name, text, articles };
    }
    window.LNEImporter = Object.freeze({ process, parseText });
})();
