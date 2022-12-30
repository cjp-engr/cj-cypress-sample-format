import { CartPage } from "../pages/Cart";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOne";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwo";
import { InventoryPage } from "../pages/Inventory";
import { LoginPage } from "../pages/Login";
import { CheckoutStepOneData, InventoryTestData, LoginTestData, PageLinkTestData } from "./model";

describe('Visit checkout step two page scenario', () => {
    beforeEach(() => {
        cy.fixture('login').as('login');
        cy.fixture('checkout_step_one').as('checkoutOne');
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

    it('Successfully routed to Checkout step two page after clicking the "Checkout" button', function () {
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
        cy.get<PageLinkTestData>('@pageLink').then((link) => {
            cy.url().should('contain', link.checkoutTwoLink);
        });

        CheckoutStepTwoPage.titleElement.should(($title) => {
            expect($title).to.contain('Checkout: Overview');
        });

    });
});

describe('Added all the products from cart scenarios', () => {
    beforeEach(() => {
        cy.fixture('login').as('login');
        cy.fixture('inventory').as('inventory');
        cy.fixture('checkout_step_one').as('checkoutOne');
        cy.fixture('page_link').as('pageLink');
        cy.visitSauceLabs();
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

    it('Successfully displayed all the products added from the Inventory page', function () {
        cy.get<InventoryTestData>('@inventory').then((data) => {
            CheckoutStepTwoPage.inventoryItemNameTextElement
                .each(($el, index, list) => {
                    expect($el).to.contain(data.sortedProductNamesAToZ[index]);
                });
        });
    });

    it('Successfully displayed the "Payment Information"', function () {
        CheckoutStepTwoPage.paymentInfoValueElement.should((
            info
        ) => {
            expect(info).to.contain('SauceCard #31337');
        });
    });

    it('Successfully displayed the "Shipping Information"', function () {
        CheckoutStepTwoPage.shippingInfoValueElement.should((
            info
        ) => {
            expect(info).to.contain('FREE PONY EXPRESS DELIVERY!');
        });
    });

    it('Successfully displayed the correct subtotal for all the products added', function () {
        CheckoutStepTwoPage.itemTotalValueElement.should((subTotal) => {
            expect(subTotal).to.contain('Item total: $129.94');
        });
    });

    it('Successfully displayed the correct tax for all the products added', function () {
        CheckoutStepTwoPage.taxValueElement.should((tax) => {
            expect(tax).to.contain('Tax: $10.40');
        });
    });

    it('Successfully displayed the correct total for all the products added', function () {
        CheckoutStepTwoPage.totalValueElement.should((total) => {
            expect(total).to.contain('Total: $140.34');
        });
    });

    it('Successfully displayed the correct total number of products - shopping cart badge', function () {
        CheckoutStepTwoPage.shoppingCartBadgeElement.should((badge) => {
            expect(badge).to.contain('6');
        });
    });

    it('Successfully completed the transaction after clicking the "Finish" button', function () {
        CheckoutStepTwoPage.finishButtonElement.contains('Finish').click();
        cy.get<PageLinkTestData>('@pageLink').then((link) => {
            cy.url().should('contain', link.checkoutComplete);
        });

    });
});

