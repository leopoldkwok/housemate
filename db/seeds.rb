# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Bill.destroy_all
Flatbill.destroy_all
User.destroy_all
Abode.destroy_all

@test1          = User.create(email: 'test1@test.com', password: '12345678')

@abode1         = Abode.create(name_number: '1', street: 'street', user_id: @test1.id)

@test1.update(abode_id: @abode1.id)

@test2          = User.create(email: 'test2@test.com', password: '12345678', abode_id: @abode1.id)

@gas            = Bill.create(description: "Gas", amount: 20.25, user_id: @test1.id, abode_id: @test1.abode_id, settled: true)
@electricity    = Bill.create(description: "Electricity", amount: 45.30, user_id: @test1.id, abode_id: @test1.abode_id)
@tv             = Bill.create(description: "TV", amount: 15.75, user_id: @test2.id, abode_id: @test2.abode_id)

@gas1            = Flatbill.create(bill_id: @gas.id, user_id: @test1.id, description: "Gas", amount: 20.25, true_user_id: @test1.id, abode_id: @test1.abode_id, settled: true)
@electricity1    = Flatbill.create(bill_id: @electricity.id, user_id: @test1.id, description: "Electricity", amount: 45.30, true_user_id: @test1.id, abode_id: @test1.abode_id)
@tv1             = Flatbill.create(bill_id: @tv.id, user_id: @test1.id, description: "TV", amount: 15.75, true_user_id: @test2.id, abode_id: @test2.abode_id)

@gas2            = Flatbill.create(bill_id: @gas.id, user_id: @test2.id, description: "Gas", amount: 20.25, true_user_id: @test1.id, abode_id: @test1.abode_id, settled: true)
@electricity2    = Flatbill.create(bill_id: @electricity.id, user_id: @test2.id, description: "Electricity", amount: 45.30, true_user_id: @test1.id, abode_id: @test1.abode_id)
@tv2             = Flatbill.create(bill_id: @tv.id, user_id: @test2.id, description: "TV", amount: 15.75, true_user_id: @test2.id, abode_id: @test2.abode_id)



