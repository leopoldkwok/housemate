class AddAmountToFlatbills < ActiveRecord::Migration
  def change
    add_column :flatbills, :amount, :decimal, precision: 8, scale: 2
    add_reference :flatbills, :supplier, polymorphic: true, index: true
  end
end
