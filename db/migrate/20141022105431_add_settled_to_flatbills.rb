class AddSettledToFlatbills < ActiveRecord::Migration
  def change
    add_column :flatbills, :settled, :boolean, :default => false
  end
end
