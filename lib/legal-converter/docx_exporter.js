function xmlEscape(value) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function parseAttributes(source) {
  const attrs = {};
  String(source || "").replace(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, (_, key, a, b) => {
    attrs[key.toLowerCase()] = a ?? b ?? "";
    return "";
  });
  return attrs;
}

function parseHtmlFragment(html) {
  const root = { tag: "root", attrs: {}, children: [] };
  const stack = [root];
  const tokens = String(html || "").match(/<[^>]+>|[^<]+/g) || [];
  const voidTags = new Set(["br", "hr", "img", "meta", "link"]);

  for (const token of tokens) {
    if (!token.startsWith("<")) {
      stack[stack.length - 1].children.push({ tag: "#text", text: decodeEntities(token) });
      continue;
    }
    if (/^<\//.test(token)) {
      if (stack.length > 1) stack.pop();
      continue;
    }
    if (/^<!/.test(token)) continue;
    const match = token.match(/^<\s*([\w-]+)([^>]*)>/);
    if (!match) continue;
    const tag = match[1].toLowerCase();
    const node = { tag, attrs: parseAttributes(match[2]), children: [] };
    stack[stack.length - 1].children.push(node);
    if (!voidTags.has(tag) && !/\/>$/.test(token)) stack.push(node);
  }
  return root;
}

function nodeText(node) {
  if (!node) return "";
  if (node.tag === "#text") return node.text || "";
  if (node.tag === "br") return "\n";
  const separator = node.tag === "td" || node.tag === "th" ? "\t" : "";
  return node.children.map(nodeText).join("") + separator;
}

