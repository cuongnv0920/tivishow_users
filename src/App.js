import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./features/Home";
import Admin from "./features/Admin";
import Poster from "./features/Poster";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="poster/*" element={<Poster />} />
      </Routes>
    </div>
  );
}

export default App;
