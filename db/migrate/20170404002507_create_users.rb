class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :full_name, null: false
      t.string :address_1, null: false
      t.string :address_2
      t.string :city, null: false
      t.string :state_code, null: false
      t.string :zip_code, null: false
      t.string :country_code, null: false

      t.timestamps
    end
  end
end
