var React = require('react');
var PlayerStore = require('../stores/player_store.js');
var Glyphicon = require('react-bootstrap').Glyphicon;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Image = require('react-bootstrap').Image;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Player = React.createClass({
  getInitialState: function() {
    return {
      currentSong: null,
      isPlaying: false,
      currentTime: 0,
      percentPlayed: 0
    };
  },

  componentDidMount: function() {
    this.playerListenerToken = PlayerStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.playerListenerToken.remove();
  },

  _onChange: function() {
    if (PlayerStore.nowPlaying()){
      this.setState({
        currentSong: PlayerStore.nowPlaying(),
        isPlaying: true
      });
    }
  },

  _onTimeUpdate: function(e) {
    e.preventDefault();
    var player = document.getElementById('player');

    var date = new Date(null);
    var timeInSeconds = Math.round(player.currentTime);
    date.setSeconds(timeInSeconds);
    var utc = date.toUTCString();
    var time = utc.substr(utc.indexOf(":"), 8);
    var parsedTime = date.toISOString().substr(14, 5);

    if (player.currentTime > 0) {
      this.setState({
        currentTime: parsedTime,
        percentPlayed: (player.currentTime / player.duration * 100)
      });
    }
  },

  _onSongEnd: function() {
    this.setState({ currentSong: null, isPlaying: false });
  },

  backward: function(e) {
    e.preventDefault();
    var player = document.getElementById('player');
    player.pause();
    player.currentTime = 0;
    player.play();
  },

  pause: function(e) {
    e.preventDefault();
    document.getElementById('player').pause();
    this.setState({
      currentSong: this.state.currentSong,
      isPlaying: false
    });
  },

  play: function(e) {
    e.preventDefault();
    var song = document.getElementById('player').play();
    this.setState({
      currentSong: this.state.currentSong,
      isPlaying: true
    });
  },

  render: function() {
    var song, playPauseButton, player;
    if (this.state.currentSong) {
      song = (<audio
                id="player"
                onTimeUpdate={this._onTimeUpdate}
                onEnded={this._onSongEnd}
                src={this.state.currentSong.audio_url}
                autoPlay
              />);
    } else {
      song = <div/>;
    }

    if (this.state.isPlaying) {
      playPauseButton = (<NavItem onClick={this.pause}>
                          <Glyphicon glyph="pause"/>
                        </NavItem>);
    } else {
      if (this.state.currentSong) {
        playPauseButton = (<NavItem onClick={this.play}>
                            <Glyphicon glyph="play"/>
                          </NavItem>);
      }
    }

    if (this.state.currentSong) {
      player = (
        <ReactCSSTransitionGroup
          transitionName="translate"
          transitionEnterTimeout={500}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
        >
          <Nav key="musicPlayer" className="musicPlayer">
            {song}
            <NavItem onClick={this.backward}><Glyphicon glyph="backward"/></NavItem>
            {playPauseButton}
            <NavItem><Glyphicon glyph="forward"/></NavItem>
            <NavItem><Glyphicon glyph="list"/></NavItem>
            <Image
              className="playerIcon"
              src={this.state.currentSong.image_url}
              />
            <NavItem disabled>
              <p className="songTime">{this.state.currentTime}</p>
            </NavItem>
            <input
              className="progressBar"
              type="range"
              value={this.state.percentPlayed}
              min="0"
              max="100"
              step="1"
            />
          </Nav>
        </ReactCSSTransitionGroup>
      );
    } else {
      player = <div/>;
    }

    return player;
  }
});

module.exports = Player;
