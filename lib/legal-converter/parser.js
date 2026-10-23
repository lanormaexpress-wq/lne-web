const ROMAN_RE = "[IVXLCDM]+";
const ORDINAL_UNIT_RE = "(?:PRIMERO|PRIMERA|SEGUNDO|SEGUNDA|TERCERO|TERCERA|CUARTO|CUARTA|QUINTO|QUINTA|SEXTO|SEXTA|S[ÉE]PTIMO|S[ÉE]PTIMA|OCTAVO|OCTAVA|NOVENO|NOVENA)";
const ORDINAL_TEN_RE = "(?:D[ÉE]CIMO|D[ÉE]CIMA|VIG[ÉE]SIMO|VIG[ÉE]SIMA|TRIG[ÉE]SIMO|TRIG[ÉE]SIMA|CUADRAG[ÉE]SIMO|CUADRAG[ÉE]SIMA|QUINCUAG[ÉE]SIMO|QUINCUAG[ÉE]SIMA|SEXAG[ÉE]SIMO|SEXAG[ÉE]SIMA|SEPTUAG[ÉE]SIMO|SEPTUAG[ÉE]SIMA|OCTOG[ÉE]SIMO|OCTOG[ÉE]SIMA|NONAG[ÉE]SIMO|NONAG[ÉE]SIMA)";
const ORDINAL_WORDS_RE = `(?:${ORDINAL_TEN_RE}\\s+${ORDINAL_UNIT_RE}|${ORDINAL_UNIT_RE}|UND[ÉE]CIMO|UND[ÉE]CIMA|DUOD[ÉE]CIMO|DUOD[ÉE]CIMA|${ORDINAL_TEN_RE})`;


// Restauración conservadora de tildes SOLO para encabezados.
// No cambia mayúsculas/minúsculas, no corrige palabras y no toca los párrafos legales.
const HEADING_ACCENT_MAP = new Map(Object.entries({
  "ACCION": "ACCIÓN",
  "ADQUISICION": "ADQUISICIÓN",
  "ADMINISTRACION": "ADMINISTRACIÓN",
  "AMBITO": "ÁMBITO",
  "ACUMULACION": "ACUMULACIÓN",
  "APELACION": "APELACIÓN",
  "AUTORIZACION": "AUTORIZACIÓN",
  "COMPENSACION": "COMPENSACIÓN",
  "COMPUTACION": "COMPUTACIÓN",
  "CONCLUSION": "CONCLUSIÓN",
  "DECLARACION": "DECLARACIÓN",
  "DEMAS": "DEMÁS",
  "DETERMINACION": "DETERMINACIÓN",
  "DEVOLUCION": "DEVOLUCIÓN",
  "ELECTRONICA": "ELECTRÓNICA",
  "ELECTRONICAS": "ELECTRÓNICAS",
  "ELECTRONICO": "ELECTRÓNICO",
  "ELECTRONICOS": "ELECTRÓNICOS",
  "EMISION": "EMISIÓN",
  "INSCRIPCION": "INSCRIPCIÓN",
  "MECANICA": "MECÁNICA",
  "MECANICAS": "MECÁNICAS",
  "MECANICO": "MECÁNICO",
  "MECANICOS": "MECÁNICOS",
  "OMISION": "OMISIÓN",
  "ORGANOS": "ÓRGANOS",
  "RECAUDACION": "RECAUDACIÓN",
  "SUSPENSION": "SUSPENSIÓN",
  "TELEMATICA": "TELEMÁTICA",
  "TELEMATICAS": "TELEMÁTICAS",
  "TELEMATICO": "TELEMÁTICO",
  "TELEMATICOS": "TELEMÁTICOS",
  "INFORMATICA": "INFORMÁTICA",
  "INFORMATICAS": "INFORMÁTICAS",
  "INFORMATICO": "INFORMÁTICO",
  "INFORMATICOS": "INFORMÁTICOS",
  "ACTUALIZACION": "ACTUALIZACIÓN",
  "APLICACION": "APLICACIÓN",
  "AUTONOMIA": "AUTONOMÍA",
  "ARTICULO": "ARTÍCULO",
  "ARTICULOS": "ARTÍCULOS",
  "CALIFICACION": "CALIFICACIÓN",
  "CAMARA": "CÁMARA",
  "CAPITULO": "CAPÍTULO",
  "CAPITULOS": "CAPÍTULOS",
  "CODIGO": "CÓDIGO",
  "CODIGOS": "CÓDIGOS",
  "COMPUTO": "CÓMPUTO",
  "CONSTITUCION": "CONSTITUCIÓN",
  "CONTRIBUCION": "CONTRIBUCIÓN",
  "CREDITO": "CRÉDITO",
  "CREDITOS": "CRÉDITOS",
  "DACION": "DACIÓN",
  "DECIMA": "DÉCIMA",
  "DECIMO": "DÉCIMO",
  "DEFENSORIA": "DEFENSORÍA",
  "DEROGACION": "DEROGACIÓN",
  "DIPLOMATICO": "DIPLOMÁTICO",
  "DIPLOMATICOS": "DIPLOMÁTICOS",
  "DIRECCION": "DIRECCIÓN",
  "ECONOMIA": "ECONOMÍA",
  "ECONOMICA": "ECONÓMICA",
  "ECONOMICAS": "ECONÓMICAS",
  "ECONOMICO": "ECONÓMICO",
  "ECONOMICOS": "ECONÓMICOS",
  "EDUCACION": "EDUCACIÓN",
  "EJECUCION": "EJECUCIÓN",
  "ELECCION": "ELECCIÓN",
  "ELUSION": "ELUSIÓN",
  "EXONERACION": "EXONERACIÓN",
  "EXTINCION": "EXTINCIÓN",
  "FISCALIZACION": "FISCALIZACIÓN",
  "FUNCION": "FUNCIÓN",
  "GARANTIA": "GARANTÍA",
  "GARANTIAS": "GARANTÍAS",
  "IMPOSICION": "IMPOSICIÓN",
  "INFORMACION": "INFORMACIÓN",
  "INFRACCION": "INFRACCIÓN",
  "INFRACCIONES": "INFRACCIONES",
  "INTERPRETACION": "INTERPRETACIÓN",
  "JURIDICA": "JURÍDICA",
  "JURIDICAS": "JURÍDICAS",
  "JURIDICO": "JURÍDICO",
  "JURIDICOS": "JURÍDICOS",
  "JURISDICCION": "JURISDICCIÓN",
  "LEGISLACION": "LEGISLACIÓN",
  "MODIFICACION": "MODIFICACIÓN",
  "NOTIFICACION": "NOTIFICACIÓN",
  "NACION": "NACIÓN",
  "OBLIGACION": "OBLIGACIÓN",
  "ORGANIZACION": "ORGANIZACIÓN",
  "PERCEPCION": "PERCEPCIÓN",
  "PERSONERIA": "PERSONERÍA",
  "PERU": "PERÚ",
  "POLICIA": "POLICÍA",
  "POLITICA": "POLÍTICA",
  "POLITICAS": "POLÍTICAS",
  "PRELACION": "PRELACIÓN",
  "PRESUNCION": "PRESUNCIÓN",
  "PROHIBICION": "PROHIBICIÓN",
  "PROTECCION": "PROTECCIÓN",
  "PUBLICA": "PÚBLICA",
  "PUBLICAS": "PÚBLICAS",
  "PUBLICO": "PÚBLICO",
  "PUBLICOS": "PÚBLICOS",
  "REGIMEN": "RÉGIMEN",
  "REGIMENES": "REGÍMENES",
  "REPUBLICA": "REPÚBLICA",
  "REPETICION": "REPETICIÓN",
  "REPRESENTACION": "REPRESENTACIÓN",
  "RESOLUCION": "RESOLUCIÓN",
  "RETENCION": "RETENCIÓN",
  "SANCION": "SANCIÓN",
  "SANCIONES": "SANCIONES",
  "SECCION": "SECCIÓN",
  "SECCIONES": "SECCIONES",
  "SIMULACION": "SIMULACIÓN",
  "SUBCAPITULO": "SUBCAPÍTULO",
  "TITULO": "TÍTULO",
  "TITULOS": "TÍTULOS",
  "TRIBUTACION": "TRIBUTACIÓN",
  "TRIBUTARIA": "TRIBUTARIA",
  "TRIBUTARIO": "TRIBUTARIO",
  "TRANSMISION": "TRANSMISIÓN",
  "UNICA": "ÚNICA",
  "UNICO": "ÚNICO",
  "VIGESIMA": "VIGÉSIMA",
  "VIGESIMO": "VIGÉSIMO"
}));

function applyOriginalCase(original, accentedUpper) {
  if (original === original.toLocaleUpperCase("es-PE")) return accentedUpper;
  const lower = accentedUpper.toLocaleLowerCase("es-PE");
  if (original === original.toLocaleLowerCase("es-PE")) return lower;
  const originalLower = original.toLocaleLowerCase("es-PE");
  if (original.length > 1 && original[0] === original[0].toLocaleUpperCase("es-PE") && original.slice(1) === originalLower.slice(1)) {
    return lower[0].toLocaleUpperCase("es-PE") + lower.slice(1);
  }
  return accentedUpper;
}

function restoreHeadingAccents(value) {
  const source = String(value || "");
  let changes = 0;
  const restored = source.replace(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g, word => {
    const key = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleUpperCase("es-PE");
    const accentedUpper = HEADING_ACCENT_MAP.get(key);
    if (!accentedUpper) return word;
    const replacement = applyOriginalCase(word, accentedUpper);
    if (replacement !== word) changes++;
    return replacement;
  });
  return { text: restored, changes };
}

function isAccentEligibleHeadingLine(value) {
  const t = cleanLine(value);
  if (!t) return false;
  if (/^\[\[LNE_TABLE_/.test(t)) return false;
  if (matchStructural(t) || parseArticleCandidate(t) || matchNorm(t)) return true;
  // Cubre encabezados generales y nombres de TÍTULOS/CAPÍTULOS escritos en mayúsculas.
  return t.length <= 220 && isAllCapsHeading(t);
}

function normalizeHeadingAccentsInText(inputText) {
  let totalChanges = 0;
  const corrections = [];
  const normalized = String(inputText || "").replace(/\r\n?/g, "\n").split("\n").map(line => {
    if (!isAccentEligibleHeadingLine(line)) return line;
    const result = restoreHeadingAccents(line);
    if (result.changes) {
      totalChanges += result.changes;
      corrections.push({ before: cleanLine(line), after: cleanLine(result.text), changes: result.changes });
    }
    return result.text;
  }).join("\n");
  return { text: normalized, totalChanges, corrections };
}

function cleanLine(line) {
  return String(line || "")
    .replace(/\u00A0/g, " ")
    .replace(/[\t ]+/g, " ")
    .trim();
}

function rawIndent(line) {
  const m = String(line || "").match(/^[\t ]*/);
  return (m?.[0] || "").replace(/\t/g, "    ").length;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeTemplate(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function normalizeVariableName(name) {
  let cleaned = String(name || "CodigoLegal")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9_$]/g, "_");
  if (!/^[A-Za-z_$]/.test(cleaned)) cleaned = "_" + cleaned;
  return cleaned || "CodigoLegal";
}

function normalizeLabel(text) {
  return cleanLine(text)
    .replace(/^SUBTITULO\b/i, "SUBTÍTULO")
    .replace(/^TITULO\b/i, "TÍTULO")
    .replace(/^SUBCAPITULO\b/i, "SUBCAPÍTULO")
    .replace(/^CAPITULO\b/i, "CAPÍTULO")
    .replace(/^SUBSECCION\b/i, "SUBSECCIÓN")
    .replace(/^SECCION\b/i, "SECCIÓN")
    .replace(/^ARTICULO\b/i, "ARTÍCULO");
}

function normalizeArticleNumber(base, suffix) {
  const b = cleanLine(base).toUpperCase();
  return suffix ? `${b}-${cleanLine(suffix).toUpperCase()}` : b;
}

function isPageNoise(line) {
  const t = cleanLine(line);
  if (!t) return false;
  return /^(?:p[aá]gina|page)\s+\d+(?:\s+(?:de|of)\s+\d+)?$/i.test(t)
    || /^\d+\s*\/\s*\d+$/.test(t)
    || /^--\s*\d+\s+(?:of|de)\s+\d+\s*--$/i.test(t)
    || /^-{2,}\s*(?:page\s*)?\d+\s*(?:of|de|\/)\s*\d+\s*-{2,}$/i.test(t);
}

function preprocessLines(inputText, options = {}) {
  const PAGE_BREAK = "[[LNE_PAGE_BREAK]]";
  const normalized = String(inputText || "")
    .replace(/\r\n?/g, "\n")
    // Conservamos el salto de página como dato estructural en vez de convertirlo
    // en una línea vacía. Esto evita crear párrafos falsos.
    .replace(/\f/g, `\n${PAGE_BREAK}\n`);

  const rawItems = normalized.split("\n").map(raw => {
    const text = cleanLine(raw);
    // El PDF ya pasó por limpieza geométrica; un número aislado puede ser texto legal.
    const pageBreak = text === PAGE_BREAK || (!options.preserveStandaloneNumbers && isPageNoise(text));
    return { raw, text, indent: rawIndent(raw), pageBreak };
  });

  const result = [];
  let pendingPageBreak = false;

  for (const item of rawItems) {
    if (item.pageBreak) {
      pendingPageBreak = true;
      // Las líneas vacías pegadas a un cambio de página suelen ser artefactos
      // del extractor PDF. Se eliminan y luego decidimos la continuidad por contexto.
      while (result.length && !result[result.length - 1].text) result.pop();
      continue;
    }

    if (pendingPageBreak) {
      if (!item.text) continue;
      result.push({ ...item, pageBreakBefore: true });
      pendingPageBreak = false;
      continue;
    }

    result.push({ ...item, pageBreakBefore: false });
  }

  // Word puede fusionar un subnivel con el párrafo padre, por ejemplo:
  // “33.1 ... siguientes supuestos: 1.- Primer supuesto”. Lo separamos
  // únicamente cuando la propia línea ya empieza con un marcador jurídico y
  // el texto situado después de dos puntos empieza, a su vez, con un marcador
  // jurídico válido. Se evita una regexp gigante para reducir falsos positivos.
  const expanded = [];
  const splitInlineChildAfterColon = (outerText) => {
    const text = cleanLine(outerText);
    for (let idx = text.indexOf(":"); idx >= 0; idx = text.indexOf(":", idx + 1)) {
      const before = cleanLine(text.slice(0, idx + 1));
      const after = cleanLine(text.slice(idx + 1));
      if (!after) continue;
      const child = matchListMarker(after);
      if (child) return { before, after };
    }
    return null;
  };

  for (const item of result) {
    if (!item.text) { expanded.push(item); continue; }
    let parent = { ...item };
    let guard = 0;
    while (guard++ < 6) {
      const outer = matchListMarker(parent.text);
      if (!outer) break;
      const embedded = splitInlineChildAfterColon(outer.text);
      if (!embedded) break;
      const parentText = `${outer.marker} ${embedded.before}`;
      expanded.push({ ...parent, raw: parentText, text: parentText });
      parent = {
        ...parent,
        raw: `${" ".repeat(Math.min(40, Number(parent.indent || 0) + 4))}${embedded.after}`,
        text: embedded.after,
        indent: Number(parent.indent || 0) + 4,
        pageBreakBefore: false
      };
    }
    expanded.push(parent);
  }

  // Algunos PDF aplanan varias disposiciones consecutivas en una sola línea:
  // “Primera.- ... Segunda.- ... Tercera.- ...”. Solo dentro de una sección
  // de disposiciones las separamos por el punto anterior al ordinal, evitando
  // confundir menciones corrientes a una “primera” regla dentro de un artículo.
  const dispositionExpanded = [];
  let inDispositionSection = false;
  const inlineDispositionRe = new RegExp(
    `([.;])\\s+(${ORDINAL_WORDS_RE}|[ÚU]NICA)\\s*(?:\\.-|[-–—:]|\\.)\\s*`,
    "gi"
  );
  // Algunas ediciones antiguas omiten el punto y guion: “Sexta Salvo…”.
  // Aceptamos esa forma solo si el texto siguiente comienza con mayúscula y
  // ya estamos dentro de Disposiciones; así no partimos frases ordinarias.
  const inlineBareDispositionRe = new RegExp(
    `([.;])\\s+[“"'‘’]*(${ORDINAL_WORDS_RE}|[ÚU]NICA)\\s+([^\\s])`,
    "gi"
  );
  for (const item of expanded) {
    const text = item.text || "";
    if (/^DISPOSICIONES?\b/i.test(text)) inDispositionSection = true;
    if (inDispositionSection && text) {
      const splitText = text
        .replace(inlineDispositionRe, "$1\n$2.- ")
        .replace(inlineBareDispositionRe, (whole, ending, ordinal, firstCharacter) => (
          /^[A-ZÁÉÍÓÚÜÑ]$/.test(firstCharacter)
            ? `${ending}\n${ordinal} ${firstCharacter}`
            : whole
        ));
      const parts = splitText.split("\n").map(cleanLine).filter(Boolean);
      if (parts.length > 1) {
        parts.forEach((part, index) => dispositionExpanded.push({
          ...item,
          raw: part,
          text: part,
          pageBreakBefore: index === 0 ? item.pageBreakBefore : false
        }));
        continue;
      }
    }
    dispositionExpanded.push(item);
  }

  return dispositionExpanded;
}

function isAllCapsHeading(text) {
  const t = cleanLine(text);
  if (!t || t.length > 180) return false;
  if (/^[\d\W_]+$/.test(t)) return false;
  const letters = (t.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g) || []);
  if (!letters.length) return false;
  const upper = letters.filter(ch => ch === ch.toUpperCase()).length;
  return upper / letters.length >= 0.88;
}

function isLongAllCapsHeading(text, maxLength = 600) {
  const t = cleanLine(text);
  if (!t || t.length > maxLength) return false;
  if (/^[\d\W_]+$/.test(t)) return false;
  const letters = (t.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g) || []);
  if (!letters.length) return false;
  const upper = letters.filter(ch => ch === ch.toUpperCase()).length;
  return upper / letters.length >= 0.88;
}

