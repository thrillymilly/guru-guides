class Api::Locations::CountriesController < ApplicationController
  skip_before_action :require_login

  def show
    render json: CS.states(params[:id])
  end
end
