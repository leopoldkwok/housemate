Feature: As a user I want to be able to add 
    bills to my list from my homepage

        @javascript
        Scenario: The user can add a bill
            When that I am on the homepage
            Then I should see a button called "Add Bill" with class ".add-bill"
            And I should see an input called "Bill"
            And I should see an input called "Amount"

            Then when I fill in "Bill" with "Electricity" and "Amount" with "£20"
            And click the button "Add a Bill"
            Then I should see "Electricity £20"

