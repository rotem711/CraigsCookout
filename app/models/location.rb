class Location < ApplicationRecord
    belongs_to :cookout

    validates :name, presence: true
end