const {test, expect} = require('@playwright/test')

test('Content browser validation', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");

    const email = await page.locator("input#userEmail");
    const pass = await page.locator("input#userPassword");
    const login = await page.locator("input#login")

    await email.fill("contact199@rahulshetty.com")
    await pass.fill("Learning123");
    await login.click();

    // USE THIS WAIT TO MAKE SURE THAT THE NETWORK HAS FULLY LOADED INSTEAD OF EXPLICIT WAIT
    // await page.waitForLoadState('networkidle');

    // SOMETIMES WAIT FOR LOAD STATE DOES NOT WORK, SO USE THIS INSTEAD
    await page.locator("div.card-body").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    // EITHER OF THE BELOW WORKS
    // await expect(titles).toEqual(expect.arrayContaining(['ZARA COAT 3']));
    await expect(page.locator(".card-body b")).toContainText(['ZARA']);
});