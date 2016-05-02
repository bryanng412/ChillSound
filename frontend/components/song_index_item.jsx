var React = require('react');
var ClientActions = require('../actions/client_actions.js');
var PlayerActions = require('../actions/player_actions.js');
var Glyphicon = require('react-bootstrap').Glyphicon;
var Modal = require('react-bootstrap').Modal;

var SongIndexItem = React.createClass({
  getInitialState: function() {
    return { liked: false, modalVisible: false };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ liked: nextProps.liked });
  },

  handleModalClose: function() {
    this.setState({ modalVisible: false });
  },

  playSong: function(e) {
    e.preventDefault();
    PlayerActions.playSong(this.props.song);
  },

  addToQueue: function(e) {
    e.preventDefault();
    PlayerActions.addToQueue(this.props.song);
  },

  like: function(e) {
    e.preventDefault();
    if (this.props.currentUser) {
      ClientActions.like(this.props.currentUser.id, this.props.song.id);
      this.setState( { liked: true });
      ClientActions.fetchCurrentUser();
    } else {
      this.setState({ modalVisible: true });
    }
  },

  unlike: function(e) {
    e.preventDefault();
    if (this.props.currentUser) {
      ClientActions.unlike(this.props.likeId);
      this.setState( {liked: false });
      ClientActions.fetchCurrentUser();
    } else {
      this.setState({ modalVisible: true });
    }
  },

  render: function() {
    var likeButton = this.state.liked ?
      <Glyphicon onClick={this.unlike} glyph="heart"/> :
      <Glyphicon onClick={this.like} glyph="heart-empty"/>;

    var modal =
      <Modal
        show={this.state.modalVisible}
        onHide={this.handleModalClose}
        bsSize="small"
      >
        <Modal.Header closeButton>
          <h3>You must be logged in to use that feature!</h3>
        </Modal.Header>
      </Modal>;

    return (
      <div>
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
          </figcaption>
        </figure>
        {modal}
      </div>
    );
  }

});

module.exports = SongIndexItem;
