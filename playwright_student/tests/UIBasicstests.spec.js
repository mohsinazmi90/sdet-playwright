const {test, expect, selectors} = require('@playwright/test');
const { sign } = require('node:crypto');
const { CONNREFUSED } = require('node:dns');

// IF ID IS PRESENT
// USE CSS -> TAGNAME#ID (INPUT#USERNAME)

// IF CLASS ATTRIBUTE IS PRESENT
// USE CSS -> TAGNAME.CLASS (INPUT.USERNAME)

// TO WRITE CSS BASED ON ANY ATTRIBUTE
// USE CSS -> [ATTRIBUTE='VALUE']

// TO WRITE CSS TRAVERSING FROM PARENT TO CHILD
// USE CSS PARENTTAGNAME >> CHILDTAGNAME

// TO WRITE CSS WITH TEXT
// USE CSS TEXT=''

test('Browser context playwright test',async ({browser})=>
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
    await expect(cardTitles).toContainText(["iphone", "Samsung Note 8"]);
});

test('Practice page', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // const registerButton = await page.locator("p.login-wrapper-footer-text").click();
    await expect(page).toHaveTitle("Let's Shop");

    const fname = await page.locator("input#firstName");
    const lname = await page.locator("input#lastName");
    const phone = await page.locator("input#userMobile");
    const email = await page.locator("input#userEmail");
    const pass = await page.locator("input#userPassword");
    const confpw = await page.locator("input#confirmPassword");
    const checkbox = await page.locator("input[type='checkbox']");
    const login = await page.locator("input#login")
    const products = await page.locator("div.col-lg-4.mb-3")
    
    // await fname.fill("Rahul");
    // await lname.fill("Shetty");
    // await phone.fill("6463332223");
    // await email.fill("contact199@rahulshetty.com");
    // await pass.fill("Learning123");
    // await confpw.fill("Learning123");
    // await checkbox.click();
    // await login.click();

    // await page.waitForTimeout(3000); // Waits 3 seconds

    await email.fill("contact199@rahulshetty.com")
    await pass.fill("Learning123");
    await login.click();

    // const productName = await products.nth(1).textContent();
    // console.log(productName)
    await products.first().waitFor();
    const allProducts = await products.allTextContents();
    console.log(allProducts);
   
});
 
test('Page playwright test',async ({page})=>
{
    await page.goto("https://www.google.com");
    
    // GET TITLE, THEN USE ASSERTION TO CONFIRM
    // const pageTitle = await page.title();
    // console.log(pageTitle);
    await expect(page).toHaveTitle("Google");


});

test.only('Dropdown test using select and radio buttons',async ({browser})=>
{
    // NAVIGATE TO THE URL
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    // ----------------------------------
    // SELECT DROPDOWN USING SELECT OPTION
    // ----------------------------------

    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("consult");

    // ----------------------------------
    // SELECT RADIO BUTTON OPTION
    // ----------------------------------

    const radiobutton = await page.locator(".radiotextsty");
    await radiobutton.last().click()
    const accept = await page.locator('button#okayBtn');
    await accept.click();

    // ASSERT THAT USER WAS SELECTED
    await expect(radiobutton.last()).toBeChecked();

    // ANOTHER WAY TO ASSERT
    await radiobutton.last().isChecked();

    // ----------------------------------
    // SELECT CHECKBOX
    // ----------------------------------
    const terms = await page.locator("input#terms");

    // ASSERT TO MAKE SURE ITS CHECKED
    await terms.check()
    await expect(terms).toBeChecked();

    // ASSERT TO MAKE SURE ITS UNCHECKED
    await terms.uncheck();
    await expect(terms).not.toBeChecked();

    await page.pause();

});
