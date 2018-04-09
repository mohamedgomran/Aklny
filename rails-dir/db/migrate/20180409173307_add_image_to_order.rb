class AddImageToOrder < ActiveRecord::Migration[5.1]
  def change
  	remove_column :orders, :image
    add_column :orders, :menu, :text
  end
end
