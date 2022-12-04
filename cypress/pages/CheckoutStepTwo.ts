class CheckoutStepTwo {
    private title: string = "";
    private shoppingCartButton: string = "";
    private inventoryItemNameText: string = "";
    private inventoryItemDescriptionText: string = "";
    private inventoryItemPriceText: string = "";
    private paymentInfoValue: string = ".summary_value_label:nth-child(2)";
    private shippingInfoValue: string = ".summary_value_label:nth-child(4)";
    private itemTotalValue: string = "";
    private taxValue: string = "";
    private totalValue: string = "";
    private finishButton: string = "";

    get titleElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.title);
    }

    get shoppingCartButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.shoppingCartButton);
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

}