class Cookout < ApplicationRecord
    # has_many :foods
    # NOTE: We want to use the 'dependent: ' parameter since we want 'foods' to be destroyed if a cookout is destroyed:
    # Look for 'dependent':
    # https://guides.rubyonrails.org/association_basics.html
    has_many :foods, dependent: :destroy
    has_many :users, through: :foods

    validates :name, presence: true
    validates :start_time, presence: true
    validates :end_time, presence: true
end
