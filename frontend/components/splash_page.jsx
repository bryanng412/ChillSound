var React = require('react');
var SongIndex = require('./song_index.jsx');

var SplashPage = React.createClass({

  render: function() {
    return (
      <div>
        <SongIndex/>
      </div>
    );
  }

});

module.exports = SplashPage;
