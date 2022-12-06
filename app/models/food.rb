class Food < ApplicationRecord
    # has_many :cookouts
    # has_many :users, through: :cookouts

    # We have 3 validations, 2 from 'belongs_to' as well as validates
    # All 3 have to be provided to create Food
    belongs_to :user
    belongs_to :cookout

    validates :name, presence: true
end
