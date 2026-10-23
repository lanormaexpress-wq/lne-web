const fileInput = document.getElementById("fileInput");
const pdfColumns = document.getElementById("pdfColumns");
const pdfPrevious = document.getElementById("pdfPrevious");
const pdfPreviousList = document.getElementById("pdfPreviousList");
const extractBtn = document.getElementById("extractBtn");
const convertBtn = document.getElementById("convertBtn");
const sourceConvertBtn = document.getElementById("sourceConvertBtn");
const downloadBtn = document.getElementById("downloadBtn");
const previewBtn = document.getElementById("previewBtn");
const closePreviewBtn = document.getElementById("closePreviewBtn");
const previewSection = document.getElementById("previewSection");
const legalPreview = document.getElementById("legalPreview");
const editPreviewBtn = document.getElementById("editPreviewBtn");
const indentLessBtn = document.getElementById("indentLessBtn");
const indentMoreBtn = document.getElementById("indentMoreBtn");
const fontSmallerBtn = document.getElementById("fontSmallerBtn");
const fontLargerBtn = document.getElementById("fontLargerBtn");
const paragraphBtn = document.getElementById("paragraphBtn");
const articleTitleBtn = document.getElementById("articleTitleBtn");
const newArticleBtn = document.getElementById("newArticleBtn");
const newDispositionBtn = document.getElementById("newDispositionBtn");
const opacityBtn = document.getElementById("opacityBtn");
const underlineBtn = document.getElementById("underlineBtn");
const italicBtn = document.getElementById("italicBtn");
const structureTypeSelect = document.getElementById("structureTypeSelect");
const alignPrevBtn = document.getElementById("alignPrevBtn");
const markIncisoBtn = document.getElementById("markIncisoBtn");
const sublevelMoreBtn = document.getElementById("sublevelMoreBtn");
const sublevelLessBtn = document.getElementById("sublevelLessBtn");
const leadCurrentBtn = document.getElementById("leadCurrentBtn");
const leadNextBtn = document.getElementById("leadNextBtn");
const formatDerogationBtn = document.getElementById("formatDerogationBtn");
const deleteBlockBtn = document.getElementById("deleteBlockBtn");
const mergePrevBtn = document.getElementById("mergePrevBtn");
const mergeNextBtn = document.getElementById("mergeNextBtn");
const undoPreviewBtn = document.getElementById("undoPreviewBtn");
const redoPreviewBtn = document.getElementById("redoPreviewBtn");
const applyPreviewBtn = document.getElementById("applyPreviewBtn");
const restorePreviewBtn = document.getElementById("restorePreviewBtn");
const previewEditStatus = document.getElementById("previewEditStatus");
const sourceText = document.getElementById("sourceText");
const resultText = document.getElementById("resultText");
const variableName = document.getElementById("variableName");
const outputName = document.getElementById("outputName");
const previewTitle = document.getElementById("previewTitle");
const fileStatus = document.getElementById("fileStatus");
const stats = document.getElementById("stats");
const detectionDetail = document.getElementById("detectionDetail");
const warnings = document.getElementById("warnings");
const notes = document.getElementById("notes");
const auditTrail = document.getElementById("auditTrail");
const editCodeBtn = document.getElementById("editCodeBtn");
const syncCodeBtn = document.getElementById("syncCodeBtn");
const saveProjectBtn = document.getElementById("saveProjectBtn");
const downloadProjectBtn = document.getElementById("downloadProjectBtn");
const openProjectFileBtn = document.getElementById("openProjectFileBtn");
const projectFileInput = document.getElementById("projectFileInput");
const savedProjectsSelect = document.getElementById("savedProjectsSelect");
const loadSavedProjectBtn = document.getElementById("loadSavedProjectBtn");
const exportDocxBtn = document.getElementById("exportDocxBtn");
const projectStatus = document.getElementById("projectStatus");
const projectName = document.getElementById("projectName");
const projectLastSaved = document.getElementById("projectLastSaved");
const openProjectsBtn = document.getElementById("openProjectsBtn");
const newProjectBtn = document.getElementById("newProjectBtn");
const projectsDialog = document.getElementById("projectsDialog");
const closeProjectsBtn = document.getElementById("closeProjectsBtn");
const projectsList = document.getElementById("projectsList");
const projectsCount = document.getElementById("projectsCount");
const publicationDialog = document.getElementById("publicationDialog");
const publicationForm = document.getElementById("publicationForm");
const publicationType = document.getElementById("publicationType");
const closePublicationBtn = document.getElementById("closePublicationBtn");
const cancelPublicationBtn = document.getElementById("cancelPublicationBtn");
const newPublicationPanel = document.getElementById("newPublicationPanel");
const publicationNormName = document.getElementById("publicationNormName");
const publicationNormCode = document.getElementById("publicationNormCode");
const publicationNormIntro = document.getElementById("publicationNormIntro");
const publicationNormImage = document.getElementById("publicationNormImage");
const selectPublicationImageBtn = document.getElementById("selectPublicationImageBtn");
const publicationImagePreview = document.getElementById("publicationImagePreview");
const publicationImageTitle = document.getElementById("publicationImageTitle");
const publicationResizeHandle = document.getElementById("publicationResizeHandle");
const publicationPanelToggle = document.getElementById("publicationPanelToggle");
const publicationPreview = document.getElementById("publicationPreview");
const publicationSummary = document.getElementById("publicationSummary");
const publicationError = document.getElementById("publicationError");
const preparePublicationBtn = document.getElementById("preparePublicationBtn");
const editPublicationBtn = document.getElementById("editPublicationBtn");
const confirmPublicationBtn = document.getElementById("confirmPublicationBtn");
let lastExtractAccentCorrections = [];
let lastExtractionDiagnostics = {};
let lastExtractionHints = {};
let lastPreparedPdf = null;
let showPreparedPreview = false;
let lastPreviewData = [];
let originalPreviewData = [];
let previewEditing = false;
let selectedEditBlock = null;
let savedFormattingRange = null;
let codeEditing = false;
let codeNeedsSync = false;
let previewHistory = [];
let previewHistoryIndex = -1;
let historyTimer = null;
let autosaveTimer = null;
let applyingAutomaticFields = false;
let currentProjectId = null;
let currentProjectUpdatedAt = null;
let restoringProject = false;
let publicationContext = { norms: [], role: "", permissions: {} };
let preparedPublication = null;
let publicationRequestId = null;
let publicationImageFile = null;
let publicationImageObjectUrl = "";
let publicationCodeManuallyEdited = false;
let publicationDraftKey = "";
let adminDocumentMeta = { codigo: "", nombre: "", introduccion: "" };
let originalAdminDocumentMeta = null;
const adminOriginalArticles = new Map();
const adminDirtyArticleIds = new Set();
const adminDirtyGroupIndexes = new Set();
const automaticFields = { variableName: true, outputName: true, previewTitle: true };

async function converterFetch(path, options = {}) {
  if (!window.__LNE_ADMIN_TOKEN__) {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("No se recibió la sesión del panel administrativo.")), 10000);
      window.addEventListener("lne-admin-auth-ready", () => { clearTimeout(timer); resolve(); }, { once: true });
      window.parent?.postMessage({ type: "lne-converter-request-auth" }, window.location.origin);
    });
  }
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${window.__LNE_ADMIN_TOKEN__}`);
  return fetch(`/api/admin/converter${path}`, { ...options, headers });
}

function renderList(title, items) {
  if (!items?.length) return "";
  return `<strong>${title}</strong><ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function entryPrefix(entry) {
  const tipo = entry.tipo || "Artículo";
  const numero = entry.numero || "";
  if (tipo === "Norma") return `NORMA ${numero}${entry.titulo ? ":" : ""}`;
  if (tipo === "Disposición") return numero;
  return `Artículo ${numero}${entry.titulo ? ".-" : "."}`;
}

function entryKindLabel(entry) {
  if ((entry.tipo || "Artículo") === "Norma") return "NORMA ";
  if ((entry.tipo || "Artículo") === "Disposición") return "";
  return "Artículo ";
}

function entrySeparator(entry) {
  if ((entry.tipo || "Artículo") === "Disposición") return "";
  if ((entry.tipo || "Artículo") === "Norma") return entry.titulo ? ":" : "";
  return entry.titulo ? ".-" : ".";
}

function normalizeInlineText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function fullEntryHeading(entry) {
  const title = normalizeInlineText(entry?.titulo || "");
  const base = `${entryKindLabel(entry)}${normalizeInlineText(entry?.numero || "")}${entrySeparator(entry)}`.trim();
  return title ? `${base} ${title}` : base;
}

function parseEditedEntryHeading(value, entry) {
  const raw = normalizeInlineText(value);
  const tipo = entry?.tipo || "Artículo";
  if (!raw) return { numero: entry?.numero || "", titulo: entry?.titulo || "" };

  if (tipo === "Norma") {
    const m = raw.match(/^NORMA\s+([^:]+?)\s*(?::\s*)?(.*)$/i);
    if (m) return { numero: normalizeInlineText(m[1]), titulo: normalizeInlineText(m[2]) };
  }

  if (tipo === "Disposición") {
    const m = raw.match(/^(.+?)(?:\s*\.\-\s*|\.\s+|\s+-\s+)(.*)$/);
    if (m) return { numero: normalizeInlineText(m[1]), titulo: normalizeInlineText(m[2]) };
    return { numero: raw, titulo: "" };
  }

  const article = raw.match(/^Artículo\s+([0-9]+(?:[-.][A-ZÁÉÍÓÚÜÑ0-9]+)*|[IVXLCDM]+|ÚNIC[OA])\s*(?:º|°)?\s*(?:\.\-|\.|-)?\s*(.*)$/i);
  if (article) {
    return { numero: normalizeInlineText(article[1]), titulo: normalizeInlineText(article[2]) };
  }
  return { numero: entry?.numero || "", titulo: raw.replace(/^Artículo\s+/i, "").trim() };
}

function addHeadingBlock(parent, htmlOrText, className, groupIndex, fieldName) {
  if (!htmlOrText) return;
  const block = document.createElement("div");
  block.className = className;
  block.dataset.groupIndex = String(groupIndex);
  block.dataset.field = fieldName;
  const isHtml = String(htmlOrText).includes("<div");
  block.dataset.sourceFormat = isHtml ? "html" : "text";
  if (isHtml) block.innerHTML = htmlOrText;
  else block.textContent = htmlOrText;
  const group = lastPreviewData?.[groupIndex];
  const styleKey = fieldName === "titulo" ? "estiloTitulo" : (fieldName === "capitulo" ? "estiloCapitulo" : "");
  const customFont = styleKey ? Number(group?.[styleKey]?.fontSize || 0) : 0;
  if (customFont > 0) {
    block.dataset.lneFontSize = String(customFont);
    block.style.setProperty("font-size", `${customFont}px`, "important");
    block.querySelectorAll("*").forEach(child => child.style.setProperty("font-size", "inherit", "important"));
  }
  if (previewEditing) block.contentEditable = "true";
  parent.appendChild(block);
}

function directEditableBlock(target) {
  let el = target instanceof Element ? target : null;
  while (el && !el.classList?.contains("legal-article-body")) {
    if (el.parentElement?.classList?.contains("legal-article-body")) return el;
    el = el.parentElement;
  }
  return null;
}

function editableTargetBlock(target) {
  const el = target instanceof Element ? target : target?.parentElement;
  if (!el) return null;
  const lead = el.closest?.('[data-lne-role="article-lead"]');
  if (lead && legalPreview.contains(lead)) return lead;
  const articleHeading = el.closest?.('.legal-article-title[data-entry-heading="1"]');
  if (articleHeading && legalPreview.contains(articleHeading)) return articleHeading;
  const structural = el.closest?.('[data-field="titulo"], [data-field="capitulo"], [data-global-field="previewTitle"]');
  if (structural && legalPreview.contains(structural)) return structural;
  return directEditableBlock(el);
}

function setSelectedEditBlock(block) {
  if (selectedEditBlock) selectedEditBlock.classList.remove("selected-edit-block");
  selectedEditBlock = block || null;
  if (selectedEditBlock) selectedEditBlock.classList.add("selected-edit-block");
  const enabled = previewEditing && !!selectedEditBlock;
  const inBody = !!selectedEditBlock?.closest?.('.legal-article-body');
  const isArticleHeading = !!selectedEditBlock?.matches?.('.legal-article-title[data-entry-heading="1"]');
  const isStructural = !!selectedEditBlock?.matches?.('[data-field="titulo"], [data-field="capitulo"], [data-global-field="previewTitle"]');
  const isLead = selectedEditBlock?.dataset?.lneRole === "article-lead";
  const hasLegalGroup = !!selectedEditBlock?.closest?.(".legal-group");
  const resizable = enabled && (inBody || isLead || isArticleHeading || isStructural);
  indentLessBtn.disabled = !inBody;
  indentMoreBtn.disabled = !inBody;
  fontSmallerBtn.disabled = !resizable;
  fontLargerBtn.disabled = !resizable;
  alignPrevBtn.disabled = !inBody || !selectedEditBlock?.previousElementSibling;
  markIncisoBtn.disabled = !inBody;
  sublevelMoreBtn.disabled = !inBody;
  sublevelLessBtn.disabled = !inBody;
  leadCurrentBtn.disabled = !inBody;
  leadNextBtn.disabled = !inBody;
  mergePrevBtn.disabled = !inBody || !selectedEditBlock?.previousElementSibling;
  mergeNextBtn.disabled = !inBody || !selectedEditBlock?.nextElementSibling;
  formatDerogationBtn.disabled = !inBody;
  opacityBtn.disabled = !inBody;
  underlineBtn.disabled = !inBody;
  italicBtn.disabled = !inBody;
  deleteBlockBtn.disabled = !(enabled && (inBody || isArticleHeading || isStructural || isLead));
  paragraphBtn.disabled = !inBody;
  articleTitleBtn.disabled = !inBody;
  newArticleBtn.disabled = !(enabled && (inBody || isArticleHeading || (hasLegalGroup && (isStructural || isLead))));
  newDispositionBtn.disabled = !(enabled && (inBody || isArticleHeading || (hasLegalGroup && (isStructural || isLead))));
  if (structureTypeSelect) structureTypeSelect.disabled = !inBody;
}

function renderLegalPreview() {
  legalPreview.innerHTML = "";
  setSelectedEditBlock(null);
  legalPreview.classList.toggle("is-editing", previewEditing);

  if (!lastPreviewData?.length) {
    legalPreview.innerHTML = '<div class="preview-empty">Primero convierte un documento.</div>';
    return;
  }

  if (window.__LNE_LEGISLATION_MODE__) {
    const meta = document.createElement("article");
    meta.className = "legal-sheet admin-document-meta";
    meta.innerHTML = `<h1 class="admin-document-name" data-admin-meta="nombre"></h1><div class="admin-document-intro" data-admin-meta="introduccion"></div><div class="admin-image-placeholder">${adminDocumentMeta.nombre || adminDocumentMeta.codigo || "LEGISLACIÓN"}</div>`;
    meta.querySelector('[data-admin-meta="nombre"]').textContent = adminDocumentMeta.nombre || "LEGISLACIÓN";
    meta.querySelector('[data-admin-meta="introduccion"]').textContent = adminDocumentMeta.introduccion || "Escribe aquí la introducción de la legislación.";
    if (previewEditing) meta.querySelectorAll('[data-admin-meta]').forEach(node => { node.contentEditable = "true"; node.spellcheck = false; });
    legalPreview.appendChild(meta);
  }

  let sheet = null;
  let firstSheet = true;
  const makeSheet = () => {
    const el = document.createElement("article");
    el.className = "legal-sheet";
    legalPreview.appendChild(el);
    if (firstSheet) {
      const hideDocumentTitle = !!lastPreviewData?.[0]?.estiloDocumento?.ocultar;
      if (!hideDocumentTitle) {
      const docTitle = document.createElement("h1");
      docTitle.className = "legal-document-title";
      docTitle.dataset.globalField = "previewTitle";
      docTitle.textContent = (previewTitle.value || "NORMA LEGAL").trim();
      const docFont = Number(lastPreviewData?.[0]?.estiloDocumento?.fontSize || 0);
      if (docFont > 0) {
        docTitle.dataset.lneFontSize = String(docFont);
        docTitle.style.setProperty("font-size", `${docFont}px`, "important");
      }
      if (previewEditing) {
        docTitle.contentEditable = "true";
        docTitle.spellcheck = false;
      }
      el.appendChild(docTitle);
      const rule = document.createElement("div");
      rule.className = "legal-title-rule";
      el.appendChild(rule);
      }
      firstSheet = false;
    }
    return el;
  };

  lastPreviewData.forEach((group, groupIndex) => {
    if (!sheet || group.nuevaHoja) sheet = makeSheet();

    const groupWrap = document.createElement("section");
    groupWrap.className = "legal-group";
    groupWrap.dataset.groupIndex = String(groupIndex);
    sheet.appendChild(groupWrap);

    addHeadingBlock(groupWrap, group.titulo, "legal-major-heading", groupIndex, "titulo");
    addHeadingBlock(groupWrap, group.capitulo, "legal-subheading", groupIndex, "capitulo");

    (group.articulos || []).forEach((entry, articleIndex) => {
      const article = document.createElement("section");
      article.className = "legal-article";
      article.dataset.groupIndex = String(groupIndex);
      article.dataset.articleIndex = String(articleIndex);

      if (!entry.ocultarEncabezado) {
        const heading = document.createElement("h3");
        heading.className = "legal-article-title";
        heading.dataset.entryHeading = "1";
        heading.textContent = fullEntryHeading(entry);
        const customHeadingFont = Number(entry?.estiloTitulo?.fontSize || 0);
        if (customHeadingFont > 0) {
          heading.dataset.lneFontSize = String(customHeadingFont);
          heading.style.setProperty("font-size", `${customHeadingFont}px`, "important");
        }
        if (previewEditing) {
          heading.contentEditable = "true";
          heading.spellcheck = false;
          heading.title = "Edita aquí el encabezado completo del artículo";
        }
        article.appendChild(heading);
      }

      const body = document.createElement("div");
      body.className = "legal-article-body";
      body.innerHTML = entry.textoHtml || "";
      normalizeObviousMainNumbering(body);
      if (previewEditing) body.contentEditable = "true";
      article.appendChild(body);

      groupWrap.appendChild(article);
    });
  });
}

