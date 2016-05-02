var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var PlaylistBar = React.createClass({
  getInitialState: function() {
    return { show: this.props.show };
  },

  componentWillReceiveProps: function() {
    this.setState({ show: this.props.show });
  },

  render: function() {
    var playlistBar;
    if (this.state.show) {
      playlistBar = (
        <div key="playlistBar" className="playlistBar">
          <h3>Playlist</h3>
        </div>
      );
    } else {
      playlistBar = <div key="noBar"/>;
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="scroll"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
        >
        {playlistBar}
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = PlaylistBar;
