const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require("../utils/APIUtils");

// -------------------------------------------
// THIS MAKES THE VARIABLE GLOBAL SO ANY TEST CAN USE IT
// -------------------------------------------
let token;
let orderID;
let apiContext;
let apiUtils;

// -------------------------------------------
// BELOW DATA IS THE JSON WE SENT TO THE API PAYLOAD.
// THE KEY DOESNT NEED QUOTES ONLY THE VALUES
// -------------------------------------------
const userData = {userEmail:"contact199@rahulshetty.com",userPassword:"Learning123"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}

// -------------------------------------------
// THIS RUNS BEFORE EACH INDIVIDUAL TEST
// -------------------------------------------
test.beforeAll( async ()=> 
{
    apiContext = await request.newContext()
    apiUtils = new APIUtils(apiContext, orderPayload)
});

// -------------------------------------------
// THIS MEANS EXECUTE THIS CODE BEFORE EACH TEST 
// -------------------------------------------
test.beforeEach( ()=> 
{


})

// -------------------------------------------
// FIRST TEST. LOG IN USING API
// -------------------------------------------
test("first: login to the app", async ({ page }) => {

    const apiUtils = new APIUtils(apiContext, userData);
    token = await apiUtils.getToken(userData)

    // STORE THE TOKEN VALUE IN BROWSER LOCAL STORAGE  USING JAVASCRIPTS
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    // ONCE THE TOKEN IS SENT TO THE BROWSER, YOU PUT THE URL IN THE PAGE.GOTO
    // THE API BYPASSES THE LOGIN SCREEN
    await page.goto("https://rahulshettyacademy.com/client/");
    await expect(page).toHaveTitle("Let's Shop");

});

// -------------------------------------------
// SECOND TEST. CREATE A NEW ORDER USING API
// -------------------------------------------
test("second: place order using api", async ({ page }) => {

    const apiUtils = new APIUtils(apiContext, userData);

    token = await apiUtils.getToken(userData);

    orderID = await apiUtils.createOrder(orderPayload);

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto(
        "https://rahulshettyacademy.com/client/#/dashboard/myorders"
    );

    await expect(page.getByText(orderID)).toBeVisible();
});

// ---------------------------------------
// TEACHER'S CODE
// ---------------------------------------

// const {test, expect, request} = require('@playwright/test');
// const {APiUtils} = require('./utils/APiUtils');
// const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
// const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};


// let response;
// test.beforeAll( async()=>
// {
//    const apiContext = await request.newContext();
//    const apiUtils = new APiUtils(apiContext,loginPayLoad);
//    response =  await apiUtils.createOrder(orderPayLoad);

// })


// //create order is success
// test('@API Place the order', async ({page})=>
// { 
//     await page.addInitScript(value => {

//         window.localStorage.setItem('token',value);
//     }, response.token );
// await page.goto("https://rahulshettyacademy.com/client");
//  await page.locator("button[routerlink*='myorders']").click();
//  await page.locator("tbody").waitFor();
// const rows = await page.locator("tbody tr");


// for(let i =0; i<await rows.count(); ++i)
// {
//    const rowOrderId =await rows.nth(i).locator("th").textContent();
//    if (response.orderId.includes(rowOrderId))
//    {
//        await rows.nth(i).locator("button").first().click();
//        break;
//    }
// }
// const orderIdDetails =await page.locator(".col-text").textContent();
// //await page.pause();
// expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

// });

// //Verify if order created is showing in history page
// // Precondition - create order -