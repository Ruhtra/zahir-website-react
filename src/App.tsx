// import { createContext, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Index } from "./routes/Index/IndexRoute";
import { ProfilesRoute } from "./routes/Profiles/ProfilesRoute";
import { LojaRoute } from "./routes/Loja/LojaRoute";
import { NavBar } from "./components/NavBar/NavBar";
import { AnuncieRoute } from "./routes/Anuncie/AnuncieRoute";
import { ProfileRoute } from "./routes/Profile/ProfileRoute";
import { Footer } from "./components/Footer/Footer";

import "./App.css";
import { AuthContext, AuthProvider } from "./Contexts/AuthContext";
import { useContext } from "react";



function Render() {
  const { dataUser } = useContext(AuthContext)

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profiles" element={<ProfilesRoute />} />
        <Route path="/profile/:id" element={<ProfileRoute />} />
        <Route path="/loja" element={<LojaRoute />} />
        <Route path="/anuncie" element={<AnuncieRoute />} />

        {
          dataUser != null
            ? <>
              <Route path="/config" element="" />
            </>
            : <></>

        }
      </Routes>

    </>
  )
}

export function App() {



  return (
    <AuthProvider>
      <>
        <NavBar />

        <Render />

        <Footer />
      </>
    </AuthProvider>
  )
}
