import { createContext, useEffect, useState } from "react";
import { googleUser } from "../services/Querys/Google";
import { api } from "../services/Api";


interface AuthContextType  {
    user: googleUser
    setUser: React.Dispatch<React.SetStateAction<googleUser>>

    getGoogleOAuthURL: Function
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<googleUser | null>(null)
    

    useEffect(() => {
        // setupInterceptors() // initilize 401 handler

        const fetchData = async () => {
            const response = await api.get<googleUser>('/api/getUser');
            if (response.status == 200) setUser(response.data)
            else console.error("Erro ao requisitar usuário");
        };

        fetchData();
    }, []);

    function getGoogleOAuthURL() {
        const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

        const options = {
          redirect_uri: `${import.meta.env.VITE_API_DNS}/api/oauth/google`,
          client_id: "856144354818-hrot573bj8lmbod786pla96i3lsj7rsf.apps.googleusercontent.com",
          access_type: "offline",
          response_type: "code",
          prompt: "consent",
          scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
          ].join(" "),
        };
    
        const qs = new URLSearchParams(options);
    
        return `${rootUrl}?${qs.toString()}`;
    }

    
    return (
        <AuthContext.Provider value={{ user, setUser, getGoogleOAuthURL: getGoogleOAuthURL }}>
            {children}
        </AuthContext.Provider>
    )
}