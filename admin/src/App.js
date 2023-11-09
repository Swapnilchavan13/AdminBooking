import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import { Addtheatre } from "./Component/Addtheatre";
import { Addmovie } from "./Component/Addmovie";
import { Allocatemovie } from "./Component/Allocatemovie";
import { All } from "./Component/All";
import { Login } from "./Component/Login";

function App() {
  return (
    <BrowserRouter>
      {window.location.pathname !== '/all' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="addtheatre" element={<Addtheatre />} />
        <Route path="addmovie" element={<Addmovie />} />
        <Route path="allocatemovie" element={<Allocatemovie />} />
        <Route path="all" element={<All />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
