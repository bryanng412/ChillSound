var React = require('react');
var ReactDOM = require('react-dom');
var UserStore = require('../stores/user_store.js');
var FullScreenStore = require('../stores/fullscreen_store.js');
var ClientActions = require('../actions/client_actions.js');
var FullScreenActions = require('../actions/fullscreen_actions.js');
var BrowserHistory = require('react-router').browserHistory;
var CurrentUserState = require('../mixins/current_user_state.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var LoginModal = require('./login_modal.jsx');
var SignUpModal = require('./signup_modal.jsx');
var UploadModal = require('./upload_modal.jsx');
var Player = require('./player.jsx');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  mixins: [LinkedStateMixin, CurrentUserState],

  componentDidUpdate: function() {
    $(".playlistBar").css("top", $(".navbar").height());
  },

  handleSelect: function(eventKey) {
    switch (eventKey) {
      case 1:
        BrowserHistory.push("profile");
        if (FullScreenStore.showFullScreen()) {
          FullScreenActions.toggleFullScreen();
        }
        break;
      case 2:
        BrowserHistory.push("/");
        ClientActions.logout();
        break;
    }
  },

  splashPage: function(e) {
    e.preventDefault();
    if (FullScreenStore.showFullScreen()) {
      FullScreenActions.toggleFullScreen();
    }
    BrowserHistory.push("/");
  },

  render: function() {
    var navBarItems = this.state.currentUser ?
      (<Nav key="loggedIn" bsStyle="pills" onSelect={this.handleSelect} pullRight>
        <Navbar.Text>Hi {this.state.currentUser.username}</Navbar.Text>
        <UploadModal/>
        <NavItem className="navItem" eventKey={1}>Profile</NavItem>
        <NavItem className="navItem" eventKey={2}>Sign Out</NavItem>
      </Nav>)
      :
      (<Nav key="loggedOut" bsStyle="pills" pullRight>
        <LoginModal/>
        <SignUpModal/>
      </Nav>);

    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <div className="logo" onClick={this.splashPage}>
            <img src="/assets/Chill-logo-white.png"/>
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
