class LocationSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :cookout
end
