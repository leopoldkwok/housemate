class AddUserIdToAbode < ActiveRecord::Migration
  def change
    add_reference :abodes, :user, index: true
  end
end
