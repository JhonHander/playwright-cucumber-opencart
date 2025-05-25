Feature: Checkout Process
  As a customer
  I want to complete the checkout process
  So that I can purchase my selected items

  Background:
    Given I am on the OpenCart homepage
    And I have added an "iMac" to my cart

  @all
  Scenario: Guest checkout with all required fields
    When I navigate to the shopping cart
    And I proceed to checkout
    And I choose to checkout as a guest
    And I fill in the following billing details:
      | firstName | lastName | email           | telephone  | address1     | city      | postcode | country       | region        |
      | John      | Doe      | test@test.com   | 1234567890 | Test Street  | Test City | 12345    | United States | Florida       |
    And I continue to the delivery details
    And I continue with the default delivery method
    And I agree to the terms and conditions
    And I continue to the payment method
    And I confirm the order
    Then I should see an order confirmation
    And I should see a success message

  @all
  Scenario: Registered user checkout with saved address
    Given I am logged in with valid credentials
    And I have added a "MacBook" to my cart
    When I navigate to the shopping cart
    And I proceed to checkout
    And I continue with my saved address
    And I continue with the default delivery method
    And I agree to the terms and conditions
    And I continue to the payment method
    And I confirm the order
    Then I should see an order confirmation
    And I should see a success message
    And I should see the order in my order history

  @all
  Scenario: Checkout with coupon code
    When I navigate to the shopping cart
    And I apply a valid coupon code
    And I proceed to checkout
    And I choose to checkout as a guest
    And I fill in the following billing details:
      | firstName | lastName | email           | telephone  | address1     | city      | postcode | country       | region        |
      | Jane      | Smith    | jane@test.com   | 0987654321 | 123 Main St  | Any City  | 54321    | United States | California    |
    And I continue to the delivery details
    And I continue with the default delivery method
    And I agree to the terms and conditions
    And I continue to the payment method
    And I confirm the order
    Then I should see an order confirmation
    And I should see the discount applied in the order summary
    And I should see a success message
