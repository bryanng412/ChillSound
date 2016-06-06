var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var SidebarConstants = require('../constants/sidebar_constants.js');

var SidebarStore = new Store(AppDispatcher);

var _showPlaylistBar = false;

SidebarStore.showPlaylistBar = function() {
  return _showPlaylistBar;
};


SidebarStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SidebarConstants.TOGGLE_SIDEBAR:
      _showPlaylistBar ^= true;
      this.__emitChange();
      break;
  }
};

module.exports = SidebarStore;
