@abode
Feature: Adding an abode
  In order manage our bills
  As a user
  I want to add an abode

  Background:
    Given the following users exist:
        |      email          |  password   |
        |   test1@test.com    |   12345678  |
        |   test2@test.com    |   12345678  |
        |   test3@test.com    |   12345678  |    

    # And "test1@test.com" creates an abode called "home"
    # Then adds "test2@test.com" to the abode called "home"
    And  "test1@test.com" uploads a "tv" bill for "50.50" pounds
    And  "test2@test.com" uploads a "tax" bill for "34.60" pounds
    Then  I am logged in as "test1@test.com"
    And I am on the homepage

  @javascript @selenium
  Scenario: The user can add an abode if they have not created one yet (and add housemates)
    Given I am on the homepage
    Then  I am logged in as "test1@test.com"
    When I select the menu
    And I click the link "Add an abode"
    Then I should see the form to add an abode
    Then I fill in "Home name / number" with "home" and "Street" with "Elgin"
    And I click the button "Submit"

    Then I fill "HouseMates email address" with "test2@test.com"
    And I click the button "Add"
    Then I click the link "Finished"
    Then I should be on the homepage
    And I should see "test2@test.com's bills"



