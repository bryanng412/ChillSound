var React = require('react');
var SongStore = require('../stores/song_store.js');
var ClientActions = require('../actions/client_actions.js');
var SongIndexItem = require('./song_index_item.jsx');
var CurrentUserState = require('../mixins/current_user_state.js');

var SongIndex = React.createClass({
  mixins: [CurrentUserState],

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
    var songLikes = [];
    var songLikeIds = [];
    var songLikeIndex;
    var liked;
    var likeId;
    var self = this;

    if (this.state.currentUser) {
      songLikes = this.state.currentUser.likes.map(function(like) {
        return like.song_id;
      });
      songLikeIds = this.state.currentUser.likes.map(function(like) {
        return like.id;
      });
    }

    var songs = this.state.songs.map(function(song) {
      songLikeIndex = songLikes.indexOf(song.id);
      liked = false;
      likeId = -1;
      if (songLikeIndex > -1) {
        liked = true;
        likeId = songLikeIds[songLikeIndex];
      }
      return <SongIndexItem
                key={song.id}
                currentUser={self.state.currentUser}
                song={song}
                liked={liked}
                likeId={likeId}
              />;
    });

    return (
      <ul className="songIndex">
        {songs}
      </ul>
    );
  }
});

module.exports = SongIndex;
