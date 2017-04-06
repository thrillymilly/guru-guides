module ApplicationHelper
  def currentUserComments
    User.find_by(id:session[:user_id]).comments

  end

end
