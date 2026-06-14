const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );
});

test('Verify Product Count > 0', async ({ page }) => {

    const productPage = new ProductPage(page);

    const count = await productPage.getProductCount();

    console.log(`Product Count: ${count}`);

    expect(count).toBeGreaterThan(0);
});

test('Open Product Detail Page', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.openFirstProduct();

    await expect(page).toHaveURL(/inventory-item/);
});

test('Verify Product Description', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.openFirstProduct();

    const description =
        await productPage.getProductDescription();

    expect(description.trim().length)
        .toBeGreaterThan(0);
});

test('Verify Product Price', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.openFirstProduct();

    const price =
        await productPage.getProductPrice();

    expect(price).toContain('$');
});

test('Add Product To Cart From Detail Page', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.openFirstProduct();

    await productPage.addProductToCart();

    const badge =
        await productPage.getCartBadgeCount();

    expect(badge).toBe('1');
});

test('Verify Back Navigation', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.openFirstProduct();

    await productPage.goBackToProducts();

    await expect(page).toHaveURL(/inventory.html/);
});