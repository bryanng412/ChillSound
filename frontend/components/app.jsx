var React = require('react');
var Navbar = require('./navbar.jsx');
var Player = require('./player.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div id="app-wrapper">
        <Navbar/>
        <video autoPlay loop>
          <source
            src="https://res.cloudinary.com/chillsound/video/upload/v1461805151/Lightmirror_frzgxe.mp4"
            type="video/mp4"/>
        </video>
        {this.props.children}
        <Player/>
      </div>
    );
  }
});

module.exports = App;
