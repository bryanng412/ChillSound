var React = require('react');
var Navbar = require('./navbar.jsx');
var Player = require('./player.jsx');
var Banner = require('./banner.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div id="app-wrapper">
        <Navbar/>
        <Banner/>
        {this.props.children}
        <Player/>
      </div>
    );
  }
});

module.exports = App;
