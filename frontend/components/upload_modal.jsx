var React = require('react');
var Errors = require('./errors.jsx');
var UserStore = require('../stores/user_store.js');
var ErrorStore = require('../stores/error_store.js');
var ClientActions = require('../actions/client_actions.js');
var NavItem = require('react-bootstrap').NavItem;
var Modal = require('react-bootstrap').Modal;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;

var UploadModal = React.createClass({
  getInitialState: function() {
    return { show: false,
            title: "",
            artist: "",
            description: "",
            image_url: "",
            audio_url: ""
          };
  },

  close: function() {
    this.setState({ show: false });
  },

  open: function() {
    this.setState({ show: true });
  },

  handleTitleChange: function(e) {
    e.preventDefault();
    this.setState({title: e.target.value});
  },

  handleArtistChange: function(e) {
    e.preventDefault();
    this.setState({artist: e.target.value});
  },

  handleDescriptionChange: function(e) {
    e.preventDefault();
    this.setState({description: e.target.value});
  },

  uploadImage: function(e) {
    e.preventDefault();
    window.cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      function(error, results){
      if (!error) {
        this.setState({image_url: results[0].secure_url});
      }
    }.bind(this));
  },

  uploadSong: function(e) {
    e.preventDefault();
    window.cloudinary.openUploadWidget(
      window.CLOUDINARY_OPTIONS,
      function(error, results){
      if (!error) {
        this.setState({audio_url: results[0].secure_url});
      }
    }.bind(this));
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var songParams = $.extend({}, this.state);
    delete songParams["show"];
    if (UserStore.currentUser()) {
      songParams["user_id"] = UserStore.currentUser().id;
    }
    if (songParams["image_url"] === "") {
      songParams["image_url"] = "https://res.cloudinary.com/djfvxhjdy/image/upload/v1462550057/music-placeholder_thaeet.png";
    }

    ClientActions.uploadSong(songParams);
    for (var key in songParams) {
      if (songParams[key] === "") {
        return;
      }
    }
    this.state = this.getInitialState();
    this.close();
  },

  render: function() {
    return (
      <NavItem className="navItem" onClick={this.open}>
        <p>Upload</p>
        <Modal
          show={this.state.show}
          onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload a Song</Modal.Title>
          </Modal.Header>
          <form className="modal-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleTitleChange}
                value={this.state.title}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Artist</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleArtistChange}
                value={this.state.artist}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type="textarea"
                onChange={this.handleDescriptionChange}
                value={this.state.description}
              />
            </FormGroup>
            <FormGroup>
              <Button onClick={this.uploadImage}>Upload Image</Button>
              <Button onClick={this.uploadSong}>Upload Song</Button>
            </FormGroup>
            <Button type="submit">Upload</Button>
            <Errors/>
          </form>
        </Modal>
      </NavItem>
    );
  }

});

module.exports = UploadModal;
