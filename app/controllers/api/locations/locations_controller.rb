class Api::Locations::LocationsController < Api::ApiController
  def show
    latitude, longitude = params[:lat], params[:lon]

    render json: get_address(latitude, longitude)
  end
end
