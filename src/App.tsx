import { Route, Routes } from "react-router-dom";
import { Index } from "./routes/IndexRoute";
import { ProfilesRoute } from "./routes/ProfilesRoute";
import { NavBar } from "./components/NavBar/NavBar";
import { LojaRoute } from "./routes/LojaRoute";
import { AnuncieRoute } from "./routes/AnuncieRoute";
import { ProfileRoute } from "./routes/ProfileRoute";
export function App() {
  
  return (
    <>
    <NavBar />

    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/profiles" element={<ProfilesRoute />} />
        <Route path="/profile/:id" element={<ProfileRoute />} />
      <Route path="/loja" element={<LojaRoute />} />
      <Route path="/anuncie" element={<AnuncieRoute />} />
    </Routes>
    </>
  )
}