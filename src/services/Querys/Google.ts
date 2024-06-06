import axios from "axios";
import { BaseUrlGoogle } from "../QueryClient";
import { TokenResponse } from "@react-oauth/google";
import { useQuery } from "react-query";
import { api } from "../Api";

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

export type UserGoogleLogin = Omit<TokenResponse, "error" | "error_description" | "error_uri">

export function useGoogleGetAccount(user: UserGoogleLogin) {
    return useQuery<UserResponseGoogle>({
        queryKey: ['googleAccount'],
        queryFn: async () => {
            if (user != null) {
                const response = await axios.get<UserResponseGoogle>(
                    `${PathUrlUser}?access_token=${user.access_token}`
                );
                console.debug("response: " + response);

                return response.data
            }
            return null
        },
        staleTime: 1000 * 60 // 1 minute
    })
}

export function useValidGoogleSession(user: UserGoogleLogin) {
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

export interface googleUser {
    _id: string
    email: string
    picture?: string
    name: string
}

export function useGetProfileUser() {
    return useQuery<googleUser>({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await api.get<googleUser>('/api/getUser');

            return response.data;
        },
        staleTime: 15 * 60 * 1000, // 15 minutos
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 403)
                return false;

            if (failureCount < 3) return true;
        },
        retryDelay: 5 * 1000, // 5 seconds
        // retry: false,
        refetchOnWindowFocus: false
    });
}
