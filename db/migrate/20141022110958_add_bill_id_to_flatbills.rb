class AddBillIdToFlatbills < ActiveRecord::Migration
  def change
    add_reference :flatbills, :bill, index: true
  end
end
