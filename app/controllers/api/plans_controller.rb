class Api::PlansController < ApplicationController
  def index
    if logged_in?
      render json: current_user.plans.as_json(only: [:longitude, :latitude, :arrival_date, :departure_date],
                                              include: { saved_eats: {
                                                           include: { eat: {
                                                             except: [:id, :created_at, :updated_at] } },
                                                             only: [] },
                                                         saved_events: {
                                                           include: { event: {
                                                             except: [:id, :created_at, :updated_at] } },
                                                             only: [] } },
                                              methods: :address)
    else
      render json: nil
    end
  end
end
