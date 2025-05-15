const BasePage = require('./BasePage');

/**
 * ProductPage class represents product details page
 */
class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for ProductPage elements
    this.productTitle = 'h1';
    this.productPrice = '.price-new, .price:not(.price-new)';
    this.quantityInput = '#input-quantity';
    this.addToCartButton = '#button-cart';
    this.productDescriptionTab = 'a[href="#tab-description"]';
    this.productSpecificationTab = 'a[href="#tab-specification"]';
    this.productReviewsTab = 'a[href="#tab-review"]';
    this.reviewAuthorInput = '#input-name';
    this.reviewTextInput = '#input-review';
    this.ratingInputs = 'input[name="rating"]';
    this.submitReviewButton = '#button-review';
    this.successAlert = '.alert-success';
    this.warningAlert = '.alert-danger';
    this.relatedProducts = '.product-related .product-layout';
    this.wishlistButton = 'button[data-original-title="Add to Wish List"]';
    this.compareButton = 'button[data-original-title="Compare this Product"]';
  }

  /**
   * Navigate to a product page by id
   * @param {number} productId
   */
  async navigateToProduct(productId) {
    await this.navigateTo(`?route=product/product&product_id=${productId}`);
  }

  /**
   * Get product title
   * @returns {Promise<string>}
   */
  async getProductTitle() {
    return await this.getText(this.productTitle);
  }

  /**
   * Get product price
   * @returns {Promise<string>}
   */
  async getProductPrice() {
    return await this.getText(this.productPrice);
  }

  /**
   * Add product to cart with specified quantity
   * @param {number} quantity
   */
  async addToCart(quantity = 1) {
    if (quantity > 1) {
      await this.type(this.quantityInput, quantity.toString());
    }
    await this.click(this.addToCartButton);
  }

  /**
   * Click on description tab
   */
  async clickDescriptionTab() {
    await this.click(this.productDescriptionTab);
  }

  /**
   * Click on specification tab
   */
  async clickSpecificationTab() {
    await this.click(this.productSpecificationTab);
  }

  /**
   * Click on reviews tab
   */
  async clickReviewsTab() {
    await this.click(this.productReviewsTab);
  }

  /**
   * Submit a product review
   * @param {string} name
   * @param {string} text
   * @param {number} rating - From 1 to 5
   */
  async submitReview(name, text, rating) {
    await this.clickReviewsTab();
    await this.type(this.reviewAuthorInput, name);
    await this.type(this.reviewTextInput, text);
    
    // Select rating (1-5)
    const ratingIndex = Math.min(Math.max(rating, 1), 5) - 1;
    const ratingInputs = await this.page.$$(this.ratingInputs);
    await ratingInputs[ratingIndex].click();
    
    await this.click(this.submitReviewButton);
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
   * Add product to wishlist
   */
  async addToWishlist() {
    await this.click(this.wishlistButton);
  }

  /**
   * Add product to compare
   */
  async addToCompare() {
    await this.click(this.compareButton);
  }

  /**
   * Get count of related products
   * @returns {Promise<number>}
   */
  async getRelatedProductsCount() {
    const relatedProducts = await this.page.$$(this.relatedProducts);
    return relatedProducts.length;
  }
}

module.exports = ProductPage;
