class FoodSerializer < ActiveModel::Serializer
  # This will control the 'food' JSON response
  # TODO: You need to figure out what you need to pass the response
  # I don't need the user and the cookout --> Look into filtering this on the serializer level

  # Most likely: I have to remove the 'user_id' and 'cookout_id' from the response
  attributes :id, :name

  # Previously this was present
  # I don't need to actually show this on the frontend:
  # belongs_to :user
  # belongs_to :cookout
end
