class SessionController < ApplicationController
  skip_before_action :require_login, only: :create

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
    end

    redirect_to :root
  end

  def destroy
    log_out
  end
end
