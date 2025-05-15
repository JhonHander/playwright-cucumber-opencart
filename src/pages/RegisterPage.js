const BasePage = require('./BasePage');

/**
 * RegisterPage class represents the user registration page
 */
class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for RegisterPage elements
    this.firstNameInput = '#input-firstname';
    this.lastNameInput = '#input-lastname';
    this.emailInput = '#input-email';
    this.telephoneInput = '#input-telephone';
    this.passwordInput = '#input-password';
    this.confirmPasswordInput = '#input-confirm';
    this.privacyPolicyCheckbox = 'input[name="agree"]';
    this.continueButton = 'input[type="submit"][value="Continue"]';
    this.newsletterSubscribeYes = 'input[name="newsletter"][value="1"]';
    this.newsletterSubscribeNo = 'input[name="newsletter"][value="0"]';
    this.firstNameError = '#input-firstname + .text-danger';
    this.lastNameError = '#input-lastname + .text-danger';
    this.emailError = '#input-email + .text-danger';
    this.telephoneError = '#input-telephone + .text-danger';
    this.passwordError = '#input-password + .text-danger';
    this.confirmPasswordError = '#input-confirm + .text-danger';
    this.successMessage = '#content h1';
  }

  /**
   * Navigate to the registration page
   */
  async navigateToRegister() {
    await this.navigateTo('?route=account/register');
  }

  /**
   * Fill in registration form
   * @param {Object} userDetails - User registration details
   * @param {boolean} subscribe - Whether to subscribe to newsletter
   */
  async fillRegistrationForm(userDetails, subscribe = false) {
    await this.type(this.firstNameInput, userDetails.firstName);
    await this.type(this.lastNameInput, userDetails.lastName);
    await this.type(this.emailInput, userDetails.email);
    await this.type(this.telephoneInput, userDetails.telephone);
    await this.type(this.passwordInput, userDetails.password);
    await this.type(this.confirmPasswordInput, userDetails.password);
    
    if (subscribe) {
      await this.click(this.newsletterSubscribeYes);
    } else {
      await this.click(this.newsletterSubscribeNo);
    }
  }

  /**
   * Agree to privacy policy
   */
  async agreeToPrivacyPolicy() {
    await this.page.check(this.privacyPolicyCheckbox);
  }

  /**
   * Submit registration form
   */
  async submitRegistration() {
    await this.click(this.continueButton);
  }

  /**
   * Check if registration was successful
   * @returns {Promise<boolean>}
   */
  async isRegistrationSuccessful() {
    await this.waitForElement(this.successMessage);
    const message = await this.getText(this.successMessage);
    return message.includes('Your Account Has Been Created');
  }

  /**
   * Get all validation errors
   * @returns {Promise<Object>}
   */
  async getValidationErrors() {
    const errors = {};
    
    if (await this.isVisible(this.firstNameError)) {
      errors.firstName = await this.getText(this.firstNameError);
    }
      if (await this.isVisible(this.lastNameError)) {
      errors.lastName = await this.getText(this.lastNameError);
    }
    
    if (await this.isVisible(this.emailError)) {
      errors.email = await this.getText(this.emailError);
    }
    
    if (await this.isVisible(this.telephoneError)) {
      errors.telephone = await this.getText(this.telephoneError);
    }
    
    if (await this.isVisible(this.passwordError)) {
      errors.password = await this.getText(this.passwordError);
    }
    
    if (await this.isVisible(this.confirmPasswordError)) {
      errors.confirmPassword = await this.getText(this.confirmPasswordError);
    }
    
    return errors;
  }
  
  /**
   * Validate registration fields
   * @returns {Promise<Object>} - Validation errors
   */
  async validateRegistrationFields() {
    const errors = {};
    
    // Check each field for validation errors
    const visibleErrors = await this.page.$$('.text-danger:visible');
    
    for (const error of visibleErrors) {
      const errorMessage = await error.textContent();
      const previousElement = await error.evaluate(node => {
        const prevInput = node.previousElementSibling;
        return prevInput ? prevInput.id || prevInput.name : null;
      });
      
      if (previousElement) {
        errors[previousElement.replace('input-', '')] = errorMessage.trim();
      }
    }
    
    return errors;
  }
  
  /**
   * Get specific field error
   * @param {string} fieldName - Field name ('firstname', 'lastname', etc.)
   * @returns {Promise<string|null>} - Error message or null if no error
   */
  async getFieldError(fieldName) {
    const selector = `#input-${fieldName} + .text-danger`;
    
    if (await this.isElementVisible(selector)) {
      return this.webActions.getText(selector);
    }
    
    return null;
  }
}

module.exports = RegisterPage;
