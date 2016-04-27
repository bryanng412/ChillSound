var React = require('react');
var ErrorStore = require('../stores/error_store.js');

var Errors = React.createClass({
  getInitialState: function () {
    return { errors: [] };
  },

  componentDidMount: function() {
    this.errorListenerToken = ErrorStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.errorListenerToken.remove();
  },

  _onChange: function() {
    this.setState({ errors: ErrorStore.all() });
  },

  render: function() {
    var errors = this.state.errors.map(function(error, i) {
      return <li key={i}>{error}</li>;
    });
    return (
      <ul>
        {errors}
      </ul>
    );
  }
});

module.exports = Errors;
