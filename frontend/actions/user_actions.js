var ServerAuthApiUtil = require('../util/server_auth_api_util.js');

var UserActions = {
  fetchCurrentUser: function() {
    ServerAuthApiUtil.fetchCurrentUser();
  }
};

module.exports = UserActions;
