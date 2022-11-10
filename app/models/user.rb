class User < ApplicationRecord
    has_many :cookouts
    has_many :foods, through: :cookouts

    has_secure_password

    validates :username, presence: true, uniqueness: true
end
