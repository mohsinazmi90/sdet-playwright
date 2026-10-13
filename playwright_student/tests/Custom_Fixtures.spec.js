const { test, expect, request } = require('@playwright/test')
const { customtest } = require('../utils/fixtures')

// BUILD A FIXTURE authenticadPage FROM THE TEST FUNCTION
// THERE IS fiXTURE.js FILE IN THE UTILS FOLDER
customtest('Fixtures demo', async ({authenticatedPage, createOrder, testOrderData}) => 
{
    // LOGIN TO APPLICATION AND VERFIY THAT ORDER IS CREATED FROM HISTORY PAGE
    await authenticatedPage.goto("https://rahulshettyacademy.com/client")
    await authenticatedPage.locator("button[routerlink='/dashboard/myorders']").click()
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderID)).toBeVisible();

    // ORDER ID
    console.log('Order ID:', createOrder.orderID);
    console.log('Product Name:', testOrderData.productName);

    // TEAR DOWN
    

})