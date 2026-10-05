const {test, expect, selectors} = require('@playwright/test');
const { sign } = require('node:crypto');
const { CONNREFUSED } = require('node:dns');

// FOR PRACTICE APPS GO TO https://rahulshettyacademy.com/practice

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



test('Dynanically find element',async ({page})=>
{
    // const context = await browser.newContext();
    // const page = await context.newPage();
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

    // ONCE IT SHOWS THE OPTIONS, SELECT THE ONE YOU WANT. 
    // EXACT TRUE MAKES SURE TO TAKE THE EXACT STRING
    // const selectCountry = page.getByText("Indonesia", { exact: true });
    // await selectCountry.waitFor({ state: "visible" });  
    
    // THIS IS A BETTER WAY TO SELECT THE COUNTRY USING ROLE AND NAME
    await page.locator(".ta-results").getByRole("button", { name: "Indonesia" }).click();
    // await selectCountry.click();

    // CLICK TO PLACE ORDER AND VALIDATE ORDER IS PLACED
    await page.getByText("Place Order ").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    // VALIDATE THE TEXT ORDER ID IN ORDER HISTORY PAGE
    await page.getByText(" Orders History Page ").click();
    const confirmOrder = await page.getByRole("table").filter({text: "6abd24032be7a4bc2b7d9a61"});
    await expect(confirmOrder).toBeVisible();

    await page.pause();
});

// ----------------------------------
// HOW TO DEBUG YOUR CODE USING PAUSE
// ----------------------------------

test('Debug code',async ({page})=>
{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");

    // YOU CAN USE page.pause() TO PAUSE THE TEST AND INSPECT ELEMENTS ON THE PAGE
    await page.pause();

    // YOU CAN ALSO USE page.screenshot() TO TAKE A SCREENSHOT OF THE PAGE
    await page.screenshot({path: 'screenshot.png', fullPage: true});

    // YOU CAN ALSO USE page.video() TO RECORD A VIDEO OF THE TEST
    // await page.video().startRecording({path: 'video.mp4'});

    // YOU CAN ALSO USE page.console() TO LOG MESSAGES TO THE CONSOLE
    page.on('console', msg => console.log(msg.text()));

    // YOU CAN ALSO USE page.on('dialog') TO HANDLE ALERTS, CONFIRMATIONS, AND PROMPTS
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
    });

    // YOU CAN ALSO USE page.on('request') TO LOG NETWORK REQUESTS
    page.on('request', request => {
        console.log('>>', request.method(), request.url());
    });

    // YOU CAN ALSO USE page.on('response') TO LOG NETWORK RESPONSES
    page.on('response', response => {
        console.log('<<', response.status(), response.url());
    });

    // YOU CAN ALSO USE page.on('requestfailed') TO LOG FAILED NETWORK REQUESTS
    page.on('requestfailed', request => {
        console.log('!!', request.failure().errorText, request.url());
    });

    // YOU CAN ALSO USE page.on('requestfinished') TO LOG FINISHED NETWORK REQUESTS
    page.on('requestfinished', request => {
        console.log('**', request.method(), request.url());
    });

    // YOU CAN ALSO USE page.on('frameattached') TO LOG ATTACHED FRAMES
    page.on('frameattached', frame => {
        console.log('++', frame.url());
    });
    
    // YOU CAN ALSO USE page.on('framedetached') TO LOG DETACHED FRAMES
    page.on('framedetached', frame => {
        console.log('--', frame.url());
    });

    // YOU CAN RUN THE TEST IN DEBUG MODE USING THE FOLLOWING COMMAND
    // -----> npx playwright test --debug
    // THIS WILL OPEN THE PLAYWRIGHT DEBUGGER AND ALLOW YOU TO STEP THROUGH THE TEST,
    // INSPECT ELEMENTS, AND RUN COMMANDS IN THE CONSOLE.

    // INSIDE THE DEBUGGER, YOU CAN GO LINE BY LINE, STEP INTO FUNCTIONS, 
    // AND INSPECT VARIABLES. YOU CAN ALSO USE THE CONSOLE TO EXECUTE JAVASCRIPT IN THE 
    // CONTEXT OF THE PAGE.

    // ALSO, IN THE DEBUGGER, YOU CAN USE THE "Selectors" PANEL TO TEST SELECTORS 
    // AND SEE WHICH ELEMENTS THEY MATCH.

    // THE DEBUGGER CAN GIVE YOU THE UNIQUE SELECTOR FOR AN ELEMENT, 
    // WHICH YOU CAN THEN USE IN YOUR TESTS.

});

