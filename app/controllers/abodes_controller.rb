class AbodesController < ApplicationController
  before_action :authenticate_user!

  def new
    @abode = Abode.new
  end

  def create
    @abode = Abode.new(params[:abode].permit(:name_number, :street, :city, :county, :postcode))
    @abode.user = current_user
    @abode.save
    redirect_to abode_path(@abode)
  end

  def show
    @abode = @abode || Abode.find(params[:id])
  end

  def add_user
    @abode = Abode.find(params[:abode_id])
    @user = User.find_by(email: params[:email])
    unless @user 
      flash[:notice] = "Sorry, I cannot find #{params[:email]}"
      render :show
    else
     @abode.users << @user
     @abode.save
     flash[:notice] = "Successfully added!"
     redirect_to abode_path(@abode)
  end
  end
end
