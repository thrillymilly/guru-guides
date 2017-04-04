class PagesController < ApplicationController
  def index
    @countries = CS.countries.reject { |k, _| k.length > 2 }
  end
end
