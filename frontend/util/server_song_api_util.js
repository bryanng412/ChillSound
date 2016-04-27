var SongActions = require('../actions/song_actions.js');
var ErrorActions = require('../actions/error_actions.js');

var ServerSongApiUtil = {
  fetchAllSongs: function() {
    $.ajax({
      method: "GET",
      url: "/api/songs",
      success: function(songs) {
        SongActions.receiveAllSongs(songs);
        ErrorActions.resetErrors();
      },
      error: function(response) {
        ErrorActions.receiveErrors(response.responseJSON.errors);
      }
    });
  }
};

module.exports = ServerSongApiUtil;
