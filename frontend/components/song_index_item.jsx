var React = require('react');
var PlayerActions = require('../actions/player_actions.js');
var Glyphicon = require('react-bootstrap').Glyphicon;

var SongIndexItem = React.createClass({
  playSong: function(e) {
    e.preventDefault();
    PlayerActions.playSong(this.props.song);
  },

  render: function() {
    return (
      <figure className="songIndexItem">
        <img src={this.props.song.image_url}/>
        <figcaption>
          <h3>{this.props.song.title}</h3>
          <p>{this.props.song.artist}</p>
          <div className="playIcon">
            <Glyphicon glyph="play-circle" />
          </div>
          <div className="icons">
            <Glyphicon glyph="heart-empty" />
            <Glyphicon glyph="plus" />
          </div>
        </figcaption>
      </figure>
    );
  }

});

module.exports = SongIndexItem;
