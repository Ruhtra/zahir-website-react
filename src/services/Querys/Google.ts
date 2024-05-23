import { useQuery } from "react-query";
import axios from "axios";
import { BaseUrlGoogle } from "../QueryClient";
import { TokenResponse } from "@react-oauth/google";

const PathUrlUser = `${BaseUrlGoogle}/userinfo`
const PathUrlToken = `${BaseUrlGoogle}/tokeninfo`

export interface UserResponseGoogle {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

interface GoogleUserToken {
    issued_to: string;
    audience: string;
    user_id: string;
    scope: string;
    expires_in: number;
    email: string;
    verified_email: boolean;
    access_type: string;
  }

export type UserGoogleLogin =  Omit<TokenResponse, "error" | "error_description" | "error_uri">

export function useGoogleGetAccount(user: UserGoogleLogin) {
    return useQuery<UserResponseGoogle>({
        queryKey: ['googleAccount'],
        queryFn: async () => {
            if (user != null) {
                const response = await axios.get<UserResponseGoogle>(
                    `${PathUrlUser}?access_token=${user.access_token}`
                );
                console.debug("response: "+ response);
    
                return response.data
            }
            return null
        },
        staleTime: 1000 * 60 // 1 minute
    })
}

export function useValidGoogleSession(user: UserGoogleLogin){
    return useQuery<GoogleUserToken>({
        queryKey: ['googleInfo'],
        queryFn: async () => {
            if (user != null) {
                const response = await axios.get<GoogleUserToken>(
                    `${PathUrlToken}?access_token=${user.access_token}`
                );
    
                return response.data
            }
            return null
        },
        staleTime: 1000 * 60 // 1 minute
    })
}