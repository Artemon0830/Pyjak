import { IPlace } from "../places/places.types";

export interface IUser{
_id?: string;

    name: string;

    email: string;

    password?: string;

    age?: number;

    avatar?: string;

    phone?: string;

    favorites?: IPlace[];

    role: string;

    isVerified: boolean;

    isDeleted: boolean;

    createdAt?: Date;

    updatedAt?: Date;

    // =========================
    // MANAGER FIELDS
    // =========================

    companyName?: string;

    businessPhones?: string[];

    businessAddress?: IAddress;

    description?: string;

    website?: string;
}

export interface IAddress{
    country: string;

    city: string;

    street: string;

    buildingNumber: string;

    zipCode?: string;

    office?: string;
}
