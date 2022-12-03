class Cart {
    private shoppingCartButton: string = ".shopping_cart_link";
    private burgerMenuButton: string = "#react-burger-menu-btn";
    private allCartQuantityText: string = ".cart_quantity";
    private allRemoveButton: string = "button.cart_button";
    private continueShoppingButton: string = "button#continue-shopping";
    private checkoutButton: string = "button[name='checkout']";
    private inventoryItemNameText: string = ".inventory_item_name";
    private inventoryItemDescriptionText: string = ".inventory_item_desc";
    private inventoryItemPriceText: string = ".inventory_item_price";
    private emptyCart: string = ".removed_cart_item";

    get shoppingCartButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.shoppingCartButton);
    }

    get burgerMenuButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.burgerMenuButton);
    }

    get allCartQuantityTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.allCartQuantityText);
    }

    get allRemoveButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.allRemoveButton);
    }

    get continueShoppingButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.continueShoppingButton);
    }

    get checkoutButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.checkoutButton);
    }

    get inventoryItemNameTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.inventoryItemNameText);
    }

    get inventoryItemDescriptionTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.inventoryItemDescriptionText);
    }

    get inventoryItemPriceTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.inventoryItemPriceText);
    }

    get emptyCartElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.emptyCart);
    }
}

export const CartPage = new Cart();