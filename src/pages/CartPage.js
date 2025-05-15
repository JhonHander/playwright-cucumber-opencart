const BasePage = require('./BasePage');

/**
 * CartPage class represents the shopping cart page
 */
class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for CartPage elements
    this.cartRows = '.table-responsive tbody tr';
    this.productNames = '.table-responsive tbody tr td:nth-child(2) a';
    this.productQuantities = 'input[name^="quantity"]';
    this.updateButtons = 'button[data-original-title="Update"]';
    this.removeButtons = 'button[data-original-title="Remove"]';
    this.cartTotal = '.table-responsive tfoot tr:last-child td:last-child';
    this.checkoutButton = '.buttons a[href*="checkout/checkout"]';
    this.continueShoppingButton = '.buttons a[href*="common/home"]';
    this.emptyCartMessage = '#content p';
    this.couponCodeInput = '#input-coupon';
    this.applyCouponButton = '#button-coupon';
    this.warningAlert = '.alert-danger';
    this.successAlert = '.alert-success';
  }

  /**
   * Navigate to cart page
   */
  async navigateToCart() {
    await this.navigateTo('?route=checkout/cart');
  }

  /**
   * Get number of items in cart
   * @returns {Promise<number>}
   */
  async getItemCount() {
    const cartRows = await this.page.$$(this.cartRows);
    return cartRows.length;
  }

  /**
   * Get all product names in cart
   * @returns {Promise<string[]>}
   */
  async getProductNames() {
    const elements = await this.page.$$(this.productNames);
    const names = [];
    for (const el of elements) {
      names.push(await el.textContent());
    }
    return names;
  }

  /**
   * Update quantity of product by index
   * @param {number} index 
   * @param {number} quantity 
   */
  async updateQuantity(index, quantity) {
    const quantityInputs = await this.page.$$(this.productQuantities);
    const updateButtons = await this.page.$$(this.updateButtons);
    
    if (index < quantityInputs.length) {
      await quantityInputs[index].fill(quantity.toString());
      await updateButtons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range`);
    }
  }

  /**
   * Remove product from cart by index
   * @param {number} index 
   */
  async removeProduct(index) {
    const removeButtons = await this.page.$$(this.removeButtons);
    
    if (index < removeButtons.length) {
      await removeButtons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range`);
    }
  }

  /**
   * Get cart total
   * @returns {Promise<string>}
   */
  async getCartTotal() {
    return await this.getText(this.cartTotal);
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }

  /**
   * Check if cart is empty
   * @returns {Promise<boolean>}
   */
  async isCartEmpty() {
    if (await this.isVisible(this.emptyCartMessage)) {
      const message = await this.getText(this.emptyCartMessage);
      return message.includes('empty');
    }
    return false;
  }

  /**
   * Apply coupon code
   * @param {string} code 
   */
  async applyCoupon(code) {
    await this.type(this.couponCodeInput, code);
    await this.click(this.applyCouponButton);
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
}

module.exports = CartPage;
