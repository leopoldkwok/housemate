class UsersController < ApplicationController
    respond_to :json

  def index
    @users = User.where(abode_id:current_user.abode_id) if user_signed_in?
    respond_with @users
  end
end