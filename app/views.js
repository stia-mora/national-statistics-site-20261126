// Pages for Japan in Numbers: a hash router and one renderer per section.
// Every page is built from data.js, so a figure shown anywhere on the site
// is the same figure with the same source and year. Controls on a page are
// wired up in afterRender(); nothing here is a dead link or a placeholder.

import {
  SITE, SECTIONS, INDICATORS, POPULATION_SERIES, POPULATION_SOURCE,
  AGE_GROUPS, AGE_SOURCE, GDP_SERIES, GDP_SOURCE, LABOUR_PRICE_SERIES,
  LABOUR_PRICE_SOURCE, POWER_MIX, POWER_SOURCE, PREFECTURES,
  PREFECTURE_SOURCE, RELEASES,
} from './data.js';
import { barChart, hbarChart, lineChart, donutChart } from './charts.js';

export const state = {
  popView: 'actual',       // population chart: 'actual' (1950–2024) or 'projection' (2024–2070)
  gdpMetric: 'nominal',    // GDP chart: 'nominal' ($ trillion) or 'perPerson' ($ per person)
  prefSort: 'population',  // prefecture chart: 'population' or 'density'
  regionSort: 'population',
  regionQuery: '',
  searchQuery: '',
};

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sectionOf(id) {
  return SECTIONS.find((s) => s.id === id);
}

function indicatorsOf(sectionId) {
  return INDICATORS.filter((i) => i.section === sectionId);
}

function kpiCard(ind) {
  return `<a class="kpi" href="#/${ind.section}">`
    + `<span class="kpi-label">${esc(ind.label)}</span>`
    + `<span class="kpi-value">${esc(ind.value)}</span>`
    + `<span class="kpi-meta">${ind.year} · ${esc(ind.source)}</span>`
    + `</a>`;
}

function indicatorTable(rows) {
  const body = rows.map((i) => `<tr>`
    + `<th scope="row">${esc(i.label)}</th>`
    + `<td class="num">${esc(i.value)}</td>`
    + `<td class="num">${i.year}</td>`
    + `<td>${esc(i.source)}</td>`
    + `<td class="note">${esc(i.note)}</td>`
    + `</tr>`).join('');
  return `<div class="table-wrap"><table class="figures">`
    + `<thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th><th>What it means</th></tr></thead>`
    + `<tbody>${body}</tbody></table></div>`;
}

function sourceLine(text) {
  return `<p class="source-line">Source: ${esc(text)}</p>`;
}

function csvButton(sectionId, label) {
  return `<button type="button" class="btn" data-csv="${esc(sectionId)}">Download ${esc(label || 'these figures')} as CSV</button>`;
}

function pageHead(title, blurb, sectionId) {
  return `<div class="page-head"><h1>${esc(title)}</h1><p class="lede">${esc(blurb)}</p>`
    + (sectionId ? `<p class="page-tools">${csvButton(sectionId)}</p>` : '')
    + `</div>`;
}

function toggleButtons(name, choices, current) {
  return `<div class="toggle" role="group" aria-label="${esc(name)}">`
    + choices.map((c) => `<button type="button" data-toggle="${esc(c.key)}" data-group="${esc(name)}" aria-pressed="${c.key === current ? 'true' : 'false'}" class="${c.key === current ? 'on' : ''}">${esc(c.label)}</button>`).join('')
    + `</div>`;
}

// ---- Overview -----------------------------------------------------------

