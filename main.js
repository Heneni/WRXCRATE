// --- Begin CSV Loader and Data Initialization ---
async function loadCsvFromGithub(url) {
  const response = await fetch(url);
  const text = await response.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map(line => {
    const values = line.split(",");
    const record = {};
    headers.forEach((header, i) => {
      record[header.trim()] = values[i] ? values[i].trim() : "";
    });
    // Convert hasSleeve string to boolean
    if (record.hasSleeve) {
      record.hasSleeve = record.hasSleeve.toLowerCase() === 'true';
    }
    // Ensure HTTPS for cover images
    if (record.cover) {
      record.cover = record.cover.replace('http://','https://');
    }
    return record;
  });
}

const csvUrl = "data/records.csv";

let r;
let i;

// Wait for DOM and CSV to load before initializing the app
window.addEventListener('DOMContentLoaded', () => {
  loadCsvFromGithub(csvUrl).then(records => {
    r = records;
    initApp();
  }).catch(err => console.error("Failed to load CSV:", err));
});

function initApp() {
  // Get cratedigger from the bundle
  i = window.cratedigger;
  
  // Get DOM elements
  var s = document.getElementById("bottom-bar");
  var c = document.getElementById("button-prev");
  var l = document.getElementById("button-show");
  var d = document.getElementById("button-next");
  var f = document.getElementById("cratedigger-record-title");
  var u = document.getElementById("cratedigger-record-artist");
  var m = document.getElementById("cratedigger-record-cover");

  // Initialize cratedigger
  i.init({
    debug: true,
    elements: {
      rootContainer: document.getElementById("cratedigger"),
      canvasContainer: document.getElementById("cratedigger-canvas"),
      loadingContainer: document.getElementById("cratedigger-loading"),
      infoContainer: document.getElementById("cratedigger-info")
    },
    onInfoPanelOpened: function() {
      s.classList.add("closed");
      fillInfoPanel(i.getSelectedRecord());
    },
    onInfoPanelClosed: function() {
      s.classList.remove("closed");
    }
  });

  // Load records from CSV data
  i.loadRecords(r, true, function() {
    bindEvents();
  });

  // Bind UI events
  function bindEvents() {
    c.addEventListener("click", function(e) {
      i.selectPrevRecord();
      return false;
    }, false);
    
    l.addEventListener("click", function(e) {
      if (i.getSelectedRecord()) {
        i.flipSelectedRecord();
      } else {
        i.selectNextRecord();
      }
      return false;
    }, false);
    
    d.addEventListener("click", function(e) {
      i.selectNextRecord();
      return false;
    }, false);
  }

  // Fill info panel with record data
  function fillInfoPanel(e) {
    if (e.data.title) {
      f.innerHTML = e.data.title;
    }
    if (e.data.artist) {
      u.innerHTML = e.data.artist;
    }
    if (e.data.cover) {
      m.style.backgroundImage = "url(" + e.data.cover + ")";
    }
  }
}
