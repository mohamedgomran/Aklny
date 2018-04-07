class User < ApplicationRecord
	has_and_belongs_to_many :groups
    has_many :orders
  	has_many :order_details
    has_many :notifications
end
