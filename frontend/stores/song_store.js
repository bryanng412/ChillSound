var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var SongConstants = require('../constants/song_constants.js');

var SongStore = new Store(AppDispatcher);

var _songs = {};

function resetSongs(songs) {
  _songs = {};
  songs.forEach(function(song) {
    _songs[song.id] = song;
  });
}

function addSong(song) {
  _songs[song.id] = song;
}

SongStore.all = function() {
  var songs = [];
  Object.keys(_songs).forEach(function(id){
    songs.push(_songs[id]);
  });
  return songs;
};

SongStore.find = function(id) {
  return _songs[id];
};

SongStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SongConstants.SONGS_RECEIVED:
      resetSongs(payload.songs);
      this.__emitChange();
      break;
    case SongConstants.SONG_RECEIVED:
      addSong(payload.song);
      this.__emitChange();
      break;
  }
};

module.exports = SongStore;
