class AddTrueUserIdToFlatbills < ActiveRecord::Migration
  def change
    add_column :flatbills, :true_user_id, :integer
  end
end
