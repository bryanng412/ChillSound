var AppDispatcher = require('../dispatcher/dispatcher');
var PlayerConstants = require('../constants/player_constants.js');

var PlayerActions = {
  playSong: function(song) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.AUDIO_URL_RECEIVED,
      song: song
    });
  },

  addToQueue: function(song) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.QUEUED_SONG_RECEIVED,
      song: song
    });
  },

  deleteFromQueue: function(index) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.DEQUEUED_SONG_RECEIVED,
      index: index
    });
  },

  playNextSong: function() {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAY_NEXT_SONG
    });
  },

  toggleSidebar: function() {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.TOGGLE_SIDEBAR
    });
  }

};

module.exports = PlayerActions;
