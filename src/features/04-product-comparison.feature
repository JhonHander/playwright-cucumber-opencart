Feature: Product Comparison
  As a user
  I want to compare products
  So that I can make an informed purchasing decision

  Background:
    Given I am on the OpenCart homepage

  @all @compareTwo
  Scenario Outline: Compare two products
    Given I have added "<product1>" to comparison
    And I have added "<product2>" to comparison
    When I navigate to the product comparison page
    Then I should see "<product1>" and "<product2>" in the comparison table

    Examples:
      | product1    | product2    |
      | MacBook     | Apple Cinema 30"|
      | tab         | Canon EOS 5D|

  @compareMultiple
  Scenario: Compare multiple products
    Given I have added the following products to comparison:
      | product1    | product2    | product3    |
      | MacBook     | Apple Cinema 30"| Canon EOS 5D|
      | tab         |             |             |
      | Samsung SyncMaster 941BW |             |             |
    When I navigate to the product comparison page
    Then I should see all products in the comparison table
    And I should see product details for comparison

  @all @compareEmpty
  Scenario: Attempt to compare with no products selected
    When I navigate to the product comparison page
    Then I should see a message indicating no products to compare
