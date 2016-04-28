var React = require('react');
var SongIndex = require('./song_index.jsx');
var Banner = require('./banner.jsx');
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
          <Banner/>
          <SongIndex/>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

});

module.exports = SplashPage;
