const { test, expect } =
require('@playwright/test');

const LoginPage =
require('../pages/LoginPage');

const CartPage =
require('../pages/CartPage');

const CheckoutPage =
require('../pages/CheckoutPage');

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
'Checkout With Empty Cart',
async ({ page }) => {

    const checkoutPage =
        new CheckoutPage(page);

    await checkoutPage.openCart();

    const items =
        await page
        .locator('.cart_item')
        .count();

    expect(items).toBe(0);
});

test(
'Empty Checkout Form Validation',
async ({ page }) => {

    const cartPage =
        new CartPage(page);

    const checkoutPage =
        new CheckoutPage(page);

    await cartPage.addBackpack();

    await checkoutPage.openCart();

    await checkoutPage.clickCheckout();

    await checkoutPage.clickContinue();

    const error =
        await checkoutPage
        .getErrorMessage();

    expect(error)
        .toContain(
          'First Name is required'
        );
});

test(
'Invalid Shipping Data',
async ({ page }) => {

    const cartPage =  new CartPage(page);

    const checkoutPage = new CheckoutPage(page);
    await cartPage.addBackpack();
    await checkoutPage.openCart();
    await checkoutPage.clickCheckout();

    await checkoutPage
        .fillShippingDetails(
            '12345',
            '@@@@',
            'ABC'
        );

    await checkoutPage.clickContinue();

    await expect(page)
        .toHaveURL(
          /checkout-step-two/
        );
});

test('Successful Checkout',async ({ page }) => {

    const cartPage =
        new CartPage(page);

    const checkoutPage =
        new CheckoutPage(page);

    await cartPage.addBackpack();

    await checkoutPage.openCart();

    await checkoutPage.clickCheckout();

    await checkoutPage
        .fillShippingDetails(
            'Bhanu',
            'Teja',
            '600001'
        );

    await checkoutPage.clickContinue();

    await checkoutPage.clickFinish();

    const header =
        await checkoutPage
        .getOrderHeader();

    expect(header).toContain('Thank you');
});

test('Verify Order Confirmation Content',async ({ page }) => {

    const cartPage =
        new CartPage(page);

    const checkoutPage =
        new CheckoutPage(page);

    await cartPage.addBackpack();

    await checkoutPage.openCart();

    await checkoutPage.clickCheckout();

    await checkoutPage
        .fillShippingDetails(
            'Bhanu',
            'Teja',
            '600001'
        );

    await checkoutPage.clickContinue();

    await checkoutPage.clickFinish();

    const message =
        await checkoutPage
        .getOrderMessage();

    expect(message)
        .toContain(
          'Your order has been dispatched'
        );
});