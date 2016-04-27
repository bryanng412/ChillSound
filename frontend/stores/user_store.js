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
  if (_currentUser) {
    return $.extend({}, _currentUser);
  }
};

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case AuthConstants.LOGIN:
      setCurrentUser(payload.user);
      this.__emitChange();
      break;
    case AuthConstants.LOGOUT:
      resetCurrentUser();
      this.__emitChange();
      break;
  }
};

module.exports = UserStore;
