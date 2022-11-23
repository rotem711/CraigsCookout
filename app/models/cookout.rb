class Cookout < ApplicationRecord
    has_many :foods
    has_many :users, through: :foods

    validates :name, presence: true
    validates :start_time, presence: true
    validates :end_time, presence: true
end
