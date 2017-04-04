class CreateUserController < ApplicationController

  def new
  end

  def post
    newUser = User.new

    newUser.email = params[:email]

    newUser.password = params[:password]

    newUser.fullName = params[:full_name]

    newUser.address1 = params[:address_1]

    newUser.address2 = params[:address_2]

    newUser.address1 = params[:address_1]

    newUser.city = params[:city]

    newUser.state = params[:state_code]

    newUser.country = params[:country]

    if newUser.save
      session[:user_id] = newUser.id
      redirect '/'

    else
      erb :index

    end
  end

end
