var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router').hashHistory;

var App = require('./components/app.jsx');
var LoginForm = require('./components/login_form.jsx');
var SignUpForm = require('./components/signup_form.jsx');

var routes = (
  <Route path="/" component={App}>
    <Route path="login" component={LoginForm}/>
    <Route path="signup" component={SignUpForm}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Router history={HashHistory}>
      {routes}
    </Router>
  ), document.getElementById("root"));
});
