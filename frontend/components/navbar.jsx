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
    this.setState({ currentUser: UserStore.currentUser() });
  },

  componentWillUnmount: function() {
    this.sessionListenerToken.remove();
  },

  _onSessionChange: function() {
    this.setState({ currentUser: UserStore.currentUser() });
  },

  login: function(e) {
    e.preventDefault();
    HashHistory.push("login/");
  },

  logout: function(e) {
    e.preventDefault();
    ClientActions.logout();
    HashHistory.push("/");
  },

  signUp: function(e) {
    e.preventDefault();
    HashHistory.push("signup/");
  },

  splashPage: function(e) {
    e.preventDefault();
    HashHistory.push("/");
  },


  render: function() {
    var navBarItems = this.state.currentUser ?
      (<ul className="navbarList">
        <li className="navbarListItem">Profile</li>
        <li className="navbarListItem" onClick={this.logout}>Sign Out</li>
      </ul>)
      :
      (<ul className="navbarList">
        <li className="navbarListItem" onClick={this.login}>Login</li>
        <li className="navbarListItem" onClick={this.signUp}>Sign Up</li>
      </ul>);

    return (
      <nav className="navbar">
        <div className="logo" onClick={this.splashPage}>
          <img src="http://res.cloudinary.com/chillsound/image/upload/v1461803060/Chill-logo_izvdav.png"/>
        </div>
        <div className="navBarItems">
          {navBarItems}
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
