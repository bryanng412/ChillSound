require 'byebug'
class Api::SongsController < ApplicationController
  def index
    #get top 8 songs
    @songs = Song.includes(:user).order(plays: :desc).first(8)
    render "api/songs/index"
  end

  def create
    @song = Song.new(song_params)

    if @song.save
      render "api/songs/show"
    else
      @errors = @song.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def show
    @song = Song.includes(:user).find(params[:id])
    render "api/songs/show"
  end

  def update
    @song = Song.find(params[:id])
    if @song.update(song_params)
      render "api/songs/show"
    end
  end

  private
  def song_params
    params.require(:song)
          .permit(:title, :artist, :description, :image_url,
                  :audio_url, :user_id, :plays)
  end
end
