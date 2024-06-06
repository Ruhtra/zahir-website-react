import { createContext } from "react";
import { googleUser, useGetProfileUser } from "../services/Querys/Google";
import { UseQueryResult } from "react-query";

interface AuthContextType  {
    userFetch: UseQueryResult<googleUser, unknown>
    getGoogleOAuthURL: () => string
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }) {
    const userFetch = useGetProfileUser();

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
        <AuthContext.Provider value={{ userFetch, getGoogleOAuthURL: getGoogleOAuthURL }}>
            {children}
        </AuthContext.Provider>
    )
}