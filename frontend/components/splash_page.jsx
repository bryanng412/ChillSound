var React = require('react');
var SongIndex = require('./song_index.jsx');
var Banner = require('./banner.jsx');

var SplashPage = React.createClass({
  render: function() {
    return (
      <div className="splashWrapper">
        <Banner/>
        <SongIndex/>
      </div>
    );
  }

});

module.exports = SplashPage;
