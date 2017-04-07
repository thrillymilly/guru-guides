class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login

  helper_method :current_user, :logged_in?, :log_in, :log_out, :get_place_details

  def current_user
    User.find_by(id: session[:user_id])
  end

  def logged_in?
    !!current_user
  end

  def log_in(user)
    session[:user_id] = user.id
  end

  def log_out
    reset_session
    redirect_to :root
  end

  def get_place_details(place_id)
    response = HTTParty.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{place_id}&key=#{Rails.application.secrets.gmap_key}")

    if response["status"] == "OK"
      [response["result"].assoc("formatted_address"), response["result"].assoc("geometry")].to_h
    else
      nil
    end
  end

  private

  def require_login
    unless logged_in?
      flash[:error] = "Please log in first or sign up for an account."
      redirect_to :root
    end
  end
end
