var React = require('react');

var Banner = React.createClass({

  render: function() {
    return (
      <div className="banner">
        <h1 className="bannerItem">Slogan</h1>
        <button className="bannerButton">Discover</button>
      </div>
    );
  }

});

module.exports = Banner;
