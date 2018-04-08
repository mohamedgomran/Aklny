Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  get    'auth'   => 'test#auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  ##Users routes##
  # register a user
  post 'users', to: 'users#register'
  # add friend
  post 'users/friends/add', to: 'users#add_friend'
  # unfriend
  delete 'users/friends/:friend_id', to: 'users#del_friend'
  # list my friends
  get 'users/friends', to: 'users#list_friends'
  # list my notifications
  get 'users/notifications', to: 'users#list_notifications'
  #list my joined orders
  get 'users/joined', to: 'users#list_joined_orders'
  #list my orders
  get 'users/orders', to: 'users#list_my_orders'
  
  ##Groups routes##
  #create a group
  post 'groups', to: 'groups#create'
  #create a group
  delete 'groups/:gid', to: 'groups#delete'
  #get a list of a user's groups
  get 'groups', to: 'groups#list'
  #add a member to a group
  post 'groups/:gid/members', to: 'groups#add_member'
  #get a list of a group's memebrs
  get 'groups/:gid/members', to: 'groups#list_members'
  #delete a member from a group
  delete 'groups/:gid/members/:fid', to: 'groups#del_member'


  ##Orders routes##
  #create order
  post 'orders', to: 'orders#create'
  #list order
  # get 'orders/:id', to: 'orders#list'
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
  #join order
  put 'orders/:oid/join/:uid', to: 'orders#join'
  # invited
  get 'orders/:oid/invited', to: 'orders#show_invited'
  # joined
  get 'orders/:oid/joined', to: 'orders#show_joined'
end
