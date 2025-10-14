// /main.js  — loads records from /data/records.csv (no hardcoded JSON)
(function () {
  const CSV_URL = './data/records.csv';

  // Minimal CSV parser with quoted-field support
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

  const el = (id) => document.getElementById(id);
  const root = el('cratedigger'), canvas = el('cratedigger-canvas'), loading = el('cratedigger-loading'), info = el('cratedigger-info');
  const btnPrev = el('button-prev'), btnShow = el('button-show'), btnNext = el('button-next');
  const titleEl = el('cratedigger-record-title'), artistEl = el('cratedigger-record-artist'), coverEl = el('cratedigger-record-cover');

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
    window.cratedigger.init({
      debug: true,
      elements: { rootContainer: root, canvasContainer: canvas, loadingContainer: loading, infoContainer: info },
      onInfoPanelOpened: () => updateInfoPanel(window.cratedigger.getSelectedRecord()),
      onInfoPanelClosed: () => {}
    });

    let records = [];
    try {
      const res = await fetch(CSV_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
      records = parseCSV(await res.text());
    } catch (e) {
      console.error('CSV load/parse failed:', e);
      records = [];
    }

    window.cratedigger.loadRecords(records, true, function onReady() {
      wireButtons(window.cratedigger);
    });
  }

  boot();
})();
