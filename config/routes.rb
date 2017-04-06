Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # routes for sessions
  post '/session', to: 'session#create'
  delete '/session', to: 'session#destroy'

  # routes for users
  resources :users, except: :new

  # routes for plans
  get '/plans', to: 'plans#index'

  # api routes
  namespace :api do
    # locations api
    namespace :locations do
      get '/countries/:id', to: 'countries#show'
      get '/search', to: 'locations#show'
      get '/suggestions', to: 'locations#suggest'
    end

    post '/comments', to: 'comments#create'
    get '/comments', to: 'comments#show'

    get '/plans', to: 'plans#index'
    post '/plans', to: 'plans#create'

    get '/events', to: 'events#index'

    get '/eats', to: 'eats#index'
  end

  root 'pages#index'
end

  #routes for comments