function collectPreviewEdits() {
  if (window.__LNE_LEGISLATION_MODE__) {
    const name = legalPreview.querySelector('[data-admin-meta="nombre"]');
    const introduction = legalPreview.querySelector('[data-admin-meta="introduccion"]');
    if (name) adminDocumentMeta.nombre = name.textContent.trim();
    if (introduction) adminDocumentMeta.introduccion = introduction.textContent.trim();
  }
  const editableDocumentTitle = legalPreview.querySelector('[data-global-field="previewTitle"]');
  if (editableDocumentTitle) {
    const editedTitle = editableDocumentTitle.textContent.trim();
    if (editedTitle) {
      previewTitle.value = editedTitle;
      automaticFields.previewTitle = false;
    }
  }

  document.querySelectorAll("#legalPreview .legal-group").forEach(groupEl => {
    const gi = Number(groupEl.dataset.groupIndex);
    const group = lastPreviewData[gi];
    if (!group) return;

    ["titulo", "capitulo"].forEach(field => {
      const el = groupEl.querySelector(`[data-field="${field}"]`);
      if (!el) return;
      if (el.dataset.sourceFormat === "html") {
        const clone = el.cloneNode(true);
        clone.querySelectorAll?.(".selected-edit-block").forEach(node => node.classList.remove("selected-edit-block"));
        group[field] = clone.innerHTML.trim();
      } else {
        group[field] = el.textContent.trim();
      }
    });

    groupEl.querySelectorAll(":scope > .legal-article").forEach(articleEl => {
      const ai = Number(articleEl.dataset.articleIndex);
      const entry = group.articulos?.[ai];
      if (!entry) return;
      const heading = articleEl.querySelector(".legal-article-title[data-entry-heading='1']");
      if (heading) {
        const parsedHeading = parseEditedEntryHeading(heading.textContent, entry);
        entry.numero = parsedHeading.numero;
        entry.titulo = parsedHeading.titulo;
      }
      const body = articleEl.querySelector(".legal-article-body");
      if (body) {
        const selectedInside = selectedEditBlock && body.contains(selectedEditBlock) ? selectedEditBlock : null;
        body.querySelectorAll(".selected-edit-block").forEach(el => el.classList.remove("selected-edit-block"));
        entry.textoHtml = body.innerHTML.trim();
        if (selectedInside?.isConnected) selectedInside.classList.add("selected-edit-block");
      }
    });
  });
}

function clonePreview(value = lastPreviewData) {
  return JSON.parse(JSON.stringify(value || []));
}

function updateHistoryButtons() {
  undoPreviewBtn.disabled = previewHistoryIndex <= 0;
  redoPreviewBtn.disabled = previewHistoryIndex < 0 || previewHistoryIndex >= previewHistory.length - 1;
}

function pushPreviewHistory() {
  if (!lastPreviewData.length) return;
  collectPreviewEdits();
  const snapshot = JSON.stringify(lastPreviewData);
  if (previewHistory[previewHistoryIndex] === snapshot) {
    updateHistoryButtons();
    return;
  }
  previewHistory = previewHistory.slice(0, previewHistoryIndex + 1);
  previewHistory.push(snapshot);
  if (previewHistory.length > 80) previewHistory.shift();
  previewHistoryIndex = previewHistory.length - 1;
  updateHistoryButtons();
  scheduleAutosave();
}

function resetPreviewHistory() {
  previewHistory = lastPreviewData.length ? [JSON.stringify(lastPreviewData)] : [];
  previewHistoryIndex = previewHistory.length - 1;
  updateHistoryButtons();
}

function schedulePreviewHistory() {
  clearTimeout(historyTimer);
  historyTimer = setTimeout(pushPreviewHistory, 350);
}

function restoreHistoryAt(index) {
  if (index < 0 || index >= previewHistory.length) return;
  clearTimeout(historyTimer);
  previewHistoryIndex = index;
  lastPreviewData = JSON.parse(previewHistory[index]);
  renderLegalPreview();
  updateHistoryButtons();
  previewEditStatus.textContent = index < previewHistory.length - 1 ? "Cambio deshecho" : "Cambio rehecho";
  scheduleAutosave();
}

function undoPreview() {
  if (historyTimer) {
    clearTimeout(historyTimer);
    historyTimer = null;
    pushPreviewHistory();
  }
  if (previewHistoryIndex > 0) restoreHistoryAt(previewHistoryIndex - 1);
}

function redoPreview() {
  if (previewHistoryIndex < previewHistory.length - 1) restoreHistoryAt(previewHistoryIndex + 1);
}

function applySuggestions(suggestions) {
  if (!suggestions) return;
  applyingAutomaticFields = true;
  if (automaticFields.variableName && suggestions.variableName) variableName.value = suggestions.variableName;
  if (automaticFields.outputName && suggestions.outputName) outputName.value = suggestions.outputName;
  if (automaticFields.previewTitle && suggestions.displayName) previewTitle.value = suggestions.displayName;
  applyingAutomaticFields = false;
}

function projectNameFromFields() {
  return (outputName.value || previewTitle.value || "proyecto")
    .replace(/\.js$/i, "")
    .replace(/[^A-Za-z0-9áéíóúÁÉÍÓÚñÑ_-]+/g, "_")
    .replace(/^_+|_+$/g, "") || "proyecto";
}

function selectedBlockState() {
  if (!selectedEditBlock?.isConnected) return null;
  const group = selectedEditBlock.closest('.legal-group');
  const article = selectedEditBlock.closest('.legal-article');
  const body = selectedEditBlock.closest('.legal-article-body');
  return {
    groupIndex: group ? Number(group.dataset.groupIndex) : null,
    articleIndex: article ? Number(article.dataset.articleIndex) : null,
    field: selectedEditBlock.dataset.field || selectedEditBlock.dataset.globalField || null,
    role: selectedEditBlock.dataset.lneRole || null,
    bodyChildIndex: body && selectedEditBlock.parentElement === body ? Array.from(body.children).indexOf(selectedEditBlock) : null
  };
}

function captureVisualState() {
  return {
    selectedBlock: selectedBlockState(),
    scrollY: Math.max(0, Math.round(window.scrollY || 0)),
    previewEditing,
    previewVisible: !previewSection.hidden,
    history: previewHistory.slice(-80),
    historyIndex: previewHistoryIndex
  };
}

function restoreVisualState(state = {}) {
  if (!lastPreviewData.length) return;
  setPreviewEditing(state.previewEditing !== false);
  previewSection.hidden = state.previewVisible === false;
  if (Array.isArray(state.history) && state.history.length) {
    previewHistory = state.history.slice(-80);
    previewHistoryIndex = Math.min(Math.max(Number(state.historyIndex) || 0, 0), previewHistory.length - 1);
    updateHistoryButtons();
  }
  requestAnimationFrame(() => {
    const saved = state.selectedBlock;
    if (saved) {
      const group = legalPreview.querySelector(`.legal-group[data-group-index="${saved.groupIndex}"]`);
      const article = group?.querySelector(`.legal-article[data-article-index="${saved.articleIndex}"]`);
      let target = null;
      if (saved.field) target = group?.querySelector(`[data-field="${saved.field}"], [data-global-field="${saved.field}"]`);
      if (!target && saved.role) target = article?.querySelector(`[data-lne-role="${saved.role}"]`);
      if (!target && Number.isInteger(saved.bodyChildIndex)) target = article?.querySelector('.legal-article-body')?.children[saved.bodyChildIndex];
      if (!target) target = article?.querySelector('.legal-article-title') || article;
      if (target) setSelectedEditBlock(target);
    }
    window.scrollTo({ top: Math.max(0, Number(state.scrollY) || 0), behavior: 'auto' });
  });
}

function captureProject() {
  if (lastPreviewData.length) collectPreviewEdits();
  return {
    format: "la-norma-express-project",
    version: 3,
    projectId: currentProjectId,
    projectName: projectName?.value?.trim() || projectNameFromFields(),
    sourceText: sourceText.value,
    variableName: variableName.value,
    outputName: outputName.value,
    previewTitle: previewTitle.value,
    resultText: resultText.value,
    preview: clonePreview(),
    originalPreview: clonePreview(originalPreviewData),
    extractionDiagnostics: lastExtractionDiagnostics,
    extractionHints: lastExtractionHints,
    preparedPdf: lastPreparedPdf,
    accentCorrections: lastExtractAccentCorrections,
    automaticFields: { ...automaticFields },
    visualState: captureVisualState(),
    savedAt: new Date().toISOString()
  };
}

function setProjectStatus(message, kind = "") {
  projectStatus.textContent = message;
  projectStatus.classList.toggle("ok", kind === "ok");
  projectStatus.classList.toggle("warn", kind === "warn");
}

function formatProjectDate(value) {
  if (!value) return "Todavía no guardado";
  return new Date(value).toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" });
}

function hasProjectContent() {
  return Boolean(sourceText.value.trim() || resultText.value.trim() || lastPreviewData.length);
}

function projectDisplayName() {
  return projectName.value.trim() || previewTitle.value.trim() || projectNameFromFields();
}

function updateProjectSummary(updatedAt) {
  currentProjectUpdatedAt = updatedAt || null;
  projectLastSaved.textContent = formatProjectDate(currentProjectUpdatedAt);
}

function projectLimitMessage() {
  return "Has alcanzado el límite de 5 proyectos temporales. Elimina uno para crear un nuevo proyecto.";
}

async function refreshProjectList() {
  try {
    const projects = await window.LNEProjectStore.list();
    projectsCount.textContent = `${projects.length} de ${window.LNEProjectStore.MAX_PROJECTS} proyectos`;
    projectsList.replaceChildren();
    if (!projects.length) {
      const empty = document.createElement("p");
      empty.className = "projects-empty";
      empty.textContent = "Todavía no hay proyectos guardados en este navegador.";
      projectsList.append(empty);
      return;
    }
    for (const record of projects) {
      const row = document.createElement("article");
      row.className = "project-list-item";
      const ordinal = document.createElement("span");
      ordinal.className = "project-list-number";
      ordinal.textContent = `${projects.indexOf(record) + 1}.`;
      const detail = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = record.name || "Proyecto sin nombre";
      const date = document.createElement("span");
      date.textContent = `Última modificación: ${formatProjectDate(record.updatedAt)}`;
      detail.append(name, date);
      const actions = document.createElement("div");
      actions.className = "project-list-actions";
      const open = document.createElement("button");
      open.type = "button";
      open.dataset.projectOpen = record.id;
      open.textContent = "Abrir";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.dataset.projectDelete = record.id;
      remove.textContent = "Eliminar";
      actions.append(open, remove);
      row.append(ordinal, detail, actions);
      projectsList.append(row);
    }
  } catch (_error) {
    setProjectStatus("No se pudo leer el almacenamiento local", "warn");
  }
}

async function saveProject({ automatic = false } = {}) {
  if (window.__LNE_LEGISLATION_MODE__ || restoringProject || !hasProjectContent()) return;
  if (!window.LNEProjectStore) throw new Error("El almacenamiento local no está disponible.");
  setProjectStatus("Guardando cambios…");
  const assigningNewId = !currentProjectId;
  currentProjectId ||= crypto.randomUUID();
  const updatedAt = new Date().toISOString();
  const name = projectDisplayName();
  projectName.value = name;
  const project = captureProject();
  project.projectId = currentProjectId;
  project.projectName = name;
  project.savedAt = updatedAt;
  try {
    await window.LNEProjectStore.put({ id: currentProjectId, name, updatedAt, project });
  } catch (error) {
    if (assigningNewId && error.code === "PROJECT_LIMIT_REACHED") currentProjectId = null;
    throw error;
  }
  updateProjectSummary(updatedAt);
  setProjectStatus(automatic ? "Proyecto guardado" : "✓ Proyecto guardado correctamente", "ok");
  if (projectsDialog.open) await refreshProjectList();
}

async function saveCheckpoint(reason = "cambio") {
  if (!lastPreviewData.length) return;
  return saveProject({ automatic: true });
}

function scheduleAutosave() {
  if (window.__LNE_LEGISLATION_MODE__ || restoringProject) return;
  clearTimeout(autosaveTimer);
  if (!hasProjectContent()) return;
  setProjectStatus("Cambios pendientes de guardado", "warn");
  autosaveTimer = setTimeout(() => saveProject({ automatic: true }).catch(error => setProjectStatus(error.message, "warn")), 2500);
}

