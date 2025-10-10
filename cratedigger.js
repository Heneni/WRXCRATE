// Wrap everything in an IIFE and assign the actual API to window.cratedigger
(function() {
  var cratedigger = {
    init: function(options) {
      // Your actual init logic here
      // For demo purposes:
      if (options && options.elements) {
        // Example: Set up containers
        this.elements = options.elements;
        if (options.onInfoPanelOpened) this.onInfoPanelOpened = options.onInfoPanelOpened;
        if (options.onInfoPanelClosed) this.onInfoPanelClosed = options.onInfoPanelClosed;
      }
    },
    loadRecords: function(data, flag, callback) {
      // Your loadRecords logic here
      // For demo purposes:
      this.records = data;
      if (callback) callback();
    },
    selectPrevRecord: function() {
      // Navigation logic here
    },
    selectNextRecord: function() {
      // Navigation logic here
    },
    getSelectedRecord: function() {
      // Return the currently selected record
      return this.records && this.records[0] ? { data: this.records[0] } : null;
    },
    flipSelectedRecord: function() {
      // Flip logic here
    },
    elements: {},
    onInfoPanelOpened: function() {},
    onInfoPanelClosed: function() {},
    records: []
  };

  window.cratedigger = cratedigger;
})();
