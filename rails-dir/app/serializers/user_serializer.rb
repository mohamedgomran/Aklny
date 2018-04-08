class UserSerializer < ActiveModel::Serializer
  # attributes :id
  attributes :id, :email, :name
end
