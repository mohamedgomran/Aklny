Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post 'users', to: 'users#register'


  get 'groups', to: 'groups#list'
  get 'groups/:gid', to: 'groups#list_members'
  post 'groups', to: 'groups#create'
  post 'groups/:gid', to: 'groups#add_member'
  delete 'groups/:gid/friends/:fid', to: 'groups#del_member'


end
