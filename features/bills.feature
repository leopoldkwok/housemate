@bills
Feature: As a user I want to be able to 
    add and delete bills to my list from 
    my homepage. I also want to be able to
    indicate that a bill in my list has
    been paid. Given what I and other users
    have settled, I want to know what I owe

    Background:
        Given the following users exist:
            |      email          |  password   |
            |   test1@test.com    |   12345678  |
            |   test2@test.com    |   12345678  |
            |   test3@test.com    |   12345678  |   
        And  I am logged in as "test1@test.com"
        Then that I am on the homepage

    @javascript @selenium
    Scenario: The user can add a bill
        Then I should see a "button" called "Add Bill"
        And I should see an "input" called "Bill"
        And I should see an "input" called "Amount"
        Then I fill in "Bill" with "Electricity" and "Amount" with "20"
        And click the button "Add Bill"
        Then I should see "Electricity £20"

    @javascript @selenium
    Scenario: The user can delete a bill
        When I fill in "Bill" with "taxes" and "Amount" with "40"
        And click the button "Add Bill"
        Then I should see "taxes £40"
        And click the button "X"
        Then I should not see "taxes £40"

    @javascript @selenium
    Scenario: The user can mark a bill as settled
        When I fill in "Bill" with "taxes" and "Amount" with "40"
        And click the button "Add Bill"
        And check the box
        Then I should see "Total Settled: £40"

    @javascript @selenium
    Scenario: The user is told how much they owe
        Given  "test1@test.com" uploads a "tv" bill for "10.24" pounds and settles
        And  "test2@test.com" uploads a "tax" bill for "50.50" pounds and settles
        And  "test3@test.com" uploads a "phone" bill for "34.60" pounds and settles
        And that I am on the homepage
        Then I should see "You owe £21.54"

    @javascript @selenium
    Scenario: The user is told how much they are owed
        Given  "test1@test.com" uploads a "tv" bill for "50.50" pounds and settles
        And  "test2@test.com" uploads a "tax" bill for "10.24" pounds and settles
        And  "test3@test.com" uploads a "phone" bill for "34.60" pounds and settles
        And that I am on the homepage
        Then I should see "You are owed £18.72"

    @javascript @selenium
    Scenario: The user is told how much each housemate owes them
        Given  "test1@test.com" uploads a "tv" bill for "50.50" pounds and settles
        And  "test2@test.com" uploads a "tax" bill for "10.24" pounds and settles
        And  "test3@test.com" uploads a "phone" bill for "34.60" pounds and settles
        Then that I am on the sign up page
        Then that I am on the homepage
        And click the button "You are owed £18.72"
        Then I should see "test2@test.com owes you £18.72"



    @javascript @selenium
    Scenario: The user is told if they don't owe anything
        Then I should see "We're square"

    @javascript @selenium
    Scenario: The user is told how much to pay each housemate proportionate to the amount each is owed
        Given  "test1@test.com" uploads a "tv" bill for "10.24" pounds and settles
        And  "test2@test.com" uploads a "tax" bill for "50.50" pounds and settles
        And  "test3@test.com" uploads a "phone" bill for "34.60" pounds and settles
        Then that I am on the sign up page
        Then that I am on the homepage
        And click the button "You owe £21.54"
        Then I should see "Pay test2@test.com £18.72"
        And I should see "Pay test3@test.com £2.82"



