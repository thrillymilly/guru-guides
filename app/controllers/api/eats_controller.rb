class Api::EatsController < ApplicationController
  def index
    if params[:plan_id]
      plan = Plan.find(params[:plan_id])

      render json: { all_eats: Eat.all, saved_eats: plan.saved_eats }
    else
      render json: Eat.all
    end
  end
end
