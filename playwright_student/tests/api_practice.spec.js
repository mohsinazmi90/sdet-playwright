// TESTING OUT THE API TESTING IN WEBCASES

const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const { log } = require('node:console');
let response;
const BASEURL = "https://rahulshettyacademy.com/client/"
const loginPayload = {userEmail:"contact199@rahulshetty.com",userPassword:"Learning123"};
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}

test.beforeAll(async () => 
{
    // -------------------------------
    // SET UP API CONTEXT
    // -------------------------------
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload)
    // WE ARE USING THE APIUtils FILE TO CREATE THE ORDER AND GET THE ORDER ID
    response = await apiUtils.createOrder(orderPayload)
    await apiContext.dispose();

});

test.only("this is api practice", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // USES PLAYWRIGHT PAGE.ADDINITSCRIPT TO INJECT THE TOKEN VALUE INTO THE LOCAL 
    // STORAGE OF THE BROWSER.

    // VALUE ON THE TOP IS TAKING THE TOKEN VALUE ADDED AT THE END OF THE FUNCTION
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto(`${BASEURL}`)
 
    await page.getByRole('button', {name: "ORDERS"}).first().click();
    await expect(page.getByText(response.orderID)).toBeVisible();
    await page.locator(".container.table-responsive").locator("tr").filter({hasText: response.orderID}).getByRole('button', {name: "View"}).click();
    const orderText = await page.locator(".email-container").textContent()
    const orderCountryArray = orderText.split(" ")
    await expect(orderCountryArray).toContainEqual(expect.stringContaining(orderPayload.orders[0].country)) 
});




