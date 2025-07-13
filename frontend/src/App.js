import React from "react";
import Nav from "../src/Component/Nav/nav";
import { Routes, Route } from "react-router-dom";

import WaterQualityList from "../src/Component/WaterQuality/WaterQualityList";
import AddWaterQuality from "../src/Component/WaterQuality/AddWaterQuality";
import EditWaterQuality from "../src/Component/WaterQuality/EditWaterQuality";
import Dashboard from "../src/Component/Home/TankDisplay"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/water-quality/list" element={<WaterQualityList />} />
        <Route path="/water-quality/add" element={<AddWaterQuality />} />
        <Route path="/water-quality/edit/:id" element={<EditWaterQuality />} />
        <Route path="/tank/:tankId/water-quality" element={<WaterQualityList />} />

      </Routes>
    </div>
  );
}

export default App;

