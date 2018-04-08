class Order < ApplicationRecord
  belongs_to :user
  has_many :order_details, dependent: :destroy
  has_many :notifications, dependent: :destroy
  # mount_uploader :image, ImageUploader
end
