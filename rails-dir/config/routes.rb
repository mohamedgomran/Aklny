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


end
