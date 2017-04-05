class Api::Locations::LocationsController < ApplicationController
  def show
    latitude, longitude = params[:lat], params[:lon]

    render json: get_address(latitude, longitude)
  end

  def suggest
    response = HTTParty.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=#{params[:input]}&key=#{Rails.application.secrets.gmap_key}")

    if response["status"] == "OK"
      results = response["predictions"].map { |p| [p.assoc("description"), p.assoc("place_id")].to_h }
      render json: results
    end
  end
end
