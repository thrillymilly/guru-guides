Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  ##ROUTES FOR LOGIN##
  post '/session', to: 'session#create'
  delete '/session', to: 'session#destroy'

  ##ROUTES FOR NEW USER##
  resources :users, except: :new

  # api routes
  namespace :api do
    # state/country api
    get '/countries/:id', to: 'countries#show'
  end

  root 'pages#index'
end
