var React = require('react');
var Navbar = require('./navbar.jsx');

var App = React.createClass({
  getInitialState: function() {
    return ({
      currentUser: null
    });
  },

  render: function() {
    return (
      <div id="app-wrapper">
        <Navbar currentUser={this.state.currentUser}/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
