const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/features',
  timeout: 60000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 100,
    },
  },
  reporter: [
    ['html', { outputFolder: 'src/reports/playwright-report' }],
    ['json', { outputFile: 'src/reports/playwright-report/test-results.json' }]
  ],
});
