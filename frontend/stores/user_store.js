var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/auth_constants.js');

var UserStore = new Store(AppDispatcher);

var _currentUser = null;

function setCurrentUser(user) {
  _currentUser = user;
}

function resetCurrentUser() {
  _currentUser = null;
}

UserStore.currentUser = function() {
  return _currentUser;
};

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case AuthConstants.LOGIN:
      setCurrentUser(payload.user);
      UserStore.__emitChange();
      break;
    case AuthConstants.LOGOUT:
      resetCurrentUser();
      UserStore.__emitChange();
      break;
    case AuthConstants.REQURE_LOGIN:
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
