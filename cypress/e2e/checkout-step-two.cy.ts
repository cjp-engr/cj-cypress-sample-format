import { CartPage } from "../pages/Cart";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOne";
import { InventoryPage } from "../pages/Inventory";
import { LoginPage } from "../pages/Login";
import { CheckoutStepOneData, ValidCredentials } from "./model";

describe('Visit checkout step two page scenario', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('checkout_step_one').as('checkoutOne');
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

    it('Successfully routed to Checkout step two page after clicking the "Checkout" button', () => {
        InventoryPage.allAddToCardButtonElement
            .each(($el, index, list) => {
                if ($el.text() === 'Add to cart') {
                    $el.trigger("click");
                }
            });
        InventoryPage.shoppingCartButtonElement.click();
        CartPage.checkoutButtonElement.contains('Checkout').click();
        cy.get<CheckoutStepOneData>('@checkoutOne').then((data) => {
            CheckoutStepOnePage.firstNameTextFieldElement.type(data.firstName);
            CheckoutStepOnePage.lastNameTextFieldElement.type(data.lastName);
            CheckoutStepOnePage.postalCodeTextFieldElement.type(data.postalCode);
        });
        CheckoutStepOnePage.continueButtonElement.contains('Continue').click();
        cy.url().should('contain', 'https://www.saucedemo.com/checkout-step-two.html');


    });
});