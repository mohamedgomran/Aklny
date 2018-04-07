Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post 'users', to: 'users#register'


  post 'groups', to: 'groups#create'
  post 'groups/:gid', to: 'groups#add_friend'


end
