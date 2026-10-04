// -------------------------------------------
// TEACHER CODE BELOW, NOT USED IN CLASS
// -------------------------------------------

// const { test, expect } = require('@playwright/test');

// test('@Webst Client App login', async ({ page }) => {
//    //js file- Login js, DashboardPage
//    const email = "anshika@gmail.com";
//    const productName = 'ZARA COAT 3';
//    const products = page.locator(".card-body");
//    await page.goto("https://rahulshettyacademy.com/client");
//    await page.locator("#userEmail").fill(email);
//    await page.locator("#userPassword").fill("Iamking@000");
//    await page.locator("[value='Login']").click();
//    await page.waitForLoadState('networkidle');
//    await page.locator(".card-body b").first().waitFor();
//    const titles = await page.locator(".card-body b").allTextContents();
//    console.log(titles); 
//    const count = await products.count();
//    for (let i = 0; i < count; ++i) {
//       if (await products.nth(i).locator("b").textContent() === productName) {
//          //add to cart
//          await products.nth(i).locator("text= Add To Cart").click();
//          break;
//       }
//    }

//    await page.locator("[routerlink*='cart']").click();
//    //await page.pause();

//    await page.locator("div li").first().waitFor();
//    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//    expect(bool).toBeTruthy();
//    await page.locator("text=Checkout").click();

//    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
//    const dropdown = page.locator(".ta-results");
//    await dropdown.waitFor();
//    const optionsCount = await dropdown.locator("button").count();
//    for (let i = 0; i < optionsCount; ++i) {
//       const text = await dropdown.locator("button").nth(i).textContent();
//       if (text === " India") {
//          await dropdown.locator("button").nth(i).click();
//          break;
//       }
//    }

//    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
//    await page.locator(".action__submit").click();
//    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//    console.log(orderId);

//    await page.locator("button[routerlink*='myorders']").click();
//    await page.locator("tbody").waitFor();
//    const rows = await page.locator("tbody tr");


//    for (let i = 0; i < await rows.count(); ++i) {
//       const rowOrderId = await rows.nth(i).locator("th").textContent();
//       if (orderId.includes(rowOrderId)) {
//          await rows.nth(i).locator("button").first().click();
//          break;
//       }
//    }
//    const orderIdDetails = await page.locator(".col-text").textContent();
//    expect(orderId.includes(orderIdDetails)).toBeTruthy();

// });

// -------------------------------------------
// TEACHER CODE BELOW TO SHOW SPECIAL LOCATORS, NOT USED IN CLASS
// -------------------------------------------

// import { test, expect } from '@playwright/test';

// test('Playwright Special locators', async ({ page }) => {
  
//     await page.goto("https://rahulshettyacademy.com/angularpractice/");
//     await page.getByLabel("Check me out if you Love IceCreams!").click();
//     await page.getByLabel("Employed").check();
//     await page.getByLabel("Gender").selectOption("Female");
//     await page.getByPlaceholder("Password").fill("abc123");
//     await page.getByRole("button", {name: 'Submit'}).click();
//     await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
//     await page.getByRole("link",{name : "Shop"}).click();
//     await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

//     //locator(css)


// -------------------------------------------
// TEACHER CODE BELOW TO SHOW GLOBAL TIMEOUTS, NOT USED IN CLASS
// -------------------------------------------

// import { test, expect } from '@playwright/test';

// test('Global timeout', async ({ page }) => {
//     const slowExpect = expect.configure({ timeout: 9000 });
//     await page.goto("https://rahulshettyacademy.com/angularpractice/");
//     await page.getByLabel("Check me out if you Love IceCreams!").click();
//     await page.getByLabel("Employed").check();
//     await page.getByLabel("Gender").selectOption("Female");
//     await page.getByPlaceholder("Password").fill("abc123");
//     await page.getByRole("button", {name: 'Submit'}).click();
//     await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
//     await page.getByRole("link",{name : "Shop"}).click();
//     await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
//     await slowExpect(page.locator("h4.card-title")).toContainText("Nokia Edge");
// });

// -------------------------------------------
// TEACHER CODE BELOW TO SHOW TEST LEVEL TIMEOUTS, NOT USED IN CLASS
// -------------------------------------------

// test('Test Level timeout', async ({ page }) => {

//     SET A TIMEOUT OF 30 SECONDS FOR THIS TEST CASE. 
//     IF IT TAKES LONGER THAN 30 SECONDS, IT WILL FAIL.
//     test.setTimeout(30000); 

//     OVERRIDE THE DEFAULT TIMEOUT
//     SET A TIMEOUT OF 10 SECONDS FOR THIS TEST CASE. 
//     IF IT TAKES LONGER THAN 10 SECONDS, IT WILL FAIL.
//     test.setdefaultTimeout(10000);   

//     await page.goto("https://rahulshettyacademy.com/angularpractice/");
//     await page.getByLabel("Check me out if you Love IceCreams!").click();
//     await page.getByLabel("Employed").check();
//     await page.getByLabel("Gender").selectOption("Female");
//     await page.getByPlaceholder("Password").fill("abc123");

//     STEP LEVEL TIMEOUT EXAMPLE BELOW
//     SET A TIMEOUT OF 10 SECONDS FOR THIS STEP. IF IT TAKES LONGER THAN 10 SECONDS, IT WILL FAIL.
//     await page.getByRole("button", {name: 'Submit'}).click(timeout: 15000); 
// 
//     await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
//     await page.getByRole("link",{name : "Shop"}).click();
//     await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
//     await expect(page.locator("h4.card-title")).toContainText("Nokia Edge");
// });


// -------------------------------------------
// CODE BELOW TO SHOW CALENDAR VALIDATIONS, NOT USED IN CLASS
// -------------------------------------------

// const {test,expect} = require("@playwright/test");


// test("Calendar validations",async({page})=>
// {

//     const monthNumber = "6";
//     const date = "15";
//     const year = "2027";
//     const expectedList = [monthNumber,date,year];
//     await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
//     await page.locator(".react-date-picker__inputGroup").click();
//     await page.locator(".react-calendar__navigation__label").click();
//     await page.locator(".react-calendar__navigation__label").click();
//     await page.getByText(year).click();
//     await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
//     await page.locator("//abbr[text()='"+date+"']").click();
//     const inputs = await page.locator(".react-date-picker__inputGroup input");
//     for (let index = 0; index <inputs.length; index++)
//     {
//         const value =inputs[index].getAttribute("value");
//         expect(value).toEqual(expectedList[index]);
//     }



// ----------------------------
// CODE DOWNLOADED FROM TEACHER
// ----------------------------

// test('@Child windows hadl', async ({browser})=>
//  {
//     const context = await browser.newContext();
//     const page =  await context.newPage();
//     const userName = page.locator('#username');
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const documentLink = page.locator("[href*='documents-request']");

//     const [newPage]=await Promise.all(
//    [
//       context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
//       documentLink.click(),
   
//    ])//new page is opened
   

//    const  text = await newPage.locator(".red").textContent();
//     const arrayText = text.split("@")
//     const domain =  arrayText[1].split(" ")[0]
//     //console.log(domain);
//     await page.locator("#username").fill(domain);
//     console.log(await page.locator("#username").inputValue());

//  })