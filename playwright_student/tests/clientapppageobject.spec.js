const { test, expect } = require('@playwright/test')
const { customtest } = require('../utils/base-fixtures')
const {POManager} = require('../pageobjects/POManager')
const testdata = require('../testdata/placeorderTestData.json')

for(const data of testdata)
{
    test(`Content browser validation - ${data.productName}`, async ({ page }) => {

        // Setup the Page Object Manager (POManager)
        const POmanager = new POManager(page);

        // Use POManager to get the data from other pages
        const loginPage = POmanager.getLoginPage();
        const dashBoardPage = POmanager.getDashBoardPage();

        await loginPage.goToLoginPage()
        await loginPage.validLogin(data.username, data.password)

        await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

        await dashBoardPage.searchProduct(data.productName);
        await dashBoardPage.navigateToCart()

        await page.waitForTimeout(2000)

    });
};

customtest('Content browser validation', async ({page, TestDataForOrder }) => {

    // Setup the Page Object Manager (POManager)
    const POmanager = new POManager(page);

    // Use POManager to get the data from other pages
    const loginPage = POmanager.getLoginPage();
    const dashBoardPage = POmanager.getDashBoardPage();

    await loginPage.goToLoginPage()
    await loginPage.validLogin(TestDataForOrder.username, TestDataForOrder.password)

    await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

    await dashBoardPage.searchProduct(TestDataForOrder.productName);
    await dashBoardPage.navigateToCart()

    await page.waitForTimeout(2000)

});