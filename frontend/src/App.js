import React from "react";
import { Routes, Route } from "react-router-dom";

import Add from "../src/Components/addSeller"
import Tanks from "../src/Components/tanks"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Add/ >} />
        <Route path="/sellers" element={<Tanks/ >} />
      </Routes>
    </div>
  );
}

export default App;
