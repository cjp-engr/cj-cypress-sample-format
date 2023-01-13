class Inventory {

    //---Start - Sorting of products---//
    private sort: string = "select.product_sort_container";
    // private sortNameAToZ: string = "Name (A to Z)";
    // private sortNameZToA: string = "Name (Z to A)";
    // private sortPriceLowToHigh: string = "Price (low to high)";
    // private sortPriceHighToLow: string = "Price (high to low)";
    private sortNameAToZ: string = "az";
    private sortNameZToA: string = "za";
    private sortPriceLowToHigh: string = "lohi";
    private sortPriceHighToLow: string = "hilo";
    //---End - Sorting of products---//

    //---Start - Sauce Labs Backpack---//
    private backpackPriceText: string = ".inventory_item:nth-child(1) .inventory_item_price";
    private backpackTitleText: string = ".inventory_item:nth-child(1) .inventory_item_name";
    private backpackDescriptionText: string = ".inventory_item:nth-child(1) .inventory_item_desc";
    private backpackImage: string = "#item_4_img_link > img[src='/static/media/sauce-backpack-1200x1500.34e7aa42.jpg']";
    private backpackAddToCartButton: string = "#add-to-cart-sauce-labs-backpack";
    private backpackRemoveButton: string = "#remove-sauce-labs-backpack";
    //---End - Sauce Labs Backpack---//

    //---Start - inventory items text---//
    private allProductNamesText: string = ".inventory_item_name";
    private allProductPricesText: string = ".inventory_item_price";
    //---End - inventory items text---//

    //---Start - shopping cart---//
    private shoppingCartBadge: string = ".shopping_cart_badge";
    private shoppingCartButton: string = ".shopping_cart_link";
    //---End - shopping cart---//

    //---Start - All Add to card/Remove button---//
    private allAddToCartButton: string = "button.btn";
    private allRemoveButton: string = "button.btn";
    //---End - All Add to card/Remove button---//

    private burgerMenu: string = "";

    private addToCartIndex: number;

    get sortButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.sort);
    }

    get sortNameAToZText(): string {
        return this.sortNameAToZ;
    }

    get sortNameZToAText(): string {
        return this.sortNameZToA;
    }

    get sortPriceLowToHighText(): string {
        return this.sortPriceLowToHigh;
    }

    get sortPriceHighToLowText(): string {
        return this.sortPriceHighToLow;
    }

    get backpackPriceTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackPriceText);
    }

    get backpackTitleTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackTitleText);
    }

    get backpackDescriptionTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackDescriptionText);
    }

    get backpackImageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackImage);
    }

    get backpackAddToCartButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackAddToCartButton);
    }

    get backpackRemoveButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackRemoveButton);
    }

    get allProductNamesTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.allProductNamesText);
    }

    get allProductPricesTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.allProductPricesText);
    }

    get shoppingCartBadgeElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.shoppingCartBadge);
    }

    get shoppingCartButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.shoppingCartButton);
    }

    get allAddToCardButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.allAddToCartButton);
    }

    get allRemoveButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.allRemoveButton);
    }

    set setAddToCartIndex(index: number) {
        this.addToCartIndex = index;
    }

    get dynamicAddToCardElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(`.inventory_item:nth-child(${this.addToCartIndex}) button.btn_inventory`)
    }
}

export const InventoryPage = new Inventory();