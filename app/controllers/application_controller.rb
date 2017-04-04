class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    User.find_by(id: session[:user_id])
  end

  def logged_in?
    !!current_user
  end

  def log_out
    reset_session
    redirect_to :root
  end

  helper_method :current_user, :logged_in?, :log_out
end
