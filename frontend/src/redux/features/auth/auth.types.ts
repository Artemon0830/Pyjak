import { IAddress, IUser } from "../users/users.types";



export interface ITokenPair{
    accessToken:string;
    refreshToken:string;
}

export interface ISignInResponse {
  user: IUser
  tokens:ITokenPair 
}

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

export interface ICreateUserDto {
    name: string;
    email: string;
    password: string;
    age?: number;
    avatar?: string;
    phone?: string;
}
export interface ISignInDto extends Pick<IUser,"email"|"password">{rememberMe?:boolean}