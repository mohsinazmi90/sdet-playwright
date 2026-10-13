// TESt: BROWSER, CART, ORDER, ORDER DETAILS, ORDER HISTORY
// LOGIN ONCE FROM THE UI AND COLLECT ALL THE COOKIE INFORMATION IN A JSON FILE

const { test, expect } = require ('@playwright/test')
const BASE_URL = "https://rahulshettyacademy.com/client/"
let webContext;

test.beforeAll( async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`${BASE_URL}`);

    await page.locator("input#userEmail").fill("contact199@rahulshetty.com");
    await page.locator("input#userPassword").fill("Learning123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    // THIS WILL STORE THE BROWSER COOKIES AFTER YOU LOGIN AND SAVE IT INTO A JSON
    await context.storageState({path: 'state.json'});

    // NEW WEBCONTEXT WILL TAKE THE COOKIE DATA FROM THE JSON FILE AND PLUG IT INTO THE NEW CONTEXT
    webContext = await browser.newContext({storageState: 'state.json'})
});

test('LOGIN USING API 2', async ()=>{
    const page = await webContext.newPage();
    await page.goto(`${BASE_URL}`);
    await page.waitForTimeout(2000)

    
});