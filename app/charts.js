// Charts for Japan in Numbers: small SVG bar and line charts drawn by hand.
// No library, no canvas, no network. Each function takes plain data and
// returns an SVG string the page drops into place.

const INK = '#1b2a4a';
const ACCENT = '#b23a2a';
const TEAL = '#2e7d6b';
const OCHRE = '#c08a2d';
const GRID = '#d9d4c8';
const MUTED = '#5d6675';

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Nice round numbers for an axis: given a max value, pick a step from
// 1 / 2 / 5 / 10 times a power of ten, aiming for about four gridlines.
export function axisStep(max, lines = 4) {
  const raw = max / lines;
  const power = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / power;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * power;
}

function numberLabel(value) {
  if (Math.abs(value) >= 1000) return value.toLocaleString('en-US');
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 10) / 10);
}

// A vertical bar chart. `bars` is [{label, value, colour?}]. The tallest bar
// sets the scale; every bar carries its value as text.
export function barChart(bars, options = {}) {
  const width = options.width || 720;
  const height = options.height || 320;
  const pad = { top: 16, right: 12, bottom: 64, left: 52 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const max = Math.max(...bars.map((b) => b.value), 0);
  const step = axisStep(max);
  const top = Math.ceil(max / step) * step;
  const y = (v) => pad.top + plotH - (v / top) * plotH;
  const slot = plotW / bars.length;
  const barW = Math.min(56, slot * 0.62);

  let grid = '';
  for (let v = 0; v <= top + 0.001; v += step) {
    grid += `<line x1="${pad.left}" y1="${y(v)}" x2="${width - pad.right}" y2="${y(v)}" stroke="${GRID}" stroke-width="1"/>`
      + `<text x="${pad.left - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${numberLabel(v)}</text>`;
  }

  let body = '';
  bars.forEach((bar, i) => {
    const cx = pad.left + slot * i + slot / 2;
    const colour = bar.colour || (i % 2 ? TEAL : INK);
    body += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${y(bar.value).toFixed(1)}" width="${barW}" height="${(pad.top + plotH - y(bar.value)).toFixed(1)}" rx="2" fill="${colour}"/>`
      + `<text x="${cx.toFixed(1)}" y="${(y(bar.value) - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${esc(bar.display || numberLabel(bar.value))}</text>`
      + `<text x="${cx.toFixed(1)}" y="${height - pad.bottom + 18}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(bar.label)}</text>`;
    if (bar.sub) {
      body += `<text x="${cx.toFixed(1)}" y="${height - pad.bottom + 34}" text-anchor="middle" font-size="10" fill="${MUTED}">${esc(bar.sub)}</text>`;
    }
  });

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label || 'Bar chart')}">`
    + grid
    + `<line x1="${pad.left}" y1="${pad.top + plotH}" x2="${width - pad.right}" y2="${pad.top + plotH}" stroke="${INK}" stroke-width="1.5"/>`
    + body
    + `</svg>`;
}

// A horizontal bar chart, best for ranked lists with long labels.
export function hbarChart(bars, options = {}) {
  const width = options.width || 720;
  const rowH = options.rowHeight || 40;
  const pad = { top: 8, right: 64, bottom: 8, left: 132 };
  const height = pad.top + pad.bottom + bars.length * rowH;
  const plotW = width - pad.left - pad.right;
  const max = Math.max(...bars.map((b) => b.value), 0);
  const barH = 18;

  let body = '';
  bars.forEach((bar, i) => {
    const cy = pad.top + rowH * i + rowH / 2;
    const w = (bar.value / max) * plotW;
    const colour = bar.colour || (i === 0 ? ACCENT : INK);
    body += `<text x="${pad.left - 10}" y="${cy + 4}" text-anchor="end" font-size="12" fill="${INK}">${esc(bar.label)}</text>`
      + `<rect x="${pad.left}" y="${cy - barH / 2}" width="${w.toFixed(1)}" height="${barH}" rx="2" fill="${colour}"/>`
      + `<text x="${pad.left + w + 8}" y="${cy + 4}" font-size="12" font-weight="600" fill="${INK}">${esc(bar.display || numberLabel(bar.value))}</text>`;
  });

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label || 'Horizontal bar chart')}">${body}</svg>`;
}

