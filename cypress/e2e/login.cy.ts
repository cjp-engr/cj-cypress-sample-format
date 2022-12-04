import { LoginPage } from "../../cypress/pages/Login";
import { LoginTestData, UserList } from "./model";

describe('Login Page', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
    })

    it('Successfully displayed the image - not broken image', () => {
        LoginPage.imageElement.should('be.visible');
    });

    it('Success Login Scenario', () => {
        cy.get<LoginTestData>('@login').then((data) => {
            LoginPage.usernameTextFieldElement.type(data.validUserName);
            LoginPage.passwordTextFieldElement.type(data.validPassword);
            LoginPage.loginButtonElement.click();
            cy.url().should('contain', 'inventory.html');
            cy.clearCookies();
            cy.clearLocalStorage();
        });
    });

    it('Failed Login Scenario due to incorrect credentials', () => {
        cy.get<LoginTestData>('@login').then((data) => {
            LoginPage.usernameTextFieldElement.type(data.invalidUserName);
            LoginPage.passwordTextFieldElement.type(data.invalidPassword);
            LoginPage.loginButtonElement.click();
            LoginPage.errorMessageElement.should('have.text',
                data.usernameNotRegisteredError);
        });
    });

    it('Failed Login Scenario due to empty username and password', () => {

        cy.get<LoginTestData>('@login').then((data) => {
            LoginPage.loginButtonElement.click();
            LoginPage.errorMessageElement.should('have.text',
                data.usernameIsRequiredError);
        });

    });

    it('Failed Login Scenario due to valid username but empty password', () => {
        cy.get<LoginTestData>('@login').then((data) => {
            LoginPage.usernameTextFieldElement.type(data.validUserName);
            LoginPage.loginButtonElement.click();
            LoginPage.errorMessageElement.should('have.text',
                data.passwordIsRequiredError);
        });
    });

    it('Failed Login Scenario due to empty username but password is not', () => {
        cy.get<LoginTestData>('@login').then((data) => {
            LoginPage.usernameTextFieldElement.type(data.validUserName);
            LoginPage.loginButtonElement.click();
            LoginPage.errorMessageElement.should('have.text',
                data.passwordIsRequiredError);
        });
    });

    //todo
    it('Failed Login Scenario because the user is locked out', () => {
        cy.get<LoginTestData>('@login').then((data) => {
            LoginPage.usernameTextFieldElement.type(data.lockedOutUserName);
            LoginPage.passwordTextFieldElement.type(data.validPassword);
            LoginPage.loginButtonElement.click();
            LoginPage.errorMessageElement.should('have.text',
                data.lockedoutError);
        });
    });

    it('Success & Failed Login Scenario - Handling array of objects', () => {
        cy.fixture<{ users: UserList[] }>("login.json")
            .its("users")
            .then((users) => {

                users.forEach((user) => {
                    cy.visitSauceLabs();
                    if (user.valid) {
                        LoginPage.usernameTextFieldElement.type(user.username);
                        LoginPage.passwordTextFieldElement.type(user.password);
                        LoginPage.loginButtonElement.click();
                        cy.url().should('contain', 'inventory.html');

                    } else {
                        LoginPage.usernameTextFieldElement.type(user.username);
                        LoginPage.passwordTextFieldElement.type(user.password);
                        LoginPage.loginButtonElement.click();
                        cy.get<LoginTestData>('@login').then((data) => {
                            LoginPage.errorMessageElement.should('have.text',
                                data.lockedoutError);
                        });

                    }
                    cy.clearCookies();
                    cy.clearLocalStorage();
                });
            });

    });

    it('Success Logout Scenario', () => {
        cy.get<LoginTestData>('@login').then((user) => {
            LoginPage.usernameTextFieldElement.type(user.validUserName);
            LoginPage.passwordTextFieldElement.type(user.validPassword);
            LoginPage.loginButtonElement.click();
            LoginPage.burgerMenuElement.should('be.visible').click();
            LoginPage.logoutElement.should('have.text', 'Logout').click();
            cy.url().should('contain', 'https://www.saucedemo.com/');
        });
    });

    it('Viewport iphone-6', () => {
        cy.viewport('iphone-6');
        LoginPage.imageElement.should('be.visible');
        cy.scrollTo('bottom', { duration: 300 });
    });

});

