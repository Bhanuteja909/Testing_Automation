const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

});

test('Verify Product Images Have Alt Text for blind person', async ({ page }) => {

    const images = page.locator('img');

    const count = await images.count();

    for(let i = 0; i < count; i++) {

        const alt =
            await images
                .nth(i)
                .getAttribute('alt');

        expect(alt).not.toBeNull();
    }
});

test('Verify Checkout Inputs Are Visible', async ({ page }) => {

    await page.click('#add-to-cart-sauce-labs-backpack');

    await page.click('.shopping_cart_link');

    await page.click('#checkout');

    await expect(
        page.locator('#first-name')
    ).toBeVisible();

    await expect(
        page.locator('#last-name')
    ).toBeVisible();

    await expect(
        page.locator('#postal-code')
    ).toBeVisible();
});