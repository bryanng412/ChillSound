var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var PlayerConstants = require('../constants/player_constants.js');

var PlayerStore = new Store(AppDispatcher);

var _player = {
  nowPlaying: null
};

function setNowPlaying(song) {
  _player.nowPlaying = song;
}

PlayerStore.nowPlaying = function() {
  return _player.nowPlaying;
};

PlayerStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PlayerConstants.AUDIO_URL_RECEIVED:
      setNowPlaying(payload.song);
      this.__emitChange();
      break;
  }
};

module.exports = PlayerStore;
