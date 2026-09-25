// @ts-check
import { defineConfig, devices, firefox } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 40_000,
  expect: {
    timeout: 40*1000
  },
  reporter: 'html',
  resultsDir: './test-results',

  use: {
    browserName: 'chromium',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
};

module.exports = config;

