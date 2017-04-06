class Api::EventsController < ApplicationController
  def index
    render json: Event.all.as_json(except: [:created_at, :updated_at])
  end
end
