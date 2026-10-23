/**
 * EXPORT.JS - Gestor de Exportación Integral LNE
 * Genera el paquete oficial único: LNE_Material_Tema_XX.zip
 * conteniendo:
 *   - material.lne.json (fuente estructurada)
 *   - material.html (compilado para La Norma Express)
 *   - manifest.json (metadatos e inventario)
 *   - imagenes/ (archivos binarios extraídos con rutas relativas)
 */

window.LNEExport = (function () {
    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 150);
    }

    function formatTemaNumero(raw) {
        const digits = String(raw || '').replace(/\D/g, '');
        if (digits) {
            return digits.padStart(2, '0');
        }
        return '01';
    }

    function sanitizeFilename(name) {
        return (name || 'material')
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '_');
    }

    /**
     * Exportación Maestra Única: LNE_Material_Tema_XX.zip
     */
    async function exportPackageZIP() {
        if (!window.JSZip) {
            alert("Librería de compresión JSZip no disponible. Descargando archivos individuales.");
            exportSourceJSON();
            exportCompiledHTML();
            return;
        }

        const state = window.LNEState.state;
        const temaNumPad = formatTemaNumero(state.metadata?.temaNumero);
        const zipFileName = `LNE_Material_Tema_${temaNumPad}.zip`;

        const zip = new JSZip();
        const imgFolder = zip.folder("imagenes");
        const manifestImages = [];
        let imgCounter = 1;

        // Clonar profundamente el estado para normalizar rutas sin alterar el lienzo activo
        const cleanState = JSON.parse(JSON.stringify(state));

        // 1. Extraer todas las imágenes en Base64 o DataURI a archivos binarios y normalizar URLs
        cleanState.bloques.forEach((block) => {
            if (block.tipo === 'imagen' && block.propiedades?.src) {
                const src = block.propiedades.src;
                if (src.startsWith('data:image/')) {
                    const b64Matches = src.match(/^data:image\/([a-zA-Z0-9\+\-\.]+);base64,(.+)$/);
                    if (b64Matches) {
                        let ext = b64Matches[1].toLowerCase();
                        if (ext === 'jpeg') ext = 'jpg';
                        if (ext.includes('svg')) ext = 'svg';
                        if (ext.includes('png')) ext = 'png';
                        if (ext.includes('webp')) ext = 'webp';

                        const imgFileName = `imagen-${String(imgCounter).padStart(2, '0')}.${ext}`;
                        imgCounter++;

                        imgFolder.file(imgFileName, b64Matches[2], { base64: true });
                        const relativePath = `imagenes/${imgFileName}`;
                        block.propiedades.src = relativePath;
                        manifestImages.push(relativePath);
                    } else if (src.includes('svg') && src.includes(',')) {
                        try {
                            const svgContent = decodeURIComponent(src.split(',')[1]);
                            const imgFileName = `imagen-${String(imgCounter).padStart(2, '0')}.svg`;
                            imgCounter++;
                            imgFolder.file(imgFileName, svgContent);
                            const relativePath = `imagenes/${imgFileName}`;
                            block.propiedades.src = relativePath;
                            manifestImages.push(relativePath);
                        } catch (e) {
                            console.error("Error al decodificar SVG DataURL:", e);
                        }
                    }
                } else if (src.startsWith('imagenes/') || src.startsWith('./imagenes/')) {
                    manifestImages.push(src);
                }
            }
        });

        // 2. Generar material.lne.json oficial
        const jsonExportData = {
            lneVersion: cleanState.lneVersion || "1.0",
            documentoId: cleanState.documentoId,
            metadata: {
                ...cleanState.metadata,
                fechaExportacion: new Date().toISOString()
            },
            bloques: cleanState.bloques
        };
        zip.file("material.lne.json", JSON.stringify(jsonExportData, null, 2));

        // 3. Generar material.html compilado con el diseño institucional
        const htmlContent = window.LNERenderer.compileToHTML(cleanState);
        zip.file("material.html", htmlContent);

        // 4. Generar manifest.json
        const manifestData = {
            proyecto: "La Norma Express - Material Jurídico",
            lneVersion: cleanState.lneVersion || "1.0",
            documentoId: cleanState.documentoId,
            curso: cleanState.metadata.curso || "Formación Jurídica",
            temaNumero: cleanState.metadata.temaNumero || "1",
            titulo: cleanState.metadata.titulo || "Título del Tema",
            autor: cleanState.metadata.autor || "La Norma Express",
            fechaExportacion: new Date().toISOString(),
            totalBloques: cleanState.bloques.length,
            imagenes: manifestImages
        };
        zip.file("manifest.json", JSON.stringify(manifestData, null, 2));

        // 5. Compilar y descargar el paquete ZIP único
        const zipBlob = await zip.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: { level: 6 }
        });

        downloadBlob(zipBlob, zipFileName);
        return zipFileName;
    }

    function exportSourceJSON() {
        const state = window.LNEState.state;
        const exportData = {
            lneVersion: state.lneVersion,
            documentoId: state.documentoId,
            metadata: {
                ...state.metadata,
                fechaExportacion: new Date().toISOString()
            },
            bloques: state.bloques
        };

        const jsonString = JSON.stringify(exportData, null, 2);
        const filename = `${sanitizeFilename(state.metadata.titulo)}.material.lne.json`;
        const blob = new Blob([jsonString], { type: 'application/json' });
        downloadBlob(blob, filename);
    }

    function exportCompiledHTML() {
        const state = window.LNEState.state;
        const htmlString = window.LNERenderer.compileToHTML(state);
        const filename = `${sanitizeFilename(state.metadata.titulo)}.html`;
        const blob = new Blob([htmlString], { type: 'text/html; charset=UTF-8' });
        downloadBlob(blob, filename);
    }

    return {
        exportPackageZIP,
        exportSourceJSON,
        exportCompiledHTML
    };
})();
