class CreateAbodes < ActiveRecord::Migration
  def change
    create_table :abodes do |t|
      t.string :name_number
      t.string :street
      t.string :city
      t.string :county
      t.string :postcode

      t.timestamps
    end
  end
end
