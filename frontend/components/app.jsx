var React = require('react');
var Navbar = require('./navbar.jsx');
var PlaylistBar = require('./playlist_bar.jsx');
var SidebarStore = require('../stores/sidebar_store.js');
var FullScreenStore = require('../stores/fullscreen_store.js');
var Visualizer = require('./visualizer.jsx');

var App = React.createClass({
  getInitialState: function() {
    return { showPlaylistBar: false, showFullScreen: false };
  },

  componentDidMount: function() {
    this.playlistBarListenerToken = SidebarStore.addListener(this.togglePlaylistBar);
    this.fullScreenListenerToken = FullScreenStore.addListener(this.toggleFullScreen);
  },

  componentWillUnmount: function() {
    this.playlistBarlistenerToken.remove();
  },

  togglePlaylistBar: function() {
    this.setState({ showPlaylistBar: SidebarStore.showPlaylistBar() });
  },

  toggleFullScreen: function() {
    this.setState({ showFullScreen: FullScreenStore.showFullScreen() });
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
