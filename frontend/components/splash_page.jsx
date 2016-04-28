var React = require('react');
var SongIndex = require('./song_index.jsx');

var SplashPage = React.createClass({

  render: function() {
    return (
      <div className="splashWrapper">
        <SongIndex/>
      </div>
    );
  }

});

module.exports = SplashPage;
