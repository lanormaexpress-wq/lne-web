const zlib = require('zlib');

function unzipEntry(buffer, wantedName) {
  const EOCD = 0x06054b50;
  let eocd = -1;
  const min = Math.max(0, buffer.length - 0x10000 - 22);
  for (let i = buffer.length - 22; i >= min; i--) {
    if (buffer.readUInt32LE(i) === EOCD) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('DOCX inválido: no se encontró el directorio ZIP.');
  const totalEntries = buffer.readUInt16LE(eocd + 10);
  let pos = buffer.readUInt32LE(eocd + 16);
  for (let i = 0; i < totalEntries; i++) {
    if (buffer.readUInt32LE(pos) !== 0x02014b50) throw new Error('DOCX inválido: directorio ZIP dañado.');
    const method = buffer.readUInt16LE(pos + 10);
    const compressedSize = buffer.readUInt32LE(pos + 20);
    const fileNameLength = buffer.readUInt16LE(pos + 28);
    const extraLength = buffer.readUInt16LE(pos + 30);
    const commentLength = buffer.readUInt16LE(pos + 32);
    const localOffset = buffer.readUInt32LE(pos + 42);
    const name = buffer.slice(pos + 46, pos + 46 + fileNameLength).toString('utf8');
    if (name === wantedName) {
      if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error(`DOCX inválido: entrada ${wantedName} dañada.`);
      const localNameLength = buffer.readUInt16LE(localOffset + 26);
      const localExtraLength = buffer.readUInt16LE(localOffset + 28);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const data = buffer.slice(dataStart, dataStart + compressedSize);
      if (method === 0) return data;
      if (method === 8) return zlib.inflateRawSync(data);
      throw new Error(`DOCX: método de compresión no soportado (${method}).`);
    }
    pos += 46 + fileNameLength + extraLength + commentLength;
  }
  return null;
}

function decodeXml(value) {
  return String(value || '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function attr(tag, name) {
  const m = String(tag || '').match(new RegExp(`\\b(?:w:)?${name}="([^"]*)"`, 'i'));
  return m ? decodeXml(m[1]) : null;
}

function childVal(xml, tagName) {
  const m = String(xml || '').match(new RegExp(`<w:${tagName}\\b[^>]*\\bw:val="([^"]*)"[^>]*/?>`, 'i'));
  return m ? decodeXml(m[1]) : null;
}

function intToRoman(number) {
  let n = Number(number);
  if (!Number.isInteger(n) || n <= 0) return String(number || '');
  const table = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let out = '';
  for (const [v, s] of table) while (n >= v) { out += s; n -= v; }
  return out;
}

function intToLetters(number, upper = false) {
  let n = Number(number);
  if (!Number.isInteger(n) || n <= 0) return String(number || '');
  let out = '';
  while (n > 0) {
    n -= 1;
    out = String.fromCharCode(97 + (n % 26)) + out;
    n = Math.floor(n / 26);
  }
  return upper ? out.toUpperCase() : out;
}

function formatNumber(number, fmt) {
  switch (fmt) {
    case 'lowerLetter': return intToLetters(number, false);
    case 'upperLetter': return intToLetters(number, true);
    case 'lowerRoman': return intToRoman(number).toLowerCase();
    case 'upperRoman': return intToRoman(number);
    case 'decimalZero': return String(number).padStart(2, '0');
    case 'decimal':
    default: return String(number);
  }
}

function parseLevel(xml, ilvlFallback = 0) {
  const open = String(xml || '').match(/<w:lvl\b[^>]*>/i)?.[0] || '';
  const ilvl = Number(attr(open, 'ilvl') ?? ilvlFallback);
  const numFmt = childVal(xml, 'numFmt') || 'decimal';
  const lvlText = childVal(xml, 'lvlText') || `%${ilvl + 1}.`;
  const start = Number(childVal(xml, 'start') || 1);
  return { ilvl, numFmt, lvlText, start };
}

function parseNumberingXml(xml) {
  const abstract = new Map();
  const nums = new Map();
  if (!xml) return { abstract, nums };

  const absRe = /<w:abstractNum\b[^>]*w:abstractNumId="([^"]+)"[^>]*>([\s\S]*?)<\/w:abstractNum>/gi;
  let m;
  while ((m = absRe.exec(xml))) {
    const levels = new Map();
    const lvlRe = /<w:lvl\b[^>]*w:ilvl="([^"]+)"[^>]*>[\s\S]*?<\/w:lvl>/gi;
    let lm;
    while ((lm = lvlRe.exec(m[2]))) levels.set(Number(lm[1]), parseLevel(lm[0], Number(lm[1])));
    abstract.set(String(m[1]), levels);
  }

  const numRe = /<w:num\b[^>]*w:numId="([^"]+)"[^>]*>([\s\S]*?)<\/w:num>/gi;
  while ((m = numRe.exec(xml))) {
    const body = m[2];
    const abstractId = childVal(body, 'abstractNumId');
    const overrides = new Map();
    const ovRe = /<w:lvlOverride\b[^>]*w:ilvl="([^"]+)"[^>]*>([\s\S]*?)<\/w:lvlOverride>/gi;
    let om;
    while ((om = ovRe.exec(body))) {
      const ilvl = Number(om[1]);
      const startOverride = Number(childVal(om[2], 'startOverride') || 0) || null;
      const levelXml = om[2].match(/<w:lvl\b[\s\S]*?<\/w:lvl>/i)?.[0] || null;
      overrides.set(ilvl, { startOverride, level: levelXml ? parseLevel(levelXml, ilvl) : null });
    }
    nums.set(String(m[1]), { abstractId: String(abstractId || ''), overrides });
  }
  return { abstract, nums };
}

