import { createContext, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Index } from "./routes/Index/IndexRoute";
import { ProfilesRoute } from "./routes/ProfilesRoute";
import { LojaRoute } from "./routes/Loja/LojaRoute";
import { NavBar } from "./components/NavBar/NavBar";
import { AnuncieRoute } from "./routes/Anuncie/AnuncieRoute";
import { ProfileRoute } from "./routes/Profile/ProfileRoute";
import { Footer } from "./components/Footer/Footer";

import "./App.css";
import { googleUser, useGetProfileUser } from "./services/Querys/Google";

interface AuthContextProps {
  user: googleUser,
  statusUser: "idle" | "error" | "loading" | "success"
  login: () => {}
}
const AuthContext = createContext<AuthContextProps>(null)
export const AuthData = () => useContext(AuthContext)

export function App() {
  const { data: user, status: statusUser } = useGetProfileUser()

  const getGoogleOAuthURL = () => {
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
    <AuthContext.Provider value={{user, statusUser , login: getGoogleOAuthURL}}>
      <>
        <NavBar />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profiles" element={<ProfilesRoute />} />
          <Route path="/profile/:id" element={<ProfileRoute />} />
          <Route path="/loja" element={<LojaRoute />} />
          <Route path="/anuncie" element={<AnuncieRoute />} />
        </Routes>

        <Footer />
      </>
    </AuthContext.Provider>
  )
}