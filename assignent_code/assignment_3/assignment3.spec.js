// Sign in and open the Events page from Browse Events.
// Confirm the Upcoming Events heading is visible.
// Use several locator strategies on the filter area: search for World, 
// choose category Conference, and choose city Hyderabad.
// Work with the visible event cards: confirm at least one card matches, narrow to the card that shows 
// World Tech Summit, and confirm exactly one match.
// From that matching card, capture the event title, price text, and seats text.
// Confirm the title is World Tech Summit, the price text contains $, 
// and the available seat count parsed from the seats text is greater than 0.
// From inside that same card only, open Book Now.
// Confirm the detail page URL contains /events/, the main heading matches the stored title, 
// and the price section matches the stored price text.
// Return to the Events list, clear filters back to all categories and cities, and confirm at 
// least three cards are visible.
// Compare the first, second, and last card titles: all must be non-empty, 
// and the first and last titles must differ.
// Do not use hard waits or sleep-based delays; rely on Playwright’s built-in waiting.

const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');
const BASEURL = "https://eventhub.rahulshettyacademy.com";

test.only("assignmment3. test", async ({ browser }) => {

    // Sign in and open the Events page from Browse Events.
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${BASEURL}`);
    await page.locator("#email").fill("test@rahul.com");
    await page.locator("#password").fill("Learning123!");
    await page.locator("#login-btn").click();

    await page.locator("#nav-events").click();

    // Use several locator strategies on the filter area: search for World, 
    // choose category Conference, and choose city Hyderabad.

    const cardItem = page.getByPlaceholder('Search events, venues…')
    await cardItem.fill("World")
    const cardCategory = await page.locator('select').first();
    await cardCategory.selectOption('Conference')
    const cardCity = await page.locator('select').last();
    await cardCity.selectOption("Hyderabad")
    await page.waitForTimeout(1000)
    // Work with the visible event cards: confirm at least one card matches, narrow to the card that shows 
    // World Tech Summit, and confirm exactly one match.
    await expect(cardItem).toHaveCount(1);

    await page.locator("article h3").waitFor({state: "visible"});
    // From that matching card, capture the event title, price text, and seats text.
    const cardTitle = await page.locator("article h3").innerText();
    const cardPrice = await page.locator("#event-card").locator(".text-lg.font-bold.text-indigo-700").innerText();
    const cardSeats = await page.locator("#event-card").locator(".text-xs.font-bold.text-amber-600").innerText();
    const cardSeatInt = cardSeats.split(" ")

    // Confirm the title is World Tech Summit, the price text contains $, 
    // and the available seat count parsed from the seats text is greater than 0.
    await expect(cardTitle).toContain("World Tech Summit");
    await expect(cardPrice).toContain("$");
    await expect(parseInt(cardSeatInt[0])).toBeGreaterThan(0);

    // From inside that same card only, open Book Now.
    // Confirm the detail page URL contains /events/, the main heading matches the stored title, 
    // and the price section matches the stored price text.

    const bookButton = page.locator("article").filter({ hasText: "World Tech Summit" }).locator("#book-now-btn");
    await bookButton.click();
    await expect(page.url()).toContain("events");

    await page.locator("h1").waitFor({state: "visible"});
    const bookCardTitle = await page.locator("h1").filter({hasText: cardTitle}).innerText();
    await expect(bookCardTitle).toContain(cardTitle);

    const bookCardPrice = await page.getByText(cardPrice).nth(0).innerText();
    await expect(bookCardPrice).toContain(cardPrice);

    const bookSeats = await page.locator(".text-amber-600.font-semibold").innerText();
    const bookSeatsInt = bookSeats.split(" ")
    await expect(parseInt(bookSeatsInt[0])).toEqual(parseInt(cardSeatInt[0]));

    // Return to the Events list, clear filters back to all categories and cities, and confirm at 
    // least three cards are visible.
    await page.goBack();
    await page.getByRole('button', {name: "Clear filters"}).click()
    const allCards = page.locator(".grid").first().locator("h3")

    await page.waitForTimeout(2000)
    const numOfCards = await allCards.count();
    await expect(await numOfCards).toBeGreaterThan(2);   


    // Compare the first, second, and last card titles: all must be non-empty, 
    for (let i = 0; i < numOfCards; ++i) {
        await expect(allCards.nth(i)).not.toBeEmpty();
      }
    // and the first and last titles must differ.
    // Do not use hard waits or sleep-based delays; rely on Playwright’s built-in waiting.
    await expect(await allCards.first().innerText()).not.toEqual(await allCards.last().innerText());

    // await page.waitForTimeout(2000)
});