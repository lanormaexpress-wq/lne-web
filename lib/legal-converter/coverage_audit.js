function plain(value) {
  return String(value || "")
    .replace(/\[\[LNE_[A-Z_]+\]\]/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
    .replace(/&#(?:x[0-9a-f]+|\d+);/gi, " ");
}

function words(value) {
  return plain(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es").match(/[a-z0-9ñ]+/g) || [];
}

function previewText(preview) {
  const parts = [];
  for (const group of preview || []) {
    parts.push(group.titulo || "", group.capitulo || "");
    for (const entry of group.articulos || []) {
      parts.push(`${entry.tipo || "Artículo"} ${entry.numero || ""} ${entry.titulo || ""}`);
      parts.push(entry.textoHtml || entry.texto || "");
    }
  }
  return parts.join(" ");
}

function auditTextCoverage(source, preview, maxExamples = 16) {
  const target = words(previewText(preview));
  const width = 7;
  const targetWindows = new Set();
  for (let i = 0; i + width <= target.length; i++) targetWindows.add(target.slice(i, i + width).join(" "));
  let checked = 0;
  let missing = 0;
  const examples = [];
  for (const [blockIndex, block] of String(source || "").split(/\n\s*\n/).entries()) {
    const tokens = words(block);
    if (tokens.length < width) continue;
    for (let i = 0; i + width <= tokens.length; i += width) {
      checked++;
      const excerpt = tokens.slice(i, i + width).join(" ");
      if (targetWindows.has(excerpt)) continue;
      missing++;
      if (examples.length < maxExamples) examples.push({ block: blockIndex + 1, excerpt });
    }
  }
  return { checked, missing, examples, coveragePercent: checked ? Math.round(1000 * (checked - missing) / checked) / 10 : 100 };
}

module.exports = { auditTextCoverage };
