// main.js — minimal CSV-only data loader for CrateDigger
// No dev fallbacks, no JSON, no other changes required.
(function () {
  const CSV_URL = './records.csv';  // CSV at repo root

  // Tiny CSV parser with quoted-field support; headers required.
  function parseCSV(text) {
    const src = text.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');
    const rows = [];
    let row = [], cell = '', inQuotes = false;

    for (let i = 0; i < src.length; i++) {
      const ch = src[i], next = src[i + 1];
      if (inQuotes) {
        if (ch === '"' && next === '"') { cell += '"'; i++; }
        else if (ch === '"') { inQuotes = false; }
        else { cell += ch; }
      } else {
        if (ch === '"') inQuotes = true;
        else if (ch === ',') { row.push(cell); cell = ''; }
        else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
        else { cell += ch; }
      }
    }
    if (cell.length || row.length) { row.push(cell); rows.push(row); }
    if (!rows.length) return [];

    const headers = rows[0].map(h => h.trim().toLowerCase());
    const out = [];
    for (let r = 1; r < rows.length; r++) {
      if (!rows[r] || rows[r].every(v => (v || '').trim() === '')) continue;
      const rec = {};
      for (let c = 0; c < headers.length; c++) rec[headers[c]] = (rows[r][c] || '').trim();
      out.push({
        title: rec.title || '',
        artist: rec.artist || '',
        cover: rec.cover || '',
        year: rec.year || '',
        id: rec.id || String(r),
        hasSleeve: /^(true|1|yes|y)$/i.test(rec.hassleeve || '')
      });
    }
    return out;
  }

  // Cache element handles the runtime already expects
  const $ = (id) => document.getElementById(id);
  const root = $('cratedigger'), canvas = $('cratedigger-canvas'), loading = $('cratedigger-loading'), info = $('cratedigger-info');
  const btnPrev = $('button-prev'), btnShow = $('button-show'), btnNext = $('button-next');
  const titleEl = $('cratedigger-record-title'), artistEl = $('cratedigger-record-artist'), coverEl = $('cratedigger-record-cover');

  function updateInfoPanel(rec) {
    if (!rec) return;
    titleEl.textContent = rec.title || '';
    artistEl.textContent = rec.artist || '';
    coverEl.style.backgroundImage = rec.cover ? `url(${rec.cover})` : '';
  }

  function wireButtons(api) {
    btnPrev.addEventListener('click', (e) => { e.preventDefault(); api.selectPrevRecord(); });
    btnNext.addEventListener('click', (e) => { e.preventDefault(); api.selectNextRecord(); });
    btnShow.addEventListener('click', (e) => {
      e.preventDefault();
      const sel = api.getSelectedRecord();
      sel ? api.flipSelectedRecord() : api.selectNextRecord();
    });
  }

  async function boot() {
    if (!window.cratedigger) {
      console.error('cratedigger runtime not found (cratedigger.js must load before main.js).');
      return;
    }

    window.cratedigger.init({
      debug: true,
      elements: { rootContainer: root, canvasContainer: canvas, loadingContainer: loading, infoContainer: info },
      onInfoPanelOpened: () => updateInfoPanel(window.cratedigger.getSelectedRecord()),
      onInfoPanelClosed: () => {}
    });

    // load CSV (no fallbacks)
    let records = [];
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    if (!res.ok) {
      console.error('CSV fetch failed:', res.status, res.statusText);
    } else {
      records = parseCSV(await res.text());
    }

    window.cratedigger.loadRecords(records, true, function onReady() {
      wireButtons(window.cratedigger);
    });
  }

  boot();
})();