function startsLikeBodySentence(text) {
  const t = cleanLine(text);
  return /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]/.test(t) && !isAllCapsHeading(t);
}

function isArticleLeadHeadingCandidate(value, hintedBoldSet = null) {
  const t = cleanLine(value);
  if (!t || t.length < 3 || t.length > 180) return false;
  if (matchStructural(t) || parseArticleCandidate(t) || matchNorm(t) || matchListMarker(t)) return false;
  if (/^[\[(“"'‘’]/.test(t) || /[.;:!?]$/.test(t)) return false;
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length > 18) return false;
  if (hintedBoldSet?.has(t)) return true;
  // Respaldo para PDF/TXT donde no existe información de negrita. Se limita a
  // rótulos jurídicos muy frecuentes para evitar convertir frases del cuerpo.
  return /^(?:Contrato|Convenio|Modalidad|Régimen|Regimen|Trabajo|Jornada|Procedimiento|Licencia|Pacto|Clasificación|Clasificacion|Definición|Definicion|Subsidio|Beneficio|Requisito|Requisitos|Causal|Causales|Derecho|Derechos|Obligación|Obligacion|Obligaciones)/i.test(t);
}

function articleLeadHeadingHtml(value) {
  const t = cleanLine(value);
  if (!t) return "";
  return `<div data-lne-role="article-lead" style="text-align: left; text-transform: none; font-weight: 700; font-size: 1rem; line-height: 1.4; margin: 0 12px 6px;">${escapeHtml(t)}</div>`;
}

function isListStart(text) {
  return !!matchListMarker(text);
}

function isTitleCaseStructuralName(value) {
  const name = cleanLine(value);
  if (!name) return true;
  if (name.length > 240 || name.split(/\s+/).length > 28) return false;
  if (/[.!?;]$/.test(name)) return false;
  // Referencias del cuerpo que empiezan por una jerarquía, no encabezados:
  // “Libro Tercero del presente Código”, “Título II de esta Ley”, etc.
  if (/^(?:del|de la|de los|de las)\s+(?:presente|este|esta|estos|estas)\b/i.test(name)) return false;
  if (/^(?:del|de la|de los|de las)\s+(?:c[oó]digo|ley|decreto|reglamento)\b/i.test(name)) return false;
  const firstLetter = name.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/)?.[0] || "";
  if (!firstLetter) return false;
  return firstLetter === firstLetter.toLocaleUpperCase("es-PE");
}

function looksLikeStructuralHeadingCandidate(line) {
  const t = cleanLine(line);
  if (!t) return false;
  return new RegExp(`^(?:LIBRO|T[ÍI]TULO|SUBT[ÍI]TULO|CAP[ÍI]TULO|SUBCAP[ÍI]TULO|SECCI[ÓO]N|SUBSECCI[ÓO]N)\\s+(?:PRELIMINAR|${ORDINAL_WORDS_RE}|${ROMAN_RE}(?:-[A-Z])?|\\d+(?:-[A-Z])?|ÚNIC[OA]|UNIC[OA])(?:\\s|$)`, "i").test(t);
}

function matchStructural(line) {
  const t = cleanLine(line);
  let m;

  const accept = (type, label, name) => {
    const cleanName = cleanLine(name || "");
    // Acepta tanto encabezados en MAYÚSCULAS como nombres en estilo título:
    // “Subcapítulo III Colaboración entre entidades”. Sigue rechazando
    // referencias internas del tipo “Libro Tercero del presente Código”.
    if (cleanName && !isAllCapsHeading(cleanName) && !isTitleCaseStructuralName(cleanName)) return null;
    return { type, label: normalizeLabel(cleanLine(label).toUpperCase()), name: cleanName };
  };

  // Evalúa ordinales escritos antes que romanos para no cortar “CUARTO” como “C” + “UARTO”.
  m = t.match(new RegExp(`^(LIBRO\\s+(?:PRELIMINAR|${ORDINAL_WORDS_RE}|${ROMAN_RE}(?:-[A-Z])?|\\d+(?:-[A-Z])?|ÚNICO|UNICO))\\s*(?:[-–—.:]\\s*)?(.*)$`, "i"));
  if (m) return accept("book", m[1], m[2]);

  m = t.match(new RegExp(`^(T[ÍI]TULO\\s+(?:PRELIMINAR|${ORDINAL_WORDS_RE}|${ROMAN_RE}(?:-[A-Z])?|\\d+(?:-[A-Z])?|ÚNICO|UNICO|Único|Unico))\\s*(?:[-–—.:]\\s*)?(.*)$`, "i"));
  if (m) return accept("title", m[1], m[2]);

  m = t.match(new RegExp(`^(SUBT[ÍI]TULO\\s+(?:${ORDINAL_WORDS_RE}|${ROMAN_RE}(?:-[A-Z])?|\\d+(?:-[A-Z])?|ÚNICO|UNICO))\\s*(?:[-–—.:]\\s*)?(.*)$`, "i"));
  if (m) return accept("subchapter", m[1], m[2]);

  m = t.match(new RegExp(`^(CAP[ÍI]TULO\\s+(?:PRELIMINAR|${ORDINAL_WORDS_RE}|${ROMAN_RE}(?:-[A-Z])?|\\d+(?:-[A-Z])?|ÚNICO|UNICO))\\s*(?:[-–—.:]\\s*)?(.*)$`, "i"));
  if (m) return accept("chapter", m[1], m[2]);

  m = t.match(new RegExp(`^(SUBCAP[ÍI]TULO\\s+(?:${ORDINAL_WORDS_RE}|${ROMAN_RE}(?:-[A-Z])?|\\d+(?:-[A-Z])?|ÚNICO|UNICO))\\s*(?:[-–—.:]\\s*)?(.*)$`, "i"));
  if (m) return accept("subchapter", m[1], m[2]);

  m = t.match(new RegExp(`^(SECCI[ÓO]N\\s+(?:${ORDINAL_WORDS_RE}|${ROMAN_RE}(?:-[A-Z])?|\\d+(?:-[A-Z])?|ÚNICA|UNICA))\\s*(?:[-–—.:]\\s*)?(.*)$`, "i"));
  if (m) return accept("section", m[1], m[2]);

  m = t.match(new RegExp(`^(SUBSECCI[ÓO]N\\s+(?:${ORDINAL_WORDS_RE}|${ROMAN_RE}(?:-[A-Z])?|\\d+(?:-[A-Z])?|ÚNICA|UNICA))\\s*(?:[-–—.:]\\s*)?(.*)$`, "i"));
  if (m) return accept("subchapter", m[1], m[2]);

  const specialHeading = t.match(/^DISPOSICIONES\s+(.+)$/i);
  if (specialHeading) {
    const specialWords = cleanLine(specialHeading[1])
      .toUpperCase()
      .replace(/[,;]+/g, " ")
      .split(/\s+/)
      .filter(Boolean);
    const allowedWords = new Set(["COMPLEMENTARIAS", "FINALES", "TRANSITORIAS", "DEROGATORIAS", "MODIFICATORIAS", "Y", "E"]);
    const substantiveWords = specialWords.filter(word => word !== "Y" && word !== "E");
    if (substantiveWords.length && substantiveWords.length <= 4 && specialWords.every(word => allowedWords.has(word))) {
      return { type: "special", label: t.toUpperCase(), name: "" };
    }
  }

  if (/^DISPOSICIONES\s+(?:FINALES|COMPLEMENTARIAS|TRANSITORIAS|DEROGATORIAS|MODIFICATORIAS)\s*$/i.test(t)) {
    return { type: "special", label: t.toUpperCase(), name: "" };
  }
  if (/^DISPOSICI[ÓO]N\s+(?:COMPLEMENTARIA\s+)?(?:FINAL|TRANSITORIA|DEROGATORIA|MODIFICATORIA)\s*$/i.test(t)) {
    return { type: "special", label: t.toUpperCase(), name: "" };
  }

  return null;
}

function parseArticleCandidate(line) {
  const t = cleanLine(line);
  // Deliberadamente NO es /i/: una referencia interna suele aparecer como "artículo ..." en minúscula.
  const m = t.match(/^(Artículo|ART[ÍI]CULO)\s+((?:\d+|[IVXLCDM]+|ÚNICO|UNICO|Único|Unico))(?:\s*[º°])?(?:\s*[-–—]\s*([A-ZÑ]+))?(?:\s*[º°])?\s*(\.\s*[-–—]?|[-–—:]|\.)?\s*(.*)$/);
  if (!m) return null;
  return {
    raw: t,
    base: m[2],
    suffix: m[3] || "",
    number: normalizeArticleNumber(m[2], m[3] || ""),
    delimiter: cleanLine(m[4] || ""),
    title: cleanLine(m[5] || "")
  };
}

function looksLikeReferenceTail(title) {
  const t = cleanLine(title);
  if (!t) return false;
  return /^(?:de|del|de\s+la|de\s+los|de\s+las|al|a\s+la|en|que|cuando|según|conforme|y|o)\b/i.test(t)
    && !isAllCapsHeading(t);
}

function isStrongArticleDelimiter(delimiter) {
  return /-/.test(delimiter) || delimiter === ":" || delimiter === "–" || delimiter === "—";
}

function matchNorm(line) {
  const t = cleanLine(line);
  // La palabra puede venir como NORMA o Norma, pero exigimos un separador de encabezado.
  // Así "Norma XVI del Título..." dentro de un párrafo no se convierte en una nueva norma.
  const m = t.match(/^(?:NORMA|Norma)\s+([IVXLCDM]+|\d+(?:-[A-Z])?)\s*(?::|\.\s*[-–—]|[-–—])\s*(.*)$/);
  if (!m) return null;
  return { type: "Norma", number: m[1].toUpperCase(), title: cleanLine(m[2] || "") };
}

const DISPOSITION_UNITS = new Set([
  "PRIMERA", "SEGUNDA", "TERCERA", "CUARTA", "QUINTA", "SEXTA", "SÉPTIMA", "SEPTIMA", "SÉTIMA", "SETIMA", "OCTAVA", "NOVENA"
]);
const DISPOSITION_SIMPLE = new Set([
  "ÚNICA", "UNICA", "PRIMERA", "SEGUNDA", "TERCERA", "CUARTA", "QUINTA", "SEXTA", "SÉPTIMA", "SEPTIMA", "SÉTIMA", "SETIMA", "OCTAVA", "NOVENA",
  "DÉCIMA", "DECIMA", "UNDÉCIMA", "UNDECIMA", "DUODÉCIMA", "DUODECIMA",
  "VIGÉSIMA", "VIGESIMA", "TRIGÉSIMA", "TRIGESIMA", "CUADRAGÉSIMA", "CUADRAGESIMA",
  "QUINCUAGÉSIMA", "QUINCUAGESIMA", "SEXAGÉSIMA", "SEXAGESIMA", "SEPTUAGÉSIMA", "SEPTUAGESIMA",
  "OCTOGÉSIMA", "OCTOGESIMA", "NONAGÉSIMA", "NONAGESIMA", "CENTÉSIMA", "CENTESIMA"
]);
const DISPOSITION_TENS = new Set([
  "DÉCIMO", "DECIMO", "DÉCIMA", "DECIMA",
  "VIGÉSIMO", "VIGESIMO", "VIGÉSIMA", "VIGESIMA",
  "TRIGÉSIMO", "TRIGESIMO", "TRIGÉSIMA", "TRIGESIMA",
  "CUADRAGÉSIMO", "CUADRAGESIMO", "CUADRAGÉSIMA", "CUADRAGESIMA",
  "QUINCUAGÉSIMO", "QUINCUAGESIMO", "QUINCUAGÉSIMA", "QUINCUAGESIMA",
  "SEXAGÉSIMO", "SEXAGESIMO", "SEXAGÉSIMA", "SEXAGESIMA",
  "SEPTUAGÉSIMO", "SEPTUAGESIMO", "SEPTUAGÉSIMA", "SEPTUAGESIMA",
  "OCTOGÉSIMO", "OCTOGESIMO", "OCTOGÉSIMA", "OCTOGESIMA",
  "NONAGÉSIMO", "NONAGESIMO", "NONAGÉSIMA", "NONAGESIMA"
]);

function isDispositionOrdinal(value) {
  const ordinal = cleanLine(value).toUpperCase();
  if (DISPOSITION_SIMPLE.has(ordinal)) return true;
  const parts = ordinal.split(/\s+/);
  return parts.length === 2 && DISPOSITION_TENS.has(parts[0]) && DISPOSITION_UNITS.has(parts[1]);
}

function titleCaseOrdinal(text) {
  const t = cleanLine(text).toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function matchDisposition(line, inSpecialSection) {
  if (!inSpecialSection) return null;
  const t = cleanLine(line);
  const m = t.match(/^([A-ZÁÉÍÓÚÜÑ ]+?)\s*(?:\.-|[-–—:]|\.)\s*(.*)$/i);
  if (m) {
    const ordinal = cleanLine(m[1]).toUpperCase();
    if (isDispositionOrdinal(ordinal)) {
      return { type: "Disposición", number: titleCaseOrdinal(ordinal), title: cleanLine(m[2] || "") };
    }
  }

  // Variante frecuente en PDFs viejos: “Sexta Salvo que…”, sin separador.
  // El resto se considera cuerpo, no sumilla, para que nunca se convierta en
  // un bloque entero en negrita.
  const bare = t.match(new RegExp(`^(${ORDINAL_WORDS_RE}|[ÚU]NICA)\\s+(.+)$`, "i"));
  if (!bare) return null;
  const ordinal = cleanLine(bare[1]).toUpperCase();
  if (!isDispositionOrdinal(ordinal)) return null;
  return {
    type: "Disposición",
    number: titleCaseOrdinal(ordinal),
    title: "",
    bodyPrefix: cleanLine(bare[2] || "")
  };
}

function romanToInt(value) {
  const roman = String(value || "").toUpperCase();
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  let previous = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    const current = values[roman[i]] || 0;
    if (!current) return null;
    if (current < previous) total -= current;
    else {
      total += current;
      previous = current;
    }
  }
  return total || null;
}

function intToRoman(number) {
  let n = Number(number);
  if (!Number.isInteger(n) || n <= 0) return "";
  const table = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let out = "";
  for (const [value, symbol] of table) {
    while (n >= value) {
      out += symbol;
      n -= value;
    }
  }
  return out;
}

function validRomanListValue(raw) {
  const value = romanToInt(raw);
  // Los acápites jurídicos suelen usar romanos cortos. Este límite también evita
  // confundir literales como d. o c. con números romanos.
  if (!value || value > 50) return null;
  const canonical = intToRoman(value);
  return canonical === String(raw).toUpperCase() ? value : null;
}

function matchListMarker(line) {
  const t = cleanLine(line);
  let m;

  // Subnumerales pertenecientes a artículos incorporados: 29-A.1, 228-C.2,
  // 62-A.1.1, etc. El prefijo puede tener una o más letras y niveles variables.
  m = t.match(/^(((\d+(?:-[A-ZÑ]+)+)\.(\d+(?:\.\d+)*)(?:\.|\))?))\s+(.+)$/i);
  if (m) {
    const subpath = m[4].split(".").map(Number);
    const articleKey = m[3].toUpperCase();
    return {
      marker: m[1],
      text: m[5],
      kind: "article-decimal",
      width: Math.max(60, 35 + m[1].length * 5),
      articleKey,
      major: articleKey,
      minor: subpath[subpath.length - 1],
      path: [articleKey, ...subpath],
      subpath
    };
  }

  // Subniveles alfanuméricos de profundidad variable: a.1, a.1.1, b.2.3, etc.
  m = t.match(/^(([a-zA-ZñÑ])\.(\d+(?:\.\d+)*)(?:\.|\))?)\s+(.+)$/);
  if (m) {
    const subpath = m[3].split(".").map(Number);
    return { marker: m[1], text: m[4], kind: "alpha-decimal", width: Math.max(50, 40 + subpath.length * 10), alpha: m[2].toLowerCase(), minor: subpath[subpath.length - 1], subpath };
  }

  // Subnumerales decimales de profundidad variable: 69.2, 18.3.1, 1.2.3.4, etc.
  m = t.match(/^((\d+(?:\.\d+)+)(?:\.|\))?)\s+(.+)$/);
  if (m) {
    const path = m[2].split(".").map(Number);
    return {
      marker: m[1],
      text: m[3],
      kind: "decimal",
      width: Math.max(55, 35 + path.length * 10),
      major: path[0],
      minor: path[path.length - 1],
      path
    };
  }

  // Numerales manuales: 1. / 1.- / 1.– / 1) incluso sin espacio tras el signo.
  // El guion forma parte del marcador y no debe reaparecer al inicio del texto.
  m = t.match(/^((\d+)(?:\.\s*[-–—]?|\)))\s*(\S.*)$/);
  if (m) {
    const marker = m[1].replace(/\s+/g, "");
    return { marker, text: m[3], kind: "number", width: Math.max(35, 20 + marker.length * 7) };
  }

  // Romanos entre paréntesis: (I), (II), (i), (ii)...
  m = t.match(/^\(([IVXLCDM]+)\)\s*(\S.*)$/);
  if (m && validRomanListValue(m[1]) != null) {
    return { marker: `(${m[1]})`, text: m[2], kind: "roman-upper", width: 44, romanStyle: "wrapped" };
  }
  m = t.match(/^\(([ivxlcdm]+)\)\s*(\S.*)$/);
  if (m && validRomanListValue(m[1]) != null) {
    return { marker: `(${m[1]})`, text: m[2], kind: "roman-lower", width: 44, romanStyle: "wrapped" };
  }

  // Romanos con punto o cierre de paréntesis: I. / I) / i. / i)
  m = t.match(/^([IVXLCDM]+)([.)])\s*(\S.*)$/);
  if (m && validRomanListValue(m[1]) != null) {
    return { marker: `${m[1]}${m[2]}`, text: m[3], kind: "roman-upper", width: 44, romanStyle: m[2] === ")" ? "paren" : "dot" };
  }
  m = t.match(/^([ivxlcdm]+)([.)])\s*(\S.*)$/);
  if (m && validRomanListValue(m[1]) != null) {
    return { marker: `${m[1]}${m[2]}`, text: m[3], kind: "roman-lower", width: 44, romanStyle: m[2] === ")" ? "paren" : "dot" };
  }

  // Romanos sin punto ni paréntesis: I / II / III e i / ii / iii.
  // Se exige texto después del romano para no confundir encabezados aislados.
  m = t.match(/^([IVXLCDM]+)\s+(.+)$/);
  if (m && validRomanListValue(m[1]) != null) {
    return { marker: m[1], text: m[2], kind: "roman-upper", width: 44, romanStyle: "bare" };
  }
  m = t.match(/^([ivxlcdm]+)\s+(.+)$/);
  if (m && validRomanListValue(m[1]) != null) {
    return { marker: m[1], text: m[2], kind: "roman-lower", width: 44, romanStyle: "bare" };
  }

  // Numerales y literales completamente entre paréntesis: (1), (2), (a), (b).
  m = t.match(/^\((\d+)\)\s*(\S.*)$/);
  if (m) return { marker: `(${m[1]})`, text: m[2], kind: "number", width: 42 };

  m = t.match(/^\(([a-zA-ZñÑ])\)\s*(\S.*)$/);
  if (m) return { marker: `(${m[1]})`, text: m[2], kind: "letter", width: 42 };

  m = t.match(/^([a-zA-ZñÑ]\))\s*(\S.*)$/);
  if (m) return { marker: m[1], text: m[2], kind: "letter", width: 35 };

  m = t.match(/^([a-zA-ZñÑ]\.)\s*(\S.*)$/);
  if (m) return { marker: m[1], text: m[2], kind: "letter", width: 35 };

  m = t.match(/^([–—-])\s+(.+)$/);
  if (m) return { marker: "–", text: m[2], kind: "dash", width: 35 };

  m = t.match(/^([•●▪◦])\s+(.+)$/);
  if (m) return { marker: "•", text: m[2], kind: "dash", width: 35 };

  return null;
}


