var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var PlayerStore = require('../stores/player_store.js');
var PlaylistBarItem = require('./playlist_bar_item.jsx');
var Glyphicon = require('react-bootstrap').Glyphicon;

var PlaylistBar = React.createClass({
  getInitialState: function() {
    return { show: this.props.show, playlistItems: PlayerStore.queue() };
  },

  componentDidMount: function() {
    this.listenerToken = PlayerStore.addListener(this.onPlaylistChange);
    this.updateSize();
    $(window).resize(this.updateSize);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  componentWillReceiveProps: function() {
    this.setState({ show: this.props.show });
  },

  updateSize: function() {
    $(".playlistBar").css("top", $(".navbar").height());
  },

  onPlaylistChange: function() {
    this.setState({ playlistItems: PlayerStore.queue() });
  },

  render: function() {
    var playlistBarItems =
      this.state.playlistItems.map(function(song, i){
        return <PlaylistBarItem key={i} index={i} song={song}/>;
      });


    var playlistBar;
    if (this.state.show) {
      playlistBar = (
        <div key="playlistBar" className="playlistBar">
          <Glyphicon glyph="cd"/>
          {playlistBarItems}
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
