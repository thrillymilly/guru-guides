class Api::EatsController < ApplicationController
  def index
    render json: Eat.all.as_json(except: [:created_at, :updated_at])
  end
end
