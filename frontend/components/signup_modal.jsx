var React = require('react');
var ClientActions = require('../actions/client_actions.js');
var ErrorActions = require('../actions/error_actions.js');
var HashHistory = require('react-router').hashHistory;
var Errors = require('./errors.jsx');
var UserStore = require('../stores/user_store.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var NavItem = require('react-bootstrap').NavItem;
var Modal = require('react-bootstrap').Modal;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;

var SignUpModal = React.createClass({
  getInitialState: function() {
    return { show: false, username: "", password1: "", password2: ""};
  },

  close: function() {
    this.setState({ show: false });
  },

  open: function() {
    this.setState({ show: true });
  },

  handleUsernameChange: function(e) {
    e.preventDefault();
    this.setState({username: e.target.value});
  },

  handlePasswordChange: function(e) {
    e.preventDefault();
    this.setState({password1: e.target.value});
  },

  handlePasswordChange2: function(e) {
    e.preventDefault();
    this.setState({password2: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.getValidationState() === 'success') {
      ClientActions.signUp({
        username: this.state.username,
        password: this.state.password1
      });
      this.close();
    } else {
      ErrorActions.receiveErrors(['Passwords must match']);
    }
  },

  getValidationState: function() {
    if ((this.state.password1.length === 0) &&
        (this.state.password2.length === 0)) {
      return null;
    }
    if ((this.state.password1 === this.state.password2) &&
        (this.state.password1.length > 5)) {
      return 'success';
    } else {
      return 'error';
    }
  },

  render: function() {
    return (
      <NavItem className="navItem" onClick={this.open}>
        <p>Sign Up</p>
        <Modal
          show={this.state.show}
          onHide={this.close}
          >
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <form className="modal-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleUsernameChange}
                value={this.state.username}
              />
            </FormGroup>
            <FormGroup
              validationState={this.getValidationState()}
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password1}
              />
              <FormControl.Feedback/>
            </FormGroup>
            <FormGroup
              validationState={this.getValidationState()}
            >
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl
                type="password"
                onChange={this.handlePasswordChange2}
                value={this.state.password2}
              />
              <FormControl.Feedback/>
            </FormGroup>
            <Button type="submit">Submit</Button>
            <Errors/>
          </form>
        </Modal>
      </NavItem>
    );
  }

});

module.exports = SignUpModal;
