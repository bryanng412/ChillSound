var React = require('react');
var SongIndex = require('./song_index.jsx');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var SplashPage = React.createClass({

  render: function() {
    return (
      <div className="splashWrapper">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={1000}>
          <video preload autoPlay loop>
            <source
              src="http://res.cloudinary.com/chillsound/video/upload/v1461805151/Lightmirror_frzgxe.mp4"
              type="video/mp4"/>
          </video>
          <SongIndex/>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

});

module.exports = SplashPage;
