var ServerAuthApiUtil = require('../util/server_auth_api_util.js');
var ServerSongApiUtil = require('../util/server_song_api_util.js');

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
  }
};

module.exports = ClientActions;
