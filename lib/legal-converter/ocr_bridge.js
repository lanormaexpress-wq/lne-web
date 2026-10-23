const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

let cachedBinary;
function tesseractBinary() {
  if (cachedBinary !== undefined) return cachedBinary;
  const candidates = ["tesseract"];
  if (process.platform === "win32") candidates.push("C:\\Program Files\\Tesseract-OCR\\tesseract.exe");
  for (const binary of candidates) {
    try {
      execFileSync(binary, ["--version"], { stdio: "ignore", timeout: 5000, windowsHide: true });
      cachedBinary = binary;
      return binary;
    } catch { /* Probar la siguiente ubicación. */ }
  }
  cachedBinary = null;
  return null;
}

async function ocrPdfPage(parser, pageNumber) {
  const binary = tesseractBinary();
  if (!binary) return { available: false, text: "" };
  const screenshot = await parser.getScreenshot({ partial: [pageNumber], scale: 2, imageBuffer: true, imageDataUrl: false });
  const data = screenshot.pages?.[0]?.data;
  if (!data?.length) return { available: true, text: "" };
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "lne-ocr-"));
  const imagePath = path.join(tempDir, "page.png");
  try {
    fs.writeFileSync(imagePath, Buffer.from(data));
    let text = "";
    try {
      text = execFileSync(binary, [imagePath, "stdout", "-l", "spa+eng", "--psm", "1"], {
        encoding: "utf8", timeout: 90000, maxBuffer: 20 * 1024 * 1024, windowsHide: true
      });
    } catch {
      text = execFileSync(binary, [imagePath, "stdout", "-l", "eng", "--psm", "1"], {
        encoding: "utf8", timeout: 90000, maxBuffer: 20 * 1024 * 1024, windowsHide: true
      });
    }
    return { available: true, text };
  } finally {
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    fs.rmdirSync(tempDir);
  }
}

module.exports = { ocrPdfPage, tesseractBinary };
