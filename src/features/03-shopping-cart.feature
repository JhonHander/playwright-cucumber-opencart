Feature: Shopping Cart Management
  As a customer
  I want to add products to my cart
  So that I can purchase them later

  Background:
    Given I am on the OpenCart homepage

  @smoke @all
  Scenario: Add a product to the cart
    When I search for "iMac"
    And I add the first product to the cart
    Then I should see a success message
    And the cart should contain 1 item

  @all
  Scenario: Update product quantity in cart
    Given I have added an "iMac" to my cart
    When I navigate to the shopping cart
    And I update the quantity of the first product to 3
    Then the cart should reflect the updated quantity
    And the cart total should be recalculated

  @all
  Scenario: Remove a product from the cart
    Given I have added an "iMac" to my cart
    When I navigate to the shopping cart
    And I remove the first product from my cart
    Then the cart should be empty
    And I should see a message indicating my cart is empty

  @all
  Scenario: Add product and proceed to cart page
    Given I have added an "iMac" to my cart
    When I click on the cart button
    Then I should be on the Shopping Cart page

  @all
  Scenario: Update quantity from cart page
    Given I have added an "iMac" to my cart
    And I am on the Shopping Cart page
    When I update the quantity of the first product to "3"
