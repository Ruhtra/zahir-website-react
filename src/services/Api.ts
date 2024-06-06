import axios from "axios";
import { queryClient } from "./QueryClient";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_DNS}/api`,
    withCredentials: true
},)


api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403) {
            queryClient.setQueryData('user', null) 
        }
        return Promise.reject(error);
    }
);