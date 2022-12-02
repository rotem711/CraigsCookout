class FoodSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :user
  belongs_to :cookout
end
