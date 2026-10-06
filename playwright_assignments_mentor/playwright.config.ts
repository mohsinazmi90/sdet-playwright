const config = {
  testDir: './tests',
  timeout: 10_000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',
  outputDir: './test-results',

  use: {
    browserName: 'chromium',
    screenshot: 'only-on-failure',
  },
};

export default config;