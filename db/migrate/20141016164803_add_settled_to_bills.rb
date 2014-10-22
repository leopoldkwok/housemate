class AddSettledToBills < ActiveRecord::Migration
  def change
    add_column :bills, :settled, :boolean, :default => false
  end
end
