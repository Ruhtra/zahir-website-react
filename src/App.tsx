import { Route, Routes } from "react-router-dom";
import { Index } from "./routes/Index";
export function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
    </>
  )
}