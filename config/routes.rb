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

    get '/plans', to: 'plans#index'
  end

  namespace :api do
    #events api
    namespace :events do
      get '/events/:id', to: 'events#show'
    end
  end

  root 'pages#index'
end
