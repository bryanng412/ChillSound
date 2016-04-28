var React = require('react');
var ClientActions = require('../actions/client_actions.js');
var HashHistory = require('react-router').hashHistory;
var Errors = require('./errors.jsx');
var UserStore = require('../stores/user_store.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var SignUpForm = React.createClass({
  getInitialState: function() {
    return { username: "", password: ""};
  },

  componentDidMount: function() {
    this.signUpListenerToken = UserStore.addListener(this._onSignUp);
  },

  componentWillUnmount: function() {
    this.signUpListenerToken.remove();
  },

  _onSignUp: function() {
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
    ClientActions.signUp({
      username: this.state.username,
      password: this.state.password
    });
  },

  render: function() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        transitionAppearTimeout={1000}>
        <div className="formWrapper">
          <h1>Sign Up</h1>
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
            <input className="userSubmit" type="submit" value="Sign Up"/>
          </form>
          <Errors/>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = SignUpForm;
