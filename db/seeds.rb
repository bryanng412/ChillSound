require 'cloudinary'

User.create!(username: "asdf",
            password: "password")

title = "Counting Stars"
artist = "Nujabes"
description = "chill"
audio_url = "http://res.cloudinary.com/chillsound/video/upload/v1461784358/Nujabes_-_Counting_Stars_qdd7sa.mp3"
user_id = 1

Song.create!(title: title,
            artist: artist,
            description: description,
            audio_url: audio_url,
            user_id: user_id)
