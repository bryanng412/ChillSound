var AuthActions = require('../actions/auth_actions.js');
var ErrorActions = require('../actions/error_actions.js');

var ServerAuthApiUtil = {
  login: function(loginParams) {
    $.ajax({
      method: "POST",
      url: "/api/session",
      data: { user:
              {
                username: loginParams.username,
                password: loginParams.password
              }
            },
      success: function(user) {
        AuthActions.receiveUser(user);
        ErrorActions.resetErrors();
      },
      error: function(response) {
        ErrorActions.receiveErrors(response.responseJSON.errors);
      }
    });
  },

  logout: function() {
    $.ajax({
      method: "DELETE",
      url: "/api/session",
      success: function() {
        AuthActions.deleteSession();
        ErrorActions.resetErrors();
      },
      error: function(response) {
        ErrorActions.receiveErrors(response.responseJSON.errors);
      }
    });
  },

  fetchCurrentUser: function() {
    $.ajax({
      method: "GET",
      url: "/api/session",
      success: function(user) {
        if (user["id"]) {
          AuthActions.receiveUser(user);
        }
        ErrorActions.resetErrors();
      },
      error: function(response) {
        ErrorActions.receiveErrors(response.responseJSON.errors);
      }
    });
  },

  signUp: function(signUpParams) {
    $.ajax({
      method: "POST",
      url: "/api/user",
      data: { user:
              {
                username: signUpParams.username,
                password: signUpParams.password
              }
            },
      success: function(user) {
        AuthActions.receiveUser(user);
        ErrorActions.resetErrors();
      },
      error: function(response) {
        ErrorActions.receiveErrors(response.responseJSON.errors);
      }
    });
  }
};

module.exports = ServerAuthApiUtil;
