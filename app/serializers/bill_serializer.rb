class BillSerializer < ActiveModel::Serializer
  attributes :id, :description, :amount, :settled, :abode_id, :user_id

end
