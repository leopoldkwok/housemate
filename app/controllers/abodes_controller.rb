class AbodesController < ApplicationController

  def new
    @abode = Abode.new
  end

  def create
    @abode = Abode.create(params[:abode].permit(:name_number, :street, :city, :county, :postcode))
    redirect_to abode_path(@abode)
  end

  def show
    @abode = Abode.find(params[:id])
  end  
end
