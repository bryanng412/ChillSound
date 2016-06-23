var React = require('react');
var PlayerStore = require('../stores/player_store.js');
var SidebarStore = require('../stores/sidebar_store.js');
var PlayerActions  = require('../actions/player_actions.js');
var SidebarActions = require('../actions/sidebar_actions.js');
var FullScreenActions = require('../actions/fullscreen_actions.js');
var VisualizerActions = require('../actions/visualizer_actions.js');
var Glyphicon = require('react-bootstrap').Glyphicon;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Image = require('react-bootstrap').Image;
var Badge = require('react-bootstrap').Badge;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Player = React.createClass({
  getInitialState: function() {
    return {
      currentSong: null,
      isPlaying: true,
      currentTime: 0,
      percentPlayed: 0,
      muted: false
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
    var parsedTime = date.toISOString().substr(14, 5);

    if (player.currentTime > 0) {
      this.setState({
        currentTime: parsedTime,
        percentPlayed: (player.currentTime / player.duration * 100)
      });
    }
  },

  _onSongEnd: function() {
    if (SidebarStore.queue().length !== 0) {
      SidebarActions.playNextSong();
      this.backward();
    }
  },

  _onAudioRender: function(){
    VisualizerActions.audioRendered(this.state.currentSong.audioUrl);
  },

  backward: function(e) {
    if (e) {
      e.preventDefault();
    }
    var player = document.getElementById('player');
    player.pause();
    player.currentTime = 0;
    setTimeout(function() {
      player.play();
    }, 150);
    this.setState({isPlaying: true});
  },

  forward: function(e){
    e.preventDefault();
    this._onSongEnd();
  },

  seek: function(e) {
    e.preventDefault();
    var player = document.getElementById('player');
    var targetTime = (e.target.value / 100) * player.duration;
    player.currentTime = targetTime;
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
    document.getElementById('player').play();
    this.setState({
      currentSong: this.state.currentSong,
      isPlaying: true
    });
  },

  toggleMute: function(e) {
    e.preventDefault();
    document.getElementById('player').muted ^= true;
    this.setState({muted: !this.state.muted});
  },

  toggleSidebar: function(e) {
    e.preventDefault();
    SidebarActions.toggleSidebar();
  },

  showFullScreen: function(e) {
    e.preventDefault();
    FullScreenActions.toggleFullScreen();
  },

  render: function() {
    var song, playPauseButton, player;
    if (this.state.currentSong) {
      song = (<audio
                id="player"
                onLoadedData={this._onAudioRender}
                onTimeUpdate={this._onTimeUpdate}
                onEnded={this._onSongEnd}
                src={this.state.currentSong.audio_url}
                crossOrigin="anonymous"
                autoPlay
              />);
    } else {
      song = <div/>;
    }

    if (this.state.isPlaying) {
      playPauseButton = (<NavItem onClick={this.pause}>
                          <Glyphicon glyph="pause"/>
                        </NavItem>);

      var audioEl = document.getElementById('player');
      if (audioEl && audioEl.paused && this.state.currentSong &&
          audioEl.src === this.state.currentSong.audio_url) {
        setTimeout(function() {
          audioEl.play();
        }, 150);
      }
    } else {
      if (this.state.currentSong) {
        playPauseButton = (<NavItem onClick={this.play}>
                            <Glyphicon glyph="play"/>
                          </NavItem>);
      }
    }

    var volumeIcon;
    if (this.state.muted) {
      volumeIcon = (
        <NavItem onClick={this.toggleMute}><Glyphicon glyph="volume-off"/></NavItem>
      );
    } else {
      volumeIcon = (
        <NavItem onClick={this.toggleMute}><Glyphicon glyph="volume-up"/></NavItem>
      );
    }

    if (this.state.currentSong) {
      player = (
        <ReactCSSTransitionGroup
          transitionName="translate"
          transitionEnterTimeout={500}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionLeave={true}
        >
          <Nav key="musicPlayer" className="musicPlayer">
            {song}
            <NavItem onClick={this.backward}><Glyphicon glyph="backward"/></NavItem>
            {playPauseButton}
            <NavItem onClick={this.forward}><Glyphicon glyph="forward"/></NavItem>
            <NavItem onClick={this.toggleSidebar}><Glyphicon glyph="list"/></NavItem>
            <Badge className="queueBadge">{SidebarStore.queue().length}</Badge>
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
              onChange={this.seek}
              onInput={this.seek}
            />
            {volumeIcon}
            <NavItem onClick={this.showFullScreen}><Glyphicon glyph="equalizer"/></NavItem>
          </Nav>
        </ReactCSSTransitionGroup>
      );
    } else {
      player = <audio
                id="player"
              />;
    }

    return player;
  }
});

module.exports = Player;
