var AppDispatcher = require('../dispatcher/dispatcher');
var VisualizerConstants = require('../constants/visualizer_constants.js');

var VisualizerActions = {
  audioRendered: function(songUrl) {
    AppDispatcher.dispatch({
      songUrl: songUrl,
      actionType: VisualizerConstants.AUDIO_RENDERED
    });
  }

};

module.exports = VisualizerActions;
