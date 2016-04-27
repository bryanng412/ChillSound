var ServerAuthApiUtil = require('../util/server_auth_api_util.js');

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
  }
};

module.exports = ClientActions;
