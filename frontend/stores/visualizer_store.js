var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var VisualizerConstants = require('../constants/visualizer_constants.js');

var VisualizerStore = new Store(AppDispatcher);

var _songUrl;

VisualizerStore.songUrl = function() {
  return _songUrl;
};

VisualizerStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case VisualizerConstants.AUDIO_RENDERED:
      _songUrl = payload.songUrl;
      this.__emitChange();
      break;
  }
};

module.exports = VisualizerStore;
