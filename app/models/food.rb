class Food < ApplicationRecord
    # has_many :cookouts
    # has_many :users, through: :cookouts

    belongs_to :user
    belongs_to :cookout

    validates :name, presence: true
end
