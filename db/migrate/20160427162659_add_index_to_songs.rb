class AddIndexToSongs < ActiveRecord::Migration
  def change
    add_index :songs, :audio_url
  end
end
