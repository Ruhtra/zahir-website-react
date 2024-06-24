import axios from "axios";
import { clearUser } from "./QueryClient";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_DNS}/api`,
    withCredentials: true
},)


api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403) {
            clearUser()
        }
        return Promise.reject(error);
    }
);