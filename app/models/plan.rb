class Plan < ApplicationRecord
  validates :longitude,
            :latitude,
            :arrival_date,
            :departure_date, presence: true

  belongs_to :user
  has_many :saved_events, dependent: :destroy
  has_many :saved_eats, dependent: :destroy
end
