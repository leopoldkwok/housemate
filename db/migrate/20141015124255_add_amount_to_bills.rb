class AddAmountToBills < ActiveRecord::Migration
  def change
    add_column :bills, :amount, :decimal, precision: 8, scale: 2
    add_reference :bills, :supplier, polymorphic: true, index: true
  end
end
