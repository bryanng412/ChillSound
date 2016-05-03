var AppDispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/auth_constants.js');

var AuthActions = {
  receiveUser: function(user) {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN,
      user: user
    });
  },

  deleteSession: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT
    });
  },

  requireLogin: function() {
    AppDispatcher.dispatch({
      actionType: AuthConstants.REQURE_LOGIN
    });
  }
};

module.exports = AuthActions;
