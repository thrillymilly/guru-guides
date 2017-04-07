class Api::PlansController < ApplicationController
  def index
    if logged_in?
      render json: current_user.plans
    else
      render json: nil
    end
  end

  def show
    render json: Plan.find(params[:id])
  end

  def create
    location = get_place_details(params[:place_id])["geometry"]["location"]

    plan = Plan.new(latitude: location["lat"], longitude: location["lng"], arrival_date: params[:arrival_date], departure_date: params[:departure_date])
    plan.user = current_user

    if plan.save
      render json: plan
    else
      render json: plan.errors
    end
  end

  def update
    plan = Plan.find(params[:id])
    plan.latitude = params[:lat]
    plan.longitude = params[:lng]
    plan.arrival_date = params[:arrival_date]
    plan.departure_date = params[:departure_date]

    if plan.save
      render json: plan
    else
      render json: plan.errors
    end
  end

  def destroy
    plan = Plan.find(params[:id])

    if plan.destroy
      render json: plan
    else
      render json: plan.errors
    end
  end
end
