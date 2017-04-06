class Api::Locations::LocationsController < ApplicationController
  def show
    response = HTTParty.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{params[:place_id]}&key=#{Rails.application.secrets.gmap_key}")

    if response["status"] == "OK"
      render json: [response["result"].assoc("formatted_address"), response["result"].assoc("geometry")].to_h
    end
  end

  def suggest
    response = HTTParty.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=#{params[:input]}&key=#{Rails.application.secrets.gmap_key}")

    if response["status"] == "OK"
      results = response["predictions"].map { |p| [p.assoc("description"), p.assoc("place_id")].to_h }
      render json: results
    end
  end
end
