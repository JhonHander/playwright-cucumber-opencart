const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Common steps across features
Given('I am on the OpenCart homepage', async function() {
  const homePage = this.pageFactory.getHomePage();
  await homePage.navigateToHomePage();
  
  // Verify we are on the homepage
  const title = await homePage.getTitle();
  expect(title).toContain('Your Store');
});

When('I search for {string}', async function(searchTerm) {
  const homePage = this.pageFactory.getHomePage();
  await homePage.searchProduct(searchTerm);
  
  // Store search term for later steps
  this.testData.lastSearchTerm = searchTerm;
});

// Search-specific steps
Then('I should see search results containing {string}', async function(keyword) {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  const productNames = await searchResultPage.getProductNames();
  
  // At least one product should contain the keyword
  const matchingProducts = productNames.filter(name => 
    name.toLowerCase().includes(keyword.toLowerCase())
  );
  
  expect(matchingProducts.length).toBeGreaterThan(0);
});

Then('I should see at least {int} product(s) in the results', async function(count) {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  const resultCount = await searchResultPage.getResultCount();
  
  expect(resultCount).toBeGreaterThanOrEqual(count);
});
