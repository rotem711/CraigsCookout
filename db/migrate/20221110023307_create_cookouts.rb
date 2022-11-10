class CreateCookouts < ActiveRecord::Migration[6.1]
  def change
    create_table :cookouts do |t|

      t.timestamps
    end
  end
end
