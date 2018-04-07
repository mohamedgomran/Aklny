class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.string :status
      t.string :order_for
      t.string :res_name
      t.string :menu
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
