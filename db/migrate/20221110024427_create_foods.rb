class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      # Revision:
      # The 'foods' table will be the joining table
      # The food has the 'user_id', 'cookout_id', and the 'name'
      # I have to provide the 'user_id' and the 'cookout_id' in this scenario
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :cookout, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
