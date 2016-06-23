var AppDispatcher = require('../dispatcher/dispatcher');
var PlayerConstants = require('../constants/player_constants.js');

var PlayerActions = {
  playSong: function(song) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.AUDIO_URL_RECEIVED,
      song: song
    });
  }
};

module.exports = PlayerActions;