function isLikelyDecimalReference(markerInfo, provision) {
  if (!markerInfo || !["decimal", "article-decimal"].includes(markerInfo.kind) || !Array.isArray(markerInfo.path)) return false;
  const text = cleanLine(markerInfo.text || "");
  if (!text) return false;
  // Referencias como “176.2 del artículo 176° de la Ley...” no son un nuevo subnumeral.
  if (!/^(?:del|de\s+la|de\s+los|de\s+las|del\s+artículo|del\s+articulo|del\s+numeral|de\s+este|del\s+presente)\b/i.test(text)) return false;
  if (provision?.type !== "Artículo") return false;
  if (markerInfo.kind === "article-decimal") {
    return String(markerInfo.articleKey || "").toUpperCase() !== String(provision.number || "").toUpperCase();
  }
  const articleBase = Number(String(provision.number || "").match(/^\d+/)?.[0] || NaN);
  return Number.isFinite(articleBase) && markerInfo.path[0] !== articleBase;
}

function resolveAmbiguousRomanListMarker(markerInfo, previousListToken, listHistory = []) {
  if (!markerInfo || markerInfo.kind !== "roman-lower") return markerInfo;
  if (markerInfo.romanStyle === "wrapped" || markerInfo.romanStyle === "bare") return markerInfo;

  const raw = markerInfo.marker.replace(/[().]/g, "").toLowerCase();
  if (raw.length !== 1) return markerInfo; // ii), iii), iv)... son inequívocos.

  const currentValue = validRomanListValue(raw);
  const previousIsRoman = previousListToken?.kind === "roman-lower";
  if (previousIsRoman) return markerInfo;

  // Caso jurídico frecuente: iv. abre una sublista 1., 2. y luego continúa v.
  // Buscamos el último romano inferior y permitimos que entre ambos solo haya numerales.
  let lastRomanIndex = -1;
  for (let i = listHistory.length - 1; i >= 0; i--) {
    if (listHistory[i]?.kind === "roman-lower") {
      lastRomanIndex = i;
      break;
    }
  }
  if (lastRomanIndex >= 0) {
    const previousRoman = listHistory[lastRomanIndex];
    const previousRomanValue = listMarkerValue(previousRoman);
    const intervening = listHistory.slice(lastRomanIndex + 1);
    const onlyNestedNumbers = intervening.length > 0 && intervening.every(token => token?.kind === "number");
    if (onlyNestedNumbers && previousRomanValue != null && currentValue === previousRomanValue + 1) {
      return markerInfo;
    }
  }

  // Un romano de una sola letra distinto de i se interpreta como literal alfabético
  // si no existe evidencia de continuidad romana.
  if (raw !== "i") {
    return { ...markerInfo, kind: "letter", width: 35, romanStyle: undefined };
  }

  // Si venimos de h), el siguiente i) pertenece al alfabeto: g), h), i), j).
  if (previousListToken?.kind === "letter") {
    const previousValue = listMarkerValue(previousListToken);
    if (previousValue === 8) return { ...markerInfo, kind: "letter", width: 35, romanStyle: undefined };
  }

  return markerInfo;
}

function nextNonBlank(lines, start) {
  for (let i = start; i < lines.length; i++) {
    if (lines[i].text) return { index: i, item: lines[i] };
  }
  return null;
}

