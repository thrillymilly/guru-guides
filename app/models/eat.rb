class Eat < ApplicationRecord
  has_many :saved_eats, dependent: :destroy
end
