// Step 1 — Login
// - Navigate to /login
// - Fill email field (locate by placeholder you@email.com)
// - Fill password field (locate by label Password)
// - Click the login button (locate by id #login-btn)
// - Assert: link with text Browse Events → is visible (confirms login success)

// Step 2 — Create a new event
// - Navigate to /admin/events
// - Generate a unique event title using Test Event ${Date.now()} — store this in a variable, you will need it throughout the test
// - Fill Title field (locate by id #event-title-input)
// - Fill Description textarea (locate using #admin-event-form textarea)
// - Fill City field (locate by label City)
// - Fill Venue field (locate by label Venue)
// - Fill Event Date & Time field (locate by label Event Date & Time) — use your futureDateValue() helper
// - Fill Price ($) field (locate by label Price ($)) — use any number e.g. 100
// - Fill Total Seats field (locate by label Total Seats) — use 50
// - Click the submit button (locate by id #add-event-btn)
// - Assert: toast message Event created! is visible

// Step 3 — Find the event card and capture seats
// - Navigate to /events
// - Get all event cards (locate by data-testid="event-card")
// - Assert the first card is visible (confirms page loaded)
// - From all cards, filter for the one that contains your event title text
// - Assert the matched card is visible (timeout 5 seconds)
// - Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking

// Step 4 — Start booking
// - On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" 
// inside the card)


// Step 5 — Fill booking form
// - Assert: element with id #ticket-count has text 1 (default quantity)
// - Fill Full Name (locate by label Full Name)
// - Fill Email (locate by id #customer-email)
// - Fill Phone (locate by placeholder +91 98765 43210)
// - Click the confirm button (locate by CSS class .confirm-booking-btn)

// Step 6 — Verify booking confirmation
// - Locate the booking reference element (locate by CSS class .booking-ref, take .first())
// - Assert it is visible
// - Read its inner text, trim it — store as bookingRef

// Step 7 — Verify in My Bookings
// - Click the link View My Bookings
// - Assert: URL is BASE_URL/bookings
// - Get all booking cards (locate by id #booking-card)
// - Assert the first booking card is visible
// - Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text
// - Assert that matched card is visible
// - Assert that matched card contains your eventTitle text

// Step 8 — Verify seat reduction
// - Navigate back to /events
// - Assert the first event card is visible
// - Filter cards again using hasText: eventTitle
// - Assert the card is visible
// - Read the seat count text again (same as Step 3) — store as seatsAfterBooking
// - Assert: seatsAfterBooking === seatsBeforeBooking - 1

// CODE BELOW

const { test, expect } = require('@playwright/test');
const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'

