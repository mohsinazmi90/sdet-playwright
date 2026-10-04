// @ts-check
import { chromium, defineConfig, devices, firefox } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 10_000,

  expect: {

    timeout: 5000,
  },

  reporter: 'html',
  resultsDir: './test-results',

  use: {
    browserName: "chromium",
    // headless: false,
    screenshot: 'only-on-failure', // ON, OFF, ONLY-ON-FAILURE // THIS ALLOWS US TO SEE THE SCREENSHOT OF THE TEST IF IT FAILS
    video: 'retain-on-failure', // ON, OFF, RETAIN-ON-FAILURE // THIS ALLOWS US TO SEE THE VIDEO OF THE TEST IF IT FAILS
    trace: 'on-first-retry', // ON, OFF, ON-FIRST-RETRY // THIS ALLOWS US TO SEE THE TRACE OF THE TEST IF IT FAILS ON THE FIRST ATTEMPT
    
  },
};

module.exports = config;

