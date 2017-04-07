class Api::SavedEventsController < ApplicationController
  def create
    saved_event = SavedEvent.new(event_id: params[:event_id], plan_id: params[:plan_id])

    if saved_event.save
      render json: saved_event
    else
      render json: saved_event.errors
    end
  end
end
