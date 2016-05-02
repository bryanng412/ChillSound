var React = require('react');
var PlayerStore = require('../stores/player_store.js');
var Navbar = require('./navbar.jsx');
var Player = require('./player.jsx');
var Banner = require('./banner.jsx');
var PlaylistBar = require('./playlist_bar.jsx');

var App = React.createClass({
  getInitialState: function() {
    return { showPlaylistBar: false };
  },

  componentDidMount: function() {
    this.listenerToken = PlayerStore.addListener(this.togglePlaylistBar);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  togglePlaylistBar: function() {
    this.setState({ showPlaylistBar: PlayerStore.showPlaylistBar() });
  },

  render: function() {
    var playlistBar;
    if (this.state.showPlaylistBar) {
      playlistBar = <PlaylistBar show={this.state.showPlaylistBar}/>;
    } else {
      playlistBar = <div/>;
    }

    return (
      <div id="app-wrapper">
        <Navbar/>
        {playlistBar}
        <Banner/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
