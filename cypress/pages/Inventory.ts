class Inventory {

    //---Start - Sorting of products---//
    private sort: string = "select.product_sort_container";
    private sortNameAToZ: string = "Name (A to Z)";
    private sortNameZToA: string = "Name (Z to A)";
    private sortPriceLowToHigh: string = "Price (low to high)";
    private sortPriceHighToLow: string = "Price (high to low)";
    //---End - Sorting of products---//

    //---Start - Sauce Labs Backpack---//
    private backpackPrice: string = ".inventory_item:nth-child(1) .inventory_item_price";
    private backpackTitle: string = ".inventory_item:nth-child(1) .inventory_item_name";
    private backpackDescription: string = ".inventory_item:nth-child(1) .inventory_item_desc";
    private backpackImage: string = "#item_4_img_link > img[src='/static/media/sauce-backpack-1200x1500.34e7aa42.jpg']";
    private backpackAddToCart: string = "#add-to-cart-sauce-labs-backpack";
    private backpackRemove: string = "#remove-sauce-labs-backpack";
    //---End - Sauce Labs Backpack---//

    //---Start - inventory items---//
    private inventoryItemNames: string = ".inventory_item_name";
    private inventoryItemPrices: string = ".inventory_item_price";
    //---End - inventory items---//

    //---Start - shopping cart---//
    private shoppingCartBadge: string = ".shopping_cart_badge";
    //---End - shopping cart---//

    //---Start - All Add to card/Remove button---//
    private allAddToCart: string = "button.btn";
    private allRemove: string = "button.btn";
    //---End - All Add to card/Remove button---//

    //--Sort button--//
    get sortElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.sort);
    }

    //--Sort Name (A to Z)--//
    get sortNameAToZText(): string {
        return this.sortNameAToZ;
    }

    //--Sort Name (Z to A)--//
    get sortNameZToAText(): string {
        return this.sortNameZToA;
    }

    //--Sort Price (low to high)--//
    get sortPriceLowToHighText(): string {
        return this.sortPriceLowToHigh;
    }

    //--Sort Price (high to low)--//
    get sortPriceHighToLowText(): string {
        return this.sortPriceHighToLow;
    }

    //--Backpack price text--//
    get backpackPriceElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackPrice);
    }

    //--Backpack title text--//
    get backpackTitleElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackTitle);
    }

    //--Backpack description text--//
    get backpackDescriptionElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackDescription);
    }

    //--Backpack image--//
    get backpackImageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackImage);
    }

    //--Backpack Add to cart button--//
    get backpackAddToCartElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackAddToCart);
    }

    //--Backpack Remove button--//
    get backpackRemoveElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backpackRemove);
    }

    //--Inventory Item names list--//
    get inventoryItemNamesElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.inventoryItemNames);
    }

    //--Inventory Item prices list--//
    get inventoryItemPricesElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.inventoryItemPrices);
    }

    //--Shopping cart badge--//
    get shoppingCartBadgeElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.shoppingCartBadge);
    }

    //--All add to cart button--//
    get allAddToCardElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.allAddToCart);
    }

    //--All remove button--//
    get allRemoveElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.allRemove);
    }

    visit(): void {
        cy.visit(`${Cypress.env('sauceLabs')}`);
    }
}

export const InventoryPage = new Inventory();