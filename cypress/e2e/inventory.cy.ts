import { InventoryPage } from "../../cypress/pages/Inventory";
import { LoginPage } from "../../cypress/pages/Login";
import { InventoryTestData, LoginTestData } from "./model";

let img: HTMLImageElement;

describe('Inventory Page', () => {
    describe('Add to cart and remove products scenario', () => {
        beforeEach(() => {
            cy.fixture('login').as('login')
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

        it('Should successfully change the button text from "ADD TO CART" to "REMOVE" after clicking the "ADD TO CART" button', function () {
            InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
            InventoryPage.backpackRemoveButtonElement.should((buttonText) => {
                expect(buttonText).to.contain('Remove');
            });

        });

        it('Should successfully change the button text from "REMOVE" to "ADD TO CART" after clicking the "REMOVE" button', function () {
            InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
            InventoryPage.backpackRemoveButtonElement.contains('Remove').click();
            InventoryPage.backpackAddToCartButtonElement.should((buttonText) => {
                expect(buttonText).to.contain('Add to cart');
            });
        });

        it('Should successfully display the shopping cart badge after clicking the "ADD TO CART"', function () {
            InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
            InventoryPage.shoppingCartBadgeElement.should((content) => {
                expect(content).to.contain('1');
            });
        });

        it('Should successfully removed the shopping cart badge after removing all the products from cart', function () {
            InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
            InventoryPage.shoppingCartBadgeElement.contains('1');
            InventoryPage.backpackRemoveButtonElement.contains('Remove').click();
            InventoryPage.shoppingCartBadgeElement.should((content) => {
                expect(content).not.to.exist;
            });

        });

        it('Should successfully click all the "Add to cart" button and displayed the expected number of shopping cart badge', function () {
            InventoryPage.allAddToCardButtonElement
                .each(($el, index, list) => {
                    if ($el.text() === 'Add to cart') {
                        $el.trigger("click");
                    }
                });
            InventoryPage.shoppingCartBadgeElement.should((content) => {
                expect(content).to.contain('6');
            });

        });

        it('Should Successfully click all the "Remove" button and displayed the expected number of shopping cart badge', function () {
            InventoryPage.allAddToCardButtonElement
                .each(($el, index, list) => {
                    if ($el.text() === 'Add to cart') {
                        $el.trigger("click");
                    }
                });
            InventoryPage.allRemoveButtonElement
                .each(($el, index, list) => {
                    if ($el.text() === 'Remove') {
                        $el.trigger("click");
                    }
                });
            InventoryPage.shoppingCartBadgeElement.should((content) => {
                expect(content).not.to.exist;
            });

        });
    });

    describe('Should successfully sort the products according to names in ascending or descending order', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('inventory').as('inventory');
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

        it('Should successfully sort the products from a to z after selecting the "Name (A TO Z)"', function () {
            let optionsArray = [];
            InventoryPage.sortButtonElement.select(InventoryPage.sortNameAToZText);
            InventoryPage.allProductNamesTextElement.each(($el, index, list) => {
                optionsArray[index] = $el.text();
            }).then(() => {
                cy.get<InventoryTestData>('@inventory').then((data) => {
                    expect(optionsArray).to.deep
                        .equal(data.sortedProductNamesAToZ);

                });
            });

        });

        it('Should successfully sort the products from z to a after selecting the "Name (Z TO A)"', function () {
            let optionsArray = [];
            InventoryPage.sortButtonElement.select(InventoryPage.sortNameZToAText);
            InventoryPage.allProductNamesTextElement.each(($el, index, list) => {
                optionsArray[index] = $el.text();
            }).then(() => {
                cy.get<InventoryTestData>('@inventory').then((data) => {
                    expect(optionsArray).to.deep
                        .equal(data.sortedProductNamesZToA);

                });
            });

        });

    });

    describe('Should successfully sort the products from low to high price after selecting the "Price (low TO high)"', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('inventory').as('inventory');
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

        it('Should sort the items according to from low to high price', function () {
            let optionsArray = [];
            InventoryPage.sortButtonElement.select(InventoryPage.sortPriceLowToHighText);
            InventoryPage.allProductPricesTextElement.each(($el, index, list) => {
                optionsArray[index] = $el.text()
                cy.log(optionsArray[index]);
            }).then(() => {
                cy.get<InventoryTestData>('@inventory').then((data) => {
                    expect(optionsArray).to.deep
                        .equal(data.sortedProductPricesLowToHigh);

                });
            });

        });

        it('Should sort the names according to from low to high price', function () {
            let optionsArray = [];
            InventoryPage.sortButtonElement.select(InventoryPage.sortPriceLowToHighText);
            InventoryPage.allProductNamesTextElement.each(($el, index, list) => {
                optionsArray[index] = $el.text()
                cy.log(optionsArray[index]);
            }).then(() => {
                cy.get<InventoryTestData>('@inventory').then((data) => {
                    expect(optionsArray).to.deep
                        .equal(data.namesIfPricesSortedLowToHigh);

                });
            });
        });
    });

    describe('Should successfully sort the products from high to low price after selecting the "Price (high TO low)"', () => {
        beforeEach(() => {
            cy.fixture('login').as('login');
            cy.fixture('inventory').as('inventory');
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

        it('Should sort the items according to from high to low price', function () {
            let optionsArray = [];
            InventoryPage.sortButtonElement.select(InventoryPage.sortPriceHighToLowText);
            InventoryPage.allProductPricesTextElement.each(($el, index, list) => {
                optionsArray[index] = $el.text()
                cy.log(optionsArray[index]);
            }).then(() => {
                cy.get<InventoryTestData>('@inventory').then((data) => {
                    expect(optionsArray).to.deep
                        .equal(data.sortedProductPricesHighToLow);

                });

            });

        });

        it('Should sort the names according to from high to low price', function () {
            let optionsArray = [];
            InventoryPage.sortButtonElement.select(InventoryPage.sortPriceHighToLowText);
            InventoryPage.allProductNamesTextElement.each(($el, index, list) => {
                optionsArray[index] = $el.text()
                cy.log(optionsArray[index]);
            }).then(() => {
                cy.get<InventoryTestData>('@inventory').then((data) => {
                    expect(optionsArray).to.deep
                        .equal(data.namesIfPricesSortedHighToLow);

                });
            });
        });

    });

    describe('Broken image assertion', () => {
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

        it('Should have no broken image', function () {
            InventoryPage.backpackImageElement.should('be.visible')
                .and(($img) => {
                    img = $img[0] as unknown as HTMLImageElement;
                    expect(img.naturalWidth).to.be.greaterThan(0);
                });
        });
    });
});
