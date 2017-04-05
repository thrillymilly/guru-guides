class Api::Events::LocationsController < Api::ApiController
  def show

    render json: Event.all
  end
end
