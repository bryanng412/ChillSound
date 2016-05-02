var ErrorActions = require('../actions/error_actions.js');
var ClientActions = require('../actions/client_actions.js');

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
            }
    });
  },

  unlike: function(likeId) {
    $.ajax({
      method: "DELETE",
      url: "/api/likes/" + likeId
    });
  }
};

module.exports = ServerUserApiUtil;