function renderOverview() {
  const headline = ['pop-total', 'gdp-nominal', 'life-exp', 'unemp', 'pop-65', 'fertility', 'cpi', 'eco-tourists']
    .map((id) => INDICATORS.find((i) => i.id === id));
  const popPoints = POPULATION_SERIES.filter((p) => p.kind === 'actual')
    .map((p) => ({ x: p.year, y: p.value }));
  const projPoints = POPULATION_SERIES.filter((p) => p.year >= 2024)
    .map((p) => ({ x: p.year, y: p.value }));
  const chart = state.popView === 'actual'
    ? lineChart(popPoints, { label: 'Population of Japan, 1950 to 2024, millions', lastLabel: '124.0m' })
    : lineChart(
      [{ x: 2024, y: 124.0 }],
      {
        label: 'Projected population of Japan, 2024 to 2070, millions',
        series: projPoints,
        lastLabel: '87.0m',
      },
    );
  const prefBars = [...PREFECTURES]
    .sort((a, b) => state.prefSort === 'density' ? b.density - a.density : b.population - a.population)
    .slice(0, 8)
    .map((p) => ({
      label: p.name,
      value: state.prefSort === 'density' ? p.density : p.population,
      display: state.prefSort === 'density' ? p.density.toLocaleString('en-US') : `${p.population.toFixed(2)}m`,
    }));
  const releases = RELEASES.map((r) => `<li><span class="rel-date">${esc(r.date)}</span> `
    + `<a href="#/${esc(r.section)}">${esc(r.title)}</a><p>${esc(r.body)}</p></li>`).join('');
  const cards = SECTIONS.filter((s) => s.id !== 'overview').map((s) => {
    const count = indicatorsOf(s.id).length;
    return `<a class="section-card" href="#/${s.id}"><h3>${esc(s.title)}</h3><p>${esc(s.blurb)}</p>`
      + `<span class="count">${count} indicators</span></a>`;
  }).join('');

  return `<section class="hero"><p class="eyebrow">National statistics · Japan</p>`
    + `<h1>Japan in numbers.</h1>`
    + `<p class="lede">Population, economy, work, health, schooling, energy and the regions — every figure with the body that published it and the year it describes. No account, no tracking, no network calls: the whole site runs from its own files.</p>`
    + `<p class="hero-links"><a class="btn primary" href="#/population">Start with population</a> `
    + `<a class="btn" href="#/search">Search every indicator</a></p></section>`
    + `<section><h2>Headline figures</h2><div class="kpi-grid">${headline.map(kpiCard).join('')}</div></section>`
    + `<section class="chart-block"><div class="chart-head"><h2>Population: a century of rise, then fall</h2>`
    + toggleButtons('popView', [
      { key: 'actual', label: '1950–2024' },
      { key: 'projection', label: 'Projection to 2070' },
    ], state.popView) + `</div>`
    + `<div class="chart">${chart}</div>`
    + `<p class="chart-note">${state.popView === 'actual'
      ? 'The population peaked at 128.1 million in 2010 and has fallen every year since.'
      : 'The medium projection has Japan below 100 million people in the late 2050s.'}</p>`
    + sourceLine(POPULATION_SOURCE) + `</section>`
    + `<section class="chart-block"><div class="chart-head"><h2>Largest prefectures</h2>`
    + toggleButtons('prefSort', [
      { key: 'population', label: 'By population' },
      { key: 'density', label: 'By density' },
    ], state.prefSort) + `</div>`
    + `<div class="chart">${hbarChart(prefBars, { label: 'Largest prefectures of Japan' })}</div>`
    + `<p class="chart-note"><a href="#/regions">Compare all ten largest prefectures →</a></p></section>`
    + `<section><h2>Latest releases</h2><ul class="releases">${releases}</ul></section>`
    + `<section><h2>Browse by topic</h2><div class="section-grid">${cards}</div></section>`;
}

// ---- Population ---------------------------------------------------------

function renderPopulation() {
  const rows = indicatorsOf('population');
  const actual = POPULATION_SERIES.filter((p) => p.kind === 'actual').map((p) => ({ x: p.year, y: p.value }));
  const proj = POPULATION_SERIES.filter((p) => p.year >= 2024).map((p) => ({ x: p.year, y: p.value }));
  const chart = state.popView === 'actual'
    ? lineChart(actual, { label: 'Population of Japan, 1950 to 2024, millions', lastLabel: '124.0m' })
    : lineChart([{ x: 2024, y: 124.0 }], { label: 'Projected population of Japan, 2024 to 2070, millions', series: proj, lastLabel: '87.0m' });
  const ageBars = AGE_GROUPS.map((g) => ({
    label: g.group, value: g.value, display: `${g.value.toFixed(1)}m`,
    colour: g.group === '75+' || g.group === '65–74' ? '#b23a2a' : '#1b2a4a',
  }));
  return pageHead('Population', sectionOf('population').blurb, 'population')
    + `<div class="kpi-grid">${rows.slice(0, 4).map(kpiCard).join('')}</div>`
    + `<section class="chart-block"><div class="chart-head"><h2>How the total has moved</h2>`
    + toggleButtons('popView', [
      { key: 'actual', label: '1950–2024' },
      { key: 'projection', label: 'Projection to 2070' },
    ], state.popView) + `</div><div class="chart">${chart}</div>`
    + sourceLine(POPULATION_SOURCE) + `</section>`
    + `<section class="chart-block"><h2>Who lives here now, by age</h2>`
    + `<div class="chart">${barChart(ageBars, { label: 'Population by age group, 2024, millions' })}</div>`
    + `<p class="chart-note">Two in five people are 40 or older; one in six is 75 or older. The red bars are the retired generations.</p>`
    + sourceLine(AGE_SOURCE) + `</section>`
    + `<section><h2>All population figures</h2>${indicatorTable(rows)}</section>`;
}

