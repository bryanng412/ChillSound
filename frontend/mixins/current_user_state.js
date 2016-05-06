var UserStore = require('../stores/user_store.js');
var UserActions = require('../actions/user_actions.js');

var CurrentUserState = {
  getInitialState: function() {
    return { currentUser: UserStore.currentUser() };
  },

  componentDidMount: function() {
    UserStore.addListener(this.updateUser);
    if (!UserStore.currentUser()) {
      UserActions.fetchCurrentUser();
    }
  },

  updateUser: function() {
    if (this.isMounted()) {
      this.setState({ currentUser: UserStore.currentUser() });
    }
  }
};

module.exports = CurrentUserState;
