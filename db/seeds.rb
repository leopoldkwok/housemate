# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Bill.destroy_all

@gas            = Bill.create(description: "Gas", amount: 20.25)
@gas.update_attribute(:settled, true)
@electricity    = Bill.create(description: "Electricity", amount: 45.30)
@tv             = Bill.create(description: "TV", amount: 15.75)
@counciltax     = Bill.create(description: "Council Tax", amount: 89.03)