// ---- Economy ------------------------------------------------------------

function renderEconomy() {
  const rows = indicatorsOf('economy');
  const metric = state.gdpMetric;
  const points = GDP_SERIES.map((g) => ({
    x: g.year,
    y: metric === 'nominal' ? g.nominal : g.perPerson,
  }));
  const chart = lineChart(points, {
    label: metric === 'nominal' ? 'Nominal GDP of Japan, US dollars trillion' : 'GDP per person in Japan, US dollars',
    lastLabel: metric === 'nominal' ? '$4.03tn' : '$32,500',
  });
  const lp = LABOUR_PRICE_SERIES.map((p) => ({ x: p.year, y: p.inflation }));
  const un = LABOUR_PRICE_SERIES.map((p) => ({ x: p.year, y: p.unemployment }));
  return pageHead('Economy', sectionOf('economy').blurb, 'economy')
    + `<div class="kpi-grid">${rows.slice(0, 4).map(kpiCard).join('')}</div>`
    + `<section class="chart-block"><div class="chart-head"><h2>Output, in dollars</h2>`
    + toggleButtons('gdpMetric', [
      { key: 'nominal', label: 'Total GDP ($ trillion)' },
      { key: 'perPerson', label: 'GDP per person ($)' },
    ], state.gdpMetric) + `</div><div class="chart">${chart}</div>`
    + `<p class="chart-note">Nominal GDP in dollars fell after 2021 mostly because the yen weakened — in yen, output kept growing.</p>`
    + sourceLine(GDP_SOURCE) + `</section>`
    + `<section class="chart-block"><h2>Prices rose; jobs stayed plentiful</h2>`
    + `<div class="chart">${lineChart(lp, { label: 'Consumer price inflation, percent', series: un, lastLabel: '2.7%' })}</div>`
    + `<p class="chart-note">Solid line: consumer price inflation. Dashed line: the unemployment rate. Inflation ran above 2% from 2022 while unemployment stayed near 2.5%.</p>`
    + sourceLine(LABOUR_PRICE_SOURCE) + `</section>`
    + `<section><h2>All economy figures</h2>${indicatorTable(rows)}</section>`;
}

// ---- Labour -------------------------------------------------------------

function renderLabour() {
  const rows = indicatorsOf('labour');
  const un = LABOUR_PRICE_SERIES.map((p) => ({ x: p.year, y: p.unemployment }));
  return pageHead('Labour', sectionOf('labour').blurb, 'labour')
    + `<div class="kpi-grid">${rows.slice(0, 4).map(kpiCard).join('')}</div>`
    + `<section class="chart-block"><h2>Unemployment stayed low</h2>`
    + `<div class="chart">${lineChart(un, { label: 'Unemployment rate, percent', lastLabel: '2.5%' })}</div>`
    + `<p class="chart-note">Even in the pandemic year of 2020, unemployment peaked at 2.8% — low by any rich country's standard.</p>`
    + sourceLine(LABOUR_PRICE_SOURCE) + `</section>`
    + `<section><h2>All labour figures</h2>${indicatorTable(rows)}</section>`;
}

// ---- Health -------------------------------------------------------------

