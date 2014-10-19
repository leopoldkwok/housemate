class BillSerializer < ActiveModel::Serializer
  attributes :id, :description, :amount, :settled, :user_id
end
