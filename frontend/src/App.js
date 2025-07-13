import React from "react";
import Nav from "../src/Compoents/Nav/Nav"
import { Routes, Route } from "react-router-dom";


import Dashboard from "../src/Compoents/Home/TankDisplay"
import AddWater from "../src/Compoents/WaterLevel/AddWater";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tank-level" element={<AddWater />} />
      </Routes>

    </div>
  );
}

export default App;
