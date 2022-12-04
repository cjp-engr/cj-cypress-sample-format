export interface ValidCredentials {
    validUserName: string;
    validPassword: string;
}

export interface InvalidCredentials {
    invalidUserName: string;
    invalidPassword: string;
}

export interface UserList {
    valid: boolean,
    username: string;
    password: string;
}

export interface InventoryTestData {
    sortedProductNamesAToZ: Array<string>;
    sortedProductNamesZToA: Array<string>;
    sortedProductPricesLowToHigh: Array<string>;
    namesIfPricesSortedLowToHigh: Array<string>;
    sortedProductPricesHighToLow: Array<string>;
    namesIfPricesSortedHighToLow: Array<string>;
}

export interface CartTestData {
    sauceLabsBackPackTitle: string;
    sauceLabsBackPackDescription: string;
    sauceLabsBackPackPrice: string;
}

export interface CheckoutStepOneData {
    firstName: string;
    lastName: string;
    postalCode: string;
}