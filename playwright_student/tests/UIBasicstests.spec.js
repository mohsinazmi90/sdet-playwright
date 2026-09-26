const {test, expect, selectors} = require('@playwright/test');
const { sign } = require('node:crypto');

test.only('Browser context playwright test',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //CSS OR XPATH
    const username = await page.locator("input#username");
    const password = await page.locator("input#password");
    const terms = await page.locator("input#terms");
    const signinbutton = await page.locator("input#signInBtn");
    const incorrect = await page.locator("[style*='block']");
    const cardTitles = await page.locator(".card-body a");

    // INPUT DATA USING FILL (TYPE IS NOT USED ANYMORE)
    await username.fill("rahulshetty");
    await password.fill("password");
    await terms.click();
    await signinbutton.click();

    // TEST TO CHECK IF INCORRECT TEXT IS DISPLAYED AFTER CLICKING SIGN IN BUTTON
    await expect(incorrect).toContainText("Incorrect username/password.");

    // FILL CLEARS THE INPUT FIELD AND THEN ENTERS THE DATA 
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await terms.click();
    await signinbutton.click();

    // SINCE THERE ARE MULTIPLE ELEMENTS (FIRST) WILL PICK THE FIRST ELEMENT
    // YOU CAN ALSO USE nth(0) TO GET THE FIRST ELEMENT.
    // IF YOU WANT TO PICK SPECIFIC VALUE, USE nth() i.e nth(0), nth(1)
    console.log(await cardTitles.nth(1).textContent());

    // NOW WE NEED TO GRAB THE NAMES OF ALL PRODUCTS. USE ALL TEXT CONTENTS 
    const allTitles = await cardTitles.allTextContents();
    console.log(await allTitles);
    await expect(cardTitles).toContainText(allTitles);
});

test('Page playwright test',async ({page})=>
{
    await page.goto("https://www.google.com");
    
    // GET TITLE, THEN USE ASSERTION TO CONFIRM
    // const pageTitle = await page.title();
    // console.log(pageTitle);
    await expect(page).toHaveTitle("Google");


});

