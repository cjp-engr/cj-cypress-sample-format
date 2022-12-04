import { CartPage } from "../pages/Cart";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOne";
import { InventoryPage } from "../pages/Inventory";
import { LoginPage } from "../pages/Login";
import { CheckoutStepOneData, ValidCredentials } from "./model";

describe('Visit checkout step one page scenario', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.get<ValidCredentials>('@login').then((user) => {
            cy.login(user.validUserName, user.validPassword);
        });
    });

    afterEach(() => {
        LoginPage.burgerMenuElement.click();
        LoginPage.logoutElement.click();
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Successfully routed to Checkout step one page after clicking the cart button', () => {
        InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
        InventoryPage.shoppingCartButtonElement.click();
        CartPage.checkoutButtonElement.contains('Checkout').click();
        cy.url().should('contain', 'https://www.saucedemo.com/checkout-step-one.html');

    });

    //! error will occur here
    it('Failed in routing to Checkout step one page because the cart is empty', () => {
        InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
        InventoryPage.shoppingCartButtonElement.click();
        CartPage.emptyCartElement.should(($empty) => {
            expect($empty).to.exist;
        });
        CartPage.checkoutButtonElement.contains('Checkout').click();
        cy.url().should('contain', 'https://www.saucedemo.com/cart.html');

    });
});

describe('Checkout form scenarios', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('checkout_step_one').as('checkoutOne');
        cy.get<ValidCredentials>('@login').then((user) => {
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

    it('Successfully routed to Checkout step two page after clicking the "Continue" button', () => {
        cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
            CheckoutStepOnePage.firstNameTextFieldElement.type(data.firstName);
            CheckoutStepOnePage.lastNameTextFieldElement.type(data.lastName);
            CheckoutStepOnePage.postalCodeTextFieldElement.type(data.postalCode);
        });
        CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
        cy.url().should('contain', 'https://www.saucedemo.com/checkout-step-two.html');

    });

    it('Error displayed because all the text fields are empty', () => {
        CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
        CheckoutStepOnePage.errorMessageElement.should('have.text',
            'Error: First Name is required');;

    });

    it('Error displayed because the first name text field is empty', () => {
        cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
            CheckoutStepOnePage.lastNameTextFieldElement.type(data.lastName);
            CheckoutStepOnePage.postalCodeTextFieldElement.type(data.postalCode);
        });
        CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
        CheckoutStepOnePage.errorMessageElement.should('have.text',
            'Error: First Name is required');;
    });

    it('Error displayed because the last name text field is empty', () => {
        cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
            CheckoutStepOnePage.firstNameTextFieldElement.type(data.firstName);
            CheckoutStepOnePage.postalCodeTextFieldElement.type(data.postalCode);
        });
        CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
        CheckoutStepOnePage.errorMessageElement.should('have.text',
            'Error: Last Name is required');;
    });

    it('Error displayed because the zip/postal code text field is empty', () => {
        cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
            CheckoutStepOnePage.firstNameTextFieldElement.type(data.firstName);
            CheckoutStepOnePage.lastNameTextFieldElement.type(data.lastName);
        });
        CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
        CheckoutStepOnePage.errorMessageElement.should('have.text',
            'Error: Postal Code is required');;
    });
});

describe('Shopping cart scenarios', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.get<ValidCredentials>('@login').then((user) => {
            cy.login(user.validUserName, user.validPassword);
        });
    });

    afterEach(() => {
        LoginPage.burgerMenuElement.click();
        LoginPage.logoutElement.click();
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('The shopping cart badge displayed the number of products correctly', () => {
        InventoryPage.allAddToCardButtonElement
            .each(($el, index, list) => {
                if ($el.text() === 'Add to cart') {
                    $el.trigger("click");
                }
            });
        InventoryPage.shoppingCartButtonElement.click();
        CartPage.checkoutButtonElement.contains('Checkout').click();
        CheckoutStepOnePage.cartBadgeElement.should(($content) => {
            expect($content).to.contain('6');
        });

    });
});