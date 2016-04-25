# Schema Information

## songs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
artist      | string    | not null
description | text      | not null
user_id     | integer   | not null, foreign key (references users), indexed

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
title       | text      | not null
description | string    | not null

## playlistings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
song_id     | integer   | not null, foreign key (references songs), indexed
playlist_id | integer   | not null, foreign key (references playlists), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
song_id     | integer   | not null, foreign key (references songs), indexed
user_id     | integer   | not null, foreign key (references users), indexed


## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
content     | text      | not null
song_id     | integer   | not null, foreign key (references songs), indexed
user_id     | integer   | not null, foreign key (references users), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
description     | text      |
