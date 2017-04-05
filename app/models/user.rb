class User < ApplicationRecord
  validates :email,
            :password_digest,
            :full_name,
            :address_1,
            :city,
            :state_code,
            :zip_code,
            :country_code, presence: true

  validates :email, uniqueness: { case_sensitive: false }

  has_secure_password

  has_many :plans, dependent: :destroy
  has_many :comments, dependent: :destroy
end
