const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/InventoryPage');

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

});

test('Verify products count greater than zero', async ({ page }) => {

    const productPage = new ProductPage(page);

    const productCount =
        await productPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);

});

test('Verify product tile elements', async ({ page }) => {

    const productPage = new ProductPage(page);

    const productCount =
        await productPage.getProductCount();

    for (let i = 0; i < productCount; i++) {

        await expect(
            page.locator('.inventory_item_name').nth(i)
        ).toBeVisible();

        await expect(
            page.locator('.inventory_item_price').nth(i)
        ).toBeVisible();

        await expect(
            page.locator('.inventory_item_img img').nth(i)
        ).toBeVisible();

        await expect(
            page.locator('button[id^="add-to-cart"]').nth(i)
        ).toBeVisible();

    }

});

test('Verify product names are not empty', async ({ page }) => {

    const productPage = new ProductPage(page);

    const productNames =
        await productPage.getProductNames();

    for (const name of productNames) {

        expect(
            name.trim().length
        ).toBeGreaterThan(0);

    }

});

test('Verify product prices are greater than zero', async ({ page }) => {

    const productPage = new ProductPage(page);

    const prices =
        await productPage.getProductPrices();

    for (const price of prices) {

        expect(price).toBeGreaterThan(0);

    }

});

test('Verify sorting A to Z', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.sortProducts('az');

    const actualNames =
        await productPage.getProductNames();

    const expectedNames =
        [...actualNames].sort();

    expect(actualNames)
        .toEqual(expectedNames);

});

test('Verify sorting Z to A', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.sortProducts('za');

    const actualNames =
        await productPage.getProductNames();

    const expectedNames =
        [...actualNames]
            .sort()
            .reverse();

    expect(actualNames)
        .toEqual(expectedNames);

});

test('Verify price sorting low to high', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.sortProducts('lohi');

    const actualPrices =
        await productPage.getProductPrices();

    const expectedPrices =
        [...actualPrices].sort(
            (a, b) => a - b
        );

    expect(actualPrices)
        .toEqual(expectedPrices);

});

test('Verify price sorting high to low', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.sortProducts('hilo');

    const actualPrices =
        await productPage.getProductPrices();

    const expectedPrices =
        [...actualPrices].sort(
            (a, b) => b - a
        );

    expect(actualPrices)
        .toEqual(expectedPrices);

});