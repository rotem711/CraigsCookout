class Food < ApplicationRecord
    has_many :cookouts
    has_many :users, through: :cookouts

    validates :name, presence: true
    validates :spicy, presence: true
end
