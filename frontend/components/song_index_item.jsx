var React = require('react');
var PlayerActions = require('../actions/player_actions.js');
var Image = require('react-bootstrap').Image;

var SongIndexItem = React.createClass({
  playSong: function(e) {
    e.preventDefault();
    PlayerActions.playSong(this.props.song);
  },

  render: function() {
    return (
      <Image
        className="songIndexItem"
        src={this.props.song.image_url}
        onClick={this.playSong}
        responsive
      />
    );
  }

});

module.exports = SongIndexItem;

// <li className="songIndexItem" onClick={this.playSong}>
//   {this.props.song.artist} - {this.props.song.title}
// </li>
