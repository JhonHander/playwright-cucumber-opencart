const { expect } = require('@playwright/test');

/**
 * WebActions class provides reusable methods for web element interactions
 */
class WebActions {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to URL
   * @param {string} url - URL to navigate to
   */
  async navigateTo(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Click on element
   * @param {string} selector - Element selector
   * @param {Object} options - Click options
   */
  async click(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.click(selector, options);
  }

  /**
   * Type into input field
   * @param {string} selector - Element selector
   * @param {string} text - Text to type
   */
  async type(selector, text) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.fill(selector, text);
  }

  /**
   * Get text of element
   * @param {string} selector - Element selector
   * @returns {Promise<string>} Text content
   */
  async getText(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} Is visible
   */
  async isVisible(selector) {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Select option from dropdown
   * @param {string} selector - Element selector
   * @param {string|Object} value - Option value or label
   */
  async selectOption(selector, value) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.selectOption(selector, value);
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `src/reports/screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {Object} options - Wait options
   */
  async waitForVisible(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: 'visible', ...options });
  }

  /**
   * Wait for element to be hidden
   * @param {string} selector - Element selector
   * @param {Object} options - Wait options
   */
  async waitForHidden(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: 'hidden', ...options });
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify element contains text
   * @param {string} selector - Element selector
   * @param {string} text - Expected text
   */
  async expectToContainText(selector, text) {
    const content = await this.getText(selector);
    expect(content).toContain(text);
  }

  /**
   * Verify element is visible
   * @param {string} selector - Element selector
   */
  async expectToBeVisible(selector) {
    const isVisible = await this.isVisible(selector);
    expect(isVisible).toBe(true);
  }

  /**
   * Verify element is not visible
   * @param {string} selector - Element selector
   */
  async expectToBeHidden(selector) {
    const isVisible = await this.isVisible(selector);
    expect(isVisible).toBe(false);
  }

  /**
   * Get count of elements
   * @param {string} selector - Element selector
   * @returns {Promise<number>} Element count
   */
  async getElementCount(selector) {
    return await this.page.$$(selector).then(elements => elements.length);
  }
}

module.exports = WebActions;
