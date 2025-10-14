(function () {
  const CSV_URL = './data/records.csv'; // CSV file path

  // CSV parser with quoted-field support; expects a header row
  function parseCSV(text) {
    const src = text.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');
    const rows = [];
    let row = [], cell = '', inQuotes = false;

    for (let i = 0; i < src.length; i++) {
      const ch = src[i], next = src[i + 1];
      if (inQuotes) {
        if (ch === '"' && next === '"') {
          cell += '"'; i++;            // Handle escaped quotes ("")
        } else if (ch === '"') {
          inQuotes = false;           // End of quoted field
        } else {
          cell += ch;                 // Characters inside quotes
        }
      } else {
        if (ch === '"') {
          inQuotes = true;            // Start quoted field
        } else if (ch === ',') {
          row.push(cell);             // End of cell on comma
          cell = '';
        } else if (ch === '\n') {
          row.push(cell);             // End of row on newline
          rows.push(row);
          row = [];
          cell = '';
        } else {
          cell += ch;                 // Regular character
        }
      }
    }
    // Push the last cell and row if not already included
    if (cell.length || row.length) {
      row.push(cell);
      rows.push(row);
    }
    if (!rows.length) return [];

    // Assume first row is headers
    const headers = rows[0].map(h => h.trim().toLowerCase());
    const out = [];
    for (let r = 1; r < rows.length; r++) {
      const line = rows[r];
      // Skip empty lines (if any)
      if (!line || line.every(v => (v || '').trim() === '')) continue;
      const rec = {};
      for (let c = 0; c < headers.length; c++) {
        rec[headers[c]] = (line[c] || '').trim();
      }
      // Build record object with expected fields
      out.push({
        title: rec.title || '',
        artist: rec.artist || '',
        cover: rec.cover || '',
        year: rec.year || '',
        id: rec.id || String(r),                // use provided ID or row index
        hasSleeve: /^(true|1|yes|y)$/i.test(rec.hassleeve || '')
      });
    }
    return out;
  }

  // DOM element references
  const $ = (id) => document.getElementById(id);
  const root    = $('cratedigger');
  const canvas  = $('cratedigger-canvas');
  const loading = $('cratedigger-loading');
  const info    = $('cratedigger-info');
  const btnPrev = $('button-prev');
  const btnShow = $('button-show');
  const btnNext = $('button-next');
  const titleEl = $('cratedigger-record-title');
  const artistEl= $('cratedigger-record-artist');
  const coverEl = $('cratedigger-record-cover');

  function updateInfoPanel(rec) {
    if (!rec) return;
    artistEl.textContent = rec.artist || '';
    titleEl.textContent  = rec.title  || '';
    coverEl.style.backgroundImage = rec.cover ? `url(${rec.cover})` : '';
  }

  function wireButtons(api) {
    btnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      api.selectPrevRecord();
    });
    btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      api.selectNextRecord();
    });
    btnShow.addEventListener('click', (e) => {
      e.preventDefault();
      const sel = api.getSelectedRecord();
      if (sel) {
        api.flipSelectedRecord();
      } else {
        api.selectNextRecord();
      }
    });
  }

  // Wait until CrateDigger’s API is ready (loaded from cratedigger.js)
  function waitForAPI() {
    return new Promise((resolve, reject) => {
      const t0 = Date.now();
      (function tick(){
        if (window.cratedigger && typeof window.cratedigger.init === 'function') {
          return resolve(window.cratedigger);
        }
        if (Date.now() - t0 > 5000) {
          return reject(new Error('CrateDigger API not available'));
        }
        setTimeout(tick, 16);
      })();
    });
  }

  // Bootstrapping the app
  async function boot() {
    const api = await waitForAPI();
    api.init({
      debug: false,  // debug off: no dat.gui panel or extra logging
      elements: {
        rootContainer: root,
        canvasContainer: canvas,
        loadingContainer: loading,
        infoContainer: info
      },
      onInfoPanelOpened: () => updateInfoPanel(api.getSelectedRecord()),
      onInfoPanelClosed: () => {/* no-op */}
    });

    // Fetch and parse the records CSV
    const res  = await fetch(CSV_URL, { cache: 'no-store' });
    const text = res.ok ? await res.text() : '';
    const records = text ? parseCSV(text) : [];

    // Load records into the CrateDigger 3D crate, then wire up UI buttons
    api.loadRecords(records, true, function onReady() {
      wireButtons(api);
    });
  }

  // Initialize the app
  boot().catch(err => console.error(err));
})();
