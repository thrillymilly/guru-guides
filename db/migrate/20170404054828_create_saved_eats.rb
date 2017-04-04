class CreateSavedEats < ActiveRecord::Migration[5.0]
  def change
    create_table :saved_eats do |t|

      t.references :eat, foreign_key: true
      t.references :plan, foreign_key: true

      t.timestamps
    end
  end
end
