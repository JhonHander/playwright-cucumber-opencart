/**
 * Environment specific configuration
 */
class Environment {
  /**
   * Get environment variable
   * @param {string} name - Environment variable name
   * @param {*} defaultValue - Default value if not set
   * @returns {*} Environment variable value
   */
  static get(name, defaultValue) {
    return process.env[name] || defaultValue;
  }

  /**
   * Get all environment variables
   * @returns {Object} Environment variables
   */
  static getAll() {
    return process.env;
  }

  /**
   * Check if environment is production
   * @returns {boolean} True if production
   */
  static isProduction() {
    return this.get('NODE_ENV', 'development') === 'production';
  }

  /**
   * Check if environment is development
   * @returns {boolean} True if development
   */
  static isDevelopment() {
    return this.get('NODE_ENV', 'development') === 'development';
  }

  /**
   * Check if environment is test
   * @returns {boolean} True if test
   */
  static isTest() {
    return this.get('NODE_ENV', 'development') === 'test';
  }

  /**
   * Get current environment
   * @returns {string} Environment name
   */
  static getCurrentEnvironment() {
    return this.get('NODE_ENV', 'development');
  }

  /**
   * Get user credentials for environment
   * @returns {Object} User credentials
   */
  static getUserCredentials() {
    // Return different credentials based on environment
    const env = this.getCurrentEnvironment();
    
    switch (env) {
      case 'production':
        return {
          email: this.get('PROD_USER_EMAIL', 'production@example.com'),
          password: this.get('PROD_USER_PASSWORD', 'prodpassword')
        };
      case 'test':
        return {
          email: this.get('TEST_USER_EMAIL', 'test@example.com'),
          password: this.get('TEST_USER_PASSWORD', 'testpassword')
        };
      default:
        return {
          email: this.get('DEV_USER_EMAIL', 'dev@example.com'),
          password: this.get('DEV_USER_PASSWORD', 'devpassword')
        };
    }
  }
}

module.exports = Environment;