function pdfBlocksToText(blocks) {
  return (blocks || []).map(block => block.type === "article" && !block.isBodyFont
    ? String(block.text || "").replace(/^[“"«]\s*(?=Art[íi]culo\s)/, "")
    : String(block.text || "")).join("\n\n");
}

function renderPdfPrevious() {
  const previous = lastPreparedPdf?.blocks?.slice(0, lastPreparedPdf.startIndex) || [];
  pdfPrevious.hidden = previous.length === 0;
  pdfPreviousList.replaceChildren();
  if (!previous.length) return;
  const fragment = document.createDocumentFragment();
  previous.forEach((block, index) => {
    const row = document.createElement("div");
    row.className = "pdf-previous-row";
    const label = document.createElement("span");
    label.textContent = `Pág. ${block.page || "?"} · ${block.text || "[contenido]"}`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Incluir desde aquí";
    button.dataset.index = String(index);
    row.append(label, button);
    fragment.append(row);
  });
  pdfPreviousList.append(fragment);
}

pdfPreviousList.addEventListener("click", async event => {
  const button = event.target.closest("button[data-index]");
  if (!button || !lastPreparedPdf) return;
  const index = Number(button.dataset.index);
  if (!Number.isInteger(index)) return;
  if (!confirm("Se guardará una copia del estado actual y se volverá a analizar desde este bloque. ¿Continuar?")) return;
  try {
    await saveCheckpoint("inicio_pdf");
    sourceText.value = pdfBlocksToText(lastPreparedPdf.blocks.slice(index));
    lastPreparedPdf.startIndex = index;
    renderPdfPrevious();
    showPreparedPreview = true;
    convertBtn.click();
  } catch (error) {
    setProjectStatus(`No se cambió el inicio: ${error.message}`, "warn");
  }
});

function loadProjectData(project) {
  if (project?.phase === "universal") {
    lastPreparedPdf = { blocks: [...(project.excluded || []), ...(project.blocks || [])], startIndex: (project.excluded || []).length, warnings: [] };
    sourceText.value = pdfBlocksToText(project.blocks || []);
    previewTitle.value = project.name || "NORMA LEGAL";
    lastExtractionHints = { pdfPrepared: true };
    renderPdfPrevious();
    fileStatus.textContent = `Preparación anterior recuperada: ${project.name || "PDF"}. Analizando en el editor único…`;
    showPreparedPreview = true;
    convertBtn.click();
    return;
  }
  if (!project || project.format !== "la-norma-express-project") throw new Error("El archivo no es un proyecto válido de La Norma Express.");
  restoringProject = true;
  clearTimeout(autosaveTimer);
  currentProjectId = project.projectId || currentProjectId || null;
  projectName.value = project.projectName || project.previewTitle || projectNameFromFields();
  updateProjectSummary(project.savedAt);
  sourceText.value = project.sourceText || "";
  variableName.value = project.variableName || "CodigoLegal";
  outputName.value = project.outputName || "datos_codigo.js";
  previewTitle.value = project.previewTitle || "NORMA LEGAL";
  resultText.value = project.resultText || "";
  lastPreviewData = clonePreview(project.preview || []);
  originalPreviewData = clonePreview(project.originalPreview || project.preview || []);
  lastExtractionDiagnostics = project.extractionDiagnostics || {};
  lastExtractionHints = project.extractionHints || {};
  lastPreparedPdf = project.preparedPdf || null;
  renderPdfPrevious();
  lastExtractAccentCorrections = project.accentCorrections || [];
  Object.assign(automaticFields, project.automaticFields || { variableName: false, outputName: false, previewTitle: false });
  previewEditing = false;
  codeEditing = false;
  codeNeedsSync = false;
  resultText.readOnly = true;
  resultText.classList.remove("is-editing");
  editCodeBtn.textContent = "Editar código";
  const hasPreview = !!lastPreviewData.length;
  previewSection.hidden = !hasPreview;
  previewBtn.disabled = !hasPreview;
  downloadBtn.disabled = !resultText.value;
  editCodeBtn.disabled = !resultText.value;
  syncCodeBtn.disabled = !resultText.value;
  exportDocxBtn.disabled = !hasPreview;
  restorePreviewBtn.disabled = !originalPreviewData.length;
  resetPreviewHistory();
  if (hasPreview) {
    previewSection.hidden = false;
    setPreviewEditing(true);
    restoreVisualState(project.visualState || {});
  }
  setProjectStatus("✓ Proyecto recuperado correctamente", "ok");
  requestAnimationFrame(() => { restoringProject = false; });
}

function resetProjectWorkspace() {
  restoringProject = true;
  clearTimeout(autosaveTimer);
  currentProjectId = null;
  updateProjectSummary(null);
  projectName.value = "Nuevo proyecto";
  sourceText.value = "";
  variableName.value = "CodigoLegal";
  outputName.value = "datos_codigo.js";
  previewTitle.value = "NORMA LEGAL";
  resultText.value = "";
  lastPreviewData = [];
  originalPreviewData = [];
  lastExtractionDiagnostics = {};
  lastExtractionHints = {};
  lastPreparedPdf = null;
  lastExtractAccentCorrections = [];
  publicationDraftKey = "";
  previewEditing = false;
  selectedEditBlock = null;
  codeEditing = false;
  codeNeedsSync = false;
  Object.assign(automaticFields, { variableName: true, outputName: true, previewTitle: true });
  previewSection.hidden = true;
  legalPreview.replaceChildren();
  resultText.readOnly = true;
  resultText.classList.remove("is-editing");
  editCodeBtn.textContent = "Editar código";
  [previewBtn, downloadBtn, editCodeBtn, syncCodeBtn, exportDocxBtn, restorePreviewBtn].forEach(button => { button.disabled = true; });
  fileStatus.textContent = "Ningún documento seleccionado";
  [stats, detectionDetail, warnings, notes, auditTrail].forEach(element => { element.replaceChildren(); });
  resetPreviewHistory();
  setProjectStatus("Nuevo proyecto listo");
  requestAnimationFrame(() => { restoringProject = false; });
}

function publicationSlug(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function escapePublicationText(value) {
  return String(value || "").replace(/[&<>"']/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
}

function publicationDestination() {
  return publicationForm.elements.publicationDestination.value;
}

function publicationSections() {
  return clonePreview(lastPreviewData).map(group => ({
    ...group,
    articulos: (group.articulos || []).map(entry => ({ ...entry, texto: entry.textoHtml || entry.texto || "" }))
  }));
}

function publicationArticles() {
  const rows = [];
  lastPreviewData.forEach((group, groupIndex) => (group.articulos || []).forEach((entry, articleIndex) => {
    const contenido = entry.textoHtml || entry.texto || "";
    rows.push({
      numero_articulo: String(entry.numero || "").trim(),
      titulo: entry.titulo || null,
      contenido,
      contenido_lne: {
        tipo: entry.tipo || "Artículo",
        numero: String(entry.numero || "").trim(),
        titulo: entry.titulo || null,
        texto: contenido,
        bloques: entry.bloques || null
      },
      estructura: {
        seccion: {
          titulo: group.titulo || null,
          capitulo: group.capitulo || null,
          nuevaHoja: !!group.nuevaHoja,
          grupo: groupIndex,
          posicion: articleIndex
        },
        publicacion: { tipo_publicacion: "legislacion", origen: "conversor-juridico" }
      }
    });
  }));
  return rows;
}

function publicationIdentity() {
  return {
    codigo: publicationSlug(publicationNormCode.value),
    slug: publicationSlug(publicationNormCode.value),
    nombre: publicationNormName.value.trim(),
    introduccion: publicationNormIntro.value.trim()
  };
}

function ensureFinalizePublicationButton() {
  let finalizePublicationBtn = document.getElementById("finalizeLinkedPublicationBtn");
  if (!finalizePublicationBtn) {
    finalizePublicationBtn = document.createElement("button");
    finalizePublicationBtn.id = "finalizeLinkedPublicationBtn";
    finalizePublicationBtn.type = "button";
    finalizePublicationBtn.textContent = "FINALIZAR PUBLICACIÓN";
    finalizePublicationBtn.addEventListener("click", () => document.dispatchEvent(new CustomEvent("lne-finalize-publication")));
  }
  const publicationDestinationPanel = publicationForm.querySelector(".publication-destination");
  if (publicationDestinationPanel && finalizePublicationBtn.previousElementSibling !== publicationDestinationPanel) {
    publicationDestinationPanel.after(finalizePublicationBtn);
  }
  finalizePublicationBtn.hidden = false;
  return finalizePublicationBtn;
}

function renderPublicationPreview() {
  ensureFinalizePublicationButton();
  if (!lastPreviewData.length || !window.LNEVisualRenderer || !window.LNEIntroductionRenderer) return;
  const identity = publicationIdentity();
  const presentationTitle = identity.nombre || previewTitle.value.trim() || "Documento jurídico";
  const normativeTitle = previewTitle.value.trim() || presentationTitle;
  const legalDocument = window.LNEVisualRenderer.buildNormHtml({ documentHeading:normativeTitle, hideEmbeddedDocumentHeader:true }, publicationSections());
  const publicPage = document.createElement("div");
  const introductionMount = document.createElement("div");
  const legalSection = document.createElement("section");
  publicPage.className = "container container-ley publication-public-page";
  legalSection.className = "publication-legal-document";
  legalSection.innerHTML = legalDocument;
  window.LNEIntroductionRenderer.render(introductionMount, {
    title: presentationTitle,
    displayTitle: presentationTitle,
    introduction: identity.introduccion || "Sin introducción",
    image: publicationImageObjectUrl ? {
      src: publicationImageObjectUrl,
      alt: presentationTitle,
      className: "intro-portada"
    } : null
  });
  if (introductionMount.firstElementChild) publicPage.appendChild(introductionMount.firstElementChild);
  publicPage.appendChild(legalSection);
  publicationPreview.replaceChildren(publicPage);
}

function resetPublicationReview() {
  preparedPublication = null;
  publicationSummary.hidden = true;
  confirmPublicationBtn.hidden = true;
  preparePublicationBtn.hidden = false;
  editPublicationBtn.hidden = true;
  newPublicationPanel.hidden = false;
  publicationError.textContent = "";
}

function updatePublicationDestination() {
  resetPublicationReview();
  renderPublicationPreview();
}

function openPublicationFlow() {
  collectPreviewEdits();
  if (!lastPreviewData.length) {
    setProjectStatus("No hay contenido jurídico para publicar.", "warn");
    return;
  }
  const nextDraftKey = `${currentProjectId || "sin-id"}::${projectName.value.trim()}::${variableName.value.trim()}`;
  if (publicationDraftKey !== nextDraftKey) {
    publicationDraftKey = nextDraftKey;
    publicationNormName.value = previewTitle.value.trim() === "NORMA LEGAL" ? "" : previewTitle.value.trim();
    publicationNormCode.value = publicationSlug(publicationNormName.value);
    publicationCodeManuallyEdited = false;
    publicationNormIntro.value = "";
    publicationImageFile = null;
    if (publicationImageObjectUrl) URL.revokeObjectURL(publicationImageObjectUrl);
    publicationImageObjectUrl = "";
    publicationNormImage.value = "";
    publicationImagePreview.style.backgroundImage = "";
    publicationImagePreview.classList.remove("has-image");
    publicationImageTitle.textContent = publicationNormName.value || "Nueva legislación";
    publicationForm.elements.publicationDestination.value = "legislacion";
  }
  resetPublicationReview();
  updatePublicationDestination();
  publicationDialog.showModal();
  document.body.classList.add("publication-active");
  window.parent.postMessage({ type: "lne-publication-ui-state", active: true }, window.location.origin);
  window.parent.postMessage({ type: "lne-publication-request-context", tipo_publicacion: publicationType.value }, window.location.origin);
}

function preparePublication() {
  collectPreviewEdits();
  const identity = publicationIdentity();
  const articles = publicationArticles();
  if (!articles.length || articles.some(article => !article.numero_articulo)) throw new Error("Todos los artículos deben tener número antes de publicar.");
  if (publicationDestination() !== "legislacion") throw new Error("Formación jurídica estará disponible en una fase posterior.");
  if (!identity.nombre || !identity.codigo) throw new Error("Nombre y código interno son obligatorios.");
  if (publicationContext.norms.some(norm => norm.codigo === identity.codigo)) throw new Error("Ya existe una legislación con ese código interno.");
  preparedPublication = {
    type: "lne-publication-submit",
    requestId: crypto.randomUUID(),
    tipo_publicacion: "legislacion",
    destination: "new",
    mode: "complete_norm",
    norm: identity,
    articles,
    projectId: currentProjectId,
    imageFile: publicationImageFile
  };
  publicationSummary.textContent = `Resumen:\n\nNorma: ${identity.nombre}\nContenido: ${articles.length} artículo${articles.length === 1 ? "" : "s"}\nDestino: Nueva legislación\nImagen: ${publicationImageFile ? publicationImageFile.name : "Sin imagen"}\n\n¿Confirmar publicación?`;
  publicationSummary.hidden = false;
  newPublicationPanel.hidden = true;
  preparePublicationBtn.hidden = true;
  editPublicationBtn.hidden = false;
  confirmPublicationBtn.hidden = true;
  const finalizePublicationBtn = ensureFinalizePublicationButton();
  console.log("[LNE] preparePublication(): botón FINALIZAR PUBLICACIÓN renderizado", finalizePublicationBtn);
}

async function completePublication(message) {
  if (message.requestId !== publicationRequestId) return;
  confirmPublicationBtn.disabled = false;
  if (!message.ok) {
    publicationError.textContent = `No se pudo publicar.\n\nTu proyecto sigue guardado temporalmente.${message.error ? `\n${message.error}` : ""}`;
    setProjectStatus("No se pudo publicar. Tu proyecto sigue guardado temporalmente.", "warn");
    return;
  }
  if (currentProjectId) await window.LNEProjectStore.removeAfterPublication(currentProjectId);
  currentProjectId = null;
  publicationDraftKey = "";
  updateProjectSummary(null);
  closePublicationFlow();
  setProjectStatus(`✓ ${message.articleCount || preparedPublication?.articles.length || 0} artículos publicados correctamente`, "ok");
  preparedPublication = null;
  publicationRequestId = null;
}

function closePublicationFlow() {
  publicationDialog.close();
}

publicationDialog.addEventListener("close", () => {
  document.body.classList.remove("publication-active");
  window.parent.postMessage({ type: "lne-publication-ui-state", active: false }, window.location.origin);
});

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function escapeTemplateClient(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function serializePreviewToJs(preview, requestedVariableName) {
  const variable = String(requestedVariableName || "CodigoLegal")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9_$]/g, "_") || "CodigoLegal";
  const safeVariable = /^[A-Za-z_$]/.test(variable) ? variable : `_${variable}`;
  const lines = [`const ${safeVariable} = [`];

  preview.forEach((group, gi) => {
    lines.push("  {");
    if (typeof group.nuevaHoja === "boolean") lines.push(`    nuevaHoja: ${group.nuevaHoja ? "true" : "false"},`);
    for (const field of ["titulo", "capitulo"]) {
      const value = String(group[field] || "");
      if (value.includes("<div")) lines.push(`    ${field}: \`\n${escapeTemplateClient(value)}\n\`,`);
      else lines.push(`    ${field}: ${JSON.stringify(value)},`);
    }
    if (group.estiloDocumento) lines.push(`    estiloDocumento: ${JSON.stringify(group.estiloDocumento)},`);
    if (group.estiloTitulo) lines.push(`    estiloTitulo: ${JSON.stringify(group.estiloTitulo)},`);
    if (group.estiloCapitulo) lines.push(`    estiloCapitulo: ${JSON.stringify(group.estiloCapitulo)},`);
    lines.push("    articulos: [");
    (group.articulos || []).forEach((entry, ai) => {
      lines.push("      {");
      lines.push(`        tipo: ${JSON.stringify(entry.tipo || "Artículo")},`);
      lines.push(`        numero: ${JSON.stringify(entry.numero || "")},`);
      lines.push(`        titulo: ${JSON.stringify(entry.titulo || "")},`);
      if (entry.estiloTitulo) lines.push(`        estiloTitulo: ${JSON.stringify(entry.estiloTitulo)},`);
      if (entry.ocultarEncabezado) lines.push("        ocultarEncabezado: true,");
      lines.push(`        texto: \`\n${escapeTemplateClient(entry.textoHtml || "")}\n\``);
      lines.push(ai === group.articulos.length - 1 ? "      }" : "      },");
    });
    lines.push("    ]");
    lines.push(gi === preview.length - 1 ? "  }" : "  },");
  });
  lines.push("];\n");
  return lines.join("\n");
}

function legalHtmlToSourceLines(html) {
  const holder = document.createElement("div");
  holder.innerHTML = String(html || "");
  const blocks = [...holder.children];
  if (!blocks.length) return normalizeInlineText(holder.textContent) ? [normalizeInlineText(holder.textContent)] : [];
  return blocks.map(block => {
    if (block.dataset?.lneList === "1") {
      const marker = block.querySelector(':scope > [data-lne-marker="1"]')?.textContent || "";
      const content = block.querySelector(':scope > div:last-child')?.innerText || "";
      return normalizeInlineText(`${marker} ${content}`);
    }
    return String(block.innerText || block.textContent || "")
      .split(/\r?\n/).map(normalizeInlineText).filter(Boolean).join(" ");
  }).filter(Boolean);
}

function previewToSourceText(preview = lastPreviewData) {
  const lines = [];
  for (const group of preview || []) {
    lines.push(...legalHtmlToSourceLines(group.titulo));
    lines.push(...legalHtmlToSourceLines(group.capitulo));
    for (const entry of group.articulos || []) {
      const heading = fullEntryHeading(entry);
      if (heading) lines.push(heading);
      lines.push(...legalHtmlToSourceLines(entry.textoHtml));
    }
  }
  return lines.join("\n\n").trim();
}

function renderEditedAnalysis(data) {
  const s = data.stats || {};
  const chips = [
    `<span>✓ ${s.articulos || 0} artículos reales</span>`,
    `<span>✓ ${s.titulos || 0} títulos</span>`,
    `<span>✓ ${s.capitulos || 0} capítulos</span>`,
    `<span>✓ ${s.subnumeralesDecimales || 0} subnumerales decimales</span>`,
    `<span>✓ JavaScript válido</span>`
  ];
  if (s.alertasSecuencia) chips.push(`<span class="warning-chip">⚠ ${s.alertasSecuencia} posible${s.alertasSecuencia === 1 ? "" : "s"} falla${s.alertasSecuencia === 1 ? "" : "s"} de secuencia</span>`);
  stats.innerHTML = chips.join("");
  detectionDetail.innerHTML = [
    s.secuenciaArticulos ? `<div><strong>Secuencia de artículos:</strong> ${s.secuenciaArticulos}</div>` : "",
    s.secuenciaNormas ? `<div><strong>Normas del preliminar:</strong> ${s.secuenciaNormas}</div>` : "",
    `<div><strong>Total de entradas jurídicas:</strong> ${s.entradas || 0}</div>`,
    `<div><strong>Subnumerales reconocidos:</strong> ${s.subnumeralesDecimales || 0} decimales; ${s.subnumeralesProfundos || 0} profundos.</div>`
  ].join("");
  warnings.innerHTML = data.warnings?.length ? renderList("Revisar", data.warnings) : "<strong>✓ Sin alertas estructurales en la edición actual.</strong>";
  notes.innerHTML = renderList("Control actualizado", [
    "Los contadores, secuencias y revisiones se recalcularon desde la vista editada.",
    ...(data.notes || [])
  ]);
  auditTrail.innerHTML = data.coverage?.missing
    ? `<strong>Revisión de integridad:</strong> ${data.coverage.coveragePercent}% de fragmentos coinciden tras la edición.`
    : "<strong>✓ Revisión de integridad actualizada desde la vista editada.</strong>";
}

async function refreshEditedAnalysis() {
  const editedText = previewToSourceText();
  if (!editedText) return;
  sourceText.value = editedText;
  try {
    const response = await converterFetch("/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editedText, variableName: variableName.value, extractionHints: {} })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "No se pudo actualizar el control.");
    renderEditedAnalysis(data);
    previewEditStatus.textContent = "✓ Cambios aplicados, texto y control automático actualizados";
    previewEditStatus.classList.add("ok");
  } catch (error) {
    previewEditStatus.textContent = `Cambios aplicados al .js; falta actualizar el control: ${error.message}`;
  }
}

function applyPreviewChangesToJs() {
  if (previewEditing) pushPreviewHistory();
  collectPreviewEdits();
  const js = serializePreviewToJs(lastPreviewData, variableName.value);
  try {
    // Compila, pero no ejecuta el contenido. Solo valida sintaxis.
    new Function(js);
  } catch (error) {
    alert(`Los cambios visuales produjeron JavaScript inválido: ${error.message}`);
    return;
  }
  resultText.value = js;
  codeNeedsSync = false;
  syncCodeBtn.disabled = false;
  previewEditStatus.textContent = "✓ Cambios aplicados al .js";
  previewEditStatus.classList.add("ok");
  downloadBtn.disabled = false;
  scheduleAutosave();
  void refreshEditedAnalysis();
}

function setPreviewEditing(enabled) {
  previewEditing = !!enabled;
  previewEditStatus.classList.remove("ok");
  previewEditStatus.textContent = previewEditing ? "Modo edición activo" : "Vista de lectura";
  editPreviewBtn.textContent = previewEditing ? "Terminar edición" : "Editar vista previa";
  editPreviewBtn.setAttribute("aria-pressed", String(previewEditing));
  applyPreviewBtn.disabled = window.__LNE_LEGISLATION_MODE__ ? !previewEditing : !lastPreviewData.length;
  restorePreviewBtn.disabled = !originalPreviewData.length;
  renderLegalPreview();
}

function adjustSelectedIndent(delta) {
  const block = selectedBodyBlock();
  if (!block) return;
  const current = parseFloat(block.style.marginLeft || "0") || 0;
  const next = Math.max(0, Math.min(240, current + delta));
  block.style.marginLeft = next ? `${next}px` : "";
  previewEditStatus.textContent = `✓ Sangría ${next ? `${Math.round(next)} px` : "eliminada"}`;
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function selectedBodyBlock() {
  const selected = selectedEditBlock;
  if (selected?.isConnected && selected.closest?.(".legal-article-body")) return selected;
  const fromCursor = directBlockFromSelection();
  if (fromCursor?.closest?.(".legal-article-body")) {
    setSelectedEditBlock(fromCursor);
    return fromCursor;
  }
  previewEditStatus.textContent = "Haz clic dentro del párrafo o inciso que deseas modificar.";
  return null;
}

function adjustSelectedFontSize(delta) {
  const block = selectedEditBlock;
  if (!block) return;
  const inBody = !!block.closest?.('.legal-article-body');
  const isLead = block.dataset?.lneRole === "article-lead";
  const isArticleHeading = !!block.matches?.('.legal-article-title[data-entry-heading="1"]');
  const isStructural = !!block.matches?.('[data-field="titulo"], [data-field="capitulo"], [data-global-field="previewTitle"]');
  if (!inBody && !isLead && !isArticleHeading && !isStructural) return;

  const current = Number(block.dataset.lneFontSize || "0");
  const base = current > 0 ? current : (parseFloat(getComputedStyle(block).fontSize) || 14);
  const next = Math.max(10, Math.min(48, Math.round((base + delta) * 10) / 10));
  block.dataset.lneFontSize = String(next);
  block.style.setProperty("font-size", `${next}px`, "important");
  block.querySelectorAll("*").forEach(child => child.style.setProperty("font-size", "inherit", "important"));

  if (isArticleHeading) {
    const articleEl = block.closest('.legal-article');
    const gi = Number(articleEl?.dataset?.groupIndex);
    const ai = Number(articleEl?.dataset?.articleIndex);
    const entry = lastPreviewData?.[gi]?.articulos?.[ai];
    if (entry) entry.estiloTitulo = { ...(entry.estiloTitulo || {}), fontSize: next };
  } else if (block.dataset?.field) {
    const gi = Number(block.dataset.groupIndex);
    const group = lastPreviewData?.[gi];
    const key = block.dataset.field === 'titulo' ? 'estiloTitulo' : 'estiloCapitulo';
    if (group) group[key] = { ...(group[key] || {}), fontSize: next };
  } else if (block.dataset?.globalField === 'previewTitle' && lastPreviewData?.[0]) {
    lastPreviewData[0].estiloDocumento = { ...(lastPreviewData[0].estiloDocumento || {}), fontSize: next };
  }

  previewEditStatus.textContent = `✓ Tamaño ${Math.round(next)} px`;
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function alignSelectedWithPrevious() {
  const block = selectedBodyBlock();
  if (!block) return;
  if (block.dataset?.lneList === "1") {
    applyStandardListLevel(block);
    previewEditStatus.textContent = "✓ Inciso alineado según su nivel jurídico";
    previewEditStatus.classList.add("ok");
    pushPreviewHistory();
    return;
  }
  const previous = block.previousElementSibling;
  if (!previous) return;
  let reference = previous;
  if (getComputedStyle(previous).display === "flex") {
    reference = previous.querySelector(":scope > div:last-child") || previous;
  }
  // Alinear significa que el TEXTO del bloque inicia donde comienza el texto
  // anterior, no donde comienza su marcador (1., a), etc.).
  const bodyLeft = block.closest(".legal-article-body")?.getBoundingClientRect().left || 0;
  const next = Math.max(0, Math.min(240, Math.round((reference.getBoundingClientRect().left - bodyLeft) * 10) / 10));
  block.style.marginLeft = next ? `${next}px` : "";
  previewEditStatus.textContent = "✓ Alineado con el inicio del texto anterior";
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function mergeSelectedWithPrevious() {
  const block = selectedEditBlock;
  const prev = block?.previousElementSibling;
  if (!block || !prev) return;

  let target = prev;
  if (prev.style.display === "flex" || getComputedStyle(prev).display === "flex") {
    const divs = prev.querySelectorAll(":scope > div");
    if (divs.length) target = divs[divs.length - 1];
  }
  const left = target.textContent.trim();
  const right = block.textContent.trim();
  target.textContent = `${left}${left && right ? " " : ""}${right}`;
  block.remove();
  setSelectedEditBlock(null);
  pushPreviewHistory();
}

function mergeSelectedWithNext() {
  const block = selectedEditBlock;
  const next = block?.nextElementSibling;
  if (!block || !next) return;
  let source = next;
  if (getComputedStyle(next).display === "flex") source = next.querySelector(":scope > div:last-child") || next;
  const left = block.textContent.trim();
  const right = source.textContent.trim();
  block.textContent = `${left}${left && right ? " " : ""}${right}`;
  next.remove();
  setSelectedEditBlock(block);
  pushPreviewHistory();
}

function manualListMarkerInfo(text) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  const patterns = [
    [/^((?:\d+(?:-[A-ZÑ]+)+)\.\d+(?:\.\d+)*(?:\.|\))?)\s+(.+)$/i, "article-decimal", 60],
    [/^((?:\d+\.)+\d+(?:\.|\))?|\d+\.\d+(?:\.|\))?)\s+(.+)$/, "decimal", 55],
    [/^([a-zA-ZñÑ]\.\d+(?:\.\d+)*(?:\.|\))?)\s+(.+)$/, "alpha-decimal", 50],
    [/^(\([ivxlcdmIVXLCDM]+\))\s+(.+)$/, "roman", 44],
    [/^([ivxlcdmIVXLCDM]+[.)])\s+(.+)$/, "roman", 44],
    [/^(\(\d+\))\s+(.+)$/, "number", 42],
    [/^(\([a-zA-ZñÑ]\))\s+(.+)$/, "letter", 42],
    [/^([a-zA-ZñÑ][.)])\s+(.+)$/, "letter", 35],
    [/^((?:\d+)(?:\.\s*[-–—]?|\)))\s*(.+)$/, "number", 35],
    [/^([–—-])\s+(.+)$/, "dash", 35]
  ];
  for (const [re, kind, baseWidth] of patterns) {
    const m = t.match(re);
    if (m) return { marker: m[1].replace(/\s+/g, ""), text: m[2], kind, width: Math.max(baseWidth, 22 + m[1].length * 7) };
  }
  return null;
}

