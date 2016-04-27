var AppDispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/auth_constants.js');

var AuthActions = {
  receiveUser: function(user) {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN,
      user: user
    });
  }
};

module.exports = AuthActions;
