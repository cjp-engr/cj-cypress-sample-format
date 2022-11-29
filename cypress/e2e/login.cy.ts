import { LoginPage } from "../../cypress/pages/Login";
import { ValidCredentials, UserList, InvalidCredentials } from "./model";

describe('Login Page', () => {
    beforeEach(() => {
        LoginPage.visit();
        cy.fixture('login').as('login')
    })

    it('Success Login Scenario', () => {
        cy.get<ValidCredentials>('@login').then((user) => {
            LoginPage.usernameElement.type(user.validUserName);
            LoginPage.passwordElement.type(user.validPassword);
            LoginPage.loginElement.click();
            cy.url().should('contain', 'inventory.html');

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

    it('Success Login Scenario - Handling array of objects', () => {
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
});

