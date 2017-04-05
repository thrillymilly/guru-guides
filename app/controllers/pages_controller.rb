class PagesController < ApplicationController
  skip_before_action :require_login

  def index
    @countries = CS.countries.reject { |k, _| k.length > 2 }
  end
end
