export interface IUser {
    id: number;

    firstname: string;
    lastname: string;
    mail: string;
    phone: string;
    password: string;
    roleId: number;

    thumbnail: string;
    city: string;
    zipCode: number;
    address: string;
    sponsorId: number;
    referalCode: string;

    refreshToken: string;
    isSuspended: boolean;

    createdAt: Date;
    updatedAt: Date
}

export enum Roles {
    CUSTOMER = 1,
    RESTAURANT_OWNER = 2,
    DELIVERY_MAN = 3,
    TECHNICAL_DEPARTMENT = 4,
    COMERCIAL_DEPARTMENT = 5,
    EXTERNAL = 6
}

export enum RoleTypes {
    CUSTOMER = 'CUSTOMER',
    RESTAURANT_OWNER = 'RESTAURANT_OWNER',
    DELIVERY_MAN = 'DELIVERY_MAN',
    TECHNICAL_DEPARTMENT = 'TECHNICAL_DEPARTMENT',
    COMERCIAL_DEPARTMENT = 'COMERCIAL_DEPARTMENT',
    EXTERNAL = 'EXTERNAL'
}

export interface IRole {
    id: number;

    type: RoleTypes;

    description: string;
    comment: string;

    createdAt: Date;
    updatedAt: Date;
}
