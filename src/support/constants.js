/**
 * Common constants used throughout the test framework
 */
const Constants = {
  /**
   * Time constants (in milliseconds)
   */
  TIME: {
    XS: 1000,         // 1 second
    S: 3000,          // 3 seconds
    M: 5000,          // 5 seconds
    L: 10000,         // 10 seconds
    XL: 30000,        // 30 seconds
    XXL: 60000        // 60 seconds
  },
  
  /**
   * Product IDs for OpenCart demo site
   */
  PRODUCT_IDS: {
    IPHONE: 40,       // iPhone
    MACBOOK: 43,      // MacBook
    MACBOOK_AIR: 44,  // MacBook Air
    MACBOOK_PRO: 45,  // MacBook Pro
    SAMSUNG_TAB: 49,  // Samsung Galaxy Tab 10.1
    SONY_VAIO: 46,    // Sony VAIO
    HP_LP3065: 47,    // HP LP3065
    CANON_EOS: 30     // Canon EOS 5D
  },
  
  /**
   * Common error messages
   */
  ERROR_MESSAGES: {
    EMPTY_CART: 'Your shopping cart is empty!',
    LOGIN_INVALID: 'Warning: No match for E-Mail Address and/or Password',
    REQUIRED_FIELD: 'This field is required'
  },
  
  /**
   * Validation constants
   */
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 4,
    MAX_TELEPHONE_LENGTH: 32
  },
  
  /**
   * URL routes in OpenCart
   */
  ROUTES: {
    HOME: 'common/home',
    LOGIN: 'account/login',
    REGISTER: 'account/register',
    ACCOUNT: 'account/account',
    CART: 'checkout/cart',
    CHECKOUT: 'checkout/checkout',
    PRODUCT: 'product/product',
    CATEGORY: 'product/category',
    SEARCH: 'product/search',
    COMPARE: 'product/compare'
  }
};

module.exports = Constants;
