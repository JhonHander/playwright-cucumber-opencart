Feature: Product Filtering and Sorting
  As a customer
  I want to filter and sort search results
  So that I can find products more efficiently

  Background:
    Given I am on the OpenCart homepage
    And I search for "mac"

  @smoke @all
  Scenario: Sort products by price low to high
    When I sort products by "Price (Low > High)"
    Then products should be displayed in ascending price order

  @all
  Scenario: Filter search results with additional criteria
    When I search with the following criteria:
      | keyword  | description | subcategories |
      | macbook  | true        | true          |
    Then I should see products containing "MacBook"
    And I should see at least 2 products in the results

  @all
  Scenario: Change the number of products displayed per page
    When I change the display limit to "25"
    Then the page should display up to 25 products per page
