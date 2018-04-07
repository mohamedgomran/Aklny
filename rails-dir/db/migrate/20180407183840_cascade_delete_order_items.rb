class CascadeDeleteOrderItems < ActiveRecord::Migration[5.1]
  def change
  	change_column :order_details, :order_id, :integer
  end
end
