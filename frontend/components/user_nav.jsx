var React = require('react');
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var UserNav = React.createClass({

  render: function() {
    return (
      <Nav bsStyle="tabs" activeKey={1}>
        <NavItem eventKey={1}>Likes</NavItem>
        <NavItem eventKey={2}>Uploaded Songs</NavItem>
      </Nav>
    );
  }

});

module.exports = UserNav;
