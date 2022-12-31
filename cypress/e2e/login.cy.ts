import { LoginPage } from "../../cypress/pages/Login";
import { LoginTestData, PageLinkTestData, UserList } from "./model";

describe('Login Page', () => {
    describe('Verify if the user can login successfully or not', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('page_link').as('pageLink');
            cy.visitSauceLabs();
        });

        it('Should display the image successfully and not broken', function () {
            LoginPage.imageElement.should('be.visible');
        });

        it('Should login successfully', function () {
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

        it('Login should be failed due to incorrect credentials', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.invalidUserName);
                LoginPage.passwordTextFieldElement.type(data.invalidPassword);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.usernameNotRegisteredError);
            });
        });

        it('Login should be failed due to empty username and password', function () {

            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.usernameIsRequiredError);
            });

        });

        it('Login should be failed due to valid username but empty password', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.validUserName);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.passwordIsRequiredError);
            });
        });

        it('Login should be failed due to empty username but password is not', function () {
            cy.get<LoginTestData>('@login').then((data) => {
                LoginPage.usernameTextFieldElement.type(data.validUserName);
                LoginPage.loginButtonElement.click();
                LoginPage.errorMessageElement.should('have.text',
                    data.passwordIsRequiredError);
            });
        });

        it('Login should be failed due to user is locked out', function () {
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

        it('Should logout successfully', function () {
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

        it('Should display the error message after entering the "https://www.saucedemo.com/inventory.html" in the url field', function () {
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

        it('Should display the error message after entering the "https://www.saucedemo.com/cart.html" in the url field', function () {
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

        it('Should display the error message after entering the "https://www.saucedemo.com/checkout-step-one.html" in the url field', function () {
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

        it('Should display the error message after entering the "https://www.saucedemo.com/checkout-step-two.html" in the url field', function () {
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

        it('Should display the error message after entering the "https://www.saucedemo.com/checkout-complete.html" in the url field', function () {
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






