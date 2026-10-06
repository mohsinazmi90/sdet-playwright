// 1. Create a Playwright configuration that sets the EventHub base URL, 
// points to your tests folder, sets a simple retry value, and defines
// at least two browser projects (for example Chromium and Firefox).
// 2. Write a smoke test that opens /login using the configured base URL 
// (not a hard-coded full URL for that navigation).
// 3. Assert the page title matches EventHub, the email field is visible, 
// and the Sign In button is visible.
// 4. In another check, use the built-in page fixture to open the login page, 
// fill the email field with beginner@sample.com, and confirm the same field still shows that value.
// 5. In the same flow, create a fresh isolated browser context and page, 
// open the login page with the full application URL, and confirm the Sign in to EventHub 
// heading is visible while the email field starts empty.
// 6. Close the isolated context when finished.
// 7. Add a short written note explaining that the page fixture gives one ready-to-use page, 
// a browser context is a separate session container, and a fresh context starts with isolated state.
// 8. Run the smoke suite across the configured browsers and confirm the same assertions execute 
// for each project.

const { test, expect } = require('@playwright/test')

test("smoke test", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/login');

    await expect(page).toHaveTitle("EventHub — Discover & Book Events");
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#login-btn")).toBeVisible();

});

test("test with async page", async ({ page }) =>{
    await page.goto('/login');

    await page.locator("#email").fill("beginner@sample.com");
    await expect(page.locator("#email")).toHaveValue("beginner@sample.com");
});

test("test with another context", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    await expect(page.getByText("Sign in to EventHub")).toBeVisible();
    await expect(page.locator("#email")).toBeEmpty();
    await context.close()

});

// The `page` fixture gives you one ready-to-use browser page for the test. 
// A browser context is a separate browser session that can contain one or more pages. 
// Each new context starts with isolated state, so cookies, local storage, and 
// login sessions are not shared with other contexts.