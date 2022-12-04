import { InventoryPage } from "../../cypress/pages/Inventory";
import { LoginPage } from "../../cypress/pages/Login";
import { InventoryTestData, LoginTestData } from "./model";

let img: HTMLImageElement;

describe('Add to cart and remove products scenario', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login')
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

    it('Successfully changed button text from "ADD TO CART" to "REMOVE" after clicking the "ADD TO CART" button', () => {
        InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
        InventoryPage.backpackRemoveButtonElement.should((buttonText) => {
            expect(buttonText).to.contain('Remove');
        });

    });

    it('Successfully changed button text from "REMOVE" to "ADD TO CART" after clicking the "REMOVE" button', () => {
        InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
        InventoryPage.backpackRemoveButtonElement.contains('Remove').click();
        InventoryPage.backpackAddToCartButtonElement.should((buttonText) => {
            expect(buttonText).to.contain('Add to cart');
        });
    });

    it('Successfully displayed the shopping cart badge after clicking the "ADD TO CART"', () => {
        InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
        InventoryPage.shoppingCartBadgeElement.should((content) => {
            expect(content).to.contain('1');
        });
    });

    it('Successfully removed the shopping cart badge after removing all the products from cart', () => {
        InventoryPage.backpackAddToCartButtonElement.contains('Add to cart').click();
        InventoryPage.shoppingCartBadgeElement.contains('1');
        InventoryPage.backpackRemoveButtonElement.contains('Remove').click();
        InventoryPage.shoppingCartBadgeElement.should((content) => {
            expect(content).not.to.exist;
        });

    });

    it('Successfully clicked all the "Add to cart" button and displayed the expected number of shopping cart badge', () => {
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

    it('Successfully clicked all the "Remove" button and displayed the expected number of shopping cart badge', () => {
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

describe('Successfully sorted the products according to names in ascending or descending order', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('inventory').as('inventory');
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

    it('Successfully sorted the products from a to z after selecting the "Name (A TO Z)"', () => {
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

    it('Successfully sorted the products from z to a after selecting the "Name (Z TO A)"', () => {
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

describe('Successfully sorted the products from low to high price after selecting the "Price (low TO high)"', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('inventory').as('inventory');
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

    it('Check if the price is sorted from low to high accordingly', () => {
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

    it('Check if the names are sorted accordingly', () => {
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

describe('Successfully sorted the products from high to low price after selecting the "Price (high TO low)"', () => {
    beforeEach(() => {
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
        cy.fixture('inventory').as('inventory');
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

    it('Check if the price is sorted from high to low accordingly', () => {
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

    it('Check if the names are sorted accordingly', () => {
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
        cy.visitSauceLabs();
        cy.fixture('login').as('login');
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

    it('Check if the image is not broken', () => {
        InventoryPage.backpackImageElement.should('be.visible')
            .and(($img) => {
                img = $img[0] as unknown as HTMLImageElement;
                expect(img.naturalWidth).to.be.greaterThan(0);
            });
    });
});