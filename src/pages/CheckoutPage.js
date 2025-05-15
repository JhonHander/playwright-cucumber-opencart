const BasePage = require('./BasePage');

/**
 * CheckoutPage class represents the checkout process pages
 */
class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for CheckoutPage elements
    this.checkoutOptions = '#collapse-checkout-option input[type="radio"]';
    this.guestCheckoutOption = 'input[value="guest"]';
    this.registerOption = 'input[value="register"]';
    this.accountLoginOption = 'input[value="login"]';
    this.continueButtonOption = '#button-account';
    
    // Guest checkout form fields
    this.firstNameInput = '#input-payment-firstname';
    this.lastNameInput = '#input-payment-lastname';
    this.emailInput = '#input-payment-email';
    this.telephoneInput = '#input-payment-telephone';
    this.address1Input = '#input-payment-address-1';
    this.cityInput = '#input-payment-city';
    this.postcodeInput = '#input-payment-postcode';
    this.countrySelect = '#input-payment-country';
    this.regionSelect = '#input-payment-zone';
    this.continueButtonGuest = '#button-guest';
    
    // Delivery details
    this.continueButtonDelivery = '#button-shipping-method';
    
    // Payment method
    this.termsCheckbox = 'input[name="agree"]';
    this.continueButtonPayment = '#button-payment-method';
    
    // Confirm order
    this.confirmOrderButton = '#button-confirm';
    
    // Order success
    this.orderSuccessHeading = '#content h1';
    
    // Registered user checkout
    this.continueButtonPaymentAddress = '#button-payment-address';
    this.useExistingAddressRadio = 'input[name="payment_address"][value="existing"]';
    
    // Order confirmation
    this.successAlert = '.alert-success';
  }

  /**
   * Choose guest checkout option
   */
  async selectGuestCheckout() {
    await this.click(this.guestCheckoutOption);
    await this.click(this.continueButtonOption);
  }

  /**
   * Fill in guest checkout billing details
   * @param {Object} details - Billing details
   */
  async fillBillingDetails(details) {
    await this.waitForElement(this.firstNameInput);
    
    await this.type(this.firstNameInput, details.firstName);
    await this.type(this.lastNameInput, details.lastName);
    await this.type(this.emailInput, details.email);
    await this.type(this.telephoneInput, details.telephone);
    await this.type(this.address1Input, details.address1);
    await this.type(this.cityInput, details.city);
    await this.type(this.postcodeInput, details.postcode);
    
    await this.page.selectOption(this.countrySelect, { label: details.country });
    // Wait for region options to load
    await this.page.waitForTimeout(1000);
    await this.page.selectOption(this.regionSelect, { label: details.region });
  }

  /**
   * Continue to delivery details
   */
  async continueToDeliveryDetails() {
    await this.click(this.continueButtonGuest);
  }

  /**
   * Continue with default delivery method
   */
  async continueWithDeliveryMethod() {
    await this.click(this.continueButtonDelivery);
  }

  /**
   * Agree to terms and conditions
   */
  async agreeToTerms() {
    await this.page.check(this.termsCheckbox);
  }

  /**
   * Continue to payment method
   */
  async continueToPaymentMethod() {
    await this.click(this.continueButtonPayment);
  }

  /**
   * Confirm the order
   */
  async confirmOrder() {
    await this.click(this.confirmOrderButton);
    // Wait for order processing
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if order is successful
   * @returns {Promise<boolean>}
   */
  async isOrderSuccessful() {
    await this.waitForElement(this.orderSuccessHeading);
    const heading = await this.getText(this.orderSuccessHeading);
    return heading.includes('Your order has been placed');
  }

  /**
   * Use existing address for registered user
   */
  async useSavedAddress() {
    await this.waitForElement(this.useExistingAddressRadio);
    await this.page.check(this.useExistingAddressRadio);
    await this.click(this.continueButtonPaymentAddress);
  }
}

module.exports = CheckoutPage;
