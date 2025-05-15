const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I add the first product to the cart', async function() {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  await searchResultPage.addProductToCartByIndex(0);
  
  // Wait for the success message to appear
  await this.page.waitForTimeout(1000);
});

Then('I should see a success message', async function() {
  // Success message appears on all pages
  const successAlert = '.alert-success';
  await this.page.waitForSelector(successAlert);
  
  const alertText = await this.page.textContent(successAlert);
  expect(alertText).toContain('Success');
});

Then('the cart should contain {int} item(s)', async function(count) {
  // Navigate to cart to check item count
  const cartPage = this.pageFactory.getCartPage();
  await cartPage.navigateToCart();
  
  const itemCount = await cartPage.getItemCount();
  expect(itemCount).toBe(count);
});

Given('I have added an {string} to my cart', async function(product) {
  // Search for the product
  const homePage = this.pageFactory.getHomePage();
  await homePage.searchProduct(product);
  
  // Add first product to cart
  const searchResultPage = this.pageFactory.getSearchResultPage();
  await searchResultPage.addProductToCartByIndex(0);
  
  // Wait for success message
  await this.page.waitForTimeout(1000);
  
  // Store product for later steps
  this.testData.productAdded = product;
});

When('I navigate to the shopping cart', async function() {
  const cartPage = this.pageFactory.getCartPage();
  await cartPage.navigateToCart();
});

When('I update the quantity of the first product to {int}', async function(quantity) {
  const cartPage = this.pageFactory.getCartPage();
  await cartPage.updateQuantity(0, quantity);
  
  // Wait for cart to update
  await this.page.waitForTimeout(1000);
  
  // Store quantity for later steps
  this.testData.updatedQuantity = quantity;
});

Then('the cart should reflect the updated quantity', async function() {
  // Verify the quantity input field has the updated value
  const cartPage = this.pageFactory.getCartPage();
  const quantityInputs = await this.page.$$(cartPage.productQuantities);
  const inputValue = await quantityInputs[0].inputValue();
  
  expect(parseInt(inputValue)).toBe(this.testData.updatedQuantity);
});

Then('the cart total should be recalculated', async function() {
  // This step verifies the cart total has been recalculated
  // without checking the specific amount
  const cartPage = this.pageFactory.getCartPage();
  const total = await cartPage.getCartTotal();
  
  // Total should be a non-empty string containing currency
  expect(total.length).toBeGreaterThan(0);
  expect(total).toMatch(/[0-9]/);
});

When('I remove the first product from my cart', async function() {
  const cartPage = this.pageFactory.getCartPage();
  await cartPage.removeProduct(0);
  
  // Wait for cart to update
  await this.page.waitForTimeout(1000);
});

Then('the cart should be empty', async function() {
  const cartPage = this.pageFactory.getCartPage();
  const isEmpty = await cartPage.isCartEmpty();
  
  expect(isEmpty).toBe(true);
});

Then('I should see a message indicating my cart is empty', async function() {
  const cartPage = this.pageFactory.getCartPage();
  const emptyMessage = await cartPage.getText(cartPage.emptyCartMessage);
  
  expect(emptyMessage).toContain('empty');
});
