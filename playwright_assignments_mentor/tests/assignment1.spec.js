// 1. Create a fresh Playwright project for this assignment using the Playwright 
// tooling and project layout for your course stack.
// 2. Install Playwright and its browsers so tests can run locally.
// 3. Add a short written note (comment or README) explaining the difference between the 
// core Playwright package and the Playwright test runner package.
// 4. Create a first test that opens the EventHub login page (/login).
// 5. Confirm the page shows the Sign in to EventHub heading, the email field with 
// placeholder you@email.com, and the Sign In button.
// 6. Wait for Playwright actions to finish so the test does not rely on timing tricks 
// or hard-coded sleeps.
// 7. Temporarily focus the suite so only one test runs, observe that behavior, then 
// restore the full suite.
// 8. Add a second login-page smoke check that asserts the Password field is visible, 
// the URL contains /login, and the Sign in to EventHub heading is still visible.
// 9. Run the full assignment suite and confirm both checks pass.

const { test, expect } = require('@playwright/test')
const BASE_URL = "https://eventhub.rahulshettyacademy.com"

// -----------------------
// DIFFERENCE BETWEEN PLAYWRIGHT CODE AND PLAYWRIGHT TEST
// -----------------------
//`playwright` is the core package used to automate browsers.
// `@playwright/test` includes Playwright plus a built-in test runner.
// It provides features like `test()`, `expect()`, hooks, retries, and reports.
// For normal automation testing projects, `@playwright/test` is usually the better choice.

test('test 1: open the eventhub login page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`${BASE_URL}` + "/login");

    await expect(page.getByText("Sign in to EventHub")).toBeVisible();
    await expect(page.locator("input[placeholder='you@email.com']")).toBeVisible();
    await expect(page.locator("#login-btn")).toBeVisible();
});

test('test 2: validate password', async ({ page }) => {
    await page.goto(`${BASE_URL}` + "/events");

    await expect(page.locator("#password")).toBeVisible();
    await expect(page.url()).toContain("/login");
    // await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText("Sign in to EventHub")).toBeVisible();


});