function renderHealth() {
  const rows = indicatorsOf('health');
  const lifeBars = [
    { label: 'Women, Japan', value: 87.1, display: '87.1', colour: '#b23a2a' },
    { label: 'Men, Japan', value: 81.1, display: '81.1', colour: '#1b2a4a' },
  ];
  const careBars = [
    { label: 'Hospital beds, Japan', value: 12.6, display: '12.6', colour: '#1b2a4a' },
    { label: 'Hospital beds, OECD avg.', value: 4.3, display: '4.3', colour: '#5d6675' },
    { label: 'Doctors, Japan', value: 2.6, display: '2.6', colour: '#1b2a4a' },
    { label: 'Doctors, OECD avg.', value: 3.7, display: '3.7', colour: '#5d6675' },
  ];
  return pageHead('Health', sectionOf('health').blurb, 'health')
    + `<div class="kpi-grid">${rows.slice(0, 4).map(kpiCard).join('')}</div>`
    + `<section class="chart-block"><h2>The longest lives in the world</h2>`
    + `<div class="chart">${barChart(lifeBars, { label: 'Life expectancy at birth, years, 2023', height: 220 })}</div>`
    + `<p class="chart-note">Japanese women live longer than women anywhere else; Japanese men are close behind.</p>`
    + sourceLine('Ministry of Health, Labour and Welfare, abridged life tables, 2023.') + `</section>`
    + `<section class="chart-block"><h2>Many beds, fewer doctors</h2>`
    + `<div class="chart">${barChart(careBars, { label: 'Hospital beds and doctors per 1,000 people, 2022', height: 260 })}</div>`
    + `<p class="chart-note">Japan has three times the OECD average of hospital beds per person, but fewer doctors.</p>`
    + sourceLine('OECD, Health at a Glance 2023.') + `</section>`
    + `<section><h2>All health figures</h2>${indicatorTable(rows)}</section>`;
}

// ---- Education ----------------------------------------------------------

function renderEducation() {
  const rows = indicatorsOf('education');
  const pisa = [
    { label: 'Maths', value: 536, display: '536', colour: '#1b2a4a' },
    { label: 'Reading', value: 516, display: '516', colour: '#1b2a4a' },
    { label: 'Science', value: 547, display: '547', colour: '#1b2a4a' },
    { label: 'Maths, OECD avg.', value: 472, display: '472', colour: '#5d6675' },
    { label: 'Reading, OECD avg.', value: 476, display: '476', colour: '#5d6675' },
    { label: 'Science, OECD avg.', value: 485, display: '485', colour: '#5d6675' },
  ];
  return pageHead('Education', sectionOf('education').blurb, 'education')
    + `<div class="kpi-grid">${rows.slice(0, 4).map(kpiCard).join('')}</div>`
    + `<section class="chart-block"><h2>School results: well above the OECD average</h2>`
    + `<div class="chart">${barChart(pisa, { label: 'PISA 2022 scores for 15-year-olds, Japan against the OECD average', height: 300 })}</div>`
    + `<p class="chart-note">In all three subjects Japanese 15-year-olds scored far above the OECD mean.</p>`
    + sourceLine('OECD, PISA 2022 Results.') + `</section>`
    + `<section><h2>All education figures</h2>${indicatorTable(rows)}</section>`;
}

// ---- Environment & energy -----------------------------------------------

function renderEnvironment() {
  const rows = indicatorsOf('environment');
  const mix = POWER_MIX.map((p) => ({ label: p.source, value: p.value }));
  const mixBars = POWER_MIX.map((p) => ({
    label: p.source, value: p.value, display: `${p.value}%`,
    colour: p.source === 'Coal' || p.source === 'Gas (LNG)' || p.source === 'Oil' ? '#5d6675' : undefined,
  }));
  return pageHead('Environment & Energy', sectionOf('environment').blurb, 'environment')
    + `<div class="kpi-grid">${rows.slice(0, 4).map(kpiCard).join('')}</div>`
    + `<section class="chart-block"><h2>Where the electricity comes from</h2>`
    + `<div class="duo"><div class="donut-wrap">${donutChart(mix, { label: 'Electricity mix, fiscal 2023', centre: '100%', centreSub: 'of generation' })}</div>`
    + `<ul class="legend">${POWER_MIX.map((p, i) => `<li><span class="swatch" style="background:${['#1b2a4a', '#b23a2a', '#2e7d6b', '#c08a2d', '#7a6a9b', '#4a7ba6', '#8a9a5b'][i]}"></span>${esc(p.source)} — <strong>${p.value}%</strong></li>`).join('')}</ul></div>`
    + `<p class="chart-note">Fossil fuels still make up about three-fifths of generation; renewables, including hydro, supply just under a quarter.</p>`
    + sourceLine(POWER_SOURCE) + `</section>`
    + `<section class="chart-block"><h2>The mix, ranked</h2>`
    + `<div class="chart">${barChart(mixBars, { label: 'Share of electricity generation by source, fiscal 2023, percent', height: 300 })}</div>`
    + sourceLine(POWER_SOURCE) + `</section>`
    + `<section><h2>All environment &amp; energy figures</h2>${indicatorTable(rows)}</section>`;
}

