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

sam = User.create(username: "test", password: "test")
# burger = sam.foods.create!(name: "burgers")
# testCookout = burger.cookouts.create!(name: "Test Cookout", start_time: "5 PM", end_time: "8 PM")