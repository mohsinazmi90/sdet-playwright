// eventhub.spec.js
const { test, expect } = require('../fixturesAssignment')

test('newly created event should appear on the events page', async ({ authenticatedPage, createEvent }) => {
  await authenticatedPage.goto('https://eventhub.rahulshettyacademy.com/events');
  await expect(authenticatedPage.getByText(createEvent.title)).toBeVisible();
})