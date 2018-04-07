class CreateOrderDetails < ActiveRecord::Migration[5.1]
  def change
    create_table :order_details do |t|
      t.string :item
      t.integer :amount
      t.integer :price
      t.string :comment
      t.references :user, foreign_key: true
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
