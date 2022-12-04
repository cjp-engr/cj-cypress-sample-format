import { CartPage } from "../../cypress/pages/Cart";
import { InventoryPage } from "../pages/Inventory";
import { LoginPage } from "../pages/Login";
import { CartTestData, InventoryTestData, ValidCredentials } from "./model";

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

describe('Successfully added or remove product/s to/from cart scenario', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('inventory').as('inventory');
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

    it('Successfully added the "Sauce Labs Backpack" item to cart page', () => {
        InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
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
        CartPage.allCartQuantityTextElement.should(($quantity) => {
            expect($quantity).to.contain('1');
        });
        CartPage.emptyCartElement.should(($empty) => {
            expect($empty).not.to.exist;
        });

    });

    it('Successfully removed the "Sauce Labs Backpack" item to cart page', () => {
        InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
        InventoryPage.shoppingCartButtonElement.click();
        CartPage.allRemoveButtonElement
            .each(($el, index, list) => {
                if ($el.text() === 'Remove') {
                    $el.trigger("click");
                }
            });
        CartPage.emptyCartElement.should(($empty) => {
            expect($empty).to.exist;
        });
    });

    it('Successfully added the "Sauce Labs Bolt T-Shirt" and "Sauce Labs Onesie" items to cart page', () => {
        cy.get<InventoryTestData>('@inventory').then((data) => {
            cy.log(data.sortedProductNamesAToZ[2]);
            InventoryPage.allProductNamesTextElement
                .each(($el, index, list) => {
                    if ($el.text() === data.sortedProductNamesAToZ[2] || $el.text() === data.sortedProductNamesAToZ[4]) {
                        cy.log(index.toString());
                        InventoryPage.setAddToCartIndex = index + 1;
                        InventoryPage.dynamicAddToCardElement.click();
                    }
                });
        });
        InventoryPage.shoppingCartButtonElement.click();
        CartPage.emptyCartElement.should(($empty) => {
            expect($empty).not.to.exist;
        });
        CartPage.shoppingCartBadgeElement.should(($badge) => {
            expect($badge).to.contain('2')
        });
        cy.get<InventoryTestData>('@inventory').then((data) => {
            CartPage.inventoryItemNameTextElement.should(($names) => {
                expect($names).to.contain(data.sortedProductNamesAToZ[2]);
                expect($names).to.contain(data.sortedProductNamesAToZ[4]);
            });

        });

    });

});

