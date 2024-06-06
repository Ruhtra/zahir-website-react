import { createContext, useEffect, useState } from "react";
import { googleUser, useGetProfileUser } from "../services/Querys/Google";
import { setupInterceptors } from "../services/Api";


interface AuthContextType  {
    user: googleUser
    statusUser: "idle" | "error" | "loading" | "success"
    setCurrentUser: React.Dispatch<React.SetStateAction<googleUser>>

    getGoogleOAuthURL: () => string
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setupInterceptors(setCurrentUser);
    }, []);
    
    const { data: user, status: statusUser } = useGetProfileUser();
    useEffect(() => {
        setCurrentUser(user)
    }, [user])

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
        <AuthContext.Provider value={{ user: currentUser, statusUser, setCurrentUser, getGoogleOAuthURL: getGoogleOAuthURL }}>
            {children}
        </AuthContext.Provider>
    )
}