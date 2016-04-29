class Api::SongsController < ApplicationController
  def index
    #get top 25 songs
    @songs = Song.includes(:user).order(:plays).first(12)

    render "api/songs/index"
  end

  def create
    @song = new Song(song_params)

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
  end

  def destroy
  end

  private
  def song_params
    params.require(:song)
          .permit(:title, :artist, :description, :image_url,
                  :audio_url, :user_id, :plays)
  end
end
