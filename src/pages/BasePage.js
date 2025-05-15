const { expect } = require('@playwright/test');
const WebActions = require('../support/web-actions');
const Config = require('../support/config');
require('dotenv').config();

/**
 * BasePage class implements common functionality for all page objects
 * Following the Single Responsibility Principle from SOLID
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseUrl = Config.getBaseUrl();
    this.webActions = new WebActions(page);
  }

  /**
   * Navigate to the base URL
   */
  async navigate() {
    await this.webActions.navigateTo(this.baseUrl);
  }

  /**
   * Navigate to a specific path
   * @param {string} path
   */
  async navigateTo(path) {
    await this.webActions.navigateTo(`${this.baseUrl}${path}`);
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector
   * @param {number} timeout
   * @returns {Promise<import('@playwright/test').ElementHandle>}
   */
  async waitForElement(selector, timeout = 10000) {
    await this.webActions.waitForVisible(selector, { timeout });
    return await this.page.$(selector);
  }

  /**
   * Click on an element
   * @param {string} selector
   */
  async click(selector) {
    await this.webActions.click(selector);
  }

  /**
   * Type text into an input field
   * @param {string} selector
   * @param {string} text
   */
  async type(selector, text) {
    await this.webActions.type(selector, text);
  }

  /**
   * Get text from an element
   * @param {string} selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    return await this.webActions.getText(selector);
  }

  /**
   * Check if an element is visible
   * @param {string} selector
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    return await this.webActions.isVisible(selector);
  }

  /**
   * Get current URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }
  /**
   * Get page title
   * @returns {Promise<string>}
   */
  async getTitle() {
    return this.page.title();
  }

  /**
   * Take a screenshot
   * @param {string} name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `./src/reports/screenshots/${name}.png` });
  }
  
  /**
   * Wait for loading to complete
   * Can be overridden in child classes with specific loading indicators
   */
  async waitForPageLoad() {
    // Wait for network to be idle
    await this.page.waitForLoadState('networkidle');
  }
  
  /**
   * Check if an element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} - True if element is visible
   */
  async isElementVisible(selector) {
    return this.webActions.isVisible(selector);
  }
  
  /**
   * Verify that page URL contains specific text
   * @param {string} urlPart - Text that should be in URL
   * @returns {Promise<boolean>} - True if URL contains the text
   */
  async verifyUrlContains(urlPart) {
    await this.page.waitForURL(new RegExp(urlPart));
    const currentUrl = this.page.url();
    return currentUrl.includes(urlPart);
  }
  
  /**
   * Scroll to element
   * @param {string} selector - Element selector
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}

module.exports = BasePage;