test('User can book an event and see it in My Bookings', async ({ browser }) => {
    // ------------------------
    // Step 1 — Login
    // ------------------------
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`${BASE_URL}`);

    // LOCATORS FOR LOGIN PAGE
    const email = page.locator("input#email");
    const password = page.locator("input#password");
    const loginButton = page.locator("button#login-btn");

    // LOGIN
    await email.fill("test@rahul.com");
    await password.fill("Learning123!")
    await loginButton.click();

    // ASSERT LOGIN SUCCESS
    await expect(page.getByRole('link', { name: 'Browse Events' }).first()).toBeVisible();

    // ------------------------
    // STEP 2
    // ------------------------

    // NAVIGATE TO ADMIN EVENTS PAGE
    const adminButton = page.getByRole('button', { name: 'Admin' });
    await adminButton.click();
   
    const eventsLink = page.getByRole('link', { name: 'Manage Events' }).first();
    await eventsLink.click();

    // LOCATORS FOR CREATE EVENT FORM
    const titleInput = page.locator("input#event-title-input");
    const descriptionInput = page.locator("[placeholder='Describe the event…']"); 
    const categorySelect = page.locator("select#category");
    const cityInput = page.locator("input#city");
    const venueInput = page.locator("input#venue");
    const dateTimeInput = page.locator('input[type="datetime-local"]');
    const priceInput = page.locator('input[placeholder="0.00"]');
    const totalSeatsInput = page.locator("input#total-seats");
    const submitButton = page.locator("button#add-event-btn");

    // FILL IN FORM
    await titleInput.fill(`Test Event 1`);
    await descriptionInput.fill("This is a test event for automation testing.");
    await categorySelect.selectOption("Festival");
    await cityInput.fill("Test City");
    await venueInput.fill("Test Venue");
    await dateTimeInput.fill("2026-12-31T10:00");
    await priceInput.fill("100");
    await totalSeatsInput.fill("50");
    await submitButton.click();

    const toastMessage = page.locator('[aria-live="polite"]');
    await expect(toastMessage).toContainText("Event created!");

    // ------------------------
    // STEP 3
    // ------------------------

    const eventsLink2 = page.locator("#nav-events");
    await eventsLink2.click();

    const eventCards = page.locator('[data-testid="event-card"]');
    await expect(eventCards.first()).toBeVisible();

    const matchedCard = eventCards.filter({ hasText: "Test Event 1" });
    await expect(matchedCard).toBeVisible({ timeout: 3000 });

    const seatLocator = await matchedCard.filter({hasText: "seats available"});
    const seatBeforeBooking = await seatLocator.innerText();
    const seatCount = parseInt(seatBeforeBooking.match(/(\d+)\s+seats/)[1], 10);
    console.log("Seats before booking: ", seatCount);


    // ------------------------
    // STEP 4
    // ------------------------

    await matchedCard.locator('[data-testid="book-now-btn"]').click();
    
    // ------------------------
    // STEP 5
    // ------------------------

    // ASSERT TICKET COUNT IS 1
    const ticketCount = page.locator("#ticket-count");
    await expect(ticketCount).toHaveText("1");

    // LOCATORS FOR BOOKING FORM
    const fullNameInput = page.locator("input#customerName");
    const emailInput = page.locator("input#customer-email");
    const phoneInput = page.locator("input#phone");
    const confirmButton = page.locator("#confirm-booking");
    
    // FILL IN BOOKING FORM
    await fullNameInput.fill("Test User");
    await emailInput.fill("testuser@rahul.com");
    await phoneInput.fill("+16463335555");
    await confirmButton.click();

    // ------------------------
    // STEP 6
    // ------------------------

    const bookingRefLocator = page.locator(".booking-ref").first();
    await expect(bookingRefLocator).toBeVisible();
    const bookingRef = (await bookingRefLocator.innerText()).trim();
    console.log("Booking Reference: ", bookingRef);

    // ------------------------
    // STEP 7
    // ------------------------

    const viewMyBookingsLink = page.locator('[data-testid="nav-bookings"]');
    await viewMyBookingsLink.click();

    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    const bookingCards = page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    
    const matchedBookingCard = bookingCards.filter({ has: page.locator(`.booking-ref:has-text("${bookingRef}")`) });
    await expect(matchedBookingCard).toBeVisible();
    await expect(matchedBookingCard).toContainText("Test Event 1");

    // ------------------------
    // STEP 8
    // ------------------------

    await eventsLink2.click();
    await expect(eventCards.first()).toBeVisible();
    await page.waitForTimeout(1000); // Wait for the page to update after booking
    const matchedCardAfterBooking = eventCards.filter({ hasText: "Test Event 1" });
    await expect(matchedCardAfterBooking).toBeVisible({ timeout: 3000 });

    const seatLocatorAfterBooking = await matchedCardAfterBooking.filter({hasText: "seats available"});
    const seatAfterBooking = await seatLocatorAfterBooking.innerText();
    const seatCountAfterBooking = parseInt(seatAfterBooking.match(/(\d+)\s+seats/)[1], 10);
    console.log("Seats after booking: ", seatCountAfterBooking);
    
    console.log("Seats before booking: ", seatCount);
    console.log("Seats after booking: ", seatCountAfterBooking);
    expect(seatCountAfterBooking).toBe(seatCount - 1);



    await page.pause();
});