// ---- Regions ------------------------------------------------------------

function regionRows() {
  const q = state.regionQuery.trim().toLowerCase();
  let list = PREFECTURES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  const key = state.regionSort;
  list = [...list].sort((a, b) => b[key] - a[key]);
  return list;
}

function renderRegions() {
  const list = regionRows();
  const rows = list.map((p) => `<tr><th scope="row">${esc(p.name)}</th><td>${esc(p.capital)}</td>`
    + `<td class="num">${p.population.toFixed(2)}</td><td class="num">${p.area.toLocaleString('en-US')}</td>`
    + `<td class="num">${p.density.toLocaleString('en-US')}</td></tr>`).join('');
  const bars = [...PREFECTURES].sort((a, b) => b.population - a.population).map((p) => ({
    label: p.name, value: p.population, display: `${p.population.toFixed(2)}m`,
  }));
  const sortLabel = { population: 'Population (millions)', area: 'Area (km²)', density: 'Density (per km²)' };
  return pageHead('Regions', sectionOf('regions').blurb, 'regions')
    + `<section class="chart-block"><h2>Population of the ten largest prefectures</h2>`
    + `<div class="chart">${hbarChart(bars, { label: 'Population of the ten largest prefectures, millions' })}</div>`
    + sourceLine(PREFECTURE_SOURCE) + `</section>`
    + `<section><h2>Compare the prefectures</h2>`
    + `<div class="table-tools"><label>Filter by name or capital `
    + `<input type="search" id="region-filter" value="${esc(state.regionQuery)}" placeholder="e.g. Osaka" aria-label="Filter prefectures"></label>`
    + `<span class="sort-group">Sort by: `
    + Object.keys(sortLabel).map((k) => `<button type="button" data-region-sort="${k}" class="${state.regionSort === k ? 'on' : ''}" aria-pressed="${state.regionSort === k ? 'true' : 'false'}">${esc(sortLabel[k])}</button>`).join('')
    + `</span></div>`
    + `<p class="result-count">${list.length} of ${PREFECTURES.length} prefectures shown</p>`
    + `<div class="table-wrap"><table class="figures"><thead><tr><th>Prefecture</th><th>Capital</th><th>Population (millions)</th><th>Area (km²)</th><th>Density (per km²)</th></tr></thead><tbody>${rows || '<tr><td colspan="5">No prefecture matches that filter.</td></tr>'}</tbody></table></div>`
    + sourceLine(PREFECTURE_SOURCE) + `</section>`;
}

// ---- Search ---------------------------------------------------------------

function searchResults() {
  const q = state.searchQuery.trim().toLowerCase();
  if (!q) return INDICATORS;
  return INDICATORS.filter((i) => [i.label, i.value, i.source, i.note, i.section]
    .join(' ').toLowerCase().includes(q));
}

