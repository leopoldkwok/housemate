class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
    embed :ids, include: true

    has_many :bills
end