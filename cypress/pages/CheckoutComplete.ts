class CheckoutComplete {
    private title: string = ".title";
    private headerText: string = ".complete-header";
    private bodyText: string = ".complete-text";
    private image: string = "img[src='/static/media/pony-express.46394a5d.png']";
    private backHomeButton: string = "#back-to-products";

    get titleElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.title);
    }

    get headerTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.headerText);
    }

    get bodyTextElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.bodyText);
    }

    get imageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.image);
    }

    get backHomeButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.backHomeButton);
    }
}

export const CheckoutCompletePage = new CheckoutComplete();