class CreateCookouts < ActiveRecord::Migration[6.1]
  def change
    create_table :cookouts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :food, null: false, foreign_key: true 
      t.string :name
      t.string :start_time
      t.string :end_time

      t.timestamps
    end
  end
end