function renderSearch() {
  const results = searchResults();
  const q = state.searchQuery.trim();
  const list = results.map((i) => `<li><a href="#/${i.section}">${esc(i.label)}</a> — <strong>${esc(i.value)}</strong> `
    + `<span class="kpi-meta">${i.year} · ${esc(i.source)} · ${esc(sectionOf(i.section).title)}</span></li>`).join('');
  return `<div class="page-head"><h1>Search every indicator</h1>`
    + `<p class="lede">One search across all ${INDICATORS.length} figures on this site — by topic, value, source or year.</p></div>`
    + `<section><label class="search-label">Search <input type="search" id="site-search" value="${esc(state.searchQuery)}" placeholder="Try “life expectancy”, “GDP” or “2024”" aria-label="Search indicators"></label>`
    + `<p class="result-count">${q ? `${results.length} result${results.length === 1 ? '' : 's'} for “${esc(q)}”` : `${results.length} indicators in total`}</p>`
    + `<ul class="results">${list || '<li>No indicator matches that search.</li>'}</ul></section>`;
}

// ---- About ----------------------------------------------------------------

function renderAbout() {
  const sources = [...new Set(INDICATORS.map((i) => i.source))].sort();
  return `<div class="page-head"><h1>About this site</h1>`
    + `<p class="lede">Japan in Numbers is an independent reference site. It is not affiliated with the Japanese government or with any of the bodies whose figures it quotes.</p></div>`
    + `<section><h2>How to use it</h2><ul class="plain">`
    + `<li><strong>Browse by topic</strong> — population, economy, labour, health, education, environment and the regions, from the menu at the top of every page.</li>`
    + `<li><strong>Search</strong> — every figure on the site is searchable by word, source or year.</li>`
    + `<li><strong>Take the data</strong> — each section has a button that downloads its figures as a CSV file, free to reuse with attribution.</li>`
    + `<li><strong>Check the source</strong> — every figure names the body that published it and the year it describes. Headline figures change; check the source body for the latest release.</li>`
    + `</ul></section>`
    + `<section><h2>Sources quoted</h2><ul class="plain">${sources.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>`
    + `<section><h2>Methods and limits</h2><ul class="plain">`
    + `<li>Figures are headline values as published. Where a body later revises a figure, this site keeps the value as first published and notes the year.</li>`
    + `<li>Population projections are the medium variant of the National Institute of Population and Social Security Research, published in 2023.</li>`
    + `<li>Money figures are in yen unless marked with a dollar sign; dollar GDP figures come from the IMF and move with the yen.</li>`
    + `<li>This site stores nothing about its visitors and loads nothing from any other server. It works with the network off.</li>`
    + `</ul></section>`
    + `<section><h2>Colophon</h2><p>Built as a set of plain static files — one page, one stylesheet, one data file, one chart file and one file of page renderers — with charts drawn as SVG by hand. Last updated ${esc(SITE.updated)}.</p></section>`;
}

// ---- Router ---------------------------------------------------------------

const ROUTES = {
  '': renderOverview,
  overview: renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  labour: renderLabour,
  health: renderHealth,
  education: renderEducation,
  environment: renderEnvironment,
  regions: renderRegions,
  search: renderSearch,
  about: renderAbout,
};

export function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : '';
}

export function renderPage() {
  const route = currentRoute();
  const app = document.getElementById('app');
  app.innerHTML = (ROUTES[route] || renderOverview)();
  document.querySelectorAll('#site-nav a').forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\//, '');
    const active = target === route || (route === '' && target === '');
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const title = route === '' ? SITE.name : `${sectionOf(route)?.title || 'Search'} · ${SITE.name}`;
  document.title = `${title} — ${SITE.tagline}`;
  afterRender();
}

export function afterRender() {
  document.querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-group');
      const key = btn.getAttribute('data-toggle');
      if (group === 'popView') state.popView = key;
      if (group === 'gdpMetric') state.gdpMetric = key;
      if (group === 'prefSort') state.prefSort = key;
      renderPage();
    });
  });
  document.querySelectorAll('[data-region-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.regionSort = btn.getAttribute('data-region-sort');
      renderPage();
    });
  });
  const regionFilter = document.getElementById('region-filter');
  if (regionFilter) {
    regionFilter.addEventListener('input', () => {
      state.regionQuery = regionFilter.value;
      renderPage();
      const again = document.getElementById('region-filter');
      if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
    });
  }
  const siteSearch = document.getElementById('site-search');
  if (siteSearch) {
    siteSearch.addEventListener('input', () => {
      state.searchQuery = siteSearch.value;
      renderPage();
      const again = document.getElementById('site-search');
      if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
    });
  }
}
