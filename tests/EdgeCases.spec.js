const { test, expect, devices } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

// // ════════════════════════════════════════
// // EDGE CASE 1 — Network Failure Simulation
// // ════════════════════════════════════════

test('Network Failure Simulation', async ({ page }) => {

    await page.route('**/*', route => route.abort());

    try {
        await page.goto(
            'https://www.saucedemo.com/',
            { timeout: 10000 }
        );
    } catch (error) {
        console.log('Network failure simulated successfully');
        expect(error).toBeTruthy();
    }

});

// ════════════════════════════════════════
// EDGE CASE 2 — Slow Loading User
// ════════════════════════════════════════

test('Performance Glitch User Login', async ({ page }) => {

    const obj= new LoginPage(page);
    await obj.openWebsite();
    await obj.login('performance_glitch_user', 'secret_sauce');


    await expect(page).toHaveURL(/inventory.html/);

    console.log('Performance user login successful');

});

// // ════════════════════════════════════════
// // EDGE CASE 3 — Mobile Viewport Validation
// // ════════════════════════════════════════

test('Mobile Viewport Check', async ({ page }) => {

    await page.setViewportSize({
        width: 375,
        height: 667,
    });

    await page.goto('https://www.saucedemo.com/');

     const obj= new LoginPage(page);
    await obj.openWebsite();
    await obj.login('standard_user', 'secret_sauce');


    await expect(
        page.locator('.shopping_cart_link')
    ).toBeVisible();

    await expect(
        page.locator('.inventory_list')
    ).toBeVisible();

    console.log('Mobile viewport validation successful');

});

// ════════════════════════════════════════
// EDGE CASE 4 — iPhone Device Emulation
// ════════════════════════════════════════

test.use(devices['iPhone 13']);

test('iPhone 13 Login Validation', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

     const obj= new LoginPage(page);
    await obj.openWebsite();
    await obj.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);

    await expect(
        page.locator('.shopping_cart_link')
    ).toBeVisible();

    console.log('iPhone device validation successful');

});