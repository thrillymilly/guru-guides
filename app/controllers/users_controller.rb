class UsersController < ApplicationController
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
      redirect_to :root
    end
  end

  def show
  end
end
