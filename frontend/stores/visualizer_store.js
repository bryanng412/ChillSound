var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var VisualizerConstants = require('../constants/visualizer_constants.js');

var VisualizerStore = new Store(AppDispatcher);


VisualizerStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case VisualizerConstants.AUDIO_RENDERED:
      this.__emitChange();
      break;
  }
};

module.exports = VisualizerStore;
