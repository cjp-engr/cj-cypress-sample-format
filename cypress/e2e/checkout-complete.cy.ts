import { CartPage } from "../pages/Cart";
import { CheckoutCompletePage } from "../pages/CheckoutComplete";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOne";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwo";
import { InventoryPage } from "../pages/Inventory";
import { LoginPage } from "../pages/Login";
import { CheckoutCompleteData, CheckoutStepOneData, LoginTestData } from "./model";

let img: HTMLImageElement;

describe('Routed to checkout complete page scenario', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('checkout_step_one').as('checkoutOne');
        cy.fixture('checkout_complete').as('checkoutComplete');
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
        CheckoutStepTwoPage.finishButtonElement.contains('Finish').click();
    });

    afterEach(() => {
        LoginPage.burgerMenuElement.click();
        LoginPage.logoutElement.click();
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Successfully routed to Checkout complete page after clicking the "Finish" button', () => {
        cy.get<CheckoutCompleteData>('@checkoutComplete').then((data) => {
            CheckoutCompletePage.titleElement.should((title) => {
                expect(title).to.contain(data.title);
            });
        });

    });

    it('Successfully displayed the "THANK YOU FOR YOUR ORDER" after clicking the "Finish" button', () => {
        cy.get<CheckoutCompleteData>('@checkoutComplete').then((data) => {
            CheckoutCompletePage.headerTextElement.should((header) => {
                expect(header).to.contain(data.headerText);
            });
        });
    });

    it('Successfully displayed the message to the customer after clicking the "Finish" button', () => {
        cy.get<CheckoutCompleteData>('@checkoutComplete').then((data) => {
            CheckoutCompletePage.bodyTextElement.should((body) => {
                expect(body).to.contain(data.bodyText);
            });
        });
    });

    it('Successfully displayed the image - not broken', () => {
        CheckoutCompletePage.imageElement.should('be.visible')
            .and(($img) => {
                img = $img[0] as unknown as HTMLImageElement;
                expect(img.naturalWidth).to.be.greaterThan(0);
            });
    });
});