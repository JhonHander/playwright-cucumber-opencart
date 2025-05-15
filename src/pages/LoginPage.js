const BasePage = require('./BasePage');

/**
 * LoginPage class represents the OpenCart login page
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for LoginPage elements
    this.emailInput = '#input-email';
    this.passwordInput = '#input-password';
    this.loginButton = 'input[type="submit"][value="Login"]';
    this.forgotPasswordLink = 'a[href*="account/forgotten"]';
    this.warningAlert = '.alert-danger';
    this.successAlert = '.alert-success';
    this.continueButton = 'a[href*="account/account"]';
    this.registerAccountLink = 'a[href*="account/register"]';
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage() {
    await this.navigateTo('?route=account/login');
  }

  /**
   * Login with credentials
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    await this.type(this.emailInput, email);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Click on the forgotten password link
   */
  async clickForgottenPassword() {
    await this.click(this.forgotPasswordLink);
  }

  /**
   * Get warning alert message
   * @returns {Promise<string>}
   */
  async getWarningMessage() {
    if (await this.isVisible(this.warningAlert)) {
      return await this.getText(this.warningAlert);
    }
    return null;
  }

  /**
   * Get success alert message
   * @returns {Promise<string>}
   */
  async getSuccessMessage() {
    if (await this.isVisible(this.successAlert)) {
      return await this.getText(this.successAlert);
    }
    return null;
  }

  /**
   * Click on register account link
   */
  async clickRegisterAccount() {
    await this.click(this.registerAccountLink);
  }

  /**
   * Check if user is logged in
   * @returns {Promise<boolean>}
   */
  async isLoggedIn() {
    const currentUrl = await this.getCurrentUrl();
    return currentUrl.includes('account/account');
  }
}

module.exports = LoginPage;
