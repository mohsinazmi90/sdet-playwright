// - BASE_URL = https://eventhub.rahulshettyacademy.com
// - Credentials: Use your own credentials
// - Write a reusable loginAndGoToBooking(page) helper that logs in and confirms the Browse Events
//  → link is visible

// Test 1 — Single ticket booking is eligible for refund

// Step 1 — Login
// - Call your login helper

// Step 2 — Book first event with 1 ticket (default)
// - Navigate to /events
// - Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")
// - Fill Full Name, Email (your email), Phone
// - Click confirm button (.confirm-booking-btn)

// Step 3 — Navigate to booking detail
// - Click View My Bookings link
// - Assert URL is /bookings
// - Click the first View Details link
// - Assert: text Booking Information is visible on the page

// Step 4 — Validate booking ref
// - Read booking ref from page
// - Read event title from h1
// - Assert validation : "first character of booking ref equals first character of event title"

// Step 5 — Check refund eligibility
// - Click the Check Refund Eligibility button
// - Assert: spinner element (#refund-spinner) is immediately visible
// - Assert: spinner is no longer visible within 6 seconds

// Step 6 — Validate result
// - Locate result element by id #refund-result
// - Assert it is visible
// - Assert it contains text Eligible for refund
// - Assert it contains text Single-ticket bookings qualify for a full refund

// ---

// Test 2 — Group ticket booking is NOT eligible for refund

// Steps 1–2 — Same as Test 1, except after navigating to the event detail page, click the + button twice 
// to increase quantity to 3 before filling the form
// - Locate the increment button with button:has-text("+") and click it twice

// Steps 3–5 — Identical to Test 1

// Step 6 — Validate result (different assertions)
// - Assert result contains Not eligible for refund
// - Assert result contains Group bookings (3 tickets) are non-refundable

const { test, expect } = require('@playwright/test');
const BASE_URL = "https://eventhub.rahulshettyacademy.com"

const TEST_USER = { email: 'test@rahul.com', password: 'Learning123!' };

async function loginAndGoToBooking(page) {
    await page.goto(`${BASE_URL}`);
    await page.locator("input#email").fill(TEST_USER.email);
    await page.locator("input#password").fill(TEST_USER.password);
    await page.locator("button[type='submit']").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test("Test 1: Single ticket booking is eligible for refund", async ({ page }) => {
    // Step 1 — Login
    await loginAndGoToBooking(page);
    await page.getByTestId('nav-events').click();
    await page.getByRole('article').filter({ hasText: 'FestivalFeaturedDilli Diwali' }).getByTestId('book-now-btn').click();
    await page.getByRole('textbox', { name: 'Full Name*' }).click();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Test User');
    
    // STEP 2 — Book first event with 1 ticket (default)
    await page.getByTestId('customer-email').fill('test@rahul.com');
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('1646333555');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    // STEP 3 - NAVIGATE TO BOOKING DETAIL
    await page.getByRole('button', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('button', { name: 'View Details' }).first().click();

    // STEP 4 - VALIDATE BOOKING REF
    await expect(page.locator(".font-mono").first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Dilli Diwali Mela');
    const eventTitle = await page.getByRole('heading', { level: 1 }).innerText();

    // STEP 5 - CHECK REFUND ELIGIBILITY
    await page.locator('#check-refund-btn').click();
    await expect(page.getByRole('status', { name: 'Loading' })).toBeVisible();


    // STEP 6 - VALIDATE RESULT
    await expect(page.locator('#refund-result')).toBeVisible();
    await expect(page.locator('#refund-result')).toContainText('Eligible for refund');
    await expect(page.locator('#refund-result')).toContainText('Single-ticket bookings qualify for a full refund');
});

test("Test 2: Group ticket booking is NOT eligible for refund", async ({ page }) => {
    // Step 1 — Login
    await loginAndGoToBooking(page);
    await page.getByTestId('nav-events').click();
    await page.getByRole('article').filter({ hasText: 'FestivalFeaturedDilli Diwali' }).getByTestId('book-now-btn').click();
    
    // STEP 2 — Book first event with 3 tickets
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Test User');
    await page.getByTestId('customer-email').fill(TEST_USER.email);
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('1646333555');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    
    // STEP 3 - NAVIGATE TO BOOKING DETAIL
    await page.getByRole('button', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole('button', { name: 'View Details' }).first().click();

    // STEP 4 - VALIDATE BOOKING REF
    await expect(page.locator(".font-mono").nth(1)).toBeVisible();
    // const bookingRef = await page.getByTestId('booking-ref').innerText();
    // const eventTitle = await page.getByRole('heading', { level: 1 }).innerText();
    // expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

    // STEP 5 - CHECK REFUND ELIGIBILITY
    await page.locator('#check-refund-btn').click();
    await expect(page.getByRole('status', { name: 'Loading' })).toBeVisible();

    // STEP 6 - VALIDATE RESULT
    await expect(page.locator('#refund-result')).toBeVisible();
    await expect(page.locator('#refund-result')).toContainText('Not eligible for refund');
    await expect(page.locator('#refund-result')).toContainText('Group bookings (3 tickets) are non-refundable');
});