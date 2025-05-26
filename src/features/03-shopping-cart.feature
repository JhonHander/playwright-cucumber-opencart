Feature: Shopping Cart Management
  As a customer
  I want to add products to my cart
  So that I can purchase them later

  Background:
    Given I am on the OpenCart homepage

  @smoke @regression @cart @all
  Scenario: Add "iMac" to the cart
    When I search for "iMac"
    And I add the first product to the cart
    Then I should see a success message
    And the cart should contain 1 item