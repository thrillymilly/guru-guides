class Event < ApplicationRecord
  validates :longitude,
            :latitude,
            :title,
            :date, presence: true

  has_many :saved_events, dependent: :destroy
end
