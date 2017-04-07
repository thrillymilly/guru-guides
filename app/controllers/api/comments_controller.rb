class Api::CommentsController < ApplicationController

  def create
    comment = Comment.new
    comment.body = params[:body]
    comment.user = current_user

    if comment.save
      render json: comment
    else
      render json: comment.errors
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      redirect_to '/users/{#user.id}'
    else
      render json: comment.errors
    end
  end

end
