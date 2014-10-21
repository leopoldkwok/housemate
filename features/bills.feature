@bills
Feature: As a user I want to be able to 
    add and delete bills to my list from 
    my homepage. I also want to be able to
    indicate that a bill in my list has
    been paid


    Background:
        Given the following users exist:
            |      email          |  password   |
            |   test1@test.com    |   12345678  |
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


