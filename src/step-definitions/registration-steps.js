const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I navigate to the register page', async function() {
  const homePage = this.pageFactory.getHomePage();
  await homePage.navigateToRegister();
});

When('I fill in the registration form with valid details', async function() {
  const registerPage = this.pageFactory.getRegisterPage();
  
  // Use DataHelper to generate a random user
  const userDetails = this.dataHelper.generateRandomUser();
  
  await registerPage.fillRegistrationForm(userDetails, false);
  
  // Store details for later steps
  this.testData.registrationDetails = userDetails;
  
  // Log the generated user data for debugging
  console.log('Generated user for registration:', {
    email: userDetails.email,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName
  });
});

When('I fill in the registration form with an existing email', async function() {
  const registerPage = this.pageFactory.getRegisterPage();
  
  // Use a known existing email (this is a simulation, in reality would use a predefined email)
  const userDetails = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com', // This is assumed to be already registered
    telephone: '1234567890',
    password: 'Password123',
  };
  
  await registerPage.fillRegistrationForm(userDetails, false);
  
  // Store details for later steps
  this.testData.registrationDetails = userDetails;
});

When('I agree to the privacy policy', async function() {
  const registerPage = this.pageFactory.getRegisterPage();
  await registerPage.agreeToPrivacyPolicy();
});

When('I submit the registration form', async function() {
  const registerPage = this.pageFactory.getRegisterPage();
  await registerPage.submitRegistration();
});

Then('I should see a confirmation that my account has been created', async function() {
  const registerPage = this.pageFactory.getRegisterPage();
  const isSuccessful = await registerPage.isRegistrationSuccessful();
  
  expect(isSuccessful).toBe(true);
});

Then('I should be logged in', async function() {
  // Check if we are on the account page or have account links visible
  const isLoggedIn = await this.page.isVisible('a:has-text("My Account")');
  expect(isLoggedIn).toBe(true);
});

Then('I should see an error message that the email is already registered', async function() {
  // Look for error message about duplicate email
  const errorElement = await this.page.$('.alert-danger');
  const errorText = await errorElement.textContent();
  
  expect(errorText).toContain('already registered');
});

When('I submit the registration form without filling it', async function() {
  const registerPage = this.pageFactory.getRegisterPage();
  
  // Just click the continue button without filling the form
  await registerPage.submitRegistration();
});

Then('I should see validation errors for required fields', async function() {
  const registerPage = this.pageFactory.getRegisterPage();
  const errors = await registerPage.getValidationErrors();
  
  // Check that we have errors for the required fields
  expect(Object.keys(errors).length).toBeGreaterThan(0);
  
  // Specifically check for first name and password errors
  expect(errors).toHaveProperty('firstName');
  expect(errors).toHaveProperty('password');
});
