var AppDispatcher = require('../dispatcher/dispatcher');
var PlayerConstants = require('../constants/player_constants.js');

var PlayerActions = {
  playSong: function(song) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.AUDIO_URL_RECEIVED,
      song: song
    });
  },

  toggleSidebar: function() {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.TOGGLE_SIDEBAR
    });
  }

};

module.exports = PlayerActions;
