import cratedigger from './scripts/cratedigger';
const data = JSON.parse(`
[{"title":"Let it Hiss","artist":"The Barr Brothers","cover":"https://i.scdn.co/image/ab67616d0000b27392d68ffd58ad8ea4cf9be566","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Salesmen & Racists","artist":"Ike Reilly","cover":"https://i.scdn.co/image/ab67616d0000b273f63ef14157f7e8e0ed5e8113","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"The Horses and the Hounds","artist":"James McMurtry","cover":"https://i.scdn.co/image/ab67616d0000b27388ef788544886eb4cb162792","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Love This Giant","artist":"David Byrne& St. Vincent","cover":"https://i.scdn.co/image/ab67616d0000b2731f1bafb7b062972bdd1f6cdc","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Our Roots Run Deep","artist":"Dominique Fils-Aimé","cover":"https://i.scdn.co/image/ab67616d0000b273810ebe4ee7d21b022a35980e","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Taffetas","artist":"Taffetas","cover":"https://i.scdn.co/image/ab67616d0000b273923a878d3e0de9fb10993791","year":"acid jazz-jazz funk","hasSleeve":true},]`);

const bottomBar = document.getElementById('bottom-bar');
const buttonPrev = document.getElementById('button-prev');
const buttonShow = document.getElementById('button-show');
const buttonNext = document.getElementById('button-next');
const titleContainer = document.getElementById('cratedigger-record-title');
const artistContainer = document.getElementById('cratedigger-record-artist');
const coverContainer = document.getElementById('cratedigger-record-cover');

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
