Feature: Product Comparison
  As a customer
  I want to compare different products
  So that I can make an informed purchase decision

  Background:
    Given I am on the OpenCart homepage

  @all
  Scenario: Add products to compare
    When I search for "phone"
    And I add the first product to the comparison
    And I search for "tablet"
    And I add the first product to the comparison
    Then I should see success messages for comparison
    
  @all
  Scenario: View product comparison
    Given I have added the following products to comparison:
      | search term | product index |
      | phone       | 0             |
      | tablet      | 0             |
    When I navigate to the product comparison page
    Then I should see both products in the comparison table
    And I should see product details for comparison
    
  @all
  Scenario: Add product to cart from comparison page
    Given I have added the following products to comparison:
      | search term | product index |
      | phone       | 0             |
      | tablet      | 0             |
    When I navigate to the product comparison page
    And I add the first product from comparison to the cart
    Then I should see a success message
    And the cart should contain 1 item
