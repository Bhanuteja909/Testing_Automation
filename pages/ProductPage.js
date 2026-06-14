class ProductPage {

    constructor(page) {
        this.page = page;

        this.productItems = '.inventory_item';
        this.productName = '.inventory_item_name';
        this.productPrice = '.inventory_details_price';
        this.productDescription = '.inventory_details_desc';
        this.cartBadge = '.shopping_cart_badge';

        this.backpackLink = page.locator('.inventory_item_name').first();
        this.addToCartBtn = page.locator('button:has-text("Add to cart")').first();
        this.backToProductsBtn = page.locator('#back-to-products');
    }

    async getProductCount() {
        return await this.page.locator(this.productItems).count();
    }

    async openFirstProduct() {
        await this.backpackLink.click();
    }

    async getProductDescription() {
        return await this.page.locator(this.productDescription).textContent();
    }

    async getProductPrice() {
        return await this.page.locator(this.productPrice).textContent();
    }

    async addProductToCart() {
        await this.addToCartBtn.click();
    }

    async getCartBadgeCount() {
        return await this.page.locator(this.cartBadge).textContent();
    }

    async goBackToProducts() {
        await this.backToProductsBtn.click();
    }
}

module.exports = ProductPage;