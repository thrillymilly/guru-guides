class Api::CountriesController < ApplicationController
  def show
    render json: CS.states(params[:id])
  end
end
