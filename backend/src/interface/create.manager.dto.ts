import { IAddress } from "./address.interfase";


export interface ICreateManagerDto {

    name: string;

    email: string;

    password: string;

    companyName: string;

    businessPhones: string[];

    businessAddress: IAddress;

    description?: string;

    website?: string;
}