class CartPage {

    constructor(page) {
        this.page = page;

        this.cartBadge = '.shopping_cart_badge';
        this.cartLink = '.shopping_cart_link';
        this.cartItems = '.cart_item';

        this.backpackAddBtn =
            '#add-to-cart-sauce-labs-backpack';

        this.bikeLightAddBtn =
            '#add-to-cart-sauce-labs-bike-light';

        this.backpackRemoveBtn =
            '#remove-sauce-labs-backpack';

        this.checkoutBtn =
            '#checkout';
    }

    async addBackpack() {
        await this.page.click(
            this.backpackAddBtn
        );
    }

    async addBikeLight() {
        await this.page.click(
            this.bikeLightAddBtn
        );
    }

    async removeBackpack() {
        await this.page.click(
            this.backpackRemoveBtn
        );
    }

    async openCart() {
        await this.page.click(
            this.cartLink
        );
    }

    async getCartBadgeCount() {
        return await this.page
            .locator(this.cartBadge)
            .textContent();
    }

    async getCartItemsCount() {
        return await this.page
            .locator(this.cartItems)
            .count();
    }

    async getItemPrices() {

        const prices =
            await this.page
            .locator('.inventory_item_price')
            .allTextContents();

        return prices;
    }
}

module.exports = CartPage;