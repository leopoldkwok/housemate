class FlatbillSerializer < ActiveModel::Serializer
  attributes :id, :description, :amount, :settled, :abode_id, :bill_id, :true_user_id, :user_id

end