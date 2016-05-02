json.extract! @user, :id, :username, :description

json.likes do
  json.array! @user.likes do |like|
    json.extract! like, :id, :song_id
  end
end
