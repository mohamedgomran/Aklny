Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post 'users', to: 'users#register'


  ##Groups routes##
  #create a group
  post 'groups', to: 'groups#create'
  #get a list of a user's groups
  get 'groups', to: 'groups#list'
  #add a member to a group
  post 'groups/:gid/memebrs', to: 'groups#add_member'
  #get a list of a group's memebrs
  get 'groups/:gid/memebrs', to: 'groups#list_members'
  #delete a member from a group
  delete 'groups/:gid/memebrs/:fid', to: 'groups#del_member'


  ##Orders routes##
  #create order
  post 'orders', to: 'orders#create'
  #delete order
  delete 'orders/:oid', to: 'orders#delete'
  #edit order
  put 'orders/:oid', to: 'orders#edit'
  #add item to an order (order details)
  post 'orders/:oid/items', to: 'order_details#create'
  #list item for an order (order details)
  get 'orders/:oid/items', to: 'order_details#list'
  #delete item from order (order details)
  delete 'orders/:oid/items/:iid', to: 'order_details#delete'

end
