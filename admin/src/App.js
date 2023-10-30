import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import { Addtheatre } from "./Component/Addtheatre";
import { Addmovie } from "./Component/Addmovie";
import { Allocatemovie } from "./Component/Allocatemovie";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Addtheatre />} />
        <Route path="addtheatre" element={<Addtheatre />} />
        <Route path="addmovie" element={<Addmovie />} />
        <Route path="allocatemovie" element={<Allocatemovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
