export interface CartTestData {
    sauceLabsBackPackTitle: string;
    sauceLabsBackPackDescription: string;
    sauceLabsBackPackPrice: string;
}

export interface CheckoutStepOneData {
    firstName: string;
    lastName: string;
    postalCode: string;
    firstNameIsRequiredError: string;
    lastNameIsRequiredError: string;
    postalCodeIsRequiredError: string;
}

export interface CheckoutCompleteData {
    title: string;
    headerText: string;
    bodyText: string;
}

export interface InventoryTestData {
    sortedProductNamesAToZ: Array<string>;
    sortedProductNamesZToA: Array<string>;
    sortedProductPricesLowToHigh: Array<string>;
    namesIfPricesSortedLowToHigh: Array<string>;
    sortedProductPricesHighToLow: Array<string>;
    namesIfPricesSortedHighToLow: Array<string>;
}

export interface LoginTestData {
    validUserName: string;
    validPassword: string;
    invalidUserName: string;
    invalidPassword: string;
    lockedOutUserName: string;
    usernameNotRegisteredError: string;
    usernameIsRequiredError: string;
    passwordIsRequiredError: string;
    lockedoutError: string;
    inventoryLinkError: string;
    cartLinkError: string;
    checkoutOneLinkError: string;
    checkoutTwoLinkError: string;
    checkoutCompleteError: string;
}

export interface PageLinkTestData {
    loginLink: string;
    inventoryLink: string;
    cartLink: string;
    checkoutOneLink: string;
    checkoutTwoLink: string;
    checkoutComplete: string;
}

export interface UserList {
    valid: boolean,
    username: string;
    password: string;
}