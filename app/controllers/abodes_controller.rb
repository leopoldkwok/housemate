class AbodesController < ApplicationController

  def new
    @abode = Abode.new
  end

  def create
    @abode = Abode.create(params[:abode].permit(:name_number, :street, :city, :county, :postcode))
  end
end