function listLevelOf(block) {
  if (!block) return 0;
  const value = Number(block.dataset?.lneLevel);
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function listMarkerWidth(block) {
  const marker = block?.querySelector?.(':scope > [data-lne-marker="1"], :scope > span');
  if (!marker) return 35;
  const inline = parseFloat(marker.style.flexBasis || marker.style.minWidth || "");
  if (Number.isFinite(inline) && inline > 0) return inline;
  return Math.max(35, Math.round(marker.getBoundingClientRect().width || 35));
}

function nearestSiblingLegalList(block) {
  let node = block?.previousElementSibling;
  while (node) {
    if (node.dataset?.lneList === "1") return node;
    node = node.previousElementSibling;
  }
  node = block?.nextElementSibling;
  while (node) {
    if (node.dataset?.lneList === "1") return node;
    node = node.nextElementSibling;
  }
  return null;
}

function copyLegalListAlignment(block, reference) {
  if (!block || !reference) return;
  const referenceLeft = parseFloat(reference.style.marginLeft || "0") || 0;
  block.style.marginLeft = referenceLeft ? `${referenceLeft}px` : "";
  block.dataset.lneLevel = String(listLevelOf(reference));
  const marker = block.querySelector(':scope > [data-lne-marker="1"]');
  const referenceMarker = reference.querySelector(':scope > [data-lne-marker="1"]');
  if (marker && referenceMarker) {
    const width = listMarkerWidth(reference);
    marker.style.minWidth = `${width}px`;
    marker.style.flex = `0 0 ${width}px`;
  }
}

function simpleNumberMarkerValue(block) {
  if (block?.dataset?.lneKind !== "number") return null;
  const raw = block.querySelector(':scope > [data-lne-marker="1"]')?.textContent?.trim() || "";
  const match = raw.match(/^\(?([0-9]+)\)?[.)]?$/);
  return match ? Number(match[1]) : null;
}

function preferredListLevel(block) {
  const kind = block?.dataset?.lneKind || manualListMarkerInfo(block?.textContent)?.kind || "";
  const marker = block?.querySelector(':scope > [data-lne-marker="1"]')?.textContent?.trim() || "";
  if (kind === "number" || kind === "dash") return 0;
  if (kind === "decimal") return Math.max(1, (marker.match(/\./g) || []).length);
  if (kind === "article-decimal") return Math.max(0, (marker.split(".").length - 2));
  const previous = previousLegalList(block);
  if (["letter", "alpha-decimal"].includes(kind) && previous) return Math.min(8, listLevelOf(previous) + 1);
  return 0;
}

function applyStandardListLevel(block) {
  const level = Math.max(0, Math.min(8, preferredListLevel(block)));
  block.dataset.lneLevel = String(level);
  const left = hierarchyLeftForBlock(block, level);
  block.style.marginLeft = left ? `${left}px` : "";
  applyStandardListMarkerWidth(block);
  return level;
}

function applyStandardListMarkerWidth(block) {
  const marker = block?.querySelector(':scope > [data-lne-marker="1"]');
  if (!marker) return;
  const kind = block.dataset?.lneKind || "";
  const value = marker.textContent.trim();
  let width = 35;
  if (kind === "roman" || String(kind).startsWith("roman")) width = 44;
  else if (kind === "decimal") width = Math.max(55, 35 + Math.max(1, (value.match(/\./g) || []).length) * 10);
  else if (kind === "article-decimal") width = Math.max(60, 35 + value.length * 5);
  else if (kind === "alpha-decimal") width = Math.max(50, 40 + Math.max(1, (value.match(/\./g) || []).length) * 10);
  else if (kind === "number") width = Math.max(35, 20 + value.length * 7);
  marker.style.minWidth = `${width}px`;
  marker.style.flex = `0 0 ${width}px`;
}

function normalizeObviousMainNumbering(body) {
  const children = [...(body?.children || [])];
  for (let start = 0; start < children.length; start++) {
    if (simpleNumberMarkerValue(children[start]) !== 1) continue;
    const run = [children[start]];
    let expected = 2;
    for (let index = start + 1; index < children.length; index++) {
      const value = simpleNumberMarkerValue(children[index]);
      if (value == null) break;
      if (value !== expected) break;
      run.push(children[index]);
      expected++;
    }
    // Una secuencia 1, 2, ... después de un párrafo introductorio es una lista
    // principal. Nunca debe quedar desplazada como un subinciso por una edición previa.
    if (run.length >= 2) run.forEach(item => {
      item.dataset.lneLevel = "0";
      item.style.marginLeft = "";
    });
    start += Math.max(0, run.length - 1);
  }
}

function previousListAtLevel(block, wantedLevel) {
  let node = block?.previousElementSibling;
  while (node) {
    if (node.dataset?.lneList === "1" && listLevelOf(node) === wantedLevel) return node;
    node = node.previousElementSibling;
  }
  return null;
}

function hierarchyLeftForBlock(block, level) {
  if (level <= 0) return 0;
  const parent = previousListAtLevel(block, level - 1);
  if (parent) {
    const parentLeft = parseFloat(parent.style.marginLeft || "0") || 0;
    return parentLeft + listMarkerWidth(parent);
  }
  // Respaldo claro si el padre no está visible: mantiene niveles distinguibles.
  const fallbackWidths = [60, 35, 44, 44, 44, 44];
  return fallbackWidths.slice(0, level).reduce((sum, value) => sum + value, 0);
}

function ensureSelectedListBlock() {
  let block = selectedBodyBlock();
  if (!block) return null;
  if (block.dataset?.lneList === "1") return block;

  const info = manualListMarkerInfo(block.textContent);
  if (!info) {
    previewEditStatus.textContent = "El texto no empieza con un marcador reconocido (1., a), (i), 106.1...). Escríbelo al inicio y vuelve a pulsar.";
    return null;
  }
  const outer = document.createElement("div");
  outer.dataset.lneList = "1";
  outer.dataset.lneLevel = "0";
  outer.dataset.lneKind = info.kind;
  outer.style.display = "flex";
  outer.style.marginBottom = "10px";
  outer.style.lineHeight = "1.5";
  outer.style.textAlign = "justify";

  const marker = document.createElement("span");
  marker.dataset.lneMarker = "1";
  marker.textContent = info.marker;
  marker.style.minWidth = `${info.width}px`;
  marker.style.flex = `0 0 ${info.width}px`;
  const content = document.createElement("div");
  content.textContent = info.text;
  outer.append(marker, content);
  block.replaceWith(outer);
  setSelectedEditBlock(outer);
  return outer;
}

