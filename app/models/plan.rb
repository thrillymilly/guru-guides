class Plan < ApplicationRecord
  belongs_to :user
  has_many :saved_events
  has_many :saved_eats
end
