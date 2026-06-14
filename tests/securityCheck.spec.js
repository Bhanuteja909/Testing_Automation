const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');


test('Verify Application Handles Script Injection', async ({ page }) => {

    // Track JavaScript alerts
    let alertTriggered = false;

    page.on('dialog', async dialog => {

        alertTriggered = true;
        console.log(
            'Unexpected Alert:',
            dialog.message()
        );
        await dialog.dismiss();

    });

    const loginPage = new LoginPage(page);
    await loginPage.openWebsite();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);

    // Add product
    await page.click(
        '#add-to-cart-sauce-labs-backpack'
    );

    // Open cart
    await page.click(
        '.shopping_cart_link'
    );

    // Checkout
    await page.click(
        '#checkout'
    );

    // XSS Payload
    const scriptPayload =
        "<script>alert('Hacked')</script>";

    await page.fill(
        '#first-name',
        scriptPayload
    );

    await page.fill(
        '#last-name',
        scriptPayload
    );

    await page.fill(
        '#postal-code',
        '600001'
    );

    // Continue checkout
    await page.click(
        '#continue'
    );

    // Verify no alert executed
    expect( alertTriggered).toBeFalsy();

    // Verify user moved to next page
    await expect(page).toHaveURL(/checkout-step-two/);
    console.log('Application safely handled script input');

});



test('Verify Application Handles SQL Injection Input', async ({ page }) => {

    let alertTriggered = false;

    page.on('dialog', async dialog => {

        alertTriggered = true;

        await dialog.dismiss();

    });

    const loginPage = new LoginPage(page);
    await loginPage.openWebsite();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.click(
        '#add-to-cart-sauce-labs-backpack'
    );

    await page.click(
        '.shopping_cart_link'
    );

    await page.click(
        '#checkout'
    );

    const sqlPayload =
        "' OR '1'='1";

    await page.fill(
        '#first-name',
        sqlPayload
    );

    await page.fill(
        '#last-name',
        sqlPayload
    );

    await page.fill(
        '#postal-code',
        '600001'
    );

    await page.click(
        '#continue'
    );

    expect(
        alertTriggered
    ).toBeFalsy();

    await expect(page)
        .toHaveURL(
            /checkout-step-two/
        );

    console.log(
        'Application safely handled SQL injection input'
    );

});