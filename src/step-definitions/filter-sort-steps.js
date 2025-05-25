const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I sort products by {string}', async function(sortOption) {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  await searchResultPage.sortBy(sortOption);
  
  // Wait for sorting to take effect
  await this.page.waitForTimeout(1000);
});

Then('products should be displayed in ascending price order', async function() {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  
  // Get all product prices
  const priceElements = await this.page.$$(searchResultPage.productPrices);
  const prices = [];
  
  for (const priceElement of priceElements) {
    const priceText = await priceElement.textContent();
    // Extract numeric price (remove currency symbol, commas, etc.)
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
    prices.push(price);
  }
  
  // Check if prices are in ascending order
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(JSON.stringify(prices)).toBe(JSON.stringify(sortedPrices));
});

When('I search with the following criteria:', async function(dataTable) {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  const criteria = dataTable.hashes()[0];
  
  await searchResultPage.navigateToSearch();
  await searchResultPage.search(
    criteria.keyword,
    criteria.description === 'true',
  );
  
  // Store search term for later steps
  this.testData.lastSearchTerm = criteria.keyword;
});

When('I change the display limit to {string}', async function(limit) {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  await searchResultPage.setShowLimit(limit);
  
  // Wait for the page to refresh with new limit
  await this.page.waitForTimeout(1000);
});

Then('the page should display up to {int} products per page', async function(limit) {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  const resultCount = await searchResultPage.getResultCount();
  
  // Result count should be less than or equal to the limit
  expect(resultCount).toBeLessThanOrEqual(limit);
});
