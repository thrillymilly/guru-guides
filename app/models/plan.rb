class Plan < ApplicationRecord
  belongs_to :user
  has_many :saved_events, dependent: :destroy
  has_many :saved_eats, dependent: :destroy
end
