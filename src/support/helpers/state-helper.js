/**
 * StateHelper provides methods to set up application state
 */
class StateHelper {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Add a product to cart directly via URL
   * @param {number} productId - Product ID
   * @param {number} quantity - Quantity (default: 1)
   */
  async addProductToCart(productId, quantity = 1) {
    await this.page.goto(`https://opencart.abstracta.us/index.php?route=checkout/cart/add&product_id=${productId}&quantity=${quantity}`);
    // Wait for cart to update
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clear the shopping cart via URL
   */
  async clearCart() {
    await this.page.goto('https://opencart.abstracta.us/index.php?route=checkout/cart');
    
    // Check if cart has items
    const isEmpty = await this.page.evaluate(() => {
      return document.body.textContent.includes('Your shopping cart is empty');
    });
    
    if (!isEmpty) {
      // If cart has items, try to remove them
      const removeButtons = await this.page.$$('button[data-original-title="Remove"]');
      for (const button of removeButtons) {
        await button.click();
        // Wait for cart to update
        await this.page.waitForLoadState('networkidle');
      }
    }
  }

  /**
   * Set a cookie
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   */
  async setCookie(name, value) {
    await this.page.context().addCookies([{
      name,
      value,
      url: 'https://opencart.abstracta.us',
    }]);
  }

  /**
   * Clear all cookies
   */
  async clearCookies() {
    await this.page.context().clearCookies();
  }

  /**
   * Set language preference
   * @param {string} language - Language code
   */
  async setLanguage(language) {
    await this.page.goto(`https://opencart.abstracta.us/index.php?route=common/home&language=${language}`);
  }

  /**
   * Set currency
   * @param {string} currency - Currency code (USD, EUR, GBP)
   */
  async setCurrency(currency) {
    await this.page.goto(`https://opencart.abstracta.us/index.php?route=common/home&currency=${currency}`);
  }
}

module.exports = StateHelper;
