var AppDispatcher = require('../dispatcher/dispatcher');
var FullScreenConstants = require('../constants/fullscreen_constants.js');

var FullScreenActions = {
  toggleFullScreen: function() {
    AppDispatcher.dispatch({
      actionType: FullScreenConstants.TOGGLE_FULLSCREEN
    });
  }
};

module.exports = FullScreenActions;
