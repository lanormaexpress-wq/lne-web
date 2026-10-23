const vm = require("vm");

function findArrayLiteral(source) {
  const text = String(source || "");
  let start = -1;

  // Preferimos el arreglo asignado después de "=". Incluso una declaración
  // dañada como `const Codigo X = [` sigue siendo recuperable desde aquí.
  const assign = text.match(/=\s*\[/m);
  if (assign && assign.index != null) start = text.indexOf("[", assign.index);
  if (start < 0) start = text.indexOf("[");
  if (start < 0) throw new Error("No se encontró el arreglo principal [ ... ] del código.");

  let depth = 0;
  let state = "normal";
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1] || "";

    if (state === "line-comment") {
      if (ch === "\n") state = "normal";
      continue;
    }
    if (state === "block-comment") {
      if (ch === "*" && next === "/") { state = "normal"; i++; }
      continue;
    }
    if (state === "single" || state === "double" || state === "template") {
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if ((state === "single" && ch === "'") || (state === "double" && ch === '"') || (state === "template" && ch === "`")) {
        state = "normal";
      }
      continue;
    }

    if (ch === "/" && next === "/") { state = "line-comment"; i++; continue; }
    if (ch === "/" && next === "*") { state = "block-comment"; i++; continue; }
    if (ch === "'") { state = "single"; continue; }
    if (ch === '"') { state = "double"; continue; }
    if (ch === "`") { state = "template"; continue; }

    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return { arraySource: text.slice(start, i + 1), startIndex: start };
      if (depth < 0) break;
    }
  }
  throw new Error("El arreglo principal está incompleto: falta cerrar un corchete ] o hay una edición sin terminar.");
}

function normalizePreviewArray(value) {
  if (!Array.isArray(value)) throw new Error("El contenido principal no es un arreglo válido.");
  return JSON.parse(JSON.stringify(value)).map(group => ({
    ...group,
    titulo: group?.titulo || "",
    capitulo: group?.capitulo || "",
    articulos: (group?.articulos || []).map(entry => ({
      ...entry,
      textoHtml: entry?.textoHtml ?? entry?.texto ?? ""
    }))
  }));
}

function parseSyntaxLocation(error, source, arrayStartIndex) {
  const stack = String(error?.stack || "");
  const m = stack.match(/lne-edited-array\.js:(\d+)(?::(\d+))?/);
  if (!m) return "";
  const relativeLine = Number(m[1]);
  const arrayStartLine = String(source || "").slice(0, arrayStartIndex).split("\n").length;
  const sourceLine = Math.max(1, arrayStartLine + relativeLine - 1);
  return ` (aprox. línea ${sourceLine}${m[2] ? `, columna ${m[2]}` : ""})`;
}

function previewFromEditedJs(code, requestedVariableName) {
  const source = String(code || "");
  if (!source.trim()) throw new Error("El código está vacío.");

  const requestedRaw = String(requestedVariableName || "CodigoLegal").replace(/[^A-Za-z0-9_$]/g, "_");
  const requested = /^[A-Za-z_$]/.test(requestedRaw) ? requestedRaw : `_${requestedRaw}`;
  const escapedRequested = requested.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const validRequestedDeclaration = new RegExp(`\\b(?:const|let|var)\\s+${escapedRequested}\\s*=\\s*\\[`).test(source);

  const { arraySource, startIndex } = findArrayLiteral(source);
  const sandbox = Object.create(null);
  try {
    const script = new vm.Script(`globalThis.__lne_result = (${arraySource});`, { filename: "lne-edited-array.js" });
    script.runInNewContext(sandbox, { timeout: 1000, contextCodeGeneration: { strings: false, wasm: false } });
  } catch (error) {
    const suffix = parseSyntaxLocation(error, source, startIndex);
    throw new Error(`${error.message}${suffix}`);
  }

  return {
    preview: normalizePreviewArray(sandbox.__lne_result),
    recoveredDeclaration: !validRequestedDeclaration
  };
}

module.exports = { findArrayLiteral, previewFromEditedJs };
