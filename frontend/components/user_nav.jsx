var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavSongItem = require('./nav_song_item.jsx');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');
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
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Likes</NavItem>
          <NavItem eventKey={2}>Uploaded Songs</NavItem>
        </Nav>
        <div className="userSongIndex">
          {songs}
        </div>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = UserNav;
