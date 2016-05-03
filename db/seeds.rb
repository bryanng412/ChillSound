User.create!(username: "asdf",
            password: "password")

# User.create!(username: "likeTest",
#             password: "password")
#
# song_params = [
#   {
#     title: "Counting Stars",
#     artist: "Nujabes",
#     description: "chill",
#     image_url: "https://res.cloudinary.com/chillsound/image/upload/v1461955481/albumcoverfor_benprunty_fragments_sylviaritter_by_faith303-d97uftr_tc1ywl.png",
#     audio_url: "https://res.cloudinary.com/chillsound/video/upload/v1461784358/Nujabes_-_Counting_Stars_qdd7sa.mp3",
#     user_id: 1
#   },
#   {
#     title: "Shark (Illenium Remix)",
#     artist: "Wonder Wonder",
#     description: "chill",
#     image_url: "https://res.cloudinary.com/chillsound/image/upload/v1461955481/albumcoverfor_benprunty_fragments_sylviaritter_by_faith303-d97uftr_tc1ywl.png",
#     audio_url: "https://res.cloudinary.com/chillsound/video/upload/v1461796017/Wonder_Wonder_-_Shark_Illenium_Remix_qn2i4j.mp3",
#     user_id: 1
#   },
#   {
#     title: "Fast Car",
#     artist: "Tobtok",
#     description: "chill",
#     image_url: "https://res.cloudinary.com/chillsound/image/upload/v1461955481/albumcoverfor_benprunty_fragments_sylviaritter_by_faith303-d97uftr_tc1ywl.png",
#     audio_url: "https://res.cloudinary.com/chillsound/video/upload/v1461796021/Tobtok_feat._River_-_Fast_Car_Original_Mix_la1je2.mp3",
#     user_id: 1
#   },
#   {
#     title: "Painted in Gold (Robotaki Remix)",
#     artist: "Strange Talk",
#     description: "chill",
#     image_url: "https://res.cloudinary.com/chillsound/image/upload/v1461955481/albumcoverfor_benprunty_fragments_sylviaritter_by_faith303-d97uftr_tc1ywl.png",
#     audio_url: "https://res.cloudinary.com/chillsound/video/upload/v1461796048/Strange_Talk_feat._Bertie_Blackman_-_Painted_in_Gold_Robotaki_Remix_k46zor.mp3",
#     user_id: 1
#   },
#   {
#     title: "Stay",
#     artist: "Kozoro",
#     description: "chill",
#     image_url: "https://res.cloudinary.com/chillsound/image/upload/v1461955481/albumcoverfor_benprunty_fragments_sylviaritter_by_faith303-d97uftr_tc1ywl.png",
#     audio_url: "https://res.cloudinary.com/chillsound/video/upload/v1461796099/Kozoro_-_Stay_Original_Mix_mp3clan.com_mbgtl5.mp3",
#     user_id: 1
#   },
#   {
#     title: "Child of the Night",
#     artist: "Rhodz",
#     description: "chill",
#     image_url: "https://res.cloudinary.com/chillsound/image/upload/v1461955481/albumcoverfor_benprunty_fragments_sylviaritter_by_faith303-d97uftr_tc1ywl.png",
#     audio_url: "https://res.cloudinary.com/chillsound/video/upload/v1461796079/Rhodz_-_Child_Of_The_Night_kv14pp.mp3",
#     user_id: 1
#   }
# ]
# song_params.each { |params| Song.create!(params) }
#
# 30.times do
#   Song.create!({
#     title: "asdf",
#     artist: "asdf",
#     description: "asdf",
#     image_url: "https://res.cloudinary.com/chillsound/image/upload/v1461955481/albumcoverfor_benprunty_fragments_sylviaritter_by_faith303-d97uftr_tc1ywl.png",
#     audio_url: "asdf",
#     user_id: 1
#   })
# end
#
# (1..3).each do |i|
#   Like.create!({user_id: 2, song_id: i})
# end
