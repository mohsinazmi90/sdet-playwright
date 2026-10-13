const base = require('@playwright/test')
const { APIUtils } = require('./APIUtils')
const { request } = require('@playwright/test')

const userData = {userEmail:"contact199@rahulshetty.com",userPassword:"Learning123"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}

exports.customtest = base.test.extend({
    
    authenticatedPage: async ({browser}, use)=> 
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("contact199@rahulshetty.com");
        await page.locator("#userPassword").fill("Learning123");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await use(page);

        // TEAR DOWN TO CLOSE CONTEXT THREAD
        await context.close()
    },

    createOrder: async ({}, use) => 
    { 
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, userData);
        const response = await apiUtils.createOrder(orderPayload);
        await use(response);

        // DISPOSE API REQUEST TO CLOSE ALL THREADS
        await apiContext.dispose()
    },

    testOrderData : {
        productName: 'ADIDAS ORIGINAL'
    }
});