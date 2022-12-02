class CreateCookouts < ActiveRecord::Migration[6.1]
  def change
    create_table :cookouts do |t|
      t.string :name
      t.string :start_time
      t.string :end_time

      t.timestamps
    end
  end
end
