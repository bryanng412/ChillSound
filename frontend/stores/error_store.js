var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var ErrorConstants = require('../constants/error_constants.js');

var _errors = [];

var ErrorStore = new Store(AppDispatcher);

function setErrors(errors) {
  _errors = errors;
}

function resetErrors() {
  _errors = [];
}

ErrorStore.all = function() {
  return _errors.slice();
};

ErrorStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ErrorConstants.SHOW_ERRORS:
      setErrors(payload.errors);
      this.__emitChange();
      break;
    case ErrorConstants.RESET_ERRORS:
      resetErrors();
      this.__emitChange();
      break;
  }
};

module.exports = ErrorStore;