function nodeRuns(node, inherited = {}) {
  if (!node) return [];
  if (node.tag === "#text") return node.text ? [{ text: node.text, ...inherited }] : [];
  if (node.tag === "br") return [{ text: "\n", ...inherited }];

  const style = String(node.attrs?.style || "");
  const isDerogation = String(node.attrs?.["data-lne-format"] || "").toLowerCase() === "derogacion";
  const colorMatch = style.match(/color\s*:\s*#([0-9a-f]{3,6})/i);
  let color = isDerogation ? "777777" : inherited.color;
  if (colorMatch) color = colorMatch[1].length === 3
    ? colorMatch[1].split("").map(char => char + char).join("").toUpperCase()
    : colorMatch[1].toUpperCase();
  const formatting = {
    ...inherited,
    bold: inherited.bold || node.tag === "strong" || node.tag === "b" || /font-weight\s*:\s*(?:bold|[6-9]00)/i.test(style),
    italic: inherited.italic || isDerogation || node.tag === "em" || node.tag === "i" || /font-style\s*:\s*italic/i.test(style),
    underline: inherited.underline || node.tag === "u" || /text-decoration\s*:\s*[^;]*underline/i.test(style),
    color
  };
  return (node.children || []).flatMap(child => nodeRuns(child, formatting));
}

function compactRuns(runs) {
  const compact = [];
  for (const run of runs || []) {
    if (!run.text) continue;
    const previous = compact[compact.length - 1];
    if (previous && !!previous.bold === !!run.bold && !!previous.italic === !!run.italic && !!previous.underline === !!run.underline && (previous.color || "") === (run.color || "")) {
      previous.text += run.text;
    } else {
      compact.push({ ...run });
    }
  }
  return compact;
}

function marginLeftFromStyle(style) {
  const match = String(style || "").match(/margin-left\s*:\s*([\d.]+)px/i);
  return match ? Math.max(0, Math.min(240, Number(match[1]))) : 0;
}

function htmlToParagraphs(html) {
  const root = parseHtmlFragment(html);
  const paragraphs = [];
  const top = root.children.filter(node => node.tag !== "#text" || node.text.trim());

  for (const node of top) {
    if (node.tag === "#text") {
      const text = node.text.trim();
      if (text) paragraphs.push({ text, indentPx: 0, runs: [{ text }] });
      continue;
    }
    if (node.tag === "table") {
      const rows = [];
      const visit = current => {
        if (current.tag === "tr") {
          const cells = current.children.filter(child => child.tag === "td" || child.tag === "th").map(child => nodeText(child).trim().replace(/\t+$/, ""));
          if (cells.length) rows.push(cells.join("\t"));
        }
        current.children?.forEach(visit);
      };
      visit(node);
      rows.forEach(text => paragraphs.push({ text, indentPx: 0 }));
      continue;
    }

    const style = node.attrs?.style || "";
    const isFlex = /display\s*:\s*flex/i.test(style);
    let text = nodeText(node).replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n").trim();
    if (!text) continue;

    if (isFlex) {
      const markerNode = node.children.find(child => child.tag === "span");
      const contentNode = node.children.find(child => child.tag === "div");
      const marker = nodeText(markerNode).trim();
      const content = nodeText(contentNode).trim();
      text = `${marker}\t${content}`.trim();
      const runs = compactRuns([
        ...nodeRuns(markerNode),
        { text: "\t" },
        ...nodeRuns(contentNode)
      ]);
      paragraphs.push({ text, runs, indentPx: marginLeftFromStyle(style), hanging: true });
      continue;
    }
    const runs = compactRuns(nodeRuns(node));
    text.split(/\n+/).map(part => part.trim()).filter(Boolean).forEach(part => {
      paragraphs.push({ text: part, runs: text.includes("\n") ? undefined : runs, indentPx: marginLeftFromStyle(style), hanging: false });
    });
  }
  return paragraphs;
}

function htmlToHeadingLines(value) {
  const root = parseHtmlFragment(value);
  const lines = [];
  const visit = node => {
    if (node.tag === "div" && node.children.every(child => child.tag === "#text")) {
      const text = nodeText(node).trim();
      if (text) lines.push(text);
      return;
    }
    node.children?.forEach(visit);
  };
  visit(root);
  if (!lines.length) {
    const plain = nodeText(root).replace(/\s+/g, " ").trim();
    if (plain) lines.push(plain);
  }
  return [...new Set(lines)];
}

function runXml(text, formatting = {}) {
  const chunks = String(text || "").split("\t");
  const properties = [
    formatting.bold ? "<w:b/>" : "",
    formatting.italic ? "<w:i/>" : "",
    formatting.underline ? '<w:u w:val="single"/>' : "",
    formatting.color ? `<w:color w:val="${xmlEscape(formatting.color)}"/>` : ""
  ].join("");
  const rPr = properties ? `<w:rPr>${properties}</w:rPr>` : "";
  return chunks.map((chunk, index) => `${index ? "<w:r><w:tab/></w:r>" : ""}<w:r>${rPr}<w:t xml:space="preserve">${xmlEscape(chunk)}</w:t></w:r>`).join("");
}

function paragraphXml(text, style, options = {}) {
  const pPr = [`<w:pStyle w:val="${style}"/>`];
  if (options.pageBreakBefore) pPr.push("<w:pageBreakBefore/>");
  if (options.indentPx) {
    const left = Math.round(options.indentPx * 15);
    pPr.push(`<w:ind w:left="${left}"${options.hanging ? ' w:hanging="360"' : ""}/>`);
  }
  const runs = Array.isArray(options.runs) && options.runs.length
    ? options.runs.map(run => runXml(run.text, run)).join("")
    : runXml(text, { bold: options.bold, italic: options.italic, color: options.color });
  return `<w:p><w:pPr>${pPr.join("")}</w:pPr>${runs}</w:p>`;
}

function entryPrefix(entry) {
  const tipo = entry.tipo || "Artículo";
  const numero = entry.numero || "";
  if (tipo === "Norma") return `NORMA ${numero}${entry.titulo ? ":" : ""}`;
  if (tipo === "Disposición") return numero;
  return `Artículo ${numero}${entry.titulo ? ".-" : "."}`;
}

function buildDocumentXml(title, preview) {
  const body = [paragraphXml(title || "NORMA LEGAL", "LegalTitle")];
  let firstGroup = true;

  for (const group of preview || []) {
    let pageBreakPending = !firstGroup && !!group.nuevaHoja;
    const addParagraph = (text, style, options = {}) => {
      body.push(paragraphXml(text, style, { ...options, pageBreakBefore: pageBreakPending }));
      pageBreakPending = false;
    };
    const majorLines = String(group.titulo || "").includes("<") ? htmlToHeadingLines(group.titulo) : [String(group.titulo || "").trim()].filter(Boolean);
    majorLines.forEach(line => addParagraph(line, "LegalHeading1"));
    const subLines = String(group.capitulo || "").includes("<") ? htmlToHeadingLines(group.capitulo) : [String(group.capitulo || "").trim()].filter(Boolean);
    subLines.forEach(line => addParagraph(line, "LegalHeading2"));

    for (const entry of group.articulos || []) {
      const heading = `${entryPrefix(entry)}${entry.titulo ? ` ${entry.titulo}` : ""}`.trim();
      addParagraph(heading, "LegalArticle", { bold: true });
      htmlToParagraphs(entry.textoHtml ?? entry.texto ?? "").forEach(paragraph => {
        body.push(paragraphXml(paragraph.text, "LegalBody", paragraph));
      });
    }
    firstGroup = false;
  }

  body.push('<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body.join("")}</w:body></w:document>`;
}

function buildStylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:color w:val="2C3E50"/></w:rPr></w:rPrDefault></w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
  <w:style w:type="paragraph" w:styleId="LegalTitle"><w:name w:val="Título legal"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:jc w:val="center"/><w:spacing w:after="750"/><w:keepNext/></w:pPr><w:rPr><w:rFonts w:ascii="Playfair Display" w:hAnsi="Playfair Display"/><w:b/><w:sz w:val="72"/><w:szCs w:val="72"/><w:color w:val="1B263B"/><w:caps/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="LegalHeading1"><w:name w:val="Encabezado legal 1"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:jc w:val="center"/><w:spacing w:before="600" w:after="225"/><w:keepNext/></w:pPr><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:b/><w:sz w:val="36"/><w:szCs w:val="36"/><w:color w:val="1B263B"/><w:caps/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="LegalHeading2"><w:name w:val="Encabezado legal 2"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:jc w:val="center"/><w:spacing w:after="600"/><w:keepNext/></w:pPr><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:b/><w:sz w:val="28"/><w:szCs w:val="28"/><w:color w:val="1B263B"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="LegalArticle"><w:name w:val="Artículo legal"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="180" w:after="120"/><w:keepNext/></w:pPr><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/><w:color w:val="1B263B"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="LegalBody"><w:name w:val="Texto legal"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:jc w:val="both"/><w:spacing w:after="150" w:line="384" w:lineRule="auto"/></w:pPr><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:color w:val="2C3E50"/></w:rPr></w:style>
</w:styles>`;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}

function zipStore(files) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  const stamp = dosDateTime();

  for (const [name, content] of Object.entries(files)) {
    const nameBuffer = Buffer.from(name, "utf8");
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(stamp.time, 10);
    local.writeUInt16LE(stamp.date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuffer.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuffer, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(stamp.time, 12);
    central.writeUInt16LE(stamp.date, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuffer.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuffer);
    offset += local.length + nameBuffer.length + data.length;
  }

  const centralBuffer = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(Object.keys(files).length, 8);
  end.writeUInt16LE(Object.keys(files).length, 10);
  end.writeUInt32LE(centralBuffer.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, centralBuffer, end]);
}

function buildDocx(title, preview) {
  const files = {
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
    "word/_rels/document.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    "word/document.xml": buildDocumentXml(title, preview),
    "word/styles.xml": buildStylesXml()
  };
  return zipStore(files);
}

function buildEditableDocx(blocks) {
  const body = [];
  const allowed = new Set(["title", "heading", "article", "list", "paragraph", "table"]);
  for (const block of blocks || []) {
    if (!allowed.has(block.type)) continue;
    if (block.type === "table" && Array.isArray(block.rows)) {
      const rows = block.rows.map(row => `<w:tr>${row.map(cell => `<w:tc><w:p>${runXml(cell)}</w:p></w:tc>`).join("")}</w:tr>`).join("");
      body.push(`<w:tbl><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4"/><w:bottom w:val="single" w:sz="4"/><w:left w:val="single" w:sz="4"/><w:right w:val="single" w:sz="4"/><w:insideH w:val="single" w:sz="4"/><w:insideV w:val="single" w:sz="4"/></w:tblBorders></w:tblPr><w:tblGrid/>${rows}</w:tbl>`);
      continue;
    }
    const style = { title: "LegalTitle", heading: "LegalHeading1", article: "LegalArticle", list: "LegalBody", paragraph: "LegalBody" }[block.type];
    String(block.text || "").split(/\r?\n/).forEach(line => {
      body.push(paragraphXml(line, style, { bold: block.type === "article" }));
    });
  }
  body.push('<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080"/></w:sectPr>');
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body.join("")}</w:body></w:document>`;
  return zipStore({
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
    "word/_rels/document.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    "word/document.xml": documentXml,
    "word/styles.xml": buildStylesXml()
  });
}

module.exports = { buildDocx, buildEditableDocx, htmlToParagraphs, htmlToHeadingLines };
