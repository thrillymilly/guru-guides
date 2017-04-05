class CreateSavedEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :saved_events do |t|
      t.references :event, foreign_key: true
      t.references :plan, foreign_key: true

      t.timestamps
    end
  end
end
