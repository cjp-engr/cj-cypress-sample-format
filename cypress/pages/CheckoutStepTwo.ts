class CheckoutStepTwo {
    private title: string = ".title";
    private shoppingCartButton: string = "a.shopping_cart_link";
    private shoppingCartBadge: string = ".shopping_cart_badge";
    private inventoryItemNameText: string = ".inventory_item_name";
    private inventoryItemDescriptionText: string = ".inventory_item_desc";
    private inventoryItemPriceText: string = ".inventory_item_price";
    private paymentInfoValue: string = ".summary_value_label:nth-child(2)";
    private shippingInfoValue: string = ".summary_value_label:nth-child(4)";
    private itemTotalValue: string = ".summary_subtotal_label";
    private taxValue: string = ".summary_tax_label";
    private totalValue: string = ".summary_total_label";
    private finishButton: string = "button[id='finish']";
    private cancelButton: string = "button[id='cancel']";
    private burgerMenu: string = "#react-burger-menu-btn";

    get titleElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.title);
    }

    get shoppingCartButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.shoppingCartButton);
    }

    get shoppingCartBadgeElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.shoppingCartBadge);
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

    get paymentInfoValueElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.paymentInfoValue);
    }

    get shippingInfoValueElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.shippingInfoValue);
    }

    get itemTotalValueElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.itemTotalValue);
    }

    get taxValueElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.taxValue);
    }

    get totalValueElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.totalValue);
    }

    get finishButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.finishButton);
    }

    get cancelButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.cancelButton);
    }

    get burgerMenuElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.burgerMenu);
    }

}

export const CheckoutStepTwoPage = new CheckoutStepTwo();