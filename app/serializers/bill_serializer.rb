class BillSerializer < ActiveModel::Serializer
  attributes :id, :description, :amount
end
