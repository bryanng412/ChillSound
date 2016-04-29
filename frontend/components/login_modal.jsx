var React = require('react');
var ClientActions = require('../actions/client_actions.js');
var Errors = require('./errors.jsx');
var UserStore = require('../stores/user_store.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
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
            <Errors/>
          </form>
        </Modal>
      </NavItem>
    );
  }
});

module.exports = LoginModal;

// <ReactCSSTransitionGroup
//   transitionName="fade"
//   transitionEnterTimeout={500}
//   transitionLeaveTimeout={500}
//   transitionAppear={true}
//   transitionAppearTimeout={1000}>
//   <div className="formWrapper">
//     <h1>Log In</h1>
//     <form className="userForm" onSubmit={this.handleSubmit}>
//       <label className="userLabel">Username
//         <input
//           className="userInputField"
//           type="text"
//           value={this.state.username}
//           onChange={this.handleUsernameChange}
//           />
//       </label>
//       <label className="userLabel">Password
//         <input
//           className="userInputField"
//           type="password"
//           value={this.state.password}
//           onChange={this.handlePasswordChange}
//           />
//       </label>
//       <input className="userSubmit" type="submit" value="Log In"/>
//     </form>
//     <Errors/>
//   </div>
// </ReactCSSTransitionGroup>
// );
// }
