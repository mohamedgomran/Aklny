class UserSerializer < ActiveModel::Serializer
  # attributes :id
  attributes :id, :email, :name, :created_at, :updated_at, :last_login
end
