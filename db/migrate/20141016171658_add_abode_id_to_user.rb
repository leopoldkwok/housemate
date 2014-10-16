class AddAbodeIdToUser < ActiveRecord::Migration
  def change
    add_column :users, :abode_id, :integer
  end
end
