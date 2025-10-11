/* main.js — application logic for the CrateDigger demo
 *
 * This version avoids using ES module imports because the bundled
 * cratedigger.js library is not an ES module. Instead we rely on
 * the global `window.cratedigger` object exposed by that script. The
 * record data is stored in a plain JavaScript array to avoid JSON
 * parsing issues (such as trailing commas). The UI controls are
 * wired up after the records are loaded to ensure everything is
 * initialized before user interaction begins.
 */

const data = [
  {
    title: "Let it Hiss",
    artist: "The Barr Brothers",
    cover: "https://i.scdn.co/image/ab67616d0000b27392d68ffd58ad8ea4cf9be566",
    year: "acid jazz-jazz funk",
    hasSleeve: true,
  },
  {
    title: "Salesmen & Racists",
    artist: "Ike Reilly",
    cover: "https://i.scdn.co/image/ab67616d0000b273f63ef14157f7e8e0ed5e8113",
    year: "acid jazz-jazz funk",
    hasSleeve: true,
  },
  {
    title: "The Horses and the Hounds",
    artist: "James McMurtry",
    cover: "https://i.scdn.co/image/ab67616d0000b27388ef788544886eb4cb162792",
    year: "acid jazz-jazz funk",
    hasSleeve: true,
  },
  {
    title: "Love This Giant",
    artist: "David Byrne & St. Vincent",
    cover: "https://i.scdn.co/image/ab67616d0000b2731f1bafb7b062972bdd1f6cdc",
    year: "acid jazz-jazz funk",
    hasSleeve: true,
  },
  {
    title: "Our Roots Run Deep",
    artist: "Dominique Fils-Aimé",
    cover: "https://i.scdn.co/image/ab67616d0000b273810ebe4ee7d21b022a35980e",
    year: "acid jazz-jazz funk",
    hasSleeve: true,
  },
  {
    title: "Taffetas",
    artist: "Taffetas",
    cover: "https://i.scdn.co/image/ab67616d0000b273923a878d3e0de9fb10993791",
    year: "acid jazz-jazz funk",
    hasSleeve: true,
  },
];

// Grab DOM elements
const bottomBar       = document.getElementById('bottom-bar');
const buttonPrev      = document.getElementById('button-prev');
const buttonShow      = document.getElementById('button-show');
const buttonNext      = document.getElementById('button-next');
const titleContainer  = document.getElementById('cratedigger-record-title');
const artistContainer = document.getElementById('cratedigger-record-artist');
const coverContainer  = document.getElementById('cratedigger-record-cover');

// Hook up the bottom-bar controls
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

// Update the info panel with details about the currently selected record
function fillInfoPanel(record) {
  const r = record?.data ?? record; // Some builds wrap your data in a .data property
  if (!r) return;
  if (r.title)  titleContainer.innerHTML = r.title;
  if (r.artist) artistContainer.innerHTML = r.artist;
  if (r.cover)  coverContainer.style.backgroundImage = `url(${r.cover})`;
}

// Initialise the CrateDigger engine
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

// Load the records and then wire up the event handlers
window.cratedigger.loadRecords(data, true, () => {
  bindEvents();
});
