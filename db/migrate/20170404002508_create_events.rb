class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.float :longitude
      t.float :latitude
      t.string :title
      t.date :date
      t.string :image
      t.text :info

      t.timestamps
    end
  end
end
