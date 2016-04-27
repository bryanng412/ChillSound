var AppDispatcher = require('../dispatcher/dispatcher');
var ErrorConstants = require('../constants/error_constants.js');

var ErrorActions = {
  receiveErrors: function(errors) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SHOW_ERRORS,
      errors: errors
    });
  },

  resetErrors: function() {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.RESET_ERRORS
    });
  }
};

module.exports = ErrorActions;
