class CreateEats < ActiveRecord::Migration[5.0]
  def change
    create_table :eats do |t|
      t.float :longitude
      t.float :latitude
      t.string :title
      t.string :image
      t.text :info

      t.timestamps
    end
  end
end
