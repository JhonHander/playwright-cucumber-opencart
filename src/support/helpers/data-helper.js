/**
 * DataHelper class provides methods for generating random test data
 */
class DataHelper {
  /**
   * Generate a random email address
   * @param {string} domain - Domain name (default: example.com)
   * @returns {string} Random email address
   */
  static generateRandomEmail(domain = 'example.com') {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `test_user_${randomString}_${timestamp}@${domain}`;
  }

  /**
   * Generate a random string
   * @param {number} length - Length of string (default: 8)
   * @returns {string} Random string
   */
  static generateRandomString(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate a random number
   * @param {number} min - Minimum value (default: 1)
   * @param {number} max - Maximum value (default: 1000)
   * @returns {number} Random number
   */
  static generateRandomNumber(min = 1, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random phone number
   * @returns {string} Random phone number
   */
  static generateRandomPhoneNumber() {
    return `${this.generateRandomNumber(100, 999)}${this.generateRandomNumber(100, 999)}${this.generateRandomNumber(1000, 9999)}`;
  }

  /**
   * Generate random user details
   * @returns {Object} User details
   */
  static generateRandomUser() {
    const firstName = `TestUser${this.generateRandomString(4)}`;
    const lastName = `LastName${this.generateRandomString(4)}`;
    const email = this.generateRandomEmail();
    const password = `Password${this.generateRandomNumber(100, 999)}`;
    
    return {
      firstName,
      lastName,
      email,
      password,
      telephone: this.generateRandomPhoneNumber()
    };
  }

  /**
   * Generate random address details
   * @returns {Object} Address details
   */
  static generateRandomAddress() {
    return {
      address1: `${this.generateRandomNumber(1, 9999)} Test Street`,
      city: `Test City ${this.generateRandomString(3)}`,
      postcode: `${this.generateRandomNumber(10000, 99999)}`,
      country: 'United States',
      region: 'Florida'
    };
  }
}

module.exports = DataHelper;
