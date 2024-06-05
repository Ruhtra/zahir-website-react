import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../Contexts/AuthContext";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_DNS,
    withCredentials: true
},)


// export const setupInterceptors = () => {
//     const { setUser } = useContext(AuthContext)

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 403) {
                // setUser(null);
                console.error('Unauthorized access - 403 error');
            }
            return Promise.reject(error);
        }
    );
// };