class NumberingResolver {
  constructor(defs) {
    this.defs = defs;
    this.states = new Map();
  }

  levelFor(numId, ilvl) {
    const num = this.defs.nums.get(String(numId));
    if (!num) return { ilvl, numFmt: 'decimal', lvlText: `%${ilvl + 1}.`, start: 1 };
    const ov = num.overrides.get(ilvl);
    const base = ov?.level || this.defs.abstract.get(num.abstractId)?.get(ilvl) || { ilvl, numFmt: 'decimal', lvlText: `%${ilvl + 1}.`, start: 1 };
    return { ...base, start: ov?.startOverride || base.start || 1 };
  }

  marker(numId, ilvl) {
    numId = String(numId);
    ilvl = Number(ilvl || 0);
    if (!this.states.has(numId)) this.states.set(numId, []);
    const counters = this.states.get(numId);
    const def = this.levelFor(numId, ilvl);
    if (counters[ilvl] == null) counters[ilvl] = def.start || 1;
    else counters[ilvl] += 1;
    for (let i = ilvl + 1; i < counters.length; i++) counters[i] = null;

    let text = def.lvlText || `%${ilvl + 1}.`;
    text = text.replace(/%(\d+)/g, (_, rawLevel) => {
      const level = Number(rawLevel) - 1;
      if (counters[level] == null) {
        const levelDef = this.levelFor(numId, level);
        counters[level] = levelDef.start || 1;
      }
      const levelDef = this.levelFor(numId, level);
      return formatNumber(counters[level], levelDef.numFmt);
    });
    if (def.numFmt === 'bullet') return text && !/%\d/.test(text) ? text : '–';
    return text;
  }
}

function removeDeletedXml(xml) {
  return String(xml || '').replace(/<w:del\b[\s\S]*?<\/w:del>/gi, '');
}

function paragraphPlainText(pXml) {
  let xml = removeDeletedXml(pXml);
  xml = xml
    .replace(/<w:br\b[^>]*w:type="page"[^>]*\/>/gi, '\n[[LNE_PAGE_BREAK]]\n')
    .replace(/<w:lastRenderedPageBreak\s*\/>/gi, '')
    // Un salto manual dentro del MISMO párrafo de Word es formato visual, no un
    // párrafo jurídico nuevo. Convertirlo en espacio evita partir oraciones y,
    // sobre todo, evita confundir el primer fragmento del cuerpo con la sumilla
    // de un artículo (caso real: Ley 728, arts. 38, 49 y 111).
    .replace(/<w:br\b[^>]*\/>/gi, '[[LNE_SOFT_SPACE]]')
    .replace(/<w:cr\s*\/>/gi, '[[LNE_SOFT_SPACE]]')
    .replace(/<w:tab\s*\/>/gi, '\t')
    .replace(/<w:noBreakHyphen\s*\/>/gi, '‑')
    .replace(/<w:softHyphen\s*\/>/gi, '\u00ad');
  const chunks = [];
  const re = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>|\[\[LNE_SOFT_SPACE\]\]|\n\[\[LNE_PAGE_BREAK\]\]\n|\n|\t|‑|\u00ad/g;
  let m;
  while ((m = re.exec(xml))) {
    if (m[1] != null) chunks.push(decodeXml(m[1]));
    else if (m[0] === '[[LNE_SOFT_SPACE]]') chunks.push(' ');
    else chunks.push(m[0]);
  }
  return chunks.join('').replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').trim();
}

function paragraphIndent(pXml, ilvl = 0) {
  const pPr = pXml.match(/<w:pPr\b[\s\S]*?<\/w:pPr>/i)?.[0] || '';
  const indTag = pPr.match(/<w:ind\b[^>]*\/>/i)?.[0] || '';
  const left = Number(attr(indTag, 'left') || attr(indTag, 'start') || 0);
  const fromLeft = Math.max(0, Math.min(10, Math.round(left / 360)));
  return Math.max(Number(ilvl || 0), fromLeft);
}

