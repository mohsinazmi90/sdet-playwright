const config = {
  testDir: './tests',
  timeout: 10_000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',
  outputDir: './test-results',

  use: {
    baseURL: 'https://eventhub.rahulshettyacademy.com',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      }
    },
]
};

export default config;