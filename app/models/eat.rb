class Eat < ApplicationRecord
  validates :longitude,
            :latitude,
            :title, presence: true

  has_many :saved_eats, dependent: :destroy
end
