import { InventoryPage } from "../../cypress/pages/Inventory";
import { ValidCredentials } from "./model";

describe('Add to cart and remove products scenario', () => {
    beforeEach(() => {
        InventoryPage.visit();
        cy.fixture('login').as('login')
        cy.get<ValidCredentials>('@login').then((user) => {
            cy.login(user.validUserName, user.validPassword);
        });
    })

    it('Successfully changed button text from "ADD TO CART" to "REMOVE" after clicking the "ADD TO CART" button', () => {
        InventoryPage.backpackAddToCartElement.contains('Add to cart');
        InventoryPage.backpackAddToCartElement.click();
        InventoryPage.backpackRemoveElement.should(($buttonText) => {
            expect($buttonText).to.contain('Remove');
        });

    });

    it('Successfully changed button text from "REMOVE" to "ADD TO CART" after clicking the "REMOVE" button', () => {
        InventoryPage.backpackAddToCartElement.contains('Add to cart');
        InventoryPage.backpackAddToCartElement.click();
        InventoryPage.backpackRemoveElement.contains('Remove');
        InventoryPage.backpackRemoveElement.click();
        InventoryPage.backpackAddToCartElement.should(($buttonText) => {
            expect($buttonText).to.contain('Add to cart');
        });
    });

    it('Successfully displayed the shopping cart badge after clicking the "ADD TO CART"', () => {


    });

    it('Successfully removed the shopping cart badge after removing all the products from cart', () => {


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

    it('Successfully sorted the products from a to z after selecting the "Name (A TO Z)"', () => {
        let optionsArray = []
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
        let optionsArray = []
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

    it('Check if the prices are sorted accordingly', () => {
        let optionsArray = []
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
        let optionsArray = []
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
        cy.fixture('login').as('login')
        cy.get<ValidCredentials>('@login').then((user) => {
            cy.login(user.validUserName, user.validPassword);
        });
    });

    it('Check if the prices are sorted accordingly', () => {
        let optionsArray = []
        // InventoryPage.sortElement.select(InventoryPage.sortPriceLowToHighText);
        // InventoryPage.inventoryItemPricesElement.each(($el, index, list) => {
        //     optionsArray[index] = $el.text()
        //     cy.log(optionsArray[index]);
        // }).then(() => {
        //     expect(optionsArray).to.deep
        //         .equal(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
        // });

    });

    it('Check if the names are sorted accordingly', () => {
        let optionsArray = []
        // InventoryPage.sortElement.select(InventoryPage.sortPriceLowToHighText);
        // InventoryPage.inventoryItemNamesElement.each(($el, index, list) => {
        //     optionsArray[index] = $el.text()
        //     cy.log(optionsArray[index]);
        // }).then(() => {
        //     expect(optionsArray).to.deep
        //         .equal(['Sauce Labs Onesie', 'Sauce Labs Bike Light',
        //             'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)',
        //             'Sauce Labs Backpack', 'Sauce Labs Fleece Jacket']);
        // });
    });

});