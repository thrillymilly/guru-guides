# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.new(
         email: "test@gg.com",
         full_name: "Robinson Crusoe",
         address_1: "1 Stranded Rd",
         address_2: "Lost Island",
         city: "Nowhere",
         state_code: "wa",
         zip_code: "W9001",
         country_code: "us"
       )
user.password = "test"
user.save
