import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import { Addtheatre } from "./Component/Addtheatre";
import { Addmovie } from "./Component/Addmovie";
import { Allocatemovie } from "./Component/Allocatemovie";
import { All } from "./Component/All";
import { Login } from "./Component/Login";
import { Addscreen } from "./Component/Addscreen";
import { AllTheatres } from "./Component/AllTheatres";
import { EnvFrontend } from "./Component/EnvFrontend";

function App() {
  return (
    <BrowserRouter>
      {window.location.pathname !== '/all' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="addtheatre" element={<Addtheatre />} />
        <Route path="addscreen" element={<Addscreen />} />
        <Route path="addmovie" element={<Addmovie />} />
        <Route path="allocatemovie" element={<Allocatemovie />} />
        <Route path="all" element={<All />} />
        <Route path="alltheatre" element={<AllTheatres />} />
        <Route path="addevent" element={<EnvFrontend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
