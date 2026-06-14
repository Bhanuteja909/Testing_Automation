const { test, expect } =
require('@playwright/test');

test(
'Login Test',
async ({ page }) => {

    console.log("1started");
    await page.goto(
        'https://www.saucedemo.com/'
    );

    await page.fill(
        '#user-name',
        'standard_user'
    );

    await page.fill(
        '#password',
        'secret_sauce'
    );

    await page.click(
        '#login-button'
    );

    await expect(page)
        .toHaveURL(
            /inventory/
        );
console.log("1ENDED");
});

test(
'Add Product Test',
async ({ page }) => {

    console.log("2started");
    await page.goto(
        'https://www.saucedemo.com/'
    );

    await page.fill(
        '#user-name',
        'standard_user'
    );

    await page.fill(
        '#password',
        'secret_sauce'
    );

    await page.click(
        '#login-button'
    );

    await page.click(
        '#add-to-cart-sauce-labs-backpack'
    );

    await expect(
        page.locator(
            '.shopping_cart_badge'
        )
    ).toHaveText('1');
console.log("2end");
});

test(
'Checkout Test',
async ({ page }) => {

    console.log("3started");
    await page.goto(
        'https://www.saucedemo.com/'
    );

    await page.fill(
        '#user-name',
        'standard_user'
    );

    await page.fill(
        '#password',
        'secret_sauce'
    );

    await page.click(
        '#login-button'
    );

    await page.click(
        '#add-to-cart-sauce-labs-backpack'
    );

    await page.click(
        '.shopping_cart_link'
    );

    await page.click(
        '#checkout'
    );

    await expect(
        page.locator(
            '#first-name'
        )
    ).toBeVisible();
console.log("3end");
});