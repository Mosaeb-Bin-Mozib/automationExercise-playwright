// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Read environment variables from .env file.
 * @see https://github.com/motdotla/dotenv
 */

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // Maximum time for each test
  timeout: 90000,

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is accidentally left in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests
  retries: process.env.CI ? 2 : 2,

  // Limit parallel workers to avoid overwhelming AutomationExercise
  workers: 4,

  // HTML test report
  reporter: 'html',

  // Shared settings for all projects
  use: {
    // Read BASE_URL from .env
    baseURL:
        process.env.BASE_URL ?? 'https://automationexercise.com/',

    // Take screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Collect trace when a test is retried
    trace: 'on-first-retry',
  },

  /**
   * Configure projects
   */
  projects: [
    {
      name: 'api-tests-independent',
      testMatch: '**/API/**/*.spec.js',
      fullyParallel: true,
    },

    {
      name: 'smoke-independent',
      testMatch: '**/smoke/{home,products,contact}.spec.js',
      fullyParallel: true,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'smoke-account-dependent',
      testMatch: '**/smoke/{login,signup,cart,payment}.spec.js',
      fullyParallel: false,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'end-to-end-dependent',
      testMatch: '**/end-to-end/*.spec.js',
      fullyParallel: false,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});