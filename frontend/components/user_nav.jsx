var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var CurrentUserState = require('../mixins/current_user_state.js');

var UserNav = React.createClass({
  mixins: [LinkedStateMixin, CurrentUserState],

  getInitialState: function() {
    return { activeKey: 1 };
  },

  handleSelect: function(eventKey){
    event.preventDefault();
    this.setState({activeKey: eventKey});
  },

  render: function() {
    // var songs = this.state.activeKey === 1 ?
    //
    // {songs}
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Likes</NavItem>
          <NavItem eventKey={2}>Uploaded Songs</NavItem>
        </Nav>
      </div>
    );
  }

});

module.exports = UserNav;
