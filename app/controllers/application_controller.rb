class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_login

  helper_method :current_user, :logged_in?, :log_out

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

  private

  def require_login
    unless logged_in?
      flash[:error] = "Please log in first or sign up for an account."
      redirect_to :root
    end
  end
end
