Feature: As a user I want to be able to 
    add and delete bills to my list from 
    my homepage


        Background:
            When that I am on the homepage


        @javascript
        Scenario: The user can add a bill
            Then I should see a "button" called "Add Bill"
            And I should see an "input" called "Bill"
            And I should see an "input" called "Amount"
            Then I fill in "Bill" with "Electricity" and "Amount" with "20"
            And click the button "Add Bill"
            Then I should see "Electricity £20"

        @javascript
        Scenario: The user can delete a bill
            When I fill in "Bill" with "taxes" and "Amount" with "40"
            And click the button "Add Bill"
            Then I should see "taxes £40"
            And click the button "Delete Bill"
            Then I should not see "taxes £40"


