import { RoleEnum } from "../enums/role.enum";
import { IAddress } from "./address.interfase";
import { IPlace } from "./place.interface";

export interface IUser{
_id?: string;

    name: string;

    email: string;

    password?: string;

    age?: number;

    avatar?: string;

    phone?: string;

    favorites?: IPlace[];

    role: RoleEnum;

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
export interface ISignIn extends Pick<IUser,"email"|"password">{}

