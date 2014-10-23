class DropFlatbills < ActiveRecord::Migration
  def change
    drop_table :flatbills
  end
end
