var React = require('react');
var UserStore = require('../stores/user_store.js');
var ClientActions = require('../actions/client_actions.js');
var HashHistory = require('react-router').hashHistory;
var CurrentUserState = require('../mixins/current_user_state.js');

var Navbar = React.createClass({
  mixins: [CurrentUserState],

  getInitialState: function() {
    return ({
      currentUser: null
    });
  },

  componentDidMount: function() {
    this.sessionListenerToken = UserStore.addListener(this._onSessionChange);
  },

  componentWillUnmount: function() {
    this.sessionListenerToken.remove();
  },

  _onSessionChange: function() {
    this.setState({ currentUser: UserStore.currentUser() });
  },

  login: function() {
    HashHistory.push("login/");
  },

  signUp: function() {
    HashHistory.push("signup/");
  },

  render: function() {
    var navBarItems = this.state.currentUser ?
      (<ul className="navbarList">
        <li className="navbarListItem">Profile</li>
        <li className="navbarListItem">Sign Out</li>
      </ul>)
      :
      (<ul className="navbarList">
        <li className="navbarListItem" onClick={this.login}>Login</li>
        <li className="navbarListItem" onClick={this.signUp}>Sign Up</li>
      </ul>);

      if (this.state.currentUser) {
        var greeting = <h2>Hi {this.state.currentUser.username}!</h2>;
      }
    return (
      <nav className="navbar">
        {navBarItems}
        {greeting}
      </nav>
    );
  }
});

module.exports = Navbar;
