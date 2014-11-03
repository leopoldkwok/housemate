@users
Feature: As a user I want to be able to see
    my flat's bills but only edit my own bills.
    I don't want my flatmates to edit by bills
    or other flats to view our bills

    Background:
        Given the following users exist:
            |      email          |  password   |
            |   test1@test.com    |   12345678  |
            |   test2@test.com    |   12345678  |
            |   test3@test.com    |   12345678  |    

        And  "test1@test.com" uploads a "tv" bill for "50.50" pounds
        And  "test2@test.com" uploads a "tax" bill for "34.60" pounds
        Then  I am logged in as "test1@test.com"
        And I am on the homepage

    @javascript @selenium
    Scenario: The user should not see options to sign in or up when signed in
        When I select the menu
        Then I should see "Sign out"
        Then I should see "Settings"
        But I should see "All bills"
        And I should see "Add an abode"
        But I should not see "Sign in"
        And I should not see "Sign up"

    @javascript @selenium
    Scenario: The user should not see options other than sign in or up when not signed in
        When I select the menu
        And I click the link "Sign out"
        When I select the menu
        Then I should not see "Sign out"
        Then I should not see "Settings"
        But I should not see "All bills"
        And I should not see "Add an abode"
        But I should see "Sign in"
        And I should see "Sign up"

    @javascript
    Scenario: The user can see other users' bills
        Then I should see "tv£50.50" 
        And I should see "tax£34.60"

    @javascript
    Scenario: The user can only edit their own bills
        Then I should see '1' buttons called "X" 
        And click the button "X"
        Then I should see "tax£34.60"
        And I should see '0' buttons called "X"



