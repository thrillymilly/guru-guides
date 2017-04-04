class Event < ApplicationRecord
  has_many :saved_events, dependent: :destroy
end
