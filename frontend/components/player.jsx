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

  _onChange: function() {
    if (PlayerStore.nowPlaying()){
      this.setState({
        currentSong: PlayerStore.nowPlaying(),
        isPlaying: true
      });
    }
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
    document.getElementsByTagName('audio')[0].play();
    this.setState({
      currentSong: this.state.currentSong,
      isPlaying: true
    });
  },

  render: function() {
    var song, playPauseButton;
    if (this.state.currentSong) {
      song = (<audio
                src={this.state.currentSong.audio_url}
                autoPlay
              />);
    } else {
      song = <div/>;
    }

    if (this.state.isPlaying) {
      playPauseButton = <button onClick={this.pause}>PAUSE</button>;
    } else {
      if (this.state.currentSong) {
        playPauseButton = <button onClick={this.play}>PLAY</button>;
      }
    }

    return (
      <div className="musicPlayer">
        {song}
        {playPauseButton}
      </div>
    );
  }

});

module.exports = Player;
