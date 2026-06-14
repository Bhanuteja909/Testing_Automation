class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.cartLink =
            '.shopping_cart_link';

        this.checkoutBtn =
            '#checkout';

        this.firstName =
            '#first-name';

        this.lastName =
            '#last-name';

        this.zipCode =
            '#postal-code';

        this.continueBtn =
            '#continue';

        this.finishBtn =
            '#finish';

        this.errorMessage =
            '[data-test="error"]';

        this.completeHeader =
            '.complete-header';

        this.completeText =
            '.complete-text';
    }

    async openCart() {
        await this.page.click(
            this.cartLink
        );
    }

    async clickCheckout() {
        await this.page.click(
            this.checkoutBtn
        );
    }

    async fillShippingDetails(
        first,
        last,
        zip
    ) {

        await this.page.fill(
            this.firstName,
            first
        );

        await this.page.fill(
            this.lastName,
            last
        );

        await this.page.fill(
            this.zipCode,
            zip
        );
    }

    async clickContinue() {
        await this.page.click(
            this.continueBtn
        );
    }

    async clickFinish() {
        await this.page.click(
            this.finishBtn
        );
    }

    async getErrorMessage() {

        return await this.page
            .locator(this.errorMessage)
            .textContent();
    }

    async getOrderHeader() {

        return await this.page
            .locator(this.completeHeader)
            .textContent();
    }

    async getOrderMessage() {

        return await this.page
            .locator(this.completeText)
            .textContent();
    }
}

module.exports = CheckoutPage;