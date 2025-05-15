const BasePage = require('./BasePage');

/**
 * ComparisonPage class represents the product comparison page
 */
class ComparisonPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for ComparisonPage elements
    this.comparisonTable = '#content table';
    this.productNames = '#content table tr:nth-child(1) td a strong';
    this.productPrices = '#content table tr:nth-child(3) td:not(:first-child)';
    this.addToCartButtons = '#content table .btn-primary';
    this.removeButtons = '#content table .btn-danger';
    this.emptyComparisonMessage = '#content p';
  }

  /**
   * Navigate to comparison page
   */
  async navigateToComparison() {
    await this.navigateTo('?route=product/compare');
  }

  /**
   * Get number of products in comparison
   * @returns {Promise<number>}
   */
  async getProductCount() {
    if (await this.isVisible(this.productNames)) {
      const productElements = await this.page.$$(this.productNames);
      return productElements.length;
    }
    return 0;
  }

  /**
   * Get product names in comparison
   * @returns {Promise<string[]>}
   */
  async getProductNames() {
    if (await this.isVisible(this.productNames)) {
      const nameElements = await this.page.$$(this.productNames);
      const names = [];
      for (const el of nameElements) {
        names.push(await el.textContent());
      }
      return names;
    }
    return [];
  }

  /**
   * Add product to cart by index (0-based)
   * @param {number} index 
   */
  async addToCartByIndex(index) {
    const buttons = await this.page.$$(this.addToCartButtons);
    if (index < buttons.length) {
      await buttons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range`);
    }
  }

  /**
   * Remove product from comparison by index (0-based)
   * @param {number} index 
   */
  async removeProductByIndex(index) {
    const buttons = await this.page.$$(this.removeButtons);
    if (index < buttons.length) {
      await buttons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range`);
    }
  }

  /**
   * Check if comparison is empty
   * @returns {Promise<boolean>}
   */
  async isComparisonEmpty() {
    if (await this.isVisible(this.emptyComparisonMessage)) {
      const message = await this.getText(this.emptyComparisonMessage);
      return message.includes('no products');
    }
    return false;
  }
}

module.exports = ComparisonPage;
