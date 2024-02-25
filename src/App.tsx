import { Route, Routes, createBrowserRouter } from "react-router-dom";
import { Index } from "./routes/Index/IndexRoute";
import { ProfilesRoute } from "./routes/ProfilesRoute";
import { NavBar } from "./components/NavBar/NavBar";
import { LojaRoute } from "./routes/LojaRoute";
import { AnuncieRoute } from "./routes/AnuncieRoute";
import { ProfileRoute } from "./routes/ProfileRoute";
import { Footer } from "./components/Footer/Footer";

import "./App.css";
import NavigationMenuDemo from "./components/NavRadix";
import { MyNavigationMenu } from "./components/MyNavigationMenu";



const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export function App() {
  
  return (
    <>
    {/* <NavigationMenuDemo></NavigationMenuDemo> */}
    <MyNavigationMenu />
    {/* <NavBar /> */}

    {/* <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/profiles" element={<ProfilesRoute />} />
        <Route path="/profile/:id" element={<ProfileRoute />} />
      <Route path="/loja" element={<LojaRoute />} />
      <Route path="/anuncie" element={<AnuncieRoute />} />
    </Routes> */}

    <Footer />
    </>
  )
}