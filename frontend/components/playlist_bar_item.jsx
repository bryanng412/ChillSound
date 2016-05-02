var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var PlayerActions = require('../actions/player_actions.js');
var Glyphicon = require('react-bootstrap').Glyphicon;

var PlaylistBarItem = React.createClass({
  deleteFromQueue: function() {
    PlayerActions.deleteFromQueue(this.props.index);
  },

  render: function() {
    return (
      <ReactCSSTransitionGroup
        transitionName="scroll"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
      >
        <figure className="playlistBarItem">
          <img src={this.props.song.image_url}/>
          <Glyphicon onClick={this.deleteFromQueue} glyph="trash"/>
        </figure>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = PlaylistBarItem;
