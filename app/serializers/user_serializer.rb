class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :abode_id
    embed :ids, include: true

    has_many :bills
end