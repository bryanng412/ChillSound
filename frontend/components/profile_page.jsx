var React = require('react');
var UserNav = require('./user_nav.jsx');

var ProfilePage = React.createClass({

  render: function() {
    return (
      <div className="profileWrapper">
        <UserNav/>
      </div>
    );
  }

});

module.exports = ProfilePage;