// ----------------------------------
// HOW TO USE CODEGEN TO GENERATE CODE FOR YOUR TESTS
// ----------------------------------

// test('Codegen test',async ({browser})=>
// {
    // YOU CAN USE THE FOLLOWING COMMAND TO GENERATE CODE FOR YOUR TESTS
    // -----> npx playwright codegen https://rahulshettyacademy.com/loginpagePractise/
    // THIS WILL OPEN A BROWSER AND RECORD YOUR ACTIONS, 
    // AND GENERATE CODE IN THE CONSOLE.

    // YOU CAN THEN COPY THE GENERATED CODE AND USE IT IN YOUR TESTS.

    // NOTE: CODEGEN IS A GREAT WAY TO LEARN HOW TO WRITE SELECTORS AND INTERACT WITH ELEMENTS,
    // BUT IT'S IMPORTANT TO CLEAN UP THE GENERATED CODE AND MAKE IT MORE READABLE AND MAINTAINABLE.

    // YOU CAN USE THE BUILT IN ASSERT TEXT IN CODEGEN TO ASSERT THAT CERTAIN TEXT IS PRESENT 
    // ON THE PAGE.
    // THERE ARE 4 WAYS TO ASSERT TEXT IN CODEGEN:
    // 1. assertText - Asserts that the text is present on the page.
    // 2. assertValue - Asserts that the value of an input field is as expected.
    // 3. assertVisible - Asserts that an element is visible on the page.
    // 4. assertSnapshot - Asserts that the screenshot of an element matches the expected screenshot.

    // TO ASSERT TITLE, YOU CAN USE THE FOLLOWING COMMAND IN CODEGEN:
    // await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

// });

test("test when elements in hidden", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle("Practice Page");

    // NAVIGATE PAGE LIKE THIS
    // await page.goback();
    // await page.goForward();

    // ASSERT THAT THE ELEMENT IS VISIBLE, THEN CLICK HIDE BUTTON AND ASSERT THAT IT IS HIDDEN
    const hideButton = page.locator("#displayed-text");
    await expect(hideButton).toBeVisible();

    // CLICK HIDE BUTTON AND ASSERT THAT IT IS HIDDEN
    await page.locator("#hide-textbox").click();
    await expect(hideButton).toBeHidden();


    // 
});


test("handle java popup", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle("Practice Page");

    // THIS IS HOW WE HANDLE THE JAVA OR ALERT POPUPS
    // 1. PLAYWRIGHT STATIS LISTENING FOR A DIALOG
    // 2. THEN YOU CLICK THE BUTTON TO LAUNCH THE POPUP
    // 3. THE DIALOG/ALERT BOX APPEARS
    // 4. PLAYWRIGHT ACCEPTS IT OR DISMISSES IT 

    const confButtom = page.locator("#confirmbtn");
    // THIS WILL ACCEPT THE DIALOG POPUP
    await page.once("dialog",dialog => dialog.accept());
    await confButtom.click();
    
    // THIS WILL DISMISS THE DIALOG POPUP
    await page.once("dialog", dialog => dialog.dismiss())
    await confButtom.click();
    
    // LETS TRY ALERT BUTTON
    const alertButton = page.locator("#alertbtn");
    await alertButton.click();

});


test("MOUSE HOVER", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle("Practice Page");

    // HOVER ON AN ELEMENT
    const mouseHover = page.locator("#mousehover");
    await mouseHover.hover();

    // CLICK ON ELEMENT INSIDE THE HOVER BUTTON OPTIONS
    const topHoverButton = page.getByRole("link", {name: "Top"});
    await topHoverButton.click()

});

test.only("how to handle frames in playwright", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle("Practice Page");

    // WE NEED TO SWITCH FROM MAIN FRAME TO CHILD FRAME
    // PLAYWRIGHT NEEDS TO BE EXPLICITLY TOLD TO SWITCH FRAME TO ACCESS 

    // THIS CODE WILL GIVE YOU A NEW PAGE OBJECT
    const framePage = await page.frameLocator("#courses-iframe");

    // TO ACCESS THE FRAME INFORMATION YOU USE THE NEWLY CONSTRUCTED PAGE
    await framePage.getByRole("link", {name: "All Access plan"}).click()

    // GET TEXT FROM H2 
    const textNumber = await framePage.locator(".text h2").innerText();
    const subscribers = textNumber.split(" ")[1];
    console.log("Subscribers:", subscribers);
    // await page.waitForTimeout(3000);

});