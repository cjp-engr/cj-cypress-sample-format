import { LoginPage } from "../../cypress/pages/Login";
import { LoginTestData, PageLinkTestData, UserList } from "./model";

describe('Login Page', () => {
    describe('Verify if the user can login successfully or not', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('page_link').as('pageLink');
            cy.visitSauceLabs();
        });

        it('TC-001 - The login should be successful after the user entered a valid username and password', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.validUserName);
                LoginPage.passwordTextFieldElement.type(data.validPassword);
                LoginPage.loginButtonElement.click();
                cy.get<PageLinkTestData>('@pageLink').then((link) => {
                    cy.url().should('contain', link.inventoryLink);
                });
                cy.clearCookies();
                cy.clearLocalStorage();
            });
        });

        it('TC-002 - The login should fail after the user entered an invalid username and password', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.invalidUserName);
                LoginPage.passwordTextFieldElement.type(data.invalidPassword);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.usernameNotRegisteredError);
            });
        });

        it('TC-003 - The login should fail due to empty username and password fields', function () {

            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.usernameIsRequiredError);
            });

        });

        it('TC-004 - The login should fail after the user entered a valid username but with empty password field', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.validUserName);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.passwordIsRequiredError);
            });
        });

        it('TC-005 - The login should fail after the user entered a password but with empty username field', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.validUserName);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.passwordIsRequiredError);
            });
        });

        it('TC-006 - The login should fail due to user being locked out', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.lockedOutUserName);
                LoginPage.passwordTextFieldElement.type(data.validPassword);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.lockedoutError);
            });
        });

        it('TC-007 - The logout should be successful after the user clicked the logout button', function () {
            cy.get<LoginTestData>('@login').then((user) => {
                LoginPage.usernameTextFieldElement.type(user.validUserName);
                LoginPage.passwordTextFieldElement.type(user.validPassword);
                LoginPage.loginButtonElement.click();
                LoginPage.burgerMenuElement.should('be.visible').click();
                LoginPage.logoutElement.should('have.text', 'Logout').click();
                cy.get<PageLinkTestData>('@pageLink').then((link) => {
                    cy.url().should('contain', link.loginLink);
                });

            });
        });

    });

});






