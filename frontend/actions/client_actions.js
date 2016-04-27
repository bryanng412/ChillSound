var ServerAuthApiUtil = require('../util/server_auth_api_util.js');

var ClientActions = {
  login: function(loginParams) {
    ServerAuthApiUtil.login(loginParams);
  },

  fetchCurrentUser: function() {
    ServerAuthApiUtil.fetchCurrentUser();
  }
};

module.exports = ClientActions;
