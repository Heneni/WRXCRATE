// /main.js — paste this entire file; CSV-only, no fallbacks, no extras
(function () {
  const CSV_URL = './data/records.csv'; // CSV lives in /data/records.csv

  // CSV parser with quoted-field support; requires a header row.
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
      const line = rows[r];
      if (!line || line.every(v => (v || '').trim() === '')) continue;
      const rec = {};
      for (let c = 0; c < headers.length; c++) rec[headers[c]] = (line[c] || '').trim();
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

  // Elements expected by your runtime
  const $ = (id) => document.getElementById(id);
  const root = $('cratedigger'), canvas = $('cratedigger-canvas'), loading = $('cratedigger-loading'), info = $('cratedigger-info');
  const btnPrev = $('button-prev'), btnShow = $('button-show'), btnNext = $('button-next');
  const titleEl = $('cratedigger-record-title'), artistEl = $('cratedigger-record-artist'), coverEl = $('cratedigger-record-cover');

  function updateInfoPanel(rec) {
    if (!rec) return;
    artistEl.textContent = rec.artist || '';
    titleEl.textContent = rec.title || '';
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

  // Wait until cratedigger.js has attached its API before calling it.
  function waitForAPI() {
    return new Promise((resolve, reject) => {
      const t0 = Date.now();
      (function tick(){
        if (window.cratedigger && typeof window.cratedigger.init === 'function') return resolve(window.cratedigger);
        if (Date.now() - t0 > 5000) return reject(new Error('cratedigger API not available'));
        setTimeout(tick, 16);
      })();
    });
  }

  async function boot() {
    const api = await waitForAPI();

    api.init({
      debug: true,
      elements: { rootContainer: root, canvasContainer: canvas, loadingContainer: loading, infoContainer: info },
      onInfoPanelOpened: () => updateInfoPanel(api.getSelectedRecord()),
      onInfoPanelClosed: () => {}
    });

    const res = await fetch(CSV_URL, { cache: 'no-store' });
    const text = res.ok ? await res.text() : '';
    const records = text ? parseCSV(text) : [];

    api.loadRecords(records, true, function onReady() {
      wireButtons(api);
    });
  }

  boot().catch(err => console.error(err));
})();
