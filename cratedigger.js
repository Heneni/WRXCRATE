(function() {
  var cratedigger = {
    init: function(options) {
      this.elements = options.elements || {};
      this.onInfoPanelOpened = options.onInfoPanelOpened || function() {};
      this.onInfoPanelClosed = options.onInfoPanelClosed || function() {};
      this.records = [];
    },
    loadRecords: function(data, flag, callback) {
      this.records = data;
      if (typeof callback === 'function') callback();
    },
    selectPrevRecord: function() {},
    selectNextRecord: function() {},
    getSelectedRecord: function() {
      if (this.records.length > 0) {
        return { data: this.records[0] };
      }
      return null;
    },
    flipSelectedRecord: function() {},
    elements: {},
    onInfoPanelOpened: function() {},
    onInfoPanelClosed: function() {},
    records: []
  };

  window.cratedigger = cratedigger;
})();
