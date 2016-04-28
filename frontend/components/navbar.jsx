var React = require('react');
var UserStore = require('../stores/user_store.js');
var ClientActions = require('../actions/client_actions.js');
var HashHistory = require('react-router').hashHistory;
var CurrentUserState = require('../mixins/current_user_state.js');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

module.exports = React.createClass({
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
      (<Nav bsStyle="pills" pullRight>
        <NavItem className="navItem" eventKey={1}>Hi {this.state.currentUser.username}</NavItem>
        <NavItem className="navItem" eventKey={2}>Upload</NavItem>
        <NavItem className="navItem" eventKey={3}>Profile</NavItem>
        <NavItem className="navItem" eventKey={4}>Sign Out</NavItem>
      </Nav>)
      :
      (<Nav bsStyle="pills" pullRight>
        <NavItem className="navItem" eventKey={5}>Login</NavItem>
        <NavItem className="navItem" eventKey={6}>Sign Up</NavItem>
      </Nav>);

    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <div className="logo" onClick={this.splashPage}>
            <img src="https://res.cloudinary.com/chillsound/image/upload/v1461816117/Chill-logo_freakm.png"/>
          </div>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {navBarItems}
        </Navbar.Collapse>
      </Navbar>
    );
  }
});


// <nav className="navbar">
//   <div className="logo" onClick={this.splashPage}>
//     <img src="https://res.cloudinary.com/chillsound/image/upload/v1461816117/Chill-logo_freakm.png"/>
//   </div>
//   <div className="navBarItems">
//     {navBarItems}
//   </div>
// </nav>
