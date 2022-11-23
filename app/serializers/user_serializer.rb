class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :foods
  has_many :cookouts, through: :foods
end
