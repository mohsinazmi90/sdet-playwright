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

test('Dropdown test using select and radio buttons',async ({browser})=>
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

    // ----------------------------------
    // ON THE PAGE THERE IS A BLINKING TEXT, USE BELOW TO ASSET FOR IT
    // ----------------------------------

    const blinkText = page.locator("a.blinkingText").first();
    await expect(blinkText).toHaveAttribute("class", "blinkingText");


    // await page.pause();

});

// ----------------------------------
// HANDLING CHILD WINDOWS AND NEW TABS
// ----------------------------------

test('handling child windows',async ({browser})=>
{
    // SETUP THE BROWSER AND ASSERT TITLE
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    // CLICK LINK TO OPEN NEW TAB
    const blinkText = page.locator("a.blinkingText").first();

    // THIS METHOD WILL TAKE AN ARRAY OF PROMISES SO YOU INDEX THE STEPS INTO PROMISE ARRAY
    // ALSO YOU NEED TO PROVIDE A PROMISE (PENDING, REJECTED, FULFILLED)
    const [newPage] = await Promise.all(
    [
        // THIS METHOD LISTENS TO SEE IF ANY NEW PAGE OPENS ON THE BROWSER
        // THIS METHOD ALSO NEEDS TO BE BEFORE YOU CLICK THE LINK THAT OPENS NEW TAB
        context.waitForEvent('page'),

        // CLICK THE LINK THAT WILL OPEN THE NEW TAB
        await blinkText.click()
    ]);

    // USE THIS WAIT TO MAKE SURE newPage HAS FULLY LOADED
    await newPage.waitForLoadState();

    const text = newPage.locator("p.im-para.red");
    const fullText = await text.textContent();
    await expect(text).toContainText("Please email us at mentor@rahulshettyacademy.com with below template to receive response");
    

    // NOW I WANT TO PULL THE EMAIL FROM THE TEXT ABOVE AND INSERT THIS INTO THE MAIN PAGE
    const arrayText = await fullText.split("@");
    const domain = arrayText[1].split(" ")[0]

    console.log(domain)

    // TO FILL IN THE ORIGINAL PAGE, WE WILL USE PAGE NOT newPage
    const user = await page.locator("input#username");
    await user.fill(domain)

    // GET INPUT VALUE OF WHAT YOU ENTERED
    console.log(user.inputValue())

    await page.pause();
});

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


test.only('Dynanically find element',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");

    const productName = "ZARA COAT 3"
    const username = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const signinbutton = page.locator("input#login");

    await username.fill("contact199@rahulshetty.com")
    await password.fill("Learning123");
    await signinbutton.click()

    // PLAYWRIGHT NEEDS TO DYNAMICALLY FIND PRODUCT AND ADD TO CART
    // OUR GOAL IS TO DYNAMICALLY FIND THE PRODUCT NAME (ZARA COAT 4) AND CLICK ADD TO CART BUTTON
    const cards = page.locator(".card-body");

    // THIS WAIT IS USED BECAUSE CONSOLE.LOG() WAS RETURNING EMPTY
    await page.waitForLoadState("networkidle");
    const products = await page.locator(".card-body b").allTextContents();
    console.log(products);
    const count = await cards.count();

    // -------------------------------------------
    // CLEARNER WAY TO DO ABOVE
    // Scope to the exact card containing your product title
    // -------------------------------------------

    // const targetCard = page.locator(".card-body").filter({ hasText: productName });

    // Click the button inside that specific card
    // await targetCard.getByRole("button", { name: "Add to Cart" }).click();

    const targetProduct = page.locator(".card-body").filter({hasText: productName});
    await targetProduct.getByRole("button", {name: "Add to Cart"}).click();
    
    // GO TO CHECKOUT PAGE
    const cartButton = page.locator("button.btn.btn-custom").filter({hasText: "Cart"});
    await cartButton.click();

    // VALIDATE THE CART ITEM
    const cartItem = page.locator(".cartSection").filter({hasText: productName});
    // await expect(cartItem).toContainText(new RegExp(productName, "i"))

    // SINCE CartItem WAS ALREADY FILTERED USING PRODUCTNAME, 
    // IF IT EXISTS AND IS VISIBLE, IT'S ALREADY VERIFIED.
    await expect(cartItem).toBeVisible();
   

    // CLICK BUY NOW
    // const buyNow = page.locator("button.btn.btn-primary").filter({hasText: "Buy Now"});
    await page.getByRole("button", { name: "Buy Now" }).click();
    // await buyNow.click();

    // ENTER COUPON CODE AND APPLY
    const coupon = page.locator("[name='coupon']");
    await coupon.fill("rahulshettyacademy");
    await page.getByRole("button", {name: "Apply Coupon"}).click();
    const couponCheck = page.getByText("* Coupon Applied");
    const couponText = await page.getByText("* Coupon Applied").textContent();
    await expect(couponCheck).toContainText("* Coupon Applied") 

    // ENTER COUNTRY FROM TYPE AND SELECT
    // WE NEED TO TYPE SLOWLY, LETTER BY LETTER SO OPTIONS ARE SHOWN
    const dropDownCountry = page.locator("[placeholder='Select Country']");
    await dropDownCountry.pressSequentially("IND");

    // ONCE IT SHOWS THE OPTIONS, SELECT THE ONE YOU WANT. EXACT TRUE MAKES SURE TO TAKE THE EXACT STRING
    const selectCountry = await page.getByText("Indonesia", { exact: true });
    // await selectCountry.waitFor({ state: "visible" });   
    await selectCountry.click();

    // CLICK TO PLACE ORDER AND VALIDATE ORDER IS PLACED
    await page.getByText("Place Order ").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    // VALIDATE THE TEXT ORDER ID IN ORDER HISTORY PAGE
    await page.getByText(" Orders History Page ").click();
    const confirmOrder = await page.getByRole("table").filter({text: "6abd24032be7a4bc2b7d9a61"});
    await expect(confirmOrder).toBeVisible();

    await page.pause();
});

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