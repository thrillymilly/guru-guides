class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.references :user, foreign_key:true
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
