/**
 * Test data for OpenCart test scenarios
 */
module.exports = {
  // User credentials
  users: {
    valid: {
      email: 'test@test.com',
      password: 'test123'
    },
    invalid: {
      email: 'invalid@test.com',
      password: 'wrongpassword'
    },
    new: {
      firstName: 'Test',
      lastName: 'User',
      email: `test.user.${Date.now()}@example.com`,
      telephone: '1234567890',
      password: 'Password123',
      newsletter: true,
      agree: true
    }
  },
  
  // Products for search
  products: {
    iphone: {
      name: 'iPhone',
      model: 'product 11',
      price: '$123.20',
      id: 40,
      quantity: 1
    },
    macbook: {
      name: 'MacBook',
      model: 'Product 16',
      price: '$602.00',
      id: 43,
      quantity: 1
    },
    samsung: {
      name: 'Samsung',
      model: 'SAM1',
      price: '$241.99'
    }
  },
  
  // Search terms
  searchTerms: {
    valid: ['iphone', 'mac', 'camera', 'tablet'],
    invalid: ['xyz123', 'nonexistentproduct']
  },
  
  // User registration
  registration: {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    telephone: '1234567890',
    password: 'password123',
    confirmPassword: 'password123'
  },
  
  // Checkout information
  checkout: {
    guest: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      telephone: '1234567890',
      address1: '123 Test Street',
      city: 'Test City',
      postcode: '12345',
      country: 'United States',
      region: 'Florida'
    },
    billing: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      telephone: '9876543210',
      address1: '456 Sample Avenue',
      city: 'Sample City',
      postcode: '54321',
      country: 'United States',
      region: 'California'
    }
  },
  
  // Payment methods
  paymentMethods: {
    cashOnDelivery: 'Cash On Delivery'
  },
  
  // Shipping methods
  shippingMethods: {
    flatRate: 'Flat Shipping Rate'
  }
};
