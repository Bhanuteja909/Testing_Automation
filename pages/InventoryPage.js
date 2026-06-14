class ProductPage {

    constructor(page) {
        this.page = page;

        this.productItems = '.inventory_item';
        this.productNames = '.inventory_item_name';
        this.productPrices = '.inventory_item_price';
        this.productImages = '.inventory_item_img img';
        this.addToCartButtons = 'button[id^="add-to-cart"]';

        this.sortDropdown = '.product_sort_container';
    }

    async getProductCount() {
        return await this.page.locator(this.productItems).count();
    }

    async getProductNames() {
        return await this.page
            .locator(this.productNames)
            .allTextContents();
    }

    async getProductPrices() {

        const prices = await this.page
            .locator(this.productPrices)
            .allTextContents();

        return prices.map(price =>
            Number(price.replace('$', ''))
        );
    }

    async sortProducts(option) {
        await this.page.selectOption(
            this.sortDropdown,
            option
        );
    }
}

module.exports = ProductPage;