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

    # routes for comments
    post '/comments', to: 'comments#create'
    get '/comments', to: 'comments#show'
    delete '/comments', to: 'comments#destroy'

    # routes for plans
    resources :plans, except: :edit

    # routes for events
    get '/events', to: 'events#index'

    # routes for eats
    get '/eats', to: 'eats#index'

    # routes for saved_events
    post '/saved_events', to: 'saved_events#create'

    # routes for saved_eats
    post '/saved_eats', to: 'saved_eats#create'
  end

  root 'pages#index'
end
