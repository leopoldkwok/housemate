class BillsController < ApplicationController
respond_to :json

  def index
    respond_with Bill.all
  end

  def show
    respond_with bill
  end

  def create
    respond_with :api, :v1, Bill.create(bill_params)
  end

  def update
    respond_with bill.update(bill_params)
  end

  def destroy
    respond_with bill.destroy
  end

  private

  def bill
    Bill.find(params[:id])
  end

  def bill_params
    params.require(:bill).permit(:description, :amount)
  end

end
