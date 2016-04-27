var React = require('react');
var SongStore = require('../stores/song_store.js');
var ClientActions = require('../actions/client_actions.js');
var SongIndexItem = require('./song_index_item.jsx');

var SongIndex = React.createClass({
  getInitialState: function() {
    return { songs: [] };
  },

  componentDidMount: function() {
    this.songListenerToken = SongStore.addListener(this._onChange);
    ClientActions.fetchAllSongs();
  },

  componentWillUnmount: function() {
    this.songListenerToken.remove();
  },

  _onChange: function() {
    this.setState({ songs: SongStore.all() });
  },

  render: function() {
    var songs = this.state.songs.map(function(song) {
      return <SongIndexItem key={song.id} song={song}/>;
    });

    return (
      <ul className="songIndex">
        {songs}
      </ul>
    );
  }

});

module.exports = SongIndex;
