
export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export enum Roles {
    CUSTOMER = 1,
    RESTAURANT_OWNER = 2,
    DELIVERY_MAN = 3,
    TECHNICAL_DEPARTMENT = 4,
    COMERCIAL_DEPARTMENT = 4,
    EXTERNAL = 6
}