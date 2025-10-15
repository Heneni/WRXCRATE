/* index.js — lightweight controller for CrateDigger */

const csvUrl = 'data/records.csv';

// DOM references (same as main.js)
const bottomBar       = document.getElementById('bottom-bar');
const buttonPrev      = document.getElementById('button-prev');
const buttonShow      = document.getElementById('button-show');
const buttonNext      = document.getElementById('button-next');
const titleContainer  = document.getElementById('cratedigger-record-title');
const artistContainer = document.getElementById('cratedigger-record-artist');
const coverContainer  = document.getElementById('cratedigger-record-cover');
const loadingLabel    = document.querySelector('#cratedigger-loading .loading-label');

const localServerInstructions = 'Run "npm start" from the project folder and open http://localhost:8080 in your browser.';

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().split(',').map((header) => header.trim());
  return lines
    .filter(Boolean)
    .map((line) => {
      const values = line.split(',');
      const entry = {};
      headers.forEach((header, index) => {
        entry[header] = values[index] ? values[index].trim() : '';
      });
      return entry;
    });
}

async function loadCsvRecords() {
  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV (${response.status})`);
  }
  const text = await response.text();
  return parseCsv(text);
}

function updateLoadingMessage(message) {
  if (loadingLabel) {
    loadingLabel.textContent = message;
  }
}

function normaliseRecord(record, index) {
  const rawTitle = record.title?.trim();
  const rawArtist = record.artist?.trim();
  const title = rawTitle || rawArtist || `Record ${index + 1}`;
  const artist = rawArtist || rawTitle || 'Unknown Artist';
  const cover = (record.cover || '').replace('http://', 'https://');
  const hasSleeve = typeof record.hasSleeve === 'string'
    ? record.hasSleeve.toLowerCase() === 'true'
    : Boolean(record.hasSleeve);

  return {
    title,
    artist,
    cover,
    year: record.year?.trim() || '',
    hasSleeve,
  };
}

function loadRecordsIntoViewer(records) {
  const preparedRecords = records.map(normaliseRecord);
  window.cratedigger.loadRecords(preparedRecords, true, () => {
    bindEvents();
    const selected = window.cratedigger.getSelectedRecord();
    if (selected) {
      fillInfoPanel(selected);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.protocol === 'file:') {
    console.warn('CrateDigger needs to be served over HTTP so the browser can fetch data/records.csv.');
    console.warn(localServerInstructions);
    updateLoadingMessage(`Waiting for a local server… ${localServerInstructions}`);
  }

  loadCsvRecords()
    .then(loadRecordsIntoViewer)
    .catch((error) => {
      console.error('Failed to load CSV records:', error);
      if (window.location.protocol === 'file:') {
        console.error('The browser blocked the CSV request because index.html was opened directly from the file system.');
      }
      updateLoadingMessage(`Could not load records. ${localServerInstructions}`);
    });
});

// Attach events
function bindEvents() {
  buttonPrev.addEventListener('click', (e) => {
    e.preventDefault();
    window.cratedigger.selectPrevRecord();
  }, false);
  buttonShow.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.cratedigger.getSelectedRecord()) {
      window.cratedigger.flipSelectedRecord();
    } else {
      window.cratedigger.selectNextRecord();
    }
  }, false);
  buttonNext.addEventListener('click', (e) => {
    e.preventDefault();
    window.cratedigger.selectNextRecord();
  }, false);
}

// Info panel update
function fillInfoPanel(record) {
  const r = record?.data ?? record;
  if (!r) return;
  if (r.title)  titleContainer.innerHTML = r.title;
  if (r.artist) artistContainer.innerHTML = r.artist;
  if (r.cover)  coverContainer.style.backgroundImage = `url(${r.cover})`;
}

// Initialise and load records (legacy style)
window.cratedigger.init({
  debug: false,
  elements: {
    rootContainer: document.getElementById('cratedigger'),
    canvasContainer: document.getElementById('cratedigger-canvas'),
    loadingContainer: document.getElementById('cratedigger-loading'),
    infoContainer: document.getElementById('cratedigger-info'),
  },
  onInfoPanelOpened() {
    bottomBar.classList.add('closed');
    fillInfoPanel(window.cratedigger.getSelectedRecord());
  },
  onInfoPanelClosed() {
    bottomBar.classList.remove('closed');
  },
});
