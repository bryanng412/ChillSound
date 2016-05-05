var React = require('react');
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var NavSongItem = require('./nav_song_item.jsx');
var CurrentUserState = require('../mixins/current_user_state.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var UserNav = React.createClass({
  mixins: [CurrentUserState],

  getInitialState: function() {
    return { activeKey: 1 };
  },

  handleSelect: function(eventKey){
    if (this.isMounted()){
      this.setState({activeKey: eventKey});
    }
  },

  render: function() {
    if (this.state.currentUser){
      var songs = this.state.activeKey === 1 ?
      this.state.currentUser.likedSongs.map(function(song, i){
        return <NavSongItem key={i} song={song} />;
      })
      :
      this.state.currentUser.songs.map(function(song, i){
        return <NavSongItem key={i} song={song} />;
      });
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="scroll"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
      >
        <Tabs defaultActiveKey={1} id="userTabs" onSelect={this.handleSelect}>
          <Tab eventKey={1} title="Likes"></Tab>
          <Tab eventKey={2} title="Uploaded Songs"></Tab>
        </Tabs>
        <div className="userSongIndex">
          {songs}
        </div>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = UserNav;
