Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  ##ROUTES FOR LOGIN##
  get '/login', to: 'session#new'
  post '/session', to: 'session#create'
  delete '/session', to: 'session#destroy'

  ##ROUTES FOR NEW USER##
  post '/createuser', to: 'session#create'

end
