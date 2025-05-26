Feature: End-to-End Shopping Experience
  As a customer
  I want to browse, search, add products to cart and complete checkout
  So that I can purchase products online

  Background:
    Given I am on the OpenCart homepage

  @e2e @regression @registered_checkout @all
  Scenario: Complete shopping journey from registration to checkout
    When I navigate to the register page
    And I fill in the registration form with valid details
    And I agree to the privacy policy
    And I submit the registration form
    Then I should see a confirmation that my account has been created
    And I should be logged in

    When I search for "iMac"
    Then I should see search results 
    And the search results should contain "iMac" 
    
    When I sort the products from high to low price 
    And I add the first product to the cart
    Then I should see a success message that the product was added
    
    When I view my shopping cart 
    Then I should see the product in my cart 
    
    When I proceed to checkout
    And I confirm my billing details
    And I confirm my delivery details
    And I confirm my delivery method
    And I agree to the terms and conditions
    And I confirm my order
    Then I should see a confirmation that my order has been placed
    And I should see an order number

  @e2e @regression @add_multiple_items @all
  Scenario: Search and add multiple products to cart
    When I search for "iMac" 
    And I add the first product to the cart
    And I return to the homepage
    And I search for "tab"
    And I add the first product to the cart

    When I view my shopping cart
    Then I should see 2 products in my cart
