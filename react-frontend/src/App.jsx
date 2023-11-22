import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Register } from "./auth/Register";
import { Login } from "./auth/Login";
import Home from "./pages/Home";
import Mobil from "./pages/Mobil";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/Mobil" element={<Mobil />} />
            {/* <Route path="/Mobil" element={<Mobil />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Login" element={<Login />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
