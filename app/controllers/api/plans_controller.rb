class Api::PlansController < ApplicationController
  def index
    if logged_in?
      render json: current_user.plans
    else
      render json: nil
    end
  end

  def create
    location = get_place_details(params[:place_id])["geometry"]["location"]

    plan = Plan.new(latitude: location["lat"], longitude: location["lng"], arrival_date: params[:arrival_date], departure_date: params[:departure_date])
    plan.user = current_user

    if plan.save
      render json: plan.as_json.merge({ status: "OK" })
    else
      render json: plan.errors
    end
  end
end