function paragraphNumbering(pXml) {
  const numPr = pXml.match(/<w:numPr\b[\s\S]*?<\/w:numPr>/i)?.[0] || '';
  if (!numPr) return null;
  const numId = childVal(numPr, 'numId');
  if (numId == null || numId === '0') return null;
  const ilvl = Number(childVal(numPr, 'ilvl') || 0);
  return { numId, ilvl };
}

function paragraphEntirelyBold(pXml) {
  const visibleRuns = [];
  const runRe = /<w:r\b[\s\S]*?<\/w:r>/gi;
  let rm;
  while ((rm = runRe.exec(String(pXml || '')))) {
    const run = rm[0];
    const text = [...run.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/gi)]
      .map(m => decodeXml(m[1]))
      .join('')
      .trim();
    if (!text) continue;
    visibleRuns.push(/<w:b\b[^>]*\/?>(?:<\/w:b>)?|<w:bCs\b[^>]*\/?>(?:<\/w:bCs>)?/i.test(run));
  }
  return visibleRuns.length > 0 && visibleRuns.every(Boolean);
}

function extractParagraph(pXml, resolver) {
  let text = paragraphPlainText(pXml);
  const num = paragraphNumbering(pXml);
  const indentLevel = paragraphIndent(pXml, num?.ilvl || 0);
  if (num && text) {
    const marker = resolver.marker(num.numId, num.ilvl);
    if (marker && !text.startsWith(marker + ' ')) text = `${marker} ${text}`;
  }
  const indent = '    '.repeat(Math.min(indentLevel, 8));
  return text.split('\n').map((line, idx) => line === '[[LNE_PAGE_BREAK]]' ? line : `${idx === 0 ? indent : indent}${line}`).join('\n');
}

function extractTable(tblXml, resolver) {
  const rows = [];
  const trRe = /<w:tr\b[\s\S]*?<\/w:tr>/gi;
  let rm;
  while ((rm = trRe.exec(tblXml))) {
    const cells = [];
    const tcRe = /<w:tc\b[\s\S]*?<\/w:tc>/gi;
    let cm;
    while ((cm = tcRe.exec(rm[0]))) {
      const paras = [];
      const pRe = /<w:p\b[\s\S]*?<\/w:p>/gi;
      let pm;
      while ((pm = pRe.exec(cm[0]))) {
        const txt = extractParagraph(pm[0], resolver).trim();
        if (txt) paras.push(txt);
      }
      cells.push(paras.join(' '));
    }
    if (cells.length) rows.push(cells);
  }
  if (!rows.length) return '';
  return [
    '[[LNE_TABLE_START]]',
    ...rows.map(row => `[[LNE_TABLE_ROW]]${JSON.stringify(row)}`),
    '[[LNE_TABLE_END]]'
  ].join('\n');
}

function extractDocxStructuredTextDetailed(buffer) {
  const documentXmlBuf = unzipEntry(buffer, 'word/document.xml');
  if (!documentXmlBuf) throw new Error('DOCX inválido: no se encontró word/document.xml.');
  const numberingXmlBuf = unzipEntry(buffer, 'word/numbering.xml');
  const defs = parseNumberingXml(numberingXmlBuf ? numberingXmlBuf.toString('utf8') : '');
  const resolver = new NumberingResolver(defs);
  const xml = documentXmlBuf.toString('utf8');
  const body = xml.match(/<w:body\b[^>]*>([\s\S]*?)<\/w:body>/i)?.[1] || xml;
  const blocks = [];
  let numberedParagraphs = 0;
  let tables = 0;
  const boldStandaloneParagraphs = [];
  const blockRe = /<w:(p|tbl)\b[\s\S]*?<\/w:\1>/gi;
  let m;
  while ((m = blockRe.exec(body))) {
    if (m[1].toLowerCase() === 'p') {
      if (paragraphNumbering(m[0])) numberedParagraphs++;
      const text = extractParagraph(m[0], resolver);
      if (text) {
        blocks.push(text);
        const clean = text.replace(/^\s+/, '').trim();
        if (!paragraphNumbering(m[0]) && clean.length <= 180 && paragraphEntirelyBold(m[0])) {
          boldStandaloneParagraphs.push(clean);
        }
      }
    } else {
      const table = extractTable(m[0], resolver);
      if (table) { blocks.push(table); tables++; }
    }
  }
  return {
    text: blocks.join('\n\n').replace(/\n{3,}/g, '\n\n').trim(),
    diagnostics: { numberedParagraphs, tables, boldStandaloneParagraphs: boldStandaloneParagraphs.length },
    hints: { boldStandaloneParagraphs: [...new Set(boldStandaloneParagraphs)] }
  };
}

function extractDocxStructuredText(buffer) {
  return extractDocxStructuredTextDetailed(buffer).text;
}

module.exports = { extractDocxStructuredText, extractDocxStructuredTextDetailed, parseNumberingXml };
