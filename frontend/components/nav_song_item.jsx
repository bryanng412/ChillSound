var React = require('react');
var ClientActions = require('../actions/client_actions.js');
var PlayerActions = require('../actions/player_actions.js');
var SidebarActions = require('../actions/sidebar_actions.js');
var Glyphicon = require('react-bootstrap').Glyphicon;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var NavSongItem = React.createClass({
  playSong: function(e) {
    e.preventDefault();
    ClientActions.increasePlayCount(this.props.song);
    this.props.song.plays = parseInt(this.props.song.plays) + 1;
    PlayerActions.playSong(this.props.song);
  },

  addToQueue: function(e) {
    e.preventDefault();
    SidebarActions.addToQueue(this.props.song);
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
        <figure className="songIndexItem">
          <img src={this.props.song.image_url}/>
          <figcaption>
            <h3>{this.props.song.title}</h3>
            <p>{this.props.song.artist}</p>
            <div className="playIcon">
              <Glyphicon onClick={this.playSong} glyph="play-circle" />
            </div>
            <div id="userPlusIcon" className="icons">
              <Glyphicon onClick={this.addToQueue} glyph="plus" />
            </div>
          </figcaption>
        </figure>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = NavSongItem;
