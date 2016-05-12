var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var Button = require('react-bootstrap').Button;
var SongStore = require('../stores/song_store.js');
var PlayerActions = require('../actions/player_actions.js');

var Banner = React.createClass({

  handleClick: function(e) {
    e.preventDefault();
    PlayerActions.playSong(SongStore.all()[0]);
    PlayerActions.toggleFullScreen();
  },

  render: function() {
    return (
      <Jumbotron>
        <h1>Chill Music For Cool People</h1>
        <h3>Close your eyes and relax</h3>
        <h3>Take a deep breath</h3>
        <div className="bannerButton" onClick={this.handleClick}>
          <p>Free yourself</p>
          <svg width="175" height="65" viewBox="0 0 175 65" xmlns="http://www.w3.org/2000/svg">
            <rect x='0' y='0' fill='none' width='175' height='65'/>
          </svg>
        </div>
      </Jumbotron>
    );
  }

});

module.exports = Banner;
