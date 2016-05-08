var React = require('react');
var ClientActions = require('../actions/client_actions.js');
var ErrorActions = require('../actions/error_actions.js');
var HashHistory = require('react-router').hashHistory;
var Errors = require('./errors.jsx');
var ErrorStore = require('../stores/error_store.js');
var UserStore = require('../stores/user_store.js');
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
      if (ErrorStore.all().length === 0){
        this.close();
        this.setState({ show: false, username: "", password1: "", password2: ""});
      }
    } else {
      ErrorActions.receiveErrors(['Passwords must match and be 6 or more characters']);
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

  demoSignIn: function(e) {
    e.preventDefault();
    this.setState({username: "", password1: "", password2: ""});

    var username = "guest".split("");
    var password = "password".split("");
    var time = 50;
    var self = this;

    $(".demo").addClass("disabled");
    $(".demo").attr("disabled", true);

    username.forEach(function(letter) {
      time += 50;
      setTimeout(function() {
        self.setState({username: self.state.username + letter});
      }, time);
    });

    time += 500;

    password.forEach(function(letter) {
      time += 50;
      setTimeout(function() {
        self.setState({password1: self.state.password1 + letter});
      }, time);
    });

    time += 500;

    password.forEach(function(letter) {
      time += 50;
      setTimeout(function() {
        self.setState({password2: self.state.password2 + letter});
      }, time);
    });

    time += 500;

    setTimeout(function() {
      ClientActions.login({
        username: self.state.username,
        password: self.state.password1
      });
      self.close();
    }, time);
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
            <Button className="demo" onClick={this.demoSignIn}>Demo Sign In</Button>
            <Errors/>
          </form>
        </Modal>
      </NavItem>
    );
  }

});

module.exports = SignUpModal;
