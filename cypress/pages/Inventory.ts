class Inventory {

    private sort: string = "select.product_sort_container";
    //---Start - Sauce Labs Backpack---//
    private backpackPrice: string = ".inventory_item:nth-child(1) .inventory_item_price";
    private backpackTitle: string = ".inventory_item:nth-child(1) .inventory_item_name";
    private backpackDescription: string = ".inventory_item:nth-child(1) .inventory_item_desc";
    private backpackImage: string = "#item_4_img_link > img[src='/static/media/sauce-backpack-1200x1500.34e7aa42.jpg']";
    private backpackAddToCart: string = "#add-to-cart-sauce-labs-backpack";
    private backpackRemove: string = "#remove-sauce-labs-backpack";
    //---End - Sauce Labs Backpack---//

    //--Sort button--//
    get sortElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.sort);
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

    visit(): void {
        cy.visit(`${Cypress.env('sauceLabs')}`);
    }
}

export const InventoryPage = new Inventory();