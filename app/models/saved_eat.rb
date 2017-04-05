class SavedEat < ApplicationRecord
  belongs_to :eat
  belongs_to :plan
end
