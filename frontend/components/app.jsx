var React = require('react');
var Navbar = require('./navbar.jsx');
var Player = require('./player.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div id="app-wrapper">
        <Navbar/>
        {this.props.children}
        <Player/>
      </div>
    );
  }
});

module.exports = App;
