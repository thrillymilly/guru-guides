class CreateUserController < ApplicationController

  def new
  end

  def post
    newUser = User.new

    newUser.email = params[:email]

    newUser.password = params[:password]

    if newUser.save
      session[:user_id] = newUser.id
      redirect '/'

    else
      erb :index

    end
  end

end
