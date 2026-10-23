const express = require('express');
const multer = require('multer');
const vm = require('vm');

const { convertLegalText, normalizeHeadingAccentsInText } = require('./parser');
const { extractDocxStructuredTextDetailed } = require('./docx_extractor');
const { suggestProjectNames } = require('./project_naming');
const { buildDocx } = require('./docx_exporter');
const { preparePdf } = require('./pdf_preparer');
const { previewFromEditedJs } = require('./js_preview_parser');
const { auditTextCoverage } = require('./coverage_audit');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }
});

function createLegalConverterRouter(requireAdmin) {
    const router = express.Router();
    router.use(requireAdmin);

    async function extractText(file) {
        const name = String(file.originalname || '').toLowerCase();
        if (name.endsWith('.js')) {
            const code = file.buffer.toString('utf8');
            const parsed = previewFromEditedJs(code);
            const declaration = code.match(/\b(?:const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*\[/);
            return {
                text: '',
                importedJs: {
                    code,
                    preview: parsed.preview,
                    recoveredDeclaration: parsed.recoveredDeclaration,
                    variableName: declaration?.[1] || 'CodigoLegal'
                },
                extractionDiagnostics: {
                    source: 'JAVASCRIPT',
                    entries: parsed.preview.flatMap(group => group.articulos || []).length
                }
            };
        }
        if (name.endsWith('.txt')) {
            return { text: file.buffer.toString('utf8'), extractionDiagnostics: { source: 'TXT' } };
        }
        if (name.endsWith('.docx')) {
            const result = extractDocxStructuredTextDetailed(file.buffer);
            return {
                text: result.text,
                extractionDiagnostics: { source: 'DOCX', ...result.diagnostics },
                extractionHints: result.hints || {}
            };
        }
        if (name.endsWith('.pdf')) {
            const prepared = await preparePdf(file.buffer, { columns: file.columns });
            const blocks = prepared.blocks.slice(prepared.startIndex);
            return {
                text: blocks.map(block => block.type === 'article' && !block.isBodyFont
                    ? block.text.replace(/^[“"«]\s*(?=Art[íi]culo\s)/, '')
                    : block.text).join('\n\n'),
                extractionDiagnostics: {
                    source: 'PDF', pages: prepared.pages,
                    twoColumnPages: prepared.columnsDetected,
                    threeColumnPages: prepared.threeColumnPages || [],
                    ocrPages: prepared.ocrPages || [],
                    startPage: blocks[0]?.page || 1,
                    excludedBlocks: prepared.startIndex,
                    warnings: prepared.warnings
                },
                extractionHints: { pdfPrepared: true },
                preparedPdf: {
                    blocks: prepared.blocks,
                    startIndex: prepared.startIndex,
                    warnings: prepared.warnings
                }
            };
        }
        throw new Error('Formato no compatible. Usa PDF, DOCX, TXT o JS.');
    }

    router.post('/extract', upload.single('file'), async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'No se recibió ningún archivo.' });
            if (req.body?.columns) req.file.columns = req.body.columns;
            const extracted = await extractText(req.file);
            if (extracted.importedJs) {
                const suggestions = suggestProjectNames(req.file.originalname, '');
                return res.json({
                    filename: req.file.originalname,
                    importedJs: extracted.importedJs,
                    extractionDiagnostics: extracted.extractionDiagnostics || {},
                    suggestedVariableName: extracted.importedJs.variableName || suggestions.variableName,
                    suggestedOutputName: req.file.originalname,
                    suggestedDisplayName: suggestions.displayName
                });
            }
            if (!String(extracted.text || '').trim()) {
                return res.status(422).json({ error: 'No se pudo extraer texto del documento.' });
            }
            const accentResult = normalizeHeadingAccentsInText(extracted.text);
            const suggestions = suggestProjectNames(req.file.originalname, accentResult.text);
            res.json({
                filename: req.file.originalname,
                text: accentResult.text,
                characters: accentResult.text.length,
                accentCorrections: accentResult.corrections,
                accentCorrectionCount: accentResult.totalChanges,
                extractionDiagnostics: extracted.extractionDiagnostics || {},
                extractionHints: extracted.extractionHints || {},
                preparedPdf: extracted.preparedPdf || null,
                suggestedVariableName: suggestions.variableName,
                suggestedOutputName: suggestions.outputName,
                suggestedDisplayName: suggestions.displayName
            });
        } catch (error) {
            console.error('[admin converter extract]', error);
            res.status(422).json({ error: error.message || 'Error al leer el documento.' });
        }
    });

    router.post('/convert', (req, res) => {
        try {
            const { text, variableName = 'CodigoLegal', extractionHints = {} } = req.body || {};
            if (!String(text || '').trim()) return res.status(400).json({ error: 'No hay texto para convertir.' });
            const suggestions = suggestProjectNames('', String(text));
            const effectiveName = variableName === 'CodigoLegal' ? suggestions.variableName : String(variableName);
            const result = convertLegalText(String(text), effectiveName, { extractionHints });
            result.coverage = auditTextCoverage(String(text), result.preview);
            if (result.coverage.missing) {
                result.warnings ||= [];
                result.warnings.push(`Integridad: ${result.coverage.missing} de ${result.coverage.checked} fragmentos requieren revisión.`);
            }
            try {
                new vm.Script(result.js);
                result.stats.javascriptValido = true;
            } catch (syntaxError) {
                result.stats.javascriptValido = false;
                result.warnings ||= [];
                result.warnings.push(`El JavaScript generado necesita revisión: ${syntaxError.message}`);
            }
            result.suggestions = suggestions;
            res.json(result);
        } catch (error) {
            console.error('[admin converter convert]', error);
            res.status(422).json({ error: error.message || 'Error al convertir el documento.' });
        }
    });

    router.post('/preview-from-js', (req, res) => {
        try {
            res.json(previewFromEditedJs(req.body?.code, req.body?.variableName));
        } catch (error) {
            res.status(422).json({ error: error.message || 'No se pudo interpretar el JavaScript editado.' });
        }
    });

    router.post('/export-docx', (req, res) => {
        try {
            const preview = req.body?.preview;
            if (!Array.isArray(preview) || !preview.length) return res.status(400).json({ error: 'No hay una vista previa para exportar.' });
            const title = String(req.body?.title || 'NORMA LEGAL').trim();
            const buffer = buildDocx(title, preview);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename="norma_revisada.docx"');
            res.send(buffer);
        } catch (error) {
            res.status(500).json({ error: error.message || 'No se pudo crear el documento Word.' });
        }
    });

    // FASE 1: el espacio de trabajo no persiste proyectos en servidor ni Supabase.
    router.get('/projects', (_req, res) => res.json({ projects: [] }));
    router.post('/projects', (_req, res) => res.status(409).json({ error: 'FASE 1: usa Descargar proyecto; el guardado en Supabase aún está desactivado.' }));
    router.get('/projects/:name', (_req, res) => res.status(404).json({ error: 'Proyecto no encontrado.' }));

    return router;
}

module.exports = { createLegalConverterRouter };
