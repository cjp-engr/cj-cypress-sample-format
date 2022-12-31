import { CartPage } from "../pages/Cart";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOne";
import { InventoryPage } from "../pages/Inventory";
import { LoginPage } from "../pages/Login";
import { CheckoutStepOneData, LoginTestData, PageLinkTestData } from "./model";


describe('Checkout Step One Page', () => {
    describe('Visit checkout step one page scenario', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('page_link').as('pageLink');
            cy.visitSauceLabs();
            cy.get<LoginTestData>('@login').then((user) => {
                cy.login(user.validUserName, user.validPassword);
            });
        });

        afterEach(() => {
            LoginPage.burgerMenuElement.click();
            LoginPage.logoutElement.click();
            cy.clearCookies();
            cy.clearLocalStorage();
        });

        it('Should successfully route to Checkout step one page after clicking the cart button', function () {
            InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
            InventoryPage.shoppingCartButtonElement.click();
            CartPage.checkoutButtonElement.contains('Checkout').click();
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.url().should('contain', link.checkoutOneLink);
            });


        });

        //! error will occur here
        it('Should Fail to route in Checkout step one page because the cart is empty', function () {
            InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
            InventoryPage.shoppingCartButtonElement.click();
            CartPage.allRemoveButtonElement.each(($el, index, list) => {
                if ($el.text() === 'Remove') {
                    $el.trigger("click");
                }
            });
            CartPage.emptyCartElement.should(($empty) => {
                expect($empty).to.exist;
            });
            CartPage.checkoutButtonElement.contains('Checkout').click();
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.url().should('contain', link.cartLink);
            });


        });
    });

    describe('Checkout form scenarios', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('page_link').as('pageLink');
            cy.fixture('checkout_step_one').as('checkoutOne');
            cy.visitSauceLabs();
            cy.get<LoginTestData>('@login').then((user) => {
                cy.login(user.validUserName, user.validPassword);
            });
            InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
            InventoryPage.shoppingCartButtonElement.click();
            CartPage.checkoutButtonElement.contains('Checkout').click();
        });

        afterEach(() => {
            LoginPage.burgerMenuElement.click();
            LoginPage.logoutElement.click();
            cy.clearCookies();
            cy.clearLocalStorage();
        });

        it('Should successfully route to Checkout step two page after clicking the "Continue" button', function () {
            cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
                CheckoutStepOnePage.firstNameTextFieldElement.type(data.firstName);
                CheckoutStepOnePage.lastNameTextFieldElement.type(data.lastName);
                CheckoutStepOnePage.postalCodeTextFieldElement.type(data.postalCode);
            });
            CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
            cy.get<PageLinkTestData>('@pageLink').then((link) => {
                cy.url().should('contain', link.checkoutTwoLink);
            });


        });

        it('Error message should display due to all the text fields are empty', function () {
            CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
            cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
                CheckoutStepOnePage.errorMessageElement.should('have.text',
                    data.firstNameIsRequiredError);
            });


        });

        it('Error message should display due to first name text field is empty', function () {
            cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
                CheckoutStepOnePage.lastNameTextFieldElement.type(data.lastName);
                CheckoutStepOnePage.postalCodeTextFieldElement.type(data.postalCode);
                CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
                CheckoutStepOnePage.errorMessageElement.should('have.text',
                    data.firstNameIsRequiredError);
            });

        });

        it('Error message should display due to last name text field is empty', function () {
            cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
                CheckoutStepOnePage.firstNameTextFieldElement.type(data.firstName);
                CheckoutStepOnePage.postalCodeTextFieldElement.type(data.postalCode);
                CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
                CheckoutStepOnePage.errorMessageElement.should('have.text',
                    data.lastNameIsRequiredError);
            });

        });

        it('Error message should display due to zip/postal code text field is empty', function () {
            cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
                CheckoutStepOnePage.firstNameTextFieldElement.type(data.firstName);
                CheckoutStepOnePage.lastNameTextFieldElement.type(data.lastName);
                CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
                CheckoutStepOnePage.errorMessageElement.should('have.text',
                    data.postalCodeIsRequiredError);
            });

        });
    });

    describe('Shopping cart scenarios', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.visitSauceLabs();
            cy.get<LoginTestData>('@login').then((user) => {
                cy.login(user.validUserName, user.validPassword);
            });
        });

        afterEach(() => {
            LoginPage.burgerMenuElement.click();
            LoginPage.logoutElement.click();
            cy.clearCookies();
            cy.clearLocalStorage();
        });

        it('Shopping cart badge should display the correct number of products after adding products to cart', function () {
            InventoryPage.allAddToCardButtonElement
                .each(($el, index, list) => {
                    if ($el.text() === 'Add to cart') {
                        $el.trigger("click");
                    }
                });
            InventoryPage.shoppingCartButtonElement.click();
            CartPage.checkoutButtonElement.contains('Checkout').click();
            CheckoutStepOnePage.cartBadgeElement.should((content) => {
                expect(content).to.contain('6');
            });

        });
    });
});
