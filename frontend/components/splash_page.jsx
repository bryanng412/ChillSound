var React = require('react');
var SongIndex = require('./song_index.jsx');

var SplashPage = React.createClass({

  render: function() {
    return (
      <div className="splashWrapper">
        <video className="videoBg" autoPlay loop>
          <source
            src="http://res.cloudinary.com/chillsound/video/upload/v1461805151/Lightmirror_frzgxe.mp4"
            type="video/mp4"/>
        </video>
        <SongIndex/>
      </div>
    );
  }

});

module.exports = SplashPage;
