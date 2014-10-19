class AddAbodeIdToBills < ActiveRecord::Migration
  def change
    add_reference :bills, :abode, index: true
  end
end
