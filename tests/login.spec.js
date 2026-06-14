const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

// <----------------valid credentials
test('Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
});

test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();
    await loginPage.login('standard_user', 'wrong_password');

    await expect(
        page.locator('[data-test="error"]')
    ).toBeVisible();
});

test('Locked User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(
        page.locator('[data-test="error"]')
    ).toContainText('locked out');
});

test('Empty Username', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();

    await loginPage.login(
        '',
        'secret_sauce'
    );

    await expect(
        page.locator('[data-test="error"]')
    ).toContainText(
        'Username is required'
    );

});

test('Empty Username and password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();

    await loginPage.login(
        '',
        ''
    );

    await expect(
        page.locator('[data-test="error"]')
    ).toContainText(
        'Username is required'
    );

});


test('Empty Password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openWebsite();

    await loginPage.login(
        'standard_user',
        ''
    );

    await expect(
        page.locator('[data-test="error"]')
    ).toContainText(
        'Password is required'
    );

});