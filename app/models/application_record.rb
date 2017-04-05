class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def get_address(latitude, longitude)
    response = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=#{latitude},#{longitude}&result_type=street_address&key=#{Rails.application.secrets.gmap_key}")

    if response["status"] == "OK" then response["results"].first["formatted_address"] else "" end
  end
end
