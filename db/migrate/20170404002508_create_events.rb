class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.float :longitude, null: false
      t.float :latitude, null: false
      t.string :title, null: false
      t.date :date, null: false
      t.string :image
      t.text :info

      t.timestamps
    end
  end
end
