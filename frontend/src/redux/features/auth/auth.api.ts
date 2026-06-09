import { axiosInstanse } from "@/app/axios";
import { ICreateManagerDto, ICreateUserDto, ISignInDto, ISignInResponse } from "./auth.types";


export const authService= {
    signIn:async(data: ISignInDto
):Promise<ISignInResponse>=>{
       const response = await axiosInstanse.post<ISignInResponse>('/auth/sign-in', data);
       return response.data 
    },
    signUp:async(data: ICreateUserDto):Promise<ISignInResponse>=>{
        const response = await axiosInstanse.post<ISignInResponse>('/auth/sign-up', data);
        return response.data;
    },
    signUpManager:async(data: ICreateManagerDto):Promise<ISignInResponse>=>{
        const response = await axiosInstanse.post<ISignInResponse>('/auth/sign-up-manager', data);
        return response.data;
    }

}