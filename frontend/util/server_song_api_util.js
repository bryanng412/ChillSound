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
  },

  uploadSong: function(songParams) {
    $.ajax({
      method: "POST",
      url: "/api/songs",
      data: { song:
              {
                title: songParams["title"],
                artist: songParams["artist"],
                description: songParams["description"],
                image_url: songParams["image_url"],
                audio_url: songParams["audio_url"],
                user_id: parseInt(songParams["user_id"])
              }
            },
      success: function(song) {
        SongActions.receiveSong(song);
        ErrorActions.resetErrors();
      },
      error: function(response) {
        ErrorActions.receiveErrors(response.responseJSON.errors);
      }
    });
  },

  increasePlayCount: function(song){
    $.ajax({
      method: "PATCH",
      url: "/api/songs/" + song.id,
      data: { song:
              {
                plays: parseInt(song.plays) + 1
              }
            },
      success: function(newSong) {
        SongActions.receiveSong(newSong);
      }
    });
  }
};

module.exports = ServerSongApiUtil;
