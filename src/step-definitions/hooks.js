const { Before, After, BeforeAll, AfterAll, Status } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');
const Config = require('../support/config');
const FileHelper = require('../support/helpers/file-helper');

// Create necessary directories
BeforeAll(async function() {
  const screenshotsDir = path.join(Config.getReportsDir(), 'screenshots');
  const videosDir = path.join(Config.getReportsDir(), 'videos');
  const logsDir = path.join(Config.getReportsDir(), 'logs');
  
  // Use FileHelper to create directories
  FileHelper.createDirectoryIfNotExists(screenshotsDir);
  FileHelper.createDirectoryIfNotExists(videosDir);
  FileHelper.createDirectoryIfNotExists(logsDir);
  
  console.log('Test execution started - Directories created');
});

// Log after all tests finish
AfterAll(async function() {
  console.log('Test execution completed');
});

// Before each scenario
Before(async function(scenario) {
  console.log(`Starting scenario: ${scenario.pickle.name}`);
  
  // Set up browser and page
  await this.setUp();
  
  // Store scenario info for later
  this.currentScenario = scenario;
  
  // Clear test data for this scenario
  this.testData = {};
  
  // Reset page errors collection
  this.pageErrors = [];
  
  // Log scenario details
  const featureName = scenario.gherkinDocument.feature.name;
  const tags = scenario.pickle.tags.map(tag => tag.name).join(', ');
  console.log(`Feature: ${featureName}`);
  console.log(`Tags: ${tags || 'None'}`);
});

// After each scenario
After(async function(scenario) {
  const scenarioName = scenario.pickle.name;
  const status = scenario.result.status;
  console.log(`Scenario ended with status: ${status}`);
  
  // Take screenshot regardless of outcome for reporting
  const screenshotFileName = `${scenarioName.replace(/[^a-zA-Z0-9]/g, '_')}-${status}.png`;
  const screenshotPath = path.join(Config.getReportsDir(), 'screenshots', screenshotFileName);
  
  try {
    const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await this.attach(screenshot, 'image/png');
    console.log(`Screenshot saved to: ${screenshotPath}`);
  } catch (error) {
    console.error('Error taking screenshot:', error.message);
  }
  
  // On failure, capture more detailed information
  if (status === Status.FAILED) {
    console.log(`Scenario failed: ${scenarioName}`);
    
    // Log console errors
    try {
      const consoleErrors = this.pageErrors || [];
      if (consoleErrors.length > 0) {
        const logFileName = `${scenarioName.replace(/[^a-zA-Z0-9]/g, '_')}-console-errors.log`;
        const logPath = path.join(Config.getReportsDir(), 'logs', logFileName);
        
        const logContent = [
          `Console errors for scenario: ${scenarioName}`,
          `Date: ${new Date().toISOString()}`,
          '-------------------------------------------',
          ...consoleErrors
        ].join('\n');
        
        FileHelper.writeTextFile(logPath, logContent);
        console.log(`Console errors logged to: ${logPath}`);
        await this.attach('Console errors during test:\n' + consoleErrors.join('\n'), 'text/plain');
      }
    } catch (error) {
      console.error('Error collecting console errors:', error.message);
    }
    
    // Capture current URL
    try {
      const currentUrl = this.page.url();
      await this.attach(`Failed at URL: ${currentUrl}`, 'text/plain');
    } catch (error) {
      console.error('Error capturing URL:', error.message);
    }
  }
  
  // Tear down browser
  await this.tearDown();
  
  console.log(`Completed scenario: ${scenarioName} - ${status}`);
});
