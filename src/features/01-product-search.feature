Feature: Product Search and Validation
  As a customer
  I want to search for products
  So that I can find what I'm looking for

  @smoke @all
  Scenario: Search for a valid product
    Given I am on the OpenCart homepage
    When I search for "iPhone"
    Then I should see search results containing "iPhone"
    And I should see at least 1 product in the results
