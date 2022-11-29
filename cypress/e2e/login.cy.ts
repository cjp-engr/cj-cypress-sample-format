import { LoginPage } from "../../cypress/pages/Login";

describe('Login Page', () => {
    beforeEach(() => {
        LoginPage.visit();
    })

    it('Success Login Scenario', () => {
        LoginPage.usernameElement.type('standard_user');
        LoginPage.passwordElement.type('secret_sauce');
        LoginPage.loginElement.click();
        cy.url().should('contain', 'inventory.html');
    });

    it('Failed Login Scenario', () => {
        LoginPage.usernameElement.type('standard_user');
        LoginPage.passwordElement.type('secret_sauce');
        LoginPage.loginElement.click();
        cy.url().should('contain', 'inventory.html');
    });
});

