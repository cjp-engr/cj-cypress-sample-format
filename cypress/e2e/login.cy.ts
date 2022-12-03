import { LoginPage } from "../../cypress/pages/Login";
import { ValidCredentials, UserList, InvalidCredentials } from "./model";

describe('Login Page', () => {
    beforeEach(() => {
        LoginPage.visit();
        cy.fixture('login').as('login')
    })

    it('Successfully displayed the image - not broken image', () => {
        LoginPage.imageElement.should('be.visible');
    });

    it('Success Login Scenario', () => {
        cy.get<ValidCredentials>('@login').then((user) => {
            LoginPage.usernameElement.type(user.validUserName);
            LoginPage.passwordElement.type(user.validPassword);
            LoginPage.loginElement.click();
            cy.url().should('contain', 'inventory.html');
            cy.clearCookies();
            cy.clearLocalStorage();
        });
    });

    it('Failed Login Scenario due to incorrect credentials', () => {
        cy.get<InvalidCredentials>('@login').then((user) => {
            LoginPage.usernameElement.type(user.invalidUserName);
            LoginPage.passwordElement.type(user.invalidPassword);
            LoginPage.loginElement.click();
            LoginPage.errorMessageElement.should('have.text',
                'Epic sadface: Username and password do not match any user in this service');
        });
    });

    it('Failed Login Scenario due to empty username and password', () => {
        LoginPage.loginElement.click();
        LoginPage.errorMessageElement.should('have.text',
            'Epic sadface: Username is required');
    });

    it('Failed Login Scenario due to valid username but empty password', () => {
        cy.get<ValidCredentials>('@login').then((user) => {
            LoginPage.usernameElement.type(user.validUserName);
            LoginPage.loginElement.click();
            LoginPage.errorMessageElement.should('have.text',
                'Epic sadface: Password is required');
        });
    });

    it('Failed Login Scenario due to empty username but password is not', () => {
        cy.get<ValidCredentials>('@login').then((user) => {
            LoginPage.usernameElement.type(user.validUserName);
            LoginPage.loginElement.click();
            LoginPage.errorMessageElement.should('have.text',
                'Epic sadface: Password is required');
        });
    });

    it('Success & Failed Login Scenario - Handling array of objects', () => {
        cy.fixture<{ users: UserList[] }>("login.json")
            .its("users")
            .then((users) => {

                users.forEach((user) => {
                    LoginPage.visit();
                    if (user.valid) {
                        LoginPage.usernameElement.type(user.username);
                        LoginPage.passwordElement.type(user.password);
                        LoginPage.loginElement.click();
                        cy.url().should('contain', 'inventory.html');

                    } else {
                        LoginPage.usernameElement.type(user.username);
                        LoginPage.passwordElement.type(user.password);
                        LoginPage.loginElement.click();
                        LoginPage.errorMessageElement.should('have.text',
                            'Epic sadface: Sorry, this user has been locked out.');
                    }
                    cy.clearCookies();
                    cy.clearLocalStorage();
                });
            });

    });

    it('Success Logout Scenario', () => {
        cy.get<ValidCredentials>('@login').then((user) => {
            LoginPage.usernameElement.type(user.validUserName);
            LoginPage.passwordElement.type(user.validPassword);
            LoginPage.loginElement.click();
            LoginPage.burgerMenuElement.should('be.visible').click();
            LoginPage.logoutElement.should('have.text', 'Logout').click();
            cy.url().should('contain', 'https://www.saucedemo.com/');
        });
    });

    it.only('Viewport iphone-6', () => {
        cy.viewport('iphone-6');
        LoginPage.imageElement.should('be.visible');
        cy.scrollTo('bottom', { duration: 300 });
    });

});

