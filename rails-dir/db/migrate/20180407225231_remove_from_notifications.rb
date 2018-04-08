class RemoveFromNotifications < ActiveRecord::Migration[5.1]
  def change
    remove_column :notifications, :User_id
  end
end
