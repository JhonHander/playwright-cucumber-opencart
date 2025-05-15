const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Cart Quantity Updates
When('I update the quantity of the first product to {string}', async function(quantity) {
  const cartPage = this.pageFactory.getCartPage();
  await cartPage.updateProductQuantity(0, quantity);
});

When('I update the cart', async function() {
  const cartPage = this.pageFactory.getCartPage();
  await cartPage.updateCart();
});

Then('I should see the updated cart total', async function() {
  const cartPage = this.pageFactory.getCartPage();
  const cartTotal = await cartPage.getCartTotal();
  
  // Verify that the cart total is a positive number
  expect(parseFloat(cartTotal.replace(/[^0-9.-]+/g, ''))).toBeGreaterThan(0);
  
  console.log(`Updated cart total: ${cartTotal}`);
});

Then('I should see {int} products in my cart', async function(expectedCount) {
  const cartPage = this.pageFactory.getCartPage();
  const actualCount = await cartPage.getProductCount();
  
  expect(actualCount).toBe(expectedCount);
});

// Checkout as Guest
When('I choose to checkout as guest', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  await checkoutPage.selectGuestCheckout();
  await checkoutPage.continueToStep2();
});

When('I enter my customer details', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  
  // Generate random user data
  const userDetails = this.dataHelper.generateRandomUser();
  
  // Store for later steps
  this.testData.guestUser = userDetails;
  
  await checkoutPage.enterGuestDetails(userDetails);
});

When('I enter my billing address', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  
  // Generate random address or use existing data
  const addressDetails = this.testData.address || this.dataHelper.generateRandomAddress();
  
  // Store for later steps
  this.testData.address = addressDetails;
  
  await checkoutPage.enterBillingAddress(addressDetails);
  await checkoutPage.continueToStep3();
});

When('I enter my shipping address', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  
  // Use the same address as billing
  await checkoutPage.useExistingShippingAddress();
  await checkoutPage.continueToStep4();
});

When('I select a shipping method', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  await checkoutPage.selectDefaultShippingMethod();
  await checkoutPage.continueToStep5();
});

When('I select a payment method', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  await checkoutPage.selectDefaultPaymentMethod();
  await checkoutPage.agreeToTerms();
  await checkoutPage.continueToStep6();
});

When('I confirm my billing details', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  
  // If we have registered user data, use it
  if (this.testData.registrationDetails) {
    await checkoutPage.confirmExistingBillingDetails();
  } else {
    // Generate random address
    const addressDetails = this.dataHelper.generateRandomAddress();
    this.testData.address = addressDetails;
    await checkoutPage.enterBillingAddress(addressDetails);
  }
  
  await checkoutPage.continueToStep3();
});

When('I confirm my delivery details', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  await checkoutPage.useExistingShippingAddress();
  await checkoutPage.continueToStep4();
});

When('I confirm my delivery method', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  await checkoutPage.selectDefaultShippingMethod();
  await checkoutPage.continueToStep5();
});

When('I agree to the terms and conditions', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  await checkoutPage.agreeToTerms();
  await checkoutPage.continueToStep6();
});

When('I confirm my order', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  await checkoutPage.confirmOrder();
});

Then('I should see a confirmation that my order has been placed', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  const isOrderConfirmed = await checkoutPage.isOrderConfirmed();
  
  expect(isOrderConfirmed).toBe(true);
});

Then('I should see an order number', async function() {
  const checkoutPage = this.pageFactory.getCheckoutPage();
  const orderNumber = await checkoutPage.getOrderNumber();
  
  expect(orderNumber).toBeTruthy();
  console.log(`Order confirmed with number: ${orderNumber}`);
  
  // Store order number for potential future use
  this.testData.orderNumber = orderNumber;
});

When('I return to the homepage', async function() {
  const homePage = this.pageFactory.getHomePage();
  await homePage.navigate();
});
