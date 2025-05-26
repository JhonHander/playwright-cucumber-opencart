Feature: Product Filtering and Sorting
  As a customer
  I want to filter and sort search results
  So that I can find products more efficiently

  Background:
    Given I am on the OpenCart homepage
    And I search for "mac"

  @smoke @regression @sorting @all
  Scenario: Sort products by price low to high
    When I sort products by "Price (Low > High)"
    Then products should be displayed in ascending price order