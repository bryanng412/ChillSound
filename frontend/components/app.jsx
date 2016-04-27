var React = require('react');
var Navbar = require('./navbar.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div id="app-wrapper">
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
