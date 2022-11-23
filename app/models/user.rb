class User < ApplicationRecord
    # has_many :cookouts
    # has_many :foods, through: :cookouts

    has_many :foods
    has_many :cookouts, through: :foods

    has_secure_password

    validates :username, presence: true, uniqueness: true
end
