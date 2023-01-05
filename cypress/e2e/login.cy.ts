import { LoginPage } from "../../cypress/pages/Login";
import { LoginTestData, PageLinkTestData, UserList } from "./model";

describe('Login Page', () => {
    describe('Verify if the user can login successfully or not', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('page_link').as('pageLink');
            cy.visitSauceLabs();
        });

        it('The image should display after the page has been loaded', function () {
            LoginPage.imageElement.should('be.visible');
        });

        it('The login attempt should be successful after the user entered a valid username and password', function () {
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

        it('The login attempt should fail after the user entered an invalid username and password', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.invalidUserName);
                LoginPage.passwordTextFieldElement.type(data.invalidPassword);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.usernameNotRegisteredError);
            });
        });

        it('The login attempt should fail due to empty username and password fields', function () {

            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.usernameIsRequiredError);
            });

        });

        it('The login attempt should fail after the user entered a valid username but with empty password field', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.validUserName);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.passwordIsRequiredError);
            });
        });

        it('The login attempt should fail after the user entered a password but with empty username field', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.validUserName);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.passwordIsRequiredError);
            });
        });

        it('The login attempt should fail due to user being locked out', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.lockedOutUserName);
                LoginPage.passwordTextFieldElement.type(data.validPassword);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.lockedoutError);
            });
        });

        it('Success & Failed Login Scenario - Handling array of objects', function () {
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

        it('The logout attempt should be successful after the user clicked the logout button', function () {
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

        it('Viewport iphone-6', function () {
            cy.viewport('iphone-6');
            LoginPage.imageElement.should('be.visible');
            cy.scrollTo('bottom', { duration: 300 });
        });

    });

    describe('Attempt visiting the pages other than the login page if the user is not yet logged in scenarios', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('page_link').as('pageLink');
        })

        it('The error message should display if the user is not yet login and entered the "https://www.saucedemo.com/inventory.html" in the url field', function () {
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.visit(link.inventoryLink, { failOnStatusCode: false });
                cy.request({
                    url: link.inventoryLink,
                    failOnStatusCode: false,
                }).then((resp) => {
                    expect(resp.status).to.eq(404)
                });
            });
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.errorMessageElement.should('have.text',
                    data.inventoryLinkError);
            });
        });

        it('The error message should display if the user is not yet login and entered the "https://www.saucedemo.com/cart.html" in the url field', function () {
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.visit(link.cartLink, { failOnStatusCode: false });
                cy.request({
                    url: link.cartLink,
                    failOnStatusCode: false,
                }).then((resp) => {
                    expect(resp.status).to.eq(404)
                });
            });
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.errorMessageElement.should('have.text',
                    data.cartLinkError);
            });
        });

        it('The error message should display if the user is not yet login and entered the "https://www.saucedemo.com/checkout-step-one.html" in the url field', function () {
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.visit(link.checkoutOneLink, { failOnStatusCode: false });
                cy.request({
                    url: link.checkoutOneLink,
                    failOnStatusCode: false,
                }).then((resp) => {
                    expect(resp.status).to.eq(404)
                });
            });
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.errorMessageElement.should('have.text',
                    data.checkoutOneLinkError);
            });
        });

        it('The error message should display if the user is not yet login and entered the "https://www.saucedemo.com/checkout-step-two.html" in the url field', function () {
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.visit(link.checkoutTwoLink, { failOnStatusCode: false });
                cy.request({
                    url: link.checkoutTwoLink,
                    failOnStatusCode: false,
                }).then((resp) => {
                    expect(resp.status).to.eq(404)
                });
            });
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.errorMessageElement.should('have.text',
                    data.checkoutTwoLinkError);
            });
        });

        it('The error message should display if the user is not yet login and entered the "https://www.saucedemo.com/checkout-complete.html" in the url field', function () {
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.visit(link.checkoutComplete, { failOnStatusCode: false });
                cy.request({
                    url: link.checkoutComplete,
                    failOnStatusCode: false,
                }).then((resp) => {
                    expect(resp.status).to.eq(404)
                });
            });
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.errorMessageElement.should('have.text',
                    data.checkoutCompleteError);
            });
        });

    });
});






