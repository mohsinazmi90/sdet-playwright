// @ts-check
import { chromium, defineConfig, devices, firefox } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 40_000,

  expect: {

    timeout: 5000
  },

  reporter: 'html',
  resultsDir: './test-results',

  use: {
    browserName: "chromium",
    // headless: false,
    
  },
};

module.exports = config;