function setSelectedLegalLevel(level) {
  const block = ensureSelectedListBlock();
  if (!block) return;
  const nextLevel = Math.max(0, Math.min(8, Number(level) || 0));
  block.dataset.lneLevel = String(nextLevel);
  const left = hierarchyLeftForBlock(block, nextLevel);
  block.style.marginLeft = left ? `${left}px` : "";
  previewEditStatus.textContent = nextLevel === 0 ? "✓ Marcado como inciso principal" : `✓ Subnivel jurídico ${nextLevel}`;
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function previousLegalList(block) {
  let node = block?.previousElementSibling;
  while (node) {
    if (node.dataset?.lneList === "1") return node;
    node = node.previousElementSibling;
  }
  return null;
}

function suggestedLevelForList(block) {
  if (!block) return 0;
  const currentKind = block.dataset?.lneKind || manualListMarkerInfo(block.textContent)?.kind || "";
  const prev = previousLegalList(block);
  if (!prev) return 0;
  const prevKind = prev.dataset?.lneKind || "";
  const prevLevel = listLevelOf(prev);

  const currentRoman = String(currentKind).startsWith("roman");
  const prevRoman = String(prevKind).startsWith("roman");
  if (currentKind === prevKind || (currentRoman && prevRoman)) return prevLevel;
  if (["letter", "alpha-decimal"].includes(currentKind) && ["number", "decimal", "article-decimal"].includes(prevKind)) return prevLevel + 1;
  if (currentKind === "alpha-decimal" && prevKind === "letter") return prevLevel + 1;
  if (currentRoman && ["letter", "alpha-decimal"].includes(prevKind)) return prevLevel + 1;
  if (currentKind === "number" && prevRoman) return prevLevel + 1;
  if (["number", "decimal", "article-decimal"].includes(currentKind) && (["letter", "alpha-decimal"].includes(prevKind) || prevRoman)) return Math.max(0, prevLevel - 1);
  return prevLevel;
}

function markSelectedAsInciso() {
  const block = ensureSelectedListBlock();
  if (!block) return;
  const level = applyStandardListLevel(block);
  const marker = block.querySelector(':scope > [data-lne-marker="1"]');
  if (marker) marker.style.fontWeight = "400";
  previewEditStatus.textContent = level === 0
    ? "✓ Inciso principal reconocido y alineado"
    : `✓ Inciso reconocido como subnivel ${level}`;
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function deleteSelectedBlock() {
  const block = selectedEditBlock?.isConnected ? selectedEditBlock : editableTargetBlock(window.getSelection()?.anchorNode?.parentElement);
  if (!block) return;
  const articleHeading = block.matches?.('.legal-article-title[data-entry-heading="1"]');
  const structural = block.matches?.('[data-field="titulo"], [data-field="capitulo"]');
  const documentTitle = block.matches?.('[data-global-field="previewTitle"]');
  if (structural) {
    const group = lastPreviewData?.[Number(block.dataset.groupIndex)];
    if (group) group[block.dataset.field] = "";
    block.remove();
    setSelectedEditBlock(null);
    previewEditStatus.textContent = "✓ Título o capítulo eliminado.";
    previewEditStatus.classList.add("ok");
    pushPreviewHistory();
    return;
  }
  if (documentTitle) {
    if (lastPreviewData?.[0]) lastPreviewData[0].estiloDocumento = { ...(lastPreviewData[0].estiloDocumento || {}), ocultar: true };
    const sheet = block.parentElement;
    block.remove();
    sheet?.querySelector(".legal-title-rule")?.remove();
    setSelectedEditBlock(null);
    previewEditStatus.textContent = "✓ Título general eliminado.";
    previewEditStatus.classList.add("ok");
    pushPreviewHistory();
    return;
  }
  if (articleHeading) {
    const article = block.closest(".legal-article");
    const gi = Number(article?.dataset.groupIndex);
    const ai = Number(article?.dataset.articleIndex);
    const group = lastPreviewData?.[gi];
    const entry = group?.articulos?.[ai];
    if (!entry) return;
    // El encabezado representa la entrada completa: al eliminarlo no queda un
    // número huérfano ni un cuadro vacío que se duplique en la vista final.
    group.articulos.splice(ai, 1);
    renderLegalPreview();
    previewEditStatus.textContent = `✓ ${entry.tipo === "Disposición" ? "Disposición" : "Artículo"} eliminado completo. Puedes recuperarlo con Deshacer.`;
    previewEditStatus.classList.add("ok");
    pushPreviewHistory();
    return;
  }
  const body = block.closest?.(".legal-article-body");
  if (!body) return;
  const isTable = !!block.querySelector("table");
  const hasText = !!block.textContent.trim();
  if (hasText || isTable) {
    const label = isTable ? "la tabla/cuadro seleccionado" : "el bloque seleccionado";
    if (!confirm(`¿Eliminar ${label}? Podrás recuperarlo con Deshacer.`)) return;
  }
  const replacement = block.previousElementSibling || block.nextElementSibling;
  block.remove();
  setSelectedEditBlock(replacement || null);
  previewEditStatus.textContent = "✓ Cuadro o bloque eliminado. Puedes recuperarlo con Deshacer.";
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}


function convertSelectedToParagraph() {
  const block = selectedEditBlock;
  const body = block?.closest?.('.legal-article-body');
  if (!block || !body) {
    previewEditStatus.textContent = "Selecciona un bloque dentro del texto del artículo.";
    return;
  }
  if (block.dataset?.lneList !== "1") {
    block.style.marginLeft = "";
    block.removeAttribute("data-lne-level");
    block.removeAttribute("data-lne-kind");
    previewEditStatus.textContent = "✓ Bloque tratado como párrafo normal";
    previewEditStatus.classList.add("ok");
    pushPreviewHistory();
    return;
  }
  const marker = block.querySelector(':scope > [data-lne-marker="1"]')?.textContent?.trim() || "";
  const content = block.querySelector(':scope > div:last-child')?.textContent?.trim() || "";
  const paragraph = document.createElement("div");
  paragraph.style.marginBottom = "15px";
  paragraph.style.textAlign = "justify";
  paragraph.style.lineHeight = "1.5";
  paragraph.textContent = `${marker}${marker && content ? " " : ""}${content}`;
  block.replaceWith(paragraph);
  setSelectedEditBlock(paragraph);
  previewEditStatus.textContent = "✓ Convertido a párrafo normal";
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function moveSelectedToArticleTitle() {
  const block = selectedEditBlock;
  if (!block) return;
  if (block.matches?.('.legal-article-title[data-entry-heading="1"]')) {
    previewEditStatus.textContent = "Ese bloque ya es el encabezado completo del artículo.";
    return;
  }
  const articleEl = block.closest?.('.legal-article');
  const body = block.closest?.('.legal-article-body');
  if (!articleEl || !body) {
    previewEditStatus.textContent = "Selecciona la línea que debe convertirse en título del artículo.";
    return;
  }
  const titleText = normalizeInlineText(block.textContent);
  if (!titleText) return;
  const gi = Number(articleEl.dataset.groupIndex);
  const ai = Number(articleEl.dataset.articleIndex);
  const entry = lastPreviewData?.[gi]?.articulos?.[ai];
  if (!entry) return;

  block.remove();
  body.querySelectorAll('.selected-edit-block').forEach(el => el.classList.remove('selected-edit-block'));
  entry.textoHtml = body.innerHTML.trim();
  const existing = normalizeInlineText(entry.titulo || "");
  entry.titulo = existing && !existing.includes(titleText) ? `${existing} ${titleText}` : (existing || titleText);
  renderLegalPreview();
  previewEditStatus.textContent = "✓ Línea convertida en título / sumilla del artículo";
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function promptManualArticleHeading(defaultText = "") {
  const normalizedDefault = normalizeInlineText(defaultText);
  const suggested = /^Artículo\s+/i.test(normalizedDefault)
    ? normalizedDefault
    : "Artículo ";
  const answer = window.prompt(
    "Escribe el encabezado del artículo nuevo. Ejemplos: Artículo 76-A.- Nombre / Artículo 120. / Artículo Único.- Objeto",
    suggested
  );
  if (answer === null) return null;
  const raw = /^Artículo\s+/i.test(answer.trim()) ? answer.trim() : `Artículo ${answer.trim()}`;
  const parsed = parseEditedEntryHeading(raw, { tipo: "Artículo", numero: "", titulo: "" });
  if (!parsed.numero) return null;
  return parsed;
}

function createArticleFromSelectedBlock() {
  const block = selectedEditBlock;
  if (!block) {
    previewEditStatus.textContent = "Selecciona el punto donde debe empezar el artículo nuevo.";
    return;
  }

  const articleEl = block.closest?.('.legal-article');
  if (!articleEl) {
    const groupEl = block.closest?.(".legal-group");
    const gi = Number(groupEl?.dataset?.groupIndex);
    const group = lastPreviewData?.[gi];
    if (!group) {
      previewEditStatus.textContent = "Selecciona un capítulo, subtítulo o artículo para indicar dónde crear el artículo nuevo.";
      return;
    }
    const parsed = promptManualArticleHeading();
    if (!parsed?.numero) {
      previewEditStatus.textContent = "No se creó el artículo: falta un número válido.";
      return;
    }
    // Bajo una estructura, el artículo aparece inmediatamente debajo de ella,
    // antes de los artículos que ya pertenecen al mismo bloque.
    group.articulos = group.articulos || [];
    group.articulos.unshift({ tipo: "Artículo", numero: parsed.numero, titulo: parsed.titulo || "", textoHtml: "" });
    renderLegalPreview();
    previewEditStatus.textContent = `✓ Artículo ${parsed.numero} añadido debajo de la estructura seleccionada`;
    previewEditStatus.classList.add("ok");
    pushPreviewHistory();
    return;
  }

  const gi = Number(articleEl.dataset.groupIndex);
  const ai = Number(articleEl.dataset.articleIndex);
  const group = lastPreviewData?.[gi];
  const currentEntry = group?.articulos?.[ai];
  if (!group || !currentEntry) return;

  const isArticleHeading = block.matches?.('.legal-article-title[data-entry-heading="1"]');
  const body = isArticleHeading ? articleEl.querySelector('.legal-article-body') : block.closest?.('.legal-article-body');
  const raw = normalizeInlineText(block.textContent);
  const sourceAlreadyHeading = !isArticleHeading && /^Artículo\s+/i.test(raw);

  let parsed = sourceAlreadyHeading
    ? parseEditedEntryHeading(raw, { tipo: "Artículo", numero: "", titulo: "" })
    : null;

  if (!parsed?.numero) parsed = promptManualArticleHeading(sourceAlreadyHeading ? raw : "");
  if (!parsed?.numero) {
    previewEditStatus.textContent = "No se creó el artículo: falta un número válido.";
    return;
  }

  // Caso 1: se seleccionó el encabezado del artículo actual. Se inserta un artículo
  // vacío inmediatamente después; así el botón sirve incluso cuando no existe una
  // línea “Artículo N” perdida dentro del cuerpo.
  if (isArticleHeading) {
    group.articulos.splice(ai + 1, 0, {
      tipo: "Artículo",
      numero: parsed.numero,
      titulo: parsed.titulo || "",
      textoHtml: ""
    });
    renderLegalPreview();
    previewEditStatus.textContent = `✓ Artículo ${parsed.numero} añadido después del artículo actual`;
    previewEditStatus.classList.add("ok");
    pushPreviewHistory();
    return;
  }

  if (!body) {
    previewEditStatus.textContent = "Selecciona un bloque dentro del cuerpo del artículo.";
    return;
  }

  const children = [...body.children];
  const startIndex = children.indexOf(block);
  if (startIndex < 0) return;

  // Si la línea seleccionada YA era “Artículo N…”, esa línea se consume como
  // encabezado. Si era un párrafo normal, ese párrafo pasa a ser el primer texto
  // del nuevo artículo. Esto hace útil el botón también cuando Word perdió el
  // encabezado y el usuario solo sabe dónde empieza el nuevo artículo.
  const bodyStartIndex = sourceAlreadyHeading ? startIndex + 1 : startIndex;
  const movingNodes = children.slice(bodyStartIndex);
  const nodesToRemove = children.slice(startIndex);

  // Respaldo: si “Artículo N.” venía solo y la línea siguiente es claramente una
  // sumilla, la usamos como título en vez de dejarla en el cuerpo.
  if (sourceAlreadyHeading && !parsed.titulo && movingNodes.length) {
    const nextText = normalizeInlineText(movingNodes[0].textContent);
    const letters = [...nextText].filter(ch => /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(ch));
    const upperRatio = letters.length ? letters.filter(ch => ch === ch.toUpperCase()).length / letters.length : 0;
    const visuallyBold = (parseInt(getComputedStyle(movingNodes[0]).fontWeight, 10) || 400) >= 600;
    if (nextText && nextText.length <= 650 && (upperRatio >= .88 || visuallyBold)) {
      parsed.titulo = nextText;
      movingNodes.shift();
    }
  }

  const newBody = movingNodes.map(node => node.outerHTML).join("\n");
  nodesToRemove.forEach(node => node.remove());
  currentEntry.textoHtml = body.innerHTML.trim();

  group.articulos.splice(ai + 1, 0, {
    tipo: "Artículo",
    numero: parsed.numero,
    titulo: parsed.titulo || "",
    textoHtml: newBody
  });

  renderLegalPreview();
  previewEditStatus.textContent = sourceAlreadyHeading
    ? `✓ Artículo ${parsed.numero} separado del artículo anterior`
    : `✓ Artículo ${parsed.numero} creado desde el punto seleccionado`;
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function titleCaseClient(value) {
  const text = normalizeInlineText(value);
  return text ? text.toLowerCase().replace(/(^|\s)\S/g, part => part.toUpperCase()) : "";
}

function promptManualDispositionHeading() {
  const answer = window.prompt(
    "Escribe solo el ordinal de la disposición. Ejemplos: Primera / Segunda / Única",
    "Primera"
  );
  if (answer === null) return null;
  const raw = normalizeInlineText(answer);
  if (!raw) return null;
  const match = raw.match(/^(.+?)(?:\s*\.\-\s*|\s*[-–—:]\s*|\.\s+)(.*)$/);
  const number = titleCaseClient(match ? match[1] : raw);
  const title = normalizeInlineText(match?.[2] || "");
  if (!number) return null;
  return { number, title };
}

function createDispositionFromSelectedBlock() {
  const block = selectedEditBlock;
  if (!block) {
    previewEditStatus.textContent = "Selecciona el artículo o estructura después de la cual irá la disposición.";
    return;
  }

  const articleEl = block.closest?.(".legal-article");
  const groupEl = block.closest?.(".legal-group");
  const gi = Number(articleEl?.dataset?.groupIndex ?? groupEl?.dataset?.groupIndex);
  const group = lastPreviewData?.[gi];
  if (!group) {
    previewEditStatus.textContent = "Selecciona un artículo, capítulo o título para indicar dónde crear la disposición.";
    return;
  }

  const parsed = promptManualDispositionHeading();
  if (!parsed) {
    previewEditStatus.textContent = "No se creó la disposición: escribe al menos su ordinal (por ejemplo, Primera).";
    return;
  }

  collectPreviewEdits();
  group.articulos = group.articulos || [];
  let insertAt = 0;
  if (articleEl) {
    const ai = Number(articleEl.dataset.articleIndex);
    insertAt = Number.isInteger(ai) ? ai + 1 : group.articulos.length;
  }
  group.articulos.splice(insertAt, 0, {
    tipo: "Disposición",
    numero: parsed.number,
    titulo: parsed.title,
    // Una disposición sin nombre conserva una línea editable debajo del ordinal.
    textoHtml: '<div style="margin-bottom: 15px; text-align: justify; line-height: 1.5;"><br></div>'
  });

  renderLegalPreview();
  const createdBody = legalPreview.querySelector(`.legal-article[data-group-index="${gi}"][data-article-index="${insertAt}"] .legal-article-body > *`);
  if (createdBody) {
    setSelectedEditBlock(createdBody);
    createdBody.focus();
    placeCaretAtStart(createdBody);
  }
  previewEditStatus.textContent = `✓ Disposición ${parsed.number} añadida. Escribe su texto debajo.`;
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

const MANUAL_STRUCTURE_META = {
  book: { keyword: "LIBRO", field: "titulo", major: true },
  title: { keyword: "TÍTULO", field: "titulo", major: true },
  subtitle: { keyword: "SUBTÍTULO", field: "capitulo", major: false },
  chapter: { keyword: "CAPÍTULO", field: "capitulo", major: false },
  subchapter: { keyword: "SUBCAPÍTULO", field: "capitulo", major: false },
  section: { keyword: "SECCIÓN", field: "capitulo", major: false },
  subsection: { keyword: "SUBSECCIÓN", field: "capitulo", major: false }
};

function escapeHtmlClient(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function accentlessUpper(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

const MANUAL_ORDINAL_UNITS = new Set([
  "PRIMERO","PRIMERA","SEGUNDO","SEGUNDA","TERCERO","TERCERA","CUARTO","CUARTA",
  "QUINTO","QUINTA","SEXTO","SEXTA","SEPTIMO","SEPTIMA","OCTAVO","OCTAVA","NOVENO","NOVENA"
]);
const MANUAL_ORDINAL_TENS = new Set([
  "DECIMO","DECIMA","VIGESIMO","VIGESIMA","TRIGESIMO","TRIGESIMA","CUADRAGESIMO","CUADRAGESIMA",
  "QUINCUAGESIMO","QUINCUAGESIMA","SEXAGESIMO","SEXAGESIMA","SEPTUAGESIMO","SEPTUAGESIMA",
  "OCTOGESIMO","OCTOGESIMA","NONAGESIMO","NONAGESIMA"
]);
const MANUAL_ORDINAL_SINGLE = new Set(["UNDECIMO","UNDECIMA","DUODECIMO","DUODECIMA"]);

function splitManualStructureHeading(rawValue, type) {
  const meta = MANUAL_STRUCTURE_META[type];
  if (!meta) return null;
  let raw = normalizeInlineText(rawValue);
  if (!raw) return null;

  // Si ya trae una palabra jerárquica, la retiramos y usamos la elegida por el
  // usuario. Así puede corregir “Capítulo” -> “Subcapítulo” sin reescribir todo.
  raw = raw.replace(/^(?:LIBRO|T[ÍI]TULO|SUBT[ÍI]TULO|CAP[ÍI]TULO|SUBCAP[ÍI]TULO|SECCI[ÓO]N|SUBSECCI[ÓO]N)\s+/i, "");
  const tokens = raw.split(/\s+/).filter(Boolean);
  if (!tokens.length) return null;

  let take = 0;
  const first = accentlessUpper(tokens[0].replace(/[,:;.]$/, ""));
  if (/^(?:PRELIMINAR|UNICO|UNICA|[IVXLCDM]+(?:-[A-Z])?|\d+(?:-[A-Z])?)$/.test(first) || MANUAL_ORDINAL_SINGLE.has(first) || MANUAL_ORDINAL_UNITS.has(first)) {
    take = 1;
  } else if (MANUAL_ORDINAL_TENS.has(first)) {
    take = 1;
    const second = accentlessUpper((tokens[1] || "").replace(/[,:;.]$/, ""));
    if (MANUAL_ORDINAL_UNITS.has(second)) take = 2;
  }
  if (!take) return null;

  const indexText = tokens.slice(0, take).join(" ").replace(/[,:;.]$/, "");
  const name = tokens.slice(take).join(" ").trim();
  return {
    label: `${meta.keyword} ${indexText}`.trim(),
    name,
    field: meta.field,
    major: meta.major
  };
}

function manualStructureHtml(parsed) {
  const label = escapeHtmlClient(parsed.label);
  const name = escapeHtmlClient(parsed.name || "");
  return `<div style="text-align: center; margin-top: 30px;">\n  <div style="margin-bottom: 15px;">${label}</div>${name ? `\n  <div>${name}</div>` : ""}\n</div>`;
}

function promptManualStructure(type, selectedText) {
  const meta = MANUAL_STRUCTURE_META[type];
  if (!meta) return null;
  const base = normalizeInlineText(selectedText);
  const alreadyPrefixed = /^(?:LIBRO|T[ÍI]TULO|SUBT[ÍI]TULO|CAP[ÍI]TULO|SUBCAP[ÍI]TULO|SECCI[ÓO]N|SUBSECCI[ÓO]N)\s+/i.test(base);
  const defaultValue = alreadyPrefixed ? base : `${meta.keyword} ${base}`.trim();
  const answer = window.prompt(
    `Escribe el encabezado completo. Ejemplo: ${meta.keyword} III Nombre del bloque`,
    defaultValue
  );
  if (answer === null) return null;
  return splitManualStructureHeading(answer, type);
}

function convertSelectedToStructure(type) {
  const block = selectedEditBlock;
  const articleEl = block?.closest?.('.legal-article');
  const meta = MANUAL_STRUCTURE_META[type];
  if (!block || !articleEl || !meta) {
    previewEditStatus.textContent = "Selecciona un artículo o un párrafo para indicar dónde insertar la estructura.";
    return;
  }

  // Esta acción inserta una estructura: nunca transforma ni borra el texto
  // del artículo que se usó para indicar la posición.
  const selectedText = normalizeInlineText(block.textContent);
  const raw = /^(?:LIBRO|T[ÍI]TULO|SUBT[ÍI]TULO|CAP[ÍI]TULO|SUBCAP[ÍI]TULO|SECCI[ÓO]N|SUBSECCI[ÓO]N)\b/i.test(selectedText)
    ? selectedText : "";
  let parsed = splitManualStructureHeading(raw, type);
  if (!parsed) parsed = promptManualStructure(type, raw);
  if (!parsed) {
    previewEditStatus.textContent = "No se creó la estructura: falta el número/ordinal del encabezado.";
    return;
  }

  const gi = Number(articleEl.dataset.groupIndex);
  const ai = Number(articleEl.dataset.articleIndex);
  const group = lastPreviewData?.[gi];
  const currentEntry = group?.articulos?.[ai];
  if (!group || !currentEntry) return;

  collectPreviewEdits();
  // En el encabezado del artículo: inserta antes. En uno de sus párrafos:
  // inserta después. Ambos casos preservan íntegro el artículo seleccionado.
  const onArticleHeading = block.matches?.('.legal-article-title[data-entry-heading="1"]');
  const boundaryArticleIndex = onArticleHeading ? ai : ai + 1;
  const rightArticles = group.articulos.splice(boundaryArticleIndex);
  const newGroup = {
    nuevaHoja: undefined,
    titulo: "",
    capitulo: "",
    articulos: rightArticles
  };
  newGroup[parsed.field] = manualStructureHtml(parsed);
  lastPreviewData.splice(gi + (boundaryArticleIndex === 0 ? 0 : 1), 0, newGroup);

  renderLegalPreview();
  previewEditStatus.textContent = `✓ ${parsed.label}${parsed.name ? ` — ${parsed.name}` : ""} creado como estructura jurídica`;
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function formatSelectedBlockAsDerogated() {
  const block = selectedEditBlock;
  const body = block?.closest?.('.legal-article-body');
  if (!block || !body) {
    previewEditStatus.textContent = "Selecciona un bloque del cuerpo para marcarlo como derogado.";
    return;
  }
  block.dataset.lneFormatBlock = "derogacion";
  block.style.setProperty("font-style", "italic", "important");
  block.style.setProperty("color", "#777", "important");
  block.querySelectorAll("*").forEach(child => {
    child.style.setProperty("font-style", "inherit", "important");
    child.style.setProperty("color", "inherit", "important");
  });
  previewEditStatus.textContent = "✓ Bloque completo marcado como derogado";
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function articleLeadHtmlClient(text) {
  const escaped = String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<div data-lne-role="article-lead" style="text-align: left; text-transform: none; font-weight: 700; font-size: 1rem; line-height: 1.4; margin: 0 12px 6px;">${escaped}</div>`;
}

function attachLeadHeadingToArticle(groupIndex, articleIndex, text) {
  const group = lastPreviewData[groupIndex];
  if (!group || !group.articulos?.[articleIndex]) return false;
  const lead = articleLeadHtmlClient(text);
  if (articleIndex === 0) {
    group.capitulo = group.capitulo ? `${group.capitulo}\n${lead}` : lead;
    return true;
  }
  const before = group.articulos.slice(0, articleIndex);
  const after = group.articulos.slice(articleIndex);
  group.articulos = before;
  const nextGroup = {
    nuevaHoja: undefined,
    titulo: "",
    capitulo: lead,
    articulos: after
  };
  lastPreviewData.splice(groupIndex + 1, 0, nextGroup);
  return true;
}

function findNextArticlePosition(groupIndex, articleIndex) {
  const group = lastPreviewData[groupIndex];
  if (group && articleIndex + 1 < (group.articulos?.length || 0)) return { groupIndex, articleIndex: articleIndex + 1 };
  for (let gi = groupIndex + 1; gi < lastPreviewData.length; gi++) {
    if (lastPreviewData[gi]?.articulos?.length) return { groupIndex: gi, articleIndex: 0 };
  }
  return null;
}

function moveSelectedToArticleLead(target = "current") {
  const block = selectedEditBlock;
  const articleEl = block?.closest?.(".legal-article");
  const body = block?.closest?.(".legal-article-body");
  if (!block || !articleEl || !body) return;
  const text = block.textContent.trim();
  if (!text) return;

  collectPreviewEdits();
  const gi = Number(articleEl.dataset.groupIndex);
  const ai = Number(articleEl.dataset.articleIndex);
  const entry = lastPreviewData[gi]?.articulos?.[ai];
  if (!entry) return;

  block.remove();
  body.querySelectorAll(".selected-edit-block").forEach(el => el.classList.remove("selected-edit-block"));
  entry.textoHtml = body.innerHTML.trim();

  const targetPos = target === "next" ? findNextArticlePosition(gi, ai) : { groupIndex: gi, articleIndex: ai };
  if (!targetPos) {
    previewEditStatus.textContent = "No existe un artículo siguiente para mover ese encabezado.";
    renderLegalPreview();
    return;
  }
  attachLeadHeadingToArticle(targetPos.groupIndex, targetPos.articleIndex, text);
  renderLegalPreview();
  previewEditStatus.textContent = target === "next" ? "✓ Encabezado movido al artículo siguiente" : "✓ Encabezado colocado antes de este artículo";
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
}

function directBlockFromSelection() {
  const selection = window.getSelection();
  let node = selection?.anchorNode;
  if (node?.nodeType === Node.TEXT_NODE) node = node.parentElement;
  while (node && node !== legalPreview) {
    if (node.parentElement?.classList?.contains("legal-article-body")) return node;
    node = node.parentElement;
  }
  return null;
}

function placeCaretAtStart(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(true);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function insertLineBreakAtSelection() {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const br = document.createElement("br");
  range.insertNode(br);
  range.setStartAfter(br);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function splitEditableParagraph() {
  const block = directBlockFromSelection();
  const selection = window.getSelection();
  if (!block || !selection?.rangeCount) return false;
  const activeRange = selection.getRangeAt(0);
  if (!block.contains(activeRange.startContainer)) return false;

  const tailRange = document.createRange();
  tailRange.setStart(activeRange.startContainer, activeRange.startOffset);
  tailRange.setEndAfter(block.lastChild || block);
  const tail = tailRange.extractContents();
  const paragraph = document.createElement("div");
  paragraph.style.marginBottom = "15px";
  paragraph.style.textAlign = "justify";
  paragraph.style.lineHeight = "1.5";
  if (block.style.marginLeft) paragraph.style.marginLeft = block.style.marginLeft;
  paragraph.appendChild(tail);
  if (!paragraph.textContent && !paragraph.querySelector("br")) paragraph.appendChild(document.createElement("br"));
  block.after(paragraph);
  setSelectedEditBlock(paragraph);
  placeCaretAtStart(paragraph);
  pushPreviewHistory();
  return true;
}

function selectionElement(node) {
  return node?.nodeType === Node.TEXT_NODE ? node.parentElement : node;
}

function rangeInsideLegalBody(range) {
  if (!range) return false;
  const start = selectionElement(range.startContainer)?.closest?.(".legal-article-body");
  const end = selectionElement(range.endContainer)?.closest?.(".legal-article-body");
  return !!start && start === end && legalPreview.contains(start);
}

function rememberFormattingSelection() {
  if (!previewEditing) return;
  const selection = window.getSelection();
  if (selection?.rangeCount && !selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    if (rangeInsideLegalBody(range)) savedFormattingRange = range.cloneRange();
  }
}

function applyDerogationFormat() {
  const selection = window.getSelection();
  let range = selection?.rangeCount ? selection.getRangeAt(0) : null;
  if (!range || range.collapsed || !rangeInsideLegalBody(range)) range = savedFormattingRange;
  if (!range || range.collapsed || !rangeInsideLegalBody(range)) {
    previewEditStatus.textContent = "Selecciona primero el texto que deseas marcar como derogado";
    return;
  }

  const startFormat = selectionElement(range.startContainer)?.closest?.('[data-lne-format="derogacion"]');
  const endFormat = selectionElement(range.endContainer)?.closest?.('[data-lne-format="derogacion"]');
  if (startFormat && startFormat === endFormat) {
    const parent = startFormat.parentNode;
    while (startFormat.firstChild) parent.insertBefore(startFormat.firstChild, startFormat);
    startFormat.remove();
    parent.normalize();
    savedFormattingRange = null;
    previewEditStatus.textContent = "Formato de derogación retirado";
    pushPreviewHistory();
    return;
  }

  const wrapper = document.createElement("span");
  wrapper.dataset.lneFormat = "derogacion";
  wrapper.style.fontStyle = "italic";
  wrapper.style.color = "#777";
  wrapper.appendChild(range.extractContents());
  range.insertNode(wrapper);
  const nextRange = document.createRange();
  nextRange.selectNodeContents(wrapper);
  selection.removeAllRanges();
  selection.addRange(nextRange);
  savedFormattingRange = nextRange.cloneRange();
  setSelectedEditBlock(directEditableBlock(wrapper));
  previewEditStatus.textContent = "✓ Selección marcada como derogada (cursiva y gris)";
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
  scheduleAutosave();
}

function selectedFormattingRange(message) {
  const selection = window.getSelection();
  let range = selection?.rangeCount ? selection.getRangeAt(0) : null;
  if (!range || range.collapsed || !rangeInsideLegalBody(range)) range = savedFormattingRange;
  if (!range || range.collapsed || !rangeInsideLegalBody(range)) {
    previewEditStatus.textContent = message;
    return null;
  }
  return { selection, range };
}

function applyInlineTextFormat(kind) {
  const settings = {
    opaco: {
      message: "Selecciona primero el texto que deseas volver más tenue",
      applied: "✓ Texto vuelto más tenue y legible",
      removed: "Opacidad retirada",
      apply: wrapper => { wrapper.style.color = "#8090a2"; wrapper.style.opacity = "0.72"; }
    },
    subrayado: {
      message: "Selecciona primero el texto que deseas subrayar",
      applied: "✓ Texto subrayado",
      removed: "Subrayado retirado",
      apply: wrapper => { wrapper.style.textDecoration = "underline"; }
    },
    cursiva: {
      message: "Selecciona primero el texto que deseas poner en cursiva",
      applied: "✓ Texto en cursiva",
      removed: "Cursiva retirada",
      apply: wrapper => { wrapper.style.fontStyle = "italic"; }
    }
  }[kind];
  const selected = selectedFormattingRange(settings.message);
  if (!selected) return;
  const { selection, range } = selected;
  const selector = `[data-lne-format="${kind}"]`;
  const startFormat = selectionElement(range.startContainer)?.closest?.(selector);
  const endFormat = selectionElement(range.endContainer)?.closest?.(selector);
  if (startFormat && startFormat === endFormat) {
    const parent = startFormat.parentNode;
    while (startFormat.firstChild) parent.insertBefore(startFormat.firstChild, startFormat);
    startFormat.remove();
    parent.normalize();
    savedFormattingRange = null;
    previewEditStatus.textContent = settings.removed;
    pushPreviewHistory();
    scheduleAutosave();
    return;
  }

  const wrapper = document.createElement("span");
  wrapper.dataset.lneFormat = kind;
  settings.apply(wrapper);
  wrapper.appendChild(range.extractContents());
  range.insertNode(wrapper);
  const nextRange = document.createRange();
  nextRange.selectNodeContents(wrapper);
  selection.removeAllRanges();
  selection.addRange(nextRange);
  savedFormattingRange = nextRange.cloneRange();
  setSelectedEditBlock(directEditableBlock(wrapper));
  previewEditStatus.textContent = settings.applied;
  previewEditStatus.classList.add("ok");
  pushPreviewHistory();
  scheduleAutosave();
}

function loadImportedJs(data) {
  const imported = data.importedJs;
  lastExtractAccentCorrections = [];
  lastExtractionDiagnostics = data.extractionDiagnostics || {};
  lastExtractionHints = {};
  lastPreparedPdf = null;
  showPreparedPreview = false;
  renderPdfPrevious();

  // Se conserva el archivo original byte por byte en el cuadro de código.
  // Solo una edición posterior seguida de “Aplicar al .js” lo volverá a generar.
  sourceText.value = "";
  resultText.value = imported.code;
  lastPreviewData = clonePreview(imported.preview || []);
  originalPreviewData = clonePreview(imported.preview || []);
  previewEditing = false;
  codeEditing = false;
  codeNeedsSync = false;
  resultText.readOnly = true;
  resultText.classList.remove("is-editing");
  if (imported.variableName) variableName.value = imported.variableName;
  if (data.suggestedOutputName) outputName.value = data.suggestedOutputName;
  if (data.suggestedDisplayName) previewTitle.value = data.suggestedDisplayName;

  editCodeBtn.textContent = "Editar código";
  applyPreviewBtn.disabled = true;
  restorePreviewBtn.disabled = !originalPreviewData.length;
  downloadBtn.disabled = false;
  previewBtn.disabled = !lastPreviewData.length;
  editCodeBtn.disabled = false;
  syncCodeBtn.disabled = false;
  exportDocxBtn.disabled = !lastPreviewData.length;
  resetPreviewHistory();
  stats.innerHTML = `<span>✓ JS importado sin reconvertir</span><span>✓ ${lastExtractionDiagnostics.entries || 0} entradas jurídicas</span>`;
  detectionDetail.innerHTML = "<div><strong>Modo fiel:</strong> el código descargado se conserva tal como fue cargado. Puedes revisarlo visualmente y editar solo lo que decidas.</div>";
  warnings.innerHTML = imported.recoveredDeclaration
    ? "<div>⚠ Se recuperó el arreglo principal porque su declaración estaba dañada; revisa el código antes de descargarlo.</div>"
    : "";
  notes.innerHTML = "<div>Para corregir contenido, usa la vista previa. Para conservar el archivo intacto, descarga sin aplicar cambios.</div>";
  auditTrail.innerHTML = "";
  previewSection.hidden = !lastPreviewData.length;
  if (lastPreviewData.length) setPreviewEditing(true);
  fileStatus.textContent = `✓ ${data.filename} importado en modo fiel. No se reconvirtió ni se cambió su texto.`;
  scheduleAutosave();
}

extractBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    fileStatus.textContent = "Selecciona primero un archivo.";
    return;
  }

  fileStatus.textContent = "Leyendo documento...";
  extractBtn.disabled = true;

  try {
    const form = new FormData();
    form.append("file", file);
    if (/\.pdf$/i.test(file.name)) form.append("columns", pdfColumns?.value || "auto");

    const response = await converterFetch("/extract", { method: "POST", body: form });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "No se pudo leer el archivo.");

    await saveCheckpoint("nuevo_documento");

    if (data.importedJs) {
      loadImportedJs(data);
      return;
    }

    sourceText.value = data.text;

    applySuggestions({
      variableName: data.suggestedVariableName,
      outputName: data.suggestedOutputName,
      displayName: data.suggestedDisplayName
    });

    lastExtractAccentCorrections = data.accentCorrections || [];
    lastExtractionDiagnostics = data.extractionDiagnostics || {};
    lastExtractionHints = data.extractionHints || {};
    lastPreparedPdf = data.preparedPdf || null;
    renderPdfPrevious();
    const accentMsg = data.accentCorrectionCount ? ` — ✓ ${data.accentCorrectionCount} tilde${data.accentCorrectionCount === 1 ? "" : "s"} restaurada${data.accentCorrectionCount === 1 ? "" : "s"} en encabezados` : "";
    const wordListMsg = lastExtractionDiagnostics.numberedParagraphs ? ` — ✓ ${lastExtractionDiagnostics.numberedParagraphs} numeraciones de Word preservadas` : "";
    const tableMsg = lastExtractionDiagnostics.tables ? ` — ✓ ${lastExtractionDiagnostics.tables} tabla${lastExtractionDiagnostics.tables === 1 ? "" : "s"} detectada${lastExtractionDiagnostics.tables === 1 ? "" : "s"}` : "";
    const pdfMsg = lastExtractionDiagnostics.source === "PDF"
      ? ` · ${lastExtractionDiagnostics.pages} páginas; inicio en pág. ${lastExtractionDiagnostics.startPage}${lastExtractionDiagnostics.warnings?.length ? ` · ⚠ ${lastExtractionDiagnostics.warnings.join(" ")}` : ""}` : "";
    fileStatus.textContent = `✓ ${data.filename} — ${data.characters.toLocaleString("es-PE")} caracteres extraídos${accentMsg}${wordListMsg}${tableMsg}${pdfMsg}. Abriendo editor…`;
    scheduleAutosave();
    showPreparedPreview = true;
    convertBtn.click();
  } catch (error) {
    fileStatus.textContent = "Error: " + error.message;
  } finally {
    extractBtn.disabled = false;
  }
});

convertBtn.addEventListener("click", async () => {
  if (!sourceText.value.trim()) {
    alert("Primero carga un documento o pega texto en el recuadro.");
    return;
  }
  if (lastPreviewData.length && (previewEditing || codeNeedsSync) && !showPreparedPreview) {
    if (!confirm("Volver a analizar el texto fuente reemplazará la vista editada. Se guardará un respaldo antes de continuar. ¿Continuar?")) return;
    try { await saveCheckpoint("reanálisis"); }
    catch (error) { alert(error.message); return; }
  }

  convertBtn.disabled = true;
  convertBtn.textContent = "Convirtiendo...";
  stats.innerHTML = "";
  detectionDetail.innerHTML = "";
  warnings.innerHTML = "";
  notes.innerHTML = "";
  auditTrail.innerHTML = "";

  try {
    const response = await converterFetch("/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: sourceText.value,
        variableName: variableName.value,
        extractionHints: lastExtractionHints
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "No se pudo convertir.");

    applySuggestions(data.suggestions);
    resultText.value = data.js;
    lastPreviewData = data.preview || [];
    originalPreviewData = clonePreview();
    previewEditing = false;
    codeEditing = false;
    codeNeedsSync = false;
    resultText.readOnly = true;
    resultText.classList.remove("is-editing");
    previewEditStatus.textContent = "Vista de lectura";
    editPreviewBtn.textContent = "Editar vista previa";
    editPreviewBtn.setAttribute("aria-pressed", "false");
    editCodeBtn.textContent = "Editar código";
    applyPreviewBtn.disabled = true;
    restorePreviewBtn.disabled = !originalPreviewData.length;
    downloadBtn.disabled = false;
    previewBtn.disabled = !lastPreviewData.length;
    editCodeBtn.disabled = false;
    syncCodeBtn.disabled = false;
    exportDocxBtn.disabled = !lastPreviewData.length;
    resetPreviewHistory();
    scheduleAutosave();
    if (lastPreviewData.length) {
      previewSection.hidden = false;
      setPreviewEditing(true);
      if (showPreparedPreview) previewSection.scrollIntoView({ behavior: "smooth", block: "start" });
      showPreparedPreview = false;
    }

    const s = data.stats;
    const chips = [];
    chips.push(`<span>✓ ${s.articulos} artículos reales</span>`);
    if (s.articulosBase) chips.push(`<span>✓ ${s.articulosBase} artículos base</span>`);
    if (s.articulosIncorporados) chips.push(`<span>✓ ${s.articulosIncorporados} incorporado${s.articulosIncorporados === 1 ? "" : "s"}</span>`);
    if (s.articulosRomanos) chips.push(`<span>✓ ${s.articulosRomanos} preliminar${s.articulosRomanos === 1 ? "" : "es"} romanos</span>`);
    if (s.articulosDerogados) chips.push(`<span>✓ ${s.articulosDerogados} derogado${s.articulosDerogados === 1 ? "" : "s"} con formato</span>`);
    if (s.disposicionesDerogadas) chips.push(`<span>✓ ${s.disposicionesDerogadas} disposición${s.disposicionesDerogadas === 1 ? "" : "es"} derogada${s.disposicionesDerogadas === 1 ? "" : "s"}</span>`);
    if (s.notasDerogacionParciales) chips.push(`<span>✓ ${s.notasDerogacionParciales} derogación${s.notasDerogacionParciales === 1 ? "" : "es"} parcial${s.notasDerogacionParciales === 1 ? "" : "es"}</span>`);
    if (s.articulosEspeciales) chips.push(`<span>✓ ${s.articulosEspeciales} artículo${s.articulosEspeciales === 1 ? "" : "s"} especial${s.articulosEspeciales === 1 ? "" : "es"}</span>`);
    if (s.encabezadosArticuloFuente) {
      if (s.encabezadosArticuloNoConvertidos) chips.push(`<span class="warning-chip">⚠ ${s.encabezadosArticuloNoConvertidos} encabezado${s.encabezadosArticuloNoConvertidos === 1 ? "" : "s"} de artículo no convertido${s.encabezadosArticuloNoConvertidos === 1 ? "" : "s"}</span>`);
      else chips.push(`<span>✓ ${s.encabezadosArticuloFuente}/${s.encabezadosArticuloFuente} encabezados verificados</span>`);
    }
    if (s.jerarquiasFuente) {
      if (s.jerarquiasNoConvertidas) chips.push(`<span class="warning-chip">⚠ ${s.jerarquiasNoConvertidas} jerarquía${s.jerarquiasNoConvertidas === 1 ? "" : "s"} no reconocida${s.jerarquiasNoConvertidas === 1 ? "" : "s"}</span>`);
      else chips.push(`<span>✓ ${s.jerarquiasFuente}/${s.jerarquiasFuente} jerarquías verificadas</span>`);
    }
    if (s.acapitesRomanosMayuscula) chips.push(`<span>✓ ${s.acapitesRomanosMayuscula} acápite${s.acapitesRomanosMayuscula === 1 ? "" : "s"} I./II./III.</span>`);
    if (s.subacapitesRomanosMinuscula) chips.push(`<span>✓ ${s.subacapitesRomanosMinuscula} romano${s.subacapitesRomanosMinuscula === 1 ? "" : "s"} i./ii./(i)</span>`);
    if (s.subnivelesAlfanumericos) chips.push(`<span>✓ ${s.subnivelesAlfanumericos} subnivel${s.subnivelesAlfanumericos === 1 ? "" : "es"} a.1/a.2</span>`);
    if (s.subnumeralesDecimales) chips.push(`<span>✓ ${s.subnumeralesDecimales} subnumeral${s.subnumeralesDecimales === 1 ? "" : "es"} decimal${s.subnumeralesDecimales === 1 ? "" : "es"}</span>`);
    if (s.subnumeralesConSufijo) chips.push(`<span>✓ ${s.subnumeralesConSufijo} del tipo 29-A.1</span>`);
    if (s.subnumeralesProfundos) chips.push(`<span>✓ ${s.subnumeralesProfundos} profundo${s.subnumeralesProfundos === 1 ? "" : "s"} 18.3.1+</span>`);
    if (s.tablas) chips.push(`<span>✓ ${s.tablas} tabla${s.tablas === 1 ? "" : "s"}</span>`);
    if (s.articulosCitadosEnDisposiciones) chips.push(`<span>✓ ${s.articulosCitadosEnDisposiciones} artículo${s.articulosCitadosEnDisposiciones === 1 ? "" : "s"} citado${s.articulosCitadosEnDisposiciones === 1 ? "" : "s"} preservado${s.articulosCitadosEnDisposiciones === 1 ? "" : "s"}</span>`);
    if (s.normas) chips.push(`<span>✓ ${s.normas} normas</span>`);
    if (s.disposiciones) chips.push(`<span>✓ ${s.disposiciones} disposiciones</span>`);
    chips.push(`<span>✓ ${s.titulos} títulos</span>`);
    if (s.capitulos) chips.push(`<span>✓ ${s.capitulos} capítulos</span>`);
    if (s.libros) chips.push(`<span>✓ ${s.libros} libro${s.libros === 1 ? "" : "s"}</span>`);
    if (s.secciones) chips.push(`<span>✓ ${s.secciones} secciones</span>`);
    if (s.continuidadesPaginaReparadas) chips.push(`<span>✓ ${s.continuidadesPaginaReparadas} continuidades reparadas</span>`);
    if (s.encabezadosReubicados) chips.push(`<span>✓ ${s.encabezadosReubicados} encabezados de Word reubicados</span>`);
    if (s.rotulosPreviosArticulo) chips.push(`<span>✓ ${s.rotulosPreviosArticulo} rótulo${s.rotulosPreviosArticulo === 1 ? "" : "s"} previo${s.rotulosPreviosArticulo === 1 ? "" : "s"} a artículo</span>`);
    if (s.lineasEncabezadoGeneral) chips.push(`<span>✓ ${s.lineasEncabezadoGeneral} línea${s.lineasEncabezadoGeneral === 1 ? "" : "s"} de encabezado general</span>`);
    const totalAccentFixes = (lastExtractAccentCorrections?.reduce((sum, x) => sum + (x.changes || 0), 0) || 0) + (s.tildesRestauradas || 0);
    if (totalAccentFixes) chips.push(`<span>✓ ${totalAccentFixes} tilde${totalAccentFixes === 1 ? "" : "s"} restaurada${totalAccentFixes === 1 ? "" : "s"}</span>`);
    if (s.javascriptValido) chips.push(`<span>✓ JavaScript válido</span>`);
    if (s.alertasSecuencia) chips.push(`<span class="warning-chip">⚠ ${s.alertasSecuencia} posible${s.alertasSecuencia === 1 ? "" : "s"} falla${s.alertasSecuencia === 1 ? "" : "s"}</span>`);
    stats.innerHTML = chips.join("");

    const details = [];
    if (s.secuenciaArticulos) details.push(`<div><strong>Secuencia de artículos:</strong> ${s.secuenciaArticulos}</div>`);
    if (s.secuenciaNormas) details.push(`<div><strong>Normas del preliminar:</strong> ${s.secuenciaNormas}</div>`);
    if (s.entradas) details.push(`<div><strong>Total de entradas jurídicas:</strong> ${s.entradas}</div>`);
    if (s.disposicionesFinales || s.disposicionesTransitorias) details.push(`<div><strong>Disposiciones:</strong> ${s.disposicionesFinales || 0} finales + ${s.disposicionesTransitorias || 0} transitorias (misma hoja lógica)</div>`);
    if (s.articulosDerogados) details.push(`<div><strong>Artículos completamente derogados detectados:</strong> ${s.articulosDerogados}</div>`);
    if (s.disposicionesDerogadas) details.push(`<div><strong>Disposiciones derogadas detectadas:</strong> ${s.disposicionesDerogadas}</div>`);
    if (s.notasDerogacionParciales) details.push(`<div><strong>Notas de derogación parcial con formato automático:</strong> ${s.notasDerogacionParciales}</div>`);
    if (s.encabezadosArticuloFuente) details.push(`<div><strong>Control de integridad de artículos:</strong> ${s.encabezadosArticuloFuente - (s.encabezadosArticuloNoConvertidos || 0)} de ${s.encabezadosArticuloFuente} encabezados de fuente convertidos</div>`);
    if (s.jerarquiasFuente) details.push(`<div><strong>Control de jerarquías:</strong> ${s.jerarquiasFuente - (s.jerarquiasNoConvertidas || 0)} de ${s.jerarquiasFuente} encabezados Libro/Título/Capítulo/Subcapítulo/Sección reconocidos</div>`);
    if (s.acapitesRomanosMayuscula || s.subacapitesRomanosMinuscula) details.push(`<div><strong>Jerarquía romana detectada:</strong> ${s.acapitesRomanosMayuscula || 0} en mayúscula / ${s.subacapitesRomanosMinuscula || 0} en minúscula</div>`);
    if (s.subnivelesAlfanumericos) details.push(`<div><strong>Subniveles alfanuméricos:</strong> ${s.subnivelesAlfanumericos} (a.1, a.2, etc.)</div>`);
    if (s.subnumeralesDecimales) details.push(`<div><strong>Subnumerales decimales:</strong> ${s.subnumeralesDecimales} (69.2, 18.3.1, etc.)</div>`);
    if (s.subnumeralesConSufijo) details.push(`<div><strong>Subnumerales de artículos incorporados:</strong> ${s.subnumeralesConSufijo} (29-A.1, 228-C.2, etc.)</div>`);
    if (lastExtractionDiagnostics.numberedParagraphs) details.push(`<div><strong>Numeraciones automáticas de Word preservadas:</strong> ${lastExtractionDiagnostics.numberedParagraphs}</div>`);
    if (s.tablas) details.push(`<div><strong>Tablas/cuadros convertidos:</strong> ${s.tablas}</div>`);
    if (s.saltosPaginaInternos) details.push(`<div><strong>Saltos de página analizados dentro de textos:</strong> ${s.saltosPaginaInternos}</div>`);
    if (s.continuidadesPaginaReparadas) details.push(`<div><strong>Continuidades unidas automáticamente:</strong> ${s.continuidadesPaginaReparadas}</div>`);
    if (typeof s.limitesParrafoEnPagina === "number") details.push(`<div><strong>Saltos conservados como párrafos reales:</strong> ${s.limitesParrafoEnPagina}</div>`);
    detectionDetail.innerHTML = details.join("");

    if (data.warnings?.length) {
      warnings.innerHTML = renderList("Revisar", data.warnings);
    } else {
      warnings.innerHTML = "<strong>✓ Sin alertas estructurales.</strong>";
    }

    if (data.notes?.length) {
      notes.innerHTML = renderList("Control automático", data.notes);
    }

    const repairedList = (data.diagnostics?.pageContinuations || []).map(item => {
      const before = item.before ? `“...${item.before}”` : "";
      const after = item.after ? `→ “${item.after}...”` : "";
      return `${item.provision || "Texto"}: continuidad reparada ${before} ${after}`.trim();
    });

    const auditBlocks = [];
    const accentCorrections = [...(lastExtractAccentCorrections || []), ...(data.diagnostics?.accentCorrections || [])];
    const uniqueAccentCorrections = accentCorrections.filter((item, index, arr) => arr.findIndex(x => x.before === item.before && x.after === item.after) === index);
    if (uniqueAccentCorrections.length) {
      auditBlocks.push(renderList("Tildes restauradas solo en encabezados", uniqueAccentCorrections.map(item => `${item.before} → ${item.after}`)));
    }
    if (data.diagnostics?.derogatedArticles?.length) {
      auditBlocks.push(renderList("Artículos derogados con formato automático", data.diagnostics.derogatedArticles.map(numero => `Artículo ${numero}: nota de derogación en cursiva y gris.`)));
    }
    if (data.diagnostics?.derogatedDispositions?.length) {
      auditBlocks.push(renderList("Disposiciones derogadas con formato automático", data.diagnostics.derogatedDispositions.map(numero => `${numero}: nota de derogación en cursiva y gris.`)));
    }
    if (data.diagnostics?.partialDerogationNotes) {
      auditBlocks.push(renderList("Derogaciones parciales con formato automático", [`${data.diagnostics.partialDerogationNotes} nota${data.diagnostics.partialDerogationNotes === 1 ? "" : "s"} dentro de numerales, literales o párrafos se dejaron en cursiva y gris sin afectar su marcador.`]));
    }
    if (data.diagnostics?.sourceArticleHeadingNumbers?.length) {
      const missing = data.diagnostics?.missingSourceArticleHeadings || [];
      auditBlocks.push(renderList("Control de integridad de encabezados", missing.length
        ? [`Se detectaron ${data.diagnostics.sourceArticleHeadingNumbers.length} encabezados de Artículo en la fuente y faltan por convertir: ${missing.join(", ")}.`]
        : [`Se detectaron ${data.diagnostics.sourceArticleHeadingNumbers.length} encabezados de Artículo en la fuente y todos fueron convertidos.`]));
    }
    if (data.diagnostics?.romanUpperMarkers?.length || data.diagnostics?.romanLowerMarkers?.length) {
      const romanItems = [];
      if (data.diagnostics.romanUpperMarkers?.length) romanItems.push(`Acápites en mayúscula: ${data.diagnostics.romanUpperMarkers.join(", ")}`);
      if (data.diagnostics.romanLowerMarkers?.length) romanItems.push(`Subacápites en minúscula: ${data.diagnostics.romanLowerMarkers.join(", ")}`);
      auditBlocks.push(renderList("Jerarquía romana reconocida", romanItems));
    }
    if (data.diagnostics?.alphaDecimalMarkers?.length) {
      auditBlocks.push(renderList("Subniveles alfanuméricos reconocidos", [`${data.diagnostics.alphaDecimalMarkers.join(", ")}`]));
    }
    if (data.diagnostics?.decimalMarkers?.length) {
      auditBlocks.push(renderList("Subnumerales decimales reconocidos", [`${data.diagnostics.decimalMarkers.join(", ")}`]));
    }
    if (data.diagnostics?.articleDecimalMarkers?.length) {
      auditBlocks.push(renderList("Subnumerales ligados a artículos incorporados", [`${data.diagnostics.articleDecimalMarkers.join(", ")}`]));
    }
    if (data.diagnostics?.tablesDetected) {
      auditBlocks.push(renderList("Tablas reconocidas", [`${data.diagnostics.tablesDetected} tabla${data.diagnostics.tablesDetected === 1 ? "" : "s"} convertida${data.diagnostics.tablesDetected === 1 ? "" : "s"} a HTML.`]));
    }
    if (data.diagnostics?.articleReferencesInsideDispositions?.length) {
      auditBlocks.push(renderList("Artículos citados dentro de Disposiciones preservados como texto", [`${data.diagnostics.articleReferencesInsideDispositions.join(", ")}`]));
    }
    if (data.diagnostics?.sourceStructuralHeadingCandidates?.length) {
      const missed = data.diagnostics.missingSourceStructuralHeadings || [];
      auditBlocks.push(renderList("Control de jerarquías estructurales", missed.length
        ? missed.map(value => `Revisar: ${value}`)
        : [`${data.diagnostics.sourceStructuralHeadingCandidates.length} encabezados de Libro/Título/Capítulo/Subcapítulo/Sección fueron reconocidos.`]));
    }
    if (repairedList.length) {
      auditBlocks.push(renderList("Continuidades reparadas automáticamente", repairedList));
    }
    if (typeof s.limitesParrafoEnPagina === "number") {
      auditBlocks.push(`<strong>Balance de saltos de página</strong><ul><li>${s.continuidadesPaginaReparadas || 0} continuidades unidas.</li><li>${s.limitesParrafoEnPagina} saltos conservados porque sí correspondían a párrafos reales.</li></ul>`);
    }
    auditTrail.innerHTML = auditBlocks.join("");
    if (data.coverage?.missing) {
      const panel = document.createElement("div");
      panel.className = "coverage-warning";
      const heading = document.createElement("strong");
      heading.textContent = `Revisión de integridad: ${data.coverage.coveragePercent}% de fragmentos coinciden con la vista.`;
      const detail = document.createElement("p");
      detail.textContent = "Los siguientes fragmentos del texto fuente no se localizaron de forma exacta en la vista. Pueden estar reformateados o requerir recuperación; el original extraído sigue guardado.";
      const list = document.createElement("ol");
      for (const item of data.coverage.examples || []) {
        const line = document.createElement("li");
        line.textContent = `Bloque ${item.block}: ${item.excerpt}`;
        list.append(line);
      }
      panel.append(heading, detail, list);
      auditTrail.prepend(panel);
    }
  } catch (error) {
    showPreparedPreview = false;
    alert(error.message);
  } finally {
    convertBtn.disabled = false;
    convertBtn.textContent = "Actualizar análisis desde el texto fuente";
  }
});

previewBtn.addEventListener("click", () => {
  renderLegalPreview();
  previewSection.hidden = false;
  previewSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

closePreviewBtn.addEventListener("click", () => {
  previewSection.hidden = true;
});

[variableName, outputName, previewTitle].forEach(element => {
  element.addEventListener("input", () => {
    if (!applyingAutomaticFields) automaticFields[element.id] = false;
    if (element === previewTitle && !previewSection.hidden && lastPreviewData.length) renderLegalPreview();
    scheduleAutosave();
  });
});

fileInput.addEventListener("change", () => {
  automaticFields.variableName = true;
  automaticFields.outputName = true;
  automaticFields.previewTitle = true;
  applyingAutomaticFields = true;
  variableName.value = "CodigoLegal";
  outputName.value = "datos_codigo.js";
  previewTitle.value = "NORMA LEGAL";
  applyingAutomaticFields = false;
});

sourceText.addEventListener("input", scheduleAutosave);
sourceConvertBtn?.addEventListener("click", () => convertBtn.click());

editPreviewBtn.addEventListener("click", () => {
  if (!lastPreviewData.length) return;
  if (previewEditing) {
    applyPreviewChangesToJs();
    setPreviewEditing(false);
    previewEditStatus.textContent = "✓ Cambios aplicados al .js";
    previewEditStatus.classList.add("ok");
  } else {
    setPreviewEditing(true);
  }
});

legalPreview.addEventListener("click", event => {
  if (!previewEditing) return;
  const block = editableTargetBlock(event.target);
  if (block) setSelectedEditBlock(block);
});

legalPreview.addEventListener("focusin", event => {
  if (!previewEditing) return;
  const block = editableTargetBlock(event.target);
  if (block) setSelectedEditBlock(block);
});

document.addEventListener("selectionchange", rememberFormattingSelection);

legalPreview.addEventListener("input", event => {
  if (!previewEditing) return;
  markAdminDirty(event.target);
  const block = selectedEditBlock;
  const body = block?.closest?.(".legal-article-body");
  if (body && body.children.length > 1 && !block.textContent.trim()) {
    const replacement = block.previousElementSibling || block.nextElementSibling;
    block.remove();
    if (replacement) setSelectedEditBlock(replacement);
  }
  schedulePreviewHistory();
  scheduleAutosave();
});

legalPreview.addEventListener("paste", event => {
  if (!previewEditing) return;
  markAdminDirty(event.target);
  const text = event.clipboardData?.getData("text/plain");
  if (typeof text !== "string") return;
  event.preventDefault();
  const block = editableTargetBlock(event.target);
  const uppercase = block && getComputedStyle(block).textTransform === "uppercase";
  let content = text.replace(/\r\n?/g, "\n");
  if (uppercase) content = content.replace(/\s*\n\s*/g, " ").toLocaleUpperCase("es-PE");
  if (!document.execCommand("insertText", false, content)) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(content);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  schedulePreviewHistory();
  scheduleAutosave();
});

document.addEventListener("keydown", event => {
  if (!previewEditing || legalPreview.contains(event.target)) return;
  if (!(event.ctrlKey || event.metaKey) || !["z", "y"].includes(event.key.toLowerCase())) return;
  if (event.target.closest("input,textarea,[contenteditable='true']")) return;
  event.preventDefault();
  if (event.key.toLowerCase() === "y" || event.shiftKey) redoPreview();
  else undoPreview();
});

legalPreview.addEventListener("keydown", event => {
  if (!previewEditing) return;
  if (event.target.closest?.('.legal-article-title[data-entry-heading="1"]') && event.key === "Enter") {
    event.preventDefault();
    return;
  }
  const ctrl = event.ctrlKey || event.metaKey;
  if (ctrl && event.key.toLowerCase() === "z") {
    event.preventDefault();
    if (event.shiftKey) redoPreview();
    else undoPreview();
    return;
  }
  if (ctrl && event.key.toLowerCase() === "y") {
    event.preventDefault();
    redoPreview();
    return;
  }
  if (event.key !== "Enter" || !event.target.closest?.(".legal-article-body")) return;
  event.preventDefault();
  markAdminDirty(event.target);
  if (event.shiftKey) {
    insertLineBreakAtSelection();
    schedulePreviewHistory();
  } else {
    splitEditableParagraph();
  }
});

// Al pulsar una herramienta el navegador ya no roba el foco del bloque editable.
// Así sangría, alineación e Inciso actúan siempre sobre la línea seleccionada.
document.querySelectorAll(".preview-edit-toolbar button").forEach(button => {
  button.addEventListener("mousedown", event => event.preventDefault());
  button.addEventListener("click", () => markAdminDirty(selectedEditBlock), { capture: true });
});

indentLessBtn.addEventListener("click", () => adjustSelectedIndent(-4));
indentMoreBtn.addEventListener("click", () => adjustSelectedIndent(4));
fontSmallerBtn.addEventListener("click", () => adjustSelectedFontSize(-1));
fontLargerBtn.addEventListener("click", () => adjustSelectedFontSize(1));
paragraphBtn.addEventListener("click", convertSelectedToParagraph);
articleTitleBtn.addEventListener("click", moveSelectedToArticleTitle);
newArticleBtn.addEventListener("click", createArticleFromSelectedBlock);
newDispositionBtn.addEventListener("click", createDispositionFromSelectedBlock);
structureTypeSelect?.addEventListener("change", () => {
  const type = structureTypeSelect.value;
  if (!type) return;
  markAdminDirty(selectedEditBlock);
  convertSelectedToStructure(type);
  structureTypeSelect.value = "";
});
alignPrevBtn.addEventListener("click", alignSelectedWithPrevious);
markIncisoBtn.addEventListener("click", markSelectedAsInciso);
sublevelMoreBtn.addEventListener("click", () => setSelectedLegalLevel(listLevelOf(ensureSelectedListBlock()) + 1));
sublevelLessBtn.addEventListener("click", () => setSelectedLegalLevel(Math.max(0, listLevelOf(ensureSelectedListBlock()) - 1)));
leadCurrentBtn.addEventListener("click", () => moveSelectedToArticleLead("current"));
leadNextBtn.addEventListener("click", () => moveSelectedToArticleLead("next"));
formatDerogationBtn.addEventListener("mousedown", event => event.preventDefault());
formatDerogationBtn.addEventListener("click", applyDerogationFormat);
[opacityBtn, underlineBtn, italicBtn].forEach(button => button.addEventListener("mousedown", event => event.preventDefault()));
opacityBtn.addEventListener("click", () => applyInlineTextFormat("opaco"));
underlineBtn.addEventListener("click", () => applyInlineTextFormat("subrayado"));
italicBtn.addEventListener("click", () => applyInlineTextFormat("cursiva"));
deleteBlockBtn.addEventListener("click", deleteSelectedBlock);
mergePrevBtn.addEventListener("click", mergeSelectedWithPrevious);
mergeNextBtn.addEventListener("click", mergeSelectedWithNext);
undoPreviewBtn.addEventListener("click", undoPreview);
redoPreviewBtn.addEventListener("click", redoPreview);
applyPreviewBtn.addEventListener("click", () => {
  if (!window.__LNE_LEGISLATION_MODE__) openPublicationFlow();
  else publishAdminDocumentChanges();
});

if (!window.__LNE_LEGISLATION_MODE__) {
  applyPreviewBtn.textContent = "PUBLICAR DOCUMENTO";
  applyPreviewBtn.title = "Configura el destino y revisa la vista previa antes de publicar";
}

publicationForm.querySelectorAll('input[name="publicationDestination"]').forEach(input => input.addEventListener("change", updatePublicationDestination));
publicationNormName.addEventListener("input", () => {
  if (!publicationCodeManuallyEdited) publicationNormCode.value = publicationSlug(publicationNormName.value);
  publicationImageTitle.textContent = publicationNormName.value.trim() || "Nueva legislación";
  resetPublicationReview();
  renderPublicationPreview();
});
publicationNormIntro.addEventListener("input", () => {
  resetPublicationReview();
  renderPublicationPreview();
});
publicationNormCode.addEventListener("input", () => {
  publicationCodeManuallyEdited = true;
  resetPublicationReview();
  renderPublicationPreview();
});
publicationNormImage.addEventListener("change", () => {
  const file = publicationNormImage.files[0] || null;
  publicationError.textContent = "";
  if (file && (!/^image\/(png|jpeg|webp)$/.test(file.type) || file.size > 5 * 1024 * 1024)) {
    publicationNormImage.value = "";
    publicationImageFile = null;
    publicationError.textContent = "Selecciona una imagen PNG, JPG o WebP de hasta 5 MB.";
    return;
  }
  if (publicationImageObjectUrl) URL.revokeObjectURL(publicationImageObjectUrl);
  publicationImageFile = file;
  publicationImageObjectUrl = file ? URL.createObjectURL(file) : "";
  publicationImagePreview.style.backgroundImage = publicationImageObjectUrl ? `url("${publicationImageObjectUrl}")` : "";
  publicationImagePreview.classList.toggle("has-image", Boolean(file));
  resetPublicationReview();
  renderPublicationPreview();
});
selectPublicationImageBtn.addEventListener("click", () => publicationNormImage.click());

function resizePublicationPanels(clientX) {
  const body = publicationResizeHandle.closest(".publication-body");
  const bounds = body.getBoundingClientRect();
  const minimum = 260;
  const maximum = Math.max(minimum, bounds.width * .48);
  const width = Math.min(maximum, Math.max(minimum, clientX - bounds.left));
  body.style.setProperty("--publication-panel-width", `${width}px`);
  publicationResizeHandle.setAttribute("aria-valuenow", String(Math.round(width)));
}

publicationResizeHandle.addEventListener("pointerdown", event => {
  if (event.target === publicationPanelToggle || publicationResizeHandle.closest(".publication-body").classList.contains("settings-collapsed")) return;
  if (matchMedia("(max-width: 850px)").matches) return;
  publicationResizeHandle.setPointerCapture(event.pointerId);
  publicationResizeHandle.classList.add("is-dragging");
  resizePublicationPanels(event.clientX);
});
publicationResizeHandle.addEventListener("pointermove", event => {
  if (publicationResizeHandle.hasPointerCapture(event.pointerId)) resizePublicationPanels(event.clientX);
});
publicationResizeHandle.addEventListener("pointerup", event => {
  if (publicationResizeHandle.hasPointerCapture(event.pointerId)) publicationResizeHandle.releasePointerCapture(event.pointerId);
  publicationResizeHandle.classList.remove("is-dragging");
});
publicationResizeHandle.addEventListener("keydown", event => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  const body = publicationResizeHandle.closest(".publication-body");
  const current = publicationResizeHandle.getBoundingClientRect().left - body.getBoundingClientRect().left;
  resizePublicationPanels(body.getBoundingClientRect().left + current + (event.key === "ArrowRight" ? 24 : -24));
});
publicationPanelToggle.addEventListener("click", event => {
  event.stopPropagation();
  const body = publicationResizeHandle.closest(".publication-body");
  const collapsed = body.classList.toggle("settings-collapsed");
  publicationPanelToggle.textContent = collapsed ? "→" : "←";
  publicationPanelToggle.setAttribute("aria-expanded", String(!collapsed));
  publicationPanelToggle.setAttribute("aria-label", collapsed ? "Mostrar información general" : "Ocultar información general");
});
closePublicationBtn.addEventListener("click", closePublicationFlow);
cancelPublicationBtn.addEventListener("click", closePublicationFlow);
editPublicationBtn.addEventListener("click", () => {
  preparedPublication = null;
  publicationSummary.hidden = true;
  confirmPublicationBtn.hidden = true;
  editPublicationBtn.hidden = true;
  preparePublicationBtn.hidden = false;
  newPublicationPanel.hidden = false;
});
preparePublicationBtn.addEventListener("click", () => {
  publicationError.textContent = "";
  try { preparePublication(); } catch (error) { publicationError.textContent = error.message; }
});
confirmPublicationBtn.addEventListener("click", () => {
  if (!preparedPublication) return;
  publicationRequestId = preparedPublication.requestId;
  confirmPublicationBtn.disabled = true;
  publicationError.textContent = "Publicando documento…";
  window.parent.postMessage(preparedPublication, window.location.origin);
});

window.addEventListener("message", event => {
  if (event.origin !== window.location.origin) return;
  const message = event.data || {};
  if (message.type === "lne-publication-context") {
    publicationContext = { norms: Array.isArray(message.norms) ? message.norms : [], role: message.role || "", permissions: message.permissions || {} };
    renderPublicationPreview();
  }
  if (message.type === "lne-publication-result") completePublication(message).catch(error => {
    publicationError.textContent = `No se pudo publicar.\n\nTu proyecto sigue guardado temporalmente.\n${error.message}`;
  });
  if (message.type === "lne-publication-test-document" && new URLSearchParams(location.search).get("publicationTest") === "1") loadProjectData(message.project);
});

restorePreviewBtn.addEventListener("click", () => {
  if (!originalPreviewData.length) return;
  lastPreviewData = clonePreview(originalPreviewData);
  resultText.value = serializePreviewToJs(lastPreviewData, variableName.value);
  previewEditing = false;
  previewEditStatus.textContent = "Conversión restaurada";
  editPreviewBtn.textContent = "Editar vista previa";
  editPreviewBtn.setAttribute("aria-pressed", "false");
  applyPreviewBtn.disabled = true;
  resetPreviewHistory();
  scheduleAutosave();
  renderLegalPreview();
});

editCodeBtn.addEventListener("click", () => {
  if (!resultText.value) return;
  codeEditing = !codeEditing;
  resultText.readOnly = !codeEditing;
  resultText.classList.toggle("is-editing", codeEditing);
  editCodeBtn.textContent = codeEditing ? "Terminar edición de código" : "Editar código";
  if (codeEditing) resultText.focus();
  else scheduleAutosave();
});

resultText.addEventListener("input", () => {
  codeNeedsSync = true;
  syncCodeBtn.disabled = false;
  downloadBtn.disabled = true;
  scheduleAutosave();
});

syncCodeBtn.addEventListener("click", async () => {
  if (!resultText.value.trim()) return;
  syncCodeBtn.disabled = true;
  const oldText = syncCodeBtn.textContent;
  syncCodeBtn.textContent = "Validando...";
  try {
    const response = await converterFetch("/preview-from-js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: resultText.value, variableName: variableName.value })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "El código necesita revisión.");
    lastPreviewData = clonePreview(data.preview);
    originalPreviewData = clonePreview(data.preview);
    // Reescribe siempre a un formato canónico y válido. Así, incluso si el
    // usuario dañó accidentalmente la línea `const ... =`, se conserva la
    // edición del arreglo y el .js vuelve a quedar descargable.
    resultText.value = serializePreviewToJs(lastPreviewData, variableName.value);
    resultText.readOnly = true;
    resultText.classList.remove("is-editing");
    codeEditing = false;
    editCodeBtn.textContent = "Editar código";
    codeNeedsSync = false;
    downloadBtn.disabled = false;
    previewBtn.disabled = !lastPreviewData.length;
    exportDocxBtn.disabled = !lastPreviewData.length;
    resetPreviewHistory();
    if (!previewSection.hidden) renderLegalPreview();
    setProjectStatus(data.recoveredDeclaration
      ? "Código recuperado: se reparó la declaración y la vista fue actualizada"
      : "Código validado y vista actualizada", "ok");
    scheduleAutosave();
  } catch (error) {
    alert(`No se pudo actualizar la vista previa: ${error.message}`);
  } finally {
    syncCodeBtn.textContent = oldText;
    syncCodeBtn.disabled = !resultText.value;
  }
});

saveProjectBtn.addEventListener("click", async () => {
  saveProjectBtn.disabled = true;
  try {
    await saveProject();
  } catch (error) {
    setProjectStatus(error.message, "warn");
  } finally {
    saveProjectBtn.disabled = false;
  }
});

projectName.addEventListener("input", scheduleAutosave);

openProjectsBtn.addEventListener("click", async () => {
  projectsDialog.showModal();
  projectsList.innerHTML = '<p class="projects-empty">Cargando proyectos…</p>';
  await refreshProjectList();
});

closeProjectsBtn.addEventListener("click", () => projectsDialog.close());

projectsList.addEventListener("click", async event => {
  const openButton = event.target.closest("button[data-project-open]");
  const deleteButton = event.target.closest("button[data-project-delete]");
  try {
    if (openButton) {
      const record = await window.LNEProjectStore.get(openButton.dataset.projectOpen);
      if (!record?.project) throw new Error("El proyecto local ya no está disponible.");
      currentProjectId = record.id;
      loadProjectData(record.project);
      projectsDialog.close();
    } else if (deleteButton) {
      const record = await window.LNEProjectStore.get(deleteButton.dataset.projectDelete);
      if (!confirm("¿Deseas eliminar este proyecto temporal?\nEsta acción no afecta publicaciones existentes.")) return;
      const deletingCurrentProject = currentProjectId === deleteButton.dataset.projectDelete;
      await window.LNEProjectStore.remove(deleteButton.dataset.projectDelete);
      if (deletingCurrentProject) {
        projectsDialog.close();
        resetProjectWorkspace();
      } else {
        await refreshProjectList();
        setProjectStatus("Proyecto temporal eliminado", "ok");
      }
    }
  } catch (error) {
    setProjectStatus(error.message, "warn");
  }
});

newProjectBtn.addEventListener("click", async () => {
  try {
    if (hasProjectContent()) await saveProject({ automatic: true });
    const projects = await window.LNEProjectStore.list();
    if (projects.length >= window.LNEProjectStore.MAX_PROJECTS) {
      setProjectStatus(projectLimitMessage(), "warn");
      return;
    }
    resetProjectWorkspace();
  } catch (error) {
    setProjectStatus(error.message, "warn");
  }
});

downloadProjectBtn.addEventListener("click", () => {
  const project = captureProject();
  downloadBlob(new Blob([JSON.stringify(project, null, 2)], { type: "application/json;charset=utf-8" }), `${projectNameFromFields()}.lne.json`);
});

openProjectFileBtn.addEventListener("click", () => projectFileInput.click());
projectFileInput.addEventListener("change", async () => {
  const file = projectFileInput.files[0];
  if (!file) return;
  try {
    currentProjectId = null;
    loadProjectData(JSON.parse(await file.text()));
  } catch (error) {
    alert(error.message);
  } finally {
    projectFileInput.value = "";
  }
});

exportDocxBtn.addEventListener("click", async () => {
  if (!lastPreviewData.length) return;
  collectPreviewEdits();
  exportDocxBtn.disabled = true;
  const oldText = exportDocxBtn.textContent;
  exportDocxBtn.textContent = "Creando Word...";
  try {
    const response = await converterFetch("/export-docx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: previewTitle.value, preview: lastPreviewData })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "No se pudo crear el Word.");
    }
    const disposition = response.headers.get("Content-Disposition") || "";
    const filename = disposition.match(/filename="([^"]+)"/)?.[1] || `${projectNameFromFields()}_revisado.docx`;
    downloadBlob(await response.blob(), filename);
    setProjectStatus("Word revisado creado; el original no fue modificado", "ok");
  } catch (error) {
    setProjectStatus(error.message, "warn");
  } finally {
    exportDocxBtn.textContent = oldText;
    exportDocxBtn.disabled = !lastPreviewData.length;
  }
});

downloadBtn.addEventListener("click", () => {
  const content = resultText.value;
  if (!content) return;

  let name = outputName.value.trim() || "datos_codigo.js";
  if (!name.toLowerCase().endsWith(".js")) name += ".js";

  downloadBlob(new Blob([content], { type: "text/javascript;charset=utf-8" }), name);
});

if (!window.__LNE_LEGISLATION_MODE__) refreshProjectList();

// La fase 1 entrega el documento limpio sin alterar las opciones del analizador.
if (!window.__LNE_LEGISLATION_MODE__) try {
  const prepared = sessionStorage.getItem("lne-prepared-document");
  if (prepared) {
    const data = JSON.parse(prepared);
    if (data.text && typeof data.text === "string") {
      sourceText.value = data.text;
      previewTitle.value = data.title || data.name || "NORMA LEGAL";
      fileStatus.textContent = `Documento preparado en la fase 1: ${data.name || "PDF"}. Generando la vista previa…`;
      sessionStorage.removeItem("lne-prepared-document");
      scheduleAutosave();
      showPreparedPreview = true;
      convertBtn.click();
    }
  }
} catch (error) {
  fileStatus.textContent = `No se pudo recuperar el documento preparado: ${error.message}`;
}

function adminSectionOf(row) {
  return row?.estructura?.seccion && typeof row.estructura.seccion === "object" ? row.estructura.seccion : {};
}

function markAdminDirty(target) {
  if (!window.__LNE_LEGISLATION_MODE__ || !target) return;
  const element = target instanceof Element ? target : target.parentElement;
  if (!element || element.closest?.('[data-admin-meta]')) return;
  const groupElement = element.closest?.('.legal-group');
  if (!groupElement) return;
  const groupIndex = Number(groupElement.dataset.groupIndex);
  const articleElement = element.closest?.('.legal-article');
  if (articleElement) {
    const articleIndex = Number(articleElement.dataset.articleIndex);
    const id = lastPreviewData[groupIndex]?.articulos?.[articleIndex]?.__adminId;
    if (id != null) adminDirtyArticleIds.add(String(id));
    return;
  }
  if (element.closest?.('[data-field="titulo"], [data-field="capitulo"]')) adminDirtyGroupIndexes.add(groupIndex);
}

function adminRowToGroup(row) {
  const section = adminSectionOf(row);
  return {
    titulo: section.titulo || "",
    capitulo: section.capitulo || "",
    nuevaHoja: !!section.nuevaHoja,
    articulos: [{
      __adminId: row.id,
      __adminOrder: row.orden,
      tipo: row.contenido_lne?.tipo || "Artículo",
      numero: String(row.numero_articulo || ""),
      titulo: row.titulo || "",
      textoHtml: row.contenido || "",
      ocultarEncabezado: row.contenido_lne?.ocultarEncabezado || false,
      estructura: row.estructura || {},
      contenido_lne: row.contenido_lne || {}
    }]
  };
}

function appendAdminRows(rows, reset) {
  if (!reset && lastPreviewData.length) collectPreviewEdits();
  if (reset) {
    lastPreviewData = [];
    originalPreviewData = [];
    adminOriginalArticles.clear();
    adminDirtyArticleIds.clear();
    adminDirtyGroupIndexes.clear();
  }
  rows.forEach(row => {
    const group = adminRowToGroup(row);
    const entry = group.articulos[0];
    adminOriginalArticles.set(String(row.id), clonePreview(entry));
    const previous = lastPreviewData[lastPreviewData.length - 1];
    if (previous && previous.titulo === group.titulo && previous.capitulo === group.capitulo && previous.nuevaHoja === group.nuevaHoja) previous.articulos.push(entry);
    else lastPreviewData.push(group);
  });
  originalPreviewData = clonePreview(lastPreviewData);
  previewTitle.value = adminDocumentMeta.nombre || "NORMA LEGAL";
  previewSection.hidden = false;
  previewEditing = true;
  resetPreviewHistory();
  renderLegalPreview();
  setPreviewEditing(true);
  previewEditStatus.textContent = "Edición estructurada lista";
}

function articleChange(entry, group, groupIndex) {
  const original = adminOriginalArticles.get(String(entry.__adminId));
  if (!original) return {
    nuevo: true,
    __changeKind: "new",
    numero_articulo: entry.numero,
    titulo: entry.titulo || null,
    contenido: entry.textoHtml || "",
    estructura: { seccion: { titulo: group.titulo || null, capitulo: group.capitulo || null, nuevaHoja: !!group.nuevaHoja } },
    contenido_lne: { tipo: entry.tipo || "Artículo", numero: entry.numero, titulo: entry.titulo || null, texto: entry.textoHtml || "" }
  };
  const articleWasEdited = adminDirtyArticleIds.has(String(entry.__adminId));
  const structureWasEdited = adminDirtyGroupIndexes.has(groupIndex);
  if (!articleWasEdited && !structureWasEdited) return null;
  const patch = { id: entry.__adminId };
  let articleFieldsChanged = false;
  if (articleWasEdited && String(entry.numero) !== String(original.numero)) { patch.numero_articulo = String(entry.numero); articleFieldsChanged = true; }
  if (articleWasEdited && (entry.titulo || "") !== (original.titulo || "")) { patch.titulo = entry.titulo || null; articleFieldsChanged = true; }
  if (articleWasEdited && (entry.textoHtml || "") !== (original.textoHtml || "")) { patch.contenido = entry.textoHtml || ""; articleFieldsChanged = true; }
  const oldSection = adminSectionOf({ estructura: original.estructura });
  const structureChanged = structureWasEdited && ((group.titulo || "") !== (oldSection.titulo || "") || (group.capitulo || "") !== (oldSection.capitulo || "") || !!group.nuevaHoja !== !!oldSection.nuevaHoja);
  if (structureChanged) {
    patch.estructura = { ...(original.estructura || {}), seccion: { ...oldSection, titulo: group.titulo || null, capitulo: group.capitulo || null, nuevaHoja: !!group.nuevaHoja } };
  }
  if (Object.keys(patch).length > 1) {
    if (articleFieldsChanged) patch.contenido_lne = { ...(original.contenido_lne || {}), tipo: entry.tipo || original.tipo || "Artículo", numero: entry.numero, titulo: entry.titulo || null, texto: entry.textoHtml || "" };
    patch.__changeKind = articleFieldsChanged ? "article" : "structure";
    return patch;
  }
  return null;
}

function publishAdminDocumentChanges() {
  collectPreviewEdits();
  const articles = [];
  lastPreviewData.forEach((group, groupIndex) => (group.articulos || []).forEach(entry => {
    const change = articleChange(entry, group, groupIndex);
    if (change) articles.push(change);
  }));
  const norm = {};
  const originalName = originalAdminDocumentMeta?.nombre || "";
  const editedDocumentTitle = (previewTitle.value || "").trim();
  const resolvedName = editedDocumentTitle && editedDocumentTitle !== originalName ? editedDocumentTitle : adminDocumentMeta.nombre;
  if (!originalAdminDocumentMeta || resolvedName !== originalName) norm.nombre = resolvedName;
  if (!originalAdminDocumentMeta || adminDocumentMeta.introduccion !== originalAdminDocumentMeta.introduccion) norm.introduccion = adminDocumentMeta.introduccion || null;
  previewEditStatus.textContent = articles.length || Object.keys(norm).length ? "Publicando solamente los bloques modificados…" : "No hay cambios pendientes";
  if (!articles.length && !Object.keys(norm).length) return;
  window.parent.postMessage({ type: "lne-legislation-publish", codigo: adminDocumentMeta.codigo, norm, articles }, window.location.origin);
}

if (window.__LNE_LEGISLATION_MODE__) {
  applyPreviewBtn.textContent = "PUBLICAR CAMBIOS";
  applyPreviewBtn.title = "Actualiza solamente los bloques modificados";
  window.addEventListener("message", event => {
    if (event.origin !== window.location.origin) return;
    const message = event.data || {};
    if (message.type === "lne-legislation-load") {
      if (message.reset) {
        adminDocumentMeta = { codigo: message.norma?.codigo || "", nombre: message.norma?.nombre || "", introduccion: message.norma?.introduccion || "" };
        originalAdminDocumentMeta = { ...adminDocumentMeta };
      }
      appendAdminRows(Array.isArray(message.rows) ? message.rows : [], !!message.reset);
      window.parent.postMessage({ type: "lne-legislation-ready", loaded: adminOriginalArticles.size }, window.location.origin);
    }
    if (message.type === "lne-legislation-focus") {
      const target = legalPreview.querySelector(`.legal-article[data-admin-id="${CSS.escape(String(message.id))}"]`) || Array.from(legalPreview.querySelectorAll('.legal-article')).find(node => {
        const gi = Number(node.dataset.groupIndex), ai = Number(node.dataset.articleIndex);
        return String(lastPreviewData[gi]?.articulos?.[ai]?.__adminId) === String(message.id);
      });
      target?.scrollIntoView({ behavior:"smooth", block:"center" });
    }
    if (message.type === "lne-legislation-published") {
      originalAdminDocumentMeta = { ...adminDocumentMeta };
      lastPreviewData.forEach(group => (group.articulos || []).forEach(entry => { if (entry.__adminId) adminOriginalArticles.set(String(entry.__adminId), clonePreview(entry)); }));
      adminDirtyArticleIds.clear();
      adminDirtyGroupIndexes.clear();
      previewEditStatus.textContent = message.status || "✓ Cambios publicados correctamente";
      previewEditStatus.classList.add("ok");
      resetPreviewHistory();
    }
    if (message.type === "lne-legislation-error") {
      previewEditStatus.textContent = message.error || "No se pudieron publicar los cambios";
      previewEditStatus.classList.remove("ok");
    }
  });
  let moreRequested = false;
  window.addEventListener("scroll", () => {
    if (moreRequested || innerHeight + scrollY < document.documentElement.scrollHeight - 1200) return;
    moreRequested = true;
    window.parent.postMessage({ type:"lne-legislation-request-more" }, window.location.origin);
    setTimeout(() => { moreRequested = false; }, 800);
  }, { passive:true });
  window.parent.postMessage({ type:"lne-legislation-bridge-ready" }, window.location.origin);
}
