class Api::LikesController < ApplicationController
  def create
    @like = Like.create!(like_params)
    render "api/likes/show"
  end

  def destroy
    Like.find(params.require(:id)).destroy!
    render "api/likes/show"
  end

  private
  def like_params
    params.require(:like).permit(:song_id, :user_id)
  end
end
