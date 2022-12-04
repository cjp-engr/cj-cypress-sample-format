class Login {

    private usernameTextField: string = "#user-name";
    private passwordTextField: string = "#password";
    private loginButton: string = "#login-button";
    private errorMessage: string = "[data-test='error']";
    private image: string = ".bot_column";
    private burgerMenu: string = "#react-burger-menu-btn";
    private logout: string = "#logout_sidebar_link";

    get usernameTextFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.usernameTextField);
    }

    get passwordTextFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.passwordTextField);
    }

    get loginButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.loginButton);
    }

    get imageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.image);
    }

    get errorMessageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.errorMessage);
    }

    get burgerMenuElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.burgerMenu);
    }

    get logoutElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.logout);
    }

}

export const LoginPage = new Login();