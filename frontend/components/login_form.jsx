var React = require('react');
var HashHistory = require('react-router').hashHistory;
var ClientActions = require('../actions/client_actions.js');
var Errors = require('./errors.jsx');
var UserStore = require('../stores/user_store.js');

var LoginForm = React.createClass({
  getInitialState: function() {
    return { username: "", password: ""};
  },

  componentDidMount: function() {
    this.loginListenerToken = UserStore.addListener(this._onLogin);
  },

  componentWillUnmount: function() {
    this.loginListenerToken.remove();
  },

  _onLogin: function() {
    if (UserStore.currentUser()) {
      HashHistory.push("/");
    }
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
  },

  render: function() {
    return (
      <div className="formWrapper">
        <h1>Log In</h1>
        <form className="userForm" onSubmit={this.handleSubmit}>
          <label className="userLabel">Username
            <input
              className="userInputField"
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </label>
          <label className="userLabel">Password
            <input
              className="userInputField"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <input className="userSubmit" type="submit" value="Log In"/>
        </form>
        <Errors/>
      </div>
    );
  }

});

module.exports = LoginForm;
