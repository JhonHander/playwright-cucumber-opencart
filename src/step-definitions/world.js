const { setWorldConstructor } = require('@playwright/test');
const { chromium, firefox, webkit } = require('@playwright/test');
const PageFactory = require('../pages/PageFactory');
const Config = require('../support/config');
const testData = require('../fixtures/test-data');
const Constants = require('../support/constants');
const DataHelper = require('../support/helpers/data-helper');
const StateHelper = require('../support/helpers/state-helper');
const TagHelper = require('../support/helpers/tag-helper');

/**
 * Custom world class for Cucumber
 * Manages browser, context and page instances
 * Also creates and manages page objects
 */
class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.pageFactory = null;
    this.stateHelper = null;
    this.pageErrors = [];
    this.testData = {}; // Store test data to share between steps
    this.config = Config; // Access to config
    this.globalTestData = testData; // Access to test data
    this.constants = Constants; // Access to constants
    this.dataHelper = DataHelper; // Access to data helper
    this.tagHelper = TagHelper; // Access to tag helper    this.pageErrors = [];
    this.testData = {}; // Store test data to share between steps
    this.config = Config; // Access to config
    this.globalTestData = testData; // Access to test data
    this.constants = Constants; // Access to constants
    this.dataHelper = DataHelper; // Access to data helper
    this.tagHelper = TagHelper; // Access to tag helper
  }

  /**
   * Set up browser, context and page
   */
  async setUp() {
    // Get browser configuration
    const browserType = this.config.getBrowser();
    const options = this.config.getBrowserOptions();
    
    // Launch browser based on configuration
    switch(browserType.toLowerCase()) {
      case 'firefox':
        this.browser = await firefox.launch({ headless: options.headless, slowMo: options.slowMo });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless: options.headless, slowMo: options.slowMo });
        break;
      default:
        this.browser = await chromium.launch({ headless: options.headless, slowMo: options.slowMo });
    }
      this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      acceptDownloads: true,
      recordVideo: this.config.getMediaConfig().video ? { dir: 'src/reports/videos/' } : undefined
    });
    
    this.page = await this.context.newPage();
    this.pageFactory = new PageFactory(this.page);
    this.stateHelper = new StateHelper(this.page);
    
    // Listen for console errors
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.pageErrors.push(`${msg.text()}`);
      }
    });
    
    // Listen for page errors
    this.page.on('pageerror', error => {
      this.pageErrors.push(`Page error: ${error.message}`);
    });
  }

  /**
   * Clean up resources after test
   */
  async tearDown() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
