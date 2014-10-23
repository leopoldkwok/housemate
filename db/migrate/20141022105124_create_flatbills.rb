class CreateFlatbills < ActiveRecord::Migration
def change
        create_table :flatbills do |t|
        t.string :description
        t.belongs_to :user, index: true
        t.belongs_to :abode, index: true

        t.timestamps
    end
end
