class Order < ApplicationRecord
  belongs_to :user
  has_many :order_details, dependent: :destroy
  has_many :notifications, dependent: :destroy
<<<<<<< HEAD
=======
  has_attached_file :menu
>>>>>>> d4c3c689b8cc76513ce18ef8455f44d148210df4
end
