const BasePage = require('./BasePage');

/**
 * SearchResultPage class represents the search results page
 */
class SearchResultPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for SearchResultPage elements
    this.searchCriteria = '#input-search';
    this.searchInDescriptionCheckbox = '#description';
    this.searchInSubcategoriesCheckbox = '#sub_category';
    this.searchButton = '#button-search';
    this.productCards = '.product-layout';
    this.productNames = '.product-layout .caption h4 a';
    this.productPrices = '.product-layout .price';
    this.sortByDropdown = '#input-sort';
    this.showLimitDropdown = '#input-limit';
    this.noResultsMessage = '#content p:not([class])';
    this.breadcrumbItems = '.breadcrumb li';
    this.gridViewButton = '#grid-view';
    this.listViewButton = '#list-view';
    this.addToCartButtons = 'button[onclick*="cart.add"]';
    this.wishlistButtons = 'button[data-original-title="Add to Wish List"]';
    this.compareButtons = 'button[data-original-title="Compare this Product"]';
  }

  /**
   * Navigate to search page
   */
  async navigateToSearch() {
    await this.navigateTo('?route=product/search');
  }

  /**
   * Perform a search with criteria
   * @param {string} keyword 
   * @param {boolean} searchInDescription 
   * @param {boolean} searchInSubcategories 
   */
  async search(keyword, searchInDescription = false, searchInSubcategories = false) {
    await this.type(this.searchCriteria, keyword);
    
    if (searchInDescription) {
      await this.page.check(this.searchInDescriptionCheckbox);
    }
    
    if (searchInSubcategories) {
      await this.page.check(this.searchInSubcategoriesCheckbox);
    }
    
    await this.click(this.searchButton);
  }

  /**
   * Get number of search results
   * @returns {Promise<number>}
   */
  async getResultCount() {
    const productCards = await this.page.$$(this.productCards);
    return productCards.length;
  }

  /**
   * Get product names from search results
   * @returns {Promise<string[]>}
   */
  async getProductNames() {
    const nameElements = await this.page.$$(this.productNames);
    const names = [];
    for (const el of nameElements) {
      names.push(await el.textContent());
    }
    return names;
  }

  /**
   * Sort results by the given option
   * @param {string} option - e.g., 'name (A - Z)', 'price (Low > High)', etc.
   */
  async sortBy(option) {
    await this.page.selectOption(this.sortByDropdown, { label: option });
  }

  /**
   * Set the number of results to show per page
   * @param {string} limit - e.g., '25', '50', '100', etc.
   */
  async setShowLimit(limit) {
    await this.page.selectOption(this.showLimitDropdown, { label: limit });
  }

  /**
   * Check if no results message is displayed
   * @returns {Promise<boolean>}
   */
  async hasNoResults() {
    if (await this.isVisible(this.noResultsMessage)) {
      const message = await this.getText(this.noResultsMessage);
      return message.includes('no products');
    }
    return false;
  }

  /**
   * Click grid view button
   */
  async clickGridView() {
    await this.click(this.gridViewButton);
  }

  /**
   * Click list view button
   */
  async clickListView() {
    await this.click(this.listViewButton);
  }

  /**
   * Add product to cart by index (0-based)
   * @param {number} index 
   */
  async addProductToCartByIndex(index) {
    const productCardsSelector = '.product-layout';
    const noResultsMessageSelector = '#content p:not([class])';
    const addToCartButtonsSelector = 'button[onclick*="cart.add"]';

    await this.page.waitForSelector(`${productCardsSelector}, ${noResultsMessageSelector}`);

    let noResults = false;
    if (await this.isVisible(noResultsMessageSelector)) {
      const message = await this.getText(noResultsMessageSelector);
      noResults = message.includes('no products');
    }
    if (noResults) {
      throw new Error(`Cannot add product to cart: No products found for the search criteria.`);
    }

    // Esperar específicamente el botón en el índice dado
    const specificButtonSelector = `${addToCartButtonsSelector} >> nth=${index}`;
    try {
      await this.page.waitForSelector(specificButtonSelector, { state: 'visible', timeout: 7000 });
    } catch (e) {
      const currentButtons = await this.page.$$(addToCartButtonsSelector);
      throw new Error(`Product at index ${index} (selector: ${specificButtonSelector}) not visible after waiting. Found ${currentButtons.length} total add-to-cart buttons.`);
    }
    
    // Hacemos clic directamente en el botón específico que ya sabemos que está visible.
    // No es estrictamente necesario volver a consultarlos todos con page.$$, pero lo mantenemos por si hay alguna lógica futura.
    const buttons = await this.page.$$(addToCartButtonsSelector); 
    if (index < buttons.length) { // Doble verificación, aunque waitForSelector debería haber fallado si no existe.
      await this.page.locator(specificButtonSelector).click(); // Usar locator(...).click() es más directo aquí.
      await this.page.waitForTimeout(1000); 
    } else {
      // Este caso debería ser muy raro si el waitForSelector anterior tuvo éxito.
      throw new Error(`Product index ${index} is out of range after specific wait. Found ${buttons.length} buttons. Selector: ${addToCartButtonsSelector}`);
    }
  }

  /**
   * Add product to wishlist by index (0-based)
   * @param {number} index 
   */
  async addProductToWishlistByIndex(index) {
    const buttons = await this.page.$$(this.wishlistButtons);
    if (index < buttons.length) {
      await buttons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range`);
    }
  }

  /**
   * Add product to compare by index (0-based)
   * @param {number} index 
   */
  async addProductToCompareByIndex(index) {
    const buttons = await this.page.$$(this.compareButtons);
    if (index < buttons.length) {
      await buttons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range`);
    }
  }

  /**
   * Click on a product by index (0-based)
   * @param {number} index 
   */
  async clickProductByIndex(index) {
    const nameElements = await this.page.$$(this.productNames);
    if (index < nameElements.length) {
      await nameElements[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range`);
    }
  }
}

module.exports = SearchResultPage;
