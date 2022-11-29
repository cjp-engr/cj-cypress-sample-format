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