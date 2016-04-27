class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password])
    if @user
      login!(@user)
      render "api/users/show"
    else
      @errors = ["Invalid Username/Password"]
      render "api/shared/error", status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout!
      render "api/users/show"
    else
      @errors = ["No one logged in"]
      render "api/shared/error", status: 404
    end
  end

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      @errors = nil
      render "api/shared/error", status: 404
    end
  end
end
