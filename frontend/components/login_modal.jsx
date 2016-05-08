var React = require('react');
var ClientActions = require('../actions/client_actions.js');
var Errors = require('./errors.jsx');
var UserStore = require('../stores/user_store.js');
var NavItem = require('react-bootstrap').NavItem;
var Modal = require('react-bootstrap').Modal;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;

var LoginModal = React.createClass({
  getInitialState: function() {
    return { show: false, username: "", password: ""};
  },

  componentDidMount: function() {
    this.listenerToken = UserStore.addListener(this.require_login);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  require_login: function() {
    this.setState({ show: true });
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
    this.setState({password: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    ClientActions.login({
      username: this.state.username,
      password: this.state.password
    });
    if (UserStore.currentUser()) {
      this.close();
    }
  },


  demoSignIn: function(e) {
    e.preventDefault();
    this.setState({username: "", password: ""});

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
        self.setState({password: self.state.password + letter});
      }, time);
    });

    time += 500;

    setTimeout(function() {
      ClientActions.login({
        username: self.state.username,
        password: self.state.password
      });
      self.close();
    }, time);
  },

  render: function() {
    return (
      <NavItem className="navItem" onClick={this.open}>
        <p>Login</p>
        <Modal
          show={this.state.show}
          onHide={this.close}
          >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
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
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
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

module.exports = LoginModal;
