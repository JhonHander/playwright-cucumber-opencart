Feature: End-to-End Shopping Experience
  As a customer
  I want to browse, search, add products to cart and complete checkout
  So that I can purchase products online

  Background:
    Given I am on the OpenCart homepage

  @e2e @all
  Scenario: Complete shopping journey from registration to checkout
    # Registration
    When I navigate to the register page
    And I fill in the registration form with valid details
    And I agree to the privacy policy
    And I submit the registration form
    Then I should see a confirmation that my account has been created
    And I should be logged in

    # Product search and navigation
    When I search for "MacBook"
    Then I should see search results
    And the search results should contain "MacBook"
    
    # Product sorting and selection
    When I sort the products from high to low price
    And I add the first product to the cart
    Then I should see a success message that the product was added
    
    # Cart review
    When I view my shopping cart
    Then I should see the product in my cart
    
    # Checkout process
    When I proceed to checkout
    And I confirm my billing details
    And I confirm my delivery details
    And I confirm my delivery method
    And I agree to the terms and conditions
    And I confirm my order
    Then I should see a confirmation that my order has been placed
    And I should see an order number

  @e2e @all
  Scenario: Add multiple products to cart, update quantities, and checkout as guest
    # Searching and adding multiple products
    When I search for "phone"
    And I add the first product to the cart
    And I return to the homepage
    And I search for "tab"
    And I add the first product to the cart
    
    # Cart management
    When I view my shopping cart
    Then I should see 2 products in my cart
    
    # Update quantity
    When I update the quantity of the first product to "2"
    And I update the cart
    Then I should see the updated cart total
    
    # Checkout as guest
    When I proceed to checkout
    And I choose to checkout as guest
    And I enter my customer details
    And I enter my billing address
    And I enter my shipping address
    And I select a shipping method
    And I select a payment method
    And I confirm my order
    Then I should see a confirmation that my order has been placed
