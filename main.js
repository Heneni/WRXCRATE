const bottomBar = document.getElementById('bottom-bar');
const buttonPrev = document.getElementById('button-prev');
const buttonShow = document.getElementById('button-show');
const buttonNext = document.getElementById('button-next');
const titleContainer = document.getElementById('cratedigger-record-title');
const artistContainer = document.getElementById('cratedigger-record-artist');
const coverContainer = document.getElementById('cratedigger-record-cover');
const loadingContainer = document.getElementById('cratedigger-loading');

// Example album data. Replace with your full album list.
const data = [
  {
    title: "Let it Hiss",
    artist: "The Barr Brothers",
    cover: "https://i.scdn.co/image/ab67616d0000b27392d68ffd58ad8ea4cf9be566",
    year: "2023",
    hasSleeve: true
  }
  // Add more albums as needed
];

function bindEvents() {
  buttonPrev.addEventListener('click', function (e) {
    e.preventDefault();
    window.cratedigger.selectPrevRecord();
  }, false);

  buttonShow.addEventListener('click', function (e) {
    e.preventDefault();
    if (window.cratedigger.getSelectedRecord()) {
      window.cratedigger.flipSelectedRecord();
    } else {
      window.cratedigger.selectNextRecord();
    }
  }, false);

  buttonNext.addEventListener('click', function (e) {
    e.preventDefault();
    window.cratedigger.selectNextRecord();
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

function showLoadingStatus(status) {
  if (loadingContainer) {
    loadingContainer.innerHTML =
      `<div class="info-container">
        <div class="vertical-center">
          <span class="loading-label">${status}</span>
        </div>
      </div>`;
  }
}

showLoadingStatus('Loading records...');

window.cratedigger.init({
  debug: false,
  elements: {
    rootContainer: document.getElementById('cratedigger'),
    canvasContainer: document.getElementById('cratedigger-canvas'),
    loadingContainer: loadingContainer,
    infoContainer: document.getElementById('cratedigger-info'),
  },
  onInfoPanelOpened: function () {
    bottomBar.classList.add('closed');
    fillInfoPanel(window.cratedigger.getSelectedRecord());
  },
  onInfoPanelClosed: function () {
    bottomBar.classList.remove('closed');
  },
});

window.cratedigger.loadRecords(data, true, function () {
  showLoadingStatus('Records loaded: ' + data.length);
  bindEvents();
  console.log('Loaded record count:', data.length);
});
