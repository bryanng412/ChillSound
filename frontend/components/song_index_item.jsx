var React = require('react');
var ClientActions = require('../actions/client_actions.js');
var PlayerActions = require('../actions/player_actions.js');
var SidebarActions = require('../actions/sidebar_actions.js');
var AuthActions = require('../actions/auth_actions.js');
var Glyphicon = require('react-bootstrap').Glyphicon;
var Modal = require('react-bootstrap').Modal;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var SongIndexItem = React.createClass({
  getInitialState: function() {
    return { liked: false };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ liked: nextProps.liked });
  },

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

  like: function(e) {
    e.preventDefault();
    if (this.props.currentUser) {
      ClientActions.like(this.props.currentUser.id, this.props.song.id);
      this.setState( { liked: true });
    } else {
      AuthActions.requireLogin();
    }
  },

  unlike: function(e) {
    e.preventDefault();
    if (this.props.currentUser) {
      ClientActions.unlike(this.props.likeId);
      this.setState( {liked: false });
    } else {
      AuthActions.requireLogin();
    }
  },

  render: function() {
    var likeButton = this.state.liked ?
      <Glyphicon onClick={this.unlike} glyph="heart"/> :
      <Glyphicon onClick={this.like} glyph="heart-empty"/>;

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
              <div className="icons">
                {likeButton}
                <Glyphicon onClick={this.addToQueue} glyph="plus" />
              </div>
              <div className="playCounter">
                <p>Plays: {this.props.song.plays}</p>
              </div>
            </figcaption>
          </figure>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = SongIndexItem;
