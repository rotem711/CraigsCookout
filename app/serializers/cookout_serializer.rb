class CookoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :end_time

  has_many :foods
  has_many :users, through: :foods
end
