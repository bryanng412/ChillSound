var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router').browserHistory;

var App = require('./components/app.jsx');
var SplashPage = require('./components/splash_page.jsx');
var ProfilePage = require('./components/profile_page.jsx');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SplashPage}/>
    <Route path="profile" component={ProfilePage}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Router history={BrowserHistory}>
      {routes}
    </Router>
  ), document.getElementById("root"));
});
