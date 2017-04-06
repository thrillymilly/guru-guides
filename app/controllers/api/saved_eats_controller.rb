class Api::SavedEatsController < ApplicationController
  def create
    saved_eat = SavedEat.new(eat_id: params[:eat_id], plan_id: params[:plan_id])

    if saved_eat.save
      render json: saved_eat
    else
      render json: saved_eat.errors
    end
  end
end