function looksLikeProvisionTitle(text) {
  const t = cleanLine(text);
  if (!t || t.length > 180) return false;
  if (matchStructural(t) || parseArticleCandidate(t) || matchNorm(t) || isListStart(t)) return false;
  if (/^[\d(]/.test(t)) return false;
  if (isAllCapsHeading(t)) return true;
  // También admite sumillas en estilo título: "Principio de Territorialidad".
  // Una sumilla normalmente es una frase nominal breve y NO termina como una
  // oración jurídica completa.
  const words = t.split(/\s+/);
  if (words.length <= 16 && !/[.;:!?]$/.test(t)) {
    const first = words[0] || "";
    return /^[A-ZÁÉÍÓÚÜÑ]/.test(first);
  }
  return false;
}

function looksLikeArticleBodyText(text) {
  const t = cleanLine(text);
  if (!t) return false;
  // El cuerpo legal suele terminar en puntuación de oración/lista. Las sumillas
  // de artículo, en cambio, normalmente no llevan punto/;/: final.
  if (/[.;:!?]$/.test(t)) return true;
  if (t.split(/\s+/).length > 20) return true;
  return false;
}

function isStandaloneArticleCandidate(candidate) {
  return !!candidate && !candidate.title && /^(?:\.|\.\s*[-–—]?|[-–—:]?)$/.test(candidate.delimiter || ".");
}

function articleNumericBase(number) {
  const m = String(number || "").match(/^(\d+)/);
  return m ? Number(m[1]) : null;
}

function standaloneArticleLooksOutOfOrder(lines, index, candidate) {
  const current = articleNumericBase(candidate?.number);
  if (!Number.isInteger(current)) return false;
  // Busca el siguiente encabezado aparente, pero solo dentro de la misma zona
  // estructural. Si aparece un TÍTULO/CAPÍTULO antes, puede existir un reinicio
  // legítimo de numeración y no usamos esta heurística.
  for (let j = index + 1; j < Math.min(lines.length, index + 160); j++) {
    const t = cleanLine(lines[j]?.text || "");
    if (!t) continue;
    if (matchStructural(t)) return false;
    const next = parseArticleCandidate(t);
    if (!next) continue;
    const nextBase = articleNumericBase(next.number);
    if (!Number.isInteger(nextBase)) return false;
    return nextBase < current;
  }
  return false;
}

function analyzeArticleHeading(lines, index, diagnostics, hintedBoldSet = null) {
  const candidate = parseArticleCandidate(lines[index].text);
  if (!candidate) return null;

  // Si no hay signo separador y lo que sigue parece una referencia normativa, no es encabezado.
  if (!candidate.delimiter && candidate.title && looksLikeReferenceTail(candidate.title)) {
    diagnostics.ignoredArticleReferences.push(candidate.number);
    return null;
  }

  // Una línea como "Artículo 12° de la Ley..." carece de delimitador de encabezado.
  if (!candidate.delimiter && candidate.title && !looksLikeProvisionTitle(candidate.title)) {
    diagnostics.ignoredArticleReferences.push(candidate.number);
    return null;
  }

  let titleLines = [];
  let bodyPrefix = "";

  if (candidate.title) {
    // Con separadores fuertes (.-, -, :, etc.) el texto que sigue puede ser una
    // sumilla REAL o puede ser ya el cuerpo del artículo. No todo lo situado a
    // la derecha de ".-" es un título. Ej.: "Artículo 72.- Los contratos...".
    // Si el texto está íntegramente en mayúsculas, prevalece como sumilla aun
    // cuando sea muy largo: este patrón es común en códigos tributarios y TUO.
    if (isLongAllCapsHeading(candidate.title)) {
      titleLines.push(candidate.title);
    } else if (isStrongArticleDelimiter(candidate.delimiter) && looksLikeArticleBodyText(candidate.title)) {
      bodyPrefix = candidate.title;
    } else if (looksLikeProvisionTitle(candidate.title)) {
      titleLines.push(candidate.title);
    } else if (isStrongArticleDelimiter(candidate.delimiter)) {
      // Si es corto y no tiene cierre de oración lo conservamos como sumilla;
      // de lo contrario es cuerpo. Esta rama mantiene compatibilidad con
      // códigos cuyos títulos no están en mayúsculas.
      if (!looksLikeArticleBodyText(candidate.title)) titleLines.push(candidate.title);
      else bodyPrefix = candidate.title;
    } else {
      diagnostics.ignoredArticleReferences.push(candidate.number);
      return null;
    }
  } else {
    // MUY IMPORTANTE: "Artículo 1." en un párrafo independiente es un encabezado
    // válido aunque no tenga sumilla. Muchos TUO (p. ej. DL 728) usan exactamente
    // este formato. La versión anterior lo confundía con una cita interna.
    const next = nextNonBlank(lines, index + 1);
    const nextText = cleanLine(next?.item?.text || "");
    const nextIsStrongTitle = !!next && (
      isLongAllCapsHeading(nextText)
      || hintedBoldSet?.has(nextText)
      || (looksLikeProvisionTitle(nextText) && !looksLikeArticleBodyText(nextText))
    );
    // Muchos códigos separan el número del artículo y su sumilla en párrafos
    // distintos. Una sumilla puede ser MUY larga (más de 20 palabras), por lo
    // que la regla antigua la confundía con cuerpo. Si la línea inmediata es
    // toda mayúscula o viene en negrita real desde Word, prevalece como título.
    if (nextIsStrongTitle) {
      titleLines.push(nextText);
      index = next.index;
    } else if (isStandaloneArticleCandidate(candidate)) {
      // Protege el caso histórico "Artículo 78°. / 10. ... / Artículo 4." de
      // PDFs cortados: si el supuesto encabezado obliga a retroceder la secuencia
      // antes del siguiente artículo de la misma sección, se trata como referencia.
      if (standaloneArticleLooksOutOfOrder(lines, index, candidate)) {
        diagnostics.ignoredArticleReferences.push(candidate.number);
        return null;
      }
    } else if (!isStrongArticleDelimiter(candidate.delimiter)) {
      diagnostics.ignoredArticleReferences.push(candidate.number);
      return null;
    }
  }

  // Une sumillas partidas en 2 o más líneas (muy común en PDF), pero nunca
  // consume líneas cuando ya determinamos que lo posterior era cuerpo.
  let j = index + 1;
  while (j < lines.length && titleLines.length > 0 && !bodyPrefix) {
    const t = lines[j].text;
    if (!t) break;
    if (matchStructural(t) || parseArticleCandidate(t) || matchNorm(t) || isListStart(t)) break;
    const joinedTitle = titleLines.join(" ");
    const continuationCue = /(?:\bde|\bdel|\by|\bo|\be|\bcontra|\bpara|\bpor|\bla|\bel)$/i.test(joinedTitle);
    const hintedBold = hintedBoldSet?.has(cleanLine(t));
    if (!isLongAllCapsHeading(t) && !hintedBold && !(continuationCue && looksLikeProvisionTitle(t) && !looksLikeArticleBodyText(t))) break;
    // Sumillas reales de normas tributarias/administrativas pueden superar con
    // facilidad 220 caracteres. Permitimos hasta 600 sin consumir cuerpo: la
    // continuación debe seguir siendo mayúscula, negrita o lingüísticamente
    // compatible con una sumilla.
    if (joinedTitle.length + t.length > 600) break;
    titleLines.push(t);
    index = j;
    j++;
  }

  return {
    kind: "provision",
    type: "Artículo",
    number: candidate.number,
    title: cleanLine(titleLines.join(" ")),
    bodyPrefix: cleanLine(bodyPrefix),
    endIndex: index
  };
}

function analyzeNormHeading(lines, index) {
  const norm = matchNorm(lines[index].text);
  if (!norm) return null;
  const titleLines = [];
  if (norm.title) titleLines.push(norm.title);
  let endIndex = index;

  for (let j = index + 1; j < lines.length; j++) {
    const t = lines[j].text;
    if (!t) break;
    if (matchStructural(t) || parseArticleCandidate(t) || matchNorm(t) || isListStart(t)) break;
    if (!isAllCapsHeading(t)) break;
    if (titleLines.join(" ").length + t.length > 240) break;
    titleLines.push(t);
    endIndex = j;
  }

  return { kind: "provision", type: "Norma", number: norm.number, title: cleanLine(titleLines.join(" ")), endIndex };
}

function splitStructuralNameAndEmbeddedProvision(text) {
  const t = cleanLine(text || "");
  if (!t) return null;
  const provisionRe = /\s+(?=(?:Artículo|ART[ÍI]CULO|NORMA|Norma)\s+)/g;
  let m;
  while ((m = provisionRe.exec(t))) {
    const name = cleanLine(t.slice(0, m.index));
    const provision = cleanLine(t.slice(m.index));
    if (!name || name.length > 180 || name.split(/\s+/).length > 24) continue;
    if (/[.!?;]$/.test(name)) continue;
    const article = parseArticleCandidate(provision);
    const norm = matchNorm(provision);
    if (!article && !norm) continue;
    if (article && !isStrongArticleDelimiter(article.delimiter) && !looksLikeProvisionTitle(article.title)) continue;
    return { name, provision };
  }
  return null;
}

function strongSourceArticleCandidate(line) {
  const direct = parseArticleCandidate(line);
  if (direct) {
    // Un encabezado puro "Artículo 1." cuenta como encabezado de fuente aunque
    // no tenga sumilla. También cuenta cualquier variante con separador fuerte,
    // incluso cuando el texto posterior resulte ser cuerpo y no título.
    if (!direct.title || isStrongArticleDelimiter(direct.delimiter)) return direct;
    if (looksLikeProvisionTitle(direct.title) && !looksLikeReferenceTail(direct.title)) return direct;
  }
  const embedded = splitStructuralNameAndEmbeddedProvision(line);
  if (embedded) {
    const candidate = parseArticleCandidate(embedded.provision);
    if (candidate) return candidate;
  }
  return null;
}

function strongSourceArticleCandidateAt(lines, index) {
  const candidate = strongSourceArticleCandidate(lines[index]?.text || "");
  if (!candidate) return null;
  if (isStandaloneArticleCandidate(candidate) && standaloneArticleLooksOutOfOrder(lines, index, candidate)) return null;
  return candidate;
}

function splitDispositionTitleAndBody(text) {
  const t = cleanLine(text || "");
  if (!t) return { title: "", bodyPrefix: "" };

  // Una disposición puede no tener sumilla: “Primera.- Las disposiciones…”.
  // En ese caso el contenido empieza inmediatamente y no debe mostrarse como
  // parte del encabezado en negrita.
  if (/^(?:Las|Los|La|El|Todo|Toda|Todos|Todas|Esta|Este|Estos|Estas|En|Cuando|Para|Por|Se|Salvo|Hasta|De\s+conformidad|Con\s+arreglo|A\s+partir|Quedan|Constit[uú]yase|Decl[aá]rase|D[eé]jase|Der[oó]gase|Modif[ií]case|Incorp[oó]rase|Sustit[uú]yase|\(\s*\*?\s*\)\s*(?:Disposici[oó]n|Derogad))/i.test(t)) {
    return { title: "", bodyPrefix: t };
  }

  // En varios TUO de Word el título de la disposición y su primer párrafo
  // están en el mismo párrafo. Separamos solo cuando aparece un inicio de
  // oración inequívoco después de una sumilla razonable.
  const cueRe = /\s+(?=(?:Las|Los|La|El|En|Cuando|Tratándose|Tratandose|Excepcionalmente|Entiéndase|Entiendase|Precísase|Precisase|Sustitúyase|Sustituyase|Incorpórase|Incorporase|Modifícase|Modificase|Facúltese|Facultese|Mediante|Quedan|Lo\s+dispuesto|A\s+partir|Para\s+la|Para\s+el)\b)/g;
  let m;
  while ((m = cueRe.exec(t))) {
    const left = cleanLine(t.slice(0, m.index));
    const right = cleanLine(t.slice(m.index));
    if (left.split(/\s+/).length >= 2 && left.length <= 140 && right.length >= 20) {
      return { title: left, bodyPrefix: right };
    }
  }
  return { title: t, bodyPrefix: "" };
}

function analyzeDispositionHeading(lines, index, inSpecialSection) {
  const d = matchDisposition(lines[index].text, inSpecialSection);
  if (!d) return null;
  const split = d.bodyPrefix
    ? { title: "", bodyPrefix: d.bodyPrefix }
    : splitDispositionTitleAndBody(d.title);
  return {
    kind: "provision",
    type: d.type,
    number: d.number,
    title: split.title,
    bodyPrefix: split.bodyPrefix,
    endIndex: index
  };
}

function dispositionSpecialLabel(kind) {
  const upper = cleanLine(kind || "").toUpperCase();
  if (/TRANSITORIA/.test(upper)) return "DISPOSICIONES TRANSITORIAS";
  if (/DEROGATORIA/.test(upper)) return "DISPOSICIONES DEROGATORIAS";
  if (/MODIFICATORIA/.test(upper)) return "DISPOSICIONES MODIFICATORIAS";
  return "DISPOSICIONES FINALES";
}

function analyzeStandaloneDispositionHeading(line) {
  const t = cleanLine(line || "");
  if (!t) return null;

  // Variantes sin sumilla en la misma línea, frecuentes en leyes breves:
  // “ÚNICA DISPOSICIÓN COMPLEMENTARIA FINAL” o
  // “DISPOSICIÓN COMPLEMENTARIA TRANSITORIA ÚNICA”.
  let bare = t.match(/^([A-ZÁÉÍÓÚÜÑ ]+?)\s+DISPOSICI[ÓO]N\s+(COMPLEMENTARIA\s+)?(FINAL|TRANSITORIA|DEROGATORIA|MODIFICATORIA)$/i);
  if (bare && isDispositionOrdinal(bare[1])) {
    return {
      specialLabel: dispositionSpecialLabel(bare[3]),
      provision: { kind: "provision", type: "Disposición", number: titleCaseOrdinal(bare[1]), title: "", bodyPrefix: "", endIndex: null }
    };
  }
  bare = t.match(/^DISPOSICI[ÓO]N\s+(COMPLEMENTARIA\s+)?(FINAL|TRANSITORIA|DEROGATORIA|MODIFICATORIA)\s+([A-ZÁÉÍÓÚÜÑ ]+?)$/i);
  if (bare && isDispositionOrdinal(bare[3])) {
    return {
      specialLabel: dispositionSpecialLabel(bare[2]),
      provision: { kind: "provision", type: "Disposición", number: titleCaseOrdinal(bare[3]), title: "", bodyPrefix: "", endIndex: null }
    };
  }
  let m = t.match(/^([A-ZÁÉÍÓÚÜÑ ]+?)\s+DISPOSICI[ÓO]N\s+(COMPLEMENTARIA\s+)?(FINAL|TRANSITORIA|DEROGATORIA|MODIFICATORIA)\s*(?:\.-|[-–—:]|\.)\s*(.*)$/i);
  if (m && isDispositionOrdinal(m[1])) {
    const split = splitDispositionTitleAndBody(m[4] || "");
    return {
      specialLabel: dispositionSpecialLabel(m[3]),
      provision: { kind: "provision", type: "Disposición", number: titleCaseOrdinal(m[1]), title: split.title, bodyPrefix: split.bodyPrefix, endIndex: null }
    };
  }
  m = t.match(/^DISPOSICI[ÓO]N\s+(COMPLEMENTARIA\s+)?(FINAL|TRANSITORIA|DEROGATORIA|MODIFICATORIA)\s+([A-ZÁÉÍÓÚÜÑ ]+?)\s*(?:\.-|[-–—:]|\.)\s*(.*)$/i);
  if (m && isDispositionOrdinal(m[3])) {
    const split = splitDispositionTitleAndBody(m[4] || "");
    return {
      specialLabel: dispositionSpecialLabel(m[2]),
      provision: { kind: "provision", type: "Disposición", number: titleCaseOrdinal(m[3]), title: split.title, bodyPrefix: split.bodyPrefix, endIndex: null }
    };
  }
  return null;
}

function isFullyDerogatedProvision(provision, bodyItems = []) {
  if (!provision) return false;
  const title = cleanLine(provision.title || "").replace(/[.;:]+$/, "");
  if (/^(?:DEROGADO|DEROGADA)$/i.test(title)) return true;

  const bodyText = cleanLine((bodyItems || [])
    .map(item => item?.text || "")
    .filter(text => text && !/^\[\[LNE_/i.test(text))
    .join(" "));
  if (!bodyText || bodyText.length > 900) return false;

  // Solo notas que declaran que ESTA entrada ya fue derogada. No alcanza a
  // mandatos normativos como “quedan derogadas otras leyes”.
  return /^(?:derogad[oa](?:[.;:]|$)|derogad[oa]\s+(?:conforme|por|mediante|según|segun|a\s+partir)\b|(?:artículo|articulo|disposición(?:\s+complementaria|\s+transitoria)?|norma)\b.{0,90}\bderogad[oa](?:[.;:]|$|\s+(?:por|mediante|conforme)\b))/i.test(bodyText);
}

function isDerogationNoteText(text) {
  const t = cleanLine(text || "");
  if (!t || t.length > 1200) return false;
  return /^(?:derogad[oa](?:[.;:]|$)|derogad[oa]\s+(?:conforme|por|mediante|según|segun|a\s+partir)\b|(?:numeral|literal|inciso|párrafo|parrafo|apartado|disposición|disposicion|artículo|articulo|norma)\b.{0,120}\bderogad[oa](?:[.;:]|$|\s+(?:por|mediante|conforme|según|segun)\b))/i.test(t);
}

function shouldBreakParagraph(previousRawLine, nextRawLine, currentKind) {
  const prev = cleanLine(previousRawLine);
  const next = cleanLine(nextRawLine);
  if (!prev || !next) return false;
  if (matchListMarker(next)) return true;
  if (/[.:!?]$/.test(prev) && startsLikeBodySentence(next)) {
    // En listas preferimos conservar una segunda frase dentro del mismo inciso si la sangría aumenta.
    if (currentKind === "list" && rawIndent(nextRawLine) > rawIndent(previousRawLine)) return false;
    return true;
  }
  return false;
}

function tokenizeBody(bodyItems, diagnostics = null, provision = null) {
  const tokens = [];
  let current = null;
  let activeListContext = null;

  const provisionLabel = provision
    ? `${provision.type} ${provision.number}${provision.title ? ` — ${provision.title}` : ""}`
    : "entrada jurídica";

  const flush = () => {
    if (!current) return null;
    current.text = cleanLine(current.parts.join(" "));
    delete current.parts;
    if (current.text) tokens.push(current);
    const flushed = current;
    current = null;
    return flushed;
  };

  // En Word, un párrafo que continúa dentro de un literal suele tener una sangría
  // mayor que el propio marcador. Para listas de nivel superior exigimos una
  // diferencia clara (8 espacios virtuales) para no confundir párrafos generales.
  const isContinuationOfActiveList = (item) => {
    if (!activeListContext || !item?.text) return false;
    const parentIndent = Number(activeListContext.indent || 0);
    const delta = Number(item.indent || 0) - parentIndent;
    return parentIndent <= 0 ? delta >= 8 : delta >= 4;
  };

  const samePrefix = (a = [], b = []) => a.length === b.length && a.slice(0, -1).every((value, idx) => value === b[idx]);
  const isSiblingListMarker = (previous, nextInfo, nextIndent) => {
    if (!previous || !nextInfo || previous.kind !== nextInfo.kind) return false;
    if (Math.abs(Number(previous.indent || 0) - Number(nextIndent || 0)) > 2) return false;
    if (["number", "letter", "roman-upper", "roman-lower"].includes(previous.kind)) return true;
    if (previous.kind === "decimal") return samePrefix(previous.path || [], nextInfo.path || []);
    if (previous.kind === "article-decimal") return previous.articleKey === nextInfo.articleKey && samePrefix(previous.subpath || [], nextInfo.subpath || []);
    if (previous.kind === "alpha-decimal") return previous.alpha === nextInfo.alpha && samePrefix(previous.subpath || [], nextInfo.subpath || []);
    return false;
  };
  const nextNonBlankList = (fromIndex) => {
    for (let j = fromIndex + 1; j < bodyItems.length; j++) {
      const nextItem = bodyItems[j];
      if (!nextItem?.text) continue;
      if (/^\[\[LNE_TABLE_/.test(nextItem.text)) return null;
      const info = matchListMarker(nextItem.text);
      return info ? { info, indent: nextItem.indent } : null;
    }
    return null;
  };

  for (let i = 0; i <= bodyItems.length; i++) {
    const item = i < bodyItems.length
      ? bodyItems[i]
      : { raw: "", text: "", indent: 0, pageBreakBefore: false };
    const t = item.text;

    if (!t) {
      flush();
      // No borramos activeListContext: una línea en blanco entre párrafos dentro
      // del mismo literal/inciso no significa que haya terminado ese literal.
      continue;
    }

    if (t === "[[LNE_TABLE_START]]") {
      flush();
      activeListContext = null;
      const rows = [];
      for (i = i + 1; i < bodyItems.length; i++) {
        const rowText = bodyItems[i].text;
        if (rowText === "[[LNE_TABLE_END]]") break;
        if (rowText.startsWith("[[LNE_TABLE_ROW]]")) {
          try {
            const row = JSON.parse(rowText.slice("[[LNE_TABLE_ROW]]".length));
            if (Array.isArray(row)) rows.push(row.map(cell => cleanLine(cell)));
          } catch (_) {}
        }
      }
      if (rows.length) {
        tokens.push({ type: "table", rows });
        if (diagnostics) diagnostics.tablesDetected = (diagnostics.tablesDetected || 0) + 1;
      }
      continue;
    }

    let lm = matchListMarker(t);
    const decimalReferenceContinuation = !!(lm && isLikelyDecimalReference(lm, provision));
    if (decimalReferenceContinuation) lm = null;

    if (lm) {
      const listHistory = tokens.filter(token => token.type === "list");
      if (current?.type === "list") listHistory.push(current);
      const previousListToken = listHistory.length ? listHistory[listHistory.length - 1] : null;
      lm = resolveAmbiguousRomanListMarker(lm, previousListToken, listHistory);
      flush();
      current = {
        type: "list",
        marker: lm.marker,
        kind: lm.kind,
        width: lm.width,
        indent: item.indent,
        major: lm.major,
        minor: lm.minor,
        path: lm.path,
        articleKey: lm.articleKey,
        subpath: lm.subpath,
        alpha: lm.alpha,
        romanStyle: lm.romanStyle,
        parts: [lm.text]
      };
      activeListContext = current;
      continue;
    }

    // Caso real frecuente en TUO: el texto de un literal termina en una línea de
    // Word sin puntuación y continúa en otro párrafo con sangría. Lo unimos al
    // mismo literal en vez de crear un párrafo falso ("Estos requisitos son" +
    // "de carácter concurrente.").
    if (!current && isContinuationOfActiveList(item) && activeListContext?.type === "list") {
      if (activeListContext.text != null && !/[.!?;:]\s*$/.test(activeListContext.text)) {
        activeListContext.text = cleanLine(`${activeListContext.text} ${t}`);
        continue;
      }
      current = {
        type: "paragraph",
        indent: item.indent,
        continuationOf: activeListContext.marker,
        continuationWidth: activeListContext.width || 35,
        parts: [t]
      };
      continue;
    }

    if (!current && activeListContext?.type === "list") {
      const upcoming = nextNonBlankList(i);
      if (upcoming && isSiblingListMarker(activeListContext, upcoming.info, upcoming.indent)) {
        current = {
          type: "paragraph",
          indent: item.indent,
          continuationOf: activeListContext.marker,
          continuationWidth: activeListContext.width || 35,
          parts: [t]
        };
        continue;
      }
    }

    if (!current) {
      // También repara párrafos falsos del DOCX cuando una misma oración fue
      // partida en dos párrafos con la misma sangría (ej.: “noventa” + “(90) días…”).
      const previousToken = tokens.length ? tokens[tokens.length - 1] : null;
      if (previousToken?.type === "paragraph" && Number(previousToken.indent || 0) === Number(item.indent || 0) && !/[.!?;:]\s*$/.test(previousToken.text || "")) {
        previousToken.text = cleanLine(`${previousToken.text} ${t}`);
        continue;
      }

      // Si la sangría ya volvió al nivel general, terminó el literal anterior.
      activeListContext = null;
      current = { type: "paragraph", indent: item.indent, parts: [t] };
      continue;
    }

    const prevItem = bodyItems[i - 1] || { raw: "", text: "", indent: 0 };
    const prevRaw = prevItem.raw || "";
    const breakParagraph = decimalReferenceContinuation ? false : shouldBreakParagraph(prevRaw, item.raw, current.type);

    if (item.pageBreakBefore && diagnostics) {
      diagnostics.pageBreaksInsideProvisions++;
      if (!breakParagraph) {
        diagnostics.pageContinuations.push({
          provision: provisionLabel,
          before: cleanLine(prevItem.text || "").slice(-90),
          after: t.slice(0, 90)
        });
      } else {
        diagnostics.pageParagraphBoundaries++;
      }
    }

    if (breakParagraph) {
      flush();
      const continuation = isContinuationOfActiveList(item);
      current = {
        type: "paragraph",
        indent: item.indent,
        continuationOf: continuation ? activeListContext?.marker : undefined,
        continuationWidth: continuation ? (activeListContext?.width || 35) : undefined,
        parts: [t]
      };
      if (!continuation) activeListContext = null;
    } else {
      current.parts.push(t);
    }
  }

  return tokens;
}

function paragraphDiv(text, last = false, margin = 15, left = 0, derogated = false) {
  const mb = last ? "" : `margin-bottom: ${margin}px; `;
  const ml = left > 0 ? `margin-left: ${left}px; ` : "";
  const dg = derogated ? "color: #777; font-style: italic; " : "";
  return `<div style="${mb}${ml}text-align: justify; line-height: 1.5; ${dg}">\n  ${escapeHtml(text)}\n</div>`;
}

function derogatedParagraphDiv(text, last = false) {
  const mb = last ? "" : "margin-bottom: 15px; ";
  return `<div style="${mb}text-align: justify; line-height: 1.5; color: #777; font-style: italic;">\n  ${escapeHtml(text)}\n</div>`;
}

function legalListTextHtml(text) {
  const value = cleanLine(text);
  // Denominaciones jurídicas internas: “Legalidad.-”, “Razonabilidad.-”, etc.
  // Se reconstruyen en negrita aunque el extractor DOCX entregue solo texto.
  const namedItem = value.match(/^([^.!?;:]{1,100}\.\-)\s*(.+)$/);
  if (!namedItem) return escapeHtml(value);
  return `<strong>${escapeHtml(namedItem[1])}</strong>${namedItem[2] ? ` ${escapeHtml(namedItem[2])}` : ""}`;
}

function tableDiv(rows, last = false) {
  if (!Array.isArray(rows) || !rows.length) return "";
  const mb = last ? "" : "margin-bottom: 15px; ";
  const body = rows.map((row, rowIndex) => {
    const tag = rowIndex === 0 ? "th" : "td";
    const cells = row.map(cell => `    <${tag} style="border: 1px solid #555; padding: 7px 8px; text-align: left; vertical-align: top;">${escapeHtml(cell)}</${tag}>`).join("\n");
    return `  <tr>\n${cells}\n  </tr>`;
  }).join("\n");
  return `<div style="${mb}overflow-x: auto;">\n<table style="width: 100%; border-collapse: collapse; line-height: 1.35;">\n${body}\n</table>\n</div>`;
}

function listDiv(item, last = false, level = 0, derogated = false, left = 0) {
  const nested = level > 0;
  const mb = last ? "" : `margin-bottom: ${nested ? 5 : 10}px; `;
  const ml = left > 0 ? `margin-left: ${left}px; ` : "";
  const width = item.width || 35;
  const textHtml = derogated ? escapeHtml(item.text) : legalListTextHtml(item.text);
  const textStyle = derogated ? ' style="color: #777; font-style: italic;"' : "";
  return `<div data-lne-list="1" data-lne-level="${level}" data-lne-kind="${escapeHtml(item.kind || "list")}" style="display: flex; ${mb}${ml}line-height: 1.5; text-align: justify;">
  <span data-lne-marker="1" style="min-width: ${width}px; flex: 0 0 ${width}px;">${escapeHtml(item.marker)}</span>
  <div${textStyle}>${textHtml}</div>
</div>`;
}

function listMarkerValue(token) {
  if (token.kind === "number") {
    const m = token.marker.match(/^(\d+)/);
    return m ? Number(m[1]) : null;
  }
  if (token.kind === "letter") {
    const letter = token.marker.charAt(0).toLowerCase();
    if (letter === "ñ") return null;
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const idx = alphabet.indexOf(letter);
    return idx >= 0 ? idx + 1 : null;
  }
  if (token.kind === "roman-upper" || token.kind === "roman-lower") {
    const raw = token.marker.replace(/[().]/g, "");
    return validRomanListValue(raw);
  }
  return null;
}

function sequenceMarkerForValue(kind, value) {
  if (kind === "letter") {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return `${alphabet[value - 1] || "?"})`;
  }
  if (kind === "roman-upper") return `${intToRoman(value)}.`;
  if (kind === "roman-lower") return `${intToRoman(value).toLowerCase()}.`;
  return `${value}.`;
}

function analyzeListSequences(tokens, provision, diagnostics) {
  if (!diagnostics || !provision) return;

  const label = `${provision.type} ${provision.number}`;

  for (const kind of ["letter", "number", "roman-upper", "roman-lower"]) {
    const items = tokens
      .filter(token => token.type === "list" && token.kind === kind)
      .map(token => ({ marker: token.marker, value: listMarkerValue(token) }))
      .filter(x => x.value != null);

    const values = [...new Set(items.map(x => x.value))].sort((a, b) => a - b);
    if (values.length < 2) continue;

    if ((kind === "letter" || kind.startsWith("roman-")) && values[0] > 1) {
      const firstMarker = items.find(x => x.value === values[0])?.marker || "";
      const labelType = kind === "letter" ? "literales" : "acápites romanos";
      diagnostics.sequenceWarnings.push(
        `${label}: aparecen ${labelType} desde ${firstMarker}, pero no se detectó el inicio de la secuencia. Revisar el documento fuente.`
      );
      continue;
    }

    if (values[0] === 1) {
      const missing = [];
      for (let expected = 1; expected <= values[values.length - 1]; expected++) {
        if (!values.includes(expected)) missing.push(expected);
      }
      if (missing.length) {
        const missingLabels = missing.map(v => sequenceMarkerForValue(kind, v));
        diagnostics.sequenceWarnings.push(
          `${label}: posible secuencia incompleta; no se detectó ${missingLabels.join(", ")}. Revisar el documento fuente.`
        );
      }
    }
  }
}

function analyzeHierarchicalSubSequences(tokens, provision, diagnostics) {
  if (!diagnostics || !provision) return;
  const label = `${provision.type} ${provision.number}`;
  const decimalGroups = new Map();
  const alphaGroups = new Map();
  const articleDecimalGroups = new Map();

  for (const token of tokens) {
    if (token.type !== "list") continue;
    if (token.kind === "decimal" && Array.isArray(token.path) && token.path.length >= 2) {
      const prefix = token.path.slice(0, -1).join(".");
      const minor = token.path[token.path.length - 1];
      if (!decimalGroups.has(prefix)) decimalGroups.set(prefix, []);
      decimalGroups.get(prefix).push(minor);
    }
    if (token.kind === "alpha-decimal" && token.alpha && Number.isInteger(token.minor)) {
      if (!alphaGroups.has(token.alpha)) alphaGroups.set(token.alpha, []);
      alphaGroups.get(token.alpha).push(token.minor);
    }
    if (token.kind === "article-decimal" && token.articleKey && Array.isArray(token.subpath) && token.subpath.length) {
      const suffix = token.subpath.slice(0, -1);
      const prefix = [token.articleKey, ...suffix].join(".");
      const minor = token.subpath[token.subpath.length - 1];
      if (!articleDecimalGroups.has(prefix)) articleDecimalGroups.set(prefix, []);
      articleDecimalGroups.get(prefix).push(minor);
    }
  }

  const inspect = (groups, formatter) => {
    for (const [prefix, rawValues] of groups.entries()) {
      const values = [...new Set(rawValues)].sort((a,b) => a-b);
      if (values.length < 2 || values[0] !== 1) continue;
      const missing = [];
      for (let n=1; n<=values[values.length-1]; n++) if (!values.includes(n)) missing.push(n);
      if (missing.length) diagnostics.sequenceWarnings.push(`${label}: posible secuencia incompleta; no se detectó ${missing.map(n => formatter(prefix,n)).join(", ")}. Revisar el documento fuente.`);
    }
  };

  inspect(decimalGroups, (p,n) => `${p}.${n}`);
  inspect(alphaGroups, (p,n) => `${p}.${n}`);
  inspect(articleDecimalGroups, (p,n) => `${p}.${n}`);
}

function listNestingLevel(token, state) {
  const lastKind = state.lastKind;

  if (token.kind === "number") {
    // Un numeral puede ser hijo de un acápite romano que termina en dos puntos.
    // Ej.: iv. ... respecto a:  1. ...  2. ...  v. ...
    const underLowerRoman = state.romanLowerLevel != null &&
      (state.numberUnderLowerRoman || (lastKind === "roman-lower" && state.lastRomanLowerEndsColon));
    const underUpperRoman = state.romanUpperLevel != null && state.romanLowerLevel == null &&
      (state.numberUnderUpperRoman || (lastKind === "roman-upper" && state.lastRomanUpperEndsColon));
    const underArticleDecimal = state.articleDecimalLevel != null &&
      (state.numberUnderArticleDecimal || (lastKind === "article-decimal" && state.lastArticleDecimalEndsColon));
    const underDecimal = state.decimalLevel != null &&
      (state.numberUnderDecimal || (lastKind === "decimal" && state.lastDecimalEndsColon));

    if (underArticleDecimal) {
      state.numberUnderArticleDecimal = true;
      state.lastKind = "number";
      return state.articleDecimalLevel + 1;
    }

    if (underDecimal) {
      state.numberUnderDecimal = true;
      state.lastKind = "number";
      return state.decimalLevel + 1;
    }

    if (underLowerRoman) {
      state.numberUnderLowerRoman = true;
      state.lastKind = "number";
      return state.romanLowerLevel + 1;
    }
    if (underUpperRoman) {
      state.numberUnderUpperRoman = true;
      state.lastKind = "number";
      return state.romanUpperLevel + 1;
    }

    state.primaryKind = "number";
    state.letterLevel = null;
    state.romanUpperLevel = null;
    state.romanLowerLevel = null;
    state.alphaDecimalLevel = null;
    state.numberUnderLowerRoman = false;
    state.numberUnderUpperRoman = false;
    state.articleDecimalLevel = null;
    state.numberUnderArticleDecimal = false;
    state.decimalLevel = null;
    state.decimalMajor = null;
    state.decimalBaseOffset = 0;
    state.numberUnderDecimal = false;
    state.lastNumberValue = listMarkerValue(token);
    state.lastKind = "number";
    return 0;
  }

  if (token.kind === "dash") {
    state.primaryKind = token.kind;
    state.letterLevel = null;
    state.romanUpperLevel = null;
    state.romanLowerLevel = null;
    state.alphaDecimalLevel = null;
    state.numberUnderLowerRoman = false;
    state.numberUnderUpperRoman = false;
    state.articleDecimalLevel = null;
    state.numberUnderArticleDecimal = false;
    state.lastKind = token.kind;
    return 0;
  }

  if (token.kind === "article-decimal") {
    state.primaryKind = "article-decimal";
    state.letterLevel = null;
    state.romanUpperLevel = null;
    state.romanLowerLevel = null;
    state.alphaDecimalLevel = null;
    state.numberUnderLowerRoman = false;
    state.numberUnderUpperRoman = false;
    state.articleDecimalLevel = Array.isArray(token.subpath) ? Math.max(0, token.subpath.length - 1) : 0;
    state.lastArticleDecimalEndsColon = /:\s*$/.test(token.text || "");
    state.numberUnderArticleDecimal = false;
    state.decimalLevel = null;
    state.decimalMajor = null;
    state.decimalBaseOffset = 0;
    state.numberUnderDecimal = false;
    state.lastKind = "article-decimal";
    return state.articleDecimalLevel;
  }

  if (token.kind === "decimal") {
    const path = Array.isArray(token.path) ? token.path : [];
    const major = path.length ? path[0] : null;
    const parentNumberMatches = lastKind === "number" && state.lastNumberValue != null && state.lastNumberValue === major;
    if (state.decimalMajor !== major) {
      state.decimalMajor = major;
      state.decimalBaseOffset = parentNumberMatches ? 1 : 0;
    }
    const level = Math.max(0, path.length - 2) + Number(state.decimalBaseOffset || 0);
    state.primaryKind = "decimal";
    state.letterLevel = null;
    state.romanUpperLevel = null;
    state.romanLowerLevel = null;
    state.alphaDecimalLevel = null;
    state.numberUnderLowerRoman = false;
    state.numberUnderUpperRoman = false;
    state.articleDecimalLevel = null;
    state.numberUnderArticleDecimal = false;
    state.decimalLevel = level;
    state.lastDecimalEndsColon = /:\s*$/.test(token.text || "");
    state.numberUnderDecimal = false;
    state.lastKind = "decimal";
    return level;
  }

  if (token.kind === "letter") {
    state.romanUpperLevel = null;
    state.romanLowerLevel = null;
    state.alphaDecimalLevel = null;
    state.numberUnderLowerRoman = false;
    state.numberUnderUpperRoman = false;
    if (state.primaryKind === "number" || state.primaryKind === "decimal" || state.primaryKind === "article-decimal") {
      const parentLevel = state.primaryKind === "decimal"
        ? Number(state.decimalLevel || 0)
        : (state.primaryKind === "article-decimal" ? Number(state.articleDecimalLevel || 0) : 0);
      state.letterLevel = parentLevel + 1;
      state.lastKind = "letter";
      return state.letterLevel;
    }
    state.primaryKind = "letter";
    state.letterLevel = 0;
    state.lastKind = "letter";
    return 0;
  }

  if (token.kind === "alpha-decimal") {
    const baseLevel = state.letterLevel != null ? state.letterLevel + 1 : 1;
    const extraDepth = Array.isArray(token.subpath) ? Math.max(0, token.subpath.length - 1) : 0;
    const level = baseLevel + extraDepth;
    state.alphaDecimalLevel = level;
    state.romanUpperLevel = null;
    state.romanLowerLevel = null;
    state.numberUnderLowerRoman = false;
    state.numberUnderUpperRoman = false;
    state.lastKind = "alpha-decimal";
    return level;
  }

  if (token.kind === "roman-upper") {
    const level = state.alphaDecimalLevel != null
      ? state.alphaDecimalLevel + 1
      : (state.letterLevel != null ? state.letterLevel + 1 : (state.primaryKind ? 1 : 0));
    state.romanUpperLevel = level;
    state.romanLowerLevel = null;
    state.lastRomanUpperEndsColon = /:\s*$/.test(token.text || "");
    state.numberUnderUpperRoman = false;
    state.numberUnderLowerRoman = false;
    state.lastKind = "roman-upper";
    return level;
  }

  if (token.kind === "roman-lower") {
    let level;
    // Si venimos de numerales subordinados a un romano inferior, retomamos el mismo nivel.
    if (state.romanLowerLevel != null && state.numberUnderLowerRoman) {
      level = state.romanLowerLevel;
    } else if (state.romanUpperLevel != null) {
      level = state.romanUpperLevel + 1;
    } else if (state.alphaDecimalLevel != null) {
      level = state.alphaDecimalLevel + 1;
    } else if (state.letterLevel != null) {
      level = state.letterLevel + 1;
    } else {
      level = state.primaryKind ? 1 : 0;
    }
    state.romanLowerLevel = level;
    state.lastRomanLowerEndsColon = /:\s*$/.test(token.text || "");
    state.numberUnderLowerRoman = false;
    state.lastKind = "roman-lower";
    return level;
  }

  state.lastKind = token.kind;
  return 0;
}

function formatBody(bodyItems, diagnostics = null, provision = null, options = {}) {
  const tokens = tokenizeBody(bodyItems, diagnostics, provision);
  if (!tokens.length) return { html: "", plain: "", tokens: [] };

  analyzeListSequences(tokens, provision, diagnostics);
  analyzeHierarchicalSubSequences(tokens, provision, diagnostics);

  const hasList = tokens.some(t => t.type === "list");
  const plain = tokens.map(t => t.type === "list" ? `${t.marker} ${t.text}` : (t.type === "table" ? t.rows.map(r => r.join(" | ")).join("\n") : t.text)).join("\n\n");

  if (options.derogated) {
    const html = tokens.map((token, i) => {
      const text = token.type === "list" ? `${token.marker} ${token.text}` : (token.type === "table" ? token.rows.map(r => r.join(" | ")).join(" / ") : token.text);
      return derogatedParagraphDiv(text, i === tokens.length - 1);
    }).join("\n");
    return { html, plain, tokens };
  }

  const htmlParts = [];
  let lastListVisual = null;
  // Jerarquía visual: cada hijo empieza exactamente donde empieza el texto de
  // su padre. Ej.: 106.1 -> a. -> (i), con sangría acumulativa real.
  const visualLevelOffsets = [];
  const visualLevelWidths = [];
  const nestingState = {
    primaryKind: null,
    letterLevel: null,
    romanUpperLevel: null,
    romanLowerLevel: null,
    alphaDecimalLevel: null,
    articleDecimalLevel: null,
    decimalLevel: null,
    decimalMajor: null,
    decimalBaseOffset: 0,
    lastNumberValue: null,
    numberUnderDecimal: false,
    lastDecimalEndsColon: false,
    numberUnderLowerRoman: false,
    numberUnderUpperRoman: false,
    numberUnderArticleDecimal: false,
    lastRomanLowerEndsColon: false,
    lastRomanUpperEndsColon: false,
    lastArticleDecimalEndsColon: false,
    lastKind: null
  };
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const last = i === tokens.length - 1;
    if (token.type === "paragraph") {
      const margin = hasList && i === 0 ? 10 : 15;
      let left = 0;
      if (token.continuationOf && lastListVisual) {
        left = Number(lastListVisual.left || 0) + (token.continuationWidth || lastListVisual.width || 35);
        token.continuationMargin = left;
      }
      const partialDerogation = isDerogationNoteText(token.text);
      if (partialDerogation && diagnostics) diagnostics.partialDerogationNotes = (diagnostics.partialDerogationNotes || 0) + 1;
      htmlParts.push(paragraphDiv(token.text, last, margin, left, partialDerogation));
      continue;
    }
    if (token.type === "table") {
      htmlParts.push(tableDiv(token.rows, last));
      continue;
    }

    const level = listNestingLevel(token, nestingState);
    token.level = level;
    const width = token.width || 35;
    let left = 0;
    if (level > 0) {
      const parentLevel = level - 1;
      const parentOffset = Number(visualLevelOffsets[parentLevel] || 0);
      const parentWidth = Number(visualLevelWidths[parentLevel] || 0) || 35;
      left = parentOffset + parentWidth;
    }
    visualLevelOffsets[level] = left;
    visualLevelWidths[level] = width;
    visualLevelOffsets.length = level + 1;
    visualLevelWidths.length = level + 1;
    token.visualLeft = left;
    lastListVisual = { marker: token.marker, level, width, left };
    const partialDerogation = isDerogationNoteText(token.text);
    if (partialDerogation && diagnostics) diagnostics.partialDerogationNotes = (diagnostics.partialDerogationNotes || 0) + 1;
    htmlParts.push(listDiv(token, last, level, partialDerogation, left));
  }

  return { html: htmlParts.join("\n"), plain, tokens };
}

function formatMajorHierarchy(parts) {
  if (!parts.length) return "";
  const rows = [];
  const single = parts.length === 1;
  parts.forEach((part, idx) => {
    const isTitle = /^TÍTULO\b/.test(part.label);
    let topMargin = "";
    let bottom = 10;

    if (single && isTitle) {
      topMargin = "margin-top: 30px; ";
      bottom = 15;
    } else if (!single && idx > 0) {
      topMargin = "margin-top: 30px; ";
      bottom = isTitle ? 5 : 15;
    }

    const style = topMargin ? `text-align: center; ${topMargin.trim()}` : "text-align: center;";
    rows.push(`<div style="${style}">\n  <div style="margin-bottom: ${bottom}px;">${escapeHtml(part.label)}</div>${part.name ? `\n  <div>${escapeHtml(part.name)}</div>` : ""}\n</div>`);
  });
  return rows.join("\n");
}

function formatSubheading(part) {
  if (!part) return "";
  return `<div style="text-align: center; margin-top: 30px;">\n  <div style="margin-bottom: 15px;">${escapeHtml(part.label)}</div>${part.name ? `\n  <div>${escapeHtml(part.name)}</div>` : ""}\n</div>`;
}

function formatSpecialTitle(label) {
  return `<div style="text-align: center; margin-top: 30px;">\n  <div style="margin-bottom: 15px;">${escapeHtml(label)}</div>\n</div>`;
}

function formatDocumentHeader(lines) {
  const clean = (lines || []).map(cleanLine).filter(Boolean);
  if (!clean.length) return "";
  const rows = clean.map((line, index) => {
    const weight = index === 0 ? 700 : 600;
    const size = index === 0 ? "1.05rem" : ".98rem";
    return `  <div style="font-size: ${size}; font-weight: ${weight}; line-height: 1.45; margin-bottom: ${index === clean.length - 1 ? 0 : 5}px;">${escapeHtml(line)}</div>`;
  });
  return `<div data-lne-document-header="1" style="text-align: center; margin: 0 0 34px;">\n${rows.join("\n")}\n</div>`;
}

function wrapPlainMajorHeading(value) {
  const text = cleanLine(value);
  if (!text) return "";
  return `<div style="text-align: center; margin-top: 30px;">\n  <div>${escapeHtml(text)}</div>\n</div>`;
}

function isDispositionContainerTitle(titleStruct) {
  const name = cleanLine(titleStruct?.name || "").toUpperCase();
  if (!name) return false;
  const words = name.replace(/[,;]+/g, " ").split(/\s+/).filter(Boolean);
  const allowed = new Set(["DISPOSICIONES", "COMPLEMENTARIAS", "FINALES", "TRANSITORIAS", "DEROGATORIAS", "MODIFICATORIAS", "Y", "E"]);
  return words.includes("DISPOSICIONES") && words.every(word => allowed.has(word));
}

function serializeString(value) {
  return JSON.stringify(String(value || ""));
}

function serializeTemplate(value) {
  return "`" + escapeTemplate(String(value || "")) + "`";
}

function collapseArticleSequence(numbers) {
  if (!numbers.length) return "";
  const base = numbers.filter(n => /^\d+$/.test(n)).map(Number).sort((a, b) => a - b);
  const special = numbers.filter(n => /^\d+-[A-ZÑ]+$/.test(n));
  const roman = numbers.filter(n => /^[IVXLCDM]+$/.test(n));
  const named = numbers.filter(n => !/^\d+$/.test(n) && !/^\d+-[A-ZÑ]+$/.test(n) && !/^[IVXLCDM]+$/.test(n));

  const parts = [];
  if (base.length) {
    const ranges = [];
    let start = base[0], prev = base[0];
    for (let i = 1; i <= base.length; i++) {
      const n = base[i];
      if (n === prev + 1) { prev = n; continue; }
      ranges.push(start === prev ? String(start) : `${start}–${prev}`);
      start = n; prev = n;
    }
    parts.push(ranges.join(", "));
  }
  if (special.length) parts.push(special.join(", "));
  if (roman.length) parts.push(roman.join(", "));
  if (named.length) parts.push(named.join(", "));
  return parts.join(" + ");
}

function convertLegalText(inputText, requestedVariableName, options = {}) {
  const variableName = normalizeVariableName(requestedVariableName);
  const accentNormalization = normalizeHeadingAccentsInText(inputText);
  const lines = preprocessLines(accentNormalization.text, {
    preserveStandaloneNumbers: !!options?.extractionHints?.pdfPrepared
  });
  const hintedBoldSet = new Set((options?.extractionHints?.boldStandaloneParagraphs || []).map(cleanLine).filter(Boolean));

  // Conserva TODO el encabezado documental previo a la primera estructura jurídica
  // (p. ej. TUO / Decreto Supremo / Ley / Reglamento). Antes se descartaba porque
  // aún no existía un artículo activo. Se mantiene de forma genérica para cualquier
  // código, TUO, decreto o reglamento.
  let firstLegalAnchorIndex = lines.length;
  for (let headerIndex = 0; headerIndex < lines.length; headerIndex++) {
    const headerLine = cleanLine(lines[headerIndex]?.text || "");
    if (!headerLine || headerLine === "[[LNE_PAGE_BREAK]]") continue;
    const isAnchor = !!matchStructural(headerLine)
      || !!analyzeStandaloneDispositionHeading(headerLine)
      || !!analyzeNormHeading(lines, headerIndex)
      || !!strongSourceArticleCandidateAt(lines, headerIndex);
    if (isAnchor) { firstLegalAnchorIndex = headerIndex; break; }
  }
  const documentHeaderLines = lines
    .slice(0, firstLegalAnchorIndex)
    .map(item => cleanLine(item?.text || ""))
    .filter(line => line && line !== "[[LNE_PAGE_BREAK]]");

  const sourceArticleHeadingNumbers = [...new Set(lines
    .map((item, index) => strongSourceArticleCandidateAt(lines, index)?.number)
    .filter(Boolean))];

  // Auditoría paralela para LIBRO / TÍTULO / CAPÍTULO / SUBCAPÍTULO / SECCIÓN.
  // Sirve para descubrir futuras variantes reales sin tener que detectar el fallo
  // visualmente después de convertir cientos de artículos.
  const structuralSourceLines = lines
    .map(item => cleanLine(item?.text || ""))
    .filter(Boolean);
  const sourceStructuralHeadingCandidates = [...new Set(structuralSourceLines
    .filter(line => matchStructural(line) || looksLikeStructuralHeadingCandidate(line)))];
  const missingSourceStructuralHeadings = [...new Set(structuralSourceLines
    .filter(looksLikeStructuralHeadingCandidate)
    .filter(line => !matchStructural(line)))];

  const diagnostics = {
    ignoredArticleReferences: [],
    pageBreaksInsideProvisions: 0,
    pageParagraphBoundaries: 0,
    pageContinuations: [],
    sequenceWarnings: [],
    tablesDetected: 0,
    articleReferencesInsideDispositions: [],
    lateStructuralHeadings: 0,
    partialDerogationNotes: 0,
    articleLeadHeadings: 0,
    documentHeaderLines: documentHeaderLines.length,
    sourceArticleHeadingNumbers,
    missingSourceArticleHeadings: [],
    sourceStructuralHeadingCandidates,
    missingSourceStructuralHeadings
  };
  const warnings = [];
  const notes = [];
  const groups = [];

  const state = {
    book: null,
    title: null,
    subheading: null,
    pendingSubheadings: [],
    pendingSectionBeforeTitle: null,
    titlePreface: null,
    special: null,
    prelimCompanion: "",
    structuralNote: "",
    majorVersion: 0,
    subVersion: 0
  };

  let currentGroup = null;
  let currentProvision = null;
  let bodyItems = [];
  let lastRenderedBookKey = "";
  let lastRenderedTitleKey = "";
  let lastRenderedSubKey = "";
  let renderedPrelim = false;
  let specialSheetStarted = false;
  let pendingArticleLeadHeading = "";

  const majorParts = () => [state.book, state.title].filter(Boolean);

  const startGroupIfNeeded = () => {
    if (currentGroup) return currentGroup;

    const isPrelim = state.title?.label === "TÍTULO PRELIMINAR" && !state.book;
    const bookKey = state.book ? `${state.book.label}|${state.book.name || ""}` : "";
    const titleKey = state.title ? `${state.title.label}|${state.title.name || ""}` : "";
    const subKey = state.subheading ? `${state.subheading.label}|${state.subheading.name || ""}` : "";

    const bookChanged = !!state.book && bookKey !== lastRenderedBookKey;
    const titleChanged = !!state.title && titleKey !== lastRenderedTitleKey;
    const subChanged = !!state.subheading && subKey !== lastRenderedSubKey;
    const prelimChanged = isPrelim && !renderedPrelim;

    let renderMajorParts = [];
    if (!isPrelim) {
      if (bookChanged) renderMajorParts = [state.book, state.title].filter(Boolean).map(x => ({ ...x }));
      else if (titleChanged) renderMajorParts = [state.title].filter(Boolean).map(x => ({ ...x }));
    }

    currentGroup = {
      isPrelim,
      majorParts: majorParts().map(x => ({ ...x })),
      renderMajorParts,
      subheading: state.subheading ? { ...state.subheading } : null,
      renderSubheadings: state.pendingSubheadings.map(part => ({ ...part })),
      renderTitlePreface: state.titlePreface ? { ...state.titlePreface } : null,
      special: state.special ? { ...state.special } : null,
      prelimCompanion: state.prelimCompanion,
      structuralNote: state.structuralNote || "",
      majorChanged: bookChanged || titleChanged || prelimChanged || !!state.special,
      bookChanged,
      titleChanged,
      prelimChanged,
      subChanged,
      // Todas las Disposiciones Finales/Transitorias comparten una misma hoja lógica.
      // Solo la primera sección especial inicia nueva hoja.
      nuevaHoja: state.special ? !specialSheetStarted : (bookChanged ? true : (prelimChanged ? false : undefined)),
      articles: []
    };
    groups.push(currentGroup);
    state.pendingSubheadings = [];
    state.pendingSectionBeforeTitle = null;
    state.titlePreface = null;
    if (state.special) specialSheetStarted = true;

    if (state.book) lastRenderedBookKey = bookKey;
    if (state.title) lastRenderedTitleKey = titleKey;
    if (state.subheading) lastRenderedSubKey = subKey;
    if (prelimChanged) renderedPrelim = true;

    return currentGroup;
  };

  const flushProvision = () => {
    if (!currentProvision) return;
    const group = startGroupIfNeeded();
    const derogado = isFullyDerogatedProvision(currentProvision, bodyItems);
    const body = formatBody(bodyItems, diagnostics, currentProvision, { derogated: derogado });
    const simplePrelimText = group.isPrelim && !derogado && body.tokens.length === 1 && body.tokens[0]?.type === "paragraph";
    group.articles.push({
      tipo: currentProvision.type,
      numero: currentProvision.number,
      titulo: currentProvision.title || "",
      leadHeading: currentProvision.leadHeading || "",
      textoHtml: body.html,
      textoPlain: body.plain,
      simpleText: simplePrelimText,
      derogado,
      tokens: body.tokens
    });
    currentProvision = null;
    bodyItems = [];
  };

  const closeGroup = () => {
    flushProvision();
    currentGroup = null;
  };

  const captureStructuralName = (struct, startIndex, allowTitleCaseName = false) => {
    if (struct.name) return { struct, endIndex: startIndex };
    const next = nextNonBlank(lines, startIndex + 1);
    if (!next) return { struct, endIndex: startIndex };
    const t = next.item.text;

    // Algunos DOCX fusionan el nombre del CAPÍTULO/SUBCAPÍTULO con el encabezado
    // del artículo siguiente en un solo párrafo: “Iniciación del procedimiento Artículo 103.- ...”.
    // Separamos ambos sin tocar referencias ordinarias dentro del cuerpo.
    const fused = splitStructuralNameAndEmbeddedProvision(t);
    if (fused) {
      struct.name = fused.name;
      lines[next.index] = { ...next.item, raw: fused.provision, text: fused.provision };
      return { struct, endIndex: startIndex };
    }

    const nextStructural = matchStructural(t);
    // En algunas leyes un TÍTULO tiene como nombre una sección de Disposiciones:
    // TÍTULO VII / DISPOSICIONES COMPLEMENTARIAS, TRANSITORIAS Y DEROGATORIAS.
    // Conservamos TÍTULO VII como jerarquía y usamos la línea siguiente como su nombre,
    // en vez de reemplazarlo por una sección especial aislada.
    if (struct.type === "title" && nextStructural?.type === "special") {
      struct.name = nextStructural.label;
      return { struct, endIndex: next.index };
    }
    if (nextStructural || analyzeNormHeading(lines, next.index) || analyzeArticleHeading(lines, next.index, { ignoredArticleReferences: [] }) || isListStart(t)) {
      return { struct, endIndex: startIndex };
    }
    if (isAllCapsHeading(t)) {
      // TÍTULO PRELIMINAR: la línea siguiente puede ser "PRINCIPIOS GENERALES".
      struct.name = t;
      return { struct, endIndex: next.index };
    }
    if (allowTitleCaseName && t.length <= 160 && t.split(/\s+/).length <= 18 && !/[.;:!?]$/.test(t)) {
      const trailing = t.match(/^(.*?)\s+((?:CAP[ÍI]TULO|SUBCAP[ÍI]TULO|SECCI[ÓO]N)\s+(?:[IVXLCDM]+(?:-[A-Z])?|\d+(?:-[A-Z])?|ÚNICO|UNICO))$/i);
      if (trailing) {
        struct.name = cleanLine(trailing[1]);
        const subheading = matchStructural(trailing[2]);
        const following = nextNonBlank(lines, next.index + 1);
        if (subheading && following) {
          const followingText = following.item.text;
          if (followingText.length <= 140 && followingText.split(/\s+/).length <= 16 && !/[.;:!?]$/.test(followingText) && !matchStructural(followingText) && !isListStart(followingText)) {
            subheading.name = followingText;
            struct.trailingSubheading = subheading;
            return { struct, endIndex: following.index };
          }
          struct.trailingSubheading = subheading;
        }
        return { struct, endIndex: next.index };
      }
      struct.name = t;
      return { struct, endIndex: next.index };
    }
    return { struct, endIndex: startIndex };
  };

  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];
    const line = item.text;

    // El bloque previo se conserva como encabezado del documento y no debe
    // confundirse con rótulos de artículos ni perderse silenciosamente.
    if (i < firstLegalAnchorIndex) continue;
    if (!line) {
      if (currentProvision) bodyItems.push(item);
      continue;
    }

    // Dentro de una Disposición, un “Artículo 272.- ...” puede ser solo texto citado.
    // Mientras estemos en la sección de Disposiciones, únicamente otra Disposición o
    // otro encabezado especial puede cerrar la entrada actual.
    if (state.special && currentProvision?.type === "Disposición") {
      const maybeSpecial = matchStructural(line);
      if (maybeSpecial?.type === "special") {
        closeGroup();
        state.book = null;
        state.title = null;
        state.subheading = null;
        state.special = maybeSpecial;
        state.prelimCompanion = "";
        state.majorVersion++;
        state.subVersion++;
        continue;
      }
      const standaloneInsideSpecial = analyzeStandaloneDispositionHeading(line);
      if (standaloneInsideSpecial) {
        flushProvision();
        if ((state.special?.label || "") !== standaloneInsideSpecial.specialLabel) {
          currentGroup = null;
          state.special = { type: "special", label: standaloneInsideSpecial.specialLabel, name: "" };
        }
        currentProvision = standaloneInsideSpecial.provision;
        bodyItems = currentProvision.bodyPrefix
          ? [{ raw: currentProvision.bodyPrefix, text: currentProvision.bodyPrefix, indent: 0, pageBreakBefore: false }]
          : [];
        continue;
      }
      const quotedArticle = parseArticleCandidate(line.replace(/^[“”"'‘’]+\s*/, ""));
      if (quotedArticle) diagnostics.articleReferencesInsideDispositions.push(quotedArticle.number);
      const nextDisposition = analyzeDispositionHeading(lines, i, true);
      if (nextDisposition) {
        flushProvision();
        currentProvision = nextDisposition;
        bodyItems = nextDisposition.bodyPrefix ? [{ raw: nextDisposition.bodyPrefix, text: nextDisposition.bodyPrefix, indent: 0, pageBreakBefore: false }] : [];
        i = nextDisposition.endIndex;
        continue;
      }
      bodyItems.push(item);
      continue;
    }

    // Un TÍTULO/CAPÍTULO completo puede estar derogado sin contener artículos.
    // Lo preservamos como un grupo estructural con nota, en vez de eliminarlo por
    // tener articulos: []. Caso real: TÍTULO V de la Ley 728.
    if (!currentProvision && /^(?:Derogado|Derogada)$/i.test(cleanLine(line)) && (state.title || state.book || state.subheading)) {
      let note = cleanLine(line);
      const next = nextNonBlank(lines, i + 1);
      if (next && /^(?:T[ií]tulo|Cap[ií]tulo|Secci[oó]n|Libro)\s+derogad[oa]\b/i.test(next.item.text)) {
        note += `\n${cleanLine(next.item.text)}`;
        i = next.index;
      }
      state.structuralNote = note;
      const structuralGroup = startGroupIfNeeded();
      structuralGroup.structuralNote = note;
      continue;
    }

    // Rótulos breves en negrita que pertenecen al artículo siguiente, por
    // ejemplo "Contrato por Necesidades del Mercado" antes del Artículo 58.
    // En DOCX usamos la pista real de negrita; en PDF/TXT queda un respaldo
    // conservador por palabras jurídicas típicas.
    if (!currentProvision && isArticleLeadHeadingCandidate(line, hintedBoldSet)) {
      const next = nextNonBlank(lines, i + 1);
      if (next && analyzeArticleHeading(lines, next.index, { ignoredArticleReferences: [] })) {
        pendingArticleLeadHeading = cleanLine(line);
        continue;
      }
    }

    const standaloneDisposition = analyzeStandaloneDispositionHeading(line);
    if (standaloneDisposition) {
      closeGroup();
      state.book = null;
      state.title = null;
      state.subheading = null;
      state.special = { type: "special", label: standaloneDisposition.specialLabel, name: "" };
      state.prelimCompanion = "";
      state.majorVersion++;
      state.subVersion++;
      currentProvision = standaloneDisposition.provision;
      bodyItems = currentProvision.bodyPrefix
        ? [{ raw: currentProvision.bodyPrefix, text: currentProvision.bodyPrefix, indent: 0, pageBreakBefore: false }]
        : [];
      continue;
    }

    const lowerRef = line.match(/^artículo\s+(\d+(?:-[A-ZÑ]+)?)/);
    if (lowerRef && currentProvision) diagnostics.ignoredArticleReferences.push(lowerRef[1].toUpperCase());

    const structural = matchStructural(line);
    if (structural) {
      const pendingProvision = !!currentProvision && !bodyItems.some(bodyItem => cleanLine(bodyItem?.text || ""));
      if (pendingProvision) {
        // Algunos Word colocan Artículo N antes del nuevo TÍTULO/CAPÍTULO. El
        // encabezado pertenece al artículo pendiente y no debe dejarlo vacío.
        currentGroup = null;
        diagnostics.lateStructuralHeadings = (diagnostics.lateStructuralHeadings || 0) + 1;
      } else {
        closeGroup();
      }
      const captured = structural.type === "special"
        ? { struct: { ...structural }, endIndex: i }
        : captureStructuralName({ ...structural }, i, true);
      const s = captured.struct;
      i = captured.endIndex;

      if (s.type === "book") {
        state.book = s;
        state.title = null;
        state.subheading = null;
        state.pendingSubheadings = [];
        state.pendingSectionBeforeTitle = null;
        state.titlePreface = null;
        state.special = null;
        state.prelimCompanion = "";
        state.structuralNote = "";
        state.majorVersion++;
        state.subVersion++;
      } else if (s.type === "title") {
        state.titlePreface = state.pendingSectionBeforeTitle ? { ...state.pendingSectionBeforeTitle } : null;
        state.pendingSectionBeforeTitle = null;
        state.title = { ...s, name: s.label === "TÍTULO PRELIMINAR" ? "" : s.name };
        state.subheading = s.trailingSubheading || null;
        state.pendingSubheadings = s.trailingSubheading ? [{ ...s.trailingSubheading }] : [];
        state.special = null;
        state.prelimCompanion = s.label === "TÍTULO PRELIMINAR" ? s.name : "";
        state.structuralNote = "";
        state.majorVersion++;
        state.subVersion++;
      } else if (["chapter", "subchapter", "section"].includes(s.type)) {
        state.subheading = s;
        state.pendingSubheadings.push({ ...s });
        if (s.type === "section") state.pendingSectionBeforeTitle = { ...s };
        state.special = null;
        state.structuralNote = "";
        state.subVersion++;
      } else if (s.type === "special") {
        state.book = null;
        state.title = null;
        state.subheading = null;
        state.pendingSubheadings = [];
        state.pendingSectionBeforeTitle = null;
        state.titlePreface = null;
        state.special = s;
        state.prelimCompanion = "";
        state.structuralNote = "";
        state.majorVersion++;
        state.subVersion++;
      }
      continue;
    }

    const titleDispositionContext = isDispositionContainerTitle(state.title);
    if (state.special || titleDispositionContext) {
      const disposition = analyzeDispositionHeading(lines, i, true);
      if (disposition) {
        flushProvision();
        currentProvision = disposition;
        bodyItems = disposition.bodyPrefix ? [{ raw: disposition.bodyPrefix, text: disposition.bodyPrefix, indent: 0, pageBreakBefore: false }] : [];
        i = disposition.endIndex;
        continue;
      }
    } else {
      const norm = analyzeNormHeading(lines, i);
      if (norm) {
        flushProvision();
        currentProvision = norm;
        bodyItems = [];
        i = norm.endIndex;
        continue;
      }

      const article = analyzeArticleHeading(lines, i, diagnostics, hintedBoldSet);
      if (article) {
        let leadHeading = pendingArticleLeadHeading;
        pendingArticleLeadHeading = "";
        if (currentProvision && bodyItems.length) {
          let lastIndex = bodyItems.length - 1;
          while (lastIndex >= 0 && !cleanLine(bodyItems[lastIndex]?.text || "")) lastIndex--;
          if (lastIndex >= 0 && isArticleLeadHeadingCandidate(bodyItems[lastIndex]?.text || "", hintedBoldSet)) {
            leadHeading = cleanLine(bodyItems[lastIndex].text);
            bodyItems.splice(lastIndex, 1);
            while (bodyItems.length && !cleanLine(bodyItems[bodyItems.length - 1]?.text || "")) bodyItems.pop();
          }
        }
        flushProvision();
        currentProvision = { ...article, leadHeading };
        if (leadHeading) diagnostics.articleLeadHeadings++;
        bodyItems = article.bodyPrefix
          ? [{ raw: article.bodyPrefix, text: article.bodyPrefix, indent: 0, pageBreakBefore: false }]
          : [];
        i = article.endIndex;
        continue;
      }
    }

    if (currentProvision) bodyItems.push(item);
  }
  closeGroup();

  const nonEmptyGroups = groups.filter(g => g.articles.length > 0 || cleanLine(g.structuralNote || ""));
  const allEntries = nonEmptyGroups.flatMap(g => g.articles);
  const articleEntries = allEntries.filter(a => a.tipo === "Artículo");
  const normEntries = allEntries.filter(a => a.tipo === "Norma");
  const dispositionEntries = allEntries.filter(a => a.tipo === "Disposición");
  const finalDispositionEntries = nonEmptyGroups
    .filter(g => /\bFINALES\b/i.test(g.special?.label || ""))
    .flatMap(g => g.articles)
    .filter(a => a.tipo === "Disposición");
  const transitoryDispositionEntries = nonEmptyGroups
    .filter(g => /\bTRANSITORIAS\b/i.test(g.special?.label || ""))
    .flatMap(g => g.articles)
    .filter(a => a.tipo === "Disposición");
  const derogatedArticleEntries = articleEntries.filter(a => a.derogado);
  const derogatedDispositionEntries = dispositionEntries.filter(a => a.derogado);
  const allListTokens = allEntries.flatMap(entry => entry.tokens || []).filter(token => token.type === "list");
  const romanUpperTokens = allListTokens.filter(token => token.kind === "roman-upper");
  const romanLowerTokens = allListTokens.filter(token => token.kind === "roman-lower");
  const alphaDecimalTokens = allListTokens.filter(token => token.kind === "alpha-decimal");
  const decimalTokens = allListTokens.filter(token => token.kind === "decimal");
  const articleDecimalTokens = allListTokens.filter(token => token.kind === "article-decimal");

  const duplicateKeys = [];
  const seen = new Set();
  for (const group of nonEmptyGroups) {
    for (const entry of group.articles) {
      const sectionKey = entry.tipo === "Disposición" ? (group.special?.label || "DISPOSICIONES") : "";
      const key = `${sectionKey}|${entry.tipo}|${entry.numero}`;
      if (seen.has(key)) duplicateKeys.push(`${sectionKey ? sectionKey + " — " : ""}${entry.tipo} ${entry.numero}`);
      seen.add(key);
    }
  }
  if (duplicateKeys.length) warnings.push(`Se detectaron entradas repetidas: ${[...new Set(duplicateKeys)].join(", ")}.`);

  const ignoredRefs = [...new Set(diagnostics.ignoredArticleReferences)];
  if (ignoredRefs.length) {
    notes.push(`Se descartaron correctamente ${ignoredRefs.length} referencias internas a otros artículos: ${ignoredRefs.join(", ")}.`);
  }
  const specialArticleRefs = [...new Set(diagnostics.articleReferencesInsideDispositions || [])];
  if (specialArticleRefs.length) {
    notes.push(`Se conservaron dentro de las Disposiciones ${specialArticleRefs.length} encabezado${specialArticleRefs.length === 1 ? "" : "s"} de artículo citado${specialArticleRefs.length === 1 ? "" : "s"}, sin convertirlos en artículos del Código: ${specialArticleRefs.join(", ")}.`);
  }
  const parsedArticleNumbers = new Set(articleEntries.map(entry => entry.numero));
  const specialArticleRefSet = new Set(specialArticleRefs);
  const missingSourceArticleHeadings = sourceArticleHeadingNumbers.filter(number => !parsedArticleNumbers.has(number) && !specialArticleRefSet.has(number));
  diagnostics.missingSourceArticleHeadings = missingSourceArticleHeadings;
  if (missingSourceArticleHeadings.length) {
    warnings.push(`Posibles encabezados de artículo no convertidos: ${missingSourceArticleHeadings.join(", ")}. Revisar el documento fuente.`);
  } else if (sourceArticleHeadingNumbers.length) {
    notes.push(`Control de integridad: ${sourceArticleHeadingNumbers.length} encabezados de artículo detectados en la fuente fueron convertidos o identificados correctamente como citas internas.`);
  }

  if (missingSourceStructuralHeadings.length) {
    warnings.push(`Posibles jerarquías no convertidas (Libro/Título/Capítulo/Subcapítulo/Sección): ${missingSourceStructuralHeadings.join(" | ")}.`);
  } else if (sourceStructuralHeadingCandidates.length) {
    notes.push(`Control de jerarquías: ${sourceStructuralHeadingCandidates.length} encabezados estructurales candidatos fueron reconocidos.`);
  }

  const pageContinuationCount = diagnostics.pageContinuations.length;
  if (pageContinuationCount) {
    notes.push(`Se repararon automáticamente ${pageContinuationCount} continuidades de texto atravesadas por cambios de página, evitando párrafos falsos.`);
  }
  if (diagnostics.pageParagraphBoundaries) {
    notes.push(`Se conservaron ${diagnostics.pageParagraphBoundaries} saltos de página que sí correspondían a párrafos reales.`);
  }
  if (derogatedArticleEntries.length) {
    notes.push(`Se aplicó automáticamente el formato de artículo derogado a ${derogatedArticleEntries.length} artículo${derogatedArticleEntries.length === 1 ? "" : "s"}: ${derogatedArticleEntries.map(a => a.numero).join(", ")}.`);
  }
  if (derogatedDispositionEntries.length) {
    notes.push(`Se aplicó automáticamente el formato de disposición derogada a ${derogatedDispositionEntries.length} ${derogatedDispositionEntries.length === 1 ? "disposición" : "disposiciones"}: ${derogatedDispositionEntries.map(a => a.numero).join(", ")}.`);
  }
  if (diagnostics.partialDerogationNotes) {
    notes.push(`Se aplicó cursiva y gris a ${diagnostics.partialDerogationNotes} nota${diagnostics.partialDerogationNotes === 1 ? "" : "s"} de derogación parcial dentro de artículos o disposiciones vigentes.`);
  }
  if (romanUpperTokens.length || romanLowerTokens.length) {
    notes.push(`Se reconocieron ${romanUpperTokens.length} acápite${romanUpperTokens.length === 1 ? "" : "s"} romano${romanUpperTokens.length === 1 ? "" : "s"} en mayúscula y ${romanLowerTokens.length} subacápite${romanLowerTokens.length === 1 ? "" : "s"} romano${romanLowerTokens.length === 1 ? "" : "s"} en minúscula, incluyendo variantes con paréntesis y romanos sin signo.`);
  }
  if (alphaDecimalTokens.length) notes.push(`Se reconocieron ${alphaDecimalTokens.length} subniveles alfanuméricos del tipo a.1 / a.2 / b.1.`);
  if (decimalTokens.length) notes.push(`Se reconocieron ${decimalTokens.length} subnumerales decimales, incluidos niveles profundos como 18.3.1 cuando aparecen.`);
  if (articleDecimalTokens.length) notes.push(`Se reconocieron ${articleDecimalTokens.length} subnumerales ligados a artículos incorporados, como 29-A.1 y 228-C.2.`);
  if (diagnostics.lateStructuralHeadings) notes.push(`Se reubicaron ${diagnostics.lateStructuralHeadings} encabezados de TÍTULO/CAPÍTULO que Word colocó después del encabezado del artículo, evitando artículos vacíos.`);
  if (diagnostics.articleLeadHeadings) notes.push(`Se conservaron ${diagnostics.articleLeadHeadings} rótulo${diagnostics.articleLeadHeadings === 1 ? "" : "s"} previo${diagnostics.articleLeadHeadings === 1 ? "" : "s"} a artículos (por ejemplo, nombres de contratos o modalidades) sin mezclarlos con el artículo anterior.`);
  if (documentHeaderLines.length) notes.push(`Se conservó el encabezado general previo al articulado (${documentHeaderLines.length} línea${documentHeaderLines.length === 1 ? "" : "s"}), incluyendo denominaciones de TUO, leyes, decretos o reglamentos.`);
  if (diagnostics.tablesDetected) notes.push(`Se convirtieron ${diagnostics.tablesDetected} tabla${diagnostics.tablesDetected === 1 ? "" : "s"} a HTML conservando filas y columnas.`);

  const uniqueSequenceWarnings = [...new Set(diagnostics.sequenceWarnings)];
  warnings.push(...uniqueSequenceWarnings);

  const emptyTextEntries = allEntries.filter(e => !cleanLine(e.textoPlain || ""));
  if (emptyTextEntries.length) {
    warnings.push(`Se detectaron ${emptyTextEntries.length} entradas sin texto. Revisar: ${emptyTextEntries.slice(0, 8).map(e => `${e.tipo} ${e.numero}`).join(", ")}${emptyTextEntries.length > 8 ? "…" : ""}.`);
  }

  if (!allEntries.length) warnings.push("No se detectaron artículos, normas ni disposiciones.");

  const baseOutputGroups = nonEmptyGroups.map(group => {
    let titulo = "";
    let capitulo = "";

    if (group.special) {
      titulo = formatSpecialTitle(group.special.label);
      capitulo = "";
    } else if (group.isPrelim) {
      if (group.majorChanged) {
        titulo = "TÍTULO PRELIMINAR";
        capitulo = group.prelimCompanion || "";
      }
    } else {
      if (group.renderMajorParts?.length) titulo = formatMajorHierarchy(group.renderMajorParts);
      if (group.renderTitlePreface) titulo = `${formatSubheading(group.renderTitlePreface)}\n${titulo}`.trim();
      if (group.renderSubheadings?.length) capitulo = group.renderSubheadings.map(formatSubheading).join("\n");
      else if (group.subheading && (group.subChanged || group.bookChanged || group.titleChanged)) capitulo = formatSubheading(group.subheading);
    }

    if (group.structuralNote) {
      const noteHtml = `<div style="text-align: center; margin-top: 18px; color: #777; font-style: italic; line-height: 1.5;">${escapeHtml(group.structuralNote).replace(/\n/g, "<br>")}</div>`;
      capitulo = capitulo ? `${capitulo}
${noteHtml}` : noteHtml;
    }

    return { ...group, titulo, capitulo };
  });

  // Inserta el encabezado documental en el primer grupo sin crear un formato
  // incompatible con la web actual: se reutiliza `titulo`, que ya admite HTML.
  if (documentHeaderLines.length && baseOutputGroups.length) {
    const headerHtml = formatDocumentHeader(documentHeaderLines);
    const first = baseOutputGroups[0];
    const existingTitle = String(first.titulo || "");
    first.titulo = existingTitle.includes("<div")
      ? `${headerHtml}\n${existingTitle}`
      : `${headerHtml}${existingTitle ? `\n${wrapPlainMajorHeading(existingTitle)}` : ""}`;
  }

  // Un rótulo previo al artículo se conserva usando el campo `capitulo`, que ya
  // entiende el frontend existente de La Norma Express. Si aparece entre dos
  // artículos, se crea un grupo liviano sin repetir TÍTULO/CAPÍTULO.
  const outputGroups = [];
  for (const group of baseOutputGroups) {
    let segment = { ...group, articles: [] };
    for (const entry of group.articles || []) {
      if (entry.leadHeading) {
        const leadHtml = articleLeadHeadingHtml(entry.leadHeading);
        if (segment.articles.length) {
          outputGroups.push(segment);
          segment = { ...group, nuevaHoja: undefined, titulo: "", capitulo: leadHtml, articles: [] };
        } else {
          segment.capitulo = segment.capitulo ? `${segment.capitulo}
${leadHtml}` : leadHtml;
        }
      }
      segment.articles.push(entry);
    }
    if (segment.articles.length || cleanLine(segment.structuralNote || "")) outputGroups.push(segment);
  }

  const out = [];
  out.push(`const ${variableName} = [`);

  outputGroups.forEach((group, gi) => {
    out.push("  {");
    if (group.nuevaHoja !== undefined) out.push(`    nuevaHoja: ${group.nuevaHoja ? "true" : "false"},`);

    if (group.titulo.includes("<div")) out.push(`    titulo: ${serializeTemplate("\n" + group.titulo + "\n")},`);
    else out.push(`    titulo: ${serializeString(group.titulo)},`);

    if (group.capitulo.includes("<div")) out.push(`    capitulo: ${serializeTemplate("\n" + group.capitulo + "\n")},`);
    else out.push(`    capitulo: ${serializeString(group.capitulo)},`);

    out.push("    articulos: [");
    group.articles.forEach((entry, ai) => {
      out.push("      {");
      out.push(`        tipo: ${serializeString(entry.tipo)},`);
      out.push(`        numero: ${serializeString(entry.numero)},`);
      out.push(`        titulo: ${serializeString(entry.titulo || "")},`);
      if (entry.simpleText) out.push(`        texto: ${serializeString(entry.textoPlain)}`);
      else out.push(`        texto: ${serializeTemplate("\n" + entry.textoHtml + "\n")}`);
      out.push(ai === group.articles.length - 1 ? "      }" : "      },");
    });
    out.push("    ]");
    out.push(gi === outputGroups.length - 1 ? "  }" : "  },");
  });

  out.push("];\n");
  const js = out.join("\n");

  const articleNumbers = articleEntries.map(a => a.numero);
  const stats = {
    grupos: outputGroups.length,
    entradas: allEntries.length,
    articulos: articleEntries.length,
    articulosBase: articleEntries.filter(a => /^\d+$/.test(a.numero)).length,
    articulosIncorporados: articleEntries.filter(a => /^\d+-[A-ZÑ]+$/.test(a.numero)).length,
    articulosRomanos: articleEntries.filter(a => /^[IVXLCDM]+$/.test(a.numero)).length,
    articulosEspeciales: articleEntries.filter(a => !/^\d+$/.test(a.numero) && !/^\d+-[A-ZÑ]+$/.test(a.numero) && !/^[IVXLCDM]+$/.test(a.numero)).length,
    articulosDerogados: derogatedArticleEntries.length,
    disposicionesDerogadas: derogatedDispositionEntries.length,
    notasDerogacionParciales: diagnostics.partialDerogationNotes || 0,
    acapitesRomanosMayuscula: romanUpperTokens.length,
    subacapitesRomanosMinuscula: romanLowerTokens.length,
    subnivelesAlfanumericos: alphaDecimalTokens.length,
    subnumeralesDecimales: decimalTokens.length + articleDecimalTokens.length,
    subnumeralesConSufijo: articleDecimalTokens.length,
    subnumeralesProfundos: decimalTokens.filter(t => Array.isArray(t.path) && t.path.length >= 3).length + articleDecimalTokens.filter(t => Array.isArray(t.subpath) && t.subpath.length >= 2).length,
    tablas: diagnostics.tablesDetected,
    articulosCitadosEnDisposiciones: specialArticleRefs.length,
    normas: normEntries.length,
    disposiciones: dispositionEntries.length,
    disposicionesFinales: finalDispositionEntries.length,
    disposicionesTransitorias: transitoryDispositionEntries.length,
    titulos: lines.filter(l => matchStructural(l.text)?.type === "title").length,
    capitulos: lines.filter(l => ["chapter", "subchapter"].includes(matchStructural(l.text)?.type)).length,
    libros: lines.filter(l => matchStructural(l.text)?.type === "book").length,
    secciones: lines.filter(l => matchStructural(l.text)?.type === "section").length,
    referenciasIgnoradas: ignoredRefs.length,
    saltosPaginaInternos: diagnostics.pageBreaksInsideProvisions,
    continuidadesPaginaReparadas: diagnostics.pageContinuations.length,
    limitesParrafoEnPagina: diagnostics.pageParagraphBoundaries,
    encabezadosReubicados: diagnostics.lateStructuralHeadings,
    rotulosPreviosArticulo: diagnostics.articleLeadHeadings,
    lineasEncabezadoGeneral: documentHeaderLines.length,
    alertasSecuencia: uniqueSequenceWarnings.length,
    tildesRestauradas: accentNormalization.totalChanges,
    secuenciaArticulos: collapseArticleSequence(articleNumbers),
    secuenciaNormas: normEntries.map(n => n.numero).join(", "),
    encabezadosArticuloFuente: sourceArticleHeadingNumbers.length,
    encabezadosArticuloNoConvertidos: diagnostics.missingSourceArticleHeadings.length,
    jerarquiasFuente: sourceStructuralHeadingCandidates.length,
    jerarquiasNoConvertidas: missingSourceStructuralHeadings.length,
    caracteresEntrada: String(inputText || "").length,
    caracteresSalida: js.length
  };

  const preview = outputGroups.map(group => ({
    nuevaHoja: group.nuevaHoja,
    titulo: group.titulo || "",
    capitulo: group.capitulo || "",
    articulos: group.articles.map(entry => ({
      tipo: entry.tipo || "Artículo",
      numero: entry.numero || "",
      titulo: entry.titulo || "",
      textoHtml: entry.simpleText
        ? `<div style="text-align: justify; line-height: 1.5;">${escapeHtml(entry.textoPlain || "")}</div>`
        : (entry.textoHtml || "")
    }))
  }));

  return {
    js,
    preview,
    stats,
    warnings,
    notes,
    variableName,
    diagnostics: {
      ignoredArticleReferences: ignoredRefs,
      pageContinuations: diagnostics.pageContinuations,
      sequenceWarnings: uniqueSequenceWarnings,
      accentCorrections: accentNormalization.corrections,
      derogatedArticles: derogatedArticleEntries.map(a => a.numero),
      derogatedDispositions: derogatedDispositionEntries.map(a => a.numero),
      romanUpperMarkers: romanUpperTokens.map(t => t.marker),
      romanLowerMarkers: romanLowerTokens.map(t => t.marker),
      alphaDecimalMarkers: alphaDecimalTokens.map(t => t.marker),
      decimalMarkers: decimalTokens.map(t => t.marker),
      articleDecimalMarkers: articleDecimalTokens.map(t => t.marker),
      articleReferencesInsideDispositions: specialArticleRefs,
      tablesDetected: diagnostics.tablesDetected,
      sourceArticleHeadingNumbers,
      missingSourceArticleHeadings: diagnostics.missingSourceArticleHeadings,
      sourceStructuralHeadingCandidates,
      missingSourceStructuralHeadings,
      partialDerogationNotes: diagnostics.partialDerogationNotes || 0
    }
  };
}

module.exports = {
  convertLegalText,
  preprocessLines,
  matchStructural,
  looksLikeStructuralHeadingCandidate,
  parseArticleCandidate,
  matchNorm,
  matchListMarker,
  restoreHeadingAccents,
  normalizeHeadingAccentsInText
};
