class UsersController < ApplicationController
  skip_before_action :require_login, only: :create

  def create
    user = User.new(email: params[:email],
                    full_name: params[:full_name],
                    address_1: params[:address_1],
                    address_2: params[:address_2],
                    city: params[:city],
                    state_code: params[:state_code],
                    zip_code: params[:zip_code],
                    country_code: params[:country_code])
    user.password = params[:password]

    if user.save
      redirect_to "/users/#{user.id}"
    else
      if user.errors.messages.key?(:email)
        flash[:error] = "Email has already been taken."
      else
        flash[:error] = "Check that all required details have been filled in correctly."
      end

      redirect_to :root
    end
  end

  def show
  end
end
