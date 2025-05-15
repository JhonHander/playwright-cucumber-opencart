require('dotenv').config();

/**
 * Global configuration for test automation
 */
class Config {
  /**
   * Get browser based on environmental variables or default to chrome
   * @returns {string} browser name
   */
  static getBrowser() {
    return process.env.BROWSER || 'chrome';
  }

  /**
   * Get base URL from environment variables
   * @returns {string} base URL
   */
  static getBaseUrl() {
    return process.env.BASE_URL || 'https://opencart.abstracta.us/';
  }

  /**
   * Get browser options
   * @returns {Object} browser options
   */
  static getBrowserOptions() {
    return {
      headless: process.env.HEADLESS === 'true',
      slowMo: parseInt(process.env.SLOW_MO || '0'),
      timeout: parseInt(process.env.TIMEOUT || '30000'),
      args: ['--start-maximized', '--disable-notifications']
    };
  }

  /**
   * Get retry configuration
   * @returns {Object} retry configuration
   */
  static getRetryConfig() {
    return {
      retries: parseInt(process.env.RETRIES || '1'),
      minTimeout: parseInt(process.env.MIN_TIMEOUT || '5000'),
      maxTimeout: parseInt(process.env.MAX_TIMEOUT || '10000')
    };
  }

  /**
   * Get screenshot and video configuration
   * @returns {Object} media configuration
   */
  static getMediaConfig() {
    return {
      screenshot: process.env.SCREENSHOT === 'true',
      video: process.env.VIDEO === 'true'
    };
  }

  /**
   * Get test data directory 
   * @returns {string} test data directory
   */
  static getTestDataDir() {
    return process.env.TEST_DATA_DIR || 'src/fixtures';
  }

  /**
   * Get reports directory
   * @returns {string} reports directory
   */
  static getReportsDir() {
    return process.env.REPORTS_DIR || 'src/reports';
  }
}

module.exports = Config;
