var React = require('react');
var ReactDOM = require('react-dom');
var UserStore = require('../stores/user_store.js');
var ClientActions = require('../actions/client_actions.js');
var HashHistory = require('react-router').hashHistory;
var CurrentUserState = require('../mixins/current_user_state.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var LoginModal = require('./login_modal.jsx');
var SignUpModal = require('./signup_modal.jsx');
var Player = require('./player.jsx');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  mixins: [LinkedStateMixin, CurrentUserState],

  handleSelect: function(eventKey) {
    switch (eventKey) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        ClientActions.logout();
        break;
    }
  },

  splashPage: function(e) {
    e.preventDefault();
    HashHistory.push("/");
  },

  render: function() {
    var navBarItems = this.state.currentUser ?
      (<Nav key="loggedIn" bsStyle="pills" onSelect={this.handleSelect} pullRight>
        <Navbar.Text>Hi {this.state.currentUser.username}</Navbar.Text>
        <NavItem className="navItem" eventKey={1}>Upload</NavItem>
        <NavItem className="navItem" eventKey={2}>Profile</NavItem>
        <NavItem className="navItem" eventKey={3}>Sign Out</NavItem>
      </Nav>)
      :
      (<Nav key="loggedOut" bsStyle="pills" pullRight>
        <LoginModal/>
        <SignUpModal/>
      </Nav>);

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <div className="logo" onClick={this.splashPage}>
            <img src="https://res.cloudinary.com/chillsound/image/upload/v1461803060/Chill-logo_izvdav.png"/>
          </div>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Player/>
          <ReactCSSTransitionGroup
            transitionName="translate"
            transitionLeaveTimeout={500}
            transitionEnterTimeout={500}
            transitionEnter={true}
            transitionAppear={false}
            transitionLeave={false}
          >
            {navBarItems}
          </ReactCSSTransitionGroup>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});
