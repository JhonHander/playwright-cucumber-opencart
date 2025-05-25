Feature: Product Search and Validation
  As a user, I want to be able to search for products and see relevant results.

  @smoke @all
  Scenario: Search for a valid product
    Given I am on the OpenCart homepage
    When I search for "MacBook"
    Then I should see search results containing "MacBook"
    And I should see at least 1 product in the results

  @all @specificProduct
  Scenario: Search for a specific product (e.g., iMac)
    Given I am on the OpenCart homepage
    When I search for "iMac"
    Then I should see search results containing "iMac"
    And the search results should be relevant to "iMac"