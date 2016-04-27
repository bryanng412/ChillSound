var React = require('react');

var SignUpForm = React.createClass({

  render: function() {
    return (
      <div className="formWrapper">
        <h1>Sign Up</h1>
        <form className="userForm">
          <label className="userLabel">Username
            <input className="userInputField" type="text"/>
          </label>
          <label className="userLabel">Password
            <input className="userInputField" type="password"/>
          </label>
          <input className="userSubmit" type="submit"/>
        </form>
      </div>
    );
  }

});

module.exports = SignUpForm;
