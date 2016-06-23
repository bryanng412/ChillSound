var AppDispatcher = require('../dispatcher/dispatcher');
var SidebarConstants = require('../constants/sidebar_constants.js');

var SidebarActions =  {
  toggleSidebar: function() {
    AppDispatcher.dispatch({
      actionType: SidebarConstants.TOGGLE_SIDEBAR
    });
  },

  addToQueue: function(song) {
    AppDispatcher.dispatch({
      actionType: SidebarConstants.QUEUED_SONG_RECEIVED,
      song: song
    });
  },

  deleteFromQueue: function(index) {
    AppDispatcher.dispatch({
      actionType: SidebarConstants.DEQUEUED_SONG_RECEIVED,
      index: index
    });
  },

  playNextSong: function() {
    AppDispatcher.dispatch({
      actionType: SidebarConstants.PLAY_NEXT_SONG
    });
  }
};

module.exports = SidebarActions;
