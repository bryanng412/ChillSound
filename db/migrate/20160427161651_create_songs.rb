class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.text :description, null: false
      t.string :image_url
      t.string :audio_url, null: false
      t.integer :user_id, null: false, index: true
      t.integer :plays, default: 0, null: false
      t.timestamps null: false
    end
  end
end
