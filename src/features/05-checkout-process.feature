Feature: Checkout Process
  As a customer
  I want to complete the checkout process
  So that I can purchase my selected items

  Background:
    Given I am on the OpenCart homepage
    And I have added an "iMac" to my cart

  @regression @checkout @guest @all
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
