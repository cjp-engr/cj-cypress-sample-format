class Login {

    private username: string = "#user-name";
    private password: string = "#password";
    private login: string = "#login-button";

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

    visit(): void {
        cy.visit(`${Cypress.env('sauceLabs')}`);
    }
}

export const LoginPage = new Login();