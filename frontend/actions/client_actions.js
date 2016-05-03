var ServerAuthApiUtil = require('../util/server_auth_api_util.js');
var ServerSongApiUtil = require('../util/server_song_api_util.js');
var ServerUserApiUtil = require('../util/server_user_api_util.js');

var ClientActions = {
  login: function(loginParams) {
    ServerAuthApiUtil.login(loginParams);
  },

  logout: function() {
    ServerAuthApiUtil.logout();
  },

  signUp: function(signUpParams) {
    ServerAuthApiUtil.signUp(signUpParams);
  },

  fetchCurrentUser: function() {
    ServerAuthApiUtil.fetchCurrentUser();
  },

  fetchAllSongs: function() {
    ServerSongApiUtil.fetchAllSongs();
  },

  like: function(userId, songId) {
    ServerUserApiUtil.like(userId, songId);
    this.fetchCurrentUser();
  },

  unlike: function(likeId) {
    ServerUserApiUtil.unlike(likeId);
    this.fetchCurrentUser();
  },

  uploadSong: function(songParams) {
    ServerSongApiUtil.uploadSong(songParams);
    this.fetchAllSongs();
  }
};

module.exports = ClientActions;
