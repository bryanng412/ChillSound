var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var FullScreenConstants = require('../constants/fullscreen_constants.js');

var FullScreenStore = new Store(AppDispatcher);

var _showFullScreen = false;

FullScreenStore.showFullScreen = function() {
  return _showFullScreen;
};

FullScreenStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case FullScreenConstants.TOGGLE_FULLSCREEN:
      _showFullScreen ^= true;
      this.__emitChange();
      break;
  }
};

module.exports = FullScreenStore;
