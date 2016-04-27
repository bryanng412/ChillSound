var UserStore = require('../stores/user_store.js');
var ClientActions = require('../actions/client_actions.js');

var CurrentUserState = {
  getInitialState: function() {
    return { currentUser: UserStore.currentUser() };
  },

  componentDidMount: function() {
    UserStore.addListener(this.updateUser);
    if (!UserStore.currentUser()) {
      ClientActions.fetchCurrentUser();
    }
  },

  updateUser: function() {
    this.setState({ currentUser: UserStore.currentUser() });
  }
};

module.exports = CurrentUserState;
