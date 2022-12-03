import { CartPage } from "../../cypress/pages/Cart";
import { InventoryPage } from "../pages/Inventory";
import { LoginPage } from "../pages/Login";
import { CartTestData, ValidCredentials } from "./model";

describe('Visit cart page scenario', () => {
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

    it('Successfully routed to Cart page after clicking the cart button', () => {
        InventoryPage.shoppingCartButtonElement.click();
        cy.url().should(($url) => {
            expect($url).to.contain('https://www.saucedemo.com/cart.html');
        });

    });
});

describe('Successfully added product/s to cart scenario', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('cart').as('cart');
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

    it.only('Successfully added the "Sauce Labs Backpack" item to cart page', () => {
        InventoryPage.backpackAddToCartElement.contains('Add to cart').click();
        InventoryPage.shoppingCartButtonElement.click();
        cy.get<CartTestData>('@cart').then((data) => {
            CartPage.inventoryItemNameTextElement.should(($name) => {
                expect($name).to.contain(data.sauceLabsBackPackTitle);
            });
            CartPage.inventoryItemDescriptionTextElement.should(($description) => {
                expect($description).to.contain(data.sauceLabsBackPackDescription);
            });
            CartPage.inventoryItemPriceTextElement.should(($price) => {
                expect($price).to.contain(data.sauceLabsBackPackPrice);
            });
        });

    });
});