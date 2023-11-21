import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Mobil from "./pages/Mobil";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
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
