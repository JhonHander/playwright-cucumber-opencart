const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const Config = require('./config');

// Set default timeout for steps
const timeout = Config.getBrowserOptions().timeout || 30000;
setDefaultTimeout(timeout);

// Global browser instance to be shared between scenarios
let browser;

// Launch browser once before all tests
BeforeAll(async function() {
  const options = Config.getBrowserOptions();
  browser = await chromium.launch({ 
    headless: options.headless, 
    slowMo: options.slowMo,
    args: options.args
  });
  console.log(`Browser launched with options: ${JSON.stringify(options)}`);
});

// Close browser after all tests
AfterAll(async function() {
  if (browser) {
    await browser.close();
    console.log('Browser closed');
  }
});

// Create a new browser context and page for each scenario
Before(async function() {
  // Create a fresh context for this scenario
  this.context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    acceptDownloads: true,
    recordVideo: Config.getMediaConfig().video ? { dir: 'src/reports/videos/' } : undefined
  });
  
  // Create a new page in the context
  this.page = await this.context.newPage();
  
  // Configure timeouts
  this.page.setDefaultTimeout(timeout);
  
  console.log(`New page created for scenario: ${this.currentScenario?.pickle?.name || 'Unknown'}`);
});

// Close context after each scenario
After(async function() {
  if (this.context) {
    await this.context.close();
    console.log(`Context closed for scenario: ${this.currentScenario?.pickle?.name || 'Unknown'}`);
  }
});

module.exports = {
  browser,
  timeout
};
