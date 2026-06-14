const { test, expect } =
require('@playwright/test');

const LoginPage =
require('../pages/LoginPage');

const CartPage =
require('../pages/CartPage');

test.beforeEach(async ({ page }) => {

    const loginPage =
        new LoginPage(page);

    await loginPage.openWebsite();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );
});

test(
'Add Multiple Products',
async ({ page }) => {

    const cartPage =
        new CartPage(page);

    await cartPage.addBackpack();

    await cartPage.addBikeLight();

    const badge =
        await cartPage
        .getCartBadgeCount();

    expect(badge).toBe('2');
});

test(
'Remove Product',
async ({ page }) => {

    const cartPage =
        new CartPage(page);

    await cartPage.addBackpack();

    await cartPage.removeBackpack();

    await expect(
        page.locator(
          '.shopping_cart_badge'
        )
    ).toHaveCount(0);
});

test(
'Cart Badge Update',
async ({ page }) => {

    const cartPage =
        new CartPage(page);

    await cartPage.addBackpack();

    let badge =
        await cartPage
        .getCartBadgeCount();

    expect(badge).toBe('1');

    await cartPage.addBikeLight();

    badge =
        await cartPage
        .getCartBadgeCount();

    expect(badge).toBe('2');
});

test(
'Verify Cart Items Count',
async ({ page }) => {

    const cartPage =
        new CartPage(page);

    await cartPage.addBackpack();

    await cartPage.addBikeLight();

    await cartPage.openCart();

    const count =
        await cartPage
        .getCartItemsCount();

    expect(count).toBe(2);
});

test(
'Verify Subtotal Calculation',
async ({ page }) => {

    const cartPage =
        new CartPage(page);

    await cartPage.addBackpack();

    await cartPage.addBikeLight();

    await cartPage.openCart();

    const prices =
        await page
        .locator('.inventory_item_price')
        .allTextContents();

    let total = 0;

    for (const price of prices) {

        total += parseFloat(
            price.replace('$', '')
        );
    }

    console.log(
      'Calculated Total = ',
      total
    );

    expect(total)
      .toBeGreaterThan(0);
});