const HomePage = require('./HomePage');
const LoginPage = require('./LoginPage');
const ProductPage = require('./ProductPage');
const CartPage = require('./CartPage');
const SearchResultPage = require('./SearchResultPage');
const ComparisonPage = require('./ComparisonPage');
const CheckoutPage = require('./CheckoutPage');
const RegisterPage = require('./RegisterPage');

/**
 * PageFactory class following the Factory design pattern
 * It creates and caches page objects on demand
 */
class PageFactory {
  constructor(page) {
    this.page = page;
    this.pages = {};
  }

  /**
   * Get an instance of HomePage
   * @returns {HomePage}
   */
  getHomePage() {
    if (!this.pages.homePage) {
      this.pages.homePage = new HomePage(this.page);
    }
    return this.pages.homePage;
  }

  /**
   * Get an instance of LoginPage
   * @returns {LoginPage}
   */
  getLoginPage() {
    if (!this.pages.loginPage) {
      this.pages.loginPage = new LoginPage(this.page);
    }
    return this.pages.loginPage;
  }

  /**
   * Get an instance of ProductPage
   * @returns {ProductPage}
   */
  getProductPage() {
    if (!this.pages.productPage) {
      this.pages.productPage = new ProductPage(this.page);
    }
    return this.pages.productPage;
  }

  /**
   * Get an instance of CartPage
   * @returns {CartPage}
   */
  getCartPage() {
    if (!this.pages.cartPage) {
      this.pages.cartPage = new CartPage(this.page);
    }
    return this.pages.cartPage;
  }
  /**
   * Get an instance of SearchResultPage
   * @returns {SearchResultPage}
   */
  getSearchResultPage() {
    if (!this.pages.searchResultPage) {
      this.pages.searchResultPage = new SearchResultPage(this.page);
    }
    return this.pages.searchResultPage;
  }

  /**
   * Get an instance of ComparisonPage
   * @returns {ComparisonPage}
   */
  getComparisonPage() {
    if (!this.pages.comparisonPage) {
      this.pages.comparisonPage = new ComparisonPage(this.page);
    }
    return this.pages.comparisonPage;
  }
  /**
   * Get an instance of CheckoutPage
   * @returns {CheckoutPage}
   */
  getCheckoutPage() {
    if (!this.pages.checkoutPage) {
      this.pages.checkoutPage = new CheckoutPage(this.page);
    }
    return this.pages.checkoutPage;
  }
  
  /**
   * Get an instance of RegisterPage
   * @returns {RegisterPage}
   */
  getRegisterPage() {
    if (!this.pages.registerPage) {
      this.pages.registerPage = new RegisterPage(this.page);
    }
    return this.pages.registerPage;
  }
}

module.exports = PageFactory;
