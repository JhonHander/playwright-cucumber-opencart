Feature: User Registration
  As a new customer
  I want to register for an account
  So that I can manage my orders and preferences

  Background:
    Given I am on the OpenCart homepage

  @smoke @regression @registration @all
  Scenario: Register a new account with valid information
    When I navigate to the register page
    And I fill in the registration form with valid details
    And I agree to the privacy policy
    And I submit the registration form
    Then I should see a confirmation that my account has been created
    And I should be logged in