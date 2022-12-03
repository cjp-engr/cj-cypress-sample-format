class Login {

    private username: string = "#user-name";
    private password: string = "#password";
    private login: string = "#login-button";
    private errorMessage: string = "[data-test='error']";
    private image: string = ".bot_column";
    private burgerMenu: string = "#react-burger-menu-btn";
    private logout: string = "#logout_sidebar_link";

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

    //--Image--//
    get imageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.image);
    }

    //--Error message--//
    get errorMessageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.errorMessage);
    }

    get burgerMenuElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.burgerMenu);
    }

    get logoutElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.logout);
    }

    visit(): void {
        cy.visit(`${Cypress.env('sauceLabs')}`);
    }
}

export const LoginPage = new Login();