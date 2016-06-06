var AppDispatcher = require('../dispatcher/dispatcher');
var SidebarConstants = require('../constants/sidebar_constants.js');

var SidebarActions =  {
  toggleSidebar: function() {
    AppDispatcher.dispatch({
      actionType: SidebarConstants.TOGGLE_SIDEBAR
    });
  }
};

module.exports = SidebarActions;
