// Entry point for Japan in Numbers: start the router, and handle the CSV
// download buttons. The CSV is built in the browser from the same data the
// pages show, so the file a visitor downloads always matches the page.

import { INDICATORS, SECTIONS } from './data.js';
import { renderPage } from './views.js';

function csvCell(text) {
  const s = String(text ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function downloadCsv(sectionId) {
  const section = SECTIONS.find((s) => s.id === sectionId);
  const rows = INDICATORS.filter((i) => i.section === sectionId);
  const lines = [['Indicator', 'Value', 'Year', 'Source', 'Note'].map(csvCell).join(',')];
  rows.forEach((i) => {
    lines.push([i.label, i.value, i.year, i.source, i.note].map(csvCell).join(','));
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `japan-in-numbers-${sectionId}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-csv]');
  if (btn) downloadCsv(btn.getAttribute('data-csv'));
});

window.addEventListener('hashchange', renderPage);
renderPage();
