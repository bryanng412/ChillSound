# == Schema Information
#
# Table name: songs
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  artist      :string           not null
#  description :text             not null
#  image_url   :string
#  audio_url   :string           not null
#  user_id     :integer          not null
#  plays       :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Song < ActiveRecord::Base
  validates :title, :artist, :description, :audio_url,
            :user_id, :plays, presence: true

  belongs_to :user
end
