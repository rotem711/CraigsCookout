class FoodSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :user
  belongs_to :cookout
end
