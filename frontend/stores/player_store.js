var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var PlayerConstants = require('../constants/player_constants.js');

var PlayerStore = new Store(AppDispatcher);

var _player = {
  nowPlaying: null,
  queue: [],
};
var _showPlaylistBar = false;
var _showFullScreen = false;

function setNowPlaying(song) {
  _player.nowPlaying = song;
}

function addToQueue(song) {
  _player.queue.push(song);
}

function deleteFromQueue(index) {
  _player.queue.splice(index, 1);
}

PlayerStore.nowPlaying = function() {
  return _player.nowPlaying;
};

PlayerStore.queue = function() {
  return _player.queue.slice();
};

PlayerStore.showPlaylistBar = function() {
  return _showPlaylistBar;
};

PlayerStore.showFullScreen = function() {
  return _showFullScreen;
};


PlayerStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PlayerConstants.AUDIO_URL_RECEIVED:
      setNowPlaying(payload.song);
      this.__emitChange();
      break;
    case PlayerConstants.QUEUED_SONG_RECEIVED:
      addToQueue(payload.song);
      this.__emitChange();
      break;
    case PlayerConstants.DEQUEUED_SONG_RECEIVED:
      deleteFromQueue(payload.index);
      this.__emitChange();
      break;
    case PlayerConstants.PLAY_NEXT_SONG:
      setNowPlaying(_player.queue[0]);
      deleteFromQueue(0);
      this.__emitChange();
      break;
    case PlayerConstants.TOGGLE_SIDEBAR:
      _showPlaylistBar ^= true;
      this.__emitChange();
      break;
    case PlayerConstants.TOGGLE_FULLSCREEN:
      _showFullScreen ^= true;
      this.__emitChange();
      break;
  }
};

module.exports = PlayerStore;
