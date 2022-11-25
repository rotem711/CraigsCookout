class ApplicationRecord < ActiveRecord::Base
  # ERD Entity Relationship Diagram For Project:
  # - User:
  # + has_many :foods
  # + has_many :cookouts
  # + through: :foods
  # - Cookout:
  # + has_many :foods
  # + has_many :users, through: :foods
  # + has_one :location
  # - Food:
  # + belongs_to :user
  # + belongs_to :cookout
  # - Location:
  # + belongs_to: :cookout
  self.abstract_class = true
end
