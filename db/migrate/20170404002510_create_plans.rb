class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.references :user, foreign_key:true
      t.float :longitude, null: false
      t.float :latitude, null: false
      t.date  :arrival_date, null: false
      t.date  :departure_date, null: false

      t.timestamps
    end
  end
end
