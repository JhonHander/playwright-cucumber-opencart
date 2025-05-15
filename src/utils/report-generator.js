const reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');
const Config = require('../support/config');

// Get configuration
const reportsDir = Config.getReportsDir();
const screenshotsDir = path.join(reportsDir, 'screenshots');
const videosDir = path.join(reportsDir, 'videos');
const jsonReportPath = path.join(reportsDir, 'cucumber-report.json');
const htmlReportPath = path.join(reportsDir, 'cucumber-html-report');

// Ensure all directories exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

ensureDirectoryExists(reportsDir);
ensureDirectoryExists(screenshotsDir);
ensureDirectoryExists(videosDir);

// Get OS name
function getOSName() {
  const platform = process.platform;
  if (platform === 'win32') return 'windows';
  if (platform === 'darwin') return 'osx';
  if (platform === 'linux') return 'linux';
  return platform;
}

// Determine browser info
function getBrowserInfo() {
  const browser = Config.getBrowser().toLowerCase();
  const browserInfo = {
    name: browser,
    version: browser === 'chrome' ? '114' : (browser === 'firefox' ? '113' : '112')
  };
  return browserInfo;
}

// Check if the JSON report file exists
if (!fs.existsSync(jsonReportPath)) {
  console.error(`Error: Report file ${jsonReportPath} does not exist.`);
  console.log('Make sure to run tests before generating reports.');
  process.exit(1);
}

// Generate report
reporter.generate({
  jsonDir: reportsDir,
  reportPath: htmlReportPath,
  metadata: {
    browser: getBrowserInfo(),
    device: 'Local test machine',
    platform: {
      name: getOSName(),
      version: process.env.OS_VERSION || 'latest'
    },
  },
  customData: {
    title: 'OpenCart Test Execution Report',
    data: [
      { label: 'Project', value: 'OpenCart BDD Testing' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Date', value: new Date().toISOString().slice(0, 10) },
      { label: 'Browser', value: Config.getBrowser() }
    ],
  },
  disableLog: true,
  pageTitle: 'OpenCart Test Report',
  reportName: 'OpenCart BDD Test Automation Report',
  displayDuration: true,
});

console.log(`Report generated successfully at: ${htmlReportPath}`);

// Try to attach screenshots and videos to report
try {
  console.log('Checking for screenshots and videos to attach to report...');
  
  // Check if screenshots exist
  if (fs.existsSync(screenshotsDir)) {
    const screenshots = fs.readdirSync(screenshotsDir);
    if (screenshots.length > 0) {
      console.log(`Found ${screenshots.length} screenshots.`);
    } else {
      console.log('No screenshots found.');
    }
  }
  
  // Check if videos exist
  if (fs.existsSync(videosDir)) {
    const videos = fs.readdirSync(videosDir);
    if (videos.length > 0) {
      console.log(`Found ${videos.length} videos.`);
    } else {
      console.log('No videos found.');
    }
  }
} catch (error) {
  console.error('Error processing media attachments:', error.message);
}
