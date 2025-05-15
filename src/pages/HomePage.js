const BasePage = require('./BasePage');

/**
 * HomePage class represents the OpenCart homepage
 */
class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for HomePage elements
    this.searchInput = '#search input[name="search"]';
    this.searchButton = '#search button';
    this.myAccountDropdown = '.dropdown .dropdown-toggle[title="My Account"]';
    this.loginOption = '.dropdown-menu a[href$="account/login"]';
    this.registerOption = '.dropdown-menu a[href$="account/register"]';
    this.cartButton = '#cart button';
    this.featuredProducts = '.product-layout';
    this.addToCartButtons = 'button[onclick*="cart.add"]';
    this.navigationMenu = '#menu';
    this.navigationItems = '#menu .dropdown';
    this.currencyDropdown = '.btn-group button[data-toggle="dropdown"] span';
    this.logo = '#logo';
  }

  /**
   * Navigate to the homepage
   */
  async navigateToHomePage() {
    await this.navigate();
  }

  /**
   * Search for a product
   * @param {string} searchTerm
   */
  async searchProduct(searchTerm) {
    await this.type(this.searchInput, searchTerm);
    await this.click(this.searchButton);
  }

  /**
   * Open My Account dropdown menu
   */
  async openMyAccountDropdown() {
    await this.click(this.myAccountDropdown);
  }

  /**
   * Navigate to Login page
   */
  async navigateToLogin() {
    await this.openMyAccountDropdown();
    await this.click(this.loginOption);
  }

  /**
   * Navigate to Register page
   */
  async navigateToRegister() {
    await this.openMyAccountDropdown();
    await this.click(this.registerOption);
  }

  /**
   * Get number of featured products
   * @returns {Promise<number>}
   */
  async getFeaturedProductsCount() {
    await this.waitForElement(this.featuredProducts);
    const products = await this.page.$$(this.featuredProducts);
    return products.length;
  }

  /**
   * Add a product to cart by index (0-based)
   * @param {number} index
   */
  async addProductToCartByIndex(index) {
    const addToCartButtons = await this.page.$$(this.addToCartButtons);
    if (index < addToCartButtons.length) {
      await addToCartButtons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range`);
    }
  }

  /**
   * Click on the cart button
   */
  async openCart() {
    await this.click(this.cartButton);
  }

  /**
   * Navigate to a specific category
   * @param {string} category
   * @param {string} subcategory - optional
   */
  async navigateToCategory(category, subcategory = null) {
    // Find the category in the navigation menu
    const items = await this.page.$$(this.navigationItems);
    
    for (const item of items) {
      const categoryText = await item.$('a.dropdown-toggle');
      const text = await categoryText.textContent();
      
      if (text.trim() === category) {
        // Hover on the category to reveal subcategories
        await categoryText.hover();
        
        if (subcategory) {
          // If a subcategory is specified, find and click it
          const subcategoryLinks = await item.$$('.dropdown-menu a');
          for (const link of subcategoryLinks) {
            const subText = await link.textContent();
            if (subText.trim() === subcategory) {
              await link.click();
              return;
            }
          }
          throw new Error(`Subcategory ${subcategory} not found`);
        } else {
          // If no subcategory, click the main category
          await categoryText.click();
          return;
        }
      }
    }
    throw new Error(`Category ${category} not found`);
  }
}

module.exports = HomePage;
