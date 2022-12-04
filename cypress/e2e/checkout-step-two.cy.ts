import { CartPage } from "../pages/Cart";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOne";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwo";
import { InventoryPage } from "../pages/Inventory";
import { LoginPage } from "../pages/Login";
import { CheckoutStepOneData, InventoryTestData, LoginTestData } from "./model";

describe('Visit checkout step two page scenario', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('checkout_step_one').as('checkoutOne');
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
        CheckoutStepTwoPage.titleElement.should(($title) => {
            expect($title).to.contain('Checkout: Overview');
        });

    });
});

describe('Added all the products from cart scenarios', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('inventory').as('inventory');
        cy.fixture('checkout_step_one').as('checkoutOne');
        cy.get<LoginTestData>('@login').then((user) => {
            cy.login(user.validUserName, user.validPassword);
        });
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
    });

    afterEach(() => {
        LoginPage.burgerMenuElement.click();
        LoginPage.logoutElement.click();
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Successfully displayed all the products added from the Inventory page', () => {
        cy.get<InventoryTestData>('@inventory').then((data) => {
            CheckoutStepTwoPage.inventoryItemNameTextElement
                .each(($el, index, list) => {
                    expect($el).to.contain(data.sortedProductNamesAToZ[index]);
                });
        });
    });

    it('Successfully displayed the correct subtotal for all the products added', () => {
        CheckoutStepTwoPage.itemTotalValueElement.should((subTotal) => {
            expect(subTotal).to.contain('Item total: $129.94');
        });
    });

    it('Successfully displayed the correct tax for all the products added', () => {
        CheckoutStepTwoPage.taxValueElement.should((tax) => {
            expect(tax).to.contain('Tax: $10.40');
        });
    });

    it('Successfully displayed the correct total for all the products added', () => {
        CheckoutStepTwoPage.totalValueElement.should((total) => {
            expect(total).to.contain('Total: $140.34');
        });
    });

    it('Successfully displayed the correct total number of products - shopping cart badge', () => {
        CheckoutStepTwoPage.shoppingCartBadgeElement.should((badge) => {
            expect(badge).to.contain('6');
        });
    });

    it('Successfully completed the transaction after clicking the "Finish" button', () => {
        CheckoutStepTwoPage.finishButtonElement.contains('Finish').click();
        cy.url().should('contain', 'https://www.saucedemo.com/checkout-complete.html');
    });
});

