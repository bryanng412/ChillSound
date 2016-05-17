var React = require('react');
var Navbar = require('./navbar.jsx');
var PlaylistBar = require('./playlist_bar.jsx');
var PlayerStore = require('../stores/player_store.js');
var Visualizer = require('./visualizer.jsx');

var App = React.createClass({
  getInitialState: function() {
    return { showPlaylistBar: false, showFullScreen: false };
  },

  componentDidMount: function() {
    this.playlistBarListenerToken = PlayerStore.addListener(this.togglePlaylistBar);
    this.fullScreenListenerToken = PlayerStore.addListener(this.toggleFullScreen);
  },

  componentWillUnmount: function() {
    this.playlistBarlistenerToken.remove();
  },

  togglePlaylistBar: function() {
    this.setState({ showPlaylistBar: PlayerStore.showPlaylistBar() });
  },

  toggleFullScreen: function() {
    this.setState({ showFullScreen: PlayerStore.showFullScreen() });
  },

  render: function() {
    var playlistBar = this.state.showPlaylistBar ?
      <PlaylistBar show={this.state.showPlaylistBar}/> : <div/>;

    var bg = this.state.showFullScreen ?
    <div/>
    :
    <video
      loop
      autoPlay
      controls="true"
      src='https://s3-us-west-1.amazonaws.com/chillsound/Lightmirror.mp4'
      type='video/mp4'
      >
    </video>;

    var children = this.state.showFullScreen ? <div/> : this.props.children;

    return (
      <div id="app-wrapper">
        <Navbar/>
        {playlistBar}
        <Visualizer/>
        {bg}
        {children}
      </div>
    );
  }
});

module.exports = App;
