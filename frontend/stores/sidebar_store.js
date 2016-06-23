var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var PlayerActions = require('../actions/player_actions.js');
var SidebarConstants = require('../constants/sidebar_constants.js');

var SidebarStore = new Store(AppDispatcher);

var _showPlaylistBar = false;
var _queue = [];

function addToQueue(song) {
  _queue.push(song);
}

function deleteFromQueue(index) {
  _queue.splice(index, 1);
}

SidebarStore.queue = function() {
  return _queue.slice();
};

SidebarStore.showPlaylistBar = function() {
  return _showPlaylistBar;
};

SidebarStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SidebarConstants.TOGGLE_SIDEBAR:
      _showPlaylistBar ^= true;
      this.__emitChange();
      break;
    case SidebarConstants.QUEUED_SONG_RECEIVED:
      addToQueue(payload.song);
      this.__emitChange();
      break;
    case SidebarConstants.DEQUEUED_SONG_RECEIVED:
      deleteFromQueue(payload.index);
      this.__emitChange();
      break;
    case SidebarConstants.PLAY_NEXT_SONG:
      PlayerActions.playSong(_queue[0]);
      deleteFromQueue(0);
      this.__emitChange();
      break;
  }
};

module.exports = SidebarStore;
