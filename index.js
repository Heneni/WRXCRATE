/* index.js — legacy controller for CrateDigger (not used by index.html) */

const data = [
  {
    title: "Let it Hiss",
    artist: "The Barr Brothers",
    cover: "https://i.scdn.co/image/ab67616d0000b27392d68ffd58ad8ea4cf9be566",
    year: "acid jazz-jazz funk",
    hasSleeve: true,
  },
  // ... repeat the other records here exactly as in main.js ...
  {
    title: "Taffetas",
    artist: "Taffetas",
    cover: "https://i.scdn.co/image/ab67616d0000b273923a878d3e0de9fb10993791",
    year: "acid jazz-jazz funk",
    hasSleeve: true,
  },
];

// DOM references (same as main.js)
const bottomBar       = document.getElementById('bottom-bar');
const buttonPrev      = document.getElementById('button-prev');
const buttonShow      = document.getElementById('button-show');
const buttonNext      = document.getElementById('button-next');
const titleContainer  = document.getElementById('cratedigger-record-title');
const artistContainer = document.getElementById('cratedigger-record-artist');
const coverContainer  = document.getElementById('cratedigger-record-cover');

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

window.cratedigger.loadRecords(data, true, () => {
  bindEvents();
});
