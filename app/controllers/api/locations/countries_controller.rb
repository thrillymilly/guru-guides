class Api::Locations::CountriesController < Api::ApiController
  def show
    render json: CS.states(params[:id])
  end
end
