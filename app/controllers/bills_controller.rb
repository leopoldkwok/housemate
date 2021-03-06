class BillsController < ApplicationController
respond_to :json

  def index
    respond_with bills
  end

  def show
    respond_with bill
  end

  def create
   respond_with Bill.create(bill_params)
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
    params.require(:bill).permit(:description, :amount, :settled, :user_id, :abode_id) if user_signed_in?
  end

  def bills
    Bill.where(abode_id: current_user.abode_id) if user_signed_in?  
  end

end
