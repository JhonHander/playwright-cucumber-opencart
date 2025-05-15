const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I add the first product to the comparison', async function() {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  await searchResultPage.addProductToCompareByIndex(0);
  
  // Wait for success message to appear
  await this.page.waitForTimeout(1000);
  
  // Store product info for later steps
  if (!this.testData.comparisonProducts) {
    this.testData.comparisonProducts = [];
  }
  
  const productNames = await searchResultPage.getProductNames();
  this.testData.comparisonProducts.push(productNames[0]);
});

Then('I should see success messages for comparison', async function() {
  // Success message appears on all pages
  const successAlert = '.alert-success';
  await this.page.waitForSelector(successAlert);
  
  const alertText = await this.page.textContent(successAlert);
  expect(alertText).toContain('comparison');
});

Given('I have added the following products to comparison:', async function(dataTable) {
  const products = dataTable.hashes();
  
  if (!this.testData.comparisonProducts) {
    this.testData.comparisonProducts = [];
  }
  
  // Clear previous comparison
  const comparisonPage = this.pageFactory.getComparisonPage();
  await comparisonPage.navigateToComparison();
  
  // Add each product to comparison
  for (const product of products) {
    const homePage = this.pageFactory.getHomePage();
    await homePage.navigateToHomePage();
    await homePage.searchProduct(product['search term']);
    
    const searchResultPage = this.pageFactory.getSearchResultPage();
    await searchResultPage.addProductToCompareByIndex(parseInt(product['product index']));
    
    // Get product name
    const productNames = await searchResultPage.getProductNames();
    this.testData.comparisonProducts.push(productNames[parseInt(product['product index'])]);
    
    // Wait for success message
    await this.page.waitForTimeout(1000);
  }
});

When('I navigate to the product comparison page', async function() {
  const comparisonPage = this.pageFactory.getComparisonPage();
  await comparisonPage.navigateToComparison();
});

Then('I should see both products in the comparison table', async function() {
  const comparisonPage = this.pageFactory.getComparisonPage();
  const productCount = await comparisonPage.getProductCount();
  
  expect(productCount).toBe(2);
});

Then('I should see product details for comparison', async function() {
  const comparisonPage = this.pageFactory.getComparisonPage();
  await this.page.waitForSelector(comparisonPage.comparisonTable);
  
  // Check for product information
  const tableVisible = await comparisonPage.isVisible(comparisonPage.comparisonTable);
  expect(tableVisible).toBe(true);
  
  // Check for product names
  const productNames = await comparisonPage.getProductNames();
  for (const storedName of this.testData.comparisonProducts) {
    const found = productNames.some(name => name.includes(storedName));
    expect(found).toBe(true);
  }
});

When('I add the first product from comparison to the cart', async function() {
  const comparisonPage = this.pageFactory.getComparisonPage();
  await comparisonPage.addToCartByIndex(0);
  
  // Wait for success message
  await this.page.waitForTimeout(1000);
});
