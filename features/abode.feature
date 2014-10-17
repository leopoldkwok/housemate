Feature: Adding an abode
  In order manage our bills
  As a user
  I want to add an abode

  Scenario: Adding an abode
    Given I am on the homepage
    And I have signed in as a user
    When I click the link to add an abode
    Then I will should see the form to add an abode

  Scenario: Abode added
    Given I am on the new abode page
    And I have signed in as a user
    And I have filled in the form
    When I click submit
    Then I should see the abode's page

