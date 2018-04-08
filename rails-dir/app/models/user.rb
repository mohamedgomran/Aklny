class User < ApplicationRecord
  has_secure_password
	has_and_belongs_to_many :groups
	has_many :user_groups, class_name: "Group"
    has_many :orders
  	has_many :order_details
    has_many :notifications
    has_and_belongs_to_many :friends, class_name: "User", 
    foreign_key: "user_id", association_foreign_key: "friend_id", 
    :join_table => 'friends'

    def self.from_token_payload payload
      # Returns a valid user, `nil` or raise
      # e.g.
         self.find payload["sub"]
    end

end
