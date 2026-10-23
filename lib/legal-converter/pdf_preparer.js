const { PDFParse } = require("pdf-parse");
const { ocrPdfPage } = require("./ocr_bridge");

const structural = /^(?:[“"«]?\s*)?(?:C[ÓO]DIGO\s+[A-ZÁÉÍÓÚÑ ]{4,}|T[ÍI]TULO\s+PRELIMINAR|LIBRO\s+|T[ÍI]TULO\s+|CAP[ÍI]TULO\s+|SUBCAP[ÍI]TULO\s+|SECCI[ÓO]N\s+|SUBSECCI[ÓO]N\s+|DISPOSICIONES?\s+|ANEXO\s+|ART[ÍI]CULO\s+[\dIVXLC])/i;
const article = /^[“"«]?\s*Art[íi]culo\s+(?:\d+[A-Za-z]?(?:[-.]\w+)?|[IVXLC]+)\s*(?:[.°º-]|$)/i;
const list = /^(?:\d+(?:\.\d+)*[.)-]?|[a-z][.)])\s+/i;

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function makeLine(items) {
  items.sort((a, b) => a.x - b.x);
  let text = "";
  let right = -Infinity;
  let pendingSpace = false;
  for (const item of items) {
    const part = normalizeText(item.text);
    if (!part) {
      if (/\s/.test(item.text)) pendingSpace = true;
      right = Math.max(right, item.x + item.width);
      continue;
    }
    const gap = item.x - right;
    if (text && (pendingSpace || gap > Math.max(1.5, item.height * 0.17)) && !text.endsWith(" ")) text += " ";
    text += part;
    pendingSpace = false;
    right = Math.max(right, item.x + item.width);
  }
  return {
    text: normalizeText(text), x: Math.min(...items.map(item => item.x)),
    right: Math.max(...items.map(item => item.x + item.width)),
    y: items.reduce((sum, item) => sum + item.y, 0) / items.length,
    height: Math.max(...items.map(item => item.height)),
    fontName: [...items].sort((a, b) => normalizeText(b.text).length - normalizeText(a.text).length)[0]?.fontName || ""
  };
}

function groupLines(items) {
  const rows = [];
  for (const item of [...items].sort((a, b) => b.y - a.y || a.x - b.x)) {
    let row = rows.find(candidate => Math.abs(candidate.y - item.y) < Math.max(2, item.height * 0.3));
    if (!row) {
      row = { y: item.y, items: [] };
      rows.push(row);
    }
    row.items.push(item);
  }
  return rows.sort((a, b) => b.y - a.y).map(row => makeLine(row.items)).filter(line => line.text);
}

function hasColumnLayout(items, width, count) {
  const boundaries = Array.from({ length: count - 1 }, (_, i) => width * (i + 1) / count);
  if (Array.from({ length: count }, (_, i) => items.filter(item => item.x >= width * i / count && item.x < width * (i + 1) / count).length).some(total => total < 18)) return false;
  const rows = groupLines(items);
  const divided = rows.filter(line => {
    const rowItems = items.filter(item => Math.abs(item.y - line.y) < 2);
    return boundaries.every(boundary => {
      const left = rowItems.filter(item => item.x + item.width < boundary - 3 && item.x > boundary - width / count);
      const right = rowItems.filter(item => item.x > boundary + 3 && item.x < boundary + width / count);
      if (!left.length || !right.length) return false;
      return Math.min(...right.map(item => item.x)) - Math.max(...left.map(item => item.x + item.width)) > 7;
    });
  }).length;
  return divided >= Math.max(5, Math.ceil(rows.length * 0.08));
}

function isTwoColumn(items, width) { return hasColumnLayout(items, width, 2); }
function detectColumnCount(items, width) {
  // Tres columnas reales son excepcionales; fragmentos de palabras en una
  // doble columna producen falsos positivos. Se ofrecen por selección manual.
  return isTwoColumn(items, width) ? 2 : 1;
}

function classify(text) {
  if (article.test(text)) return "article";
  if (/^(?:T[ÍI]TULO PRELIMINAR|LIBRO\s+|T[ÍI]TULO\s+|CAP[ÍI]TULO\s+|SUBCAP[ÍI]TULO\s+|SECCI[ÓO]N\s+|SUBSECCI[ÓO]N\s+|DISPOSICIONES?\s+|ANEXO\s+)/i.test(text)) return "heading";
  if (/^C[ÓO]DIGO\s+[A-ZÁÉÍÓÚÑ ]{4,}$/.test(text)) return "title";
  if (text.length <= 105 && /[A-ZÁÉÍÓÚÑ]{3}/.test(text) && text === text.toLocaleUpperCase("es") && !/[.;:]$/.test(text)) return "heading";
  if (list.test(text)) return "list";
  return "paragraph";
}

function joinText(a, b) {
  if (/\p{L}-$/u.test(a) && /^\p{Ll}/u.test(b)) return a.slice(0, -1) + b;
  return `${a} ${b}`;
}

function linesToBlocks(pages) {
  const blocks = [];
  let previousLine = null;
  for (const page of pages) {
    for (const line of page.lines) {
      const type = classify(line.text);
      const prior = blocks[blocks.length - 1];
      const gap = previousLine && previousLine.page === page.number && previousLine.column === line.column
        ? previousLine.y - line.y : Infinity;
      const continuous = prior && (prior.type === "paragraph" || prior.type === "list") && type === "paragraph" &&
        ((gap < Math.max(14, line.height * 1.65) && gap > -1) ||
          (gap === Infinity && !/[.!?:;”"]$/.test(prior.text) && /^[\p{Ll}(]/u.test(line.text)));
      const articleTitleContinuation = prior && prior.type === "article" && type === "paragraph" &&
        gap > -1 && gap < Math.max(14, line.height * 1.65) && /^\p{Ll}/u.test(line.text);
      const headingContinuation = prior && prior.type === "heading" && type === "heading" &&
        gap > -1 && gap < Math.max(27, line.height * 2.2) &&
        !/^T[ÍI]TULO PRELIMINAR$/i.test(prior.text) &&
        !/^(?:LIBRO|T[ÍI]TULO|CAP[ÍI]TULO|SUBCAP[ÍI]TULO|SECCI[ÓO]N|SUBSECCI[ÓO]N|DISPOSICIONES?|ANEXO)\b/i.test(line.text);
      if (continuous || articleTitleContinuation || headingContinuation) prior.text = joinText(prior.text, line.text);
      else blocks.push({ type, text: line.text, page: page.number, column: line.column, isBodyFont: !!line.isBodyFont });
      previousLine = { ...line, page: page.number };
    }
  }
  return blocks;
}

function findStart(blocks) {
  // El índice suele mencionar el título, pero no contiene artículos completos inmediatamente después.
  for (const candidate of [/^T[ÍI]TULO PRELIMINAR$/i, /^Art[íi]culo\s+(?:I|1)[.°º-]/i]) {
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];
      if (!candidate.test(block.text)) continue;
      const nearby = blocks.slice(index + 1, index + 14);
      const articleIndex = block.type === "article" ? 1 : nearby.findIndex(next => next.type === "article") + 1;
      if (!articleIndex) continue;
      if (nearby.slice(0, articleIndex - 1).some(next => next.type === "title" || /^\(art[íi]culos?\s+\d/i.test(next.text))) continue;
      if (!nearby.slice(articleIndex - 1).some(next => ["paragraph", "list"].includes(next.type) && next.text.length > 55)) continue;
      const previous = blocks[index - 1];
      return previous && previous.type === "title" ? index - 1 : index;
    }
  }
  return blocks.findIndex(block => block.type === "article");
}

async function preparePdf(buffer, options = {}) {
  const parser = new PDFParse({ data: buffer });
  try {
    const document = await parser.load();
    const pages = [];
    const ocrPages = [];
    const ocrWarnings = [];
    let ocrUnavailableNoted = false;
    for (let number = 1; number <= document.numPages; number++) {
      const page = await document.getPage(number);
      const content = await page.getTextContent();
      const width = page.view[2] - page.view[0];
      const height = page.view[3] - page.view[1];
      const items = content.items.filter(item => typeof item.str === "string" && item.str.length).map(item => ({
        text: item.str, x: item.transform[4], y: item.transform[5],
        width: Math.abs(item.width || 0), height: Math.abs(item.height || item.transform[0] || 10), fontName: item.fontName || ""
      }));
      const body = items;
      const forcedColumns = Number(options.columns);
      const columns = [1, 2, 3].includes(forcedColumns) ? forcedColumns : detectColumnCount(body, width);
      let lines;
      lines = Array.from({ length: columns }, (_, column) => groupLines(body.filter(item => item.x >= width * column / columns && (column === columns - 1 || item.x < width * (column + 1) / columns))).map(line => ({ ...line, column }))).flat();
      const fontCounts = new Map();
      for (const item of body) fontCounts.set(item.fontName, (fontCounts.get(item.fontName) || 0) + normalizeText(item.text).length);
      const bodyFont = [...fontCounts].sort((a, b) => b[1] - a[1])[0]?.[0] || "";
      const articleFontContrast = lines.some(line => article.test(line.text) && line.fontName && line.fontName !== bodyFont);
      lines = lines.map(line => ({ ...line, isBodyFont: articleFontContrast && line.fontName === bodyFont }));
      if (lines.map(line => line.text).join("").length < 20 && (number > 1 || document.numPages === 1)) {
        try {
          const ocr = await ocrPdfPage(parser, number);
          if (ocr.text.trim()) {
            lines = ocr.text.split(/\r?\n/).map((text, index) => ({ text: normalizeText(text), x: 0, right: width, y: height - 80 - index * 12, height: 10, column: 0 })).filter(line => line.text);
            ocrPages.push(number);
          } else if (!ocr.available && !ocrUnavailableNoted) {
            ocrWarnings.push("OCR opcional no disponible (Tesseract no está instalado).");
            ocrUnavailableNoted = true;
          }
        } catch (error) { ocrWarnings.push(`Página ${number}: no se pudo completar OCR (${error.message}).`); }
      }
      pages.push({ number, height, columns, lines });
      page.cleanup();
    }
    // Elimina solo encabezados/pies verdaderamente repetidos. Un corte fijo por margen
    // podría borrar texto legal que comience muy arriba en otra fuente de PDF.
    const repetitions = new Map();
    const marginKey = line => normalizeText(line.text).toLocaleLowerCase("es").replace(/\b\d+\b/g, "#");
    for (const page of pages) {
      for (const line of page.lines) {
        if (line.y < 25 || line.y > page.height - 70) {
          const key = marginKey(line);
          if (!repetitions.has(key)) repetitions.set(key, new Set());
          repetitions.get(key).add(page.number);
        }
      }
    }
    for (const page of pages) {
      page.lines = page.lines.filter(line => {
        const inMargin = line.y < 25 || line.y > page.height - 70;
        return !inMargin || (repetitions.get(marginKey(line))?.size || 0) < 3;
      });
    }
    const blocks = linesToBlocks(pages);
    let start = findStart(blocks);
    const warnings = [];
    warnings.push(...ocrWarnings);
    if (ocrPages.length) warnings.push(`OCR aplicado en páginas ${ocrPages.join(", ")}; verifica su lectura y el orden de columnas.`);
    const imagePages = pages.filter(page => page.lines.length < 3).map(page => page.number);
    if (imagePages.length) warnings.push(`Páginas sin texto suficiente (posible imagen): ${imagePages.join(", ")}. Revísalas en el PDF original; no se hizo OCR.`);
    if (start < 0) {
      const firstBodyPage = pages.find(page => page.lines.length >= 15);
      if (firstBodyPage) start = blocks.findIndex(block => block.page === firstBodyPage.number);
      warnings.push("No se identificó un inicio jurídico con seguridad. Confirma o cambia manualmente el primer bloque; el contenido previo sigue recuperable.");
    }
    return {
      pages: document.numPages,
      columnsDetected: pages.filter(page => page.columns === 2).length,
      threeColumnPages: pages.filter(page => page.columns === 3).map(page => page.number),
      ocrPages,
      blocks,
      startIndex: Math.max(0, start),
      warnings
    };
  } finally {
    await parser.destroy();
  }
}

module.exports = { preparePdf, findStart, linesToBlocks, groupLines, isTwoColumn, detectColumnCount };
