Feature: User Registration
  As a new customer
  I want to register for an account
  So that I can manage my orders and preferences

  Background:
    Given I am on the OpenCart homepage

  @all
  Scenario: Register a new account with valid information
    When I navigate to the register page
    And I fill in the registration form with valid details
    And I agree to the privacy policy
    And I submit the registration form
    Then I should see a confirmation that my account has been created
    And I should be logged in

  @all
  Scenario: Attempt to register with an existing email
    When I navigate to the register page
    And I fill in the registration form with an existing email
    And I agree to the privacy policy
    And I submit the registration form
    Then I should see an error message that the email is already registered

  @all
  Scenario: Validation errors for missing required fields
    When I navigate to the register page
    And I submit the registration form without filling it
    Then I should see validation errors for required fields
