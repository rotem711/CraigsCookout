class Cookout < ApplicationRecord
    has_many :foods
    has_many :users, through: :foods
    has_one :location

    validates :name, presence: true
    validates :start_time, presence: true
    validates :end_time, presence: true
end
