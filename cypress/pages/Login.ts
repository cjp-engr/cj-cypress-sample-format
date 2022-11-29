class Login {

    private username: string = "#user-name";
    private password: string = "#password";
    private login: string = "#login-button";
    private errorMessage: string = "[data-test='error']";


    //--Username Text field--//
    get usernameElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.username);
    }

    //--Password Text field--//
    get passwordElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.password);
    }

    //--Login Button--//
    get loginElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.login);
    }

    //--Error message--//
    get errorMessageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.errorMessage);
    }

    visit(): void {
        cy.visit(`${Cypress.env('sauceLabs')}`);
    }
}

export const LoginPage = new Login();