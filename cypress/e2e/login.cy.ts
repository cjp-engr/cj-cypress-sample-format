import { LoginPage } from "../../cypress/pages/Login";
import { LoginTestData, PageLinkTestData, UserList } from "./model";

describe('Login Page', () => {
    beforeEach(() => {
        cy.fixture('login').as('login');
        cy.fixture('page_link').as('pageLink');
        cy.visitSauceLabs();
    });

    it('Successfully displayed the image - not broken image', () => {
        LoginPage.imageElement.should('be.visible');
    });

    it('Success Login Scenario', () => {
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
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.url().should('contain', link.loginLink);
            });

        });
    });

    it('Viewport iphone-6', () => {
        cy.viewport('iphone-6');
        LoginPage.imageElement.should('be.visible');
        cy.scrollTo('bottom', { duration: 300 });
    });

});

describe('Attempt visiting the pages if the user is not yet logged in scenarios', () => {
    beforeEach(() => {
        cy.fixture('login').as('login');
        cy.fixture('page_link').as('pageLink');
    })

    it('Successfully displayed the error after entering the "https://www.saucedemo.com/inventory.html" in the url field', () => {
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

    it('Successfully displayed the error after entering the "https://www.saucedemo.com/cart.html" in the url field', () => {
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

    it('Successfully displayed the error after entering the "https://www.saucedemo.com/checkout-step-one.html" in the url field', () => {
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

    it('Successfully displayed the error after entering the "https://www.saucedemo.com/checkout-step-two.html" in the url field', () => {
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

    it('Successfully displayed the error after entering the "https://www.saucedemo.com/checkout-complete.html" in the url field', () => {
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




