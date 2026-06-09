import { baseUrl } from "@/constants/urls";
import { ITokenPair } from "@/redux/features/auth/auth.types";
import axios from "axios";

export const axiosInstanse = axios.create({
    baseURL:baseUrl,
    headers:{}
})
axiosInstanse.interceptors.request.use((request) => {

    const tokens = localStorage.getItem('tokens')

    if(tokens){

        const parsedTokens:ITokenPair = JSON.parse(tokens)

        request.headers['Authorization'] =
            `Bearer ${parsedTokens.accessToken}`
    }

    return request
})