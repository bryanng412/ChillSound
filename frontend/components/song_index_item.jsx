var React = require('react');
var PlayerActions = require('../actions/player_actions.js');

var SongIndexItem = React.createClass({
  playSong: function(e) {
    e.preventDefault();
    PlayerActions.playSong(this.props.song);
  },

  render: function() {
    return (
      <li className="songIndexItem" onClick={this.playSong}>
        {this.props.song.artist} - {this.props.song.title}
      </li>
    );
  }

});

module.exports = SongIndexItem;
