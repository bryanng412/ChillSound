var React = require('react');
var Navbar = require('./navbar.jsx');
var PlaylistBar = require('./playlist_bar.jsx');
var PlayerStore = require('../stores/player_store.js');
// var Visualizer = require('./visualizer.jsx');

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
    var playlistBar;
    if (this.state.showPlaylistBar) {
      playlistBar = <PlaylistBar show={this.state.showPlaylistBar}/>;
    } else {
      playlistBar = <div/>;
    }

    var children = this.state.showFullScreen ? <div/> : this.props.children;

    // <Visualizer/>
    return (
      <div id="app-wrapper">
        <Navbar/>
        {playlistBar}
        <video
          autoPlay
          loop
          src="/assets/Lightmirror.mp4"
          type="video/mp4"
        >
        </video>
        {children}
      </div>
    );
  }
});

module.exports = App;
