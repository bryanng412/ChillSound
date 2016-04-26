var React = require('react');

var Navbar = React.createClass({
  render: function() {
    var navBarItems = this.props.currentUser ?
      (<ul>
        <li>Profile</li>
        <li>Sign Out</li>
      </ul>)
      :
      (<ul>
        <li>Login</li>
        <li>Sign Up</li>
      </ul>);

    return (
      <nav className="navbar">
      </nav>
    );
  }
});

module.exports = Navbar;
