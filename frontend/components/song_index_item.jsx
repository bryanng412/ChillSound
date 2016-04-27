var React = require('react');
var PlayerActions = require('../actions/player_actions.js');

var SongIndexItem = React.createClass({
  playSong: function(e) {
    e.preventDefault();
    PlayerActions.playSong(this.props.song);
  },

  render: function() {
    return (
      <li>
        <button onClick={this.playSong}>
          Play {this.props.song.title}
        </button>
      </li>
    );
  }

});

module.exports = SongIndexItem;
