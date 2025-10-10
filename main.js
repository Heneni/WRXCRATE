// DO NOT use import/export in this file.
// Use classic script loading.

const bottomBar = document.getElementById('bottom-bar');
const buttonPrev = document.getElementById('button-prev');
const buttonShow = document.getElementById('button-show');
const buttonNext = document.getElementById('button-next');
const titleContainer = document.getElementById('cratedigger-record-title');
const artistContainer = document.getElementById('cratedigger-record-artist');
const coverContainer = document.getElementById('cratedigger-record-cover');

// Replace this with your actual album data array
const data = [
  // ... your album objects here, or load from a separate records.js as a global variable
];

function bindEvents() {
  buttonPrev.addEventListener('click', (e) => {
    e.preventDefault();
    cratedigger.selectPrevRecord();
  }, false);

  buttonShow.addEventListener('click', (e) => {
    e.preventDefault();
    if (cratedigger.getSelectedRecord()) {
      cratedigger.flipSelectedRecord();
    } else {
      cratedigger.selectNextRecord();
    }
  }, false);

  buttonNext.addEventListener('click', (e) => {
    e.preventDefault();
    cratedigger.selectNextRecord();
  }, false);
}

function fillInfoPanel(record) {
  if (record.data.title) {
    titleContainer.innerHTML = record.data.title;
  }

  if (record.data.artist) {
    artistContainer.innerHTML = record.data.artist;
  }

  if (record.data.cover) {
    coverContainer.style.backgroundImage = 'url(' + record.data.cover + ')';
  }
}

cratedigger.init({
  debug: false,
  elements: {
    rootContainer: document.getElementById('cratedigger'),
    canvasContainer: document.getElementById('cratedigger-canvas'),
    loadingContainer: document.getElementById('cratedigger-loading'),
    infoContainer: document.getElementById('cratedigger-info'),
  },
  onInfoPanelOpened() {
    bottomBar.classList.add('closed');
    fillInfoPanel(cratedigger.getSelectedRecord());
  },

  onInfoPanelClosed() {
    bottomBar.classList.remove('closed');
  },
});

cratedigger.loadRecords(data, true, () => {
  bindEvents();
});
