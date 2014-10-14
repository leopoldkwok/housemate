Feature: As a user I want to be able to add 
    bills to my list from my homepage

        @javascript
        Scenario: The user can add a bill
            When that I am on the homepage
            Then I should see a button called "Add a Bill"
            And when I select "Add a Bill"
            Then I should see an input called "bill"
            And I should see an input called "amount"
