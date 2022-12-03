import { InventoryPage } from "../../cypress/pages/Inventory";
import { LoginPage } from "../../cypress/pages/Login";
import { ValidCredentials } from "./model";

let img: HTMLImageElement;

describe('Add to cart and remove products scenario', () => {
    beforeEach(() => {
        InventoryPage.visit();
        cy.fixture('login').as('login')
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

    it('Successfully changed button text from "ADD TO CART" to "REMOVE" after clicking the "ADD TO CART" button', () => {
        InventoryPage.backpackAddToCartElement.contains('Add to cart').click();
        InventoryPage.backpackRemoveElement.should(($buttonText) => {
            expect($buttonText).to.contain('Remove');
        });

    });

    it('Successfully changed button text from "REMOVE" to "ADD TO CART" after clicking the "REMOVE" button', () => {
        InventoryPage.backpackAddToCartElement.contains('Add to cart').click();
        InventoryPage.backpackRemoveElement.contains('Remove').click();
        InventoryPage.backpackAddToCartElement.should(($buttonText) => {
            expect($buttonText).to.contain('Add to cart');
        });
    });

    it('Successfully displayed the shopping cart badge after clicking the "ADD TO CART"', () => {
        InventoryPage.backpackAddToCartElement.contains('Add to cart').click();
        InventoryPage.shoppingCartBadgeElement.should(($content) => {
            expect($content).to.contain('1');
        });
    });

    it('Successfully removed the shopping cart badge after removing all the products from cart', () => {
        InventoryPage.backpackAddToCartElement.contains('Add to cart').click();
        InventoryPage.shoppingCartBadgeElement.contains('1');
        InventoryPage.backpackRemoveElement.contains('Remove').click();
        InventoryPage.shoppingCartBadgeElement.should(($content) => {
            expect($content).not.to.exist;
        });

    });

    it('Successfully clicked all the add to cart button and displayed the expected number of shopping cart badge', () => {
        InventoryPage.allAddToCardElement
            .each(($el, index, list) => {
                if ($el.text() === 'Add to cart') {
                    $el.trigger("click");
                }
            });
        InventoryPage.shoppingCartBadgeElement.should(($content) => {
            expect($content).to.contain('6');
        });

    });
});

describe('Successfully sorted the products according to names in ascending or descending order', () => {
    beforeEach(() => {
        InventoryPage.visit();
        cy.fixture('login').as('login')
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

    it('Successfully sorted the products from a to z after selecting the "Name (A TO Z)"', () => {
        let optionsArray = [];
        InventoryPage.sortElement.select(InventoryPage.sortNameAToZText);
        InventoryPage.inventoryItemNamesElement.each(($el, index, list) => {
            optionsArray[index] = $el.text();
        }).then(() => {
            expect(optionsArray).to.deep
                .equal(['Sauce Labs Backpack', 'Sauce Labs Bike Light',
                    'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket',
                    'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)'])
        });

    });

    it('Successfully sorted the products from z to a after selecting the "Name (Z TO A)"', () => {
        let optionsArray = [];
        InventoryPage.sortElement.select(InventoryPage.sortNameZToAText);
        InventoryPage.inventoryItemNamesElement.each(($el, index, list) => {
            optionsArray[index] = $el.text();
        }).then(() => {
            expect(optionsArray).to.deep
                .equal(['Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Onesie', 'Sauce Labs Fleece Jacket',
                    'Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light', 'Sauce Labs Backpack'])

        });

    });

});

describe('Successfully sorted the products from low to high price after selecting the "Price (low TO high)"', () => {
    beforeEach(() => {
        InventoryPage.visit();
        cy.fixture('login').as('login')
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

    it('Check if the price is sorted from low to high accordingly', () => {
        let optionsArray = [];
        InventoryPage.sortElement.select(InventoryPage.sortPriceLowToHighText);
        InventoryPage.inventoryItemPricesElement.each(($el, index, list) => {
            optionsArray[index] = $el.text()
            cy.log(optionsArray[index]);
        }).then(() => {
            expect(optionsArray).to.deep
                .equal(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
        });

    });

    it('Check if the names are sorted accordingly', () => {
        let optionsArray = [];
        InventoryPage.sortElement.select(InventoryPage.sortPriceLowToHighText);
        InventoryPage.inventoryItemNamesElement.each(($el, index, list) => {
            optionsArray[index] = $el.text()
            cy.log(optionsArray[index]);
        }).then(() => {
            expect(optionsArray).to.deep
                .equal(['Sauce Labs Onesie', 'Sauce Labs Bike Light',
                    'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)',
                    'Sauce Labs Backpack', 'Sauce Labs Fleece Jacket']);
        });
    });
});

describe('Successfully sorted the products from high to low price after selecting the "Price (high TO low)"', () => {
    beforeEach(() => {
        InventoryPage.visit();
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

    it('Check if the price is sorted from high to low accordingly', () => {
        let optionsArray = [];
        InventoryPage.sortElement.select(InventoryPage.sortPriceHighToLowText);
        InventoryPage.inventoryItemPricesElement.each(($el, index, list) => {
            optionsArray[index] = $el.text()
            cy.log(optionsArray[index]);
        }).then(() => {
            expect(optionsArray).to.deep
                .equal(['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99']);
        });

    });

    it('Check if the names are sorted accordingly', () => {
        let optionsArray = [];
        InventoryPage.sortElement.select(InventoryPage.sortPriceHighToLowText);
        InventoryPage.inventoryItemNamesElement.each(($el, index, list) => {
            optionsArray[index] = $el.text()
            cy.log(optionsArray[index]);
        }).then(() => {
            expect(optionsArray).to.deep
                .equal(['Sauce Labs Fleece Jacket', 'Sauce Labs Backpack',
                    'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)',
                    'Sauce Labs Bike Light', 'Sauce Labs Onesie']);
        });
    });

});

describe('Broken image assertion', () => {
    beforeEach(() => {
        InventoryPage.visit();
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

    it('Check if the image is not broken', () => {
        InventoryPage.backpackImageElement.should('be.visible')
            .and(($img) => {
                img = $img[0] as unknown as HTMLImageElement;
                expect(img.naturalWidth).to.be.greaterThan(0);
            });
    });
});