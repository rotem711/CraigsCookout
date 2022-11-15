# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.delete_all()
Cookout.delete_all()
Food.delete_all()
User.delete_all()

sam = User.create(username: "sam", password: "test")
cookout1 = sam.cookouts.create!(name: "cookout1", start_time: "Monday, November 11, 2022, 4:00 PM Central", end_time: "Monday, November 11, 2022, 6:00 PM Central")

hotdog = Food.create(name: "Hotdog")