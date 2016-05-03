var ErrorActions = require('../actions/error_actions.js');
var UserActions = require('../actions/user_actions.js');

var ServerUserApiUtil = {
  like: function(userId, songId) {
    $.ajax({
      method: "POST",
      url: "/api/likes",
      data: { like:
              {
                user_id: parseInt(userId),
                song_id: parseInt(songId)
              }
            },
      success: function(){
        UserActions.fetchCurrentUser();
      }
    });
  },

  unlike: function(likeId) {
    $.ajax({
      method: "DELETE",
      url: "/api/likes/" + likeId,
      success: function(){
        UserActions.fetchCurrentUser();
      }
    });
  }
};

module.exports = ServerUserApiUtil;
