const dotenv = require('dotenv');
dotenv.config();

// Read from environment variables with defaults
const PARALLEL = process.env.PARALLEL || 2;
const RETRIES = process.env.RETRIES || 1;

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:src/reports/cucumber-report.html',
      'json:src/reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true,
    parallel: parseInt(PARALLEL),
    retry: parseInt(RETRIES)
  },
  
  headed: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:src/reports/cucumber-report.html',
      'json:src/reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true,
    worldParameters: {
      headless: false,
      slowMo: 100 // Add slight delay for better visibility
    }
  },
  // Configuration for dry run - verifies steps without executing them
  dryrun: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.js'],
    format: ['progress-bar'],
    dryRun: true,
    publishQuiet: true
  },
  // Configuration to rerun failed tests
  rerun: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:src/reports/cucumber-report.html',
      'json:src/reports/cucumber-report.json',
      'rerun:@rerun.txt'
    ],
    parallel: parseInt(PARALLEL),
    publishQuiet: true
  }
};
