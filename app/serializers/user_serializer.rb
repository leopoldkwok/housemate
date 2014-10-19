class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :abode_id
  # , :abode_id
end