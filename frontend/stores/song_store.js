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
  function sortByPlays(a, b) { //DESCENDING
    a = parseInt(a["plays"]);
    b = parseInt(b["plays"]);
    if ( a < b ) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  }
  return songs.sort(sortByPlays);
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
    case SongConstants.SINGLE_SONG_RECEIVED:
      addSong(payload.song);
      this.__emitChange();
      break;
  }
};

module.exports = SongStore;
