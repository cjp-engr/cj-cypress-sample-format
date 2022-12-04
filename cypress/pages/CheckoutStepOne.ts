class CheckoutStepOne {

    private firstNameTextField: string = "input[id='first-name']";
    private lastNameTextField: string = "input[id='last-name']";
    private postalCodeTextField: string = "input[id='postal-code']";
    private continueButton: string = "input[id='continue']";
    private cancelButton: string = "button[id='cancel']";
    private burgerMenu: string = "button[id='react-burger-menu-btn']";
    private cartButton: string = "a.shopping_cart_link";
    private cartBadge: string = ".shopping_cart_badge";
    private errorMessage: string = ".error-message-container > h3[data-test='error']";


    get firstNameTextFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.firstNameTextField);
    }

    get lastNameTextFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.lastNameTextField);
    }

    get postalCodeTextFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.postalCodeTextField);
    }

    get continueButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.continueButton);
    }

    get cancelButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.cancelButton);
    }

    get burgerMenuElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.burgerMenu);
    }

    get cartButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.cartButton);
    }

    get cartBadgeElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.cartBadge);
    }

    get errorMessageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.errorMessage);
    }
}

export const CheckoutStepOnePage = new CheckoutStepOne();