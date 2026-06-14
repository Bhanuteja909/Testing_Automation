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


test('Inventory Page Smoke Test', async ({ page }) => {

    await expect(
        page.locator('.inventory_list')
    ).toBeVisible();

    await expect(
        page.locator('.shopping_cart_link')
    ).toBeVisible();
});

test('Cart Page Smoke Test', async ({ page }) => {

    await page.click('.shopping_cart_link');

    await expect(
        page.locator('.title')
    ).toContainText('Your Cart');

    await expect(
        page.locator('#checkout')
    ).toBeVisible();
});

test('Checkout Page Smoke Test', async ({ page }) => {

    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    await expect(
        page.locator('#first-name')
    ).toBeVisible();

    await expect(
        page.locator('#continue')
    ).toBeVisible();
});