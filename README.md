# BDD Testing Framework for OpenCart

This project implements a BDD (Behavior-Driven Development) testing framework for the OpenCart demo website (https://opencart.abstracta.us/) using Playwright and Cucumber.

## Architecture

The project follows a Page Object Model (POM) architecture with SOLID principles:

- **Page Objects**: Encapsulate the interaction with web pages
- **Step Definitions**: Implement the Gherkin steps
- **Features**: Define scenarios using Gherkin syntax
- **Cucumber**: Runs the BDD tests
- **Playwright**: Handles browser automation
- **Support Classes**: Provides utilities and helpers for tests

## Directory Structure

```
├── cucumber.js            # Cucumber configuration
├── package.json           # Project dependencies
├── playwright.config.js   # Playwright configuration
├── .env                   # Environment variables
└── src
    ├── features           # Gherkin feature files
    ├── fixtures           # Test data
    ├── pages              # Page objects
    ├── reports            # Test reports
    ├── step-definitions   # Step implementations
    ├── support            # Support classes
    │   ├── helpers        # Helper utilities
    │   ├── config.js      # Configuration
    │   ├── constants.js   # Constants
    │   ├── environment.js # Environment-specific config
    │   └── web-actions.js # Web interaction utilities
    └── utils              # Utility functions
```

## Features

The project includes 7 feature files with increasing complexity:

1. **Product Search (01-product-search.feature)**
   - Basic search functionality
   - Verifying search results

2. **Product Filtering & Sorting (02-product-filtering-sorting.feature)**
   - Advanced filtering options
   - Sorting products by different criteria

3. **Shopping Cart (03-shopping-cart.feature)**
   - Adding products to cart
   - Updating quantities
   - Removing products

4. **Product Comparison (04-product-comparison.feature)**
   - Adding products to comparison
   - Comparing product features
   - Navigating from comparison to cart

5. **Checkout Process (05-checkout-process.feature)**
   - Guest checkout
   - Registered user checkout
   - Delivery and payment options

6. **User Registration (06-user-registration.feature)**
   - Account creation
   - Validation of required fields
   - Error handling for duplicate emails

7. **End-to-End Shopping Experience (07-end-to-end-shopping.feature)**
   - Complete user journey from registration to checkout
   - Multiple product management
   - Cart quantity updates
   - Full order completion

1. **Product Search**: Basic search functionality
2. **Product Filtering & Sorting**: Filtering and sorting search results
3. **Shopping Cart**: Cart operations
4. **Product Comparison**: Comparing multiple products
5. **Checkout Process**: Complete checkout process
6. **User Registration**: Account registration

## How to Run Tests

To run the tests, you have several options:

### Run all tests
```bash
npm test
```

### Run tests with visible browser (headed mode)
```bash
npm run test:headed
```

### Run specific test suites
```bash
npm run test:product-search
npm run test:filtering
npm run test:cart
npm run test:comparison
npm run test:checkout
npm run test:registration
npm run test:e2e
```

### Run end-to-end tests with visible browser
```bash
npm run test:e2e:headed
```

### Run tests in parallel
```bash
npm run test:parallel
```

### Run with retries for flaky tests
```bash
npm run test:retry
```

### Run in dry-run mode (validates feature files without execution)
```bash
npm run dry:test
```

### Re-run failed tests only
```bash
npm run failed:test
```

### Generate reports
```bash
npm run report:generate
```
npm run test:comparison
npm run test:checkout
npm run test:registration
```

### Generate reports
```bash
npm run report:generate
```

## Reports

After running the tests, you can generate HTML reports using:

```bash
npm run report:generate
```

The reports will be available in the `src/reports/cucumber-html-report` directory.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`

## Best Practices Implemented

This framework follows several best practices:

- **SOLID Principles**: Each class has a single responsibility
- **Page Object Model**: Separation of page interactions from test logic
- **BDD**: Using Gherkin for human-readable test scenarios
- **Atomic Tests**: Each test is independent and does not rely on others
- **Clean Code**: Proper documentation and code organization
- **Reporting**: Comprehensive test reports

## Environment Variables

The `.env` file contains configuration variables:

- `BASE_URL`: The base URL of the OpenCart website

## License

This project is licensed under the ISC License.
