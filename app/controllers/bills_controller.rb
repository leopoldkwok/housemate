class BillsController < ApplicationController
respond_to :json

  def index
    respond_with bills
  end

  def show
    respond_with bill
  end

  def create
    @bill = Bill.create(bill_params)
    userids = User.where(abode_id: current_user.abode_id).map {|user| user.id}
    userids.each {|instance| Flatbill.create(user_id: instance, bill_id: @bill.id, description: @bill.description, amount: @bill.amount, settled: @bill.settled, true_user_id: @bill.user_id, abode_id: @bill.abode_id)}
    respond_with @bill
  end

  def update
    @bill = bill.update(bill_params)
    Flatbill.where(bill_id: bill.id).each {|row| row.update(description: bill.description, amount: bill.amount, settled: bill.settled)}
    respond_with @bill
  end

  def destroy
    @bill = Bill.find(params[:id])
    Flatbill.where(bill_id: @bill.id).each {|row| row.destroy}
    respond_with @bill.destroy
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
