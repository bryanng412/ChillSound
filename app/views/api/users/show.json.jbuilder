json.extract! @user, :id, :username, :description

json.likes do
  json.array! @user.likes do |like|
    json.extract! like, :id, :song_id
  end
end

json.songs do
  json.array! @user.songs
end

json.likedSongs do
  json.array! @user.liked_songs
end