// A line chart. `points` is [{x, y, note?}]; x is the year, y the value.
// `series` may hold a second set of points drawn dashed in the accent colour.
export function lineChart(points, options = {}) {
  const width = options.width || 720;
  const height = options.height || 320;
  const pad = { top: 20, right: 16, bottom: 40, left: 56 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const all = options.series ? points.concat(options.series) : points;
  const ys = all.map((p) => p.y);
  const lo = Math.min(...ys);
  const hi = Math.max(...ys);
  const span = hi - lo || 1;
  const floor = Math.max(0, lo - span * 0.12);
  const ceil = hi + span * 0.08;
  const xs = all.map((p) => p.x);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const px = (x) => pad.left + ((x - x0) / (x1 - x0 || 1)) * plotW;
  const py = (v) => pad.top + plotH - ((v - floor) / (ceil - floor)) * plotH;
  const step = axisStep(ceil - floor);

  let grid = '';
  for (let v = Math.ceil(floor / step) * step; v <= ceil; v += step) {
    grid += `<line x1="${pad.left}" y1="${py(v)}" x2="${width - pad.right}" y2="${py(v)}" stroke="${GRID}" stroke-width="1"/>`
      + `<text x="${pad.left - 8}" y="${py(v) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${numberLabel(v)}</text>`;
  }

  function pathOf(list) {
    return list.map((p, i) => `${i ? 'L' : 'M'}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');
  }

  let ticks = '';
  const tickYears = points.filter((p, i) => i % Math.ceil(points.length / 7) === 0);
  tickYears.forEach((p) => {
    ticks += `<text x="${px(p.x).toFixed(1)}" y="${height - pad.bottom + 20}" text-anchor="middle" font-size="11" fill="${MUTED}">${p.x}</text>`;
  });

  let dots = '';
  points.forEach((p) => {
    dots += `<circle cx="${px(p.x).toFixed(1)}" cy="${py(p.y).toFixed(1)}" r="3.5" fill="#ffffff" stroke="${INK}" stroke-width="2"/>`;
  });
  const last = points[points.length - 1];
  dots += `<text x="${px(last.x).toFixed(1)}" y="${(py(last.y) - 10).toFixed(1)}" text-anchor="end" font-size="12" font-weight="700" fill="${INK}">${esc(options.lastLabel || numberLabel(last.y))}</text>`;

  let second = '';
  if (options.series) {
    second = `<path d="${pathOf(options.series)}" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-dasharray="6 4"/>`;
    options.series.forEach((p) => {
      second += `<circle cx="${px(p.x).toFixed(1)}" cy="${py(p.y).toFixed(1)}" r="3" fill="#ffffff" stroke="${ACCENT}" stroke-width="2"/>`;
    });
  }

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label || 'Line chart')}">`
    + grid
    + `<line x1="${pad.left}" y1="${pad.top + plotH}" x2="${width - pad.right}" y2="${pad.top + plotH}" stroke="${INK}" stroke-width="1.5"/>`
    + `<path d="${pathOf(points)}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`
    + second + dots + ticks
    + `</svg>`;
}

// A donut: `parts` is [{label, value, colour}]. The centre shows the total.
export function donutChart(parts, options = {}) {
  const size = options.size || 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const thick = 34;
  const total = parts.reduce((s, p) => s + p.value, 0);
  const palette = [INK, ACCENT, TEAL, OCHRE, '#7a6a9b', '#4a7ba6', '#8a9a5b'];
  parts.forEach((p, i) => { p.colour = p.colour || palette[i % palette.length]; });
  let angle = -Math.PI / 2;
  let arcs = '';
  parts.forEach((part) => {
    const frac = part.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    arcs += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${part.colour}" stroke-width="${thick}"/>`;
    angle = a1;
  });
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(options.label || 'Donut chart')}">`
    + arcs
    + `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="22" font-weight="700" fill="${INK}">${esc(options.centre || '')}</text>`
    + `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(options.centreSub || '')}</text>`
    + `</svg>`;
}
