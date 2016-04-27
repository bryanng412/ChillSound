var AppDispatcher = require('../dispatcher/dispatcher');
var SongConstants = require('../constants/song_constants.js');

var SongActions = {
  receiveAllSongs: function(songs) {
    AppDispatcher.dispatch({
      actionType: SongConstants.SONGS_RECEIVED,
      songs: songs
    });
  }
};

module.exports = SongActions;
