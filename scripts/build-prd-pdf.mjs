import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { manipalAiScribe as prd } from "../src/data/manipalAiScribe.ts";

const htmlPath = "/tmp/manipal-ai-scribe-prd.html";

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const bullets = (items) =>
  `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;

const table = (headers, rows, widths) => {
  const cols = widths
    ? `<colgroup>${widths.map((width) => `<col style="width:${width}">`).join("")}</colgroup>`
    : "";
  const head = `<thead><tr>${headers.map((header) => `<th>${esc(header)}</th>`).join("")}</tr></thead>`;
  const body = `<tbody>${rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`,
    )
    .join("")}</tbody>`;
  return `<table>${cols}${head}${body}</table>`;
};

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Manipal AI Scribe — Product Requirements Document V1</title>
  <style>
    @page {
      size: A4;
      margin: 16mm 14mm 15mm 14mm;
      @top-left {
        content: "MANIPAL HOSPITALS";
        font-family: Inter, "Liberation Sans", sans-serif;
        font-size: 8pt;
        letter-spacing: 0.14em;
        color: #5c6b7a;
      }
      @top-right {
        content: "AI Scribe  ·  PRD  ·  V1";
        font-family: Inter, "Liberation Sans", sans-serif;
        font-size: 8pt;
        color: #5c6b7a;
      }
      @bottom-left {
        content: "Manipal AI Scribe";
        font-family: Inter, "Liberation Sans", sans-serif;
        font-size: 8pt;
        color: #5c6b7a;
      }
      @bottom-right {
        content: counter(page) " / " counter(pages);
        font-family: Inter, "Liberation Sans", sans-serif;
        font-size: 8pt;
        color: #5c6b7a;
      }
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      color: #1c2430;
      font-family: Inter, "Liberation Sans", sans-serif;
      font-size: 10pt;
      line-height: 1.42;
    }
    h1, h2, h3 { font-family: "Liberation Serif", Georgia, serif; font-weight: 400; color: #142033; }
    h1 { font-size: 28pt; line-height: 1.05; margin: 8pt 0 0; }
    h2 {
      font-size: 15pt;
      line-height: 1.2;
      margin: 12pt 0 4pt;
      break-after: avoid;
    }
    h3 {
      font-size: 11.5pt;
      margin: 10pt 0 3pt;
      break-after: avoid;
    }
    p { margin: 0 0 4pt; }
    .kicker {
      margin: 0;
      font-size: 8.5pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #0e5f73;
      font-weight: 600;
    }
    .meta { margin: 6pt 0 0; color: #5c6b7a; font-size: 9.5pt; }
    .summary { margin-top: 10pt; font-size: 11.5pt; line-height: 1.4; color: #142033; }
    .rule { width: 42pt; height: 3pt; background: #0e5f73; margin: 12pt 0 0; border: 0; }
    ul, ol { margin: 2pt 0 8pt; padding-left: 16pt; }
    li { margin: 0 0 2pt; break-inside: avoid; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 2pt 0 8pt;
      font-size: 9pt;
      line-height: 1.35;
    }
    thead { display: table-header-group; }
    th, td {
      text-align: left;
      vertical-align: top;
      padding: 3.5pt 6pt 3.5pt 0;
      border-bottom: 0.4pt solid #d7dee6;
    }
    th {
      font-family: Inter, "Liberation Sans", sans-serif;
      font-size: 8pt;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #5c6b7a;
      border-bottom: 1pt solid #0e5f73;
    }
    tr { break-inside: avoid; }
    .split { width: 100%; border-collapse: separate; border-spacing: 10pt 0; margin: 2pt 0 4pt; }
    .split td {
      width: 50%;
      border: 0.6pt solid #d7dee6;
      background: #f6f8f8;
      padding: 8pt 9pt 6pt;
      vertical-align: top;
    }
    .split h3 { margin-top: 0; }
    .split ul { margin-bottom: 0; }
    .close {
      margin-top: 10pt;
      padding-top: 8pt;
      border-top: 1.5pt solid #0e5f73;
      break-inside: avoid;
      break-before: avoid;
    }
    .close p:last-child { margin-bottom: 0; }
    .position { font-family: "Liberation Serif", Georgia, serif; font-size: 13pt; color: #0e5f73; margin: 4pt 0 6pt; }
  </style>
</head>
<body>
  <h1>${esc(prd.title)}</h1>
  <p class="meta">${esc(prd.document)} · ${esc(prd.version)}</p>
  <hr class="rule" />
  <p class="summary">${esc(prd.summary)}</p>

  <h2>1. Product vision</h2>
  <p>${esc(prd.vision)}</p>

  <h2>2. Problem</h2>
  ${bullets(prd.problems)}

  <h2>3. Goals and non-goals</h2>
  <table class="split">
    <tr>
      <td><h3>Goals</h3>${bullets(prd.goals)}</td>
      <td><h3>Non-goals</h3>${bullets(prd.nonGoals)}</td>
    </tr>
  </table>

  <h2>4. Primary users</h2>
  ${table(
    ["User", "Need"],
    prd.users.map((row) => [row.user, row.need]),
    ["28%", "72%"],
  )}

  <h2>5. Product modes</h2>
  ${table(
    ["Mode", "Entry", "Experience", "Output"],
    prd.modes.map((row) => [row.mode, row.entry, row.experience, row.output]),
    ["18%", "22%", "34%", "26%"],
  )}

  <h2>6. Core user flow</h2>
  <h3>Ambient</h3>
  <p>${prd.ambientFlow.map(esc).join(" → ")}</p>
  <h3>Dictation</h3>
  <p>${prd.dictationFlow.map(esc).join(" → ")}</p>

  <h2>7. Clinical data mapping</h2>
  ${table(
    ["Section", "What is extracted", "Example"],
    prd.mapping.map((row) => [row.section, row.extracts, row.example]),
    ["18%", "42%", "40%"],
  )}

  <h2>8. Clinical interpretation rules</h2>
  ${bullets(prd.interpretation)}

  <h2>9. Medication resolution</h2>
  <p>${esc(prd.medication.intro)}</p>
  ${table(
    ["Field", "Rule"],
    prd.medication.rows.map((row) => [row.field, row.rule]),
    ["24%", "76%"],
  )}

  <h2>10. Processing architecture</h2>
  <p>${esc(prd.architecture.pipeline)}</p>
  ${bullets(prd.architecture.rules)}

  <h2>11. Structured output</h2>
  <p>${esc(prd.contract)}</p>
  ${table(
    ["State", "Meaning", "What the consultant sees"],
    prd.statuses.map((row) => [row.status, row.meaning, row.ux]),
    ["18%", "42%", "40%"],
  )}

  <h2>12. UI and UX</h2>
  ${bullets(prd.ux)}

  <h2>13. Consent, privacy, and audit</h2>
  ${bullets(prd.privacy)}

  <h2>14. Edge cases</h2>
  ${table(
    ["Situation", "Expected behaviour"],
    prd.edges.map((row) => [row.scenario, row.behaviour]),
    ["34%", "66%"],
  )}

  <h2>15. Release scope</h2>
  ${table(
    ["Phase", "Scope"],
    prd.phases.map((row) => [row.phase, row.scope]),
    ["28%", "72%"],
  )}

  <h2>16. Analytics and success metrics</h2>
  ${table(
    ["Metric", "Why it matters"],
    prd.metrics.map((row) => [row.metric, row.why]),
    ["36%", "64%"],
  )}

  <h2>17. Acceptance criteria for MVP 1</h2>
  ${bullets(prd.acceptance)}

  <div class="close">
    <p class="kicker">18. Launch positioning</p>
    <h2 style="margin-top:4pt">${esc(prd.title)}</h2>
    <p class="position">${esc(prd.positioning)}</p>
    <p>The scribe should feel like part of the OPD prescription, not another tool the consultant has to manage between patients.</p>
  </div>
</body>
</html>`;

writeFileSync(htmlPath, html);
mkdirSync(new URL("../public/", import.meta.url), { recursive: true });
execFileSync(
  "python3",
  [
    "-c",
    "from weasyprint import HTML; HTML(filename='/tmp/manipal-ai-scribe-prd.html').write_pdf('/workspace/public/manipal-ai-scribe-prd-v1.pdf')",
  ],
  { stdio: "inherit" },
);
console.log("Wrote /workspace/public/manipal-ai-scribe-prd-v1.pdf");
