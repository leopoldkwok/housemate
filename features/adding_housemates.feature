Feature: Adding housemates to an abode
  Scenario: Housemate does not exist
    Given I have signed up
    And created an abode
    When I enter 'bob@gmail.com' in the add housemate box
    And I click Add housemate
    Then I should see 'Sorry, I cannot find bob@gmail.com'

  Scenario: Housemate that does exist
    Given I have signed up
    And created an abode
    When I enter 'leo@gmail.com' in the add housemate box
    And I click Add housemate
    Then I should see 'Successfully added!' 