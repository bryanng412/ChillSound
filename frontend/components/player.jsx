var React = require('react');
var PlayerStore = require('../stores/player_store.js');

var Player = React.createClass({
  getInitialState: function() {
    return { currentSong: null, isPlaying: false };
  },

  componentDidMount: function() {
    this.playerListenerToken = PlayerStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.playerListenerToken.remove();
  },

  componentDidUpdate: function() {
    var song = document.getElementsByTagName('audio')[0];
    if (song.volume) {
      song.volume = 0.55;
    }
  },

  _onChange: function() {
    if (PlayerStore.nowPlaying()){
      this.setState({
        currentSong: PlayerStore.nowPlaying(),
        isPlaying: true
      });
    }
  },

  _onSongEnd: function() {
    this.setState({ currentSong: null, isPlaying: false });
  },

  pause: function(e) {
    e.preventDefault();
    document.getElementsByTagName('audio')[0].pause();
    this.setState({
      currentSong: this.state.currentSong,
      isPlaying: false
    });
  },

  play: function(e) {
    e.preventDefault();
    var song = document.getElementsByTagName('audio')[0].play();
    this.setState({
      currentSong: this.state.currentSong,
      isPlaying: true
    });
  },

  render: function() {
    var song, playPauseButton, player;
    if (this.state.currentSong) {
      song = (<audio
                onEnded={this._onSongEnd}
                src={this.state.currentSong.audio_url}
                autoPlay
              />);
    } else {
      song = <div/>;
    }

    if (this.state.isPlaying) {
      playPauseButton = <button onClick={this.pause}>▌▌</button>;
    } else {
      if (this.state.currentSong) {
        playPauseButton = <button onClick={this.play}>▶</button>;
      }
    }

    if (this.state.currentSong) {
      player = (
        <div className="musicPlayer">
          {song}
          {playPauseButton}
        </div>
      );
    } else {
      player = <div/>;
    }

    return player;
  }
});

module.exports = Player;
