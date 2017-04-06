class Api::EventsController < ApplicationController
  def index
    if params[:plan_id]
      plan = Plan.find(params[:plan_id])

      render json: { all_events: Event.all, saved_events: plan.saved_events }
    else
      render json: Event.all
    end
  end
end
