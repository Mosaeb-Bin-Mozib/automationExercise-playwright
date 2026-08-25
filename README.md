# Automation Exercise - Playwright Test Automation

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript\&logoColor=black)
![Test Automation](https://img.shields.io/badge/Testing-UI%20Automation-blue)

A Playwright-based end-to-end test automation framework for [Automation Exercise](https://automationexercise.com/), a practice e-commerce website designed for QA automation engineers.

The project demonstrates maintainable UI test automation using **Playwright**, **JavaScript**, **Page Object Model (POM)**, reusable **fixtures**, environment-based configuration, and structured test organization.

## Project Overview

**Application Under Test:** Automation Exercise
**Application URL:** https://automationexercise.com/
**Automation Tool:** Playwright
**Programming Language:** JavaScript
**Test Type:** End-to-End / UI Automation
**Architecture:** Page Object Model (POM)
**Test Runner:** Playwright Test

Automation Exercise provides multiple e-commerce user journeys and dedicated automation practice scenarios, including user registration, login, logout, product browsing, cart operations, checkout, and other functional workflows.

## Objectives

The main objectives of this project are to:

* Build a maintainable Playwright automation framework.
* Automate critical end-to-end e-commerce workflows.
* Apply the Page Object Model design pattern.
* Create reusable Playwright fixtures.
* Separate test logic from page interaction logic.
* Manage test configuration through environment variables.
* Generate Playwright HTML test reports.
* Follow clean Git and GitHub branching practices.
* Demonstrate practical QA automation skills.

## Framework Structure

```text
automationexercise-playwright/
│
├── fixtures/
│   └── Custom Playwright fixtures
│
├── pages/
│   └── Page Object classes
│
├── tests/
│   └── End-to-end test specifications
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Design Approach

### Page Object Model

Page-specific locators and actions are maintained inside page classes.

This helps to:

* Reduce duplicated code.
* Improve maintainability.
* Keep test cases readable.
* Centralize locators.
* Make application changes easier to maintain.

Example structure:

```text
tests/
    customer-registration.spec.js

pages/
    login.page.js
    signup.page.js
    home.page.js
```

### Fixtures

Reusable test setup and dependencies are managed through Playwright fixtures.

Fixtures can be used to:

* Create reusable page objects.
* Manage common test setup.
* Reduce duplicated initialization code.
* Improve test readability.

## Test Coverage

The automation suite focuses on critical business flows such as:

* User registration
* User login
* User logout
* Existing user validation
* Product browsing
* Product details
* Product search
* Cart operations
* Checkout flow
* Contact Us
* Test case navigation
* Other critical e-commerce workflows

The exact automated coverage will evolve as additional test scenarios are implemented.

## Prerequisites

Install the following before running the project:

* Node.js 20 or later
* npm
* Git
* VS Code or another code editor

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

Verify Git:

```bash
git --version
```

## Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project:

```bash
cd automationexercise-playwright
```

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Environment Configuration

Create a local `.env` file for environment-specific values.

Example:

```env
BASE_URL=https://automationexercise.com
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password
```

Do not commit `.env` to Git.

Use `.env.example` to document required environment variables without exposing sensitive values.

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/end-to-end/customer-registration.spec.js
```

Run a specific test in headed mode:

```bash
npx playwright test tests/end-to-end/customer-registration.spec.js --headed
```

Run tests using a specific browser project:

```bash
npx playwright test --project=chromium
```

## View HTML Report

After test execution:

```bash
npx playwright show-report
```

## Useful Playwright Commands

Check Playwright version:

```bash
npx playwright --version
```

List available tests:

```bash
npx playwright test --list
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

## Test Execution Strategy

The framework follows a practical QA automation approach:

```text
Test Scenario
      ↓
Test Specification
      ↓
Page Object
      ↓
Playwright Action
      ↓
Application
      ↓
Assertion
      ↓
Test Result
      ↓
HTML Report
```

## Git Branching Strategy

The repository uses two primary branches:

```text
main
  ↑
  │ Pull Request
  │
qa-automation
```

### main

The `main` branch represents the stable and reviewed version of the automation framework.

### qa-automation

The `qa-automation` branch is used for QA automation development and test implementation.

Changes should follow this workflow:

```text
Develop / Update Automation
          ↓
qa-automation
          ↓
Commit
          ↓
Push
          ↓
Pull Request
          ↓
Code Review
          ↓
QA Validation
          ↓
Merge
          ↓
main
```

## Pull Request Process

Pull requests should include:

* Clear PR title.
* Summary of changes.
* Test scenarios covered.
* Test execution result.
* Relevant screenshots or reports when necessary.
* Reviewer feedback resolution.

Example:

```text
QA Automation: Add customer registration E2E tests
```

## Commit Message Examples

Use clear and meaningful commit messages.

Good examples:

```text
Add customer registration E2E tests
Add login page object
Add reusable Playwright fixtures
Update Playwright configuration
Add checkout automation tests
Fix customer login test
Improve registration test assertions
```

Avoid unclear messages such as:

```text
update
changes
test
fix
new code
```

## Reporting

Playwright HTML reports provide information about:

* Passed tests
* Failed tests
* Skipped tests
* Execution duration
* Test steps
* Screenshots
* Traces
* Error details

## Quality Practices

This project follows the following automation practices:

* Page Object Model
* Reusable fixtures
* Environment-based configuration
* Stable locators
* Explicit assertions
* Independent test cases
* Meaningful test names
* Clear commit messages
* Pull-request-based code review
* Separation of test and page interaction logic
* No credentials committed to source control

## Future Improvements

Potential future improvements include:

* API automation using Playwright APIRequest.
* CI/CD integration with GitHub Actions.
* Cross-browser execution.
* Parallel execution optimization.
* Test tagging.
* Authentication state management.
* Advanced reporting.
* Retry strategy for appropriate scenarios.
* Accessibility testing.
* Visual regression testing.

## Application Reference

Automation Exercise:

https://automationexercise.com/

The application provides dedicated UI automation practice scenarios and API testing exercises for QA engineers.

## Author

**Mosaeb Bin Mozib**

Software Engineering | QA Automation | Playwright

---

This project is created for learning, portfolio development, and demonstrating practical test automation engineering practices.
