const path = require("path");

function normalizeForDetection(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function cleanTitleLine(line) {
  return String(line || "")
    .replace(/^\s*[|•·]+\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleRegionLines(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map(cleanTitleLine)
    .filter(Boolean);

  const result = [];
  for (const line of lines.slice(0, 40)) {
    const normalized = normalizeForDetection(line);
    if (/^(TITULO\s+PRELIMINAR|LIBRO\s+[IVXLCDM0-9]+|ARTICULO\s+[0-9IVXLCDM]+|NORMA\s+[IVXLCDM0-9]+|CAPITULO\s+[IVXLCDM0-9]+)/.test(normalized)) {
      break;
    }
    if (/^(PAGINA|PAGE)\s+\d+$/.test(normalized) || /^\d+$/.test(normalized)) continue;
    result.push(line);
  }
  return result.slice(0, 8);
}

function identifierFromTitle(title) {
  const normalized = String(title || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim();
  const words = normalized.split(/\s+/).filter(Boolean);
  const ignored = new Set(["EL", "LA", "LOS", "LAS", "DE", "DEL", "Y", "UN", "UNA", "TEXTO", "UNICO", "ORDENADO"]);
  const selected = words.filter(word => !ignored.has(word.toUpperCase())).slice(0, 6);
  const identifier = selected.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
  return identifier || "CodigoLegal";
}

function genericSuggestion(filename, lines) {
  const joined = lines.join(" ").replace(/\s+/g, " ").trim();
  const lawMatch = normalizeForDetection(joined).match(/\bLEY\s+(?:N(?:RO|UMERO)?\.?\s*)?[°º]?\s*(\d{3,})\b/);
  if (lawMatch) {
    return {
      variableName: `Ley${lawMatch[1]}`,
      outputName: `datos_ley_${lawMatch[1]}.js`,
      displayName: joined || `LEY N.º ${lawMatch[1]}`
    };
  }

  if (joined) {
    const variableName = identifierFromTitle(joined);
    return {
      variableName,
      outputName: `datos_${variableName.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()}.js`,
      displayName: joined
    };
  }

  const base = path.basename(filename || "", path.extname(filename || ""))
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (base) {
    const variableName = identifierFromTitle(base);
    return {
      variableName,
      outputName: `datos_${variableName.toLowerCase()}.js`,
      displayName: base.toUpperCase()
    };
  }

  return { variableName: "CodigoLegal", outputName: "datos_codigo.js", displayName: "NORMA LEGAL" };
}

function suggestProjectNames(filename, text) {
  const lines = titleRegionLines(text);
  const header = lines.join("\n");
  const haystack = normalizeForDetection(`${path.basename(filename || "")}\n${header}`);

  const candidates = [
    { re: /CODIGO\s+TRIBUTARIO/, variableName: "CodigoTributario", outputName: "datos_codigo_tributario.js", displayName: "CÓDIGO TRIBUTARIO" },
    { re: /CODIGO\s+PROCESAL\s+PENAL/, variableName: "CodigoProcesalPenal", outputName: "datos_codigo_procesal_penal.js", displayName: "NUEVO CÓDIGO PROCESAL PENAL" },
    { re: /CODIGO\s+PROCESAL\s+CONSTITUCIONAL/, variableName: "CodigoProcesalConstitucional", outputName: "datos_codigo_procesal_constitucional.js", displayName: "NUEVO CÓDIGO PROCESAL CONSTITUCIONAL" },
    { re: /CODIGO\s+CIVIL/, variableName: "CodigoCivil", outputName: "datos_codigo_civil.js", displayName: "CÓDIGO CIVIL" },
    { re: /CODIGO\s+PENAL/, variableName: "CodigoPenal", outputName: "datos_codigo_penal.js", displayName: "CÓDIGO PENAL" },
    { re: /CONSTITUCION\s+POLITICA/, variableName: "Constitucion", outputName: "datos_constitucion.js", displayName: "CONSTITUCIÓN POLÍTICA DEL PERÚ" },
    { re: /CODIGO\s+DE\s+COMERCIO/, variableName: "CodigoComercio", outputName: "datos_codigo_comercio.js", displayName: "CÓDIGO DE COMERCIO" },
    { re: /CODIGO\s+DE\s+LOS\s+NINOS\s+Y\s+ADOLESCENTES/, variableName: "CodigoNinosAdolescentes", outputName: "datos_codigo_ninos_adolescentes.js", displayName: "CÓDIGO DE LOS NIÑOS Y ADOLESCENTES" }
  ];

  const match = candidates.find(candidate => candidate.re.test(haystack));
  return match || genericSuggestion(filename, lines);
}

module.exports = {
  normalizeForDetection,
  titleRegionLines,
  suggestProjectNames
};
