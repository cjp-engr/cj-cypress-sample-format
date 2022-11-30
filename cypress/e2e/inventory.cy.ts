import { InventoryPage } from "../../cypress/pages/Inventory";
import { ValidCredentials } from "./model";


describe('', () => {
    before(() => {
        InventoryPage.visit();
        cy.fixture('login').as('login')
        cy.get<ValidCredentials>('@login').then((user) => {
            cy.login(user.validUserName, user.validPassword);
        });
    })

    it('Successfully changed button text from "ADD TO CART" to "REMOVE" after clicking the "ADD TO CART" button', () => {

    });

    it('Successfully changed button text from "REMOVE" to "ADD TO CART" after clicking the "REMOVE" button', () => {


    });

    it('Successfully arranged the products from low to high price after selecting the "Price (low TO high)"', () => {


    });

    it('Successfully arranged the products from high to low price after selecting the "Price (high TO low)"', () => {


    });

    it('Successfully arranged the products from a to z after selecting the "Name (A TO Z)"', () => {


    });

    it('Successfully arranged the products from z to a after selecting the "Name (Z TO A)"', () => {


    });

    it('Successfully displayed the shopping cart badge after clicking the "ADD TO CART"', () => {


    });

    it('Successfully removed the shopping cart badge after removing all the products from cart', () => {


    });
});