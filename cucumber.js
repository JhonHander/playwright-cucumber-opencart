const dotenv = require('dotenv');
dotenv.config();

// Read from environment variables with defaults
const PARALLEL = process.env.PARALLEL || 2;
const RETRIES = process.env.RETRIES || 1;

module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:src/reports/cucumber-report.html',
      'json:src/reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: parseInt(PARALLEL),
    retry: parseInt(RETRIES)
  },
  
  headed: {
    paths: ['src/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:src/reports/cucumber-report.html',
      'json:src/reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    worldParameters: {
      headless: false,
      slowMo: 100 // Add slight delay for better visibility
    }
  },
  // Configuration for dry run - verifies steps without executing them
  dryrun: {
    paths: ['src/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.js'],
    format: ['progress-bar'],
    dryRun: true
  },
  // Configuration to rerun failed tests
  rerun: {
    paths: ['src/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:src/reports/cucumber-report.html',
      'json:src/reports/cucumber-report.json',
      'rerun:@rerun.txt'
    ],
    parallel: parseInt(PARALLEL)
  }
};
